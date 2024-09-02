import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { styles } from './SideMenu.styles';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { ProfileBadge } from '@app/components/ProfileBadge/ProfileBadge';
import { Organization, SideMenuItem, UserStatus } from '@app/types/types';
import { UserStatusSelector } from '@app/components/UserStatusSelector/UserStatusSelector';
import { SideMenuItemSwitch } from '@app/components/SideMenuItemSwitch/SideMenuItemSwitch';
import { SideMenuItemPlain } from '@app/components/SideMenuItemPlain/SideMenuItemPlain';
import { OrganizationSelect } from '@app/components/OrganizationSelect/OrganizationSelect';
import { TEST_ORG_ARRAY } from '@app/utilities/testData';
import {
  getSelectedOrganizationStorage,
  setSelectedOrganizationStorage,
} from '@app/utilities/storage';
import { DrawerScreens } from '@app/navigation/drawer/types';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { OrderSetting } from '@app/types/enums';
import { useLocationPermission } from '@app/hooks/useLocationPermission';
import { track } from '@app/utilities/geo';
import { Point } from 'geojson';
import UserContext from '@app/context/userContext';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUser from '@app/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { services } from '@app/services/service';

type Props = RootScreenProp<RootScreen.Loading>;

const section1 = [SideMenuItem.Location, SideMenuItem.AutoOrders];
const section2 = [
  SideMenuItem.Orders,
  SideMenuItem.Earnings,
  SideMenuItem.Payout,
  SideMenuItem.Support,
  SideMenuItem.Settings,
  SideMenuItem.Logout,
];

export const SideMenu = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { requestLocationPermission, locationPermission } =
    useLocationPermission();
  const [realTimeLocation, setRealTimeLocation] =
    useState<boolean>(locationPermission);

  const queryClient = useQueryClient();

  const [autoAcceptOrders, setAutoAcceptOrders] = useState<boolean>(
    user?.deliverySetting === OrderSetting.auto_accept,
  );
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    TEST_ORG_ARRAY[0],
  );
  const [status, setStatus] = useState<string | undefined>(user?.status);
  const { watchId, setWatchId } = useContext(UserContext);

  const { updateStatus, updateDeliverySettings, updateUserLocation } =
    useUser();

  const isSwitchOn = (item: SideMenuItem) => {
    switch (item) {
      case SideMenuItem.AutoOrders:
        return autoAcceptOrders;
      case SideMenuItem.Location:
        return realTimeLocation;
    }
    return false;
  };

  const handleSwitchValueChange = (item: SideMenuItem, value: boolean) => {
    switch (item) {
      case SideMenuItem.AutoOrders:
        //setAutoAcceptOrdersStorage(value);

        updateDeliverySettings(value ? 'AUTO_ACCEPT' : 'MANUAL');
        setAutoAcceptOrders(value);
        break;
      case SideMenuItem.Location:
        if (value) {
          !locationPermission && requestLocationPermission();
          console.log('Location Tracking Enabled');
          const newWatchId = track((currentLocation: Point) => {
            updateUserLocation({
              latitude: currentLocation.coordinates[1],
              longitude: currentLocation.coordinates[0],
            });
          });
          setWatchId!(newWatchId);
          setRealTimeLocation(value);
        } else {
          console.log('Location Tracking Disabled');
          watchId && Geolocation.clearWatch(watchId);
          setWatchId!(undefined);
          setRealTimeLocation(value);
        }
        break;
    }
  };

  const organizationSelected = (org: Organization) => {
    // setSelectedOrg(org);
    setSelectedOrganizationStorage(org);
    RNRestart.restart();
  };

  useEffect(() => {
    (async () => {
      const org = await getSelectedOrganizationStorage();
      if (org !== undefined) {
        setSelectedOrg(org);
      }
      //const accept = await getAutoAcceptOrdersStorage();
      //setAutoAcceptOrders(accept);
    })();
  }, []);

  useEffect(() => {
    setStatus(user?.status);
  }, [user]);

  useEffect(() => {
    setRealTimeLocation(locationPermission);
  }, [locationPermission]);

  const onLogoutHandle = async () => {
    await AsyncStorage.multiRemove(['token', 'BASE_URL', 'SOCKET_BASE_URL']);
    services.logout();
    queryClient.resetQueries();
  };

  const handlePress = (item: SideMenuItem) => {
    switch (item) {
      case SideMenuItem.Orders:
        navigation.navigate(DrawerScreens.Home);
        break;
      case SideMenuItem.Earnings:
        navigation.navigate(DrawerScreens.Earnings);
        break;
      case SideMenuItem.Payout:
        navigation.navigate(DrawerScreens.PaymentMethods);
        break;
      case SideMenuItem.Support:
        break;
      case SideMenuItem.Settings:
        navigation.navigate(DrawerScreens.Settings);
        break;
      case SideMenuItem.Logout:
        Alert.alert('Notice', 'Are you sure you want to log out?', [
          { text: 'Yes', onPress: onLogoutHandle },
          { text: 'Cancel', style: 'cancel' },
        ]);

        break;
    }
  };

  const onUserStatusSelect = (newStatus: UserStatus) => {
    if (newStatus === status) {
      return;
    }
    if (status === UserStatus.Offline && newStatus === UserStatus.LastCall) {
      return;
    }
    navigation.navigate(RootScreen.UserStatusModal, {
      status: newStatus,
      onAccept: () => {
        updateStatus(newStatus);
      },
      onCancel: () => undefined,
    });
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <ProfileBadge
            discreteStatusIndicator
            userStatus={status}
            onPress={() => undefined}
          />
          <Text style={styles.textName}>
            {t('translations:hi') + ` ${user!.firstName}!`}
          </Text>
        </View>
        <OrganizationSelect
          style={styles.cell}
          organization={selectedOrg}
          onPress={() =>
            navigation.navigate(RootScreen.SelectOrganizationModal, {
              preselected: selectedOrg,
              onOrganizationSelect: organizationSelected,
            })
          }
          onSearch={() => undefined}
        />
        <UserStatusSelector
          style={styles.cell}
          selected={status}
          onPress={onUserStatusSelect}
        />
        <View style={styles.separator} />
        {section1.map(item => {
          return (
            <SideMenuItemSwitch
              key={item}
              style={styles.cell}
              isOn={isSwitchOn(item)}
              item={item}
              onValueChange={value => handleSwitchValueChange(item, value)}
            />
          );
        })}
        <View style={styles.separator} />
        {section2.map(item => {
          return (
            <SideMenuItemPlain
              hideArrow={item === SideMenuItem.Logout}
              key={item}
              style={styles.cell}
              item={item}
              onPress={handlePress}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};
