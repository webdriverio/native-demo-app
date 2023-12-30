# WebdriverIO Demo App for iOS and Android

This app is built with React Native and will be used for test automation purposes for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate).

https://user-images.githubusercontent.com/11979740/118520294-3fb8e480-b73a-11eb-9100-dccecbb683cc.mov

## Downloads
Different releases of the iOS and Android app can be downloaded [here](https://github.com/webdriverio/native-demo-app/releases)

> [!NOTE]
> The Android app can be installed on Android emulators and physical devices. The iOS app can **ONLY** be installed on iOS simulators. There is no build available for physical iOS devices due to not being able to install this app on physical iPhones. This is a (security) limitation from Apple.

## Features
This app can/will be used for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) so (new) users 
of WebdriverIO and Appium can play around.
How WebdriverIO and Appium can be used together can be found there, here you will only find the code to build the app.

The app holds the following screens:
- **:house: Home:** The intro of the app
- **:spider_web: WebView:** Clicking on the WebView tab will open the WebdriverIO website (**only once**). It is created to test for 
  example switching context and interacting with the WebView
- **:closed_lock_with_key: Login:** This screen contains a simple Login / Sign Up screen with validations and alerts. If Touch/FaceId for iOS
  or Fingerprint for Android is enabled, then you will also be able to test that.
- **:page_facing_up: Forms:** This screen holds some basic form elements to interact with like:
  - **Input**
  - **Switch**
  - **DropDown**
  - **Button**
- **:pinching_hand:	Swipe:** This screen will hold a carousel so horizontal swiping can be tested. It can also be used to test vertical
  swiping
- **:pinching_hand:	Drag:** This screen holds a simple puzzle. The puzzle can be solved by dragging the pieces into the main image.

## Contributing
Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our process for submitting pull requests to us or
building an app release for Android Emulators/Real devices or an iOS Simulator.

## Versioning
We use [SemVer](https://semver.org/) for versioning, see [VERSIONING.md](./docs/VERSIONING.md) for more information.

## Build With
- [React Native](https://reactnative.dev/)
