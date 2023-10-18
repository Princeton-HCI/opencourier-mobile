import React, { useMemo } from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from './DeliveryInstructionsCell.styles';
import { DeliveryType } from '@app/types/types';
import { Images } from '@app/utilities/images';

type Props = {
  style?: StyleProp<ViewStyle>;
  type: DeliveryType;
};

export const DeliveryInstructionsCell = ({ style, type }: Props) => {
  const icon = useMemo(() => {
    switch (type) {
      case DeliveryType.CallOnArrival:
        return Images.PhoneCall;
      case DeliveryType.LeaveAtDoor:
        return Images.Door;
      case DeliveryType.MeetAtDoor:
        return Images.HandWave;
      case DeliveryType.MeetInside:
        return Images.Buildings;
      case DeliveryType.MeetOutside:
        return Images.Park;
    }
  }, [type]);

  return (
    <View style={[styles.container, style]}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};
