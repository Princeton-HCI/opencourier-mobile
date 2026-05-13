import React, { useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from './EarningsCell.styles';
import { Moment } from 'moment';
import { nameOfDay, shortDate } from '@app/utilities/dates';
import { Colors } from '@app/styles/colors';
import { useTranslation } from 'react-i18next';
import { formatCurrencyFromCents } from '@app/utilities/currency';

type Props = {
  style?: StyleProp<ViewStyle>;
  date: Moment;
  earned: number;
  index: number;
  restaurantName?: string;
};

export const EarningsCell = ({
  style,
  date,
  earned,
  index,
  restaurantName,
}: Props) => {
  const { t } = useTranslation();
  const background = useMemo(() => {
    if (index % 2 === 0) {
      return Colors.gray17;
    } else {
      return Colors.gray18;
    }
  }, [index]);

  return (
    <View style={[styles.container, { backgroundColor: background }, style]}>
      <Text style={styles.textDay}>{t(`translations:${nameOfDay(date)}`)}</Text>
      <View style={styles.containerText}>
        {restaurantName && <Text style={styles.text}>{restaurantName}</Text>}
        {!restaurantName && <Text style={styles.text}>{shortDate(date)}</Text>}
        <Text style={styles.text}>
          {formatCurrencyFromCents(earned, 'USD')}
        </Text>
      </View>
    </View>
  );
};
