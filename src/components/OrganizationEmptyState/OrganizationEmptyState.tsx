import React from 'react';
import { Image, StyleProp, ViewStyle, View, Text } from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './OrganizationEmptyState.styles';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrganizationEmptyState = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={Images.Car} style={styles.imageSmall} />
      <Text style={styles.title}>
        {'Deli is made of users\n in different organizations'}
      </Text>
    </View>
  );
};
