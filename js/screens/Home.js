import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import {testProperties} from '../config/TestProperties';

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container} {...testProperties('Home-screen')}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/webdriverio.png')}
          />
          <View style={[styles.logoTextContainer, styles.regularFont]}>
            <Text style={[styles.logoText, styles.regularFont]}>WEBDRIVER</Text>
            <View style={[styles.logoSubTextContainer, styles.regularFont]}>
              <Text style={[styles.logoSubText, styles.regularFont]}>I/O</Text>
            </View>
          </View>
          <Text style={styles.regularFont}>
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
          <Text style={styles.regularFont}>Support</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    marginTop: 100,
  },
  logoTextContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 30,
  },
  regularFont: {
    fontWeight: '100',
  },
  logoText: {
    color: '#000',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 40,
  },
  logoSubTextContainer: {
    justifyContent: 'center',
  },
  logoSubText: {
    color: '#fff',
    fontSize: 28,
    backgroundColor: '#ea5906',
    borderColor: '#ea5906',
    borderWidth: 1,
    borderRadius: 10,
    left: 10,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  platformIconContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  orangeColor: {
    color: '#ea5906',
  },
});

export default HomeScreen;
