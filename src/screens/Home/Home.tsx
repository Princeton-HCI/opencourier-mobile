import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Linking, RefreshControl, View } from 'react-native';
import { styles } from './Home.styles';
import { HomeHeader } from '@app/components/HomeHeader/HomeHeader';
import {
  Comment,
  CourierTip,
  HomeEmptyState,
  HomeTabItem,
  MapDestination,
  MapLinkingOptions,
  Order,
  UserStatus,
} from '@app/types/types';
import { HomeEmptyStateComponent } from '@app/components/HomeEmptyState/HomeEmptyState';
import { DrawerScreenProp, DrawerScreens } from '@app/navigation/drawer/types';
import { HistoryCell } from '@app/components/HistoryCell/HistoryCell';
import { NewOrderCell } from '@app/components/NewOrderCell/NewOrderCell';
import { InProgressCell } from '@app/components/InProgressCell/InProgressCell';
import ActionSheet from 'react-native-action-sheet';
import { MainScreens } from '@app/navigation/main/types';
import Clipboard from '@react-native-clipboard/clipboard';
import { useHomeOrders } from '@app/hooks/useHomeOrders';
import { useTranslation } from 'react-i18next';
import { ReportAnIncident } from '@app/components/ReportAnIncident/ReportAnIncident';
import { OrderSetting, OrderStatus } from '@app/types/enums';
import ButtonSwipe from '@app/components/ButtonSwipe/ButtonSwipe';
import { SkeletonOrderHistoryCell } from '@app/components/SkeletonOrderHistoryCell/SkeletonOrderHistoryCell';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUser from '@app/hooks/useUser';
import { useFocusEffect } from '@react-navigation/native';

type Props = DrawerScreenProp<DrawerScreens.Home>;

