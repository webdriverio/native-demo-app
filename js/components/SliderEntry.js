/**
 * Basics used from:
 * https://github.com/archriss/react-native-snap-carousel/blob/master/example/src/index.js
 *
 * Credits to the Archriss who build the react-native-snap-carousel!
 */
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IS_IOS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../config/Constants';
import { testProperties } from '../config/TestProperties';

const itemHorizontalMargin = Math.round(WINDOW_WIDTH * 0.02);
export const SLIDE_WIDTH = Math.round(WINDOW_WIDTH * 0.75) + itemHorizontalMargin * 2;

class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data: { icon, title, subtitle, link } } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => Linking.openURL(link)}
        {...testProperties('card', true)}
      >
        <View style={styles.slideIconContainer}>
          <Icon name={icon} size={150} style={styles.slideIcon}/>
        </View>
        <View style={styles.slideTextContainer}>
          <Text style={styles.slideTitle} numberOfLines={2}>{title.toUpperCase()}</Text>
          <Text style={styles.slideSubtitle} numberOfLines={4}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    borderColor: '#ea5906',
    borderWidth: 5,
    alignItems: 'center',
    width: SLIDE_WIDTH,
    height: Math.round(WINDOW_HEIGHT * 0.4),
    paddingHorizontal: itemHorizontalMargin,
    paddingTop: 18,
  },
  slideIconContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
  },
  slideIcon: {
    color: '#ea5906'
  },
  slideTextContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  slideTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slideSubtitle: {
    marginTop: 6,
    color: '#888888',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SliderEntry;
