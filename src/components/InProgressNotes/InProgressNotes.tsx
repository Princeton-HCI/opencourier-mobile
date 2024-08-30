import React from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './InProgressNotes.styles';
import { CourierTip, Note, Order } from '@app/types/types';
import { PickupInstructionCell } from '../PickupInstructionsCell/PickupInstructionCell';
import { Images } from '@app/utilities/images';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp, RootScreen } from '@app/navigation/types';
import useComment from '@app/hooks/useComment';

type Props = {
  style?: StyleProp<ViewStyle>;
  order: Order;
  notes: Note[] | string[];
  headerTitle: string;
  type?: 'merchant' | 'location';
  expanded: boolean;
  noteCreationDisabled: boolean;
};

export const InProgressNotes = ({
  style,
  notes,
  order,
  headerTitle,
  type,
  expanded,
  noteCreationDisabled = true,
}: Props) => {
  const navigation = useNavigation<RootNavigationProp>();
  const { createComment } = useComment();

  const onNoteAdded = (
    text: string,
    type2: 'merchant' | 'location',
    noteOrder: Order,
  ) => {
    createComment({
      note: text,
      locationId:
        type === 'merchant'
          ? noteOrder.pickupLocationId
          : noteOrder.dropoffLocationId,
      deliveryId: noteOrder.id,
    });
  };

  const onNoteAdd = () => {
    navigation.navigate(RootScreen.AddNoteModal, {
      onNoteAdded: onNoteAdded,
      order: order,
      type: type,
    });
  };

  return (
    <View
      style={[
        styles.container,
        !expanded && { height: 0 },
        expanded && { overflow: 'visible' },
        style,
      ]}>
      <View style={[styles.noteHeader]}>
        <Text style={styles.textNotesHeader}>{headerTitle}</Text>
        <View style={styles.notesDash} />
        {!noteCreationDisabled && (
          <TouchableOpacity style={styles.addNote} onPress={onNoteAdd}>
            <Image source={Images.PlusBlack} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.containerInstructions]}>
        {notes.map(note => {
          return <PickupInstructionCell note={note} />;
        })}
      </View>
    </View>
  );
};
