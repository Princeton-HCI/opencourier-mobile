import React, { useState } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './InProgressCell.styles';
import { Order } from '@app/types/types';
import { Images } from '@app/utilities/images';
import { Button, ButtonType } from '../Button/Button';
import { PickupInstructionCell } from '../PickupInstructionsCell/PickupInstructionCell';
import { DeliveryInstructionsCell } from '../DeliveryInstructionsCell/DeliveryInstructionsCell';
import { NoteCell } from '../NoteCell/NoteCell';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  onContactRestaurant: (order: Order) => void;
  onContactCustomer: (order: Order) => void;
  onConfirmItems: (order: Order) => void;
  onMarkAsDelivered: (order: Order) => void;
  onChatRestaurant: (order: Order) => void;
  onChatCustomer: (order: Order) => void;
};

export const InProgressCell = ({
  style,
  order,
  onContactRestaurant,
  onContactCustomer,
  onConfirmItems,
  onMarkAsDelivered,
  onChatRestaurant,
  onChatCustomer,
}: Props) => {
  const [topExpanded, setTopExpanded] = useState<boolean>(false);
  const [bottomExpanded, setBottomExpanded] = useState<boolean>(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.containerHeader}>
        <Image
          source={Images.RestaurantGray}
          style={styles.iconGrayRestaurant}
        />
        <Text style={styles.textName}>{order.restaurant.name}</Text>
        <TouchableOpacity
          style={styles.buttonCarret}
          onPress={() => setTopExpanded(!topExpanded)}>
          <Image
            source={Images.CaretDown}
            style={[
              styles.iconCaret,
              topExpanded && { transform: [{ rotate: '180deg' }] },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerContentRestaurant}>
        <View style={styles.containerLeft}>
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.containerInfo}>
          <View
            style={[
              styles.colapsable,
              !topExpanded && { height: 0 },
              topExpanded && { overflow: 'visible' },
            ]}>
            <View style={styles.containerAddressButton}>
              <Text style={styles.textAddress}>{order.restaurant.address}</Text>
              <TouchableOpacity onPress={() => onChatRestaurant(order)}>
                <View style={styles.containerChats}>
                  <Image source={Images.Chats} />
                </View>
              </TouchableOpacity>
            </View>
            {order.restaurantNotes && (
              <View style={styles.containerNotes}>
                {order.restaurantNotes.map(note => {
                  return <NoteCell text={note} />;
                })}
              </View>
            )}
            <View style={styles.containerInstructions}>
              {order.pickupInstructions &&
                order.pickupInstructions.map(item => {
                  return <PickupInstructionCell instruction={item} />;
                })}
              <TouchableOpacity style={styles.buttonAddNote}>
                <Image source={Images.PlusCircle} />
                <Text style={styles.textAddNote}>Type a note</Text>
              </TouchableOpacity>
            </View>

            <Button
              textStyle={{ fontSize: 20, fontWeight: '700' }}
              style={styles.buttonTop}
              type={ButtonType.black}
              icon={Images.PhoneOutgoing}
              title="Contact restaurant"
              onPress={() => onContactRestaurant(order)}
            />
            <Button
              textStyle={{ fontSize: 20, fontWeight: '700' }}
              type={ButtonType.green}
              icon={Images.Hamburger}
              title="Confirm items"
              onPress={() => onConfirmItems(order)}
            />
          </View>

          <View style={styles.containerMap}>
            <View style={styles.map} />
            <View style={styles.containerAway}>
              <View style={styles.containerTextAway}>
                <Image source={Images.Distance} />
                <Text style={styles.textDistance}>44 miles away</Text>
              </View>
              <View style={styles.containerTextAway}>
                <Image source={Images.Clock} />
                <Text style={styles.textDistance}>3 min away</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerHeader}>
        <Image source={Images.HouseGray} style={styles.iconGrayRestaurant} />
        <Text style={styles.textName}>{order.deliveredTo.firstname}</Text>
        <TouchableOpacity
          style={styles.buttonCarret}
          onPress={() => setBottomExpanded(!bottomExpanded)}>
          <Image
            source={Images.CaretDown}
            style={[
              styles.iconCaret,
              bottomExpanded && { transform: [{ rotate: '180deg' }] },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerContentRestaurant}>
        <View style={styles.containerLeft} />
        <View style={styles.containerInfo}>
          <View
            style={[
              styles.colapsable,
              !bottomExpanded && { height: 0 },
              bottomExpanded && { overflow: 'visible' },
            ]}>
            <View style={styles.containerAddressButton}>
              <Text style={styles.textAddress}>{order.restaurant.address}</Text>
              <TouchableOpacity onPress={() => onChatCustomer(order)}>
                <View style={styles.containerChats}>
                  <Image source={Images.Chats} />
                </View>
              </TouchableOpacity>
            </View>
            {order.clientNotes && (
              <View style={styles.containerNotes}>
                {order.clientNotes.map(note => {
                  return <NoteCell text={note} />;
                })}
              </View>
            )}
            {order.deliveryInstructions && (
              <View style={styles.containerInstructions}>
                {order.deliveryInstructions.map(item => {
                  return <DeliveryInstructionsCell type={item} />;
                })}
              </View>
            )}

            <Button
              textStyle={{ fontSize: 20, fontWeight: '700' }}
              style={styles.buttonTop}
              type={ButtonType.black}
              icon={Images.PhoneOutgoing}
              title="Contact customer"
              onPress={() => onContactCustomer(order)}
            />
            <Button
              textStyle={{ fontSize: 20, fontWeight: '700' }}
              type={ButtonType.gray}
              icon={Images.CheckFat}
              title="Mark as delivered"
              onPress={() => onMarkAsDelivered(order)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
