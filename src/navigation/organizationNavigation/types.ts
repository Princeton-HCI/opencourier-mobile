import { Organization } from '@app/types/types';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export enum OrganizationScreens {
  SelectOrganizationModal = 'SelectOrganizationModal',
  SearchOrganization = 'SearchOrganization',
}

export type OrganizationStackParamList = {
  SelectOrganizationModal: {
    preselected: Organization;
    onOrganizationSelect: (org: Organization) => void;
  };
  SearchOrganization: {
    onOrganizationSelect: (org: Organization) => void;
  };
};

export type OrganizationNavigationProp =
  NavigationProp<OrganizationStackParamList>;
export type OrganizationRouteProp<T extends OrganizationScreens> = RouteProp<
  OrganizationStackParamList,
  T
>;
export type OrganizationScreenProp<T extends OrganizationScreens> = {
  navigation: OrganizationNavigationProp;
  route: OrganizationRouteProp<T>;
};
