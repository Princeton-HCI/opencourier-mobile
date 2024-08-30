import React, { useState } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { styles } from './OrderPreference.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';
import { FoodPreferences } from '@app/types/enums';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.OrderPreferenceScreen>;

export const OrderPreferenceScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { settings, updateSettings, isUpdating } = useUserSettings();

  const [selectedPreference, setSelectedPreference] = useState<string[]>(
    settings?.foodPreferences ?? [],
  );
  const preferences = Object.keys(FoodPreferences).filter(item => {
    return isNaN(Number(item));
  });

  const onSelect = (restaurantType: string) => {
    if (isUpdating) {
      return;
    }
    let result = [];
    if (selectedPreference.indexOf(restaurantType) !== -1) {
      result = selectedPreference.filter(item => item !== restaurantType);
    } else {
      result = [...selectedPreference, restaurantType];
    }

    setSelectedPreference(result);
    updateSettings({
      foodPreferences: result,
    });
  };

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item}
        cellType={SettingsCellType.radioButton}
        onSelect={onSelect}
        isSelected={selectedPreference.indexOf(item) !== -1}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>{t('translations:food_preferences')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={preferences}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
