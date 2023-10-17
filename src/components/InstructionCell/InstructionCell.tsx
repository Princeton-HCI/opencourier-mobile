import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './InstructionCell.styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  text: string;
  trailingBoldText?: string;
  leadingIcon?: ImageSourcePropType;
  topRightRestaurantIcon: boolean;
};

export const InstructionCell = ({
  style,
  text,
  trailingBoldText,
  leadingIcon,
  topRightRestaurantIcon,
}: Props) => {
  return (
    <View
      style={[
        style,
        topRightRestaurantIcon && { paddingTop: 4, paddingRight: 4 },
      ]}>
      <View style={styles.container}>
        {leadingIcon && <Image source={leadingIcon} />}
        <Text style={styles.textContent}>{text}</Text>
        {trailingBoldText && (
          <Text style={styles.textBold}>{trailingBoldText}</Text>
        )}
      </View>
      {topRightRestaurantIcon && (
        <View style={styles.containerTopRightIcon}></View>
      )}
    </View>
  );
};
