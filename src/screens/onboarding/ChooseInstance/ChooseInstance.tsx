import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Images } from '@app/utilities/images';
import {
  OnboardingScreen,
  OnboardingScreenProp,
} from '@app/navigation/onboarding/types';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './ChooseInstance.styles';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@app/components/SearchBar/SearchBar';
import { PopularNearbyInstances } from '@app/components/PopularNearbyInstances/PopularNearbyInstances';
import { InstanceCell } from '@app/components/InstanceCell/InstanceCell';
import { Instance } from '@app/types/types';
import { client } from '@app/services/Client';
import { TextField } from '@app/components/TextField/TextField';
import { Button, ButtonType } from '@app/components/Button/Button';
import { Colors } from '@app/styles/colors';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import UserContext from '@app/context/userContext';
import { useContext } from 'react';

type Props = OnboardingScreenProp<OnboardingScreen.ChooseInstance>;

type TextFieldErrors = {
  registryLink: string | undefined;
  instanceLink: string | undefined;
};

export const ChooseInstanceScreen = ({ navigation, route }: Props) => {
  const { t, i18n } = useTranslation();
  const { registryLink } = route.params;
  const [text, setText] = useState<string>('');
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationGracePassed, setLocationGracePassed] = useState<boolean>(false);
  const { userLatitude, userLongitude } = useContext(UserContext);
  const isLocationMissing = userLatitude == null || userLongitude == null;

  useEffect(() => {
    console.log('[ChooseInstance] Screen loaded');
    console.log('[ChooseInstance] Raw context values:', {
      userLatitude,
      userLongitude,
    });
    if (userLatitude !== null && userLongitude !== null) {
      console.log('[ChooseInstance] User Location (formatted):', {
        latitude: userLatitude.toFixed(6),
        longitude: userLongitude.toFixed(6),
      });
    } else {
      console.log('[ChooseInstance] Location values are null/undefined', {
        userLatitude,
        userLongitude,
      });
    }
    i18n.changeLanguage('en');
  }, [userLatitude, userLongitude, i18n]);

  useEffect(() => {
    if (!isLocationMissing) {
      setLocationGracePassed(false);
      return;
    }

    setLoading(true);
    setLocationGracePassed(false);
    const timer = setTimeout(() => {
      setLocationGracePassed(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isLocationMissing]);

  const refreshRegistration = useCallback(
    async (instanceLink: string) => {
      if (!registryLink) return;
      try {
        const sanitizedRegistryLink = registryLink.trim().replace(/\/$/, '');
        const sanitizedInstanceLink = instanceLink.trim().replace(/\/$/, '');
        await client.post(`${sanitizedRegistryLink}/registrations/refresh`, {
          instanceLink: sanitizedInstanceLink,
        });
      } catch (err) {
        console.error('Error refreshing registration:', err);
      }
    },
    [registryLink],
  );

  const onInstancePress = useCallback(
    async (instance: Instance) => {
      refreshRegistration(instance.details.link);
      navigation.navigate(OnboardingScreen.InstanceDetails, {
        instanceLink: instance.details.link,
        registryLink: registryLink,
      });
    },
    [navigation, registryLink, refreshRegistration],
  );

  const fetchInstances = useCallback(async () => {
    if (!registryLink) return;
    if (isLocationMissing) {
      if (locationGracePassed) {
        setInstances([]);
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);

      const response = await client.get(`${registryLink}/instances`, {
        params: {
          lat: userLatitude,
          lng: userLongitude,
        },
      });

      setInstances(response.data.instances);
    } catch (error) {
      console.error('Error fetching instances:', error);
      setInstances([]);
    } finally {
      setLoading(false);
    }
  }, [
    registryLink,
    userLatitude,
    userLongitude,
    isLocationMissing,
    locationGracePassed,
  ]);

  useFocusEffect(
    useCallback(() => {
      void fetchInstances();
    }, [fetchInstances]),
  );

  console.log(instances);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(OnboardingScreen.Welcome);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BackNavButton onPress={handleBack} />
        </View>
        <KeyboardAvoidingView
          style={[styles.screen, { flexDirection: 'column' }]}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.content, { flexShrink: 1 }]}>
            <Image source={Images.OpenDeli} style={styles.imageOpenDeli} />
            <Text style={styles.textSubtitle}>
              {t('translations:registry_link') + ': '}
              <Text style={styles.linkText}>{registryLink}</Text>
            </Text>
            <Text style={styles.textSubtitle}>
              {t('translations:choose_instance')}
            </Text>
            {!loading && isLocationMissing && locationGracePassed && (
              <Text style={styles.textSubtitle}>
                {t('translations:enable_location_warning')}
              </Text>
            )}
            <SearchBar
              text={text}
              onTextChange={setText}
              style={{ marginHorizontal: 0 }}
            />
            <View
              style={[
                text.length === 0 && { height: 40 },
                text.length > 0 && { marginVertical: 20 },
              ]}>
              {text.length > 0 &&
                instances
                  .filter(
                    obj =>
                      obj.details.name
                        ?.toLowerCase()
                        .includes(text.toLowerCase()) ||
                      obj.details.link
                        ?.toLowerCase()
                        .includes(text.toLowerCase()),
                  )
                  .map(obj => {
                    return (
                      <InstanceCell
                        key={obj.details.link}
                        instance={obj}
                        onPress={instance => onInstancePress(instance)}
                      />
                    );
                  })}
            </View>
            {loading && (
              <Text style={styles.textSubtitle}>
                {t('translations:loading')}
              </Text>
            )}
          </View>
          {!loading && instances.length > 0 && (
            <View style={{ flex: 1, paddingBottom: 32 }}>
              <PopularNearbyInstances
                instances={instances}
                onPress={instance => onInstancePress(instance)}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
