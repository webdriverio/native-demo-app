# WebdriverIO Demo App for iOS and Android

This app is build with React Native and will be used for test automation purposes for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) (_Will follow asap_)

![webdriverio-demo-app-ios.ios](./docs/assets/webdriver.io.demo.gif)

## Downloads
Different releases of the iOS and Android app can be downloaded [here](https://github.com/webdriverio/native-demo-app/releases)

> **NOTE:**
> The Android app can be installed on Android emulators and physical devices.
> The iOS app can also be installed iOS simulators (take the `\*.app.zip` file) or on physical iOS devices (take the `\*.ipa.zip` file)

## About
As mentioned this app will be used for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) so (new) users of WebdriverIO and Appium can play around.
How WebdriverIO and Appium can be used together can be found there, here you will only find the project to build the app.

The app holds the following screens:
- **Home:** The intro of the app
- **WebView:** Clicking on the WebView tab will open the WebdriverIO website (**only once**). It is created to test for example switching context and interacting with the WebView
- **Login:** This screen contains a simple Login / Sign Up screen with validations and alerts
- **Forms:** This screen holds some basic form elements to interact with like:
  - **Input**
  - **CheckBox**
  - **DropDown**
  - **Button**
- **Swipe:** This screen will hold a carousel so swiping can be tested

## Contributing
If you'd like to contribute feel free to create a PR, please also look at the [contributing](./docs/CONTRIBUTING.md)-docs.

## Credits
- [Lucas Bento](https://github.com/lucasbento) for helping me out with some React Native questions
- [React Native Elements](https://github.com/react-native-training/react-native-elements-app) for the example Login / Sign Up form
- [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel) for the demo of the carousel
- [Tele2 SelectInput](https://github.com/Tele2-NL/react-native-select-input) for the select input component
