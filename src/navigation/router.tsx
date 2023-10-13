import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreen, RootStackParamList } from '@app/navigation/types';
import { LoadingScreen } from '@app/screens/Loading/Loading';
import { OnboardingStack } from '@app/navigation/onboarding/OnboardingNavigation';
import { MainStack } from './main/MainNavigation';
import { OrganizationStack } from './organizationNavigation/OrganizationNavigation';
import { SelectOrganizationModal } from '@app/screens/SelectOrganizationModal/SelectOrganizationModal';
import { SearchOrganization } from '@app/screens/SearchOrganization/SearchOrganization';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const DEFAULT_OPTIONS = { headerShown: false };

export const Router = ({ route }) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={RootScreen.Loading}
        component={LoadingScreen}
        options={DEFAULT_OPTIONS}
      />
      <RootStack.Screen
        name={RootScreen.Onboarding}
        component={OnboardingStack}
        options={DEFAULT_OPTIONS}
      />
      <RootStack.Screen
        name={RootScreen.Main}
        component={MainStack}
        options={DEFAULT_OPTIONS}
      />
      <RootStack.Screen
        name={RootScreen.SelectOrganizationModal}
        component={SelectOrganizationModal}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <RootStack.Screen
        name={RootScreen.SearchOrganization}
        component={SearchOrganization}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
    </RootStack.Navigator>
  );
};
