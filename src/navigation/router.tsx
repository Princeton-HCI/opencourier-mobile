import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreen, RootStackParamList } from '@app/navigation/types';
import { LoadingScreen } from '@app/screens/Loading/Loading';
import { OnboardingStack } from '@app/navigation/onboarding/OnboardingNavigation';
import { MainStack } from './main/MainNavigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const DEFAULT_OPTIONS = { headerShown: false };

export const Router = () => {
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
      {/* <RootStack.Screen
        name={RootScreen.Organization}
        component={MainStack}
        options={DEFAULT_OPTIONS}
      /> */}
    </RootStack.Navigator>
  );
};
