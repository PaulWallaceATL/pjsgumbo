/** Brand, contact, and marketing content for PJ's Gumbo. */

export const SITE = {
  name: "PJ's Gumbo",
  tagline: "Atlanta Made. Cajun Soul.",
  blurb: "Made in Atlanta. Rooted in flavor.",
  phone: "(404) 555-0142",
  email: "hello@pjsgumbo.com",
  city: "Atlanta, GA",
  address: "229 Peachtree St NE, Atlanta, GA 30303",
  mapQuery: "229 Peachtree St NE, Atlanta, GA 30303",
  logo: "/brand/pjs-logo.png",
  founders: "/brand/pjs-founders.png",
  social: {
    instagram: "https://instagram.com/pjsgumbo",
    facebook: "https://facebook.com/pjsgumbo",
    tiktok: "https://tiktok.com/@pjsgumbo",
  },
} as const;

export const HOURS: { day: string; hours: string }[] = [
  { day: "Monday", hours: "11:00 AM – 8:00 PM" },
  { day: "Tuesday", hours: "11:00 AM – 8:00 PM" },
  { day: "Wednesday", hours: "11:00 AM – 8:00 PM" },
  { day: "Thursday", hours: "11:00 AM – 9:00 PM" },
  { day: "Friday", hours: "11:00 AM – 9:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 9:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 7:00 PM" },
];

export const DELIVERY_AREAS: { name: string; eta: string }[] = [
  { name: "Midtown", eta: "20–30 min" },
  { name: "Downtown", eta: "20–30 min" },
  { name: "Buckhead", eta: "30–40 min" },
  { name: "Old Fourth Ward", eta: "25–35 min" },
  { name: "Inman Park", eta: "25–35 min" },
  { name: "East Atlanta", eta: "30–45 min" },
  { name: "West End", eta: "25–40 min" },
  { name: "Decatur", eta: "35–50 min" },
];

export const REVIEWS: {
  name: string;
  location: string;
  rating: number;
  quote: string;
}[] = [
  {
    name: "Marcus T.",
    location: "Midtown, Atlanta",
    rating: 5,
    quote:
      "Tastes exactly like my grandmother's gumbo back in New Orleans. The roux is dark and perfect. I order every single week.",
  },
  {
    name: "Danielle R.",
    location: "Decatur, GA",
    rating: 5,
    quote:
      "The weekend blue crab gumbo is unreal. You can tell everything is fresh and made with love. Delivery was fast and hot.",
  },
  {
    name: "Chris & Bee",
    location: "Inman Park, Atlanta",
    rating: 5,
    quote:
      "We catered our office lunch with PJ's and everyone is still talking about it. The spicy version with serrano is the move.",
  },
  {
    name: "Latoya M.",
    location: "West End, Atlanta",
    rating: 5,
    quote:
      "Real Louisiana flavor, not watered down. The cornbread muffins and ooey gooey butter cake are must-orders.",
  },
];

export const WHY_DIFFERENT: { title: string; description: string }[] = [
  {
    title: "Slow-Cooked Dark Roux",
    description:
      "Every pot starts with a roux stirred by hand until it's the color of dark chocolate. No shortcuts, no powders.",
  },
  {
    title: "Fresh, Never Frozen",
    description:
      "Gulf shrimp, fresh okra, the holy trinity, and smoked sausage sourced and prepped daily.",
  },
  {
    title: "Family Recipes",
    description:
      "Three generations of Louisiana cooking, passed down and perfected in our Atlanta kitchen.",
  },
  {
    title: "Mild or Spicy, Your Call",
    description:
      "Every gumbo comes mild or kicked up with fresh serrano peppers — never artificial heat.",
  },
];

export const FRESH_INGREDIENTS: string[] = [
  "Gulf Shrimp",
  "Fresh Blue Crab",
  "Smoked Andouille Sausage",
  "The Holy Trinity",
  "Fresh Okra",
  "Hand-Stirred Roux",
  "Fresh Serrano Peppers",
  "Cajun Spices",
];

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do you deliver to my area?",
    answer:
      "We deliver across metro Atlanta including Midtown, Downtown, Buckhead, Old Fourth Ward, Inman Park, East Atlanta, West End, and Decatur. Enter your address at checkout to confirm.",
  },
  {
    question: "How spicy is the spicy version?",
    answer:
      "Our spicy gumbo is made with fresh serrano peppers for a bright, building heat — flavorful, not punishing. Prefer it gentle? Choose mild on any gumbo.",
  },
  {
    question: "When is the Blue Crab gumbo available?",
    answer:
      "The Blue Crab & Sausage gumbo is our weekend special, available Saturday and Sunday while supplies last.",
  },
  {
    question: "Do you offer catering?",
    answer:
      "Yes! We cater office lunches, events, and large gatherings across Atlanta. Half gallons feed a crowd. Visit our Catering page to submit an inquiry.",
  },
  {
    question: "What sizes can I order?",
    answer:
      "Cup, Bowl, Large Bowl, Quart, and Half Gallon. Quarts and half gallons are perfect for families and reheating throughout the week.",
  },
  {
    question: "Is pickup available?",
    answer:
      "Absolutely. Choose pickup at checkout and we'll have your order hot and ready at our Peachtree Street kitchen.",
  },
];
