import React, { useState } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { styles } from './WeightOrder.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  RadioButtonType,
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';
import { OrderPreferences } from '@app/types/enums';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.WeightOrderScreen>;

const weightInfo = new Map([
  ['small_orders', 'weight_info_small'],
  ['medium_orders', 'weight_info_medium'],
  ['large_orders', 'weight_info_large'],
]);

export const WeightOrderScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useUserSettings();

  // TODO: add to user settings

  const [selectedOrder, setSelectedOrder] = useState<string[]>(
    settings?.foodPreferences ?? [],
  );
  const orders = Object.keys(OrderPreferences).filter(item => {
    return isNaN(Number(item));
  });

  const onSelect = (orderPreference: string) => {
    let result = [];
    if (selectedOrder.indexOf(orderPreference) !== -1) {
      result = selectedOrder.filter(item => item !== orderPreference);
    } else {
      result = [...selectedOrder, orderPreference];
    }

    setSelectedOrder(result);
    updateSettings({ foodPreferences: result });
  };

  const renderItem = ({ item }: { item: string; index: number }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item}
        subtitle={weightInfo.get(item) || ''}
        cellType={SettingsCellType.radioButton}
        radioButtonType={RadioButtonType.checkmark}
        onSelect={onSelect}
        isSelected={selectedOrder.indexOf(item) !== -1}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>{t('translations:weight_order')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={orders}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
