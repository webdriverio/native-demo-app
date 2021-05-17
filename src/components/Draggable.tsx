import React, {MutableRefObject, useMemo, useRef} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const Draggable = ({
  dropZone,
  isDropZone,
  resetOpacity,
  updateCounter,
  setDropZoneValues,
  src,
  testID,
}: {
  dropZone: any;
  isDropZone: (arg: PanResponderGestureState) => boolean;
  resetOpacity: boolean;
  updateCounter: () => void;
  setDropZoneValues: (arg: MutableRefObject<View | null>) => void;
  src: number;
  testID: string;
}) => {
  const pan = useRef(new Animated.ValueXY());
  const animatedView = useRef<View | null>(null);
  let opacity = 1;
  const setOpacity = (elementOpacity: number) =>
    animatedView.current?.setNativeProps({style: {opacity: elementOpacity}});
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => {
          setDropZoneValues(dropZone);
          pan.current.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event(
          [null, {dx: pan.current.x, dy: pan.current.y}],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: (e, gesture) => {
          pan.current.flattenOffset();
          if (isDropZone(gesture)) {
            // Set opacity to 0 for all matching elements and put element back
            setOpacity(0);
            pan.current.setValue({x: 0, y: 0});
            dropZone.current.setNativeProps({style: {opacity: 0}});
            updateCounter();
          } else {
            Animated.spring(pan.current, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [dropZone, isDropZone, updateCounter, setDropZoneValues],
  );

  if (resetOpacity) {
    setOpacity(1);
  }

  return (
    <View>
      <Animated.View
        ref={animatedView}
        {...panResponder.panHandlers}
        style={[pan.current.getLayout(), {opacity}]}
        {...testProperties(testID)}>
        <Image source={src} style={[styles.dragBox]} />
        <Icon
          name="drag"
          size={24}
          style={[styles.icon, {color: Colors.white}]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  dragBox: {
    borderWidth: 1,
    borderColor: Colors.orange,
    borderRadius: 1,
    height: 60,
    margin: 2,
    width: 60,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Draggable;
