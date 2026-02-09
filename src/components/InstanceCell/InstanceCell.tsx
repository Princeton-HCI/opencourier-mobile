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

type Props = {
  style?: StyleProp<ViewStyle>;
  instance: Instance;
  onPress: (instance: Instance) => void;
};

export const InstanceCell = ({ style, instance, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(instance)}>
      <View style={[styles.container, style]}>
        <Image source={{ uri: instance.imageUrl }} style={styles.image} />
        <View style={styles.containerText}>
          <Text style={styles.textName}>{instance.name}</Text>
          <Text style={styles.textLink}>{instance.link}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};
