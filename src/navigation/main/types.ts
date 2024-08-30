import { Order, Photo, OrderItem } from '@app/types/types';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export enum MainScreens {
  Drawer = 'Drawer',
  ItemsCollected = 'ItemsCollected',
  MarkAsDelivered = 'MarkAsDelivered',
  PhotoAttachment = 'PhotoAttachment',
  PayoutActivity = 'PayoutActivity',
  Licences = 'Licences',
  LanguageScreen = 'LanguageScreen',
  ThemeScreen = 'ThemeScreen',
  OperatingArea = 'operatingArea',
  Accessibility = 'Accessibility',
  DefaultSound = 'DefaultSound',
  MyLanguages = 'MyLanguages',
  VolumeScreen = 'VolumeScreen',
  EmergencyContact = 'EmergencyContact',
  NavigationScreen = 'NavigationScreen',
  VehicleTypeScreen = 'VehicleTypeScreen',
  RestaurantTypeScreen = 'RestaurantTypeScreen',
  CuisineTypeScreen = 'CuisineTypeScreen',
  EarningsMethodScreen = 'EarningsMethodScreen',
  WeightOrderScreen = 'WeightOrderScreen',
  OrderPreferenceScreen = 'OrderPreferenceScreen',
  ShiftAvailabilityScreen = 'ShiftAvailabilityScreen',
  ReportIssue = 'ReportIssue',
}

export type MainStackParamList = {
  Drawer: undefined;
  ItemsCollected: {
    customerName: string;
    items: OrderItem[];
  };
  MarkAsDelivered: {
    order: Order;
  };
  PhotoAttachment: {
    onAttach: (photo: Photo) => void;
  };
  PayoutActivity: undefined;
  Licences: undefined;
  LanguageScreen: undefined;
  ThemeScreen: undefined;
  OperatingArea: undefined;
  Accessibility: undefined;
  DefaultSound: undefined;
  MyLanguages: undefined;
  VolumeScreen: undefined;
  EmergencyContact: undefined;
  NavigationScreen: undefined;
  VehicleTypeScreen: undefined;
  RestaurantTypeScreen: undefined;
  CuisineTypeScreen: undefined;
  EarningsMethodScreen: undefined;
  WeightOrderScreen: undefined;
  OrderPreferenceScreen: undefined;
  ShiftAvailabilityScreen: undefined;
  ReportIssue: {
    order: Order;
  };
};

export type MainNavigationProp = NavigationProp<MainStackParamList>;
export type MainRouteProp<T extends MainScreens> = RouteProp<
  MainStackParamList,
  T
>;
export type MainScreenProp<T extends MainScreens> = {
  navigation: MainNavigationProp;
  route: MainRouteProp<T>;
};
