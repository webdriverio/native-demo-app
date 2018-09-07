import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import WebView from './screens/WebView';
import Forms from './screens/Forms';
import Login from './screens/Login';
import Swipe from './screens/Swipe';

const Router = createBottomTabNavigator({
    Home: {
      screen: Home, navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    WebView: {
      screen: WebView,
      navigationOptions: {
        tabBarLabel: 'WebView',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'web'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Login',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'login'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    Forms: {
      screen: Forms,
      navigationOptions: {
        tabBarLabel: 'Forms',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'pencil'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    Swipe: {
      screen: Swipe,
      navigationOptions: {
        tabBarLabel: 'Swipe',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'arrow-split-vertical'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#ea5906',
      inactiveTintColor: 'rgba(255, 255, 255, 0.8)',
      labelStyle: {
        fontSize: 14,
        fontWeight: '100',
      },
      style: {
        backgroundColor: '#000',
        borderTopWidth: 5,
        borderTopColor: '#ea5906',
        paddingTop: 5,
        height: 60,
      },
      tabStyle: {
        width: 100
      }
    }
  });

class NavigationContainer extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

export default NavigationContainer;
