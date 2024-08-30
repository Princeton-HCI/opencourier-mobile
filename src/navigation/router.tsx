import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreen, RootStackParamList } from '@app/navigation/types';
import { LoadingScreen } from '@app/screens/Loading/Loading';
import { OnboardingStack } from '@app/navigation/onboarding/OnboardingNavigation';
import { MainStack } from './main/MainNavigation';
import { SelectOrganizationModal } from '@app/screens/SelectOrganizationModal/SelectOrganizationModal';
import { SearchOrganization } from '@app/screens/SearchOrganization/SearchOrganization';
import { StatusPopupScreen } from '@app/screens/StatusPopup/StatusPopupScreen';
import usePushNotifications from '@app/services/notifications';
import { AddNote } from '@app/screens/AddNote/AddNote';
import { DeleteNote } from '@app/screens/DeleteNote/DeleteNote';
import { DatePickerScreen } from '@app/screens/DatePicker/DatePicker';
import { track } from '@app/utilities/geo';
import { Point } from 'geojson';
import Geolocation from 'react-native-geolocation-service';
import { useLocationPermission } from '@app/hooks/useLocationPermission';
import UserContext from '@app/context/userContext';
import useUser from '@app/hooks/useUser';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const DEFAULT_OPTIONS = { headerShown: false };

export const Router = () => {
  const { user, updateUserLocation } = useUser();
  const { setWatchId, watchId } = useContext(UserContext);
  const { locationPermission } = useLocationPermission();

  // usePushNotifications(true);
  // if (user.isLoading) {
  //   return <RootStack.Screen
  //     name={RootScreen.Loading}
  //     component={LoadingScreen}
  //     options={DEFAULT_OPTIONS}
  //   />
  // }

  useEffect(() => {
    if (!user || !locationPermission) {
      console.log('Location Tracking Disabled');
      watchId && Geolocation.clearWatch(watchId);
      setWatchId(undefined);
    } else if (!watchId) {
      console.log('Location Tracking Enabled');
      const newWatchId = track((currentLocation: Point) =>
        updateUserLocation({
          latitude: currentLocation.coordinates[1],
          longitude: currentLocation.coordinates[0],
        }),
      );
      setWatchId(newWatchId);
    }
  }, [locationPermission, user?.id]);

  return (
    <RootStack.Navigator>
      {!user ? (
        <>
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
        </>
      ) : (
        <>
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
          <RootStack.Screen
            name={RootScreen.UserStatusModal}
            component={StatusPopupScreen}
            options={{ headerShown: false, presentation: 'transparentModal' }}
          />
          <RootStack.Screen
            name={RootScreen.AddNoteModal}
            component={AddNote}
            options={{ headerShown: false, presentation: 'transparentModal' }}
          />
          <RootStack.Screen
            name={RootScreen.DeleteNoteModal}
            component={DeleteNote}
            options={{ headerShown: false, presentation: 'transparentModal' }}
          />
          <RootStack.Screen
            name={RootScreen.DatePickerScreen}
            component={DatePickerScreen}
            options={{ headerShown: false, presentation: 'transparentModal' }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
