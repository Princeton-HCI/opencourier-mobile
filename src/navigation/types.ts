import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './main/types';

export enum RootScreen {
  Loading = 'Loading',
  Onboarding = 'Onboarding',
  Main = 'Main',
  // Organization = 'Organization',
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  // Organization: undefined;
};

export type RootNavigationProp = NavigationProp<
  RootStackParamList & MainStackParamList
>;

export type RootRouteProp<T extends RootScreen> = RouteProp<
  RootStackParamList,
  T
>;

export type RootScreenProp<T extends RootScreen> = {
  navigation: RootNavigationProp;
  route: RootRouteProp<T>;
};
