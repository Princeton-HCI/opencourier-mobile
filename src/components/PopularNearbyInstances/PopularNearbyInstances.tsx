import React from 'react';
import { StyleProp, ViewStyle, View, Image, Text } from 'react-native';
import { styles } from './PopularNearbyInstances.styles';
import { Instance } from '@app/types/types';
import { Images } from '@app/utilities/images';
import { useTranslation } from 'react-i18next';
import { InstanceCell } from '../InstanceCell/InstanceCell';

type Props = {
  style?: StyleProp<ViewStyle>;
  instances: Instance[];
  onPress: (instance: Instance) => void;
};

export const PopularNearbyInstances = ({
  style,
  instances,
  onPress,
}: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={[styles.containerHeader, style]}>
        <Image source={Images.Sparkle} />
        <Text style={styles.textTitle}>{t('translations:popular_nearby')}</Text>
      </View>
      {instances.map(obj => {
        return <InstanceCell instance={obj} onPress={onPress} />;
      })}
    </View>
  );
};
