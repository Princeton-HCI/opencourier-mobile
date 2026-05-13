import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './WeekSelector.styles';
import { Images } from '@app/utilities/images';
import { EarningsTabItem } from '@app/types/types';
import moment, { Moment } from 'moment';
import { endOfWeek, formatEarnings, startOfWeek } from '@app/utilities/dates';
import { useTranslation } from 'react-i18next';
import { formatCurrencyFromCents } from '@app/utilities/currency';

type Props = {
  style?: StyleProp<ViewStyle>;
  type: EarningsTabItem;
  earned: number;
  onWeekRangeChange?: (start: Moment, end: Moment) => void;
};

export const WeekSelector = ({
  style,
  type,
  earned,
  onWeekRangeChange,
}: Props) => {
  const { t } = useTranslation();
  const [substractor, setSubstractor] = useState<number>(0);

  useEffect(() => {
    setSubstractor(0);
  }, [type]);

  const date = useMemo(() => {
    switch (type) {
      case EarningsTabItem.Today:
        return `${t('translations:today')} ${moment().format(formatEarnings)}`;
      case EarningsTabItem.Weekly:
        return `${startOfWeek(substractor).format(
          formatEarnings,
        )} - ${endOfWeek(substractor).format(formatEarnings)}`;
      case EarningsTabItem.All:
        return t('translations:all_time');
    }
  }, [type, substractor]);

  useEffect(() => {
    onWeekRangeChange &&
      onWeekRangeChange(startOfWeek(substractor), endOfWeek(substractor));
  }, [substractor]);

  return (
    <View style={[styles.container, style]}>
      {type === EarningsTabItem.Weekly && (
        <TouchableOpacity onPress={() => setSubstractor(substractor + 1)}>
          <Image source={Images.CaretCircleLeft} />
        </TouchableOpacity>
      )}
      <View style={styles.containerText}>
        <Text style={styles.textPrice}>
          {formatCurrencyFromCents(earned, 'USD')}
        </Text>
        <Text style={styles.textDate}>{date}</Text>
        <View style={styles.separator} />
      </View>
      {type === EarningsTabItem.Weekly && (
        <TouchableOpacity
          onPress={() => setSubstractor(Math.max(0, substractor - 1))}>
          <Image source={Images.CaretCircleRight} />
        </TouchableOpacity>
      )}
    </View>
  );
};
