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

/**
 * xcodebuild with `-destination 'generic/platform=iOS Simulator'` sets ONLY_ACTIVE_ARCH=NO and
 * builds arm64 + x86_64, which races SwiftEmitModule against Expo pod *.modulemap in a custom
 * derivedDataPath. A concrete simulator id keeps ONLY_ACTIVE_ARCH=YES (single slice).
 * Override: IOS_SIMULATOR_UDID=<udid>
 */
function resolveIosSimulatorDestinationSpec() {
  const fromEnv = process.env.IOS_SIMULATOR_UDID?.trim();
  if (fromEnv) {
    return `platform=iOS Simulator,id=${fromEnv}`;
  }
  try {
    const booted = execSync('xcrun simctl list devices booted -j', { encoding: 'utf-8' });
    const bootedData = JSON.parse(booted);
    for (const list of Object.values(bootedData.devices || {})) {
      if (!Array.isArray(list)) continue;
      for (const d of list) {
        if (d.udid) {
          return `platform=iOS Simulator,id=${d.udid}`;
        }
      }
    }
  } catch {
    /* fall through */
  }
  try {
    const available = execSync('xcrun simctl list devices available -j', { encoding: 'utf-8' });
    const data = JSON.parse(available);
    const byRuntime = data.devices || {};
    const runtimeKeys = Object.keys(byRuntime).sort().reverse();
    for (const rk of runtimeKeys) {
      const list = byRuntime[rk];
      if (!Array.isArray(list)) continue;
      for (const d of list) {
        if (d.isAvailable && typeof d.name === 'string' && d.name.startsWith('iPhone') && d.udid) {
          return `platform=iOS Simulator,id=${d.udid}`;
        }
      }
    }
  } catch (e) {
    console.warn('⚠️  Could not pick a concrete iOS Simulator (simctl failed):', e.message);
  }
  return null;
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
// RN codegen writes to ios/build/generated/... (see react_native_pods.rb $CODEGEN_OUTPUT_DIR).
// Do NOT use that same folder as -derivedDataPath: Xcode then owns ios/build/ and codegen
// outputs (e.g. rnworklets-generated.mm) are missing at compile time.
const xcodeDerivedDirName = '.xcode-derived';
const sdkPath = `${xcodeDerivedDirName}/Build/Products/${buildConfiguration}-iphonesimulator/wdiodemoapp.app`;

console.log(`🔨 Building iOS ${buildConfiguration} app...`);
exec('npx expo prebuild --clean --platform ios');
process.chdir('ios');

// Clean only Xcode DerivedData, not ios/build (ReactCodegen output lives under ios/build/generated).
const derivedDataDir = path.join(process.cwd(), xcodeDerivedDirName);
if (fs.existsSync(derivedDataDir)) {
  console.log(`ℹ️  Removing ios/${xcodeDerivedDirName} (previous Xcode DerivedData)...`);
  fs.rmSync(derivedDataDir, { recursive: true, force: true });
}

// Avoid `generic/platform=iOS Simulator`: it forces ONLY_ACTIVE_ARCH=NO (multi-arch simulator
// build) and reproduces SwiftEmitModule vs Expo pod module map races under custom DerivedData.
// Resolve a real device UDID so Debug keeps a single active arch; still pass SWIFT flags as a belt.
// (-parallelizeTargets with YES|NO is invalid on Xcode 16+ — boolean flag only.)
const destinationSpec =
  resolveIosSimulatorDestinationSpec() ?? 'generic/platform=iOS Simulator';
if (destinationSpec === 'generic/platform=iOS Simulator') {
  console.warn(
    '⚠️  Using generic iOS Simulator destination; ONLY_ACTIVE_ARCH may be NO. ' +
      'Set IOS_SIMULATOR_UDID or boot a simulator for a reliable single-arch build.',
  );
} else {
  console.log(`ℹ️  xcodebuild destination: ${destinationSpec}`);
}
// Keychain (expo-secure-store) requires a signed binary; CODE_SIGNING_ALLOWED=NO + empty identity
// causes SecItem* to fail with "A required entitlement isn't present" on simulator.
// "-" is "Sign to Run Locally" (ad hoc) — works without an Apple Developer team on CI.
const codeSignFlags = 'CODE_SIGN_IDENTITY=- CODE_SIGNING_ALLOWED=YES';
const derivedFlags = `-derivedDataPath ./${xcodeDerivedDirName}`;
const concurrencyFlags = '-jobs 1';
const swiftFlags = 'ONLY_ACTIVE_ARCH=YES SWIFT_ENABLE_EXPLICIT_MODULES=NO';

exec(
  `xcodebuild -workspace wdiodemoapp.xcworkspace -scheme wdiodemoapp ` +
    `-configuration ${buildConfiguration} -sdk iphonesimulator ` +
    `-destination '${destinationSpec.replace(/'/g, "'\\''")}' ${derivedFlags} ` +
    `${codeSignFlags} ${concurrencyFlags} ${swiftFlags}`,
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
