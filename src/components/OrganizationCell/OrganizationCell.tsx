import React from 'react';
import {
  Image,
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './OrganizationCell.styles';
import { Organization } from '@app/types/types';
import { Colors } from '@app/styles/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: (org: Organization) => void;
  organization: Organization;
  selected: boolean;
};

export const OrganizationCell = ({
  style,
  onPress,
  organization,
  selected,
}: Props) => {
  const { imageUrl, name, iconUrl } = organization;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(organization)}>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <Image source={{ uri: imageUrl }} style={styles.imageLeft} />
          <Text
            style={[
              styles.title,
              { color: selected ? Colors.green1 : Colors.black1 },
            ]}>
            {name}
          </Text>
          {iconUrl && (
            <Image source={{ uri: iconUrl }} style={styles.imageRight} />
          )}
        </View>
        {selected && (
          <Image style={styles.checkmark} source={Images.CheckmarkGreen} />
        )}
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};
