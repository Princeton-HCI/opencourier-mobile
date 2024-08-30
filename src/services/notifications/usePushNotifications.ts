import { useEffect, useState } from 'react';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import navigate from './pushNavigation';
import { ANDROID_CHANNEL_ID } from '@app/utilities/constants';
import { PermissionsAndroid } from 'react-native';

const usePushNotifications = (
  isSignedIn: boolean,
  autoRequestPermssions: boolean = false,
) => {
  const navigation = useNavigation<any>();

  const [permissionsGiven, setPermissionsGiven] = useState<boolean>(false);

  useEffect(() => {
    if (autoRequestPermssions) {
      requestUserPermission();
    }
  }, [autoRequestPermssions]);

  useEffect(() => {
    if (permissionsGiven && isSignedIn) {
      getFcmToken();
      createChannelId();

      const tokenRefreshListener = messaging().onTokenRefresh(async () => {
        getFcmToken();
      });

      return tokenRefreshListener;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionsGiven, isSignedIn]);

  const getFcmToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // dispatch();
    // addDevice({
    //   deviceId: token,
    //   deviceType: Platform.OS,
    // }),
  };

  const requestUserPermission = async () => {
    // return;
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      setPermissionsGiven(enabled);
    }

    if (Platform.OS === 'android') {
      const androidApiVersion = Platform.Version?.toString();
      if (androidApiVersion && Number(androidApiVersion) <= 32) {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        setPermissionsGiven(response === 'granted');
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        setPermissionsGiven(enabled);
      }
    }
  };

  const createChannelId = async () => {
    await notifee.createChannel({
      id: ANDROID_CHANNEL_ID,
      name: 'Opendeli channel',
      importance: AndroidImportance.HIGH,
    });
  };

  useEffect(() => {
    notifee.setBadgeCount(0);
    const unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          notifee.setBadgeCount(0);
          navigate(navigation, detail?.notification?.data);
          break;
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    requestUserPermission,
    permissionsGiven,
  };
};

export default usePushNotifications;
