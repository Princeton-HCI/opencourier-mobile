import React from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './NextStep.styles';
import { Images } from '@app/utilities/images';
import { useTranslation } from 'react-i18next';
import { Order, ToastMessage, User } from '@app/types/types';
import { Button, ButtonType } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { OrderStatus } from '@app/types/enums';
import useOrder from '@app/hooks/useOrder';
import { MainNavigationProp, MainScreens } from '@app/navigation/main/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  onReportIssue?: (order: Order) => void;
  onOrderItemsListForCustomer: () => void;
};

export const NextStep = ({
  style,
  order,
  onReportIssue,
  onOrderItemsListForCustomer,
}: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<MainNavigationProp>();

  const { confirmOrderItems } = useOrder();

  const userCell = () => {
    if (!order.orderItems) {
      return;
    }
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => onOrderItemsListForCustomer()}>
        <Image
          source={Images.CheckmarkGreen}
          style={{ width: 20, height: 20 }}
        />
        <View style={styles.cellText}>
          <Text style={styles.cellName}>{order.dropoffName}</Text>
          <Text style={styles.cellItems}>
            {`${order.orderItems.length} ` +
              (order.orderItems.length > 1 ? 'items' : 'item')}
          </Text>
        </View>
        <Image source={Images.ArrowRightBlack} />
      </TouchableOpacity>
    );
  };

  const onMarkAsDelivered = () => {
    navigation.navigate(MainScreens.MarkAsDelivered, { order: order });
  };

  const isDispatched =
    order.status === OrderStatus.dispatched ||
    order.status === OrderStatus.accepted;

  return (
    <View style={styles.nextStep}>
      <View style={styles.blueSeparator} />
      <View style={styles.flexRow}>
        <Image source={Images.ArrowsForward} />
        <Text style={styles.textNextStep}>Next Step</Text>
      </View>
      {/* {isDispatched && (
        <Toast
          toast={ToastMessage.get_closer}
          disableClose
          style={{ marginBottom: 10 }}
        />
      )} */}
      {isDispatched && userCell()}
      {isDispatched && (
        <Button
          style={{ marginHorizontal: 12, marginTop: 10 }}
          type={ButtonType.green}
          icon={Images.Hamburger}
          title={t('translations:confirm_items')}
          onPress={() => {
            confirmOrderItems({
              id: order.id,
              isDispatched: order.status === OrderStatus.dispatched,
            });
          }}
        />
      )}
      {order.status === OrderStatus.picked_up && (
        <>
          <Button
            style={{ marginHorizontal: 12, marginTop: 10 }}
            type={ButtonType.green}
            icon={Images.CheckWhite}
            title={t('translations:mark_as_delivered')}
            onPress={onMarkAsDelivered}
          />
          <Button
            style={{ marginHorizontal: 12, marginTop: 10 }}
            type={ButtonType.redBGRedText}
            title={t('translations:report_issue')}
            onPress={() => onReportIssue && onReportIssue(order)}
          />
        </>
      )}
    </View>
  );
};
