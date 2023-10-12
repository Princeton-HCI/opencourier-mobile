import React from 'react';
import { Image, StyleProp, ViewStyle, View, TextInput } from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './SearchBar.styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  onTextChange: (text: string) => void;
  text: string;
  placeholder?: string;
};

export const SearchBar = ({
  style,
  onTextChange,
  text,
  placeholder,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Image source={Images.Search} style={styles.search} />
        <TextInput
          placeholder={placeholder ? placeholder : 'Search'}
          style={styles.textInput}
          value={text}
          onChangeText={onTextChange}
        />
      </View>
    </View>
  );
};
