import React from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './OrderItemCell.styles';
import { OrderItem } from '@app/types/types';

type Props = {
  style?: StyleProp<ViewStyle>;
  item: OrderItem;
  onPress: () => undefined;
};

export const OrderItemCell = ({ style, item, onPress }: Props) => {
  return (
    <TouchableOpacity style={[styles.content, style]} onPress={onPress}>
      <Text style={styles.text}>{item.name}</Text>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};
