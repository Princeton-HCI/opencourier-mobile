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
import { TextField } from '@app/components/TextField/TextField';
import { Button, ButtonType } from '@app/components/Button/Button';
import { Colors } from '@app/styles/colors';

type Props = OnboardingScreenProp<OnboardingScreen.Welcome>;

type TextFieldErrors = {
  registryLink: string | undefined;
  instanceLink: string | undefined;
};

export const WelcomeScreen = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  const [registryLink, setRegistryLink] = useState<string>(
    'https://opencourier-demo-registry.onrender.com/',
  );
  const [instanceLink, setInstanceLink] = useState<string>('');
  const [errors, setErrors] = useState<TextFieldErrors>({
    registryLink: undefined,
    instanceLink: undefined,
  });

  const validateFields = () => {
    var registryLinkError: string | undefined;
    var instanceLinkError: string | undefined;

    if (registryLink.length > 0) {
    }

    setErrors({
      registryLink: registryLinkError,
      instanceLink: instanceLinkError,
    });
  };

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const nextStep = (registryLink: string, instanceLink: string) => {
    const sanitizedRegistryLink = registryLink.trim().replace(/\/$/, '');
    const sanitizedInstanceLink = instanceLink.trim().replace(/\/$/, '');

    if (sanitizedInstanceLink.length > 0) {
      navigation.navigate(OnboardingScreen.InstanceDetails, {
        instanceLink: sanitizedInstanceLink,
      });
    } else {
      navigation.navigate(OnboardingScreen.ChooseInstance, {
        registryLink: sanitizedRegistryLink,
      });
    }
  };

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
              {t('translations:input_registry_link')}
            </Text>
            <TextField
              key={'registrylink'}
              error={errors.registryLink}
              value={registryLink}
              placeholder={'Registry Link'}
              onChangeText={setRegistryLink}
              onBlur={validateFields}
              style={styles.textField}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              {/* Left line */}
              <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />

              {/* Text in the middle */}
              <Text style={{ marginHorizontal: 10, color: Colors.black1 }}>
                {t('translations:or')}
              </Text>

              {/* Right line */}
              <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />
            </View>
            <Text style={styles.textSubtitle}>
              {t('translations:input_instance_link')}
            </Text>
            <TextField
              key={'instancelink'}
              error={errors.instanceLink}
              value={instanceLink}
              placeholder={'Instance Link'}
              onChangeText={setInstanceLink}
              onBlur={validateFields}
              style={styles.textField}
            />
            <Button
              style={[styles.buttonContinue, { marginBottom: 22 }]}
              disabled={
                registryLink.trim().length === 0 &&
                instanceLink.trim().length === 0
              }
              iconPosition="right"
              type={ButtonType.grayBGBlackText}
              icon={Images.ArrowRightThin}
              title={t('translations:continue')}
              onPress={() => nextStep(registryLink, instanceLink)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
