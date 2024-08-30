import React, { useMemo } from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { styles } from './UserStatusSelector.styles';
import { UserStatus } from '@app/types/types';
import { Colors } from '@app/styles/colors';
import { useTranslation } from 'react-i18next';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: (status: UserStatus) => void;
  selected: UserStatus;
};

const data = [UserStatus.Online, UserStatus.LastCall, UserStatus.Offline];

export const UserStatusSelector = ({ style, onPress, selected }: Props) => {
  const { t } = useTranslation();
  const StatusItem = ({ status }: { status: UserStatus }) => {
    const buttonStyle = useMemo(() => {
      switch (status) {
        case UserStatus.Online:
          return styles.containerLeft;
        case UserStatus.LastCall:
          return styles.containerMiddle;
        case UserStatus.Offline:
          return styles.containerRight;
      }
    }, [status]);

    const buttonColor = useMemo(() => {
      switch (status) {
        case UserStatus.Online:
          return selected === status ? Colors.green1 : Colors.transparent;
        case UserStatus.LastCall:
          return selected === status ? Colors.yellow1 : Colors.transparent;
        case UserStatus.Offline:
          return selected === status ? Colors.red1 : Colors.transparent;
      }
    }, [status]);

    const textColor = useMemo(() => {
      switch (status) {
        case UserStatus.Online:
          return selected === status ? Colors.white : Colors.gray3;
        case UserStatus.LastCall:
          return selected === status ? Colors.black1 : Colors.gray3;
        case UserStatus.Offline:
          return selected === status ? Colors.white : Colors.gray3;
      }
    }, [status]);

    return (
      <TouchableOpacity key={status} onPress={() => onPress(status)}>
        <View style={[buttonStyle, { backgroundColor: buttonColor }]}>
          <Text style={[styles.text, { color: textColor }]}>
            {t(`translations:${status.toLowerCase()}`)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {data.map(item => {
        return <StatusItem status={item} />;
      })}
    </View>
  );
};
