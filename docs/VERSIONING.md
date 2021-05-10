# Versioning the App

Versioning the app needs to be a manual step. Follow the instructions below to update the versions 

## Step 1: Determine build and version number
Determine the **CURRENT** build and the version number of the app. You can find the current build number for:
- **Android:** Search in the file [android/app/build.gradle](../android/app/build.gradle), look for the 
  `defaultConfig` and then `versionCode`
- **iOS:** Search in the file 
  [ios/wdioNativeDemoApp.xcodeproj/project.pbxproj](../ios/wdioNativeDemoApp.xcodeproj/project.pbxproj) and look for 
  `CURRENT_PROJECT_VERSION`
  
The version number can be found in the [`package.json`](../package.json)-file.

## Step 2: Run React Native Versioning
> **NOTE:** This step will only increase the build/version numbers in the app, **NOT** the version number of the 
> project, see [step 4](#step-4-create-a-new-release) for that.

We use `react-native-versioning` to update the build and version number in the app. Use the build and version from 
[step 1](#step-1-determine-build-and-version-number) and increase the buildnumber with 1, and the version number 
according to [SemVer](https://semver.org/).  

### Usage
    npx react-native-versioning \
    -t --target <versionCode> \
    -b --build <buildNumber> \
    --android-only \
    --ios-only

### Example
    npx react-native-versioning --target=2.1.1
    npx react-native-versioning --build=17
    npx react-native-versioning --build=18 --ios-only
    npx react-native-versioning --target=2.3 --build=16 --android-only

## Step 3: Create a PR
Create a version bump PR with the adjusted versions as explained above

> **NOTE:** The version in the package.json and the actual release will be explained in 
> [step 4](#step-4-create-a-new-release).

## Step 4: Create a new release
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
