import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import Colors from '../config/Colors';

const TitleDivider: React.FC<{text: string}> = ({text}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.titleContainer}>
      <Text
        style={[
          styles.titleText,
          {color: isDarkMode ? Colors.white : Colors.dark},
        ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '100',
  },
});

export default TitleDivider;
