import {Platform, Dimensions} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get(
  'window',
);
export const HAS_IOS_NOTCH =
  IS_IOS &&
  // Check if it's an iPhone X(S|R) Max || 11/12(Pro) max in portrait or landscape mode
  (WINDOW_HEIGHT === 780 ||
    WINDOW_WIDTH === 780 ||
    WINDOW_HEIGHT === 812 ||
    WINDOW_WIDTH === 812 ||
    WINDOW_HEIGHT === 844 ||
    WINDOW_WIDTH === 844 ||
    WINDOW_HEIGHT === 896 ||
    WINDOW_WIDTH === 896 ||
    WINDOW_HEIGHT === 926 ||
    WINDOW_WIDTH === 926);
