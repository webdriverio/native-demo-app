import React, {useEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screens/Home';
import WebviewScreen from './screens/WebView';
import LoginScreen from './screens/Login';
import SwipeScreen from './screens/Swipe';
import FormsScreen from './screens/Forms';
import WdioStatusBar from './components/StatusBar';
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
    },
  },
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <WdioStatusBar />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: Colors.orange,
            inactiveTintColor: Colors.white,
            keyboardHidesTabBar: true,
            labelStyle: {
              fontSize: 14,
              fontWeight: '100',
              paddingBottom: 5,
            },
            style: {
              backgroundColor: Colors.black,
              borderTopWidth: 5,
              borderTopColor: Colors.orange,
              paddingTop: 5,
              height: HAS_IOS_NOTCH ? 90 : 60,
            },
            tabStyle: {
              width: 100,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarAccessibilityLabel: 'Home',
              tabBarIcon: ({color}) => (
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
              tabBarIcon: ({color}) => (
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
              tabBarIcon: ({color}) => (
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
              tabBarIcon: ({color}) => (
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
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
