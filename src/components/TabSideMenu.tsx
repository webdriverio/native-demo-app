import {Href, router} from 'expo-router';
import type {ComponentProps} from 'react';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {type TogglableTabName, useTabBarMenu} from '../context/TabBarMenuContext';
import Colors from '../config/Colors';
import {testProperties} from '../config/TestProperties';

type MciIconName = ComponentProps<typeof Icon>['name'];

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const PANEL_WIDTH = Math.min(320, Math.round(SCREEN_WIDTH * 0.86));
type MenuEntry =
  | {kind: 'home'; name: 'index'; label: string; icon: MciIconName}
  | {
      kind: 'tab';
      name: TogglableTabName;
      label: string;
      icon: MciIconName;
    };
const MENU_ENTRIES: MenuEntry[] = [
  {kind: 'home', name: 'index', label: 'Home', icon: 'home-outline'},
  {kind: 'tab', name: 'webview', label: 'Webview', icon: 'web'},
  {kind: 'tab', name: 'login', label: 'Login', icon: 'login'},
  {kind: 'tab', name: 'forms', label: 'Forms', icon: 'pencil'},
  {kind: 'tab', name: 'swipe', label: 'Swipe', icon: 'arrow-split-vertical'},
  {kind: 'tab', name: 'drag', label: 'Drag', icon: 'drag'},
  {kind: 'tab', name: 'permissions', label: 'Permissions', icon: 'shield-lock-outline'},
];

export default function TabSideMenu() {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const {menuOpen, setMenuOpen, pinnedInTabBar, togglePinned} = useTabBarMenu();
  const translateX = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuOpen) {
      translateX.setValue(PANEL_WIDTH);
      backdropOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 65,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [menuOpen, translateX, backdropOpacity]);

  const closeAnimated = (after?: () => void) => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: PANEL_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setMenuOpen(false);
        after?.();
      }
    });
  };
  const close = () => {
    if (!menuOpen) {
      return;
    }
    closeAnimated();
  };
  const navigateTo = (routeName: string) => {
    closeAnimated(() => {
      // Modal is portaled outside the tab navigator tree, so useNavigation() can target
      // the wrong navigator. Expo Router's router always resolves file routes correctly.
      if (routeName === 'index') {
        router.replace('/' as Href);
        return;
      }
      router.push(`/${routeName}` as Href);
    });
  };
  const bg = isDarkMode ? Colors.darker : Colors.lighter;
  const fg = isDarkMode ? Colors.white : Colors.black;

  return (
    <Modal
      visible={menuOpen}
      animationType="none"
      transparent
      onRequestClose={close}
      {...testProperties('tab-side-menu-modal')}>
      <View style={styles.modalRoot} pointerEvents="box-none">
        <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} />
        </Animated.View>
        <Animated.View
          style={[
            styles.panel,
            {
              width: PANEL_WIDTH,
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 16,
              backgroundColor: bg,
              transform: [{translateX}],
            },
          ]}
          {...testProperties('tab-side-menu-panel')}>
          <Text style={[styles.panelTitle, {color: fg}]}>Menu</Text>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {MENU_ENTRIES.map(entry => {
              if (entry.kind === 'home') {
                return (
                  <Pressable
                    key="home"
                    onPress={() => navigateTo('index')}
                    style={({pressed}) => [
                      styles.row,
                      {opacity: pressed ? 0.75 : 1},
                    ]}
                    {...testProperties('side-menu-item-home')}>
                    <Icon name={entry.icon} size={22} color={Colors.orange} />
                    <Text style={[styles.rowLabel, {color: fg, flex: 1}]}>
                      {entry.label}
                    </Text>
                  </Pressable>
                );
              }
              const pinned = pinnedInTabBar[entry.name];
              return (
                <View key={entry.name} style={styles.row}>
                  <Pressable
                    onPress={() => navigateTo(entry.name)}
                    style={({pressed}) => [
                      styles.rowMain,
                      {opacity: pressed ? 0.75 : 1},
                    ]}
                    {...testProperties(`side-menu-item-${entry.name}`)}>
                    <Icon name={entry.icon} size={22} color={Colors.orange} />
                    <Text style={[styles.rowLabel, {color: fg}]}>
                      {entry.label}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel={
                      pinned
                        ? `Remove ${entry.label} from tab bar`
                        : `Add ${entry.label} to tab bar`
                    }
                    onPress={() => togglePinned(entry.name)}
                    hitSlop={8}
                    {...testProperties(`side-menu-star-${entry.name}`)}>
                    <Icon
                      name={pinned ? 'star' : 'star-outline'}
                      size={26}
                      color={Colors.orange}
                    />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    borderLeftWidth: 5,
    borderLeftColor: Colors.orange,
    paddingHorizontal: 16,
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '100',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.orange,
    gap: 10,
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
