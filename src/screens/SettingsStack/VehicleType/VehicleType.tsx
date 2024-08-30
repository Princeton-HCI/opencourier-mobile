import React, { useState } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { styles } from './VehicleType.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';
import { VehicleType } from '@app/types/enums';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.VehicleTypeScreen>;

export const VehicleTypeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { settings, updateSettings, isUpdating } = useUserSettings();

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    settings?.vehicleType?.toLowerCase() ?? null,
  );
  const vehicles = Object.keys(VehicleType).filter(item => {
    return isNaN(Number(item));
  });

  const onSelect = (vehicle: string) => {
    if (isUpdating) {
      return;
    }
    setSelectedVehicle(vehicle);
    updateSettings({
      vehicleType: vehicle.toUpperCase(),
    });
  };

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item}
        cellType={SettingsCellType.radioButton}
        onSelect={onSelect}
        isSelected={selectedVehicle === item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>{t('translations:vehicle_type')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={vehicles}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
