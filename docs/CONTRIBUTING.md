# Contributing

For contributing / building the iOS and Android app it's best to have a Mac. Make sure you've set up the React Native environment.
Please check the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page for that

## Install
This will only work on a MAC so get started execute the following steps:

1. Clone the project: `git clone https://github.com/wswebcreation/wdio-native-demo-app.git`
2. Go to the folder: `cd wdio-native-demo-app`
3. Install all (dev)dependencies: `npm install`
4. Start the project for iOS `npm run ios`, for Android run `npm run android`. This will start the app in development mode and you can start developing
5. Happy playing!

> For more info about React Native please use Google or the [React Native docs](https://facebook.github.io/react-native/)

## Building iOS
Making an iOS build can be done by running the following command `npm run ios.build`.
The output can be found in `ios/build/Build/Products/Debug-iphonesimulator/`

## Building Android
Making an Android build can be done by running the following commands

1. `npm run android.clear.build`
2. `npm run android`, this will install the app and starts building the js. Wait until all JS has been compiled
3. Kill the metro bundler
4. `npm run android.build.js`
5. `npm run android.debug`

The output can be found in `android/app/build/outputs/apk/app-debug.apk`
