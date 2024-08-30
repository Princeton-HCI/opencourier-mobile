import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  OnboardingScreen,
  OnboardingScreenProp,
} from '@app/navigation/onboarding/types';
import { styles } from './LoginInstance.styles';
import { useTranslation } from 'react-i18next';
import { InstanceHeader } from '@app/components/InstanceHeader/InstanceHeader';
import { Button, ButtonType } from '@app/components/Button/Button';
import { Images } from '@app/utilities/images';
import { TextField } from '@app/components/TextField/TextField';
import { validateEmail } from '@app/utilities/text';
import { Colors } from '@app/styles/colors';
import { generateBoxShadowStyle } from '@app/utilities/styles';
import { services } from '@app/services/service';
import { useMutation } from '@tanstack/react-query';
import useUser from '@app/hooks/useUser';

type Props = OnboardingScreenProp<OnboardingScreen.LoginInstance>;

type TextFieldErrors = {
  email: string | undefined;
  password: string | undefined;
};

enum ScreenState {
  login,
  passwordReset,
}

export const LoginInstance = ({ navigation, route }: Props) => {
  const { instance } = route.params;
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.login,
  );
  const [errors, setErrors] = useState<TextFieldErrors>({
    email: undefined,
    password: undefined,
  });

  const {
    data,
    mutate: loginUser,
    isPending,
  } = useMutation({
    mutationFn: services.userService.login,
    onError: error => {
      setErrors({
        email: error.message ?? 'Wrong email or password',
        password: undefined,
      });
    },
  });

  const { user } = useUser(data !== undefined);

  const validateFields = () => {
    let emailError;
    let passwordError;

    if (email.length > 0 && !validateEmail(email)) {
      emailError = 'Email invalid!';
    }

    if (password.length > 0 && password.length < 5) {
      passwordError = 'Password too short!';
    }

    setErrors({
      email: emailError,
      password: passwordError,
    });
  };

  useEffect(() => {
    validateFields();
  }, [email, password]);

  const onLoginHandle = () => {
    loginUser({ email, password });
  };

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <InstanceHeader
        instance={instance}
        headerPurpose="login_to"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {screenState === ScreenState.login && (
          <>
            <TextField
              error={errors.email}
              value={email}
              placeholder={t('translations:email_address')}
              onChangeText={setEmail}
              onBlur={validateFields}
              style={styles.textField}
            />
            <TextField
              error={errors.password}
              secureTextEntry
              value={password}
              placeholder={t('translations:password')}
              onChangeText={setPassword}
              onBlur={validateFields}
              style={styles.textField}
            />
            <Button
              icon={Images.Logout}
              type={ButtonType.green}
              title={t('translations:log_in')}
              onPress={onLoginHandle}
              style={{ marginBottom: 22 }}
              isLoading={isPending}
            />
          </>
        )}

        {screenState === ScreenState.passwordReset && (
          <>
            <TextField
              error={errors.email}
              value={email}
              placeholder={t('translations:email')}
              onChangeText={setEmail}
              onBlur={validateFields}
              style={styles.textField}
            />
            <Button
              icon={Images.PaperPlaneTilt}
              type={ButtonType.green}
              title={t('translations:send_reset')}
              onPress={() =>
                navigation.navigate(OnboardingScreen.JoinInstance, {
                  instance: instance,
                })
              }
              style={{ marginBottom: 22 }}
            />
            <View
              style={[
                styles.resetCard,
                generateBoxShadowStyle(0, 10, 0.08, 12, 21, Colors.black8),
              ]}>
              <View style={styles.containerHorizontal}>
                <Text style={styles.textReset}>
                  {t('translations:password_reset')}
                </Text>
                <TouchableOpacity
                  onPress={() => setScreenState(ScreenState.login)}>
                  <Image source={Images.X} style={styles.imageX} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textEmailSent}>
                {t('translations:email_sent')}
              </Text>
              <Button
                icon={Images.Logout}
                textStyle={{
                  fontSize: 14,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: Colors.black8,
                }}
                type={ButtonType.grayBGBlackText}
                style={{ width: 176 }}
                title={t('translations:back_to_login')}
                onPress={() => setScreenState(ScreenState.login)}
              />
            </View>
          </>
        )}

        <View style={styles.separator} />

        {screenState === ScreenState.login && (
          <>
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() => setScreenState(ScreenState.passwordReset)}>
              <Text style={styles.textButton}>
                {t('translations:forgot_password')}
                <Text> </Text>
                <Text style={{ textDecorationLine: 'underline' }}>
                  {t('translations:reset_password')}
                </Text>
              </Text>
              <Image source={Images.Reset} style={styles.imageLogin} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() =>
                navigation.navigate(OnboardingScreen.JoinInstance, {
                  instance: instance,
                })
              }>
              <Text style={styles.textButton}>
                {t('translations:no_account')}
                <Text> </Text>
                <Text style={{ textDecorationLine: 'underline' }}>
                  {t('translations:join_instance')}
                </Text>
              </Text>
              <Image
                source={Images.PlusCircle}
                style={[styles.imageLogin, { tintColor: Colors.gray23 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() => navigation.navigate(OnboardingScreen.Welcome)}>
              <Text style={styles.textButton}>
                {t('translations:looking_for_instances')}
                <Text> </Text>
                <Text style={{ textDecorationLine: 'underline' }}>
                  {t('translations:search_here')}
                </Text>
              </Text>
              <Image source={Images.SearchSmall} style={styles.imageLogin} />
            </TouchableOpacity>
          </>
        )}

        {screenState === ScreenState.passwordReset && (
          <>
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() =>
                navigation.navigate(OnboardingScreen.JoinInstance, {
                  instance: instance,
                })
              }>
              <Text style={styles.textButton}>
                {t('translations:no_account')}
                <Text> </Text>
                <Text style={{ textDecorationLine: 'underline' }}>
                  {t('translations:join_instance')}
                </Text>
              </Text>
              <Image
                source={Images.PlusCircle}
                style={[styles.imageLogin, { tintColor: Colors.gray23 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={() => navigation.navigate(OnboardingScreen.Welcome)}>
              <Text style={styles.textButton}>
                {t('translations:looking_for_instances')}
                <Text> </Text>
                <Text style={{ textDecorationLine: 'underline' }}>
                  {t('translations:search_here')}
                </Text>
              </Text>
              <Image source={Images.SearchSmall} style={styles.imageLogin} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};
