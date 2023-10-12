import React from 'react';
import { MainScreens } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerStack } from '../drawer/DrawerNavigation';
import { OrganizationStack } from '../organizationNavigation/OrganizationNavigation';

const MainStackNavigator = createNativeStackNavigator();

const DEFAULT_OPTIONS = { headerShown: false };

export const MainStack = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName={MainScreens.Drawer}>
      <MainStackNavigator.Screen
        name={MainScreens.Drawer}
        component={DrawerStack}
        options={DEFAULT_OPTIONS}
      />
      <MainStackNavigator.Screen
        name={MainScreens.OrganizationFlow}
        component={OrganizationStack}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      {/* <MainStackNavigator.Screen
        name={MainScreens.SelectOrganizationModal}
        component={SelectOrganizationModal}
        options={{ presentation: 'transparentModal', headerShown: false }}
      />
      <MainStackNavigator.Screen
        name={MainScreens.SearchOrganization}
        component={SearchOrganization}
        options={DEFAULT_OPTIONS}
      /> */}
    </MainStackNavigator.Navigator>
  );
};
