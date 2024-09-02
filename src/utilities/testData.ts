import { Order, Organization, Instance } from '@app/types/types';

export const TEST_IMAGE_URL =
  'https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text.png';

export const TEST_ORG_ARRAY: Organization[] = [
  {
    name: 'Open Deli',
    id: '1',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
  {
    name: 'Demo',
    id: '2',
    imageUrl: TEST_IMAGE_URL,
    iconUrl: TEST_IMAGE_URL,
  },
];

export const TEST_EARNINGS_ORDERS: Order[] = [
  {
    id: '1',
    date: '27 OCT 2023 - 3:10 PM',
    restaurant: { name: 'Mi Familia Restaurant' },
    price: 10.0,
  },
  {
    id: '2',
    date: '27 OCT 2023 - 4:10 PM',
    restaurant: { name: 'Ocean Harmony Bistro' },
    price: 10.0,
  },
  {
    id: '3',
    date: '27 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '4',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '5',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '6',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '7',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '8',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
  {
    id: '9',
    date: '20 OCT 2023 - 5:10 PM',
    restaurant: { name: 'Local Catch Café' },
    price: 10.0,
  },
];

export const TEST_INSTANCE_DESC = `Welcome Couriers to "Plant-Based Couriers"!\n\nYour Role:\n• Deliver diverse cuisines from various vegan restaurants.\n• Ensure timely, safe food handling.\n• Maintain clear communication with restaurants and customers.\n• Follow each restaurant's specific delivery guidelines.\nWhy "Plant-Based Couriers"?\n• Variety: Experience different plant-based culinary styles.\n• Efficiency: Streamlined pickup and delivery processes.\n• Support: Strong back-end assistance.\n• Flexibility: Work with multiple vegan restaurants.\n• Eco-Friendly: We promote sustainable delivery practices.\nStay Updated:\n• Use our app for multi-restaurant orders, navigation, and support.\n• Regular updates and training for optimal performance.\n\nJoin us in connecting culinary delights with the community!`;
export const TEST_RULES = `1. Timely Pick-Ups: Arrive on schedule and verify orders for accuracy.
2. Order Handling: Carefully transport food, ensuring proper temperature and secure packaging.
3. Customer Interaction: Be professional and keep customers updated.
4. App Usage: Efficiently use the app for navigation and status updates.
5. Safety: Follow traffic laws and health guidelines.
6. Feedback: Report issues and encourage customer ratings.
7. Privacy: Maintain customer confidentiality.
8. Sustainability: Opt for eco-friendly transport options.`;

export const TEST_INSTANCES: Instance[] = [
  {
    name: 'New Api',
    link: 'http://ec2-3-94-231-35.compute-1.amazonaws.com:3000/api/courier/v1/',
    ws_link: 'ws://ec2-3-94-231-35.compute-1.amazonaws.com:3000/couriers',
    imageUrl: TEST_IMAGE_URL,
    userCount: 3,
    rules: TEST_RULES,
    description: TEST_INSTANCE_DESC,
  },
  // {
  //   name: 'Plant-Based Couriers',
  //   link: 'https://opendeli-ef37c601bbdc.herokuapp.com/',
  //   imageUrl: TEST_IMAGE_URL,
  //   userCount: 11,
  //   rules: TEST_RULES,
  //   description: TEST_INSTANCE_DESC,
  // },
  // {
  //   name: 'Black Courier Alliance',
  //   link: 'https://princeton.social/',
  //   imageUrl: TEST_IMAGE_URL,
  //   userCount: 25,
  //   rules: TEST_RULES,
  //   description: TEST_INSTANCE_DESC,
  // },
  {
    name: 'NYC Courier Collective',
    link: 'http://localhost:3001/',
    ws_link: 'ws://localhost:3001/couriers',
    imageUrl: TEST_IMAGE_URL,
    userCount: 3,
    rules: TEST_RULES,
    description: TEST_INSTANCE_DESC,
  },
];
