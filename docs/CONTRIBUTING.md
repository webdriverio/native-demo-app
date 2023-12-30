# Contributing
## Setting up the development environment

If you want to contribute to the project we advise you to first set up your machine as described in the React Native documentation which can be found [here](https://reactnative.dev/docs/environment-setup). Make sure you follow the *React Native CLI Quickstart* guide.

## Setting up the project
After setting up your machine you can:

- Fork/Clone the project

  `git clone https://github.com/webdriverio/native-demo-app.git`

- Create a branch for the bug/feature you want to work on

  `git checkout -b {your-branch-name}`

- Install all dependencies

  `npm install`

## Running our React Native application

### Step 1: Start Metro

[**Metro**](https://metrobundler.dev/) is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder:

```sh
npm start
```

> [!NOTE]
> If you're familiar with web development, Metro is similar to bundlers such as Vite and webpack, but is designed end-to-end for React Native. For instance, Metro uses [Babel](https://babel.dev/) to transform syntax such as JSX into executable JavaScript.

### Step 2: Start the application
Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```shell
# For Android
npm run android.dev

# For iOS
npm run ios.dev
```

You should see your new app running in the Android Emulator or iOS Simulator shortly.

## Step 3 Developing
You can now start working on the code base. All code can be found in the [`src`](../src/) folder.

## Troubleshooting
You can find more information about troubleshooting the installation process [here](https://reactnative.dev/docs/troubleshooting).

## Building a release build
The development build for Android and iOS needs the [Metro bundler](#step-1-start-metro), but a **release** for an emulator/simulator/real device is not connected to the Metro bundler. This means we need to create a release build. Follow the steps below to generate one and also where to find the output.

When a PR is merged to the `main` branch the release build can be found in the GitHub-action assets.

### Building Android

> [!IMPORTANT]
> The [release keystore](../android/app/wdio-native-app-upload-key.keystore) is saved in this project. This is normally not a good advice, but this project isn't publishing to the Play Store so all data is filled with dummy data. This allows us to make a signed build.

Creating an Android build can be done by running the following command 

```sh
npm run android.release
```

It will take a few minutes to build a release.

The output will look something like this:

<details>
  <summary>ExampleAndroid Build Logs</summary>

```log
> wdiodemoapp@1.0.0 android.release
> cd android && ./gradlew clean && npm run build.version.android && ./gradlew assembleRelease


> Configure project :expo

Using expo modules
  - expo-constants (15.4.2)
  - expo-file-system (16.0.2)
  - expo-font (11.10.0)
  - expo-keep-awake (12.8.0)
  - expo-local-authentication (13.6.0)
  - expo-modules-core (1.11.4)
  - expo-modules-core$android-annotation (1.11.4)
  - expo-modules-core$android-annotation-processor (1.11.4)


> Configure project :react-native-reanimated
Android gradle plugin: 8.1.1
Gradle: 8.3

> Task :expo-modules-core:externalNativeBuildCleanDebug
Clean expo-modules-core-armeabi-v7a
Clean expo-modules-core-arm64-v8a
Clean expo-modules-core-x86
Clean expo-modules-core-x86_64

> Task :expo-modules-core:externalNativeBuildCleanRelease
Clean expo-modules-core-armeabi-v7a
Clean expo-modules-core-arm64-v8a
Clean expo-modules-core-x86
Clean expo-modules-core-x86_64

BUILD SUCCESSFUL in 4s
30 actionable tasks: 25 executed, 5 up-to-date

> wdiodemoapp@1.0.0 build.version.android
> react-native-version -A -b --target android

[RNV] Versioning Android...
[RNV] Android updated
[RNV] Done

> Configure project :expo

Using expo modules
  - expo-constants (15.4.2)
  - expo-file-system (16.0.2)
  - expo-font (11.10.0)
  - expo-keep-awake (12.8.0)
  - expo-local-authentication (13.6.0)
  - expo-modules-core (1.11.4)
  - expo-modules-core$android-annotation (1.11.4)
  - expo-modules-core$android-annotation-processor (1.11.4)


> Configure project :react-native-reanimated
Android gradle plugin: 8.1.1
Gradle: 8.3

> Task :react-native-vector-icons:processReleaseManifest
package="com.oblador.vectoricons" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-vector-icons/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.oblador.vectoricons" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-vector-icons/android/src/main/AndroidManifest.xml.

> Task :react-native-vector-icons:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-picker_picker:processReleaseManifest
package="com.reactnativecommunity.picker" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/@react-native-picker/picker/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.reactnativecommunity.picker" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/@react-native-picker/picker/android/src/main/AndroidManifest.xml.

> Task :react-native-picker_picker:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :expo-modules-core:processReleaseManifest
/Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/AndroidManifest.xml:8:9-11:45 Warning:
        meta-data#com.facebook.soloader.enabled@android:value was tagged at AndroidManifest.xml:8 to replace other declarations but no other declaration present

> Task :expo-file-system:processReleaseManifest
/Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-file-system/android/src/main/AndroidManifest.xml:6:9-8:20 Warning:
        provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:6 to replace other declarations but no other declaration present

> Task :react-native-biometrics:processReleaseManifest
package="com.rnbiometrics" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-biometrics/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.rnbiometrics" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-biometrics/android/src/main/AndroidManifest.xml.

> Task :react-native-bootsplash:processReleaseManifest
package="com.zoontek.rnbootsplash" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-bootsplash/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.zoontek.rnbootsplash" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-bootsplash/android/src/main/AndroidManifest.xml.

> Task :react-native-bootsplash:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-device-info:processReleaseManifest
package="com.learnium.RNDeviceInfo" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-device-info/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.learnium.RNDeviceInfo" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-device-info/android/src/main/AndroidManifest.xml.

> Task :react-native-device-info:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-gesture-handler:processReleaseManifest
package="com.swmansion.gesturehandler" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.swmansion.gesturehandler" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/AndroidManifest.xml.

> Task :react-native-reanimated:processReleaseManifest
package="com.swmansion.reanimated" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-reanimated/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.swmansion.reanimated" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-reanimated/android/src/main/AndroidManifest.xml.

> Task :react-native-reanimated:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-gesture-handler:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/core/GestureHandler.kt:770:11 Name shadowed: size
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerButtonViewManager.kt:23:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerButtonViewManager.kt:35:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEnabledRootView.kt:9:51 Unreachable code
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEnabledRootView.kt:10:80 Unreachable code
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerModule.kt:14:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerRootHelper.kt:80:18 'onChildStartedNativeGesture(MotionEvent!): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerRootHelper.kt:86:42 Parameter 'disallowIntercept' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerRootHelper.kt:118:28 Parameter 'viewTag' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerRootViewManager.kt:3:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerRootViewManager.kt:15:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerTouchEvent.kt:7:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerTouchEvent.kt:14:11 'init(Int): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerTouchEvent.kt:30:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerTouchEvent.kt:31:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java

> Task :expo-modules-core:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/core/utilities/EmulatorUtilities.kt:30:13 'SERIAL: String!' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:151:13 Variable 'catalystInstance' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/ExpoModulesHelper.kt:11:21 'newInstance(): T!' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/ModuleRegistry.kt:49:25 'newInstance(): T!' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/Promise.kt:72:18 This declaration overrides deprecated member but not marked as deprecated itself. This deprecation won't be inherited in future releases. Please add @Deprecated annotation or suppress. See https://youtrack.jetbrains.com/issue/KT-47902 for details
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/Utils.kt:8:3 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/ActivityResultsManager.kt:51:24 Parameter 'activity' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:119:51 'getParcelableExtra(String!): T?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:186:26 'getParcelable(String?): T?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:277:83 'getParcelable(String?): T?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/DataPersistor.kt:67:20 'getSerializable(String?): Serializable?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/DataPersistor.kt:85:26 'getSerializable(String?): Serializable?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:186:54 Parameter 'request' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:210:54 Parameter 'request' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:230:15 Parameter 'now' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:230:54 Parameter 'request' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/events/KModuleEventEmitterWrapper.kt:90:7 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:90:33 Parameter 'null' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:91:34 Parameter 'null' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:132:5 Parameter 'null' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/sharedobjects/SharedObjectRegistry.kt:54:35 Destructured parameter 'js' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:33:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:40:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:50:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:56:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:76:12 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:79:12 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:82:11 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:85:11 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:99:12 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:102:11 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:114:12 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:117:11 Parameter 'type' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/JSTypeConverterHelper.kt:44:17 'get(String!): Any?' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/TypeConverterProvider.kt:174:46 'newInstance(): T!' is deprecated. Deprecated in Java

> Task :expo-modules-core:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :expo-constants:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-constants/android/src/main/java/expo/modules/constants/ConstantsService.kt:127:14 'versionCode: Int' is deprecated. Deprecated in Java

> Task :expo-local-authentication:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-local-authentication/android/src/main/java/expo/modules/localauthentication/LocalAuthenticationModule.kt:146:19 'onActivityResult(Int, Int, Intent?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-local-authentication/android/src/main/java/expo/modules/localauthentication/LocalAuthenticationModule.kt:278:60 'createConfirmDeviceCredentialIntent(CharSequence!, CharSequence!): Intent!' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo-local-authentication/android/src/main/java/expo/modules/localauthentication/LocalAuthenticationModule.kt:279:26 'startActivityForResult(Intent, Int): Unit' is deprecated. Deprecated in Java

> Task :expo:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:139:50 No cast needed

> Task :react-native-safe-area-context:processReleaseManifest
package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.

> Task :react-native-screens:processReleaseManifest
package="com.swmansion.rnscreens" found in source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.swmansion.rnscreens" from the source AndroidManifest.xml: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/AndroidManifest.xml.

> Task :react-native-safe-area-context:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextModule.kt:7:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextModule.kt:9:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:26:51 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:28:11 'constructor ReactModuleInfo(String!, String!, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:34:27 'hasConstants: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaProviderManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaProviderManager.kt:11:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'getter for uiImplementation: UIImplementation!' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewManager.kt:14:2 'ReactModule' is deprecated. Deprecated in Java

> Task :react-native-webview:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:40:71 Parameter 'webView' is never used, could be renamed to _
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:81:18 'setter for allowFileAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:82:18 'setter for allowUniversalAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:93:102 Parameter 'contentLength' is never used, could be renamed to _
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:110:32 Variable 'urlObj' initializer is redundant
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:124:21 'allowScanningByMediaScanner(): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:161:36 'setter for systemUiVisibility: Int' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:336:15 Condition 'args == null' is always 'false'
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:345:34 Condition 'args != null' is always 'true'
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:364:38 'setter for allowUniversalAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:421:51 Unchecked cast: Any! to kotlin.collections.HashMap<String, String> /* = java.util.HashMap<String, String> */
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:477:23 'setter for savePassword: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:478:23 'setter for saveFormData: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:548:23 'setter for allowFileAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:647:53 Unchecked cast: ArrayList<Any!> to List<Map<String, String>>
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:667:23 'setter for saveFormData: Boolean' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:702:36 Parameter 'viewWrapper' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:10:75 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:21:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:22:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:11:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:22:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:23:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:12:3 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:23:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:24:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:10:89 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:27:42 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:28:21 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java

> Task :react-native-screens:compileReleaseKotlin
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:5:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:10:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:65:28 'setter for targetElevation: Float' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:128:28 'setter for targetElevation: Float' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:86:34 'getter for systemWindowInsetTop: Int' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:229:37 'setColorFilter(Int, PorterDuff.Mode): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:7:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:18:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderSubviewManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderSubviewManager.kt:12:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:15:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:24:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:47:42 'setStateWrapper(StateWrapper!): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:137:47 'replaceSystemWindowInsets(Int, Int, Int, Int): WindowInsetsCompat' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:138:51 'getter for systemWindowInsetLeft: Int' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:140:51 'getter for systemWindowInsetRight: Int' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:141:51 'getter for systemWindowInsetBottom: Int' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:17:2 'ReactModule' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:100:22 Parameter 'view' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:100:43 Parameter 'placeholder' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarView.kt:147:43 Parameter 'flag' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:10:5 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:17:44 'RCTEventEmitter' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:20:25 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:5:37 'FabricViewStateManager' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:9:48 'FabricViewStateManager' is deprecated. Deprecated in Java
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:11:42 Parameter 'width' is never used
w: file:///Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:11:54 Parameter 'height' is never used

> Task :react-native-safe-area-context:compileReleaseJavaWithJavac
Note: /Users/wimselles/Git/wdio/native-demo-app/node_modules/react-native-safe-area-context/android/src/paper/java/com/th3rdwave/safeareacontext/NativeSafeAreaContextSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-webview:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :app:createBundleReleaseJsAndAssets
debug Reading Metro config from /Users/wimselles/Git/wdio/native-demo-app/metro.config.js
warning: the transform cache was reset.
                Welcome to Metro v0.80.2
              Fast - Scalable - Integrated


warning: Watchman `watch-project` returned a warning: Recrawled this watch 3 times, most recently because:
MustScanSubDirs UserDroppedTo resolve, please review the information on
https://facebook.github.io/watchman/docs/troubleshooting.html#recrawl
To clear this warning, run:
`watchman watch-del '/Users/wimselles/Git/wdio/native-demo-app' ; watchman watch-project '/Users/wimselles/Git/wdio/native-demo-app'`

warning: Watchman `query` returned a warning: Recrawled this watch 3 times, most recently because:
MustScanSubDirs UserDroppedTo resolve, please review the information on
https://facebook.github.io/watchman/docs/troubleshooting.html#recrawl
To clear this warning, run:
`watchman watch-del '/Users/wimselles/Git/wdio/native-demo-app' ; watchman watch-project '/Users/wimselles/Git/wdio/native-demo-app'`

Recrawled this watch 3 times, most recently because:
MustScanSubDirs UserDroppedTo resolve, please review the information on
https://facebook.github.io/watchman/docs/troubleshooting.html#recrawl
To clear this warning, run:
`watchman watch-del '/Users/wimselles/Git/wdio/native-demo-app' ; watchman watch-project '/Users/wimselles/Git/wdio/native-demo-app'`

info Writing bundle output to:, /Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle
info Writing sourcemap output to:, /Users/wimselles/Git/wdio/native-demo-app/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
info Done writing bundle output
info Done writing sourcemap output
info Copying 23 asset files
info Done copying assets
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:2601:18: warning: the variable "DebuggerInternal" was not declared in function "__shouldPauseOnThrow"
          typeof DebuggerInternal !== 'undefined' &&
                 ^~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:6259:7: warning: the variable "setTimeout" was not declared in function "logCapturedError"
      setTimeout(function () {
      ^~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:4228:108: warning: the variable "nativeFabricUIManager" was not declared in function "onChange"
...lInstanceHandle ? (from && nativeFabricUIManager.setIsJSResponder(from.sta...
                              ^~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:4840:21: warning: the variable "clearTimeout" was not declared in anonymous function " 114#"
    cancelTimeout = clearTimeout;
                    ^~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:8590:30: warning: the variable "__REACT_DEVTOOLS_GLOBAL_HOOK__" was not declared in anonymous function " 114#"
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                             ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:10975:5: warning: the variable "setImmediate" was not declared in function "handleResolved"
    setImmediate(function () {
    ^~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15262:12: warning: the variable "fetch" was not declared in anonymous function " 351#"
    fetch: fetch,
           ^~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15263:14: warning: the variable "Headers" was not declared in anonymous function " 351#"
    Headers: Headers,
             ^~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15264:14: warning: the variable "Request" was not declared in anonymous function " 351#"
    Request: Request,
             ^~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15265:15: warning: the variable "Response" was not declared in anonymous function " 351#"
    Response: Response
              ^~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15422:24: warning: the variable "FileReader" was not declared in function "readBlobAsArrayBuffer"
      var reader = new FileReader();
                       ^~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15473:36: warning: the variable "Blob" was not declared in anonymous function " 362#"
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                                   ^~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15475:40: warning: the variable "FormData" was not declared in anonymous function " 362#"
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                                       ^~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15477:44: warning: the variable "URLSearchParams" was not declared in anonymous function " 362#"
...e if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body...
                                 ^~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15596:26: warning: the variable "AbortController" was not declared in anonymous function " 368#"
          var ctrl = new AbortController();
                         ^~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15730:23: warning: the variable "XMLHttpRequest" was not declared in anonymous function " 372#"
        var xhr = new XMLHttpRequest();
                      ^~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:15275:71: warning: the variable "self" was not declared in anonymous function " 354#"
...undefined' && globalThis || typeof self !== 'undefined' && self ||
                                      ^~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:25889:27: warning: the variable "performance" was not declared in anonymous function " 676#"
  if ("object" === typeof performance && "function" === typeof performance.no...
                          ^~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:25912:26: warning: the variable "navigator" was not declared in anonymous function " 676#"
  "undefined" !== typeof navigator && undefined !== navigator.scheduling && u...
                         ^~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26022:37: warning: the variable "MessageChannel" was not declared in anonymous function " 676#"
  };else if ("undefined" !== typeof MessageChannel) {
                                    ^~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26037:34: warning: the variable "nativeRuntimeScheduler" was not declared in anonymous function " 676#"
... = "undefined" !== typeof nativeRuntimeScheduler ? nativeRuntimeScheduler....
                             ^~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:35324:34: warning: the variable "requestAnimationFrame" was not declared in function "start 9#"
...    this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
                              ^~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:109889:19: warning: the variable "_getAnimationTimestamp" was not declared in function "handleAndFlushAnimationFrame 1#"
        var now = _getAnimationTimestamp();
                  ^~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:110009:11: warning: the variable "_WORKLET" was not declared in function "runOnRuntime"
      if (_WORKLET) {
          ^~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:110014:18: warning: the variable "_scheduleOnRuntime" was not declared in anonymous function " 2292#"
          return _scheduleOnRuntime(workletRuntime, (0, _$$_REQUIRE(_dependen...
                 ^~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:110357:114: warning: the variable "location" was not declared in function "registerSensor 1#"
...E(_dependencyMap[4]).isWeb)() && location.protocol !== 'https:' ? ' Make s...
                                    ^~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:110870:26: warning: Direct call to eval(), but lexical scope is not supported.
            workletFun = eval('(' + initData.code + '\n)');
                         ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:111179:20: warning: the variable "_makeShareableClone" was not declared in function "cloneRecursive"
            return _makeShareableClone(value);
                   ^~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:111530:11: warning: the variable "queueMicrotask" was not declared in anonymous function " 2350#"
          queueMicrotask(function () {
          ^~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:111660:9: warning: the variable "_scheduleOnJS" was not declared in anonymous function " 2362#"
        _scheduleOnJS(fun, args.length > 0 ?
        ^~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:111780:13: warning: the variable "_updateDataSynchronously" was not declared in function "set _value 1#"
            _updateDataSynchronously(syncDataHolder, (0, _$$_REQUIRE(_depende...
            ^~~~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:112414:9: warning: the variable "_notifyAboutProgress" was not declared in anonymous function " 2390#"
        _notifyAboutProgress(tag, sharedValue.value, isSharedTransition);
        ^~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:112432:7: warning: the variable "_notifyAboutEnd" was not declared in function "stopObservingProgress"
      _notifyAboutEnd(tag, removeView);
      ^~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:117748:11: warning: the variable "_updatePropsFabric" was not declared in function "flush 1#"
          _updatePropsFabric(operations);
          ^~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:117777:11: warning: the variable "_updatePropsPaper" was not declared in function "flush 2#"
          _updatePropsPaper(operations);
          ^~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127254:18: warning: the variable "message" was not declared in anonymous function " 2996#"
          return message;
                 ^~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127286:5: warning: the variable "jest" was not declared in function "beforeTest"
    jest.useFakeTimers();
    ^~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127423:7: warning: the variable "_dispatchCommandFabric" was not declared in function "dispatchCommandFabric"
      _dispatchCommandFabric(shadowNodeWrapper, commandName, args);
      ^~~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127441:7: warning: the variable "_dispatchCommandPaper" was not declared in function "dispatchCommandPaper"
      _dispatchCommandPaper(viewTag, commandName, args);
      ^~~~~~~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127552:22: warning: the variable "_measureFabric" was not declared in function "measureFabric"
      var measured = _measureFabric(viewTag);
                     ^~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127586:22: warning: the variable "_measurePaper" was not declared in function "measurePaper"
      var measured = _measurePaper(viewTag);
                     ^~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127674:7: warning: the variable "_scrollToPaper" was not declared in function "scrollToPaper"
      _scrollToPaper(viewTag, x, y, animated);
      ^~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:127721:7: warning: the variable "_setGestureState" was not declared in function "setGestureStateNative"
      _setGestureState(handlerTag, newState);
      ^~~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:131802:45: warning: the variable "structuredClone" was not declared in function "handleLayoutTransition"
...ormCopy = existingTransform ? structuredClone(existingTransform) : [];
                                 ^~~~~~~~~~~~~~~
/Users/wimselles/Git/wdio/native-demo-app/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:132184:7: warning: the variable "_removeFromPropsRegistry" was not declared in function "removeFromPropsRegistryOnUI"
      _removeFromPropsRegistry(viewTags);
      ^~~~~~~~~~~~~~~~~~~~~~~~

> Task :app:processReleaseMainManifest
/Users/wimselles/Git/wdio/native-demo-app/android/app/src/main/AndroidManifest.xml Warning:
        provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:0 to replace other declarations but no other declaration present

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.3/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

BUILD SUCCESSFUL in 57s
673 actionable tasks: 585 executed, 88 up-to-date
```

</details>


The `apk`-file can be found in [`android/app/build/outputs/apk/release/`](../android/app/build/outputs/apk/release/).

### Building iOS

> [!NOTE]
> Release builds can only be used on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the instructions [here](https://reactnative.dev/docs/running-on-device)

Making an iOS build can be done by running the following command 

```sh
npm run ios.release.sim.build
```

The output will look something like this

<details>
  <summary>Example iOS Simulator Build Logs</summary>

```log
> wdiodemoapp@1.0.0 ios.release.sim.build
> npm run ios.pods && npm run build.version.ios && react-native run-ios --mode=Release


> wdiodemoapp@1.0.0 ios.pods
> cd ios && pod install && cd ..

Using Expo modules
[Expo] Enabling modular headers for pod ExpoModulesCore
Auto-linking React Native modules for target `wdiodemoapp`: RNBootSplash, RNCPicker, RNDeviceInfo, RNGestureHandler, RNReanimated, RNScreens, react-native-biometrics, react-native-safe-area-context, and react-native-webview
Framework build type is static library
[Codegen] Generating ./build/generated/ios/React-Codegen.podspec.json
[Codegen] generating an empty RCTThirdPartyFabricComponentsProvider
Analyzing dependencies
[Codegen] Found FBReactNativeSpec
[Codegen] Found rncore
Downloading dependencies
Generating Pods project
Setting USE_HERMES build settings
Setting REACT_NATIVE build settings
Setting CLANG_CXX_LANGUAGE_STANDARD to c++20 on /Users/wimselles/Git/wdio/native-demo-app/ios/wdiodemoapp.xcodeproj
Pod install took 9 [s] to run
Integrating client project
expo_patch_react_imports! took 0.1642 seconds to transform files.
Pod installation complete! There are 89 dependencies from the Podfile and 77 total pods installed.

> wdiodemoapp@1.0.0 build.version.ios
> react-native-version -A -b -L --target ios

[RNV] Versioning iOS...
[RNV] iOS updated
[RNV] Done
info A dev server is already running for this project on port 8081.
info Found Xcode workspace "wdiodemoapp.xcworkspace"
info Found booted iPhone 15
info Building (using "xcodebuild -workspace wdiodemoapp.xcworkspace -configuration Release -scheme wdiodemoapp -destination id=937B028C-B107-4B94-B4D5-1297A1FEDC34")
success Successfully built the app
2023-12-29 16:47:35.305 xcodebuild[85874:4718737] Requested but did not find extension point with identifier Xcode.InterfaceBuilderBuildSupport.PlatformDefinition
info Installing "/Users/wimselles/Library/Developer/Xcode/DerivedData/wdiodemoapp-dsosmcwovazosxetsdjzqnhzervv/Build/Products/Release-iphonesimulator/wdiodemoapp.app on iPhone 15"
info Launching "org.reactjs.native.example.wdiodemoapp"
success Successfully launched the app on the simulator
```

</details>

You can also find the location of the app in the logs. The app will automatically be installed on your Simulator.
