import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { styles } from './AddNote.styles';
import { useTranslation } from 'react-i18next';
import { Button, ButtonType } from '@app/components/Button/Button';
import { Images } from '@app/utilities/images';
import { Colors } from '@app/styles/colors';
import { Comment } from '@app/types/types';
import { ScrollView } from 'react-native-gesture-handler';

type Props = RootScreenProp<RootScreen.AddNoteModal>;

export const AddNote = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { type, onNoteAdded, order, onNoteEdited, noteToEdit } = route.params;
  const [note, setNote] = useState<string>('');

  const onChangeText = (newNote: string) => {
    setNote(newNote);
  };

  const onSave = () => {
    if (noteToEdit !== undefined) {
      onNoteEdited && onNoteEdited(note, noteToEdit);
    } else {
      onNoteAdded && onNoteAdded(note, type!, order!);
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (noteToEdit !== undefined) {
      setNote(noteToEdit.note);
    }
  }, [noteToEdit]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('translations:note')}</Text>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Image source={Images.ArrowLeft} />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              value={note}
              placeholder={t('translations:add_note_here')}
              onChangeText={onChangeText}
              multiline
              maxLength={150}
            />
            <View style={styles.containerInfo}>
              <Image source={Images.Info} style={styles.iconinfo} />
              <Text style={styles.textInfo}>{`${note.length}/150`}</Text>
            </View>
            <View style={styles.containerInfo}>
              <Image source={Images.Info} style={styles.iconinfo} />
              <Text style={styles.textInfo}>
                {t('translations:avoid_mentioning')}
              </Text>
            </View>
            <View style={styles.containerInfo}>
              <Image
                source={Images.Info}
                style={[styles.iconinfo, { tintColor: Colors.red1 }]}
              />
              <Text style={[styles.textInfo, { color: Colors.red1 }]}>
                {t('translations:avoid_mentioning_consumer')}
              </Text>
            </View>

            <Button
              textStyle={{ fontWeight: '800', fontSize: 16 }}
              icon={Images.CheckWhite}
              type={ButtonType.green}
              title={t('translations:save')}
              onPress={onSave}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
