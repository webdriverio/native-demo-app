# Contributing
## Setting up the development environment

If you want to contribute to the project we advise you to first set up your machine for Expo development. Follow the Expo documentation which can be found [here](https://docs.expo.dev/get-started/installation/). Make sure you have:

- Node.js 18 or higher
- npm or yarn
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Setting up the project
After setting up your machine you can:

- Fork/Clone the project

  `git clone https://github.com/webdriverio/native-demo-app.git`

- Create a branch for the bug/feature you want to work on

  `git checkout -b {your-branch-name}`

- Install all dependencies

  `npm install`

## Running our Expo application

### Step 1: Start Expo Development Server

To start the Expo development server (with cleared cache), run the following from your project folder:

```sh
npm start
```

> [!NOTE]
> Expo uses [Metro](https://metrobundler.dev/) as the JavaScript bundler, which is similar to bundlers such as Vite and webpack, but designed for React Native. Metro uses [Babel](https://babel.dev/) to transform syntax such as JSX into executable JavaScript.

> [!TIP]
> With the development client enabled, the app will automatically reconnect to the development server when you reopen it, as long as the server is still running. This makes development much smoother!

### Step 2: Start the application

You have several options to run the app:

**Option A: Using Expo CLI (Recommended for development)**
```shell
# For Android
npm run android

# For iOS
npm run ios
```

**Option B: Using Expo Go app**
1. Install [Expo Go](https://expo.dev/client) on your physical device
2. Scan the QR code shown in the terminal or browser
3. The app will load on your device

> [!NOTE]
> Some native modules may not work with Expo Go. For full functionality, use `npm run android` or `npm run ios` which creates a development build.

> [!TIP]
> **Automatic Reconnection**: After building with `npm run ios` or `npm run android`, the app will automatically reconnect to the development server when you reopen it (as long as `npm start` is running). You don't need to manually connect each time!

You should see your app running in the Android Emulator, iOS Simulator, or on your physical device shortly.

### Step 3 Developing

You can now start working on the code base. All code can be found in the [`src`](../src/) folder.

## Building a release build
The development build for Android and iOS needs the [Expo development server](#step-1-start-expo-development-server), but a **release** for an emulator/simulator/real device is not connected to the development server. This means we need to create a release build. Follow the steps below to generate one and also where to find the output.

When a PR is merged to the `main` branch the release build can be found in the GitHub-action assets.

### Building Android

> [!IMPORTANT]
> The [release keystore](../android/app/wdio-native-app-upload-key.keystore) is saved in this project. This is normally not a good advice, but this project isn't publishing to the Play Store so all data is filled with dummy data. This allows us to make a signed build.

Creating an Android build can be done by running the following command:

```sh
npm run android:release
```

This command will:
1. Clean and regenerate the native Android project (using `prebuild:clean`)
2. Build the release APK using Expo's build system

It will take a few minutes to build a release. The `apk`-file can be found in [`android/app/build/outputs/apk/release/`](../android/app/build/outputs/apk/release/).

### Building iOS

> [!NOTE]
> Release builds can only be used on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the instructions [here](https://docs.expo.dev/build/building-on-ci/#ios)

> [!NOTE]
> Before building, make sure you have run `npm run prebuild` at least once to generate the native iOS project, and run `pod install` in the `ios` directory.

Making an iOS build can be done by running the following command 

```sh
npm run ios:release
```

The app will automatically be installed on your Simulator. You can find the location of the built app in the build output logs.

## Troubleshooting

### Debugging

#### Opening the Developer Menu

To access debugging options, open the developer menu:

- **iOS Simulator**: Press `Cmd + D` or `Cmd + Ctrl + Z`
- **Android Emulator**: Press `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux)
- **Physical Device**: Shake the device

#### Chrome DevTools (JavaScript Debugging)

##### iOS

1. Open the developer menu (see above)
2. Select **"Debug"** or **"Open Debugger"**
3. Chrome DevTools will automatically open at `http://localhost:8081/debugger-ui/`

##### Android

On Android, debugging works best with React Native DevTools. Here are the recommended methods:

**Method 1: React Native DevTools (Recommended)**

React Native DevTools is built into Metro bundler. To use it:

1. Open the developer menu in your app (press `Cmd + M` or shake device)
2. Select **"Open DevTools"** (if available) OR press `j` in the Metro bundler terminal
3. React Native DevTools will open in your browser automatically

**Method 2: React Native Debugger (Standalone App)**

If the built-in DevTools don't work or you prefer a standalone app:

```bash
# Install via Homebrew (Mac)
brew install --cask react-native-debugger

# Or download from: https://github.com/jhen0409/react-native-debugger/releases
```

Then:
1. Open React Native Debugger application
2. Enable debugging in your app's developer menu (select "Debug")
3. React Native Debugger will connect automatically

**Method 3: Traditional Chrome DevTools (Fallback)**

If the above methods don't work, you can try traditional Chrome DevTools:

1. Open the developer menu in your app
2. Select **"Debug"** or **"Open JS Debugger"**
3. Chrome should open automatically. If it doesn't:
   - Set Chrome as your default browser
   - Or manually navigate to `http://localhost:8081/debugger-ui/` after enabling debugging
   - Make sure you enable debugging in the app FIRST before opening the URL

> [!NOTE]
> If you get errors when using `debugger-ui`, it might be due to Metro bundler issues. Try:
> - Restarting the Metro bundler: Stop `npm start` and run it again
> - Clearing cache: Run `npm start` (which includes `--clear` flag)
> - Check Metro terminal for error messages
> - Use React Native DevTools (Method 1) instead

##### Using Chrome DevTools

Once Chrome DevTools is open, you can:
- Set breakpoints in your JavaScript code
- Inspect variables and call stacks
- View console logs
- Debug network requests
- Use the Console tab to run JavaScript commands

#### React DevTools (Component Inspection)

To inspect React components and their props/state:

1. Install React DevTools browser extension:
   - [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
   - [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. Open the developer menu in your app
3. Select **"Debug"** to open Chrome DevTools
4. The React DevTools tab will appear in Chrome DevTools

Alternatively, you can use the standalone React DevTools:

```bash
# Install globally
npm install -g react-devtools

# Run it
react-devtools
```

#### WebView Debugging

The WebView screen in this app has debugging enabled. To debug WebView content:

1. Open the WebView screen in the app
2. Open Chrome and navigate to `chrome://inspect`
3. Find your WebView under "Remote Target"
4. Click "inspect" to open Chrome DevTools for the WebView content

> [!TIP]
> This is especially useful for debugging WebView interactions when testing with Appium.

#### Network Debugging

With `expo-dev-client`, network requests can be inspected:

1. Open the developer menu
2. Select **"Debug"** to open Chrome DevTools
3. Go to the **Network** tab in Chrome DevTools
4. All network requests from your app will appear here

### Prebuild
If you need to regenerate the native iOS and Android projects (for example, after adding a new native module), run:

```sh
npm run prebuild
```

To clean and regenerate:
```sh
npm run prebuild:clean
```

### iOS Pods
If you encounter issues with iOS dependencies, try:

```sh
npm run ios:prebuild
# or
cd ios && pod install && cd ..
```


### General Troubleshooting
- For Expo-specific issues, see the [Expo troubleshooting guide](https://docs.expo.dev/troubleshooting/clear-cache/)
- For React Native issues, see the [React Native troubleshooting guide](https://reactnative.dev/docs/troubleshooting)
