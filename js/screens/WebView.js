import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import BorderText from '../components/BorderText';
import { STATUS_BAR_HEIGHT } from '../components/StatusBar';

class WebviewScreen extends Component {
  renderLoading() {
    return (
      <View style={styles.loaderContainer}>
        <BorderText text="Loading..." />
      </View>
    )
  }

  render() {
    console.log('render')
    return (
      <WebView
        renderLoading={this.renderLoading}
        source={{ uri: 'http://webdriver.io/' }}
        startInLoadingState
        originWhitelist={['*']}
        style={{ marginTop: STATUS_BAR_HEIGHT }}
      />
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebviewScreen;
