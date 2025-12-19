# Versioning the App

Versioning the app is fully automated through a CLI script. The script automatically updates version numbers in both `app.json` and `package.json`, and increments build numbers for iOS and Android.

## Automated Versioning

The versioning script handles all version updates automatically. Simply run one of the following commands:

### Quick Commands

```bash
# Bump patch version (1.0.7 → 1.0.8) - for bug fixes
npm run version:patch

# Bump minor version (1.0.7 → 1.1.0) - for new features
npm run version:minor

# Bump major version (1.0.7 → 2.0.0) - for breaking changes
npm run version:major

# Set a custom version (e.g., 1.2.3)
npm run version:custom 1.2.3
```

### What Gets Updated

The script automatically updates:

1. **App Version** (`expo.version` in `app.json` and `version` in `package.json`)
2. **iOS Build Number** (`expo.ios.buildNumber` in `app.json`) - automatically incremented
3. **Android Version Code** (`expo.android.versionCode` in `app.json`) - automatically incremented

### Example Output

When you run `npm run version:patch`, you'll see:

```
✅ Version updated successfully!

📱 App Version:
   1.0.7 → 1.0.8

🔢 Build Numbers:
   iOS:     17 → 18
   Android: 18 → 19

📝 Files updated:
   - app.json
   - package.json
```

### Version Types

Follow [SemVer](https://semver.org/) for version numbering:

- **Patch** (`version:patch`): 1.0.7 → 1.0.8 (bug fixes, small changes)
- **Minor** (`version:minor`): 1.0.7 → 1.1.0 (new features, backward compatible)
- **Major** (`version:major`): 1.0.7 → 2.0.0 (breaking changes)

### Manual Versioning (Advanced)

If you need to set a specific version manually, you can use:

```bash
npm run version:custom 1.2.3
```

Or run the script directly:

```bash
node scripts/version.js custom 1.2.3
```

## Step 1: Bump Version

Run the appropriate version command based on your changes:

```bash
npm run version:patch   # or :minor, :major, or :custom
```

This will automatically update all version numbers and build numbers in the required files.

## Step 2: Create a PR

Create a version bump PR with the automatically adjusted versions. The script will have updated:
- `app.json` - version, iOS build number, Android version code
- `package.json` - version

> **NOTE:** The version in the package.json and the actual release will be explained in 
> [step 3](#step-3-create-a-new-release).

## Step 3: Create a new release
When step 1 till 3 are executed we need to create a new release. Make sure that you are on the `main`-branch and all
changes have been committed/pushed. Then run the following command

    yarn release

This will show an interactive UI to make a new release. See [np](https://github.com/sindresorhus/np#readme) for more
information. Make sure you follow [SemVer](https://semver.org/) to target the release properly. 

`yarn release` will also automatically open GutHub on the releases page with a draft. Add the things there that are new.
Before you upload the assets you need to adjust the app names. The Appname for Android will automatically be created 
when you build a new release, it will look like this

    Android-NativeDemoApp-{x.y.z}.apk

For iOS you first need to zip the file and then change the name from 

    wdioNativeDemoApp.app

to

    iOS-Simulator-NativeDemoApp-{x.y.z}.app.zip
    
You can then upload the assets and release a new version.
