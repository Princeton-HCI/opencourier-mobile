import React, { useMemo } from 'react';
import { Colors } from '@app/styles/colors';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  Image,
} from 'react-native';
import { styles } from './Button.styles';

export enum ButtonType {
  red,
  green,
  black,
  white,
  yellow,
  gray,
}

type Props = {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ButtonType;
  onPress: () => void;
  icon?: ImageSourcePropType;
};

export const Button = ({
  title,
  disabled,
  style,
  textStyle,
  type = ButtonType.black,
  onPress,
  icon,
}: Props) => {
  const backgroundColor = useMemo(() => {
    switch (type) {
      case ButtonType.black:
        return Colors.black1;
      case ButtonType.green:
        return Colors.green1;
      case ButtonType.red:
      case ButtonType.yellow:
        return Colors.black1;
      case ButtonType.white:
        return Colors.white;
      case ButtonType.gray:
        return Colors.gray8;
    }
  }, [type]);

  const textColor = useMemo(() => {
    switch (type) {
      case ButtonType.black:
      case ButtonType.green:
      case ButtonType.red:
        return Colors.white;
      case ButtonType.white:
      case ButtonType.yellow:
        return Colors.black1;
      case ButtonType.gray:
        return Colors.gray9;
    }
  }, [type]);

  const borderColor = useMemo(() => {
    switch (type) {
      case ButtonType.gray:
      case ButtonType.black:
      case ButtonType.green:
      case ButtonType.red:
      case ButtonType.white:
      case ButtonType.yellow:
        return Colors.black1;
    }
  }, [type]);

  const borderWidth = useMemo(() => {
    switch (type) {
      case ButtonType.black:
        return 0;
      case ButtonType.green:
        return 0;
      case ButtonType.red:
      case ButtonType.white:
      case ButtonType.yellow:
        return 2;
      case ButtonType.gray:
        return 0;
    }
  }, [type]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        style,
        {
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
      ]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.textTitle, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
