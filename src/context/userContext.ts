import { createContext } from 'react';

interface Props {
  watchId: number | undefined;
  setWatchId: (watchId: number | undefined) => void;
  locationPermission: boolean;
  setLocationPermission: (locationPermission: boolean) => void;
}

const defaultAuthProps: Props = {
  watchId: undefined,
  setWatchId: () => {},
  locationPermission: false,
  setLocationPermission: () => {},
};

const UserContext = createContext<Props>(defaultAuthProps);

export default UserContext;
