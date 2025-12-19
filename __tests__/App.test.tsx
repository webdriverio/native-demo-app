/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: With expo-router, the app entry point is expo-router/entry
// Tests may need to be updated to work with expo-router's routing system
// import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
