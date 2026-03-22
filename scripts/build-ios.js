#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function exec(command, options = {}) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

function hasBootedSimulator() {
  try {
    const output = execSync('xcrun simctl list devices', { encoding: 'utf-8' });
    return output.includes('Booted');
  } catch {
    return false;
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const buildType = process.argv[2] || process.env.BUILD_TYPE || 'debug';

if (!['debug', 'release'].includes(buildType)) {
  console.error(`❌ Invalid build type: ${buildType}. Must be 'debug' or 'release'.`);
  process.exit(1);
}

// Check if running on macOS
if (process.platform !== 'darwin') {
  console.error('❌ iOS builds can only be run on macOS');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const version = packageJson.version;
const isRelease = buildType === 'release';
const buildConfiguration = isRelease ? 'Release' : 'Debug';
const outputDir = isRelease ? 'release' : 'debug';
const sdkPath = `build/Build/Products/${buildConfiguration}-iphonesimulator/wdiodemoapp.app`;

console.log(`🔨 Building iOS ${buildConfiguration} app...`);
exec('npx expo prebuild --clean --platform ios');
process.chdir('ios');

// On Apple Silicon (GitHub macos-latest), building iphonesimulator for both arm64 and x86_64
// doubles Swift work and often OOMs or fails late in large pods (e.g. ExpoLogBox). CI only needs
// the native simulator arch.
const isAppleSilicon = process.arch === 'arm64';
const xcodebuildEnv = isAppleSilicon
  ? {
      ...process.env,
      EXCLUDED_ARCHS: 'x86_64',
      ARCHS: 'arm64',
      ONLY_ACTIVE_ARCH: 'YES',
    }
  : process.env;
if (isAppleSilicon) {
  console.log(
    'ℹ️  Simulator build: EXCLUDED_ARCHS=x86_64, ARCHS=arm64, ONLY_ACTIVE_ARCH=YES (Apple Silicon)',
  );
}

const ciParallelCap = process.env.CI ? ' -jobs 4' : '';

exec(
  'xcodebuild -workspace wdiodemoapp.xcworkspace -configuration ' +
    `${buildConfiguration} -scheme wdiodemoapp -sdk iphonesimulator ` +
    '-derivedDataPath ./build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO' +
    ciParallelCap,
  { env: xcodebuildEnv },
);

const appsDir = path.join('..', 'apps', outputDir);
const appSource = path.resolve(sdkPath);
const appDest = path.resolve(appsDir, 'wdiodemoapp.app');

if (!fs.existsSync(appsDir)) {
  fs.mkdirSync(appsDir, { recursive: true });
}

// Remove any previous .app copy first. copyRecursive merges into an existing
// destination; stale nested frameworks (e.g. old hermes.framework next to
// hermesvm.framework) can break simulator install with duplicate bundle IDs.
if (fs.existsSync(appDest)) {
  fs.rmSync(appDest, { recursive: true, force: true });
}

copyRecursive(appSource, appDest);
process.chdir('..');

if (isRelease) {
  const zipFileName = `ios.simulator.wdio.native.app.v${version}.zip`;
  const zipDest = path.resolve('apps', outputDir, zipFileName);
  const zipDir = path.resolve('apps', outputDir);
  
  console.log(`📦 Creating zip archive: ${zipFileName}...`);
  exec(`cd "${zipDir}" && zip -9 -r "${zipFileName}" wdiodemoapp.app`);
  console.log(`✅ iOS ${buildConfiguration} app built, copied, and zipped to ${zipDest}`);
} else {
  console.log(`✅ iOS ${buildConfiguration} app built and copied to ${path.join('apps', outputDir, 'wdiodemoapp.app')}`);
}

if (!isRelease && hasBootedSimulator()) {
  const absoluteAppDest = path.resolve('apps', outputDir, 'wdiodemoapp.app');
  console.log('📱 Installing app on booted simulator...');
  exec(`xcrun simctl install booted "${absoluteAppDest}"`);
  
  console.log('🚀 Launching app on simulator...');
  exec('xcrun simctl launch booted org.wdiodemoapp');
  console.log('✅ App installed and launched on simulator');
  console.log('ℹ️ When the app is launched for the first time, please select the localhost url in the app to start the app and connect to the development server.');
} else if (!isRelease) {
  const absoluteAppDest = path.resolve('apps', outputDir, 'wdiodemoapp.app');
  console.log('⚠️  No booted simulator found. App built but not installed.');
  console.log(`   To install manually, run: xcrun simctl install booted "${absoluteAppDest}"`);
}

