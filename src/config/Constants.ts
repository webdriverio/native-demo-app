import {Platform, Dimensions} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');
// Default to true on iOS for layout calculations (SafeAreaProvider handles actual insets)
export const HAS_IOS_NOTCH = IS_IOS;
