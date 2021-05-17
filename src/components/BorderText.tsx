import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import Colors from '../config/Colors';

const BorderText: React.FC<{text: string}> = ({text}) => {
  return (
    <Text style={[styles.headerBorder, styles.header]}>
      {text.toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerBorder: {
    backgroundColor: Colors.black,
    borderColor: Colors.orange,
    borderWidth: 5,
    ...Platform.select({
      ios: {
        paddingBottom: 9,
      },
      android: {
        paddingBottom: 4,
      },
    }),
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    textAlign: 'center',
  },
  header: {
    color: Colors.orange,
    fontSize: 40,
  },
});

export default BorderText;
