import { menuImage } from "@/lib/content/menu";
import { GUMBO_BATCH_SIZES } from "./batches";
import { STANDARD_GUMBO_EQUIPMENT } from "./equipment";
import type { ChefNotes, Recipe, RecipeIngredient } from "./types";

const GUMBO_INTERNAL_TEMPS = [
  { item: "Chicken thigh", tempF: 165, note: "Bite-sized pieces fully cooked" },
  { item: "Andouille sausage", tempF: 165 },
  { item: "Gulf shrimp", tempF: 145, note: "Add at finish — do not boil" },
  { item: "Finished gumbo (service)", tempF: 165, note: "Minimum hot-hold temperature" },
];

const GUMBO_CHEF_NOTES: ChefNotes = {
  tips: [
    "Stir roux constantly — burnt roux cannot be saved.",
    "Warm stock before adding to hot roux to prevent seizing.",
    "Rest finished gumbo 15–20 minutes off heat before serving; flavors marry.",
    "Cayenne and hot sauce control heat — start mild, build at the finish.",
  ],
  criticalControlPoints: [
    "Roux color must reach dark chocolate before adding trinity.",
    "Maintain simmer below a rolling boil once stock is added.",
    "Hot-hold at 165°F minimum; discard after 4-hour hold window.",
    "Cool from 135°F to 70°F within 2 hours for refrigeration.",
  ],
  commonMistakes: [
    "Rushing the roux — pale roux equals thin flavor.",
    "Boiling shrimp or crab — proteins turn rubbery and cloud the pot.",
    "Under-seasoning at the finish — gumbo should taste bold before rice.",
    "Adding cold stock to hot roux — always warm stock first.",
  ],
  textureGuide:
    "Silky, spoon-coating body. Chicken tender, sausage slices hold their snap. Not stew-thick, not broth-thin.",
  colorGuide:
    "Deep mahogany brown with amber highlights. Oil sheen on surface is normal — skim excess if needed.",
  tasteGuide:
    "Savory, layered, and round. Roux depth first, then trinity sweetness, then smoked meat on the finish. Spicy builds with cayenne and hot sauce without masking the roux.",
};

/** PJ's home single-pot gumbo — 8–10 servings. All gumbo batches scale from this. */
const HOME_ROUX: RecipeIngredient[] = [
  { name: "Vegetable Oil", amount: 1, unit: "cup", prepNotes: "For dark roux", costPerUnit: 0.04 },
  { name: "All-Purpose Flour", amount: 1, unit: "cup", prepNotes: "For dark roux", costPerUnit: 0.055 },
];

const HOME_TRINITY: RecipeIngredient[] = [
  { name: "Yellow Onion", amount: 2, unit: "ea", prepNotes: "Large, diced", costPerUnit: 0.85 },
  { name: "Green Bell Pepper", amount: 2, unit: "ea", prepNotes: "Diced", costPerUnit: 0.75 },
  { name: "Celery", amount: 4, unit: "stalks", prepNotes: "Diced", costPerUnit: 0.15 },
  { name: "Garlic", amount: 6, unit: "cloves", prepNotes: "Minced", costPerUnit: 0.05 },
];

const HOME_LIQUID: RecipeIngredient[] = [
  { name: "Chicken Stock", amount: 8, unit: "cups", prepNotes: "Warm", costPerUnit: 0.045 },
];

const HOME_SEASONINGS: RecipeIngredient[] = [
  { name: "Cajun Seasoning", amount: 2, unit: "tbsp", costPerUnit: 0.12 },
  { name: "Smoked Paprika", amount: 1, unit: "tbsp", costPerUnit: 0.15 },
  { name: "Garlic Powder", amount: 2, unit: "tsp", costPerUnit: 0.08 },
  { name: "Onion Powder", amount: 2, unit: "tsp", costPerUnit: 0.07 },
  { name: "Dried Thyme", amount: 1, unit: "tsp", costPerUnit: 0.12 },
  { name: "Bay Leaves", amount: 2, unit: "ea", costPerUnit: 0.05 },
  { name: "Black Pepper", amount: 1, unit: "tsp", costPerUnit: 0.15 },
  { name: "Cayenne Pepper", amount: 0.75, unit: "tsp", prepNotes: "Spicy — ½–1 tsp to taste", costPerUnit: 0.12 },
  { name: "Hot Sauce", amount: 1.5, unit: "tbsp", costPerUnit: 0.08 },
  { name: "Worcestershire Sauce", amount: 1, unit: "tbsp", costPerUnit: 0.15 },
  { name: "Kosher Salt", amount: 1, unit: "tsp", prepNotes: "To taste", costPerUnit: 0.02 },
];

const HOME_FINISH: RecipeIngredient[] = [
  { name: "Flat-Leaf Parsley", amount: 0.5, unit: "cup", prepNotes: "Chopped", costPerUnit: 0.5 },
  { name: "Green Onion", amount: 4, unit: "ea", prepNotes: "Sliced", costPerUnit: 0.15 },
  { name: "White Rice", amount: 2.25, unit: "lb", prepNotes: "Cooked, for serving", costPerUnit: 0.62 },
];

