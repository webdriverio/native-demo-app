/**
 * @format
 */
// Disable the yellow box, this is only containing warnings and will kill the automation
// The yellow box is also shown during automation on the dev build when the automation goes to fast
// for React Native
console.disableYellowBox = true;

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './js/app.json';

AppRegistry.registerComponent(appName, () => App);
