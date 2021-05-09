import React, {useCallback, useRef, useState} from 'react';
import {
  ImageBackground,
  PanResponderGestureState,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {testProperties} from '../config/TestProperties';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import Colors from '../config/Colors';
import TitleDivider from '../components/TitleDivider';
import Draggable from '../components/Draggable';

const DragScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [resetOpacity, setResetOpacity] = useState(false);
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
      dropZone: dropZoneL1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l1.png'),
      testID: 'drag-l1',
    },
    {
      dropZone: dropZoneC1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c1.png'),
      testID: 'drag-c1',
    },
    {
      dropZone: dropZoneR1,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r1.png'),
      testID: 'drag-r1',
    },
    {
      dropZone: dropZoneL2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l2.png'),
      testID: 'drag-l2',
    },
    {
      dropZone: dropZoneC2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c2.png'),
      testID: 'drag-c2',
    },
    {
      dropZone: dropZoneR2,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r2.png'),
      testID: 'drag-r2',
    },
    {
      dropZone: dropZoneL3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-l3.png'),
      testID: 'drag-l3',
    },
    {
      dropZone: dropZoneC3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-c3.png'),
      testID: 'drag-c3',
    },
    {
      dropZone: dropZoneR3,
      isDropZone: isDropZoneStatus,
      setDropZoneValues: setDropZoneRectangles,
      src: require('../assets/images/wdio-r3.png'),
      testID: 'drag-r3',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
      ]}
      {...testProperties('Drag-drop-screen')}>
      <View style={styles.contentContainer}>
        <TitleDivider text="Drag and Drop" />
        <ImageBackground
          source={require('../assets/webdriverio.png')}
          style={styles.dropZoneContainer}>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneL1}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x83]}
            ref={dropZoneC1}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneR1}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x84]}
            ref={dropZoneL2}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x84]}
            ref={dropZoneC2}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x84]}
            ref={dropZoneR2}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneL3}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone84x83]}
            ref={dropZoneC3}>
            <View style={styles.disabledDropZone} />
          </View>
          <View
            style={[styles.orangeBorder, styles.dropZone83x83]}
            ref={dropZoneR3}>
            <View style={styles.disabledDropZone} />
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => {
            setResetOpacity(true);
            dropZones.forEach(dropZone =>
              dropZone.current?.setNativeProps({style: {opacity: 1}}),
            );
            setTimeout(() => setResetOpacity(false), 1);
          }}
          style={styles.renewIcon}
          {...testProperties('renew')}>
          <Icon
            name="autorenew"
            size={26}
            style={{color: isDarkMode ? Colors.white : Colors.black}}
          />
        </TouchableOpacity>
        <View style={styles.dragZone}>
          {puzzlePieces
            // Put them in random order
            .sort(() => 0.5 - Math.random())
            .map(
              (
                {dropZone, isDropZone, setDropZoneValues, src, testID},
                index,
              ) => (
                <Draggable
                  resetOpacity={resetOpacity}
                  dropZone={dropZone}
                  isDropZone={isDropZone}
                  key={index}
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
    height: 200,
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
