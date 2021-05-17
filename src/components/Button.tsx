import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const Button: React.FC<{
  backgroundColor?: string;
  containerStyle?: object;
  disabled?: boolean;
  childComponent?: React.ReactNode;
  loading?: boolean;
  onPress?: () => void;
  testID?: string;
  text?: string;
  textStyle?: object;
}> = ({
  backgroundColor = 'transparent',
  containerStyle = {},
  disabled = false,
  childComponent,
  loading = false,
  onPress = () => {},
  testID,
  text,
  textStyle = {},
}) => {
  const buttonTextStyle = [styles.text, textStyle];
  if (loading) {
    buttonTextStyle.push(styles.textOffset);
  }
  if (disabled) {
    buttonTextStyle.push(styles.disabledText);
  }

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => (!disabled ? onPress() : null)}
      activeOpacity={disabled ? 1 : undefined}
      {...testProperties(`button-${testID || text}`, true)}>
      <View
        style={[
          styles.content,
          disabled ? styles.disabledContent : {backgroundColor},
        ]}>
        {loading ? (
          <ActivityIndicator size="small" color="#ea5906" />
        ) : (
          childComponent || <Text style={buttonTextStyle}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledContent: {
    backgroundColor: Colors.lighter,
  },
  text: {
    textAlign: 'center',
    color: Colors.black,
    alignSelf: 'center',
  },
  textOffset: {
    marginLeft: 5,
  },
  disabledText: {
    color: Colors.darker,
  },
});

export default Button;
