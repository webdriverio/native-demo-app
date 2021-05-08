import React, {useRef, useState} from 'react';
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
  setDropZoneValues,
  testID,
  src,
}: {
  dropZone: any;
  isDropZone: (arg: PanResponderGestureState) => boolean;
  setDropZoneValues: (arg) => void;
  testID: string;
  src: number;
}) => {
  const pan = useRef(new Animated.ValueXY());
  const [opacity, setOpacity] = useState(1);
  const panResponder = React.useMemo(
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
            setOpacity(0);
            dropZone.current.setNativeProps({style: {opacity}});
          } else {
            Animated.spring(pan.current, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [dropZone, isDropZone, opacity, setDropZoneValues],
  );

  return (
    <View>
      <Animated.View
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
    height: 70,
    margin: 2,
    width: 70,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Draggable;
