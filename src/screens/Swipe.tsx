import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import TitleDivider from '../components/TitleDivider';
import SliderEntry from '../components/SliderEntry';
import {HAS_IOS_NOTCH, WINDOW_HEIGHT, WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

interface SliderEntries {
  title: string;
  subtitle: string;
  icon: string;
}
const ENTRIES1: SliderEntries[] = [
  {
    title: 'Fully Open Source',
    subtitle: 'WebdriverIO is fully open source and can be found on GitHub',
    icon: 'github',
  },
  {
    title: 'Great community',
    subtitle: 'WebdriverIO has a great community that supports all members.',
    icon: 'wechat',
  },
  {
    title: 'JS.Foundation',
    subtitle:
      'The JS Foundation is host to projects that span the entire JavaScript ecosystem.',
    icon: 'language-javascript',
  },
  {
    title: 'Support Videos',
    subtitle:
      'The community around WebdriverIO is actively speaking on various user groups or conferences about specific topics around automated testing with WebdriverIO.',
    icon: 'youtube',
  },
  {
    title: 'Extendable',
    subtitle:
      'Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful',
    icon: 'engine-outline',
  },
  {
    title: 'Compatible',
    subtitle:
      'WebdriverIO works in combination with most of the TDD and BDD test frameworks in the JavaScript world',
    icon: 'arrow-decision-outline',
  },
];
const Item: React.FC<{item: SliderEntries}> = ({item}) => {
  return <SliderEntry {...item} />;
};

const SwipeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: WINDOW_WIDTH * 0.85,
  } as const;

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
      ]}
      {...testProperties('Swipe-screen')}>
      <View style={styles.horizontalContainer}>
        <TitleDivider text="Swipe horizontal" />
        <Text
          style={[
            styles.subText,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Or swipe vertical to find what I'm hiding.
        </Text>
        <View {...testProperties('Carousel')}>
          <Carousel
            {...baseOptions}
            loop={false}
            ref={ref}
            style={styles.sliderContainer}
            data={ENTRIES1}
            pagingEnabled
            // @ts-ignore
            renderItem={Item}
            height={340}
          />
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/webdriverio.png')}
          {...testProperties('WebdriverIO logo')}
        />
        <Text
          style={[
            styles.logoText,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          You found me!!!
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
  horizontalContainer: {
    height: WINDOW_HEIGHT - (HAS_IOS_NOTCH ? 100 : 55),
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  subText: {
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    marginBottom: 20,
    paddingTop: 500,
  },
  logoText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  logo: {
    marginTop: 100,
    height: 250,
    width: 250,
  },
});

export default SwipeScreen;
