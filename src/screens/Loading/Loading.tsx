import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { Images } from '@app/utilities/images';
import { styles } from './Loading.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '@app/services/Client';
import useUser from '@app/hooks/useUser';

type Props = RootScreenProp<RootScreen.Loading>;

export const LoadingScreen = ({ navigation }: Props) => {
  const [token, setToken] = useState<string>();

  const { user } = useUser(token !== undefined);

  useEffect(() => {
    checkForToken();
  }, []);

  const checkForToken = async () => {
    const savedToken = await AsyncStorage.getItem('token');
    const baseUrl = await AsyncStorage.getItem('BASE_URL');
    if (savedToken && baseUrl) {
      client.defaults.baseURL = baseUrl;
      setToken(savedToken);
    } else {
      navigation.navigate(RootScreen.Onboarding);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.Logo} />
    </View>
  );
};
