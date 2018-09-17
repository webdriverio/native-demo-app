/** @format */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';

// Disable the yellow box
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
