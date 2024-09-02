import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { styles } from './InProgressCell.styles';
import { Note, Order } from '@app/types/types';
import { Images } from '@app/utilities/images';
import { useTranslation } from 'react-i18next';
import { InProgressCellHeader } from '../InProgressCellHeader/InProgressCellHeader';
import { InProgressAdress } from '../InProgressAddress/InProgressAddress';
import { InProgressNotes } from '../InProgressNotes/InProgressNotes';
import { InProgressMap } from '../InProgressMap/InProgressMap';
import { NextStep } from '../NextStep/NextStep';
import { getDistance } from '@app/utilities/geo';
import { OrderStatus } from '@app/types/enums';
import useUser from '@app/hooks/useUser';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  onCustomerAddressPress: (order: Order) => void;
  onRestaurantAddressPress: (order: Order) => void;
  onMessageRestaurant: (order: Order) => void;
  onCallRestaurant: (order: Order) => void;
  onMessageCustomer: (order: Order) => void;
  onCallCustomer: (order: Order) => void;
  onOrderItemsListForCustomer: () => void;
  onReportIssue: (order: Order) => void;
};

export const InProgressCell = ({
  style,
  order,
  onCustomerAddressPress,
  onRestaurantAddressPress,
  onMessageCustomer,
  onMessageRestaurant,
  onCallCustomer,
  onCallRestaurant,
  onOrderItemsListForCustomer,
  onReportIssue,
}: Props) => {
  const { t } = useTranslation();
  const [topExpanded, setTopExpanded] = useState<boolean>(true);
  const [bottomExpanded, setBottomExpanded] = useState<boolean>(false);
  const { user } = useUser();
  const [distance, setDistance] = useState<number>(0); // meters
  const [duration, setDuration] = useState<number>(0); // seconds

  useEffect(() => {
    if (
      user!.currentLocation &&
      order.pickupLocation &&
      order.dropoffLocation
    ) {
      const coordinates = [
        [user!.currentLocation.longitude, user!.currentLocation.latitude],
        [order.pickupLocation.longitude, order.pickupLocation.latitude],
        [order.dropoffLocation.longitude, order.dropoffLocation.latitude],
      ];
      getDistance(coordinates).then(({ duration, distance }) => {
        setDuration(duration);
        setDistance(distance);
      });
    }
  }, [user!.currentLocation, order]);

  return (
    <View style={[styles.container, style]}>
      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <InProgressCellHeader
          title={order.dropoffName ?? 'N/A'}
          icon={Images.Storefront}
          expanded={topExpanded}
          onExpandedPress={() => setTopExpanded(!topExpanded)}
          finished={order.status === OrderStatus.picked_up}
        />
        <View style={styles.containerContentRestaurant}>
          <View style={styles.containerLeft}>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.containerInfo}>
            <View style={[styles.colapsable]}>
              <InProgressAdress
                order={order}
                customerOrRestaurant="restaurant"
                onAddressPress={() => onRestaurantAddressPress(order)}
                onCall={() => onCallRestaurant(order)}
                onCopyAddress={() => onMessageRestaurant(order)}
                expanded={topExpanded}
              />
              {order.status === OrderStatus.dispatched && (
                <InProgressMap
                  order={order}
                  user={user!}
                  distance={distance}
                  duration={duration}
                />
              )}
              <InProgressNotes
                order={order}
                notes={order.pickupNotes ? [order.pickupNotes] : []}
                headerTitle={t('translations:restaurant_notes')}
                expanded={topExpanded}
                noteCreationDisabled={true}
              />
              <InProgressNotes
                order={order}
                notes={order.pickupLocationNotes}
                headerTitle={t('translations:location_courier_notes')}
                expanded={topExpanded}
                noteCreationDisabled={false}
                type="merchant"
              />
            </View>
          </View>
        </View>
        <InProgressCellHeader
          title={order.dropoffBusinessName ?? 'N/A'}
          icon={Images.HouseGray}
          expanded={bottomExpanded}
          onExpandedPress={() => setBottomExpanded(!bottomExpanded)}
          finished={order.status === OrderStatus.dropped_off}
        />
        <View style={styles.containerContentRestaurant}>
          <View style={styles.containerLeft} />
          <View style={styles.containerInfo}>
            <View style={[styles.colapsable]}>
              <InProgressAdress
                order={order}
                customerOrRestaurant="customer"
                onAddressPress={() => onCustomerAddressPress(order)}
                onCall={() => onCallCustomer(order)}
                onCopyAddress={() => onMessageCustomer(order)}
                expanded={bottomExpanded}
              />
              <InProgressNotes
                order={order}
                notes={
                  order.dropoffSellerNotes ? [order.dropoffSellerNotes] : []
                }
                headerTitle={t('translations:customer_notes')}
                expanded={bottomExpanded}
                noteCreationDisabled={true}
              />
              <InProgressNotes
                order={order}
                notes={order.dropOffLocationNotes}
                headerTitle={t('translations:location_courier_notes')}
                expanded={bottomExpanded}
                noteCreationDisabled={false}
                type="location"
              />
            </View>
          </View>
        </View>
      </View>
      <NextStep
        order={order}
        onOrderItemsListForCustomer={() => onOrderItemsListForCustomer()}
        onReportIssue={() => onReportIssue(order)}
      />
    </View>
  );
};
