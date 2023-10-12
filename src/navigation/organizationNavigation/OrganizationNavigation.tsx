import React from 'react';
import { OrganizationScreens } from './types';
import { SelectOrganizationModal } from '@app/screens/SelectOrganizationModal/SelectOrganizationModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchOrganization } from '@app/screens/SearchOrganization/SearchOrganization';

const OrganizationStackNavigator = createNativeStackNavigator();

const DEFAULT_OPTIONS = { headerShown: false };

export const OrganizationStack = ({ route }) => {
  return (
    <OrganizationStackNavigator.Navigator
      initialRouteName={OrganizationScreens.SelectOrganizationModal}>
      <OrganizationStackNavigator.Screen
        name={OrganizationScreens.SelectOrganizationModal}
        component={SelectOrganizationModal}
        options={{ headerShown: false, presentation: 'transparentModal' }}
        initialParams={{
          preselected: route.params.preselected,
          onOrganizationSelect: route.params.onOrganizationSelect,
        }}
      />
      <OrganizationStackNavigator.Screen
        name={OrganizationScreens.SearchOrganization}
        component={SearchOrganization}
        options={DEFAULT_OPTIONS}
      />
    </OrganizationStackNavigator.Navigator>
  );
};
