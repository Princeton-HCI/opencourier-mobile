import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  OnboardingScreen,
  OnboardingScreenProp,
} from '@app/navigation/onboarding/types';
import { styles } from './JoinInstance.styles';
import { useTranslation } from 'react-i18next';
import { InstanceHeader } from '@app/components/InstanceHeader/InstanceHeader';
import { Button, ButtonType } from '@app/components/Button/Button';
import { Images } from '@app/utilities/images';
import { TextField } from '@app/components/TextField/TextField';
import { validateEmail } from '@app/utilities/text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { services } from '@app/services/service';
import useUser from '@app/hooks/useUser';
import { QueryKeys } from '@app/utilities/queryKeys';

type Props = OnboardingScreenProp<OnboardingScreen.JoinInstance>;

type TextFieldErrors = {
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
};

export const JoinInstance = ({ navigation, route }: Props) => {
  const { instance, mode } = route.params;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [firstName, setFirstname] = useState<string>('');
  const [lastName, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<TextFieldErrors>({
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState<boolean>(false);

  const { refetchUser } = useUser();

  const { mutate: register, isPending } = useMutation({
    mutationFn: services.userService.signup,
    onSuccess: () => {
      refetchUser();
      // If in "add instance" mode, invalidate instances query to refresh the list
      if (mode === 'add-instance') {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.userInstances] });
      }
    },
    onError: error => {
      setErrors({
        email: error.message ?? 'Wrong email or password',
        password: undefined,
        firstname: undefined,
        lastname: undefined,
        confirmPassword: undefined,
      });
    },
  });

  const validateFields = () => {
    var oldState = errors;

    var emailError: string | undefined;
    if (email.length > 0) {
      if (!validateEmail(email)) {
        emailError = 'Email invalid!';
      }
    }

    var passwordError: string | undefined;
    var confirmPasswordError: string | undefined;
    if (password.length > 0) {
      if (password.length < 5) {
        passwordError = 'Password too short!';
      }
      if (
        oldState.password === undefined &&
        confirmPassword !== password &&
        confirmPassword.length > 0
      ) {
        confirmPasswordError = 'Passwords do not match!';
      }
    } else {
      oldState.password = undefined;
      if (confirmPassword.length > 0) {
        confirmPasswordError = 'Passwords do not match!';
      }
    }

    setErrors({
      firstname: undefined,
      lastname: undefined,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
  };

  useEffect(() => {
    validateFields();
  }, [firstName, lastName, email, password, confirmPassword]);

  useEffect(() => {
    // Check if already logged into this specific instance
    const checkIfAlreadyLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      const baseUrl = await AsyncStorage.getItem('BASE_URL');
      // Only consider logged in if both token AND matching baseURL exist
      if (token && baseUrl) {
        const sanitizedCurrentInstance = baseUrl.replace('/api/courier/v1', '');
        const sanitizedTargetInstance = instance.details.link
          .trim()
          .replace(/\/$/, '');
        if (sanitizedCurrentInstance === sanitizedTargetInstance) {
          setAlreadyLoggedIn(true);
        }
      }
    };
    checkIfAlreadyLoggedIn();
  }, [instance.details.link]);

  const onSignupHandle = () => {
    if (alreadyLoggedIn) {
      Alert.alert(
        'Already Logged In',
        'You are already logged into this instance. Please use the organization switcher in the menu to access it.',
        [{ text: 'OK' }],
      );
      return;
    }
    register({ firstName, lastName, password, email });
  };

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <InstanceHeader
        instance={instance}
        headerPurpose="join"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <TextField
          key={'name'}
          error={errors.firstname}
          value={firstName}
          placeholder={t('translations:first_name')}
          onChangeText={setFirstname}
          onBlur={validateFields}
          style={styles.textField}
        />
        <TextField
          key={'lastname'}
          error={errors.lastname}
          value={lastName}
          placeholder={t('translations:last_name')}
          onChangeText={setLastname}
          onBlur={validateFields}
          style={styles.textField}
        />
        <TextField
          key={'email'}
          error={errors.email}
          value={email}
          placeholder={t('translations:email_address')}
          onChangeText={setEmail}
          onBlur={validateFields}
          style={styles.textField}
        />
        <TextField
          key={'password'}
          error={errors.password}
          secureTextEntry
          value={password}
          placeholder={t('translations:password')}
          onChangeText={setPassword}
          onBlur={validateFields}
          style={styles.textField}
        />
        <TextField
          key={'confirmPassword'}
          error={errors.confirmPassword}
          secureTextEntry
          value={confirmPassword}
          placeholder={t('translations:confirm_password')}
          onChangeText={setConfirmPassword}
          onBlur={validateFields}
          style={styles.textField}
        />

        <Button
          icon={Images.PlusCircle}
          type={ButtonType.green}
          title={t('translations:join_instance')}
          onPress={onSignupHandle}
          style={{ marginBottom: 22 }}
          isLoading={isPending}
        />

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.containerBottom}
          onPress={() =>
            navigation.navigate(OnboardingScreen.LoginInstance, {
              instance: instance,
              mode: mode,
            })
          }>
          <Text style={styles.textButton}>
            {t('translations:already_have_account')}
            <Text> </Text>
            <Text style={{ textDecorationLine: 'underline' }}>
              {t('translations:log_in')}
            </Text>
          </Text>
          <Image source={Images.Logout} style={styles.imageLogin} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerBottom}
          onPress={() =>
            navigation.navigate(OnboardingScreen.Welcome, { mode: mode })
          }>
          <Text style={styles.textButton}>
            {t('translations:looking_for_instances')}
            <Text> </Text>
            <Text style={{ textDecorationLine: 'underline' }}>
              {t('translations:search_here')}
            </Text>
          </Text>
          <Image source={Images.SearchSmall} style={styles.imageLogin} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
