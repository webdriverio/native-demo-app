/**
 * Basics used from:
 * https://github.com/archriss/react-native-snap-carousel/blob/master/example/src/index.js
 *
 * Credits to the Archriss who build the react-native-snap-carousel!
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../components/StatusBar';
import TitleDivider from '../components/TitleDivider';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry, { SLIDE_WIDTH } from '../components/SliderEntry';
import { WINDOW_WIDTH } from '../config/Constants';
import { testProperties } from '../config/TestProperties';

const ENTRIES1 = [
  {
    title: 'Fully Open Source',
    subtitle: 'WebdriverIO is fully open source and can be found on GitHub',
    icon: 'github-circle',
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
    subtitle: 'The JS Foundation is host to projects that span the entire JavaScript ecosystem.',
    icon: 'language-javascript',
    link: 'https://js.foundation/community/projects',
  },
  {
    title: 'Support Videos',
    subtitle: 'The community around WebdriverIO is actively speaking on various user groups or conferences about specific topics around automated testing with WebdriverIO.',
    icon: 'youtube',
    link: 'https://www.youtube.com/user/medigerati/videos',
  },
  {
    title: 'Extendable',
    subtitle: 'Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful',
    icon: 'engine-outline',
    link: 'http://webdriver.io/guide/services/sauce.html',
  },
  {
    title: 'Compatible',
    subtitle: 'WebdriverIO works in combination with most of the TDD and BDD test frameworks in the JavaScript world',
    icon: 'arrow-decision-outline',
    link: 'http://webdriver.io/guide/testrunner/frameworks.html',
  },
];

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
  }

  renderItem({ item }) {
    return (
      <SliderEntry
        data={item}
      />
    );
  }

  render() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View
        style={styles.container}
        {...testProperties('Swipe-screen')}
      >
        <TitleDivider text='Swipe horizontal'/>
        <View {...testProperties('Carousel')}>
          <Carousel
            ref={c => this._slider1Ref = c}
            data={ENTRIES1}
            renderItem={this.renderItem}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={SLIDE_WIDTH}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.sliderContainer}
            contentContainerCustomStyle={styles.sliderContentContainer}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
          />
          <Pagination
            dotsLength={ENTRIES1.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'#ea5906'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'#ea5906'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
  sliderContainer: {
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 8
  }
});

export default SwipeScreen;
