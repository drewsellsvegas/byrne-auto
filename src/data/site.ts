export const site = {
  name: 'Byrne Auto & Performance',
  shortName: 'Byrne Auto',
  // [PLACEHOLDER: domain] confirm the live domain before launch
  url: 'https://www.byrneautoperformance.com',
  phone: { display: '(702) 742-0873', e164: '+17027420873', schema: '+1-702-742-0873' },
  email: 'byrneauto@gmail.com',
  address: {
    street: '4354 E Alexander Rd',
    city: 'Las Vegas',
    region: 'NV',
    zip: '89115',
    full: '4354 E Alexander Rd, Las Vegas, NV 89115',
  },
  mapsQuery: '4354 E Alexander Rd, Las Vegas, NV 89115',
  hours: {
    display: 'Mon–Fri 8am–5pm',
    detail: 'Saturday & Sunday closed',
    schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
  },
  facebook: 'https://www.facebook.com/BYRNE-Auto-Performance-101600031980798',
  areas: ['Las Vegas', 'North Las Vegas'],
  // Not known yet. Each stays a visible placeholder in the README until the owner answers.
  placeholders: {
    reviews: '[PLACEHOLDER: real customer reviews]',
    years: '[PLACEHOLDER: years in business]',
    owner: '[PLACEHOLDER: owner name and story]',
    warranty: '[PLACEHOLDER: warranty terms]',
    certs: '[PLACEHOLDER: ASE or other certifications]',
  },
};

export const brands = [
  { name: 'Dynojet', note: 'UTV power packages & fuel management' },
  { name: 'FRP', note: 'Authorized dealer' },
  { name: 'BTR', note: 'Brian Tooley Racing' },
  { name: 'Whipple', note: 'Superchargers' },
  { name: 'Rough Country', note: 'Lift kits & suspension' },
  { name: 'Texas Speed', note: 'Cams & performance' },
  { name: 'JLT', note: 'Cold air intakes' },
  { name: 'S&B', note: 'Filters & intakes' },
];
