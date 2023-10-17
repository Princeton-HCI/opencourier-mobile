import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './Home.styles';
import { HomeHeader } from '@app/components/HomeHeader/HomeHeader';
import {
  HomeEmptyState,
  HomeTabItem,
  Order,
  UserStatus,
} from '@app/types/types';
import { HomeEmptyStateComponent } from '@app/components/HomeEmptyState/HomeEmptyState';
import { DrawerScreenProp, DrawerScreens } from '@app/navigation/drawer/types';
import { TEST_NEW_ORDERS, TEST_ORDERS_HISTORY } from '@app/utilities/testData';
import { HistoryCell } from '@app/components/HistoryCell/HistoryCell';
import { NewOrderCell } from '@app/components/NewOrderCell/NewOrderCell';
import { getAutoAcceptOrdersStorage } from '@app/utilities/storage';
import { InProgressCell } from '@app/components/InProgressCell/InProgressCell';

type Props = DrawerScreenProp<DrawerScreens.Home>;

export const HomeScreen = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<HomeTabItem>(HomeTabItem.New);
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.Offline);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [dataSourceHistory, setDataSourceHistory] =
    useState<Order[]>(TEST_ORDERS_HISTORY);
  const [dataSourceNew, setDataSourceNew] = useState<Order[]>(TEST_NEW_ORDERS);
  const [dataSourceInProgress, setDataSourceInProgress] =
    useState<Order[]>(TEST_NEW_ORDERS);

  const [dataSource, setDataSource] = useState<Order[]>([]);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState<boolean>(false);

  const onProfilePress = () => {
    navigation.toggleDrawer();
  };

  const emptyState = useMemo(() => {
    switch (selectedTab) {
      case HomeTabItem.New:
        return userStatus === UserStatus.Online
          ? HomeEmptyState.WaitingNewOrders
          : HomeEmptyState.New;
      case HomeTabItem.InProgress:
        return HomeEmptyState.InProgress;
      case HomeTabItem.History:
        return HomeEmptyState.History;
    }
  }, [selectedTab, userStatus]);

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

  const renderItem = ({ item }: { item: Order }) => {
    switch (selectedTab) {
      case HomeTabItem.New:
        return (
          <NewOrderCell
            autoAcceptOrders={autoAcceptOrders}
            order={item}
            onAccept={() => console.warn('ACCEPTED')}
            onDecline={() => console.warn('DECLINED')}
          />
        );
      case HomeTabItem.InProgress:
        return (
          <InProgressCell
            onChatCustomer={() => undefined}
            onChatRestaurant={() => undefined}
            onConfirmItems={() => undefined}
            onContactCustomer={() => undefined}
            onContactRestaurant={() => undefined}
            onMarkAsDelivered={() => undefined}
            order={item}
          />
        );
      case HomeTabItem.History:
        setDataSource(dataSourceHistory);
        return <HistoryCell order={item} onPress={() => undefined} />;
    }
  };

  useEffect(() => {
    (async () => {
      const accept = await getAutoAcceptOrdersStorage();
      setAutoAcceptOrders(accept);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader
        userStatus={userStatus}
        selectedTab={selectedTab}
        onProfile={onProfilePress}
        onSearch={setIsSearching}
        onTabSelected={setSelectedTab}
        newCount={2}
        inProgressCount={1}
        searchShown={isSearching}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />
      {showEmptyState && <HomeEmptyStateComponent state={emptyState} />}
      {!showEmptyState && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataSource}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
