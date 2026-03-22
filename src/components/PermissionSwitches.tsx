import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  Linking,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {Camera} from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import TitleDivider from './TitleDivider';
import {WINDOW_WIDTH} from '../config/Constants';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const ICON_SIZE = 18;

const PermissionSwitches = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [cameraOn, setCameraOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [locationOn, setLocationOn] = useState(false);
  const [photosOn, setPhotosOn] = useState(false);

  const bg = isDarkMode ? Colors.dark : Colors.lighter;
  const fg = isDarkMode ? Colors.white : Colors.black;

  const refreshPermissionsFromOs = useCallback(async () => {
    const [cam, mic, loc, photos] = await Promise.all([
      Camera.getCameraPermissionsAsync(),
      Camera.getMicrophonePermissionsAsync(),
      Location.getForegroundPermissionsAsync(),
      MediaLibrary.getPermissionsAsync(),
    ]);
    setCameraOn(cam.granted);
    setMicrophoneOn(mic.granted);
    setLocationOn(loc.granted);
    setPhotosOn(photos.granted);
  }, []);

  useEffect(() => {
    void refreshPermissionsFromOs();
  }, [refreshPermissionsFromOs]);

  useEffect(() => {
    const onAppState = (next: AppStateStatus) => {
      if (next === 'active') {
        void refreshPermissionsFromOs();
      }
    };
    const sub = AppState.addEventListener('change', onAppState);
    return () => sub.remove();
  }, [refreshPermissionsFromOs]);

  const promptOpenSettingsToRevoke = useCallback(
    (label: string, revert: () => void) => {
      revert();
      Alert.alert(
        'Change in Settings',
        `To revoke ${label} access, turn it off in system settings for this app.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => {
              void Linking.openSettings();
            },
          },
        ],
      );
    },
    [],
  );

  const onCameraChange = async (value: boolean) => {
    if (!value) {
      const current = await Camera.getCameraPermissionsAsync();
      if (current.granted) {
        promptOpenSettingsToRevoke('camera', () => setCameraOn(true));
        return;
      }
      setCameraOn(false);
      return;
    }
    const result = await Camera.requestCameraPermissionsAsync();
    setCameraOn(result.granted);
  };

  const onMicrophoneChange = async (value: boolean) => {
    if (!value) {
      const current = await Camera.getMicrophonePermissionsAsync();
      if (current.granted) {
        promptOpenSettingsToRevoke('microphone', () =>
          setMicrophoneOn(true),
        );
        return;
      }
      setMicrophoneOn(false);
      return;
    }
    const result = await Camera.requestMicrophonePermissionsAsync();
    setMicrophoneOn(result.granted);
  };

  const onLocationChange = async (value: boolean) => {
    if (!value) {
      const current = await Location.getForegroundPermissionsAsync();
      if (current.granted) {
        promptOpenSettingsToRevoke('location', () => setLocationOn(true));
        return;
      }
      setLocationOn(false);
      return;
    }
    const result = await Location.requestForegroundPermissionsAsync();
    setLocationOn(result.granted);
  };

  const onPhotosChange = async (value: boolean) => {
    if (!value) {
      const current = await MediaLibrary.getPermissionsAsync();
      if (current.granted) {
        promptOpenSettingsToRevoke('photo library', () => setPhotosOn(true));
        return;
      }
      setPhotosOn(false);
      return;
    }
    const result = await MediaLibrary.requestPermissionsAsync();
    setPhotosOn(result.granted);
  };

  return (
    <View style={[styles.outer, {backgroundColor: bg}]}>
      <TitleDivider text="Permissions" />
      <View style={styles.panel}>
        <PermissionRow
          label="Camera"
          icon="camera-outline"
          value={cameraOn}
          onValueChange={onCameraChange}
          testId="permission-switch-camera"
          fg={fg}
        />
        <PermissionRow
          label="Microphone"
          icon="microphone-outline"
          value={microphoneOn}
          onValueChange={onMicrophoneChange}
          testId="permission-switch-microphone"
          fg={fg}
        />
        <PermissionRow
          label="Location"
          icon="map-marker-outline"
          value={locationOn}
          onValueChange={onLocationChange}
          testId="permission-switch-location"
          fg={fg}
        />
        <PermissionRow
          label="Photo library"
          icon="image-outline"
          value={photosOn}
          onValueChange={onPhotosChange}
          testId="permission-switch-photos"
          fg={fg}
          isLast
        />
      </View>
    </View>
  );
};

function PermissionRow({
  label,
  icon,
  value,
  onValueChange,
  testId,
  fg,
  isLast,
}: {
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  value: boolean;
  onValueChange: (v: boolean) => void;
  testId: string;
  fg: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, isLast ? styles.rowLast : null]}>
      <View style={styles.rowLabel}>
        <Icon
          name={icon}
          size={ICON_SIZE}
          color={Colors.orange}
          style={styles.rowIcon}
        />
        <View style={styles.labelTextWrap}>
          <Text style={[styles.labelText, {color: fg}]}>{label}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: '#FF5C06', true: '#FF5C06'}}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#f4f3f4"
        {...testProperties(testId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  panel: {
    width: WINDOW_WIDTH - 30,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 20,
    borderColor: Colors.orange,
    borderWidth: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  rowIcon: {
    marginRight: 8,
  },
  labelTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionSwitches;
