export enum UserStatus {
  Online = 'Online',
  Offline = 'Offline',
  LastCall = 'Last Call',
}

export enum HomeTabItem {
  New = 'New',
  InProgress = 'In Progress',
  History = 'History',
}

export enum HomeEmptyState {
  New = 'New',
  InProgress = 'In Progress',
  History = 'History',
  WaitingNewOrders = 'WaitingNewOrders',
}

export enum SideMenuItem {
  Location = 'Real-time location',
  AutoOrders = 'Auto accept orders',
  Orders = 'Orders',
  Earnings = 'Earnings',
  Payout = 'Payout method',
  Support = 'Support',
  Settings = 'Settings',
  Logout = 'Log-out',
}

export type Organization = {
  name: string;
  id: string;
  imageUrl: string;
  iconUrl?: string;
};

export enum OrderStatus {
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}

export type User = {
  firstname: string;
  lastname: string;
  profilePictureUrl: string;
  address: string;
};

export type Restaurant = {
  name: string;
  address: string;
};

export type Order = {
  date: string;
  id: string;
  status: OrderStatus;
  deliveredTo: User;
  restaurant: Restaurant;
  price: number;
  deliveryInstructions?: DeliveryType[];
  pickupInstructions?: PickupInstruction[];
  restaurantNotes?: string[];
  clientNotes?: string[];
};

export enum DeliveryType {
  LeaveAtDoor = 'Leave at door',
  MeetOutside = 'Meet outside',
  MeetInside = 'Meet inside',
  MeetAtDoor = 'Meet at door',
  CallOnArrival = 'Call on arrival',
}

export enum PickupType {
  LineupThirdPartyPickup = 'Line up for third-party pickup',
  ParkThirdPartyLot = 'Park in third-party lot',
  DontOpenBags = `Don't open bags for checklist`,
  CallOnArrival = 'Call on arrival',
}

export type PickupInstruction = {
  type: PickupType;
  count?: number;
};
