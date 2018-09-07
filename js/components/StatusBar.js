import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { IS_IPHONEX, IS_IOS } from '../config/Constants';

// eslint-disable-next-line no-nested-ternary
const STATUS_BAR_HEIGHT = IS_IOS ? (IS_IPHONEX ? 44 : 20) : (StatusBar.currentHeight || 0);

class WdioStatusBar extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: '#000',
  };

  render() {
    return (
      <View style={[styles.statusBar, { backgroundColor: this.props.backgroundColor }]}>
        <StatusBar translucent backgroundColor={this.props.backgroundColor} {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: STATUS_BAR_HEIGHT,
  },
});

export { STATUS_BAR_HEIGHT };
export default WdioStatusBar;
