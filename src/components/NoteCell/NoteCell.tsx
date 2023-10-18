import React from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from './NoteCell.styles';
import { Images } from '@app/utilities/images';

type Props = {
  style?: StyleProp<ViewStyle>;
  text: string;
};

export const NoteCell = ({ style, text }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={Images.ChatBubble} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