export const HomeScreen = ({ navigation }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const [reportIncidentDismissed, setReportIncidentDismissed] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const { user, isLoading, updateStatus } = useUser();
  const [availableMapApps, setAvailableMapApps] = useState<string[]>([
    t('translations:cancel'),
  ]);
  const [selectedTab, setSelectedTab] = useState<HomeTabItem>(HomeTabItem.New);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [dataSource, setDataSource] = useState<Order[]>([]);
  const autoAcceptOrders = user!.deliverySetting === OrderSetting.auto_accept;

  const [showMapActionSheet, setShowMapActionSheet] = useState<
    { order: Order; destination: MapDestination } | undefined
  >(undefined);
  const [orderDeliveredNotif, setOrderDeliveredNotif] =
    useState<boolean>(false);
  const {
    dataSourceNew,
    dataSourceHistory,
    dataSourceInProgress,
    offerExpirationTimers,
    refetchNew,
    refetchInProgress,
    refechHistory,
    declineOrderFn,
    acceptOrderFn,
    //TEMP upvote/downvote fix
    isLoading: isLoadingOrders,
  } = useHomeOrders();

  useFocusEffect(() => {
    refetchInProgress();
    refechHistory();
  });

  const onProfilePress = () => {
    navigation.toggleDrawer();
  };

  const emptyState = useMemo(() => {
    switch (selectedTab) {
      case HomeTabItem.New:
        return user!.status === UserStatus.Online
          ? HomeEmptyState.WaitingNewOrders
          : HomeEmptyState.New;
      case HomeTabItem.InProgress:
        return HomeEmptyState.InProgress;
      case HomeTabItem.History:
        return HomeEmptyState.History;
    }
  }, [selectedTab, user!.status]);

  const showEmptyState = useMemo(() => {
    switch (selectedTab) {
      case HomeTabItem.New:
        return dataSourceNew.length === 0;
      case HomeTabItem.InProgress:
        return dataSourceInProgress.length === 0;
      case HomeTabItem.History:
        return dataSourceHistory.length === 0;
    }
  }, [selectedTab, dataSourceHistory, dataSourceNew, dataSourceInProgress]);

  const onGoOnline = (didSwipe: boolean) => {
    if (!didSwipe) {
      return;
    }

    updateStatus(UserStatus.Online);
  };

  const renderItem = ({ item }: { item: Order }) => {
    switch (selectedTab) {
      case HomeTabItem.New:
        return (
          <NewOrderCell
            millisRemaining={
              offerExpirationTimers.get(item.id)?.getTimeLeftMilli() ?? 0
            }
            autoAcceptOrders={autoAcceptOrders}
            order={item}
            onAccept={order => acceptOrderFn(order.id)}
            onDecline={order => declineOrderFn(order.id)}
            onCopyCustomer={order =>
              Clipboard.setString(order.dropoffLocation.formattedAddress)
            }
            onCopyRestaurant={order =>
              Clipboard.setString(order.pickupLocation.formattedAddress)
            }
          />
        );
      case HomeTabItem.InProgress:
        //TODO: TEMP FIX
        // if (item.dropoff.location === undefined) {
        //   return <View />;
        // }
        return (
          <InProgressCell
            onMessageCustomer={order =>
              Clipboard.setString(order.dropoffLocation.formattedAddress)
            }
            onMessageRestaurant={order =>
              Clipboard.setString(order.pickupLocation.formattedAddress)
            }
            onCallCustomer={() =>
              Linking.openURL(`tel://${item.dropoffPhoneNumber}`)
            }
            onCallRestaurant={() =>
              Linking.openURL(`tel://${item.pickupPhoneNumber}`)
            }
            order={item}
            onRestaurantAddressPress={order =>
              setShowMapActionSheet({
                order: order,
                destination: MapDestination.restaurant,
              })
            }
            onCustomerAddressPress={order =>
              setShowMapActionSheet({
                order: order,
                destination: MapDestination.customer,
              })
            }
            onOrderItemsListForCustomer={() => {
              navigation.navigate(MainScreens.ItemsCollected, {
                customerName: item.dropoffName,
                items: item.orderItems,
              });
            }}
            onReportIssue={order =>
              navigation.navigate(MainScreens.ReportIssue, { order: order })
            }
          />
        );
      case HomeTabItem.History:
        return <HistoryCell order={item} onPress={() => undefined} />;
    }
  };

  const onSelect = (buttonIndex: number) => {
    const { order, destination } = showMapActionSheet ?? {
      order: undefined,
      destination: undefined,
    };
    if (
      order !== undefined &&
      order.pickupLocation !== undefined &&
      order.dropoffLocation !== undefined &&
      destination !== undefined
    ) {
      const labelCustomer =
        order.dropoffName ?? t('translations:dropoff_address');
      const labelRestauran =
        order.pickupName ?? t('translations:pickup_address');
      const label =
        destination === MapDestination.customer
          ? labelCustomer
          : labelRestauran;

      const latLngCustomer = `${order.dropoffLocation.latitude}, ${order.dropoffLocation.longitude}.`;
      const latLngRestaurant = `${order.pickupLocation.latitude}, ${order.pickupLocation.longitude}.`;
      const latLng = MapDestination.customer
        ? latLngCustomer
        : latLngRestaurant;

      if (
        availableMapApps[buttonIndex] ===
        t(`translations:${MapLinkingOptions.apple}`)
      ) {
        const scheme = 'maps://0,0?q=';
        const url = `${scheme}${label}@${latLng}`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      }
      if (
        availableMapApps[buttonIndex] ===
        t(`translations:${MapLinkingOptions.google}`)
      ) {
        const scheme = 'geo:0,0?q=';
        const url = `${scheme}${latLng}(${label})`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      }
      // TODO: Change to addresses
      if (
        availableMapApps[buttonIndex] ===
        t(`translations:${MapLinkingOptions.waze}`)
      ) {
        const url = `https://www.waze.com/ul?ll=${latLng}&navigate=yes&zoom=17`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      }
    }
    setShowMapActionSheet(undefined);
  };

  const showActionSheeet = (_order: Order) => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: availableMapApps,
        cancelButtonIndex: Math.max(0, availableMapApps.length - 1),
        tintColor: 'blue',
        cancelButtonTintColor: 'red',
      },
      onSelect,
    );
  };

  const onRefresh = () => {
    switch (selectedTab) {
      case HomeTabItem.New:
        user?.status == UserStatus.Online && refetchNew();
        break;
      case HomeTabItem.InProgress:
        refetchInProgress();
        break;
      case HomeTabItem.History:
        refechHistory();
        break;
    }
  };

  const checkInstalledMapApps = async () => {
    const waze: boolean = await Linking.canOpenURL('waze://');
    const google: boolean = await Linking.canOpenURL('comgooglemaps://');
    const apple: boolean = await Linking.canOpenURL('maps://');
    const maps = [];
    if (apple) {
      maps.push(t(`translations:${MapLinkingOptions.apple}`));
    }
    if (google) {
      maps.push(t(`translations:${MapLinkingOptions.google}`));
    }
    if (waze) {
      maps.push(t(`translations:${MapLinkingOptions.waze}`));
    }
    maps.push(t('translations:cancel'));
    setAvailableMapApps(maps);
  };

  useEffect(() => {
    switch (selectedTab) {
      case HomeTabItem.New:
        setDataSource(dataSourceNew);
        break;
      case HomeTabItem.InProgress:
        setDataSource(dataSourceInProgress);
        break;
      case HomeTabItem.History:
        setDataSource(dataSourceHistory);
        break;
    }
  }, [selectedTab, dataSourceHistory, dataSourceNew, dataSourceInProgress]);

  useEffect(() => {
    (async () => {
      // const accept = await getAutoAcceptOrdersStorage();
      // setAutoAcceptOrders(accept);
      checkInstalledMapApps();
    })();
  }, []);

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <HistorySkeleton />;
    } else {
      return <HomeEmptyStateComponent state={emptyState} />;
    }
  }, [HistorySkeleton, emptyState, isLoading]);

  const HistorySkeleton = useCallback(() => {
    if (
      selectedTab === HomeTabItem.History &&
      dataSource.length === 0 &&
      !isLoadingOrders
    ) {
      return (
        <>
          <SkeletonOrderHistoryCell />
          <SkeletonOrderHistoryCell />
          <SkeletonOrderHistoryCell />
        </>
      );
    } else {
      return null;
    }
  }, [dataSource.length, isLoadingOrders, selectedTab]);

  return (
    <View style={styles.container}>
      <HomeHeader
        orderDeliveredNotification={orderDeliveredNotif}
        onCloseOrderDeliveredNotification={() =>
          setOrderDeliveredNotif(!orderDeliveredNotif)
        }
        userStatus={user!.status}
        selectedTab={selectedTab}
        onProfile={onProfilePress}
        onSearch={setIsSearching}
        onTabSelected={setSelectedTab}
        newCount={dataSourceNew.length}
        inProgressCount={dataSourceInProgress.length}
        searchShown={isSearching}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        loadingNewOrders={selectedTab === HomeTabItem.New && isLoadingOrders}
      />
      {selectedTab === HomeTabItem.History && !reportIncidentDismissed && (
        <ReportAnIncident onDismiss={() => setReportIncidentDismissed(true)} />
      )}

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={dataSource}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={isLoadingOrders} onRefresh={onRefresh} />
        }
      />

      {user?.status !== UserStatus.Online && (
        <ButtonSwipe
          style={{ position: 'absolute', bottom: bottom + 16 }}
          isSwiped={false}
          onSwiped={onGoOnline}
          enabled={true}
          title={t('translations:go_online')}
          subtitle={t('translations:slide_to_start')}
          isLoading={isLoading ?? false}
        />
      )}

      <>
        {showMapActionSheet !== undefined &&
          showActionSheeet(showMapActionSheet.order)}
      </>
    </View>
  );
};
