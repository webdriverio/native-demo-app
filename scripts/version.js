#!/usr/bin/env node

/**
 * Automated versioning script for Expo app
 * 
 * Usage:
 *   npm run version:patch   - Bump patch version (1.0.7 -> 1.0.8)
 *   npm run version:minor   - Bump minor version (1.0.7 -> 1.1.0)
 *   npm run version:major   - Bump major version (1.0.7 -> 2.0.0)
 *   npm run version:custom  - Bump to a custom version (e.g., 1.2.3)
 */

const fs = require('fs');
const path = require('path');

const APP_JSON_PATH = path.join(__dirname, '..', 'app.json');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

/**
 * Parse version string into parts
 */
function parseVersion(version) {
  const parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2],
  };
}

/**
 * Format version parts into string
 */
function formatVersion(parts) {
  return `${parts.major}.${parts.minor}.${parts.patch}`;
}

/**
 * Bump version based on type
 */
function bumpVersion(currentVersion, type) {
  const parts = parseVersion(currentVersion);
  
  switch (type) {
    case 'major':
      return formatVersion({
        major: parts.major + 1,
        minor: 0,
        patch: 0,
      });
    case 'minor':
      return formatVersion({
        major: parts.major,
        minor: parts.minor + 1,
        patch: 0,
      });
    case 'patch':
      return formatVersion({
        major: parts.major,
        minor: parts.minor,
        patch: parts.patch + 1,
      });
    default:
      throw new Error(`Invalid version type: ${type}. Use 'major', 'minor', or 'patch'`);
  }
}

/**
 * Read and parse JSON file
 */
function readJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

/**
 * Write JSON file with proper formatting
 */
function writeJSON(filePath, data) {
  const content = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Main versioning function
 */
function versionApp(type, customVersion = null) {
  // Read current files
  const appJson = readJSON(APP_JSON_PATH);
  const packageJson = readJSON(PACKAGE_JSON_PATH);
  
  // Get current version
  const currentVersion = appJson.expo.version;
  
  // Determine new version
  let newVersion;
  if (customVersion) {
    // Validate custom version format
    if (!/^\d+\.\d+\.\d+$/.test(customVersion)) {
      throw new Error(`Invalid version format: ${customVersion}. Use format: X.Y.Z`);
    }
    newVersion = customVersion;
  } else {
    newVersion = bumpVersion(currentVersion, type);
  }
  
  // Get current build numbers
  const currentIosBuild = parseInt(appJson.expo.ios.buildNumber, 10);
  const currentAndroidBuild = appJson.expo.android.versionCode;
  
  // Increment build numbers
  const newIosBuild = (currentIosBuild + 1).toString();
  const newAndroidBuild = currentAndroidBuild + 1;
  
  // Update app.json
  appJson.expo.version = newVersion;
  appJson.expo.ios.buildNumber = newIosBuild;
  appJson.expo.android.versionCode = newAndroidBuild;
  
  // Update package.json
  packageJson.version = newVersion;
  
  // Write files
  writeJSON(APP_JSON_PATH, appJson);
  writeJSON(PACKAGE_JSON_PATH, packageJson);
  
  // Print summary
  console.log('\n✅ Version updated successfully!\n');
  console.log('📱 App Version:');
  console.log(`   ${currentVersion} → ${newVersion}`);
  console.log('\n🔢 Build Numbers:');
  console.log(`   iOS:     ${currentIosBuild} → ${newIosBuild}`);
  console.log(`   Android: ${currentAndroidBuild} → ${newAndroidBuild}`);
  console.log('\n📝 Files updated:');
  console.log(`   - ${path.relative(process.cwd(), APP_JSON_PATH)}`);
  console.log(`   - ${path.relative(process.cwd(), PACKAGE_JSON_PATH)}\n`);
  
  return {
    version: newVersion,
    iosBuild: newIosBuild,
    androidBuild: newAndroidBuild,
  };
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Version type required');
    console.log('\nUsage:');
    console.log('  node scripts/version.js patch   - Bump patch version');
    console.log('  node scripts/version.js minor   - Bump minor version');
    console.log('  node scripts/version.js major   - Bump major version');
    console.log('  node scripts/version.js custom 1.2.3 - Set custom version\n');
    process.exit(1);
  }
  
  const type = args[0];
  const customVersion = args[1] || null;
  
  try {
    if (type === 'custom') {
      if (!customVersion) {
        throw new Error('Custom version required. Usage: node scripts/version.js custom 1.2.3');
      }
      versionApp(null, customVersion);
    } else {
      versionApp(type);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = { versionApp, bumpVersion };

