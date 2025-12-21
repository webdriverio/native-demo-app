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

## Step 3: Merge to Main and Release

When your version bump PR is merged to the `main` branch, the GitHub Actions workflow will automatically detect the version change and create a release.

### Automated Release Process

1. **Version detection**: The workflow automatically:
   - Reads the current version from `package.json`
   - Checks if a Git tag for this version already exists
   - If the version is new (no tag exists), it proceeds with the release
   - If the version already has a tag, the workflow skips release creation

2. **Build and publish** (only if version changed):
   - Builds Android release APK using the build scripts
   - Builds iOS Simulator release app using the build scripts
   - Creates a Git tag for the version (e.g., `v2.0.1`)
   - Creates a GitHub release with the tag
   - Uploads the release artifacts to GitHub Releases

3. **Release artifacts**: The built apps are automatically uploaded with the following naming:
   - **Android**: `android.wdio.native.app.v{x.y.z}.apk`
   - **iOS**: `ios.simulator.wdio.native.app.v{x.y.z}.zip`

4. **Finalize the release**: The release is created as a draft. You should:
   - Add release notes describing what's new in this version
   - Review the uploaded artifacts
   - Publish the release when ready

> [!NOTE]
> The workflow only creates a release if the version in `package.json` has changed. If you merge other changes without bumping the version, no release will be created. This ensures that releases only happen when you explicitly bump the version.

> [!TIP]
> You can also manually trigger the workflow from the [Actions](https://github.com/webdriverio/native-demo-app/actions) page if needed, but it will still check if the version has changed before creating a release.
