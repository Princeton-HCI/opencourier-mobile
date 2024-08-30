import { OrderSetting } from '@app/types/enums';
import { Order, Pagination, Setting, UserStatus } from '@app/types/types';
import { Point } from 'geojson';

export type LoginParams = {
  email: string;
  password: string;
  rememberLogin?: boolean;
};

export type SignupParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserParams = {
  id: string;
  data?:
    | { orderSetting: OrderSetting }
    | { status: UserStatus }
    | { currentLocation: Point | null };
};

export type SettingsParams = {
  id: string;
  settings?: Setting;
};

export type AccessToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type LoginResponse = {
  error: boolean;
  result: {
    email: string;
    role: string[];
    id: string;
    session: AccessToken;
  };
};

export type UserSettings = {
  vehicleType: string;
  preferredAreas: string[];
  shiftAvailability: string[][];
  deliveryPreferences: string[];
  foodPreferences: string[];
  earningGoals: any; // TODO: check this
  deliverySpeed: string;
  restaurantTypes: string[];
  cuisineTypes: string[];
  preferredRestaurantPartners: string[];
  dietaryRestrictions: string[];
  payRate: any; // TODO: check this
  courierId: string;
};

export type UserSettingsResponse = {
  error: boolean;
  result: UserSettings;
};

export type UserServiceResponse = {
  data: any;
  error: boolean;
};

export type MarkAsDeliveredParams = {
  order: Order;
  photos: string[];
  tags: string[];
};

export type NewCommentParams = {
  note: string;
  deliveryId: string;
  locationId: string;
};

export type OrderServiceReponse = {
  data: any;
  error: any;
};

export type GetOrdersParams = {
  status: 'in_progress' | 'completed' | 'new';
  page: number;
  perPage: number;
};

export type GetOrdersReponse = {
  deliveries: Order[];
  pagination: Pagination;
};

export type GeoParams = {
  point: Point[];
  mode?: 'drive' | 'motorcycle' | 'bicycle' | 'walk' | 'scooter';
};

export type GeoServiceResponse = {
  data: any;
  error: any;
};
