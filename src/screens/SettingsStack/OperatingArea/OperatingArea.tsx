import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './OperatingArea.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';
import { Images } from '@app/utilities/images';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.OperatingArea>;

export const OperatingArea = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const { settings } = useUserSettings();

  const [areas, setAreas] = useState<string[]>(settings?.preferredAreas ?? []);

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item}
        subtitle={undefined}
        cellType={SettingsCellType.deleteOption}
        onDelete={area => setAreas(areas.filter(obj => obj !== area))}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>{t('translations:operating_area')}</Text>
          <TouchableOpacity onPress={() => undefined} style={styles.buttonAdd}>
            <Image source={Images.PlusBlack} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={areas}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
