import { Point, Polygon } from 'geojson';
import moment, { Moment } from 'moment';
import {
  CuisineTypes,
  DeliverySpeed,
  DietaryRestrictions,
  FoodPreferences,
  OrderPreferences,
  OrderSetting,
  RestaurantTypes,
  VehicleType,
} from './enums';
import { Settings } from 'react-native';

export enum UserStatus {
  Online = 'ONLINE',
  Offline = 'OFFLINE',
  LastCall = 'LAST_CALL',
}

export enum HomeTabItem {
  New = 'new',
  InProgress = 'in_progress',
  History = 'history',
}

export enum InstanceTabItem {
  Description = 'description',
  Rules = 'rules',
}

export enum HomeEmptyState {
  New = 'New',
  InProgress = 'In Progress',
  History = 'History',
  WaitingNewOrders = 'waitingNewOrders',
}

export enum SideMenuItem {
  Location = 'real_time_location',
  AutoOrders = 'auto_accept_orders',
  Orders = 'orders',
  Earnings = 'earnings',
  Payout = 'payout_method',
  Support = 'support',
  Settings = 'settings',
  Logout = 'log_out',
}

export enum OrderStatus {
  created = 'created',
  dispatched = 'dispatched',
  picked_up = 'picked_up',
  dropped_off = 'dropped_off',
  canceled = 'canceled',
}

export enum DeliveryType {
  LeaveAtDoor = 'leave_at_door',
  MeetOutside = 'meet_outside',
  MeetInside = 'meet_inside',
  MeetAtDoor = 'meet_at_door',
  CallOnArrival = 'call_on_arrival',
}

export enum PickupType {
  LineupThirdPartyPickup = 'line_up_pickup',
  ParkThirdPartyLot = 'park_in_lot',
  DontOpenBags = `dont_open_bags`,
  CallOnArrival = 'call_on_arrival',
}

export enum MapLinkingOptions {
  apple = 'apple_maps',
  google = 'google_maps',
  waze = 'waze',
}

export enum CustomerNotes {
  PreventLeaks = 'prevent_leaks',
  BellnotRung = 'bell_not_rung',
  HandleWithCare = 'handle_with_care',
  DontBlockDoor = `dont_block_door`,
}

export enum EarningsTabItem {
  Today = 'today',
  Weekly = 'weekly',
  All = 'all',
}

export enum PaymentTabItem {
  Bank = 'bank',
  DirectDebit = 'direct_debit',
}

export type Organization = {
  name: string;
  id: string;
  imageUrl: string;
  iconUrl?: string;
};

export type Courier = {
  id: string;
  node_uri: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  status: UserStatus;
  deliverySetting: string;
  userId: string;
  createdAt: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
};

export type UserResponse = {
  error: boolean;
  result: {
    id: string;
    email: string;
    role: string[];
    courier: Courier;
  };
};

export type User = {
  email: string;
  role: string[];
} & Courier;

export type Setting = {
  deliveryPolygon?: Polygon | null;
  vehicleType?: VehicleType | null;
  preferredAreas?: string[] | null;
  shiftAvailability?: ShiftAvailability | null;
  orderPreferences?: OrderPreferences[] | null;
  foodPreferences?: FoodPreferences[] | null;
  earningGoals?: EarningGoals | null;
  deliverySpeed?: DeliverySpeed | null;
  restaurantTypes?: RestaurantTypes[] | null;
  cuisineTypes?: CuisineTypes[] | null;
  preferredRestaurantPartners?: string[] | null;
  dietaryRestrictions?: DietaryRestrictions[] | null;
  payRate?: PayRate | null;
};

export type Restaurant = {
  name: string;
  address: string;
  location?: { lat: number; lon: number };
};

export type Comment = {
  id: string;
  text: string;
  likes: number;
  likers: string[];
  commentableType: 'merchant' | 'location';
  commentableId: string;
  commentor: string;
};

export type Verification = {
  signature: boolean;
  signatureRequirement: {
    enabled: boolean;
    collectSignerName: boolean;
    collectSignerRelationship: boolean;
  };
  barcodes: {
    value: string;
    type: string;
  }[];
  identification: {
    minAge: number;
    noSobrietyCheck: boolean;
  };
  picture: boolean;
};

export type Note = {
  id: string;
  note: string;
  courierId: string;
  actor: string;
  locationId: string;
  deliveryId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  currentCourierReaction: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  size: string;
  dimensions: {
    length: string;
    height: string;
    depth: string;
  };
  price: number;
  weight: number;
  vatPercentage: number;
};

export type Order = {
  id: string;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupBusinessName: string;
  pickupNotes: string;
  pickupVerification: Verification;
  pickupLocationId: string;
  pickupReadyAt: string;
  pickupDeadlineAt: string;
  dropoffName: string;
  dropoffPhoneNumber: string;
  dropoffBusinessName: string;
  dropoffNotes: string;
  dropoffSellerNotes: string;
  dropoffVerification: Verification;
  dropoffReadyAt: string;
  dropoffEta: string;
  dropoffDeadlineAt: string;
  deliverableAction: string;
  undeliverableAction: string;
  undeliverableReason?: string;
  dropoffLocationId: string;
  deliveryTypes: string[];
  requiresDropoffSignature: string;
  requiresId: boolean;
  orderReference: string;
  orderTotalValue: number;
  orderItems: OrderItem[];
  status: string;
  customerNotes: string[];
  currencyCode: string;
  totalCost: number;
  fee: number;
  pay?: any;
  tips?: number;
  totalCompensation: number;
  pickupTypes: string[];
  imageType?: any;
  imageName?: any;
  imageDate?: any;
  idempotencyKey: string;
  externalStoreId: string;
  returnVerification: Verification;
  externalUserInfo?: any;
  externalId: string;
  courierId: string;
  partnerId: string;
  deliveryQuoteId: string;
  createdAt: string;
  pickupLocationNotes: Note[];
  dropOffLocationNotes: Note[];
  pickupLocation: Location;
  dropoffLocation: Location;
};

