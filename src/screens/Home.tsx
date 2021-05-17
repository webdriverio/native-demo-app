import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {testProperties} from '../config/TestProperties';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import Colors from '../config/Colors';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
      ]}
      {...testProperties('Home-screen')}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/webdriverio.png')}
        />
        <View style={styles.logoTextContainer}>
          <Text
            style={[
              styles.logoText,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            WEBDRIVER
          </Text>
          <Image style={styles.io} source={require('../assets/io.png')} />
        </View>
        <Text
          style={[
            styles.regularFont,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Demo app for the appium-boilerplate
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.platformIconContainer}>
            <Icon name={'apple'} size={90} style={styles.orangeColor} />
            <Icon name={'android'} size={90} style={styles.orangeColor} />
          </View>
        </View>
        <Text
          style={[
            styles.regularFont,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Support
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    marginTop: 100,
    height: 250,
    width: 250,
  },
  io: {
    height: 50,
    width: 50,
  },
  logoTextContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
  },
  regularFont: {
    fontWeight: '100',
    fontSize: 16,
  },
  logoText: {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
  },
  platformIconContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  orangeColor: {
    color: Colors.orange,
  },
});

export default HomeScreen;
