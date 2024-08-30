import React, { ReactElement, useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  SectionListData,
  SectionList,
} from 'react-native';
import { styles } from './Settings.styles';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { DrawerScreenProp, DrawerScreens } from '@app/navigation/drawer/types';
import { MainScreens } from '@app/navigation/main/types';
import { useTranslation } from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import Clipboard from '@react-native-clipboard/clipboard';
import { SettingsOptions } from '@app/types/types';
import {
  SettingsCell,
  SettingsCellType,
} from '@app/components/SettingsCell/SettingsCell';

type SectionListItem = {
  cellType: SettingsCellType;
  cellData: SettingsOptions;
};

type Props = DrawerScreenProp<DrawerScreens.Settings>;

export const SettingsScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [token, setToken] = useState<string>('');

  const [form, setForm] = useState({
    [SettingsOptions.notifications]: false,
    [SettingsOptions.cashOnDelivery]: false,
    [SettingsOptions.includeOrdersWithDrinks]: false,
    [SettingsOptions.rushedOrders]: false,
    [SettingsOptions.deliveryBag]: false,
  });

  const settings: SectionListData<SectionListItem>[] = [
    {
      data: [
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.accountInformation,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.accessibility,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.earningMethod,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.emergencyContact,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.language,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.navigation,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.operatingArea,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.theme,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.vehicleType,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.verification,
        },
        {
          cellType: SettingsCellType.switch,
          cellData: SettingsOptions.notifications,
        },
        {
          cellType: SettingsCellType.switch,
          cellData: SettingsOptions.cashOnDelivery,
        },
      ],
      title: undefined,
    },
    {
      data: [
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.shiftAvailability,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.cuisineTypes,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.restaurantTypes,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.orderTypes,
        },
        {
          cellType: SettingsCellType.plain,
          cellData: SettingsOptions.weightOrder,
        },
        {
          cellType: SettingsCellType.switch,
          cellData: SettingsOptions.includeOrdersWithDrinks,
        },
        {
          cellType: SettingsCellType.switch,
          cellData: SettingsOptions.rushedOrders,
        },
        {
          cellType: SettingsCellType.switch,
          cellData: SettingsOptions.deliveryBag,
        },
      ],
      title: t('translations:orders'),
    },
    {
      data: [
        {
          cellData: SettingsOptions.licenses,
          cellType: SettingsCellType.plain,
        },
      ],
      title: t('translations:Dev'),
    },
  ];

  const pullToken = async () => {
    const fcmToken = await messaging().getToken();
    setToken(fcmToken);
  };

  const onTokenPressHandle = () => {
    Clipboard.setString(token);
  };

  const cellSubtitleForSetting = (setting: SettingsOptions) => {
    switch (setting) {
      case SettingsOptions.accountInformation:
        return 'manage_your_account';
      case SettingsOptions.accessibility:
        return 'enable_enhcanced_accessibility';
      case SettingsOptions.emergencyContact:
        return 'add_trusted_contact';
      case SettingsOptions.language:
        return 'select_language';
      case SettingsOptions.navigation:
        return 'customize_navigation';
      case SettingsOptions.operatingArea:
        return 'manage_you_areas';
      case SettingsOptions.theme:
        return 'select_theme';
      case SettingsOptions.verification:
        return 'manage_verification';
      case SettingsOptions.notifications:
        return 'push_notifications';
      case SettingsOptions.cashOnDelivery:
        return 'enable_cash';
      case SettingsOptions.deliveryBag:
        return 'having_delivery_bag';
      case SettingsOptions.includeOrdersWithDrinks:
        return 'enable_include_orders';
      case SettingsOptions.licenses:
        return undefined;
      case SettingsOptions.earningMethod:
        return 'select_earning_method';
      case SettingsOptions.vehicleType:
        return 'select_vehicle';
      case SettingsOptions.cuisineTypes:
        return 'select_cuisine';
      case SettingsOptions.restaurantTypes:
        return 'select_restaurant_type';
      case SettingsOptions.orderTypes:
        return 'select_order_types';
      case SettingsOptions.weightOrder:
        return 'select_weight_order';
      case SettingsOptions.rushedOrders:
        return 'enable_rushed';
      case SettingsOptions.shiftAvailability:
        return 'shift_availability_more';
    }
  };

  const onPressCell = (item: string) => {
    if (item === SettingsOptions.licenses) {
      navigation.navigate(MainScreens.Licences);
    }
    if (item === SettingsOptions.language) {
      navigation.navigate(MainScreens.LanguageScreen);
    }
    if (item === SettingsOptions.theme) {
      navigation.navigate(MainScreens.ThemeScreen);
    }
    if (item === SettingsOptions.operatingArea) {
      navigation.navigate(MainScreens.OperatingArea);
    }
    if (item === SettingsOptions.accessibility) {
      navigation.navigate(MainScreens.Accessibility);
    }
    if (item === SettingsOptions.emergencyContact) {
      navigation.navigate(MainScreens.EmergencyContact);
    }
    if (item === SettingsOptions.navigation) {
      navigation.navigate(MainScreens.NavigationScreen);
    }
    if (item === SettingsOptions.vehicleType) {
      navigation.navigate(MainScreens.VehicleTypeScreen);
    }
    if (item === SettingsOptions.restaurantTypes) {
      navigation.navigate(MainScreens.RestaurantTypeScreen);
    }
    if (item === SettingsOptions.cuisineTypes) {
      navigation.navigate(MainScreens.CuisineTypeScreen);
    }
    if (item === SettingsOptions.earningMethod) {
      navigation.navigate(MainScreens.EarningsMethodScreen);
    }
    if (item === SettingsOptions.orderTypes) {
      navigation.navigate(MainScreens.OrderPreferenceScreen);
    }
    if (item === SettingsOptions.weightOrder) {
      navigation.navigate(MainScreens.WeightOrderScreen);
    }
    if (item === SettingsOptions.shiftAvailability) {
      navigation.navigate(MainScreens.ShiftAvailabilityScreen);
    }
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: SectionListItem;
    index: number;
  }) => {
    return (
      <SettingsCell
        style={{ marginBottom: 16 }}
        title={item.cellData}
        subtitle={cellSubtitleForSetting(item.cellData)}
        cellType={item.cellType}
        onPress={onPressCell}
        switchValue={form[item.cellData] ?? false}
        onSwitchValueChange={isOn => {
          setForm({
            ...form,
            [item.cellData]: isOn,
          });
        }}
      />
    );
  };

  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: SectionListData<SectionListItem>;
  }): ReactElement => {
    if (title) {
      return (
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>{title}</Text>
          <View style={styles.headerLine} />
        </View>
      );
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.toggleDrawer()} />
          <Text style={styles.title}>{t('translations:settings')}</Text>
        </View>

        {/* {token && (
          <TouchableOpacity onPress={onTokenPressHandle}>
            <Text style={{ color: 'black', padding: 20 }}>
              FCM Token: {token}
            </Text>
          </TouchableOpacity>
        )} */}

        <SectionList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          sections={settings}
          renderItem={renderItem}
          bounces={true}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};
