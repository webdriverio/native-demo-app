import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IS_IOS, WINDOW_HEIGHT, WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const itemHorizontalMargin = Math.round(WINDOW_WIDTH * 0.02);
export const SLIDE_WIDTH =
  Math.round(WINDOW_WIDTH * 0.75) + itemHorizontalMargin * 2;

const SliderEntry: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
}> = ({icon, title, subtitle}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.slideInnerContainer,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
      ]}
      {...testProperties('card', true)}>
      <View style={styles.slideIconContainer}>
        <Icon name={icon} size={150} style={styles.slideIcon} />
      </View>
      <View
        style={styles.slideTextContainer}
        {...testProperties('slideTextContainer', true)}>
        <Text
          style={[
            styles.slideTitle,
            {color: isDarkMode ? Colors.white : Colors.dark},
          ]}
          numberOfLines={2}>
          {title.toUpperCase()}
        </Text>
        <Text
          style={[
            styles.slideSubtitle,
            {color: isDarkMode ? Colors.white : Colors.dark},
          ]}
          numberOfLines={4}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideInnerContainer: {
    borderColor: Colors.orange,
    borderRadius: 20,
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
    color: Colors.orange,
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
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SliderEntry;
