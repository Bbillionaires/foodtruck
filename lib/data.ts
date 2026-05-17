export type Listing = {
  slug: string;
  title: string;
  location: string;
  area: string;
  address: string;
  accessType: string;
  price: string;
  priceValue: number;
  availableDates: string;
  availability: string;
  vendorTypes: string;
  foodTruckAllowed: boolean;
  tentAllowed: boolean;
  power: boolean;
  water: boolean;
  restroom: boolean;
  parking: string;
  amenities: string[];
  rules: string;
  trafficLevel: string;
  popularity: number;
  status: string;
  image: string;
  createdAt: string;
  availabilityRank: number;
};

export const featuredLocations: Listing[] = [
  {
    slug: 'riverside-night-market-spots',
    title: 'Riverside Night Market Spots',
    location: 'Riverside Arts District',
    area: 'Riverside',
    address: 'Riverside, Jacksonville, FL',
    accessType: 'event',
    price: '$85/day',
    priceValue: 85,
    availableDates: 'Fridays',
    availability: 'Friday evenings available',
    vendorTypes: 'Food, crafts, beverages',
    foodTruckAllowed: true,
    tentAllowed: true,
    power: true,
    water: false,
    restroom: true,
    parking: 'Street + overflow lot',
    amenities: ['Power access', 'Restrooms', 'High foot traffic', 'Promoter support'],
    rules: 'No generators after 9PM. Approved vendors only.',
    trafficLevel: 'High',
    popularity: 96,
    status: 'approved',
    image: 'linear-gradient(135deg, #0a7d53 0%, #f59e0b 100%)',
    createdAt: '2026-05-10',
    availabilityRank: 1
  },
  {
    slug: 'downtown-lunch-corridor',
    title: 'Downtown Lunch Corridor',
    location: 'Bay Street Hub',
    area: 'Downtown',
    address: 'Bay Street, Downtown Jacksonville, FL',
    accessType: 'daily',
    price: '$55/day',
    priceValue: 55,
    availableDates: 'Mon-Fri',
    availability: 'Weekday lunch blocks',
    vendorTypes: 'Food truck only',
    foodTruckAllowed: true,
    tentAllowed: false,
    power: true,
    water: true,
    restroom: true,
    parking: 'Metered + loading zone',
    amenities: ['Power access', 'Water access', 'Restrooms', 'Lunch crowd'],
    rules: 'Arrive by 10:30AM. Health permit required.',
    trafficLevel: 'Medium-high',
    popularity: 88,
    status: 'approved',
    image: 'linear-gradient(135deg, #0f172a 0%, #0a7d53 100%)',
    createdAt: '2026-05-07',
    availabilityRank: 2
  },
  {
    slug: 'beaches-weekend-pop-up-pad',
    title: 'Beaches Weekend Pop-Up Pad',
    location: 'Atlantic Beach Retail Row',
    area: 'Beaches',
    address: 'Atlantic Beach, Jacksonville, FL',
    accessType: 'recurring',
    price: '$125/event',
    priceValue: 125,
    availableDates: 'Sat-Sun',
    availability: 'Weekend rotations open',
    vendorTypes: 'Food trucks, desserts, coffee, retail tents',
    foodTruckAllowed: true,
    tentAllowed: true,
    power: false,
    water: false,
    restroom: true,
    parking: 'Shared customer lot',
    amenities: ['Retail foot traffic', 'Restrooms nearby', 'Social promotion'],
    rules: 'Quiet generators only. Keep pedestrian lane clear.',
    trafficLevel: 'High',
    popularity: 91,
    status: 'approved',
    image: 'linear-gradient(135deg, #0284c7 0%, #f59e0b 100%)',
    createdAt: '2026-05-12',
    availabilityRank: 3
  },
  {
    slug: 'westside-community-market',
    title: 'Westside Community Market',
    location: 'Westside Art Walk Jax',
    area: 'Westside',
    address: 'Westside, Jacksonville, FL',
    accessType: 'monthly',
    price: '$300/month',
    priceValue: 300,
    availableDates: 'Monthly market days',
    availability: 'Monthly vendor blocks',
    vendorTypes: 'Food, art, retail, services',
    foodTruckAllowed: true,
    tentAllowed: true,
    power: true,
    water: false,
    restroom: true,
    parking: 'On-site vendor parking',
    amenities: ['Power access', 'Vendor parking', 'Community traffic'],
    rules: 'Setup times assigned by event operator.',
    trafficLevel: 'Medium',
    popularity: 76,
    status: 'approved',
    image: 'linear-gradient(135deg, #7c3aed 0%, #0a7d53 100%)',
    createdAt: '2026-04-28',
    availabilityRank: 4
  }
];

export const trucksForSale = [
  { name: '2017 Step Van Kitchen', price: '$48,000', status: 'For Sale', slug: '2017-step-van-kitchen' },
  { name: 'BBQ Trailer 18ft', price: '$950/week', status: 'For Rent', slug: 'bbq-trailer-18ft' }
];

export const coOps = [
  { title: 'St. Johns Weekend Revenue Split', terms: '20% gross to location', dates: 'Weekends' }
];

export const coupons = [
  { code: 'JAXSTART10', detail: '10% off first booking (up to $35)' },
  { code: 'TRAINFREE', detail: 'Free starter compliance checklist' }
];
