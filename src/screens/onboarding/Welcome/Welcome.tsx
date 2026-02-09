import React, { useEffect, useState } from 'react';
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
import { styles } from './Welcome.styles';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@app/components/SearchBar/SearchBar';
import { PopularNearbyInstances } from '@app/components/PopularNearbyInstances/PopularNearbyInstances';
import { TEST_INSTANCES } from '@app/utilities/testData';
import { InstanceCell } from '@app/components/InstanceCell/InstanceCell';
import { Instance } from '@app/types/types';
import { client } from '@app/services/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = OnboardingScreenProp<OnboardingScreen.Welcome>;

export const WelcomeScreen = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState<string>('');

  const onInstancePress = async (instance: Instance) => {
    console.log('Setting base url:', instance.link);
    client.defaults.baseURL = instance.link;
    await AsyncStorage.setItem('BASE_URL', instance.link);
    await AsyncStorage.setItem('SOCKET_BASE_URL', instance.ws_link);
    navigation.navigate(OnboardingScreen.InstanceDetails, {
      instance: instance,
    });
  };

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}>
            <Image source={Images.OpenDeli} style={styles.imageOpenDeli} />
            <Text
              style={styles.textTitle}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {t('translations:welcome')}
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
                TEST_INSTANCES.map(obj => {
                  return (
                    <InstanceCell
                      key={obj.link}
                      instance={obj}
                      onPress={instance => onInstancePress(instance)}
                    />
                  );
                })}
            </View>
            <PopularNearbyInstances
              instances={TEST_INSTANCES}
              onPress={instance => onInstancePress(instance)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
