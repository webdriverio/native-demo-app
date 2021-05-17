import React, {useCallback, useRef, useState} from 'react';
import {
  ImageBackground,
  PanResponderGestureState,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfettiCannon from 'react-native-confetti-cannon';
import {testProperties} from '../config/TestProperties';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import Colors from '../config/Colors';
import TitleDivider from '../components/TitleDivider';
import Draggable from '../components/Draggable';
import {HAS_IOS_NOTCH, WINDOW_HEIGHT, WINDOW_WIDTH} from '../config/Constants';
import Button from '../components/Button';

const DragScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [resetOpacity, setResetOpacity] = useState(false);
  const [counter, setCounter] = useState(0);
  const dropZoneL1 = useRef<View | null>(null);
  const dropZoneL2 = useRef<View | null>(null);
  const dropZoneL3 = useRef<View | null>(null);
  const dropZoneC1 = useRef<View | null>(null);
  const dropZoneC2 = useRef<View | null>(null);
  const dropZoneC3 = useRef<View | null>(null);
  const dropZoneR1 = useRef<View | null>(null);
  const dropZoneR2 = useRef<View | null>(null);
  const dropZoneR3 = useRef<View | null>(null);
  const dropZones = [
    dropZoneL1,
    dropZoneL2,
    dropZoneL3,
    dropZoneC1,
    dropZoneC2,
    dropZoneC3,
    dropZoneR1,
    dropZoneR2,
    dropZoneR3,
  ];
  const dropZoneValues = useRef<{
    top: number;
    bottom: number;
    left: number;
    right: number;
  }>();
  const isDropZoneStatus = useCallback((gesture: PanResponderGestureState) => {
    const dz = dropZoneValues.current;

    if (dz) {
      return (
        gesture.moveY > dz.top &&
        gesture.moveY < dz.bottom &&
        gesture.moveX > dz.left &&
        gesture.moveX < dz.right
      );
    }

    return false;
  }, []);
  const setDropZoneRectangles = (dropZone: any) => {
    dropZone.current?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        dropZoneValues.current = {
          bottom: py + height,
          left: px,
          right: px + width,
          top: py,
        };
      },
    );
  };
  const puzzlePieces = [
    {
      dropZone: dropZoneL2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l2.png'),
      testID: 'drag-l2',
    },
    {
      dropZone: dropZoneR3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r3.png'),
      testID: 'drag-r3',
    },
    {
      dropZone: dropZoneR1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r1.png'),
      testID: 'drag-r1',
    },
    {
      dropZone: dropZoneC1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c1.png'),
      testID: 'drag-c1',
    },
    {
      dropZone: dropZoneC3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c3.png'),
      testID: 'drag-c3',
    },
    {
      dropZone: dropZoneR2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r2.png'),
      testID: 'drag-r2',
    },
    {
      dropZone: dropZoneC2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c2.png'),
      testID: 'drag-c2',
    },
    {
      dropZone: dropZoneL1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l1.png'),
      testID: 'drag-l1',
    },
    {
      dropZone: dropZoneL3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l3.png'),
      testID: 'drag-l3',
    },
  ];
  const updateCounter = () => setCounter(counter + 1);
  const resetPuzzle = () => {
    setResetOpacity(true);
    dropZones.forEach(dropZone =>
      dropZone.current?.setNativeProps({style: {opacity: 1}}),
    );
    setCounter(0);
    setTimeout(() => setResetOpacity(false), 1);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
      ]}
      {...testProperties('Drag-drop-screen')}>
      {counter === 9 && (
        <View
          style={[
            styles.successContainer,
            {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
          ]}>
          <ConfettiCannon
            colors={['#ea5906', '#ec691e', '#ee7a37', '#f08a50', '#f29b69']}
            count={200}
            fadeOut
            fallSpeed={3000}
            origin={{x: -10, y: 0}}
          />
          <TitleDivider text="Congratulations" />
          <Text style={{color: isDarkMode ? Colors.white : Colors.black}}>
            You made it, click retry if you want to try it again.
          </Text>
          <Button
            containerStyle={styles.button}
            onPress={() => resetPuzzle()}
            textStyle={[
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}
            text="Retry"
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <TitleDivider text="Drag and Drop" />
        <ImageBackground
          source={require('../assets/webdriverio.png')}
          style={styles.dropZoneContainer}>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneL1}
            {...testProperties('drop-l1')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x83]}
            ref={dropZoneC1}
            {...testProperties('drop-c1')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneR1}
            {...testProperties('drop-r1')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x84]}
            ref={dropZoneL2}
            {...testProperties('drop-l2')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x84]}
            ref={dropZoneC2}
            {...testProperties('drop-c2')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x84]}
            ref={dropZoneR2}
            {...testProperties('drop-r2')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneL3}
            {...testProperties('drop-l3')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x83]}
            ref={dropZoneC3}
            {...testProperties('drop-c3')}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneR3}
            {...testProperties('drop-r3')}>
            <View style={styles.disabledDropZone} />
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => resetPuzzle()}
          style={styles.renewIcon}
          {...testProperties('renew')}>
          <Icon
            name="autorenew"
            size={26}
            style={{color: isDarkMode ? Colors.white : Colors.black}}
          />
        </TouchableOpacity>
        <View style={styles.dragZone}>
          {puzzlePieces.map(
            ({dropZone, isDropZone, setDropZoneValues, src, testID}, index) => (
              <Draggable
                dropZone={dropZone}
                isDropZone={isDropZone}
                key={index}
                resetOpacity={resetOpacity}
                updateCounter={updateCounter}
                setDropZoneValues={setDropZoneValues}
                src={src}
                testID={testID}
              />
            ),
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  successContainer: {
    // backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    height: WINDOW_HEIGHT - (HAS_IOS_NOTCH ? 100 : 55),
    width: WINDOW_WIDTH,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 5,
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: 5,
    marginTop: 32,
    flex: 0,
  },
  dropZoneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 250,
    height: 250,
  },
  disabledDropZone: {
    backgroundColor: Colors.white,
    opacity: 0.7,
    flex: 1,
  },
  orangeBorder: {
    borderColor: Colors.orange,
    borderWidth: 1,
  },
  dropZone83x83: {
    width: 82,
    height: 82,
  },
  dropZone83x84: {
    width: 82,
    height: 83,
  },
  dropZone84x83: {
    width: 83,
    height: 82,
  },
  dropZone84x84: {
    width: 83,
    height: 83,
  },
  dropZone: {
    height: 250,
    width: '100%',
    alignItems: 'center',
    opacity: 0.2,
  },
  logo: {
    height: 250,
    width: 250,
  },
  dragZone: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  renewIcon: {
    marginTop: 15,
  },
});

export default DragScreen;
