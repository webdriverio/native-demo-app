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
  
function checkAdb() {
  try {
    execSync('adb version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
  
function hasConnectedDevice() {
  try {
    const output = execSync('adb devices', { encoding: 'utf-8' });
    return output.includes('\tdevice');
  } catch {
    return false;
  }
}

const buildType = process.argv[2] || process.env.BUILD_TYPE || 'debug';

if (!['debug', 'release'].includes(buildType)) {
  console.error(`❌ Invalid build type: ${buildType}. Must be 'debug' or 'release'.`);
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const version = packageJson.version;
const isRelease = buildType === 'release';
const buildVariant = isRelease ? 'Release' : 'Debug';
const apkName = isRelease ? 'app-release.apk' : 'app-debug.apk';
const outputDir = isRelease ? 'release' : 'debug';
const finalApkName = isRelease ? `android.wdio.native.app.v${version}.apk` : apkName;


console.log(`🔨 Building Android ${buildVariant} APK...`);

exec('npx expo prebuild --clean --platform android');

process.chdir('android');
const gradleCommand = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
exec(`${gradleCommand} assemble${buildVariant}`);
process.chdir('..');

const appsDir = path.join('apps', outputDir);
const apkSource = path.join('android', 'app', 'build', 'outputs', 'apk', buildType.toLowerCase(), apkName);
const apkDest = path.join(appsDir, finalApkName);

if (!fs.existsSync(appsDir)) {
  fs.mkdirSync(appsDir, { recursive: true });
}

fs.copyFileSync(apkSource, apkDest);
console.log(`✅ Android ${buildVariant} APK built and copied to ${apkDest}`);

if (!isRelease && checkAdb()) {
  if (hasConnectedDevice()) {
    console.log('📱 Installing app on connected device/emulator...');
    exec(`adb install -r "${apkDest}"`);
    
    console.log('🚀 Launching app...');
    exec('adb shell am start -n com.wdiodemoapp/.MainActivity');
    console.log('✅ App installed and launched on device/emulator');
    console.log('ℹ️ When the app is launched for the first time, please select the localhost url in the app to start the app and connect to the development server.');
  } else {
    console.log('⚠️  No Android device/emulator found. APK built but not installed.');
    console.log(`   To install manually, run: adb install ${apkDest}`);
  }
} else if (!isRelease) {
  console.log('⚠️  ADB not found. APK built but not installed.');
  console.log('   Make sure Android SDK platform-tools are in your PATH');
}

