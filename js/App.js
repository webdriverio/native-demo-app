import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import WdioStatusBar from './components/StatusBar';
import Navigation from './Router';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WdioStatusBar barStyle="light-content" />
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
