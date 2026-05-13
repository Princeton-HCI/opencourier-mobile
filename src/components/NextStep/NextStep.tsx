import React, { useEffect, useState } from 'react';
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

  const {
    confirmOrderItems,
    arrivedAtPickup,
    isArrivedAtPickupPending,
    arrivedAtDropoff,
    isArrivedAtDropoffPending,
  } = useOrder();

  /** True after successful "Arrived at pickup" while API may still show ACCEPTED/DISPATCHED. */
  const [confirmItemsUnlocked, setConfirmItemsUnlocked] = useState(false);

  useEffect(() => {
    setConfirmItemsUnlocked(false);
  }, [order.id]);

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
    arrivedAtDropoff(order.id, {
      onSuccess: () =>
        navigation.navigate(MainScreens.MarkAsDelivered, { order }),
    });
  };

  const showPrePickupActions =
    order.status === OrderStatus.dispatched ||
    order.status === OrderStatus.accepted ||
    order.status === OrderStatus.courier_arrived_at_pickup_location;

  /** Order is already dispatched on the server — skip redundant mark-as-dispatched before pickup. */
  const isAlreadyDispatchedForConfirm =
    order.status === OrderStatus.dispatched ||
    order.status === OrderStatus.courier_arrived_at_pickup_location;

  const isCourierArrivedAtPickup =
    order.status === OrderStatus.courier_arrived_at_pickup_location;

  const showConfirmOrderItems =
    showPrePickupActions &&
    (isCourierArrivedAtPickup || confirmItemsUnlocked);

  const showArrivedAtPickupButton =
    showPrePickupActions && !isCourierArrivedAtPickup && !confirmItemsUnlocked;

  return (
    <View style={styles.nextStep}>
      <View style={styles.blueSeparator} />
      <View style={styles.flexRow}>
        <Image source={Images.ArrowsForward} />
        <Text style={styles.textNextStep}>Next Step</Text>
      </View>
      {/* {showPrePickupActions && (
        <Toast
          toast={ToastMessage.get_closer}
          disableClose
          style={{ marginBottom: 10 }}
        />
      )} */}
      {showPrePickupActions && userCell()}
      {showArrivedAtPickupButton && (
        <Button
          style={{ marginHorizontal: 12, marginTop: 10 }}
          type={ButtonType.green}
          title={t('translations:arrived_at_pickup')}
          onPress={() =>
            arrivedAtPickup(order.id, {
              onSuccess: () => setConfirmItemsUnlocked(true),
            })
          }
          isLoading={isArrivedAtPickupPending}
        />
      )}
      {showConfirmOrderItems && (
        <Button
          style={{ marginHorizontal: 12, marginTop: 10 }}
          type={ButtonType.green}
          icon={Images.Hamburger}
          title={t('translations:confirm_items')}
          onPress={() => {
            confirmOrderItems({
              id: order.id,
              isDispatched: isAlreadyDispatchedForConfirm,
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
            isLoading={isArrivedAtDropoffPending}
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
