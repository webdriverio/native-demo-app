import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

class TitleDivider extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{text}</Text>
      </View>)
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '100',
  },
});

export default TitleDivider;
