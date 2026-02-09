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
  onSearch: () => void;
};

export const OrganizationSelect = ({
  style,
  organization,
  onPress,
  onSearch,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.containerDropdown}
        onPress={() => onPress(organization)}>
        <Image source={{ uri: organization.imageUrl }} style={styles.icon} />
        <Text style={styles.text}>{organization.name}</Text>
        <Image source={Images.Dropdown} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSearch}>
        <Image source={Images.Search} style={styles.iconSearch} />
      </TouchableOpacity>
    </View>
  );
};
