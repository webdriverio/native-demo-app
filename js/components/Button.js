import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { testProperties } from '../config/TestProperties';

class Button extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    testID: PropTypes.string,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    backgroundColor: 'transparent',
    containerStyle: null,
    disabled: false,
    loading: false,
    testID: null,
    text: null,
    textStyle: null,
    onDisabledPress: () => {},
  };

  onButtonPress = () => {
    const { disabled, onDisabledPress, onPress, loading } = this.props;

    if (loading) return;

    if (disabled) {
      return onDisabledPress();
    }

    return onPress();
  };

  get textStyle() {
    const { icon, loading, textStyle, disabled } = this.props;
    const style = [styles.text];

    if (icon || loading) {
      style.push(styles.textOffset);
    }

    style.push(textStyle);

    if (disabled) {
      style.push(styles.disabledText);
    }

    return style;
  }

  renderText = () => {
    const { text } = this.props;

    if (this.props.loading) {
      return null;
    }

    if (text) {
      return <Text style={this.textStyle}>{text}</Text>;
    }

    return null;
  };

  renderIcon = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="small"/>;
    }

    return this.props.icon;
  };

  render() {
    const {
      text,
      disabled,
      testID,
      backgroundColor,
      containerStyle,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={this.onButtonPress}
        activeOpacity={disabled ? 1 : undefined}
        {...testProperties(`button-${testID || text}`, true)}
      >
        <View style={[styles.content, disabled ? styles.disabledContent : { backgroundColor }]}>
          {this.renderIcon()}
          {this.renderText()}
        </View>
      </TouchableOpacity>
    );
  }
}

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
    backgroundColor: '#E0E6E8',
  },
  text: {
    textAlign: 'center',
    color: '#000',
    alignSelf: 'center',
  },
  textOffset: {
    marginLeft: 5,
  },
  disabledText: {
    color: '#252525',
  },
});

export default Button;
