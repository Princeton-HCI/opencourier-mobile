import { Organization } from '@app/types/types';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export enum MainScreens {
  Drawer = 'Drawer',
  OrganizationFlow = 'OrganizationFlow',
  // SelectOrganizationModal = 'SelectOrganizationModal',
  // SearchOrganization = 'SearchOrganization',
}

export type MainStackParamList = {
  Drawer: undefined;
  OrganizationFlow: undefined;
  // SelectOrganizationModal: {
  //   preselected: Organization;
  //   onOrganizationSelect: (org: Organization) => void;
  // };
  // SearchOrganization: undefined;
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
