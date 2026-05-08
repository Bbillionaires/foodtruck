export type Listing = { title:string; location:string; area:string; accessType:string; price:string; availableDates:string; vendorTypes:string; foodTruckAllowed:boolean; tentAllowed:boolean; power:boolean; water:boolean; restroom:boolean; parking:string; };

export const featuredLocations: Listing[] = [
  { title:'Riverside Night Market Spots', location:'Riverside Arts District', area:'Riverside, Jacksonville', accessType:'event-based', price:'$85/day', availableDates:'Fridays', vendorTypes:'Food, crafts, beverages', foodTruckAllowed:true, tentAllowed:true, power:true, water:false, restroom:true, parking:'Street + overflow lot' },
  { title:'Downtown Lunch Corridor', location:'Bay Street Hub', area:'Downtown Jacksonville', accessType:'daily', price:'$55/day', availableDates:'Mon-Fri', vendorTypes:'Food truck only', foodTruckAllowed:true, tentAllowed:false, power:true, water:true, restroom:true, parking:'Metered + loading zone' }
];

export const trucksForSale = [
  { name:'2017 Step Van Kitchen', price:'$48,000', status:'For Sale' },
  { name:'BBQ Trailer 18ft', price:'$950/week', status:'For Rent' }
];

export const coOps = [
  { title:'St. Johns Weekend Revenue Split', terms:'20% gross to location', dates:'Weekends' }
];

export const coupons = [
  { code:'JAXSTART10', detail:'10% off first booking (up to $35)' },
  { code:'TRAINFREE', detail:'Free starter compliance checklist' }
];
