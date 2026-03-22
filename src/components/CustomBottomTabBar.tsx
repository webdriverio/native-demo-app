import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {
  TOGGLABLE_TAB_ORDER,
  useTabBarMenu,
} from '../context/TabBarMenuContext';
import type {TogglableTabName} from '../context/TabBarMenuContext';
import Colors from '../config/Colors';
import {HAS_IOS_NOTCH} from '../config/Constants';
import TabSideMenu from './TabSideMenu';

function getTabBarLabelText(
  options: {tabBarLabel?: unknown; title?: string},
  fallback: string,
): string {
  if (typeof options.tabBarLabel === 'string') {
    return options.tabBarLabel;
  }
  if (typeof options.title === 'string') {
    return options.title;
  }
  return fallback;
}

export default function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const isIOS = Platform.OS === 'ios';
  const {pinnedInTabBar, setMenuOpen, menuOpen} = useTabBarMenu();
  const getTabBarHeight = () => {
    if (isIOS && HAS_IOS_NOTCH) {
      return 90;
    }
    const baseHeight = isIOS ? 60 : 70;
    return baseHeight + (isIOS ? 0 : insets.bottom);
  };
  const height = getTabBarHeight();
  const visibleMiddle = TOGGLABLE_TAB_ORDER.filter(
    name => pinnedInTabBar[name as TogglableTabName],
  );
  const navigateTo = (routeName: string) => {
    setMenuOpen(false);
    navigation.navigate(routeName as never);
  };
  const renderRouteTab = (routeName: string) => {
    const route = state.routes.find(r => r.name === routeName);
    if (!route) {
      return null;
    }
    const {options} = descriptors[route.key];
    const routeIndex = state.routes.findIndex(r => r.key === route.key);
    const focused = state.index === routeIndex;
    const color = focused ? Colors.orange : Colors.white;
    const label = getTabBarLabelText(options, routeName);

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={{selected: focused}}
        accessibilityLabel={
          (options.tabBarAccessibilityLabel as string | undefined) ?? label
        }
        onPress={() => navigateTo(route.name)}
        style={({pressed}) => [
          styles.tabItem,
          pressed && styles.tabPressed,
        ]}>
        {options.tabBarIcon?.({
          focused,
          color,
          size: 26,
        })}
        <Text numberOfLines={1} style={[styles.tabLabel, {color}]}>
          {label}
        </Text>
      </Pressable>
    );
  };
  const homeRoute = state.routes.find(r => r.name === 'index');
  const homeDescriptor = homeRoute ? descriptors[homeRoute.key] : null;
  const homeIndex = homeRoute
    ? state.routes.findIndex(r => r.key === homeRoute.key)
    : 0;
  const homeFocused = state.index === homeIndex;

  return (
    <>
      <View
        style={[
          styles.tabBar,
          {
            height,
            paddingBottom: isIOS ? insets.bottom : insets.bottom || 8,
            paddingHorizontal: Math.max(insets.left, insets.right),
            borderTopColor: Colors.orange,
            backgroundColor: isDarkMode ? Colors.darker : Colors.black,
          },
        ]}>
        <View style={styles.row}>
          {homeRoute && homeDescriptor ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{selected: homeFocused}}
              accessibilityLabel={
                (homeDescriptor.options.tabBarAccessibilityLabel as
                  | string
                  | undefined) ?? 'Home'
              }
              onPress={() => navigateTo('index')}
              style={({pressed}) => [
                styles.tabItem,
                pressed && styles.tabPressed,
              ]}>
              {homeDescriptor.options.tabBarIcon?.({
                focused: homeFocused,
                color: homeFocused ? Colors.orange : Colors.white,
                size: 26,
              })}
              <Text
                numberOfLines={1}
                style={[
                  styles.tabLabel,
                  {
                    color: homeFocused ? Colors.orange : Colors.white,
                  },
                ]}>
                {getTabBarLabelText(homeDescriptor.options, 'Home')}
              </Text>
            </Pressable>
          ) : null}
          {visibleMiddle.map(name => renderRouteTab(name))}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Menu"
            accessibilityState={{selected: menuOpen}}
            onPress={() => setMenuOpen(true)}
            style={({pressed}) => [
              styles.tabItem,
              pressed && styles.tabPressed,
            ]}>
            <Icon
              color={menuOpen ? Colors.orange : Colors.white}
              name="menu"
              size={26}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.tabLabel,
                {color: menuOpen ? Colors.orange : Colors.white},
              ]}>
              Menu
            </Text>
          </Pressable>
        </View>
      </View>
      <TabSideMenu />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 5,
    paddingTop: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? 0 : 4,
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '100',
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingBottom: Platform.OS === 'ios' ? 4 : 6,
    textAlign: 'center',
  },
});
