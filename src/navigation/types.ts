import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './main/types';
import { Organization } from '@app/types/types';

export enum RootScreen {
  Loading = 'Loading',
  Onboarding = 'Onboarding',
  Main = 'Main',
  OrganizationFlow = 'OrganizationFlow',
  SelectOrganizationModal = 'SelectOrganizationModal',
  SearchOrganization = 'SearchOrganization',
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  OrganizationFlow: undefined;
  SelectOrganizationModal: {
    preselected: Organization;
    onOrganizationSelect: (org: Organization) => void;
  };
  SearchOrganization: {
    onOrganizationSelect: (org: Organization) => void;
  };
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
