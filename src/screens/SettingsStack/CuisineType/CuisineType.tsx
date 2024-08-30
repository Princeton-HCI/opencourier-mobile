import React, { useState } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { styles } from './CuisineType.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';
import { CuisineTypes } from '@app/types/enums';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.CuisineTypeScreen>;

export const CuisineTypeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { settings, updateSettings, isUpdating } = useUserSettings();

  const [selectedCuisine, setSelectedCuisine] = useState<string[]>(
    settings?.cuisineTypes ?? [],
  );
  const cuisines = Object.keys(CuisineTypes).filter(item => {
    return isNaN(Number(item));
  });

  const onSelect = (cuisine: string) => {
    if (isUpdating) {
      return;
    }
    let result = [];
    if (selectedCuisine.indexOf(cuisine) !== -1) {
      result = selectedCuisine.filter(item => item !== cuisine);
    } else {
      result = [...selectedCuisine, cuisine];
    }
    setSelectedCuisine(result);
    updateSettings({ cuisineTypes: result });
  };

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item}
        cellType={SettingsCellType.radioButton}
        onSelect={onSelect}
        isSelected={selectedCuisine.indexOf(item) !== -1}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>{t('translations:cuisine_type')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={cuisines}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
