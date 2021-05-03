import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {HAS_IOS_NOTCH, IS_IOS} from '../config/Constants';

const STATUS_BAR_HEIGHT = IS_IOS
  ? HAS_IOS_NOTCH
    ? 44
    : 20
  : StatusBar.currentHeight || 0;

const WdioStatusBar = () => {
  return (
    <View style={styles.statusBar}>
      <StatusBar translucent backgroundColor="#000" />
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
