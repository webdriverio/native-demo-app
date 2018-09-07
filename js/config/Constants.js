import { PixelRatio, Platform, Dimensions } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
} = Dimensions.get('window');
export const IS_IPHONEX = IS_IOS &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (WINDOW_WIDTH === 812 || WINDOW_HEIGHT === 812);
export const PIXEL_RATIO = PixelRatio.get();
