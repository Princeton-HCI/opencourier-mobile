import React, { useState } from 'react';
import { View, Image, SafeAreaView, Text, ScrollView } from 'react-native';
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

type Props = OnboardingScreenProp<OnboardingScreen.InstanceDetails>;

export const InstanceDetails = ({ navigation, route }: Props) => {
  const { instance } = route.params;
  const { t } = useTranslation();
  const [tab, setTab] = useState<InstanceTabItem>(InstanceTabItem.Description);

  return (
    <View style={styles.container}>
      <Image source={Images.NoiseBG} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Image source={{ uri: instance.imageUrl }} style={styles.image} />
          <View style={styles.containerHeaderText}>
            <Text style={styles.textName}>{instance.name}</Text>
            <Text style={styles.textCount}>{`${t('translations:user_count')}: ${
              instance.userCount
            }`}</Text>
          </View>
        </View>
        <InstanceTabs selected={tab} onPress={setTab} />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.textContent}>
            {tab === InstanceTabItem.Description
              ? instance.description
              : instance.rules}
          </Text>
        </ScrollView>
        <Button
          icon={Images.PlusCircle}
          type={ButtonType.green}
          title={t('translations:join_instance')}
          onPress={() =>
            navigation.navigate(OnboardingScreen.JoinInstance, {
              instance: instance,
            })
          }
          style={{ marginBottom: 22 }}
        />
        <Button
          style={{ marginBottom: 16 }}
          icon={Images.SignIn}
          type={ButtonType.grayBGBlackText}
          title={t('translations:login_to_instance')}
          onPress={() =>
            navigation.navigate(OnboardingScreen.LoginInstance, {
              instance: instance,
            })
          }
        />
      </SafeAreaView>
    </View>
  );
};
