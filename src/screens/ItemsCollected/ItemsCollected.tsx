import React from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { styles } from './ItemsCollected.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@app/styles/colors';
import { OrderItem, ToastMessage } from '@app/types/types';
import { OrderItemCell } from '@app/components/OrderItemCell/OrderItemCell';
import { useTranslation } from 'react-i18next';
import { Toast } from '@app/components/Toast/Toast';

type Props = MainScreenProp<MainScreens.ItemsCollected>;

export const ItemsCollected = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const customerName: string = route.params.customerName;
  const items: OrderItem[] = route.params.items;

  const renderItem = ({ item }: { item: OrderItem }) => {
    return <OrderItemCell item={item} onPress={() => undefined} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.gradient, { height: top + 100 }]}
        colors={Colors.onlineGradientArray}
      />
      <SafeAreaView style={styles.safe}>
        <Toast
          toast={ToastMessage.item_may_be_bagged}
          style={{ marginVertical: 10 }}
        />
        <View style={styles.navHeader}>
          <Text style={styles.title}>{customerName}</Text>
          <BackNavButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.subtitle}>
          {t('translations:ensure_all_collected')}
        </Text>
        <View style={styles.separator} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={items}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};
