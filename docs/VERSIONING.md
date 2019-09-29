# Versioning the App

Versioning the app needs to be a manual step. Follow the instructions below to update the versions 

## Table of contents
1. [Versioning project](#versioning-project)
1. [Versioning iOS](#versioning-ios)
1. [Versioning Android](#versioning-android)
1. [When done](#when-done)

## Versioning project
Open the `package.json` and update  the version to the version you need, try to use [SEMVER](https://nodesource.com/blog/semver-a-primer/), meaning using this 

    x.y.z

- `x`: This is a `MAJOR` release, there are for example breaking changes
- `y`: This is a `MINOR` release and can hold for example new features
- `z`: This is a `PATCH` release which holds fixes


## Versioning iOS
Open the following file [`ios/wdioDemoApp/Info.plist`](../ios/wdioDemoApp/Info.plist) and change this code

```
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleSignature</key>
<string>????</string>
<key>CFBundleVersion</key>
<string>1</string>
```

To this

```
<key>CFBundleShortVersionString</key>
<string>x.y.z</string>
<key>CFBundleSignature</key>
<string>????</string>
<key>CFBundleVersion</key>
<string>{current value + 1}</string>
```

Open the following file [`ios/wdioDemoApp.xcodeproj/project.pbxproj`](../ios/wdioDemoApp.xcodeproj/project.pbxproj) and change all `CURRENT_PROJECT_VERSION = 1;` to `CURRENT_PROJECT_VERSION = {current value + 1};`

## Versioning Android
Open the following file [`android/app/build.gradle`](../android/app/build.gradle) and change this code

```
versionCode 1
versionName "1.0.0"
```

to

```
versionCode {current value + 1}
versionName "x.y.z"
```

## When done
When all changes are executed create a feature branch and a PR
