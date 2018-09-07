import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import { STATUS_BAR_HEIGHT } from '../components/StatusBar';

class LoginScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <LoginForm/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
});

export default LoginScreen;
