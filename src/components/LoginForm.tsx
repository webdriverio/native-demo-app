/**
 * Basics used from:
 * https://github.com/react-native-training/react-native-elements-app/blob/master/src/views/login/screen3.js
 *
 * Credits to the React Native Elements team!
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  useColorScheme,
  Text,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as LocalAuthentication from 'expo-local-authentication';
import {IS_IOS, WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Button from './Button';
import TitleDivider from './TitleDivider';
import Colors from '../config/Colors';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type BiometryType =
  | 'BIOMETRICS'
  | 'FINGERPRINT'
  | 'FACIAL_RECOGNITION'
  | 'IRIS';
const BIOMETRICS_TYPE: {[key: string]: BiometryType} = {
  FINGERPRINT: 'FINGERPRINT',
  FACIAL_RECOGNITION: 'FACIAL_RECOGNITION',
  IRIS: 'IRIS',
  BIOMETRICS: 'BIOMETRICS',
};
const TabSelector: React.FC<{selected: boolean}> = ({selected}) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};
const LoginForm = () => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmationValid, setIsConfirmationValid] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricsType, setBiometricsType] = useState<BiometryType | null>(
    null,
  );

  // Constants
  const isDarkMode = useColorScheme() === 'dark';
  const isLoginPage = selectedCategory === 0;
  const isSignUpPage = selectedCategory === 1;
  const biometricName =
    biometricsType === BIOMETRICS_TYPE.FINGERPRINT
      ? 'fingerprint'
      : 'face-recognition';

  // Element Refs
  interface RNInput extends TextInput {
    shake(): void;
    focus(): void;
  }
  const emailEl = useRef<RNInput>(null);
  const passwordEl = useRef<RNInput>(null);
  const passwordConfirmationEl = useRef<RNInput>(null);

  // Methods
  const selectCategory = (category: number) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedCategory(category);
    setIsLoading(false);
  };
  const validateEmail = (text: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(text);
  };
  const validateForm = () => {
    // Check email
    const validEmail = validateEmail(email);
    setIsEmailValid(validEmail);
    if (!validEmail) {
      emailEl?.current?.shake();
    }

    // Check password
    const validPassword = password.length >= 8;
    setIsPasswordValid(validPassword);
    if (!validPassword) {
      passwordEl?.current?.shake();
    }

    // Check password confirmation
    let validPasswordConfirmation: boolean = false;
    if (isSignUpPage) {
      validPasswordConfirmation =
        password === passwordConfirmation && passwordConfirmation.length >= 8;
      setIsConfirmationValid(validPasswordConfirmation);
      if (validPasswordConfirmation) {
        passwordConfirmationEl?.current?.shake();
      }
    }

    if (
      (isLoginPage && validEmail && validPassword) ||
      (isSignUpPage && validEmail && validPassword && validPasswordConfirmation)
    ) {
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setIsLoading(false);
        if (isLoginPage) {
          Alert.alert('Success', 'You are logged in!', [{text: 'OK'}], {
            cancelable: false,
          });
        } else {
          Alert.alert(
            'Signed Up!',
            'You successfully signed up!',
            [{text: 'OK'}],
            {cancelable: false},
          );
        }
      }, 1500);
    }
  };
  const handleBiometryLogin = useCallback(async () => {
    try {
      setIsEmailValid(true);
      setIsPasswordValid(true);
      const sensorType =
        IS_IOS && biometricsType === BIOMETRICS_TYPE.FINGERPRINT
          ? 'TouchID'
          : IS_IOS
          ? 'FaceID'
          : biometricsType === BIOMETRICS_TYPE.IRIS
          ? 'Iris'
          : biometricsType === BIOMETRICS_TYPE.FINGERPRINT
          ? 'Fingerprint'
          : 'Biometrics';
      const {success} = await LocalAuthentication.authenticateAsync({
        promptMessage: `Login with ${sensorType}`,
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
      if (success) {
        Alert.alert(
          'Success',
          `You are logged in through ${sensorType}!`,
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [biometricsType]);
  const getBiometricsType = (types: number[]) => {
    let type: BiometryType;
    switch (types[0]) {
      case 1:
        type = BIOMETRICS_TYPE.FINGERPRINT;
        break;
      case 2:
        type = BIOMETRICS_TYPE.FACIAL_RECOGNITION;
        break;
      case 3:
        type = BIOMETRICS_TYPE.IRIS;
        break;
      default:
        type = BIOMETRICS_TYPE.BIOMETRICS;
    }
    setBiometricsType(type);
  };

  useEffect(() => {
    (async () => {
      setIsBiometricAvailable(await LocalAuthentication.isEnrolledAsync());
      getBiometricsType(
        await LocalAuthentication.supportedAuthenticationTypesAsync(),
      );
    })();
  });

  return (
    <View style={styles.contentContainer}>
      <KeyboardAvoidingView
        contentContainerStyle={styles.loginContainer}
        behavior="position">
        <TitleDivider text="Login / Sign up Form" />
        <View style={styles.categoryContainer}>
          <Button
            onPress={() => selectCategory(0)}
            textStyle={[
              styles.categoryText,
              isLoginPage && styles.selectedCategoryText,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}
            text="Login"
            testID="login-container"
          />
          <Button
            onPress={() => selectCategory(1)}
            textStyle={[
              styles.categoryText,
              isSignUpPage && styles.selectedCategoryText,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}
            text="Sign up"
            testID="sign-up-container"
          />
        </View>
        <View style={styles.rowSelector}>
          <TabSelector selected={isLoginPage} />
          <TabSelector selected={isSignUpPage} />
        </View>
        <View
          style={[
            styles.formContainer,
            {backgroundColor: isDarkMode ? Colors.dark : Colors.lighter},
          ]}>
          <Input
            leftIcon={<Icon name="email-outline" style={styles.iconStyle} />}
            value={email}
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            inputStyle={[
              styles.inputStyle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            placeholder={'Email'}
            inputContainerStyle={styles.inputContainerStyle}
            ref={emailEl}
            onSubmitEditing={() => passwordEl?.current?.focus()}
            onChangeText={emailText => setEmail(emailText)}
            errorMessage={
              isEmailValid ? undefined : 'Please enter a valid email address'
            }
            {...testProperties('input-email')}
          />
          <Input
            leftIcon={<Icon name="lock-outline" style={styles.iconStyle} />}
            value={password}
            keyboardAppearance="light"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType={isSignUpPage ? 'next' : 'done'}
            blurOnSubmit={true}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={[
              styles.inputStyle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            placeholder={'Password'}
            ref={passwordEl}
            onSubmitEditing={() =>
              isSignUpPage
                ? passwordConfirmationEl?.current?.focus()
                : validateForm()
            }
            onChangeText={passwordText => setPassword(passwordText)}
            errorMessage={
              isPasswordValid ? undefined : 'Please enter at least 8 characters'
            }
            {...testProperties('input-password')}
          />
          {isSignUpPage && (
            <Input
              leftIcon={<Icon name="lock-outline" style={styles.iconStyle} />}
              value={passwordConfirmation}
              secureTextEntry={true}
              keyboardAppearance="light"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType={'done'}
              blurOnSubmit={true}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={[
                styles.inputStyle,
                {color: isDarkMode ? Colors.white : Colors.black},
              ]}
              placeholder={'Confirm password'}
              ref={passwordConfirmationEl}
              onSubmitEditing={validateForm}
              onChangeText={passwordConfirmationText =>
                setPasswordConfirmation(passwordConfirmationText)
              }
              errorMessage={
                isConfirmationValid
                  ? undefined
                  : 'Please enter the same password'
              }
              {...testProperties('input-repeat-password')}
            />
          )}
          {isLoginPage && (
            <Text
              style={[
                styles.biometricsText,
                {color: isDarkMode ? Colors.white : Colors.black},
              ]}>
              When the device has Touch/FaceID (iOS) or FingerPrint enabled a
              biometrics button will be shown to use and test the login.
            </Text>
          )}
          <View style={styles.buttonRow}>
            {isBiometricAvailable && isLoginPage && (
              <Button
                containerStyle={[styles.button, styles.biometricButton]}
                onPress={handleBiometryLogin}
                childComponent={
                  <Icon name={biometricName} style={styles.biometricIcon} />
                }
                textStyle={styles.buttonText}
                loading={isLoading}
                disabled={isLoading}
                testID="biometric"
              />
            )}
            <Button
              containerStyle={[
                styles.button,
                isBiometricAvailable && isLoginPage ? styles.buttonSmaller : {},
              ]}
              onPress={validateForm}
              text={isLoginPage ? 'LOGIN' : 'SIGN UP'}
              textStyle={styles.buttonText}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

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
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryText: {
    textAlign: 'center',
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
    borderColor: Colors.orange,
    backgroundColor: Colors.orange,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    borderRadius: 20,
    width: WINDOW_WIDTH - 30,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    borderColor: Colors.orange,
    borderWidth: 5,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  biometricButton: {
    width: 65,
    marginRight: 15,
  },
  biometricIcon: {
    color: Colors.white,
    fontSize: 26,
  },
  biometricsText: {
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 5,
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: 5,
    marginTop: 32,
    flex: 0,
  },
  buttonSmaller: {
    width: 150,
  },
  iconStyle: {
    fontSize: 25,
    color: Colors.orange,
    backgroundColor: 'transparent',
  },
  containerStyle: {
    marginTop: 16,
  },
  inputContainerStyle: {
    borderBottomColor: Colors.orange,
  },
  inputStyle: {
    marginLeft: 10,
  },
});

export default LoginForm;
