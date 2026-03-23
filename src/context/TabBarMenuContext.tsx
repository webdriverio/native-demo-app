import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Alert} from 'react-native';

export type TogglableTabName =
  | 'webview'
  | 'login'
  | 'forms'
  | 'swipe'
  | 'drag'
  | 'permissions'
  | 'data-management';

export const TOGGLABLE_TAB_ORDER: TogglableTabName[] = [
  'webview',
  'login',
  'forms',
  'swipe',
  'drag',
  'permissions',
  'data-management',
];

/** Max tabs between Home and Menu (7 total = Home + 5 + Menu). */
export const MAX_PINNED_TABS = 5;

const defaultPinned: Record<TogglableTabName, boolean> = {
  webview: true,
  login: true,
  forms: true,
  swipe: true,
  drag: true,
  permissions: false,
  'data-management': false,
};

type TabBarMenuContextValue = {
  pinnedInTabBar: Record<TogglableTabName, boolean>;
  setPinned: (name: TogglableTabName, value: boolean) => void;
  togglePinned: (name: TogglableTabName) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const TabBarMenuContext = createContext<TabBarMenuContextValue | null>(null);

export function TabBarMenuProvider({children}: {children: React.ReactNode}) {
  const [pinnedInTabBar, setPinnedInTabBar] = useState<Record<TogglableTabName, boolean>>(defaultPinned);
  const [menuOpen, setMenuOpen] = useState(false);
  const setPinned = useCallback((name: TogglableTabName, value: boolean) => {
    if (value) {
      setPinnedInTabBar(prev => {
        if (prev[name]) {
          return prev;
        }
        const currentCount = TOGGLABLE_TAB_ORDER.filter(k => prev[k]).length;
        if (currentCount >= MAX_PINNED_TABS) {
          Alert.alert(
            'Tab bar full',
            `You can show at most ${MAX_PINNED_TABS} tabs between Home and Menu. Turn off another tab first.`,
          );
          return prev;
        }
        return {...prev, [name]: true};
      });
    } else {
      setPinnedInTabBar(prev => ({...prev, [name]: false}));
    }
  }, []);
  const togglePinned = useCallback((name: TogglableTabName) => {
    setPinnedInTabBar(prev => {
      const nextVal = !prev[name];
      if (nextVal) {
        const currentCount = TOGGLABLE_TAB_ORDER.filter(k => prev[k]).length;
        if (currentCount >= MAX_PINNED_TABS) {
          Alert.alert(
            'Tab bar full',
            `You can show at most ${MAX_PINNED_TABS} tabs between Home and Menu. Turn off another tab first.`,
          );
          return prev;
        }
      }
      return {...prev, [name]: nextVal};
    });
  }, []);
  const value = useMemo(
    () => ({
      pinnedInTabBar,
      setPinned,
      togglePinned,
      menuOpen,
      setMenuOpen,
    }),
    [pinnedInTabBar, setPinned, togglePinned, menuOpen],
  );

  return (
    <TabBarMenuContext.Provider value={value}>
      {children}
    </TabBarMenuContext.Provider>
  );
}

export function useTabBarMenu() {
  const ctx = useContext(TabBarMenuContext);
  if (!ctx) {
    throw new Error('useTabBarMenu must be used within TabBarMenuProvider');
  }
  return ctx;
}
