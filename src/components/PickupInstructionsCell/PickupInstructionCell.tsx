import React, { useMemo, useState } from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './PickupInstructionCell.styles';
import { Note } from '@app/types/types';
import { Images } from '@app/utilities/images';
import { Colors } from '@app/styles/colors';
import { SCREEN_WIDTH } from '@app/utilities/constants';
import useComment from '@app/hooks/useComment';
import { useNavigation } from '@react-navigation/native';
import { RootScreen, RootNavigationProp } from '@app/navigation/types';
import useUser from '@app/hooks/useUser';

type Props = {
  style?: StyleProp<ViewStyle>;
  note: Note | string;
};

enum EditComponentLayout {
  vertical,
  horizontal,
}

export const PickupInstructionCell = ({ style, note }: Props) => {
  const navigation = useNavigation<RootNavigationProp>();
  const [bubbleWidth, setBubbleWidth] = useState<number>(0);
  const { user } = useUser();
  const { addReaction, updateComment, deleteComment } = useComment();

  const isNoteString = typeof note === 'string';
  const editDisabled = isNoteString ? true : note.courierId !== user?.id;

  // TODO: calculate those
  const upvoted = !isNoteString
    ? note.currentCourierReaction === 'UPVOTE'
    : false;
  const downvoted = !isNoteString
    ? note.currentCourierReaction === 'DOWNVOTE'
    : false;
  const endorsed = false;
  const likes = !isNoteString ? note.upvotes - note.downvotes : 0;

  const onUpvote = () => {
    if (isNoteString) {
      return;
    }

    addReaction({ locationNoteId: note.id, reaction: 'UPVOTE' });
  };

  const onDownvote = () => {
    if (isNoteString) {
      return;
    }

    addReaction({ locationNoteId: note.id, reaction: 'DOWNVOTE' });
  };

  const onDeleteConfirm = () => {
    if (isNoteString) {
      return;
    }

    deleteComment(note.id);
  };

  const onDelete = () => {
    if (isNoteString) {
      return;
    }

    navigation.navigate(RootScreen.DeleteNoteModal, {
      onNoteDeleted: onDeleteConfirm,
      note: note,
    });
  };

  const onEditConfirm = (text: string, note2: Note) => {
    updateComment({
      id: note2.id,
      note: text,
    });
  };

  const onEdit = () => {
    if (isNoteString) {
      return;
    }

    navigation.navigate(RootScreen.AddNoteModal, {
      noteToEdit: note,
      onNoteEdited: onEditConfirm,
    });
  };

  const editComponentLayout = useMemo(() => {
    if (bubbleWidth > SCREEN_WIDTH - 150) {
      return EditComponentLayout.vertical;
    } else {
      return EditComponentLayout.horizontal;
    }
  }, [bubbleWidth]);

  return (
    <View style={[styles.parent, style]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: endorsed ? Colors.yellow4 : Colors.gray20,
          },
        ]}
        onLayout={event => {
          setBubbleWidth(event.nativeEvent.layout.width);
        }}>
        <Text style={[styles.textContent]}>
          {!isNoteString ? note.note : note}
        </Text>
        {!isNoteString && (
          //TODO: API for up and down vote
          <View style={styles.containerVoteButtons}>
            <TouchableOpacity
              style={styles.containerVoteButton}
              onPress={onUpvote}>
              <Image
                source={Images.ArrowUpGray}
                style={upvoted && { tintColor: Colors.green8 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.textCount,
                upvoted && { color: Colors.green8 },
                downvoted && { color: Colors.red7 },
              ]}>
              {likes}
            </Text>
            <TouchableOpacity
              style={styles.containerVoteButton}
              onPress={onDownvote}>
              <Image
                source={Images.ArrowDownGray}
                style={downvoted && { tintColor: Colors.red7 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!editDisabled && (
        <View
          style={[
            editComponentLayout === EditComponentLayout.horizontal
              ? styles.containerHorizontalEdit
              : styles.containerVerticalEdit,
            endorsed
              ? { backgroundColor: Colors.yellow4, borderColor: Colors.yellow3 }
              : { backgroundColor: Colors.gray20, borderColor: Colors.gray21 },
          ]}>
          <TouchableOpacity style={styles.buttonEdit} onPress={onDelete}>
            <Image source={Images.Trash} style={styles.iconDelete} />
          </TouchableOpacity>
          <View
            style={
              editComponentLayout === EditComponentLayout.horizontal
                ? {
                    width: 1,
                    backgroundColor: endorsed ? Colors.yellow3 : Colors.gray21,
                  }
                : {
                    height: 1,
                    backgroundColor: endorsed ? Colors.yellow3 : Colors.gray21,
                  }
            }
          />
          <TouchableOpacity style={styles.buttonEdit} onPress={onEdit}>
            <Image source={Images.Edit} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