export type PickupruInstruction = {
  type: string;
  count?: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type CoordinatesRange = {
  latitude_range: number[];
  longitude_range: number[];
};

export type Location = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  street?: string;
  houseNumber?: string;
  state?: string;
  city?: string;
  postCode?: string;
  stateCode?: string;
  countryCode?: string;
  longitude: number;
  latitude: number;
  formattedAddress: string;
};

export type CourierTip = {
  courier_id: string;
  tip_text: string;
  upvotes: number;
};

// export type Dimensions = {
//   length: number;
//   width: number;
//   height: number;
//   unit: string;
// };

export type Income = {
  currencyCode: string;
  totalCharge: number;
  fees: number;
  totalCompensation: number;
  pay: number;
  tips: number;
};

export type Pagination = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prevPage: number;
  nextPage: number;
};

export type ConfirmItemsCheck = {
  orderId: string;
  confirmedItems: boolean;
};

export enum MapDestination {
  customer,
  restaurant,
}

export type Instance = {
  name: string;
  imageUrl: string;
  link: string;
  ws_link: string;
  userCount: number;
  description: string;
  rules: string;
};

export enum SettingsOptions {
  accountInformation = 'account_information',
  accessibility = 'accessibility',
  emergencyContact = 'emergency_contact',
  earningMethod = 'earning_method',
  language = 'language',
  navigation = 'navigation',
  operatingArea = 'specify_operating',
  theme = 'theme',
  verification = 'verification',
  notifications = 'notifications',
  cashOnDelivery = 'cash_on_delivery',
  deliveryBag = 'delivery_bag',
  includeOrdersWithDrinks = 'include_orders_drinks',
  licenses = 'licenses',
  vehicleType = 'vehicle_type',
  cuisineTypes = 'cuisine_types',
  restaurantTypes = 'restaurant_types',
  orderTypes = 'order_types',
  weightOrder = 'weight_order',
  rushedOrders = 'rushed_orders',
  shiftAvailability = 'shift_availability',
}

export type Language = {
  id: string;
  name: string;
  abreviation: string;
};

export type Theme = {
  id: string;
  name: string;
};

export enum AccessibilitySettingsOptions {
  volume = 'default_volume',
  sound = 'default_sound',
  myLanguages = 'my_languages',
  differentSounds = 'enable_different_sounds',
  screenFlash = 'screen_flash',
  vibration = 'enable_vibration',
  readingNotes = 'reading_notes',
  seatbeltReminder = 'seatbelt_reminder',
  deaf = 'im_deaf',
}

export type Ringtone = {
  id: string;
  name: string;
};

export type Volume = {
  id: string;
  name: string;
};

export enum ToastMessage {
  enableNotifications = 'enable_notifications',
  itemsBagged = 'items_bagged',
  enableLocationServices = 'enable_location_services',
  pickupBeforeContinuing = 'pickup_before_continue',
  waitingForNewOrders = 'waiting_for_orders',
  addressCopied = 'address_copied',
  get_closer = 'get_closer_to_restaurant',
  item_may_be_bagged = 'item_may_be_bagged',
}

export type Vehicle = {
  id: string;
  name: string;
};

export type RestauranType = {
  id: string;
  name: string;
};

export type CuisineType = {
  id: string;
  name: string;
};

export type EarningMethod = {
  id: string;
  name: string;
};

export type OrderPreference = {
  id: string;
  name: string;
};

export type WeightOrder = {
  id: string;
  name: string;
  info: string;
};

export type ShiftRange = {
  start: Date;
  end: Date;
};

export type Shift = {
  day: string;
  shiftRanges: ShiftRange[];
};

export type ShiftAvailability = {
  sunday: Date[][];
  monday: Date[][];
  tuesday: Date[][];
  wednesday: Date[][];
  thursday: Date[][];
  friday: Date[][];
  saturday: Date[][];
};

export type EarningGoals = {
  daily: number;
  weekly: number;
};

export type PayRate = {
  hourlyRate: number;
  perDeliveryRate: number;
  // Per mile
  distanceBasedRate: number;
  surgePricingPreference: number;
  minimumEarningsGuarantee: number;
};

export type Item = {
  name: string;
  quantity?: number;
  size?: 'small' | 'medium' | 'large';
  price?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  keepUpright?: boolean;
};

export type Photo = {
  uri: string;
  data: Blob;
  name: string;
  type: string;
};

// export type OrderItem = {
//   name: string;
//   quantity: number;
//   size: string;
//   dimensions: Dimensions;
//   price: number;
//   must_be_upright: boolean;
//   weight: number;
// };

// export enum OrderState {
//   orderPickup,
//   confirmingOrderItems,
//   orderDeliveryInProgress,
//   deliveryDone,
// }
