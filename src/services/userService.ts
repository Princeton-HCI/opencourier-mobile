import { DeliveryType, User, UserResponse } from '@app/types/types';
import { UClient } from './Client';
import {
  UserParams,
  LoginParams,
  SignupParams,
  SettingsParams,
  UserServiceResponse,
  LoginResponse,
  UserSettings,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserService {
  login: (params: LoginParams) => Promise<LoginResponse>;
  signup: (params: SignupParams) => Promise<LoginResponse>;
  getUser: () => Promise<User>;
  getUserSettings: () => Promise<UserSettings>;
  updateUserSettings: (params: Partial<UserSettings>) => Promise<UserSettings>;
  updateUser: (params: UserParams) => Promise<UserServiceResponse>;
  setUserStatus: (status: string) => Promise<any>;
  setDeliverySettings: (settings: string) => Promise<any>;
  setUserLocation: (params: {
    latitude: number;
    longitude: number;
  }) => Promise<any>;
}

const userService = (client: UClient): UserService => {
  const login = async (params: LoginParams): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>('auth/login', params);
    const token = data.result.session.accessToken;
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    AsyncStorage.setItem('token', token);
    return data;
  };

  const signup = async (params: SignupParams): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>('auth/register', params);
    const token = data.result.session.accessToken;
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    AsyncStorage.setItem('token', token);
    return data;
  };

  const getUser = async (): Promise<User> => {
    const { data } = await client.get<UserResponse>('auth/me');
    const { email, courier, role } = data.result;
    const user = { email, role, ...courier };
    return user;
  };

  const setUserStatus = async (status: string): Promise<any> => {
    return client.patch('courier/status', { status: status.toUpperCase() });
  };

  const setDeliverySettings = async (deliverySetting: string): Promise<any> => {
    return client.patch('courier/delivery-setting', { deliverySetting });
  };

  const getUserSettings = async (): Promise<UserServiceResponse> => {
    const { data } = await client.get('courier-settings');
    return data.result;
  };

  const updateUserSettings = async (
    params: SettingsParams,
  ): Promise<UserServiceResponse> => {
    return client.patch('courier-settings', params);
  };

  const setUserLocation = async (params: {
    latitude: number;
    longitude: number;
  }) => {
    return client.patch('courier/location', params);
  };

  return {
    login,
    signup,
    getUser,
    getUserSettings,
    updateUserSettings,
    setUserLocation,
    setUserStatus,
    setDeliverySettings,
  };
};

export default userService;
