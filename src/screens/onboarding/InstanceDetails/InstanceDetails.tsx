import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Images } from '@app/utilities/images';
import {
  OnboardingScreen,
  OnboardingScreenProp,
} from '@app/navigation/onboarding/types';
import { styles } from './InstanceDetails.styles';
import { useTranslation } from 'react-i18next';
import { InstanceTabs } from '@app/components/InstanceTabs/InstanceTabs';
import { InstanceTabItem } from '@app/types/types';
import { Button, ButtonType } from '@app/components/Button/Button';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { client } from '@app/services/Client';
import { Instance } from '@app/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = OnboardingScreenProp<OnboardingScreen.InstanceDetails>;

export const InstanceDetails = ({ navigation, route }: Props) => {
  const { instanceLink, registryLink } = route.params;
  const { t } = useTranslation();
  const [tab, setTab] = useState<InstanceTabItem>(InstanceTabItem.Description);
  const [instance, setInstance] = useState<Instance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [rules, setRules] = useState<string>('');

  const fetchMetadata = async () => {
    try {
      setLoading(true);
      setError(null);
      const sanitizedLink = instanceLink.trim().replace(/\/$/, '');
      const response = await client.get(`${sanitizedLink}/metadata`);
      setInstance(response.data.result);
    } catch (err) {
      console.error('Error fetching instance metadata:', err);
      setInstance(null);
      setError('Unable to fetch instance metadata.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDescription = async () => {
    try {
      const sanitizedLink = instanceLink.trim().replace(/\/$/, '');
      const response = await client.get(`${sanitizedLink}/description`);
      setDescription(response.data.result.descriptionContent);
    } catch (err) {
      console.error('Error fetching description:', err);
      setDescription('');
    }
  };

  const fetchRules = async () => {
    try {
      const sanitizedLink = instanceLink.trim().replace(/\/$/, '');
      const response = await client.get(`${sanitizedLink}/rules`);
      setRules(response.data.result.rulesContent);
    } catch (err) {
      console.error('Error fetching rules:', err);
      setRules('');
    }
  };

  useEffect(() => {
    if (instanceLink) {
      fetchMetadata();
      fetchDescription();
      fetchRules();
    }
  }, [instanceLink]);

  useEffect(() => {
    const setClientDefaults = async () => {
      if (!instance?.details?.link) return;
      const sanitizedLink = instance.details.link.trim().replace(/\/$/, '');
      client.defaults.baseURL = sanitizedLink + '/api/courier/v1';
      await AsyncStorage.setItem('BASE_URL', sanitizedLink + '/api/courier/v1');
      if (instance.details.websocketLink) {
        await AsyncStorage.setItem(
          'SOCKET_BASE_URL',
          instance.details.websocketLink,
        );
      }
    };

    setClientDefaults();
  }, [instance]);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(OnboardingScreen.Welcome);
    }
  };

  const markdownStyles = {
    body: {
      color: '#000',
    },
  };

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BackNavButton onPress={handleBack} />
          {instance?.details.imageUrl && (
            <Image
              source={{ uri: instance.details.imageUrl }}
              style={styles.image}
            />
          )}
          <View style={styles.containerHeaderText}>
            <Text style={styles.textName}>{instance?.details.name ?? ''}</Text>
            <Text style={styles.textCount}>{`${t('translations:user_count')}: ${
              instance?.details.userCount ?? 0
            }`}</Text>
          </View>
        </View>
        {loading ? (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.textCount}>{t('translations:loading')}</Text>
          </ScrollView>
        ) : error ? (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.textCount}>
              {t('translations:something_went_wrong')}
            </Text>
            <Button
              style={{ marginTop: 16, marginBottom: 22 }}
              type={ButtonType.grayBGBlackText}
              title={'Retry'}
              onPress={() => {
                fetchMetadata();
                fetchDescription();
                fetchRules();
              }}
            />
          </ScrollView>
        ) : (
          <>
            <InstanceTabs selected={tab} onPress={setTab} />
            <ScrollView contentContainerStyle={styles.content}>
              <Markdown style={markdownStyles}>
                {tab === InstanceTabItem.Description ? description : rules}
              </Markdown>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                marginBottom: 22,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (instance?.details.termsOfServiceUrl) {
                    Linking.openURL(instance?.details.termsOfServiceUrl);
                  }
                }}>
                <Text
                  style={{
                    color: '#434343',
                    textDecorationLine: 'underline',
                  }}>
                  {t('translations:terms_of_service')}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: '#434343' }}>|</Text>
              <TouchableOpacity
                onPress={() => {
                  if (instance?.details.privacyPolicyUrl) {
                    Linking.openURL(instance?.details.privacyPolicyUrl);
                  }
                }}>
                <Text
                  style={{
                    color: '#434343',
                    textDecorationLine: 'underline',
                  }}>
                  {t('translations:privacy_policy')}
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              icon={Images.PlusCircle}
              type={ButtonType.green}
              title={t('translations:join_instance')}
              onPress={() => {
                if (instance) {
                  navigation.navigate(OnboardingScreen.JoinInstance, {
                    instance: instance,
                  });
                }
              }}
              style={{ marginBottom: 22 }}
            />
            <Button
              style={{ marginBottom: 16 }}
              icon={Images.SignIn}
              type={ButtonType.grayBGBlackText}
              title={t('translations:login_to_instance')}
              onPress={() => {
                if (instance) {
                  navigation.navigate(OnboardingScreen.LoginInstance, {
                    instance: instance,
                  });
                }
              }}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};
