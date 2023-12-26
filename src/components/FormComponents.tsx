import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input} from 'react-native-elements';
import {WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Button from './Button';
import TitleDivider from './TitleDivider';
import Colors from '../config/Colors';

const options = [
  {
    value: '1',
    label: 'webdriver.io is awesome',
  },
  {
    value: '2',
    label: 'Appium is awesome',
  },
  {
    value: '3',
    label: 'This app is awesome',
  },
];
const Chevron: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Icon
      name="chevron-down"
      size={24}
      color={isDarkMode ? Colors.white : Colors.black}
    />
  );
};
const FormComponents = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSwitchActive, setIsSwitchActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [pickerValue, setPickerValue] = useState('');

  const showAlert = () => {
    Alert.alert(
      'This button is',
      'This button is active',
      [{text: 'Ask me later'}, {text: 'Cancel'}, {text: 'OK'}],
      {cancelable: false},
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.lighter},
      ]}>
      <TitleDivider text="Form components" />
      <View style={styles.formComponentsContainer}>
        <View
          style={[
            styles.borderContainer,
            styles.formGroup,
            styles.inputContainer,
          ]}>
          <Input
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={'Type something'}
            onChangeText={text => setInputText(text)}
            label="Input field:"
            labelStyle={[
              styles.inputLabelStyle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputInnerContainerStyle}
            inputStyle={[
              styles.inputStyle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            maxLength={30}
            multiline={false}
            {...testProperties('text-input')}
          />
          <Text
            style={[
              styles.inputTextLabel,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            You have typed:
          </Text>
          <Text
            style={[
              styles.inputText,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            {...testProperties('input-text-result')}>
            {inputText}
          </Text>
        </View>
        <View
          style={[
            styles.borderContainer,
            styles.formGroup,
            styles.switchContainer,
          ]}>
          <Text
            style={[
              styles.labelText,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            Switch:
          </Text>
          <Switch
            value={isSwitchActive}
            onValueChange={() => setIsSwitchActive(!isSwitchActive)}
            style={styles.switch}
            trackColor={{false: '#FF5C06', true: '#FF5C06'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#f4f3f4"
            {...testProperties('switch')}
          />
          <Text
            {...testProperties('switch-text')}
            style={{color: isDarkMode ? Colors.white : Colors.black}}>
            {`Click to turn the switch ${isSwitchActive ? 'OFF' : 'ON'}`}
          </Text>
        </View>
        <View style={[styles.borderContainer, styles.formGroup]}>
          <Text
            style={[
              styles.labelText,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            Dropdown:
          </Text>
          <RNPickerSelect
            value={pickerValue}
            useNativeAndroidPickerStyle={false}
            onValueChange={(itemValue: string) => setPickerValue(itemValue)}
            items={options}
            style={{
              ...pickerSelectStyles,
              inputAndroid: {
                color: isDarkMode ? Colors.white : Colors.black,
              },
              inputIOS: {
                color: isDarkMode ? Colors.white : Colors.black,
                marginVertical: 10,
              },
            }}
            pickerProps={{...testProperties('Dropdown picker')}}
            touchableWrapperProps={{...testProperties('Dropdown', true)}}
            // @ts-ignore
            Icon={Chevron}
          />
        </View>
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.labelText,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            Buttons
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              containerStyle={styles.button}
              text="Active"
              onPress={showAlert}
              textStyle={styles.buttonText}
              disabled={false}
            />
            <Button
              containerStyle={[styles.button, styles.buttonLeft]}
              text="Inactive"
              textStyle={styles.buttonText}
              disabled={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  formComponentsContainer: {
    width: WINDOW_WIDTH - 30,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 20,
    borderColor: Colors.orange,
    borderWidth: 5,
  },
  formGroup: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  borderContainer: {
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 0,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabelStyle: {
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    width: WINDOW_WIDTH - 80,
  },
  inputInnerContainerStyle: {
    borderColor: Colors.orange,
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontSize: 14,
  },
  inputTextLabel: {
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  inputText: {
    fontSize: 12,
    fontWeight: '100',
    padding: 10,
    height: 35,
    borderWidth: 1,
    borderColor: Colors.lighter,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  switchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  switch: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    height: 50,
    width: 125,
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: 5,
    marginTop: 20,
  },
  buttonLeft: {
    marginLeft: 10,
    borderColor: Colors.lighter,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
export default FormComponents;
