import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Stack} from 'expo-router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import WdioStatusBar from '../src/components/StatusBar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen once app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <WdioStatusBar />
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

