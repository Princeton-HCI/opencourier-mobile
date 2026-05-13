import React, { useEffect, useMemo, useState } from 'react';
import { View, SafeAreaView, Text, FlatList, Image } from 'react-native';
import { styles } from './Earnings.styles';
import { DrawerScreenProp, DrawerScreens } from '@app/navigation/drawer/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@app/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cashout } from '@app/components/CashOut/Cashout';
import { EarningsTabs } from '@app/components/EarningsTabs/EarningsTabs';
import { EarningsTabItem, Order } from '@app/types/types';
import { WeekSelector } from '@app/components/WeekSelector/WeekSelector';
import { EarningsCell } from '@app/components/EarningsCell/EarningsCell';
import moment, { Moment } from 'moment';
import { CELL_EARNINGS_EMPTY } from '@app/utilities/constants';
import { Images } from '@app/utilities/images';
import { TEST_EARNINGS_ORDERS } from '@app/utilities/testData';
import { Button, ButtonType } from '@app/components/Button/Button';
import { formatMockDate } from '@app/utilities/dates';
import { formatCurrencyFromCents } from '@app/utilities/currency';
import { MainScreens } from '@app/navigation/main/types';
import { useTranslation } from 'react-i18next';

type Props = DrawerScreenProp<DrawerScreens.Earnings>;

type DataSourceType = Order | string;

export const Earnings = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [orderCount, setOrderCount] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<EarningsTabItem>(
    EarningsTabItem.Today,
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>([
    CELL_EARNINGS_EMPTY,
  ]);
  const { top } = useSafeAreaInsets();

  const emptyCell = () => {
    const title = () => {
      switch (selectedTab) {
        case EarningsTabItem.Today:
          return t('translations:no_earnings_today');
        case EarningsTabItem.Weekly:
          return t('translations:no_weekly_earnings');
        case EarningsTabItem.All:
          return t('translations:no_earnings');
      }
    };

    const subtitle = () => {
      switch (selectedTab) {
        case EarningsTabItem.Today:
          return t('translations:no_orders_made_today');
        case EarningsTabItem.Weekly:
          return t('translations:no_orders_made_this_week');
        case EarningsTabItem.All:
          return t('translations:no_orders_made_yet');
      }
    };

    return (
      <View style={styles.containerEmptyCell}>
        <Image source={Images.Car} />
        <Text style={styles.textEmptyCellTitle}>{title()}</Text>
        <Text style={styles.textEmptyCellSubtitle}>{subtitle()}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (selectedTab === EarningsTabItem.Weekly) {
      return (
        <View style={styles.footer}>
          <View style={styles.footerSeparator} />
          <Button
            style={styles.buttonFooter}
            title={t('translations:download_weekly_summary')}
            onPress={() => undefined}
            type={ButtonType.white}
          />
          <Button
            title={t('translations:see_payout_history')}
            onPress={() => navigation.navigate(MainScreens.PayoutActivity)}
            type={ButtonType.white}
          />
        </View>
      );
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: DataSourceType;
    index: number;
  }) => {
    if (typeof item === 'string') {
      return emptyCell();
    }
    if (typeof item === 'object') {
      const order: Order = item;
      return (
        <EarningsCell
          restaurantName={
            selectedTab === EarningsTabItem.Today
              ? item.restaurant.name
              : undefined
          }
          date={moment(order.date, formatMockDate)}
          earned={order.price}
          index={index}
        />
      );
    }
  };

  useEffect(() => {
    if (selectedTab === EarningsTabItem.Today) {
      const filtered = TEST_EARNINGS_ORDERS.filter(order => {
        const moment1 = moment(order.date, formatMockDate);
        const moment2 = moment();
        return moment1.isSame(moment2, 'day');
      });
      setDataSource(filtered.length > 0 ? filtered : [CELL_EARNINGS_EMPTY]);
      const total: number = filtered.reduce(
        (sum, current) => sum + current.price,
        0,
      );
      setTotalEarnings(total);
      setOrderCount(filtered.length);
    }

    if (selectedTab === EarningsTabItem.All) {
      setDataSource(TEST_EARNINGS_ORDERS);
      const total: number = TEST_EARNINGS_ORDERS.reduce(
        (sum, current) => sum + current.price,
        0,
      );
      setTotalEarnings(total);
      setOrderCount(TEST_EARNINGS_ORDERS.length);
    }

    if (selectedTab === EarningsTabItem.Weekly) {
      const filtered = TEST_EARNINGS_ORDERS.filter(order => {
        const moment1 = moment(order.date, formatMockDate);
        const moment2 = moment();
        return moment1.isSame(moment2, 'week');
      });
      setDataSource(filtered.length > 0 ? filtered : [CELL_EARNINGS_EMPTY]);
      const total: number = filtered.reduce(
        (sum, current) => sum + current.price,
        0,
      );
      setTotalEarnings(total);
      setOrderCount(filtered.length);
    }
  }, [selectedTab]);

  const headerTitle = useMemo(() => {
    switch (selectedTab) {
      case EarningsTabItem.Today:
        return orderCount > 0
          ? `${orderCount} ${t('translation:orders')}`
          : t('translations:no_orders_today');
      case EarningsTabItem.Weekly:
        return orderCount > 0
          ? `${orderCount} ${t('translation:orders')}`
          : t('translations:no_orders_this_week');
      case EarningsTabItem.All:
        return orderCount > 0
          ? `${orderCount} ${t('translation:orders')}`
          : t('translations:no_orders');
    }
  }, [selectedTab, orderCount]);

  const handleWeekChange = (start: Moment, end: Moment) => {
    const filtered = TEST_EARNINGS_ORDERS.filter(order => {
      const moment1 = moment(order.date, formatMockDate);
      return moment1.isSame(start, 'week');
    });
    setDataSource(filtered.length > 0 ? filtered : [CELL_EARNINGS_EMPTY]);
    const total: number = filtered.reduce(
      (sum, current) => sum + current.price,
      0,
    );
    setTotalEarnings(total);
    setOrderCount(filtered.length);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.gradient, { height: top + 100 }]}
        colors={Colors.offlineGradientArray}
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.toggleDrawer()} />
          <Text style={styles.title}>{t('translations:earnings')}</Text>
        </View>
        <View style={styles.containerEarnings}>
          <View style={styles.earningsText}>
            <Text style={styles.textEarned}>
              {formatCurrencyFromCents(totalEarnings, 'USD')}
            </Text>
            <Text style={styles.textCount}>{headerTitle}</Text>
          </View>
          <Cashout onPress={() => undefined} />
        </View>
        <EarningsTabs
          style={styles.topMargin}
          selectedTab={selectedTab}
          onTabSelected={setSelectedTab}
        />
        <WeekSelector
          onWeekRangeChange={(start, end) => handleWeekChange(start, end)}
          type={selectedTab}
          earned={totalEarnings}
          style={styles.veticalMargin}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataSource}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </View>
  );
};
