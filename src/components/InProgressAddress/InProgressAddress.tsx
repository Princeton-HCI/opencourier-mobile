import React, { useMemo } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './InProgressAdress.styles';
import { Images } from '@app/utilities/images';
import { Order } from '@app/types/types';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  onAddressPress: (order: Order) => void;
  onCopyAddress: (order: Order) => void;
  onCall: (order: Order) => void;
  customerOrRestaurant: 'customer' | 'restaurant';
  expanded: boolean;
};

export const InProgressAdress = ({
  style,
  order,
  onAddressPress,
  onCopyAddress,
  onCall,
  customerOrRestaurant = 'restaurant',
  expanded,
}: Props) => {
  const address = useMemo(() => {
    if (customerOrRestaurant === 'customer') {
      return `${order.dropoffLocation.formattedAddress ?? 'N/A'}`;
    } else {
      return `${order.pickupLocation.formattedAddress ?? 'N/A'}`;
    }
  }, [customerOrRestaurant]);

  return (
    <View
      style={[
        styles.containerAddressButton,
        !expanded && { height: 0 },
        expanded && { overflow: 'visible' },
        style,
      ]}>
      <Text style={styles.textAddress} onPress={() => onAddressPress(order)}>
        {address}
      </Text>
      <TouchableOpacity
        style={styles.buttonAddress}
        onPress={() => onCopyAddress(order)}>
        <Image source={Images.Chats} style={styles.iconAddressButton} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonAddress}
        onPress={() => onCall(order)}>
        <Image source={Images.PhoneSmall} style={styles.iconAddressButton} />
      </TouchableOpacity>
    </View>
  );
};
