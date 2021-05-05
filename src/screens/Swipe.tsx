/**
 * Basics used from:
 * https://github.com/archriss/react-native-snap-carousel/blob/master/example/src/index.js
 *
 * Credits to the Archriss who build the react-native-snap-carousel!
 */
import React, {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import TitleDivider from '../components/TitleDivider';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry, {SLIDE_WIDTH} from '../components/SliderEntry';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

interface SliderEntries {
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}
const ENTRIES1: SliderEntries[] = [
  {
    title: 'Fully Open Source',
    subtitle: 'WebdriverIO is fully open source and can be found on GitHub',
    icon: 'github',
    link: 'https://github.com/webdriverio/webdriverio/',
  },
  {
    title: 'Creat community',
    subtitle: 'WebdriverIO has a great community that supports all members.',
    icon: 'wechat',
    link: 'https://gitter.im/webdriverio/webdriverio',
  },
  {
    title: 'JS.Foundation',
    subtitle:
      'The JS Foundation is host to projects that span the entire JavaScript ecosystem.',
    icon: 'language-javascript',
    link: 'https://js.foundation/community/projects',
  },
  {
    title: 'Support Videos',
    subtitle:
      'The community around WebdriverIO is actively speaking on various user groups or conferences about specific topics around automated testing with WebdriverIO.',
    icon: 'youtube',
    link: 'https://www.youtube.com/user/medigerati/videos',
  },
  {
    title: 'Extendable',
    subtitle:
      'Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful',
    icon: 'engine-outline',
    link: 'https://webdriver.io/docs/sauce-service',
  },
  {
    title: 'Compatible',
    subtitle:
      'WebdriverIO works in combination with most of the TDD and BDD test frameworks in the JavaScript world',
    icon: 'arrow-decision-outline',
    link: 'https://webdriver.io/docs/frameworks',
  },
];

const SwipeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderEl = useRef(null);

  const Item: React.FC<{item: SliderEntries}> = ({item}) => {
    return <SliderEntry {...item} />;
  };

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
            ref={sliderEl}
            data={ENTRIES1}
            renderItem={Item}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={SLIDE_WIDTH}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.sliderContainer}
            contentContainerCustomStyle={styles.sliderContentContainer}
            onSnapToItem={(index: number) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={ENTRIES1.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor={Colors.orange}
            dotStyle={styles.paginationDot}
            inactiveDotColor={Colors.orange}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            // @ts-ignore
            carouselRef={sliderEl}
            tappableDots={!!sliderEl}
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
    height: WINDOW_HEIGHT - 90,
  },
  subText: {
    marginTop: -50,
    marginBottom: 50,
    textAlign: 'center',
  },
  sliderContainer: {
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  logoContainer: {
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
