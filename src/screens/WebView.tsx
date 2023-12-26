import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BorderText from '../components/BorderText';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import Colors from '../config/Colors';

const RenderLoading: React.FC<{isDarkMode: boolean}> = ({isDarkMode}) => {
  return (
    <View
      style={[
        styles.loaderContainer,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.lighter},
      ]}>
      <BorderText text="Loading..." />
    </View>
  );
};
const WebviewScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <WebView
      renderLoading={() => <RenderLoading isDarkMode={isDarkMode} />}
      source={{uri: 'https://webdriver.io/'}}
      startInLoadingState
      originWhitelist={['*']}
      style={{marginTop: STATUS_BAR_HEIGHT}}
      webviewDebuggingEnabled
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default WebviewScreen;
