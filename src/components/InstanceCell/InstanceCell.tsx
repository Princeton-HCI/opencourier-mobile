import React from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './InstanceCell.styles';
import { Instance } from '@app/types/types';
import { useTranslation } from 'react-i18next';

type Props = {
  style?: StyleProp<ViewStyle>;
  instance: Instance;
  onPress: (instance: Instance) => void;
};

export const InstanceCell = ({ style, instance, onPress }: Props) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => onPress(instance)}>
      <View style={[styles.container, style]}>
        <Image
          source={{ uri: instance.details.imageUrl }}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.textName}>{instance.details.name}</Text>
          <Text style={styles.textLink}>{instance.details.link}</Text>
          {instance.registry && (
            <Text style={styles.textLink}>
              {t('translations:last_fetched_at') +
                ' ' +
                new Date(instance.registry.lastFetchedAt).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};
