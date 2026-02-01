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

type Props = OnboardingScreenProp<OnboardingScreen.ChooseInstance>;

type TextFieldErrors = {
  registryLink: string | undefined;
  instanceLink: string | undefined;
};

export const ChooseInstanceScreen = ({ navigation, route }: Props) => {
  const { t, i18n } = useTranslation();
  const { registryLink, mode } = route.params;
  const [text, setText] = useState<string>('');
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshRegistration = async (instanceLink: string) => {
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
  };

  const onInstancePress = async (instance: Instance) => {
    refreshRegistration(instance.details.link);
    navigation.navigate(OnboardingScreen.InstanceDetails, {
      instanceLink: instance.details.link,
      registryLink: registryLink,
      mode: mode,
    });
  };

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const fetchInstances = useCallback(async () => {
    if (!registryLink) return;
    try {
      setLoading(true);
      const response = await client.get(`${registryLink}/instances`);
      setInstances(response.data.instances);
    } catch (error) {
      console.error('Error fetching instances:', error);
      setInstances([]);
    } finally {
      setLoading(false);
    }
  }, [registryLink]);

  useFocusEffect(
    useCallback(() => {
      fetchInstances();
    }, [fetchInstances]),
  );

  console.log(instances);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(OnboardingScreen.Welcome, { mode: mode });
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
          style={styles.screen}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.content}>
            <Image source={Images.OpenDeli} style={styles.imageOpenDeli} />
            <Text style={styles.textSubtitle}>
              {t('translations:registry_link') + ': '}
              <Text style={styles.linkText}>{registryLink}</Text>
            </Text>
            <Text style={styles.textSubtitle}>
              {t('translations:choose_instance')}
            </Text>
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
            {!loading && instances.length > 0 && (
              <PopularNearbyInstances
                instances={instances}
                onPress={instance => onInstancePress(instance)}
              />
            )}
            {loading && (
              <Text style={styles.textSubtitle}>
                {t('translations:loading')}
              </Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
