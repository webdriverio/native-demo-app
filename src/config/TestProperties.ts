/**
 * Add a unique test id for iOS and Android
 *
 * NOTE: All touchable elements are accessible, meaning that it groups its children into a single selectable component,
 * sometimes this is not needed for testing and prevents getting proper data from elements. By providing
 * `disableAccessible = true` the elements should be visible / provide all needed data
 */
import {IS_IOS} from './Constants';

function testProperties(
  id: string,
  disableAccessible = false,
): {accessible?: boolean; accessibilityLabel?: string; testID?: string} {
  const disableAccessibility = disableAccessible ? {accessible: false} : {};

  if (IS_IOS) {
    return {...disableAccessibility, testID: id};
  }

  return {...disableAccessibility, accessibilityLabel: id};
}

export {testProperties};
