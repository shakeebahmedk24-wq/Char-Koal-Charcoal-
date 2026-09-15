import { MenuItem, BanquetHall, GalleryItem, VisitingHourDay, Review, CateringPackage } from '../types/restaurant';

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Prime Tomahawk Ribeye on Binchotan',
    category: 'steaks',
    description: '45-day dry-aged Australian Black Angus, seared over Japanese white oak Binchotan charcoal, finished with bone marrow compound butter and smoked Maldon sea salt.',
    price: '$118',
    calories: '980 kcal',
    dietary: ['Chef Special', 'Signature', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'm2',
    name: 'Smoked Wagyu Adana Kebab',
    category: 'kebabs',
    description: 'Hand-minced A5 Wagyu beef seasoned with Urfa biber pepper, sumac, and roasted garlic, skewered on flat iron swords and charred over open wood embers.',
    price: '$42',
    calories: '650 kcal',
    dietary: ['Halal', 'Signature', 'Spicy'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'm3',
    name: 'Charred Mediterranean Octopus',
    category: 'seafood',
    description: 'Braised and hearth-charred octopus tentacle served over smoky paprika potato emulsion, caperberries, crispy chorizo crumb, and citrus herb oil.',
    price: '$38',
    calories: '420 kcal',
    dietary: ['Gluten-Free', 'Chef Special'],
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'm4',
    name: 'Fire-Roasted Eggplant & Stracciatella Mezze',
    category: 'appetizers',
    description: 'Whole eggplant blistered in hearth embers, whipped garlic tahini, fresh Italian stracciatella, pomegranate molasses, served with wood-fired sourdough pita.',
    price: '$22',
    calories: '380 kcal',
    dietary: ['Vegetarian', 'Signature'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'm5',
    name: 'Lamb Chops with Smoked Pistachio Crust',
    category: 'grill',
    description: 'New Zealand grass-fed lamb cutlets marinated in rosemary, pomegranate, and shallots, coated in roasted pistachio crumb, charred over applewood embers.',
    price: '$49',
    calories: '720 kcal',
    dietary: ['Halal', 'Chef Special'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'm6',
    name: 'Whole Wood-Fired Mediterranean Branzino',
    category: 'seafood',
    description: 'Stuffed with fresh dill, charred Meyer lemon, and garlic confit, roasted in a cast-iron cage directly above white-hot embers, drizzled with oregano salmoriglio.',
    price: '$54',
    calories: '510 kcal',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm7',
    name: 'Ember-Smoked Bone Marrow & Brioche',
    category: 'appetizers',
    description: 'Split beef marrow canoes caramelized over coal, garnished with shallot and herb salad, capers, served with toasted house-baked brioche soldiers.',
    price: '$26',
    calories: '590 kcal',
    dietary: ['Signature'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm8',
    name: 'Charcoal Roasted King Oyster Mushrooms',
    category: 'vegetarian',
    description: 'Thick cut wild mushrooms grilled over embers with sweet tamari tare glaze, black garlic purée, and toasted sesame seeds.',
    price: '$24',
    calories: '280 kcal',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm9',
    name: 'Smoked Smoked Old Fashioned',
    category: 'drinks',
    description: 'Handcrafted bourbon infused with charred pecan wood, Angostura bitters, orange peel, smoked tableside in a cloche with cherrywood embers.',
    price: '$20',
    dietary: ['Signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm10',
    name: 'Pomegranate & Cardamom Ember Fizz (Zero Proof)',
    category: 'drinks',
    description: 'Fresh pomegranate reduction, crushed smoked cardamom pods, cold-pressed lime, sparkling mineral water, charred rosemary sprig.',
    price: '$14',
    dietary: ['Halal', 'Vegetarian'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm11',
    name: 'Burnt Honey & Fig Charcoal Tart',
    category: 'desserts',
    description: 'Caramelized wildflower honey custard in a black cocoa tart shell, topped with ember-roasted black mission figs and smoked vanilla gelato.',
    price: '$18',
    dietary: ['Vegetarian', 'Chef Special'],
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'm12',
    name: 'Spiced Pistachio Baklava with Clotted Cream',
    category: 'desserts',
    description: 'Forty layers of crisp golden phyllo pastry filled with Antep pistachios, saffron citrus syrup, and Turkish kaymak clotted cream.',
    price: '$17',
    dietary: ['Halal', 'Vegetarian'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80'
  }
];

export const DEFAULT_BANQUET_HALLS: BanquetHall[] = [
  {
    id: 'b1',
    name: 'The Grand Ember Ballroom',
    tagline: 'Our flagship venue for grand galas, luxury weddings, and high-profile corporate summits.',
    capacitySeated: 320,
    capacityReception: 450,
    dimensions: '4,800 sq. ft. | 18 ft. ceilings',
    description: 'A breathtaking architectural space featuring warm walnut wood paneling, custom blown-glass bronze chandeliers, state-of-the-art concert acoustic design, and dedicated private service foyers.',
    features: [
      'Dedicated private entrance & pre-function cocktail foyer',
      'Dual 4K laser projection screens & wireless Shure mic arrays',
      'Integrated architectural mood lighting with ember color themes',
      'Private VIP bridal / speaker dressing suite with en-suite bath',
      'Separate banquet production kitchen ensuring instant culinary plating'
    ],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    basePricing: 'From $4,500 room hire + catering'
  },
  {
    id: 'b2',
    name: 'The Charcoal Hearth Pavilion',
    tagline: 'Intimate, warm luxury centered around an interactive open fire show kitchen.',
    capacitySeated: 90,
    capacityReception: 140,
    dimensions: '1,750 sq. ft.',
    description: 'Ideal for rehearsal dinners, executive milestone celebrations, and bespoke private dinners. Guests witness Master Pitmasters grill prime meats and seafood directly over glowing Binchotan coals behind custom soundproof glass.',
    features: [
      'Interactive show-kitchen viewing station with executive chef briefing',
      'Custom brass cocktail bar with dedicated sommelier service',
      'Direct walk-out access to the fire-pit garden terrace',
      'Full audio system with custom playlist control & HDMI presentation'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    basePricing: 'From $2,200 room hire + catering'
  },
  {
    id: 'b3',
    name: 'The Cellar Private Dining Room',
    tagline: 'Secluded sophistication enveloped by our 2,000-bottle vintage wine vault.',
    capacitySeated: 24,
    capacityReception: 35,
    dimensions: '750 sq. ft.',
    description: 'Designed for confidential board meetings, celebratory family reunions, and curated multi-course wine pairing degustations. Features a monolithic single-slab French oak dining table and private sommelier service.',
    features: [
      'Exclusive single-slab solid French oak boardroom table',
      'Temperature-controlled floor-to-ceiling vintage wine displays',
      'Discreet high-definition teleconference screen hidden behind art panels',
      'Dedicated personal butler and head sommelier for the evening'
    ],
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    basePricing: 'From $950 room hire + dining minimum'
  },
  {
    id: 'b4',
    name: 'The Starlit Charcoal Terrace & Rooftop Lounge',
    tagline: 'Open-air al fresco dining with live fire pits and panoramic city views.',
    capacitySeated: 130,
    capacityReception: 200,
    dimensions: '2,600 sq. ft. outdoor terrace',
    description: 'Under the open sky, this all-weather terrace features custom radiant heaters, retractable motorized pergola roofing, cozy fire cauldrons, and lush botanical greenery for unforgettable twilight cocktail receptions.',
    features: [
      'Natural gas fire cauldrons & ambient overhead radiant heaters',
      'Retractable weatherproof architectural pergolas with rain sensors',
      'Independent outdoor craft cocktail bar & skewer station',
      'Surround outdoor acoustics and panoramic sunset skyline views'
    ],
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    basePricing: 'From $2,800 room hire + catering'
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Live Binchotan Charcoal Hearth',
    category: 'hearth',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    description: 'Master chefs grilling prime skewers over 1,000°F natural hardwood charcoal.'
  },
  {
    id: 'g2',
    title: 'The Grand Ember Ballroom Reception',
    category: 'banquet',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    description: 'Luxury wedding table setup with floral runners and amber illumination.'
  },
  {
    id: 'g3',
    title: 'Prime 45-Day Dry-Aged Tomahawk',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    description: 'Carved tableside over glowing volcanic stones.'
  },
  {
    id: 'g4',
    title: 'Main Dining Room Ambiance',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: 'Intimate booth seating with smoky bronze metallic accents.'
  },
  {
    id: 'g5',
    title: 'Smoked Wagyu Flat Iron Skewers',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    description: 'Served with charred heirloom peppers and sumac red onion.'
  },
  {
    id: 'g6',
    title: 'The Cellar Private Vault',
    category: 'banquet',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Secluded boardroom dining with bespoke sommelier pairings.'
  },
  {
    id: 'g7',
    title: 'Flame Kissed Octopus & Paprika Emulsion',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80',
    description: 'Plated with edible flowers and smoked microgreens.'
  },
  {
    id: 'g8',
    title: 'Smoked Cocktails & Tableside Cloche',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    description: 'Handcrafted mixology with oak smoke and aromatic bitters.'
  },
  {
    id: 'g9',
    title: 'Starlit Charcoal Terrace at Twilight',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    description: 'City lights and open flame warmth on our private rooftop.'
  }
];

export const DEFAULT_VISITING_HOURS: VisitingHourDay[] = [
  { day: 'Monday', lunch: '12:00 PM – 3:30 PM', dinner: '5:30 PM – 10:30 PM', status: 'open' },
  { day: 'Tuesday', lunch: '12:00 PM – 3:30 PM', dinner: '5:30 PM – 10:30 PM', status: 'open' },
  { day: 'Wednesday', lunch: '12:00 PM – 3:30 PM', dinner: '5:30 PM – 11:00 PM', status: 'open' },
  { day: 'Thursday', lunch: '12:00 PM – 3:30 PM', dinner: '5:30 PM – 11:00 PM', status: 'open' },
  { day: 'Friday', lunch: '12:00 PM – 4:00 PM', dinner: '5:00 PM – 11:30 PM', status: 'open' },
  { day: 'Saturday', lunch: '11:30 AM – 4:00 PM (Brunch)', dinner: '5:00 PM – 12:00 AM', status: 'open' },
  { day: 'Sunday', lunch: '11:30 AM – 4:00 PM (Brunch)', dinner: '5:00 PM – 10:00 PM', status: 'open' }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Marcus Vance',
    rating: 5,
    source: 'Google',
    date: '3 days ago',
    comment: 'Without doubt the most memorable dining experience of the year. The 45-day dry-aged Tomahawk cooked over Binchotan coals had a depth of flavor that is genuinely unmatched.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'r2',
    author: 'Elena Rostova',
    rating: 5,
    source: 'TripAdvisor',
    date: '1 week ago',
    comment: 'We hosted our daughter’s wedding banquet in The Grand Ember Ballroom for 220 guests. The culinary execution was flawless, piping hot, and the event coordinators treated us like royalty.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'r3',
    author: 'David Sterling',
    rating: 5,
    source: 'Michelin Guide',
    date: '2 weeks ago',
    comment: 'A masterclass in open-fire gastronomy. The charcoal roasted eggplant and Wagyu Adana kebab demonstrate immaculate balance of smoke, spice, and silkiness.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export const DEFAULT_CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'c1',
    name: 'The Hearth Artisan Experience',
    tier: 'Silver',
    pricePerPerson: 65,
    minGuests: 25,
    description: 'Perfect for corporate gatherings, cocktail receptions, and milestone celebrations needing gourmet live-fire catering.',
    includes: [
      'Selection of 4 passed hot charcoal skewers & 3 wood-fired mezze dips',
      'Artisan sourdough flatbreads baked fresh on site',
      'Choice of 2 signature protein carving platters (Wagyu skewers / Herb chicken)',
      'Side of heirloom charcoal vegetables and sumac saffron rice',
      'Professional banquet service staff & stainless chafing displays'
    ]
  },
  {
    id: 'c2',
    name: 'The Grand Imperial Feast',
    tier: 'Gold',
    pricePerPerson: 95,
    minGuests: 35,
    popular: true,
    description: 'Our most sought-after banquet catering package for weddings, anniversary galas, and executive summits.',
    includes: [
      'Live mobile charcoal grill station with dedicated Master Pitmaster',
      '6 passed appetizers including Ember Bone Marrow toast and Octopus bites',
      'Full banquet buffet or family-style tableside service',
      'Prime dry-aged steaks, herb-crusted lamb chops, and whole grilled branzino',
      'Pistachio baklava and smoked chocolate dessert buffet',
      'Full china, silverware, glassware, and linen service included'
    ]
  },
  {
    id: 'c3',
    name: 'Black Diamond Chef’s Table',
    tier: 'Black Diamond',
    pricePerPerson: 160,
    minGuests: 15,
    description: 'Ultra-exclusive private dining service at your estate, penthouse, or chartered venue with Executive Chef.',
    includes: [
      '7-course live-fire tasting menu customized with our Executive Chef',
      'Tableside Japanese Binchotan hibachi grill experience',
      'A5 Japanese Wagyu Ribeye & Caviar appetizer course',
      'Handcrafted cocktail mixologist and sommelier wine flight pairings',
      'Dedicated front-of-house banquet captain and private servers',
      'Commemorative printed personalized leather menus for guests'
    ]
  }
];