const HOME_CHICKEN_ANDOUILLE_PROTEIN: RecipeIngredient[] = [
  {
    name: "Chicken Thigh",
    amount: 2,
    unit: "lb",
    prepNotes: "Boneless, skinless, bite-sized pieces",
    costPerUnit: 1.89,
  },
  {
    name: "Andouille Sausage",
    amount: 1,
    unit: "lb",
    prepNotes: "Sliced into rounds",
    costPerUnit: 3.49,
  },
];

/** Spicy Chicken & Andouille Gumbo — home master recipe (8–10 servings). */
const HOME_CHICKEN_ANDOUILLE_INGREDIENTS: RecipeIngredient[] = [
  ...HOME_CHICKEN_ANDOUILLE_PROTEIN,
  ...HOME_ROUX,
  ...HOME_TRINITY,
  ...HOME_LIQUID,
  ...HOME_SEASONINGS,
  ...HOME_FINISH,
];

const HOME_CHICKEN_ANDOUILLE_STEPS = [
  "Cut chicken thighs into bite-sized pieces and slice andouille into rounds.",
  "Dice onions, bell peppers, and celery. Mince garlic.",
  "Heat vegetable oil in a heavy Dutch oven or stock pot over medium. Whisk in flour to start the roux.",
  "Stir roux constantly until dark chocolate brown — about 45–60 minutes.",
  "Add holy trinity to roux and sweat until onions soften, about 10–12 minutes.",
  "Add garlic and cook 1 minute.",
  "Slowly whisk in warm chicken stock.",
  "Add Cajun seasoning, smoked paprika, garlic powder, onion powder, thyme, bay leaves, black pepper, cayenne, hot sauce, and Worcestershire.",
  "Simmer uncovered 60–90 minutes, stirring occasionally, until body coats the back of a spoon.",
  "Add chicken and andouille. Simmer until chicken is tender, about 25–30 minutes.",
  "Finish with parsley and green onions. Salt to taste.",
  "Serve over cooked white rice.",
];

function gumboBase(
  slug: string,
  name: string,
  description: string,
  ingredients: RecipeIngredient[],
  steps: string[],
  overrides: Partial<Recipe> = {},
): Recipe {
  return {
    slug,
    name,
    category: "Gumbo",
    difficulty: "Advanced",
    prepTimeMinutes: 45,
    cookTimeMinutes: 120,
    holdTimeMinutes: 240,
    shelfLife: "4 days refrigerated; 3 months frozen",
    storageInstructions:
      "Cool in shallow hotel pans with ice paddle. Label with date, batch size, and protein type. Store covered at 38°F or below.",
    servingTemperature: "165°F minimum — ladled over steamed white rice",
    internalTemps: GUMBO_INTERNAL_TEMPS,
    equipment: [...STANDARD_GUMBO_EQUIPMENT],
    description,
    image: menuImage(slug),
    usageCount: 0,
    masterBatchKey: "home",
    batchSizes: GUMBO_BATCH_SIZES,
    ingredients,
    steps,
    chefNotes: GUMBO_CHEF_NOTES,
    nutrition: {
      calories: 420,
      proteinG: 28,
      fatG: 22,
      carbsG: 24,
      sodiumMg: 980,
      servingSize: "12 oz gumbo + 4 oz rice",
    },
    costing: { suggestedMenuPrice: 16 },
    ...overrides,
  };
}

