import React from 'react';
import {View, StyleSheet, StatusBar, useColorScheme, Platform} from 'react-native';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

const WdioStatusBar = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = Platform.OS === 'android' 
    ? 'light-content' 
    : (isDarkMode ? 'light-content' : 'dark-content');
  
  return (
    <View style={styles.statusBar}>
      <StatusBar 
        translucent 
        barStyle={barStyle} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: STATUS_BAR_HEIGHT,
  },
});

export {STATUS_BAR_HEIGHT};
export default WdioStatusBar;
