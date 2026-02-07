import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ImageSourcePropType,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Images } from '@app/utilities/images';
import PagerView from 'react-native-pager-view';
import { Button, ButtonType } from '@app/components/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageIndicator } from 'react-native-page-indicator';
import {
  OnboardingScreen,
  OnboardingScreenProp,
} from '@app/navigation/onboarding/types';
import { styles } from './Landing.styles';
import { useTranslation } from 'react-i18next';
import { useCameraPermission } from '@app/hooks/useCameraPermission';
import { useLocationPermission } from '@app/hooks/useLocationPermission';
import usePushNotifications from '@app/services/notifications';
import UserContext from '@app/context/userContext';
import Geolocation from 'react-native-geolocation-service';

type Props = OnboardingScreenProp<OnboardingScreen.Landing>;

type Page = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const LandingScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const [page, setPage] = useState<number>(-1);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const ref = useRef<PagerView>(null);
  const { requestCameraPermission, cameraPermission } = useCameraPermission();
  const { requestLocationPermission, locationPermission } =
    useLocationPermission();
  const { requestUserPermission, permissionsGiven } =
    usePushNotifications(false);
  const { setUserLatitude, setUserLongitude } = useContext(UserContext);

  // Get and store location when permission is granted
  useEffect(() => {
    console.log('[Landing] Location permission changed:', locationPermission);
    if (locationPermission) {
      console.log('[Landing] Attempting to fetch location...');
      const getLocation = async () => {
        try {
          if (Platform.OS === 'android') {
            const hasPermission = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            console.log(
              '[Landing] Android fine location permission check:',
              hasPermission,
            );
            if (!hasPermission) {
              console.warn('[Landing] Fine location permission denied');
              return;
            }
          }

          Geolocation.getCurrentPosition(
            (position: any) => {
              const { latitude, longitude } = position.coords;
              console.log('[Landing] Position received:', {
                latitude,
                longitude,
              });
              setUserLatitude(latitude);
              setUserLongitude(longitude);
              console.log('[Landing] Location stored in context:', {
                latitude: latitude.toFixed(6),
                longitude: longitude.toFixed(6),
              });
            },
            (error: any) => {
              console.warn('[Landing] Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
          );
        } catch (error) {
          console.warn('[Landing] Get location error:', error);
        }
      };
      getLocation();
    } else {
      console.log('[Landing] Location permission not granted yet');
    }
  }, [locationPermission, setUserLatitude, setUserLongitude]);

  const data: Page[] = [
    {
      title: t('translations:support_locals'),
      description: t('translations:support_locals_details'),
      image: Images.OnboardingCar,
    },
    {
      title: t('translations:earn_money'),
      description: t('translations:more_than_a_gig'),
      image: Images.OnboardingMoped,
    },
    {
      title: t('translations:reach_goals'),
      description: t('translations:get_paid'),
      image: Images.OnboardingFood,
    },
    {
      title: t('translations:enable_location'),
      description: t('translations:enable_location_text'),
      image: Images.WelcomePin,
    },
    {
      title: t('translations:enable_camera'),
      description: t('translations:enable_camera_text'),
      image: Images.WelcomeCam,
    },
    {
      title: t('translations:enable_notifications'),
      description: t('translations:enable_notifications_text'),
      image: Images.WelcomeBell,
    },
  ];

  const onScroll = (position: any) => {
    setPage(position.nativeEvent.position);
  };

  const onContinue = () => {
    if (page === -1) {
      setPage(0);
      ref.current?.setPage(0);
    } else if (page < data.length - 1) {
      setPage(page + 1);
      ref.current?.setPage(page + 1);
    } else {
      navigation.navigate(OnboardingScreen.Welcome);
    }
  };

  const getPermissionButtonState = () => {
    if (page === 3) return locationPermission;
    if (page === 4) return cameraPermission;
    if (page === 5) return permissionsGiven;
    return false;
  };

  const getPermissionButtonTitle = () => {
    const isAllowed = getPermissionButtonState();
    if (page === 3) {
      return isAllowed
        ? t('translations:location_allowed')
        : t('translations:allow');
    }
    if (page === 4) {
      return isAllowed
        ? t('translations:camera_allowed')
        : t('translations:allow');
    }
    if (page === 5) {
      return isAllowed
        ? t('translations:notifications_allowed')
        : t('translations:allow');
    }
    return t('translations:allow');
  };

  const onAskForPermission = () => {
    if (page === 3) {
      requestLocationPermission();
      setPermissionRequested(true);
    } else if (page === 4) {
      requestCameraPermission();
      setPermissionRequested(true);
    } else if (page === 5) {
      requestUserPermission();
      setPermissionRequested(true);
    }
  };

  const PageItem = useCallback(
    ({ title, image, description }: Page) => (
      <View style={styles.pageContent} key={title}>
        <Text style={styles.textTitle} numberOfLines={2} adjustsFontSizeToFit>
          {title}
        </Text>
        <Text style={styles.textSubtitle}>{description}</Text>
        <Image source={image} style={styles.ilustration} />
      </View>
    ),
    [],
  );

  useEffect(() => {
    if (permissionRequested) {
      if (page === 3 && locationPermission) {
        setPermissionRequested(false);
        onContinue();
      } else if (page === 4 && cameraPermission) {
        setPermissionRequested(false);
        onContinue();
      } else if (page === 5 && permissionsGiven) {
        setPermissionRequested(false);
        onContinue();
      }
    }
  }, [
    cameraPermission,
    locationPermission,
    permissionsGiven,
    permissionRequested,
    page,
  ]);

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <Image source={Images.OpenDeli} style={[styles.imageOpenDeli]} />
        <PagerView
          ref={ref}
          style={styles.pagerView}
          scrollEnabled={true}
          initialPage={page}
          onPageSelected={onScroll}>
          {data.map(item => (
            <PageItem
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </PagerView>
        <View style={[styles.containerBottom, { paddingBottom: bottom + 10 }]}>
          <PageIndicator
            variant="beads"
            count={data.length}
            current={page}
            style={styles.pageIndicator}
          />
          {page > 2 && (
            <Button
              style={[styles.buttonContinue, { marginBottom: 22 }]}
              iconPosition="right"
              type={ButtonType.green}
              icon={Images.CheckWhite}
              title={getPermissionButtonTitle()}
              onPress={onAskForPermission}
              disabled={getPermissionButtonState()}
            />
          )}
          <Button
            style={styles.buttonContinue}
            iconPosition="right"
            type={ButtonType.grayBGBlackText}
            icon={Images.ArrowRightThin}
            title={
              page < 3 ? t('translations:continue') : t('translations:skip')
            }
            onPress={onContinue}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
