import React from 'react';
import { StyleProp, ViewStyle, View, Text, Image } from 'react-native';
import { styles } from './InstanceHeader.styles';
import { Instance } from '@app/types/types';
import { useTranslation } from 'react-i18next';
import { BackNavButton } from '../BackNavButton/BackNavButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  style?: StyleProp<ViewStyle>;
  instance: Instance;
  headerPurpose: 'join' | 'login_to';
  onBack: () => void;
};

export const InstanceHeader = ({
  style,
  instance,
  onBack,
  headerPurpose = 'join',
}: Props) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.containerHeader, style]}>
      <View style={[styles.header, { paddingTop: top }]}>
        <BackNavButton onPress={onBack} />
        <View style={styles.headerContent}>
          <Text style={styles.textJoin}>
            {t(`translations:${headerPurpose}`) + ':'}
          </Text>
          <View style={styles.contentHeader}>
            <Image source={{ uri: instance.imageUrl }} style={styles.image} />
            <View style={styles.containerHeaderText}>
              <Text style={styles.textName}>{instance.name}</Text>
              <Text style={styles.textCount}>{`${t(
                'translations:user_count',
              )}: ${instance.userCount}`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blueSeparator} />
    </View>
  );
};
