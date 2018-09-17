/**
 * Basics used from:
 * https://github.com/react-native-training/react-native-elements-app/blob/master/src/views/login/screen3.js
 *
 * Credits to the React Native Elements team!
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WINDOW_WIDTH } from '../config/Constants';
import { testProperties } from '../config/TestProperties';
import Button from './Button';
import TitleDivider from './TitleDivider';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected}/>
    </View>
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login() {
    const { email, password, } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      });
      if (this.state.isEmailValid && this.state.isPasswordValid) {
        Alert.alert(
          'Success',
          'You are logged in!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    }, 1500);
  }

  signUp() {
    const { email, password, passwordConfirmation, } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid: password == passwordConfirmation || this.confirmationInput.shake(),
      });
      if (!this.state.isEmailValid || !this.state.isPasswordValid || !this.state.isConfirmationValid) {
        Alert.alert(
          'Failure',
          'Some fields are not valid!',
          [{ text: 'Try again' }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Signed Up!',
          'You successfully signed up!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    }, 1500);
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
          <TitleDivider text='Login / Sign up Form'/>
          <View style={styles.categoryContainer}>
            <Button
              onPress={() => this.selectCategory(0)}
              containerStyle={{ flex: 1 }}
              textStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
              text={'Login'}
              testID={'login-container'}
            />
            <Button
              onPress={() => this.selectCategory(1)}
              containerStyle={{ flex: 1 }}
              textStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
              text={'Sign up'}
              testID={'sign-up-container'}
            />
          </View>
          <View style={styles.rowSelector}>
            <TabSelector selected={isLoginPage}/>
            <TabSelector selected={isSignUpPage}/>
          </View>
          <View style={styles.formContainer}>
            <Input
              leftIcon={
                <Icon
                  name='email-outline'
                  color='#ea5906'
                  size={25}
                  style={{ backgroundColor: 'transparent' }}
                />
              }
              value={email}
              keyboardAppearance='light'
              autoFocus={false}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              returnKeyType='next'
              inputStyle={{ marginLeft: 10 }}
              placeholder={'Email'}
              inputContainerStyle={{ borderBottomColor: '#ea5906' }}
              ref={input => this.emailInput = input}
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={email => this.setState({ email })}
              errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
              {...testProperties('input-email')}
            />
            <Input
              leftIcon={
                <Icon
                  name='lock-outline'
                  color='#ea5906'
                  size={25}
                  style={{ backgroundColor: 'transparent' }}
                />
              }
              value={password}
              keyboardAppearance='light'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType={isSignUpPage ? 'next' : 'done'}
              blurOnSubmit={true}
              containerStyle={{ marginTop: 16 }}
              inputContainerStyle={{ borderBottomColor: '#ea5906' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder={'Password'}
              ref={input => this.passwordInput = input}
              onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
              onChangeText={(password) => this.setState({ password })}
              errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}
              {...testProperties('input-password')}
            />
            {isSignUpPage &&
            <Input
              leftIcon={
                <Icon
                  name='lock-outline'
                  color='#ea5906'
                  size={25}
                  style={{ backgroundColor: 'transparent' }}
                />
              }
              value={passwordConfirmation}
              secureTextEntry={true}
              keyboardAppearance='light'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              returnKeyType={'done'}
              blurOnSubmit={true}
              containerStyle={{ marginTop: 16 }}
              inputContainerStyle={{ borderBottomColor: '#ea5906' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder={'Confirm password'}
              ref={input => this.confirmationInput = input}
              onSubmitEditing={this.signUp}
              onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
              errorMessage={isConfirmationValid ? null : 'Please enter the same password'}
              {...testProperties('input-repeat-password')}
            />}
            <Button
              containerStyle={styles.button}
              onPress={isLoginPage ? this.login : this.signUp}
              text={isLoginPage ? 'LOGIN' : 'SIGN UP'}
              textStyle={styles.buttonText}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '100',
  },
  categoryContainer: {
    flexDirection: 'row'
  },
  categoryText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: '#ea5906',
    backgroundColor: '#ea5906',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#f7f7f7',
    width: WINDOW_WIDTH - 30,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    borderColor: '#ea5906',
    borderWidth: 5,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#ea5906',
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#000',
    borderColor: '#ea5906',
    borderWidth: 5,
    marginTop: 32,
    flex: 0
  },
});

export default LoginForm;
