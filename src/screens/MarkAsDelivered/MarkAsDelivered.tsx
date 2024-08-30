import React, { ReactElement, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  SectionListData,
  SectionList,
  Alert,
} from 'react-native';
import { styles } from './MarkAsDelivered.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { QuickNote } from '@app/components/QuickNote/QuickNote';
import { CustomerNotes, Photo } from '@app/types/types';
import { Images } from '@app/utilities/images';
import { Button, ButtonType } from '@app/components/Button/Button';
import { PhotoCell } from '@app/components/PhotoCell/PhotoCell';
import { services } from '@app/services/service';
import { useTranslation } from 'react-i18next';
import { RootScreen } from '@app/navigation/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@app/utilities/queryKeys';

type Props = MainScreenProp<MainScreens.MarkAsDelivered>;

type SectionListItem = {
  notes: string[];
};

export const MarkAsDelivered = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { order } = route.params;
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(
    undefined,
  );
  const [data, setData] = useState<SectionListData<SectionListItem>[]>([
    {
      data: [
        {
          notes: [
            CustomerNotes.BellnotRung,
            CustomerNotes.DontBlockDoor,
            CustomerNotes.HandleWithCare,
            CustomerNotes.PreventLeaks,
          ],
        },
      ],
      title: t('translations:quick_note'),
    },
    { data: [{ notes: [] }], title: t('translations:add_note') },
  ]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const { mutate: markAsDelivered, isPending } = useMutation({
    mutationFn: services.orderService.markAsDelivered,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.inProgressOrders, QueryKeys.orderHistory],
      });
      navigation.goBack();
    },
    onError: error => Alert.alert('Error marking as delivered', error.message),
  });

  const handleNotePress = (note: string) => {
    const found = selectedNotes.filter(obj => obj === note);
    if (found.length > 0) {
      const newData = selectedNotes.filter(obj => obj !== note);
      setSelectedNotes(newData);
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const noteSelected = (item: string) => {
    return selectedNotes.filter(obj => obj === item).length > 0;
  };

  const addNote = (text: string | undefined) => {
    if (text) {
      var temp = [...data];
      const noteArray = data[1].data[0].notes.filter(obj => obj !== text);
      temp[1].data[0].notes = [...noteArray, text];
      setData(temp);
    }
  };

  const onAddNote = () => {
    navigation.navigate(RootScreen.AddNoteModal, {
      onNoteAdded: addNote,
      order: order,
    });
  };

  const onDeletePhoto = (photo: Photo) => {
    setSelectedPhoto(undefined);
  };

  const renderItem = ({
    section,
  }: {
    index: number;
    section: SectionListData<SectionListItem>;
  }) => {
    const item = section.data[0];
    return (
      <View style={styles.contentContainerStyle}>
        {item.notes &&
          item.notes.map(note => {
            return (
              <QuickNote
                createdByUser={section.title === t('translations:add_note')}
                text={note}
                selected={noteSelected(note)}
                onPress={handleNotePress}
              />
            );
          })}
      </View>
    );
  };

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: SectionListData<SectionListItem>;
  }): ReactElement => {
    if (title === t('translations:quick_note')) {
      return (
        <View style={styles.containerHeader}>
          <Text style={styles.textNotesHeader}>{title}</Text>
          <View style={styles.headerLine} />
        </View>
      );
    }
    return (
      <View style={[styles.noteHeader]}>
        <Text style={styles.textNotesHeader}>{t('translations:add_note')}</Text>
        <View style={styles.notesDash} />
        <TouchableOpacity style={styles.addNote} onPress={() => onAddNote()}>
          <Image source={Images.PlusBlack} />
        </TouchableOpacity>
      </View>
    );
  };

  const onAttachPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleConfirm = () => {
    markAsDelivered({
      id: order.id,
      note: selectedNotes.length > 0 ? selectedNotes[0] : '',
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <Text style={styles.title}>
            {t('translations:marking_as_delivered')}
          </Text>
          <BackNavButton onPress={() => navigation.goBack()} />
        </View>

        <SectionList
          showsVerticalScrollIndicator={false}
          style={[styles.gridContainer]}
          sections={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
        />

        <Text style={styles.textShow}>
          {t('translations:show_the_customer')}
        </Text>

        {selectedPhoto && (
          <PhotoCell
            style={{ marginBottom: 16 }}
            image={selectedPhoto}
            onDelete={() => onDeletePhoto(selectedPhoto)}
            onRetake={() =>
              navigation.navigate(MainScreens.PhotoAttachment, {
                onAttach: onAttachPhoto,
              })
            }
          />
        )}
        {!selectedPhoto && (
          <Button
            textStyle={styles.buttonTextStyle}
            style={styles.buttonConfirm}
            icon={Images.Camera}
            type={ButtonType.black}
            title={t('translations:take_a_photo')}
            onPress={() =>
              navigation.navigate(MainScreens.PhotoAttachment, {
                onAttach: onAttachPhoto,
              })
            }
          />
        )}

        <Button
          isLoading={isPending}
          style={styles.buttonConfirm}
          textStyle={styles.buttonTextStyle}
          icon={Images.CheckWhite}
          type={ButtonType.green}
          title={t('translations:confirm_mark_as_delivered')}
          onPress={handleConfirm}
        />

        {selectedPhoto && (
          <Button
            style={styles.buttonConfirm}
            textStyle={styles.buttonTextStyle}
            type={ButtonType.white}
            title={t('translations:handed_to_customer')}
            onPress={() => undefined}
          />
        )}
        <Button
          style={styles.buttonConfirm}
          textStyle={styles.buttonTextStyle}
          type={ButtonType.redBGRedText}
          title={t('translations:report_issue')}
          onPress={() => {
            navigation.navigate(MainScreens.ReportIssue, { order: order });
          }}
        />
      </SafeAreaView>
    </View>
  );
};
