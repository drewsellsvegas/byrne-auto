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
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.2290354322413!2d-115.08131202266692!3d36.233929872414116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c34a2db3e9b9%3A0xdbf8e1bfddd3717b!2sByrne%20Auto%20%26%20Performance!5e0!3m2!1sen!2sus!4v1793049846698!5m2!1sen!2sus',
  geo: { lat: 36.233929872414116, lng: -115.08131202266692 },
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
