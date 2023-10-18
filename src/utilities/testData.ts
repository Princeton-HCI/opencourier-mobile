import {
  Order,
  OrderStatus,
  Organization,
  DeliveryType,
  PickupType,
} from '@app/types/types';

export const TEST_IMAGE_URL =
  'https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text.png';

export const TEST_ORG_ARRAY: Organization[] = [
  {
    name: 'BOS Pescatarian',
    id: '1',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
  {
    name: 'Sustainable NYC',
    id: '2',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
  {
    name: 'London Ladies',
    id: '3',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
  {
    name: `Mom n' Pop LA`,
    id: '4',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
];

export const TEST_ORDERS_HISTORY: Order[] = [
  {
    id: '1',
    deliveredTo: {
      firstname: 'User 1',
      lastname: '',
      profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
    },
    date: Date(),
    status: OrderStatus.Delivered,
    restaurant: {
      name: 'Restaurant 1',
    },
    price: 30.33,
  },
  {
    id: '2',
    deliveredTo: {
      firstname: 'User 2',
      lastname: '',
      profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
    },
    date: Date(),
    status: OrderStatus.Canceled,
    restaurant: {
      name: 'Restaurant 2',
    },
    price: 10.81,
  },
  {
    id: '3',
    deliveredTo: {
      firstname: 'User 3',
      lastname: '',
      profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
    },
    date: Date(),
    status: OrderStatus.Delivered,
    restaurant: {
      name: 'Restaurant 3',
    },
    price: 11.21,
  },
];

export const TEST_NEW_ORDERS: Order[] = [
  {
    id: 'id1',
    deliveredTo: {
      address: 'Street Number 5, Region, Country, ZIPCODE',
      firstname: 'User 1',
      lastname: '',
      profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
    },
    date: Date(),
    status: OrderStatus.Delivered,
    restaurant: {
      name: 'Restaurant 3',
      address: 'Street Number 5, Region, Country, ZIPCODE',
    },
    price: 11.21,
    restaurantNotes: ['Restaurant Note 1', 'Restaurant Note 2'],
    clientNotes: ['Client Note 1', 'Client Note 2'],
    pickupInstructions: [
      { type: PickupType.CallOnArrival },
      { type: PickupType.DontOpenBags },
      { type: PickupType.ParkThirdPartyLot, count: 3 },
      { type: PickupType.LineupThirdPartyPickup, count: 3 },
    ],
    deliveryInstructions: [
      DeliveryType.CallOnArrival,
      DeliveryType.LeaveAtDoor,
      DeliveryType.MeetAtDoor,
      DeliveryType.MeetInside,
      DeliveryType.MeetOutside,
    ],
  },
];
