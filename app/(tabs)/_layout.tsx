import {Tabs} from 'expo-router';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import CustomBottomTabBar from '../../src/components/CustomBottomTabBar';
import {TabBarMenuProvider} from '../../src/context/TabBarMenuContext';

export default function TabsLayout() {
  return (
    <TabBarMenuProvider>
      <>
        <Tabs
          tabBar={props => <CustomBottomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
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
              tabBarLabel: 'Web',
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
          <Tabs.Screen
            name="permissions"
            options={{
              title: 'Permissions',
              tabBarLabel: 'Perms',
              tabBarAccessibilityLabel: 'Permissions',
              tabBarIcon: ({color}) => (
                <Icon color={color} name="shield-lock-outline" size={26} />
              ),
            }}
          />
          <Tabs.Screen
            name="data-management"
            options={{
              title: 'Data',
              tabBarLabel: 'Data',
              tabBarAccessibilityLabel: 'Data management',
              tabBarIcon: ({color}) => (
                <Icon color={color} name="database-outline" size={26} />
              ),
            }}
          />
        </Tabs>
      </>
    </TabBarMenuProvider>
  );
}
