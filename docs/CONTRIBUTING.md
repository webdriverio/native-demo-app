# Contributing
## Setting up the development environment
> This project uses React Native version [`0.64`](./package.json). Make sure that if you use the
> [docs](https://reactnative.dev) that you select the correct version.

If you want to contribute to the project we advise you to first set up your machine as described in the React Native 
documentation which can be found [here](https://reactnative.dev/docs/environment-setup). Make sure you follow the
*React Native CLI Quickstart*-guide.

## Setting up the project
After setting up your machine you can:

- Fork/Clone the project
- Create a branch for the bug/feature you want to work on
- To install all dependencies you need to use [yarn](https://classic.yarnpkg.com/lang/en/). 
  This project uses yarn version 1. 
  
  > **NOTE: !!Do not use yarn 2, this will not work with React Native!!** 
  
  You can install yarn by following [these](https://classic.yarnpkg.com/en/docs/install) steps.
- After installing yarn you can install all dependencies. Make sure you are in the root of the project and enter
  `yarn install`. This will result in logs like this
  
  ```log
  yarn install
  yarn install v1.22.10
  [1/4] 🔍  Resolving packages...
  [2/4] 🚚  Fetching packages...
  [3/4] 🔗  Linking dependencies...
  warning "react-native > react-native-codegen > jscodeshift@0.11.0" has unmet peer dependency "@babel/preset-env@^7.1.6".
  warning " > react-native-webview@11.4.3" has incorrect peer dependency "react-native@>=0.60 <0.64".
  [4/4] 🔨  Building fresh packages...
  ✨  Done in 13.63s.
  ```

## Running our React Native application
### Step 1: Start Metro
First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file 
and various options, and returns a single JavaScript file that includes all your code and its dependencies."
—[Metro Docs](https://facebook.github.io/metro/docs/concepts/)

To start Metro, run `yarn start` inside our project folder:

    yarn start

`yarn start` starts Metro Bundler.

> If you're familiar with web development, Metro is a lot like webpack—for React Native apps. Unlike Kotlin or Java, 
> JavaScript isn't compiled—and neither is React Native. Bundling isn't the same as compiling, but it can help improve 
> startup performance and translate some platform-specific JavaScript into more widely supported JavaScript.

### Step 2: Start the application
Let Metro Bundler run in its own terminal. Open a new terminal inside our project folder. Run the following for Android:

    yarn android.dev

You should see an Android Emulator being started. After that it will install the app. You should see logs like this

```log
yarn android.dev
yarn run v1.22.10
$ yarn android.clean && react-native run-android
$ cd android && ./gradlew clean && cd .. 
Starting a Gradle Daemon (subsequent builds will be faster)

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.7/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 11s
10 actionable tasks: 1 executed, 9 up-to-date
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 1026 file(s) to forward-jetify. Using 8 workers...
info JS server already running.
info Installing the app...

> Task :react-native-gesture-handler:compileDebugJavaWithJavac

> Task :react-native-picker_picker:compileDebugJavaWithJavac

> Task :react-native-screens:compileDebugJavaWithJavac

> Task :react-native-webview:compileDebugJavaWithJavac

> Task :app:compileDebugJavaWithJavac

> Task :app:stripDebugDebugSymbols
Unable to strip the following libraries, packaging them as they are: libc++_shared.so, libevent-2.1.so, libevent_core-2.1.so, libevent_extra-2.1.so, libfb.so, libfbjni.so, libflipper.so, libfolly_futures.so, libfolly_json.so, libglog.so, libglog_init.so, libhermes-executor-common-debug.so, libhermes-executor-common-release.so, libhermes-executor-debug.so, libhermes-executor-release.so, libhermes-inspector.so, libimagepipeline.so, libjsc.so, libjscexecutor.so, libjsijniprofiler.so, libjsinspector.so, libnative-filters.so, libnative-imagetranscoder.so, libreact_codegen_reactandroidspec.so, libreact_nativemodule_core.so, libreactnativeblob.so, libreactnativejni.so, libreactnativeutilsjni.so, libreactperfloggerjni.so, libreanimated.so, libturbomodulejsijni.so, libyoga.so.

> Task :app:installDebug
Installing APK 'Android-NativeDemoApp.debug.1.0.apk' on 'Pixel_3_10.0(AVD) - 10' for app:debug
Installed on 1 device.

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.7/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 31s
185 actionable tasks: 185 executed
info Connecting to the development server...
info Starting the app on "emulator-5554"...
Starting: Intent { cmp=com.wdiodemoapp/.MainActivity }
✨  Done in 47.22s.
```

> The `android.dev`-command will also create a clean build for Android by cleaning the build folders.

If you want to run on iOS you can run the following command:

    yarn ios.dev

You should see an iOS Simulator being started. After that it will install the app. You should see logs like this

```log
yarn ios.dev
yarn run v1.22.10
$ yarn ios.pods && react-native run-ios
$ cd ios && pod install && cd ..
Auto-linking React Native modules for target `wdioNativeDemoApp`: RNCMaskedView, RNCPicker, RNGestureHandler, RNReanimated, RNScreens, RNVectorIcons, react-native-biometrics, react-native-safe-area-context, react-native-splash-screen, and react-native-webview
Analyzing dependencies
Downloading dependencies
Generating Pods project
Integrating client project
Pod installation complete! There are 59 dependencies from the Podfile and 50 total pods installed.
info Found Xcode workspace "wdioNativeDemoApp.xcworkspace"
info Building (using "xcodebuild -workspace wdioNativeDemoApp.xcworkspace -configuration Debug -scheme wdioNativeDemoApp -destination id=C445F7FB-4119-448A-A319-A0D2C1B9DBB2")
success Successfully built the app
info Installing "/Users/wswebcreation/Library/Developer/Xcode/DerivedData/wdioNativeDemoApp-fvndfrzxcpozcyeypocnwhbnming/Build/Products/Debug-iphonesimulator/wdioNativeDemoApp.app"
info Launching "org.wdioNativeDemoApp"
success Successfully launched the app on the simulator
✨  Done in 130.31s.
```

> The `ios.dev`-command will automatically install all pod files. For more information, please visit 
> [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html)

## Step 3 Developing
You can now start working on the code base. All code can be found in the [`src`](../src/)-folder.

## Troubleshooting
You can find more information about troubleshooting the installation process 
[here](https://reactnative.dev/docs/troubleshooting).

If you are facing this specific iOS build error

```logs
** BUILD FAILED **

The following build commands failed:
PhaseScriptExecution [CP-User]\ Generate\ Specs /Users/wswebcreation/Library/Developer/Xcode/DerivedData/wdioNativeDemoApp-gmjqxfphavicwkcccsennxqbhvuj/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/FBReactNativeSpec.build/Script-0565B84ED1A643A94B66851B97B33BAC.sh
(1 failure)
```

then please check [this thread here](https://github.com/react-native-community/upgrade-support/issues/138).

## Building a release build
The development build for Android and iOS needs the [Metro bundler](#step-1-start-metro), but a release for on an 
emulator/simulator/real Android device is not connected to the Metro bundler. This means we need to create a release
build. Follow the steps below to generate one and also where to find the output.

When a PR is merged to master the release build can be found in the GitHub-action assets.

### Building iOS
> **NOTE:** This step can only build an iOS-`.app` file that can only be used on a simulator!

Making an iOS build can be done by running the following command `yarn ios.release.sim.build`. The output will look
something like this

```log
yarn ios.release.sim.build
yarn run v1.22.10
$ yarn ios.pods && react-native run-ios --configuration Release
$ cd ios && pod install && cd ..
Auto-linking React Native modules for target `wdioNativeDemoApp`: RNCMaskedView, RNCPicker, RNGestureHandler, RNReanimated, RNScreens, RNVectorIcons, react-native-biometrics, react-native-safe-area-context, react-native-splash-screen, and react-native-webview
Analyzing dependencies
Downloading dependencies
Generating Pods project
Integrating client project
Pod installation complete! There are 59 dependencies from the Podfile and 50 total pods installed.
info Found Xcode workspace "wdioNativeDemoApp.xcworkspace"
info Building (using "xcodebuild -workspace wdioNativeDemoApp.xcworkspace -configuration Release -scheme wdioNativeDemoApp -destination id=C445F7FB-4119-448A-A319-A0D2C1B9DBB2")
success Successfully built the app
info Installing "/Users/{username}/Library/Developer/Xcode/DerivedData/wdioNativeDemoApp-{string}/Build/Products/Release-iphonesimulator/wdioNativeDemoApp.app"
info Launching "org.wdioNativeDemoApp"
success Successfully launched the app on the simulator
✨  Done in 471.87s.
```

You can also find the location of the app in the logs. The app will automatically be installed on your Simulator.

### Building Android
> The [keystore](../android/app/debug.keystore) is saved in this project. This is normally not a good advice, but this
> project isn't publishing to the Play Store so all data is filled with dummy data.
> This allows us to make a signed build.

Making an Android build can be done by running the following command `yarn android.release`. It will take a few minutes
to build a release.

The output will look something like this:

```log
yarn android.release
yarn run v1.22.10
$ cd android && ./gradlew clean && ./gradlew assembleRelease

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.7/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 6s
10 actionable tasks: 10 executed

> Task :app:bundleReleaseJsAndAssets
warning: the transform cache was reset.
                    Welcome to Metro!
              Fast - Scalable - Integrated


info Writing bundle output to:, /Users/{username}/Git/wdio-native-demo-app/android/app/build/generated/assets/react/release/index.android.bundle
info Writing sourcemap output to:, /Users/{username}/Git/wdio-native-demo-app/android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
info Done writing bundle output
info Done writing sourcemap output
info Copying 33 asset files
info Done copying assets

> Task :react-native-gesture-handler:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-picker_picker:compileReleaseJavaWithJavac
Note: /Users/{username}/Git/wdio-native-demo-app/node_modules/@react-native-picker/picker/android/src/main/java/com/reactnativecommunity/picker/ReactPickerManager.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-screens:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-webview:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/{username}/Git/wdio-native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :app:stripReleaseDebugSymbols
Unable to strip the following libraries, packaging them as they are: libc++_shared.so, libfb.so, libfbjni.so, libfolly_futures.so, libfolly_json.so, libglog.so, libglog_init.so, libhermes-executor-common-debug.so, libhermes-executor-common-release.so, libhermes-executor-debug.so, libhermes-executor-release.so, libhermes-inspector.so, libimagepipeline.so, libjsc.so, libjscexecutor.so, libjsijniprofiler.so, libjsinspector.so, libnative-filters.so, libnative-imagetranscoder.so, libreact_codegen_reactandroidspec.so, libreact_nativemodule_core.so, libreactnativeblob.so, libreactnativejni.so, libreactnativeutilsjni.so, libreactperfloggerjni.so, libreanimated.so, libturbomodulejsijni.so, libyoga.so.

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.7/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 1m 40s
278 actionable tasks: 278 executed
✨  Done in 107.40s.
```

The `apk`-file can be found in [`android/app/build/outputs/apk/release/`](../android/app/build/outputs/apk/release/).