export const GUMBO_RECIPES: Recipe[] = [
  gumboBase(
    "chicken-sausage-gumbo",
    "Spicy Chicken & Andouille Gumbo",
    "PJ's home pot — dark roux, holy trinity, bite-sized chicken thigh, and andouille with cayenne and hot sauce. This 8–10 serving recipe is the master batch; restaurant sizes scale up from here.",
    HOME_CHICKEN_ANDOUILLE_INGREDIENTS,
    HOME_CHICKEN_ANDOUILLE_STEPS,
    { usageCount: 615, costing: { suggestedMenuPrice: 14 }, difficulty: "Intermediate" },
  ),
  gumboBase(
    "pjs-signature-gumbo",
    "PJ's Signature Gumbo",
    "The house pot — same home roux foundation with Gulf shrimp and okra added. Scaled from the single-pot chicken & andouille master.",
    [
      ...HOME_CHICKEN_ANDOUILLE_PROTEIN,
      { name: "Gulf Shrimp (21/25)", amount: 0.75, unit: "lb", prepNotes: "Peeled, deveined", costPerUnit: 7.95 },
      { name: "Fresh Okra", amount: 0.5, unit: "lb", prepNotes: "Trimmed, halved", costPerUnit: 2.25 },
      ...HOME_ROUX,
      ...HOME_TRINITY,
      ...HOME_LIQUID,
      ...HOME_SEASONINGS,
      ...HOME_FINISH,
    ],
    [
      ...HOME_CHICKEN_ANDOUILLE_STEPS.slice(0, 9),
      "Add chicken, andouille, and okra. Simmer 20 min.",
      "Add shrimp during the last 5 minutes — do not boil.",
      "Finish with parsley and green onions. Serve over rice.",
    ],
    { usageCount: 842, costing: { suggestedMenuPrice: 16 } },
  ),
  gumboBase(
    "chicken-gumbo",
    "Chicken Gumbo",
    "All-chicken comfort — same home roux and trinity build without sausage. Extra thigh meat for a clean, rich bowl.",
    [
      {
        name: "Chicken Thigh",
        amount: 3,
        unit: "lb",
        prepNotes: "Boneless, skinless, bite-sized",
        costPerUnit: 1.89,
      },
      ...HOME_ROUX,
      ...HOME_TRINITY,
      ...HOME_LIQUID,
      ...HOME_SEASONINGS,
      ...HOME_FINISH,
    ],
    [
      "Season chicken and sear half in the pot. Reserve.",
      ...HOME_CHICKEN_ANDOUILLE_STEPS.slice(2, 9),
      "Return all chicken to the pot. Simmer until tender and shreddable.",
      "Finish with parsley and green onion. Serve over rice.",
    ],
    {
      difficulty: "Intermediate",
      usageCount: 388,
      costing: { suggestedMenuPrice: 13 },
      nutrition: {
        calories: 380,
        proteinG: 32,
        fatG: 18,
        carbsG: 20,
        sodiumMg: 920,
        servingSize: "12 oz gumbo + 4 oz rice",
      },
    },
  ),
  gumboBase(
    "veggie-gumbo",
    "Veggie Gumbo",
    "Plant-forward but still roux-built from the home batch ratios — okra, trinity, tomatoes, and vegetable stock.",
    [
      ...HOME_ROUX,
      ...HOME_TRINITY,
      { name: "Fresh Okra", amount: 1, unit: "lb", prepNotes: "Halved", costPerUnit: 2.25 },
      { name: "Crushed Tomatoes", amount: 1, unit: "cup", costPerUnit: 0.55 },
      { name: "Vegetable Stock", amount: 8, unit: "cups", prepNotes: "Warm", costPerUnit: 0.038 },
      ...HOME_SEASONINGS.filter((s) => s.name !== "Worcestershire Sauce"),
      { name: "Worcestershire Sauce", amount: 1, unit: "tsp", costPerUnit: 0.15 },
      ...HOME_FINISH,
    ],
    [
      "Roast half the okra on a sheet pan at 425°F for 15 min — reduces slime.",
      ...HOME_CHICKEN_ANDOUILLE_STEPS.slice(2, 7),
      "Whisk in vegetable stock and tomatoes with seasonings.",
      "Simmer 75 min. Finish with parsley and green onion. Serve over rice.",
    ],
    {
      difficulty: "Intermediate",
      usageCount: 201,
      costing: { suggestedMenuPrice: 13 },
      internalTemps: [{ item: "Finished gumbo (service)", tempF: 165 }],
      nutrition: {
        calories: 290,
        proteinG: 6,
        fatG: 14,
        carbsG: 34,
        sodiumMg: 840,
        servingSize: "12 oz gumbo + 4 oz rice",
      },
    },
  ),
  gumboBase(
    "blue-crab-sausage-gumbo",
    "Weekend Blue Crab & Sausage Gumbo",
    "Weekend luxury — home-batch roux with andouille and picked blue crab. Saturday and Sunday only.",
    [
      { name: "Blue Crab Meat", amount: 0.75, unit: "lb", prepNotes: "Picked, shell-free", costPerUnit: 9.5 },
      {
        name: "Andouille Sausage",
        amount: 1,
        unit: "lb",
        prepNotes: "Sliced into rounds",
        costPerUnit: 3.49,
      },
      ...HOME_ROUX,
      ...HOME_TRINITY,
      { name: "Seafood Stock", amount: 8, unit: "cups", prepNotes: "Warm", costPerUnit: 0.052 },
      ...HOME_SEASONINGS,
      { name: "Old Bay", amount: 1, unit: "tsp", costPerUnit: 0.45 },
      ...HOME_FINISH,
    ],
    [
      "Inspect crab twice for shell.",
      ...HOME_CHICKEN_ANDOUILLE_STEPS.slice(2, 9),
      "Simmer andouille 20 min before adding crab.",
      "Fold crab in gently at finish — 5 min max. Never boil after crab is added.",
      "Finish with parsley and green onion. Serve over rice.",
    ],
    {
      difficulty: "Expert",
      usageCount: 156,
      costing: { suggestedMenuPrice: 19 },
      internalTemps: [
        { item: "Andouille sausage", tempF: 165 },
        { item: "Blue crab (added at finish)", tempF: 145, note: "Gentle heat only" },
      ],
      nutrition: {
        calories: 450,
        proteinG: 26,
        fatG: 24,
        carbsG: 22,
        sodiumMg: 1100,
        servingSize: "12 oz gumbo + 4 oz rice",
      },
    },
  ),
];
