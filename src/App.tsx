/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNBootSplash from 'react-native-bootsplash';
import WdioStatusBar from './components/StatusBar';
import DragScreen from './screens/Drag';
import FormsScreen from './screens/Forms';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import SwipeScreen from './screens/Swipe';
import WebviewScreen from './screens/WebView';
import Colors from './config/Colors';
import {HAS_IOS_NOTCH} from './config/Constants';
const Tab = createBottomTabNavigator();
const linking = {
  prefixes: ['wdio://'],
  config: {
    screens: {
      Home: 'home',
      Webview: 'webview',
      Login: 'login',
      Forms: 'forms',
      Swipe: 'swipe',
      Drag: 'drag',
    },
  },
};
type Color = {color: string};
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <WdioStatusBar />
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
          onReady={() => RNBootSplash.hide({fade: true})}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: Colors.orange,
              tabBarInactiveTintColor: Colors.white,
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: '100',
                paddingBottom: 5,
              },
              tabBarStyle: {
                backgroundColor: Colors.black,
                borderTopWidth: 5,
                borderTopColor: Colors.orange,
                paddingTop: 5,
                height: HAS_IOS_NOTCH ? 90 : 60,
              },
              tabBarItemStyle: {
                width: 100,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarAccessibilityLabel: 'Home',
                tabBarIcon: ({color}: Color) => (
                  <Icon color={color} name={'home-outline'} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Webview"
              component={WebviewScreen}
              options={{
                tabBarLabel: 'Webview',
                tabBarAccessibilityLabel: 'Webview',
                tabBarIcon: ({color}: Color) => (
                  <Icon color={color} name={'web'} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                tabBarLabel: 'Login',
                tabBarAccessibilityLabel: 'Login',
                tabBarIcon: ({color}: Color) => (
                  <Icon color={color} name={'login'} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Forms"
              component={FormsScreen}
              options={{
                tabBarLabel: 'Forms',
                tabBarAccessibilityLabel: 'Forms',
                tabBarIcon: ({color}: Color) => (
                  <Icon color={color} name={'pencil'} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Swipe"
              component={SwipeScreen}
              options={{
                tabBarLabel: 'Swipe',
                tabBarAccessibilityLabel: 'Swipe',
                tabBarIcon: ({color}) => (
                  <Icon color={color} name={'arrow-split-vertical'} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Drag"
              component={DragScreen}
              options={{
                tabBarLabel: 'Drag',
                tabBarAccessibilityLabel: 'Drag',
                tabBarIcon: ({color}) => (
                  <Icon color={color} name={'drag'} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
