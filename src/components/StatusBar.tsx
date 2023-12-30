import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

const WdioStatusBar = () => {
  return (
    <View style={styles.statusBar}>
      <StatusBar translucent barStyle="light-content" />
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
