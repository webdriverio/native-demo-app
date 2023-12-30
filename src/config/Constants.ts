import {Platform, Dimensions} from 'react-native';
import {hasNotch, hasDynamicIsland} from 'react-native-device-info';

export const IS_IOS = Platform.OS === 'ios';
export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');
export const HAS_IOS_NOTCH = IS_IOS && (hasDynamicIsland() || hasNotch());
