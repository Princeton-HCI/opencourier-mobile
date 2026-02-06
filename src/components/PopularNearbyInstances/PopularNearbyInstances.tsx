import React from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
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
  console.log('popular', instances);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={[styles.containerHeader, style]}>
        <Image source={Images.Sparkle} />
        <Text style={styles.textTitle}>{t('translations:popular_nearby')}</Text>
      </View>
      <FlatList
        data={instances}
        renderItem={({ item }) => (
          <InstanceCell instance={item} onPress={onPress} />
        )}
        keyExtractor={item => item.details.link}
      />
    </View>
  );
};
