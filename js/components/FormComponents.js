import React, { Component } from 'react';
import { Alert, CheckBox, StyleSheet, Switch, Text, View } from 'react-native';
import SelectInput from '@tele2/react-native-select-input/src/SelectInput';
import { Input } from 'react-native-elements';
import { WINDOW_WIDTH } from '../config/Constants';
import { testProperties } from '../config/TestProperties';
import Button from './Button';
import TitleDivider from './TitleDivider';

const options = [
  {
    value: '1',
    label: 'webdriver.io is awesome',
  }, {
    value: '2',
    label: 'Appium is awesome',
  }, {
    value: '3',
    label: 'This app is awesome',
  },
];

class FormComponents extends Component {
  constructor() {
    super();

    this.state = {
      isSwitchActive: false,
      inputText: '',
    };
  }

  showAlert() {
    Alert.alert(
      'This button is',
      'This button is active',
      [
        { text: 'Ask me later' },
        { text: 'Cancel' },
        { text: 'OK' },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { isSwitchActive } = this.state;

    return (
      <View style={styles.container}>
        <TitleDivider text='Form components'/>
        <View style={styles.formComponentsContainer}>
          <View>
            <Input
              keyboardAppearance='light'
              autoFocus={false}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder={'Type something'}
              onChangeText={inputText => this.setState({ inputText })}
              label='Input field'
              labelStyle={styles.inputLabelStyle}
              containerStyle={styles.inputContainerStyle}
              inputContainerStyle={styles.inputInnerContainerStyle}
              inputStyle={styles.inputStyle}
              maxLength={30}
              multiline={false}
              {...testProperties('text-input')}
            />
            <Text style={styles.inputTextLabel}>You have typed:</Text>
            <Text
              style={styles.inputText}
              {...testProperties('input-text-result')}
            >{this.state.inputText}</Text>
          </View>
          <Text style={styles.labelText}>Switch</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={this.state.isSwitchActive}
              onValueChange={() => this.setState({ isSwitchActive: !isSwitchActive })}
              style={styles.switch}
              tintColor={'#FF5C06'}
              onTintColor={'#FF5C06'}
              thumbTintColor={'#e3e3e3'}
              {...testProperties('switch')}
            />
            <Text {...testProperties('switch-text')}>
              {`Click to turn the switch ${this.state.isSwitchActive ? 'OFF' : 'ON'}`}
            </Text>
          </View>
          <SelectInput
            label='Dropdown'
            placeholder='Select a value here'
            options={options}
            containerStyle={styles.selectInput}
            labelStyle={styles.selectInputLabel}
            innerContainerStyle={styles.selectInputInnerContainer}
            testProperty='Dropdown'
          />
          <View>
            <Text style={styles.labelText}>Buttons</Text>
            <View style={styles.buttonContainer}>
              <Button
                containerStyle={styles.button}
                text='Active'
                onPress={this.showAlert}
                textStyle={styles.buttonText}
                disabled={false}
              />
              <Button
                containerStyle={[styles.button, { marginLeft: 10 }]}
                text='Inactive'
                textStyle={styles.buttonText}
                disabled={true}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  formComponentsContainer: {
    backgroundColor: '#f7f7f7',
    width: WINDOW_WIDTH - 30,
    paddingTop: 30,
    paddingBottom: 30,
    borderColor: '#ea5906',
    borderWidth: 5,
  },
  labelText: {
    fontSize: 16,
    marginLeft: 20,
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLabelStyle: {
    color: '#000',
    fontWeight: 'normal',
    paddingLeft: 10,
  },
  inputContainerStyle: {
    padding: 10,
    width: WINDOW_WIDTH - 40
  },
  inputInnerContainerStyle: {
    borderColor: '#ea5906',
  },
  inputStyle: {
    fontSize: 14,
    color: '#545454',
  },
  inputTextLabel: {
    paddingLeft: 20,
  },
  inputText: {
    color: '#545454',
    fontSize: 12,
    fontWeight: '100',
    padding: 10,
    height: 35,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    margin: 20
  },
  switchContainer: {
    flex: 1,
    paddingLeft: 10,
    borderBottomColor: '#ea5906',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  switch: {
    marginTop: 10,
    marginBottom: 10,
  },
  selectInput: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectInputLabel: {
    fontSize: 16,
    color: '#000',
  },
  selectInputInnerContainer: {
    borderBottomColor: '#ea5906',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    height: 50,
    width: 125,
    backgroundColor: '#000',
    borderColor: '#ea5906',
    borderWidth: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#ea5906',
  },
});

export default FormComponents;
