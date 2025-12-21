import {Tabs} from 'expo-router';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../src/config/Colors';
import {HAS_IOS_NOTCH} from '../../src/config/Constants';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  
  // Calculate tab bar height based on platform and safe area
  const getTabBarHeight = () => {
    if (isIOS && HAS_IOS_NOTCH) {
      return 90;
    }
    const baseHeight = isIOS ? 60 : 70;

    return baseHeight + (isIOS ? 0 : insets.bottom);
  };


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.white,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '100',
          paddingBottom: isIOS ? 5 : 8,
          marginTop: isIOS ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: Colors.black,
          borderTopWidth: 5,
          borderTopColor: Colors.orange,
          paddingTop: 5,
          height: getTabBarHeight(),
          paddingBottom: isIOS ? insets.bottom : insets.bottom || 8,
        },
        tabBarItemStyle: {
          paddingVertical: isIOS ? 0 : 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="home-outline" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="webview"
        options={{
          title: 'Webview',
          tabBarLabel: 'Webview',
          tabBarAccessibilityLabel: 'Webview',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="web" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarLabel: 'Login',
          tabBarAccessibilityLabel: 'Login',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="login" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: 'Forms',
          tabBarLabel: 'Forms',
          tabBarAccessibilityLabel: 'Forms',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="pencil" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="swipe"
        options={{
          title: 'Swipe',
          tabBarLabel: 'Swipe',
          tabBarAccessibilityLabel: 'Swipe',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="arrow-split-vertical" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="drag"
        options={{
          title: 'Drag',
          tabBarLabel: 'Drag',
          tabBarAccessibilityLabel: 'Drag',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="drag" size={26} />
          ),
        }}
      />
    </Tabs>
  );
}


