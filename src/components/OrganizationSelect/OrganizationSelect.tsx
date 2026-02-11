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
import { styles } from './OrganizationSelect.styles';
import { Organization } from '@app/types/types';

type Props = {
  style?: StyleProp<ViewStyle>;
  organization: Organization;
  onPress: (organization: Organization) => void;
};

export const OrganizationSelect = ({ style, organization, onPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.containerDropdown}
        onPress={() => onPress(organization)}>
        <Image source={{ uri: organization.imageUrl }} style={styles.icon} />
        <Text style={styles.text}>{organization.name}</Text>
        {/* <Image style={styles.dropdown} source={Images.Dropdown} /> */}
      </TouchableOpacity>
    </View>
  );
};
