import React, { useState } from 'react';
import {
  Image,
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './HistoryCell.styles';
import { Order } from '@app/types/types';
import moment from 'moment';
import { formatTime, formatServer, formatSpaced } from '@app/utilities/dates';
import { useTranslation } from 'react-i18next';
import { Button, ButtonType } from '../Button/Button';
import { currencyFormatter } from '@app/utilities/currency';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  onPress: (order: Order) => void;
};

export const HistoryCell = ({ style, order, onPress }: Props) => {
  const { t } = useTranslation();
  const date = moment(order.createdAt, formatServer);
  const [colapsed, setColapsed] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => onPress(order)}>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={styles.containerSpaceBetween}
          onPress={() => setColapsed(!colapsed)}>
          <View style={styles.containerTImes}>
            <View style={styles.containerTime}>
              <Text style={styles.textTime}>
                {formatTime(order.pickupReadyAt)}
              </Text>
            </View>
            <Text style={{}}>{'-'}</Text>
            <View style={styles.containerTime}>
              <Text style={styles.textTime}>
                {formatTime(order.dropoffReadyAt)}
              </Text>
            </View>
          </View>
          <View style={styles.containerCarret}>
            <View style={styles.containerStatus}>
              <Text style={styles.textStatus}>
                {currencyFormatter(order.totalCompensation ?? 0)}
              </Text>
            </View>
            <Image
              source={Images.CaretDown}
              style={[
                styles.imageCarret,
                !colapsed && { transform: [{ rotate: '180deg' }] },
              ]}
            />
          </View>
        </TouchableOpacity>

        <View style={colapsed && { height: 0, overflow: 'hidden' }}>
          <View style={styles.separator} />
          <View style={styles.containerInfo}>
            <Image source={Images.CalendarThin} style={styles.iconSmall} />
            <Text style={styles.textInfo}>{date.format(formatSpaced)}</Text>
          </View>
          <View style={[styles.containerInfo]}>
            <Image source={Images.Storefront} style={styles.iconSmall} />
            <Text style={styles.textInfo}>
              {order.pickupBusinessName ?? 'N/A'}
            </Text>
          </View>
          <View style={[styles.containerInfo]}>
            <Image source={Images.HandCoins} style={styles.iconSmall} />
            <Text style={styles.textInfo}>
              {currencyFormatter(order?.fee ?? 0)}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Image source={Images.HandHeart} style={styles.iconSmall} />
            <Text style={styles.textInfo}>
              {currencyFormatter(order.tips ?? 0)}
            </Text>
          </View>
          <Button
            type={ButtonType.grayBGRedText}
            style={{ height: 42 }}
            title={t('translations:report_order')}
            onPress={() => undefined}
            textStyle={{ fontSize: 12, fontWeight: '700' }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
