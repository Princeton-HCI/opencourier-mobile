import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './main/types';
import {
  Note,
  CourierTip,
  Order,
  Organization,
  UserStatus,
} from '@app/types/types';

export enum RootScreen {
  Loading = 'Loading',
  Onboarding = 'Onboarding',
  Main = 'Main',
  SelectOrganizationModal = 'SelectOrganizationModal',
  SearchOrganization = 'SearchOrganization',
  UserStatusModal = 'UserStatusModal',
  AddNoteModal = 'AddNoteModal',
  DeleteNoteModal = 'DeleteNoteModal',
  DatePickerScreen = 'DatePickerScreen',
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  SelectOrganizationModal: {
    preselected: Organization;
    onOrganizationSelect: (org: Organization) => void;
  };
  SearchOrganization: {
    onOrganizationSelect: (org: Organization) => void;
  };
  UserStatusModal: {
    status: UserStatus;
    onAccept: (status: UserStatus) => void;
    onCancel: () => void;
  };
  AddNoteModal: {
    type?: 'merchant' | 'location';
    order?: Order;
    noteToEdit?: Note;
    onNoteAdded?: (
      text: string,
      type: 'merchant' | 'location',
      order: Order,
    ) => void;
    onNoteEdited?: (editedText: string, note: Note) => void;
  };
  DeleteNoteModal: {
    note: Note;
    onNoteDeleted: (note: Note) => void;
  };
  DatePickerScreen: {
    startOrEndShift: 'start' | 'end';
    day:
      | 'Monday'
      | 'Tuesday'
      | 'Wednesday'
      | 'Thursday'
      | 'Friday'
      | 'Saturday'
      | 'Sunday';
    onSelect: (
      date: Date,
      shift: 'start' | 'end',
      day:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday',
    ) => void;
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
