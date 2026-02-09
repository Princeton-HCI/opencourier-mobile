import React, { useState } from 'react';
import { Router } from '@app/navigation/router';
import { NavigationContainer } from '@react-navigation/native';
import UserContext from '@app/context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SocketProvider from '@app/services/socket';

if (__DEV__) {
  require('./ReactotronConfig');
}

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [watchId, setWatchId] = useState<number | undefined>(undefined);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);

  return (
    <UserContext.Provider
      value={{
        watchId,
        setWatchId,
        locationPermission,
        setLocationPermission,
        userLatitude,
        setUserLatitude,
        userLongitude,
        setUserLongitude,
      }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Router />
          <SocketProvider />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
