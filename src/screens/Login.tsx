import React from 'react';
import {ScrollView, StyleSheet, useColorScheme} from 'react-native';
import LoginForm from '../components/LoginForm';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const LoginScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.lighter},
      ]}
      {...testProperties('Login-screen')}
      keyboardShouldPersistTaps="handled">
      <LoginForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
});

export default LoginScreen;
