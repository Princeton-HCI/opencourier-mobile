import UserContext from '@app/context/userContext';
import { useContext, useEffect, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export const useLocationPermission = (
  autoRequestPermission: boolean = false,
) => {
  const { locationPermission, setLocationPermission } = useContext(UserContext);

  const requestLocationPermission = useCallback(async () => {
    console.log(
      '[LocationPermission] Request initiated on platform:',
      Platform.OS,
    );
    if (Platform.OS === 'ios') {
      console.log('[LocationPermission] Requesting iOS location permission...');
      const permission = await Geolocation.requestAuthorization('whenInUse');
      console.log('[LocationPermission] iOS result:', permission);
      if (permission === 'granted') {
        setLocationPermission(true);
      }
    } else if (Platform.OS === 'android') {
      try {
        console.log(
          '[LocationPermission] Requesting Android FINE_LOCATION permission...',
        );
        const fineGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        console.log(
          '[LocationPermission] FINE_LOCATION request result:',
          fineGranted,
        );
        console.log(
          '[LocationPermission] GRANTED constant:',
          PermissionsAndroid.RESULTS.GRANTED,
        );

        const isGranted = fineGranted === PermissionsAndroid.RESULTS.GRANTED;
        console.log('[LocationPermission] Is granted?', isGranted);

        if (isGranted) {
          console.log(
            '[LocationPermission] Now requesting COARSE_LOCATION permission...',
          );
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your approximate location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          console.log(
            '[LocationPermission] Setting location permission to true',
          );
          setLocationPermission(true);
        } else {
          console.log(
            '[LocationPermission] Permission denied, setting to false',
          );
          setLocationPermission(false);
        }
      } catch (err) {
        console.warn('[LocationPermission] Request error:', err);
        setLocationPermission(false);
      }
    }
  }, [setLocationPermission]);

  useEffect(() => {
    if (autoRequestPermission) {
      requestLocationPermission();
    }
  }, [autoRequestPermission, requestLocationPermission]);

  return {
    requestLocationPermission,
    locationPermission,
  };
};
