import { ServicePackage, AddOnOption, InstagramPost, GoogleReview, BlogPost, ProjectGalleryItem, Booking } from '../types';

export const COMPANY_INFO = {
  name: 'Empire Auto Spa',
  tagline: 'Detailing | Protection | Perfection',
  subTagline: 'Drive Clean. Drive Premium.',
  address: 'Street 111, G-9/4, G-9, Islamabad, 44000, Pakistan',
  shortAddress: 'Street 111, G-9/4, Islamabad',
  phone1: '+92 309 0009904',
  phone2: '0322 3700777',
  whatsappNumber: '923090009904',
  whatsappNumber2: '923223700777',
  email: 'info@empireautospa.pk',
  instagramHandle: '@empire.auto_spa',
  instagramUrl: 'https://www.instagram.com/empire.auto_spa/',
  facebookUrl: 'https://www.facebook.com/empire.auto.spa',
  googleMapsUrl: 'https://maps.google.com/?q=Empire+Auto+Spa+Street+111+G-9+Islamabad',
  workingHours: 'Monday – Sunday: 10:00 AM – 10:00 PM',
  googleRating: 5.0,
  googleReviewCount: 16,
  establishedYear: '2021',
  carsProtectedCount: '2,500+'
};

export const SERVICES_PACKAGES: ServicePackage[] = [
  {
    id: 'premium-wash',
    name: 'Premium Wash',
    category: 'detailing',
    price: 2999,
    priceDisplay: 'Rs. 2,999',
    duration: '1.5 - 2 Hours',
    shortDesc: 'Complete pH-neutral snow foam wash with interior vacuum and machine polish touchup.',
    description: 'Thorough gentle hand wash using pH-balanced active snow foam, wheel deep cleaning, high-speed machine polish, interior vacuuming, dashboard UV dressing, and crystal window shine.',
    features: [
      'Snow Foam Wash (pH Neutral)',
      'Interior Deep Vacuuming',
      'Dashboard Conditioning & Polish',
      'Quick Machine Gloss Polish',
      'Long-lasting Tire Shine',
      'Streak-free Window Cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Routine maintenance every 2-3 weeks to preserve vehicle shine.'
  },
  {
    id: 'interior-detailing',
    name: 'Interior Detailing',
    category: 'detailing',
    price: 5999,
    priceDisplay: 'Rs. 5,999',
    duration: '3 - 4 Hours',
    popular: true,
    badge: 'Popular',
    shortDesc: 'Deep cabin sanitation, seat shampoo extraction, carpet rejuvenation and antibacterial treatment.',
    description: 'Restores vehicle cabin to showroom freshness. Removes deep stains, body oils, dust mites, odors, and food spills using high-temperature steam and enzyme fabric shampoo.',
    features: [
      'Deep High-Suction Vacuum',
      'Fabric / Leather Seat Shampoo & Scrub',
      'Deep Carpet & Floor Mat Extraction',
      'Dashboard & Door Panels Decontamination',
      'Matte Non-Greasy Interior Dressing',
      'Antibacterial Odor & AC Duct Sanitization'
    ],
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Cars needing deep internal hygiene, stain removal, or pre-sale preparation.'
  },
  {
    id: 'exterior-detailing',
    name: 'Exterior Detailing',
    category: 'detailing',
    price: 7500,
    priceDisplay: 'Rs. 7,500',
    duration: '4 - 5 Hours',
    shortDesc: 'Paint decontamination, multi-stage rotary polish, swirl removal and hydrophobic wax seal.',
    description: 'Comprehensive exterior rejuvenation including iron fallout removal, clay bar decontamination, machine cutting compound, ultra-fine finishing polish, and Carnauba wax barrier.',
    features: [
      'Snow Foam Wash & Clay Bar Treatment',
      'Cutting Compound & Swirl Correction',
      'High-Gloss Dual-Action Machine Polish',
      'Premium Hydrophobic Wax Protection',
      'Satin Tire & Fender Liner Dressing',
      'Chrome & Exterior Trim Enhancement'
    ],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Cars with minor swirl marks, dull clear coat, or oxidation from Islamabad sun.'
  },
  {
    id: 'complete-detailing',
    name: 'Complete Detailing',
    category: 'detailing',
    price: 11999,
    priceDisplay: 'Rs. 11,999',
    duration: '6 - 8 Hours',
    shortDesc: 'The ultimate 360-degree rejuvenation combining full interior, exterior, and engine bay detail.',
    description: 'Full-spectrum bumper-to-bumper detailing package restoring every square inch: interior steam extraction, engine bay degreasing, paint defect correction, and protective sealant.',
    features: [
      'Full Deep Interior Detail & Leather Conditioning',
      'Full Multi-Stage Exterior Detail',
      'Complete Engine Bay Cleaning & Dressing',
      'Rotary Machine Compound & Ultra Polish',
      'High-Grade Polymer Wax Sealant',
      'Door Jams, Wheel Wells & Exhaust Tips Polished'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Total car rejuvenation, new acquisitions, or annual deep restoration.'
  },
  {
    id: 'premium-german-detailing',
    name: 'Premium Detailing (German Products)',
    category: 'detailing',
    price: 17999,
    priceDisplay: 'Rs. 17,999',
    duration: '1 Full Day',
    popular: true,
    germanProducts: true,
    badge: 'German Engineered',
    shortDesc: 'Connoisseur-level detailing exclusively using imported German compounds, pads, and ceramic sealants.',
    description: 'The pinnacle of automotive pampering in Islamabad. Exclusively powered by world-leading German detailing chemicals (Koch-Chemie, Sonax Profiline, Menzerna). Delivers mirror-like depth, crystal clarity, and extreme slickness.',
    features: [
      'Full Luxury Interior Detail with German Conditioning Balms',
      'Full Exterior Precision Multi-Stage Correction',
      'Engine Bay Detailing with Moisture-Safe Dressing',
      'Precision Paint Correction (1-2 Step German Micro-abrasives)',
      'German Synthetic Ceramic Sealant Coating',
      'Microfiber Scratchless Safe Wash Protocol'
    ],
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Luxury sedans, German marques (BMW, Mercedes, Audi, Porsche), and flagship SUVs.'
  },
  {
    id: 'ppf-paint-protection-film',
    name: 'Paint Protection Film (PPF)',
    category: 'ppf',
    price: 'Prices on Inspection',
    priceDisplay: 'Prices on Inspection',
    duration: '2 - 4 Days',
    popular: true,
    badge: 'Self-Healing TPU Armor',
    shortDesc: 'Thermoplastic polyurethane (TPU) invisible armor with instant heat-activated self-healing technology.',
    description: 'Shields your vehicle against stone chips on the Islamabad Expressway, highway gravel, malicious key scratches, acidic bird droppings, and intense UV degradation. 10-year warranty against yellowing and bubbling.',
    features: [
      'Protects from Stone Chips, Scratches & Road Debris',
      'Instant Heat Self-Healing Technology (Minor swirls disappear)',
      '99.9% High UV Ray & Oxidation Blocker',
      'Stain & Harsh Chemical / Acid Rain Resistance',
      'Preserves 100% Original Factory Paint & Resale Value',
      'Choice of Ultra-Gloss, Stealth Matte, or Color PPF'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Brand new vehicles, high-value luxury cars, and highway cruisers.'
  },
  {
    id: 'ceramic-coating-9h',
    name: '9H / 10H Ceramic & Graphene Coating',
    category: 'coating',
    price: 'Prices on Inspection',
    priceDisplay: 'Prices on Inspection',
    duration: '1 - 2 Days',
    badge: '10H Deep Candy Gloss',
    shortDesc: 'Permanent nano-ceramic quartz layer providing extreme hydrophobicity and candy-like gloss.',
    description: 'Bonds chemically with clear coat to create a hardened, glass-like shield. Repels mud, water spots, road grime, and harsh UV rays, while dramatically cutting down washing time.',
    features: [
      'Ultra-Hard 9H/10H Nano-Ceramic Barrier',
      'Hyper-Hydrophobic Water & Dirt Repellency (Lotus effect)',
      'Deep Candy Wet Gloss & Optical Clarity',
      'Thermal & Harsh Chemical Resistance',
      'Up to 3 to 5-Year Certified Warranty Protection',
      'Includes Full Multi-Stage Paint Correction Prep'
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Car owners seeking long-term shine, ease of washing, and chemical protection.'
  },
  {
    id: 'uv-black-tints',
    name: 'UV & Black Premium Window Tints',
    category: 'tints',
    price: 'Prices on Inspection',
    priceDisplay: 'Prices on Inspection',
    duration: '2 - 3 Hours',
    badge: 'Solar IR Heat Rejection',
    shortDesc: 'High-performance nano-ceramic window films blocking 99% UV and up to 85% infrared solar heat.',
    description: 'Engineered for harsh Pakistani summer heat. Keeps car interior significantly cooler, protects leather dashboards from cracking, and enhances driving privacy without interfering with mobile/GPS signals.',
    features: [
      'Up to 85% Infrared Heat (IR) Rejection',
      '99% Harmful UV Ray Shielding',
      'Zero Signal Interference (Ceramic Non-Metallic)',
      'Multiple VLT Darkness Levels (5%, 20%, 35%, 50%, 70% Clear)',
      'Anti-Glare Protection for Day & Night Driving',
      'Bubble-free Precision Hand/Plotter Fitment'
    ],
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Every vehicle in Islamabad to protect occupants and cabin from blistering summer sun.'
  }
];

export const SPECIALTY_SERVICES: { id: string; name: string; icon: string; desc: string; startingPrice: string }[] = [
  {
    id: 'paint-correction',
    name: 'Paint Correction',
    icon: 'Sparkles',
    desc: 'Multi-stage machine levelling to eliminate swirl marks, spiderwebs, and hologram buffer trails.',
    startingPrice: 'Rs. 9,999'
  },
  {
    id: 'engine-bay-detail',
    name: 'Engine Bay Detailing',
    icon: 'Cpu',
    desc: 'Steam degreasing of engine components, delicate harness protection, and satin plastic conditioning.',
    startingPrice: 'Rs. 2,500'
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    icon: 'SunMedium',
    desc: 'Wet sanding oxidation, machine polishing, and applying UV ceramic clear coat for crystal night visibility.',
    startingPrice: 'Rs. 2,500'
  },
  {
    id: 'glass-coating',
    name: 'Glass Hydrophobic Coating',
    icon: 'Droplets',
    desc: 'Rain-repellent fluoropolymer coating ensuring high-speed wiperless rain driving safety.',
    startingPrice: 'Rs. 3,500'
  },
  {
    id: 'water-spot-removal',
    name: 'Water Spot & Mineral Removal',
    icon: 'Waves',
    desc: 'Chemical dissolution of stubborn bore-water and acid rain calcifications from glass and paint.',
    startingPrice: 'Rs. 4,000'
  },
  {
    id: 'plastic-trim-restoration',
    name: 'Plastic Trim Restoration',
    icon: 'ShieldCheck',
    desc: 'Deep penetration restoration of sun-faded black bumpers, wiper cowls, and side mouldings.',
    startingPrice: 'Rs. 2,000'
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'addon-glass-coating',
    name: 'Windshield & All Glass Hydrophobic Coating',
    price: 3500,
    priceDisplay: '+Rs. 3,500',
    category: 'Protection',
    description: 'Repels water and road mist for up to 12 months.'
  },
  {
    id: 'addon-engine-bay',
    name: 'Engine Bay Deep Steam Detail & Dressing',
    price: 2500,
    priceDisplay: '+Rs. 2,500',
    category: 'Engine',
    description: 'Safe moisture-isolated steam wash and non-conductive satin finish.'
  },
  {
    id: 'addon-leather-ceramic',
    name: 'Interior Leather & Fabric Ceramic Shield',
    price: 6000,
    priceDisplay: '+Rs. 6,000',
    category: 'Interior',
    description: 'Stain-proof barrier against coffee, sodas, and jean dye transfer.'
  },
  {
    id: 'addon-headlight-restoration',
    name: 'Headlight UV De-yellowing & Ceramic Seal',
    price: 2500,
    priceDisplay: '+Rs. 2,500',
    category: 'Clarity',
    description: 'Restore 100% luminous clarity to cloudy headlights.'
  },
  {
    id: 'addon-wheel-coating',
    name: 'Brake Dust Ceramic Wheel Shield (4 Wheels)',
    price: 4500,
    priceDisplay: '+Rs. 4,500',
    category: 'Wheels',
    description: 'Brake dust washes off with plain water.'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-post-1',
    shortcode: 'BMW7-PPF',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
    caption: 'Full body TPU Self-Healing Paint Protection Film (PPF) installed on BMW 7 Series at our G-9 Markaz Islamabad Studio. Ultimate defense against road gravel, stone chips, and UV oxidation. Contact: 0309 0009904 / 0322 3700777. #EmpireAutoSpa #PPFIslamabad #PaintProtectionFilm #CarDetailingIslamabad #G9Markaz',
    likes: 542,
    comments: 38,
    timestamp: '1 day ago',
    type: 'carousel',
    carModel: 'BMW 7 Series M-Sport',
    serviceDone: 'Full Body Self-Healing PPF',
    isPinned: true
  },
  {
    id: 'ig-post-2',
    shortcode: 'MAYBACH-CERAMIC',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80',
    caption: 'German 10H Nano Quartz Ceramic Coating completed on Mercedes-Maybach. Delivers unmatched candy wet gloss, hyper-hydrophobic water beading, and lasting clear coat protection. #MercedesMaybach #CeramicCoating #GermanProducts #EmpireAutoSpa #IslamabadCars',
    likes: 680,
    comments: 52,
    timestamp: '3 days ago',
    type: 'video',
    carModel: 'Mercedes-Maybach S-Class',
    serviceDone: 'German 10H Ceramic Coating',
    videoDuration: '0:45',
    isPinned: true
  },
  {
    id: 'ig-post-3',
    shortcode: 'CIVIC-MIRACLE-PPF',
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=900&q=80',
    caption: 'High-Impact Front PPF Armor package installed on Honda Civic RS. Bonnet, front bumper, fenders, and side mirrors shielded against highway stone chips on Islamabad Expressway. #HondaCivic #PPF #EmpireAutoSpa #PaintProtection #G9Islamabad',
    likes: 419,
    comments: 24,
    timestamp: '5 days ago',
    type: 'image',
    carModel: 'Honda Civic RS',
    serviceDone: 'Front Impact PPF Armor'
  },
  {
    id: 'ig-post-4',
    shortcode: 'COROLLA-INTERIOR-RESTORE',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
    caption: 'Full interior deep steam sanitization, leather conditioning, and carpet stain extraction. Restores factory matte appearance with zero greasy residue and complete antibacterial treatment. #InteriorDetailing #DeepClean #IslamabadDetailing #EmpireAutoSpa',
    likes: 365,
    comments: 21,
    timestamp: '1 week ago',
    type: 'carousel',
    carModel: 'Toyota Land Cruiser Prado',
    serviceDone: 'Deep Cabin Sanitation'
  },
  {
    id: 'ig-post-5',
    shortcode: 'ENGINE-BAY-TRANSFORM',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=900&q=80',
    caption: 'Engine bay deep steam degreasing with moisture-safe protocol and non-conductive satin protective dressing on Land Cruiser V8. #EngineBayDetail #EmpireAutoSpa #CleanEngine #IslamabadCars',
    likes: 310,
    comments: 18,
    timestamp: '1 week ago',
    type: 'video',
    carModel: 'Toyota Land Cruiser V8 ZX',
    serviceDone: 'Engine Bay Detailing',
    videoDuration: '0:30'
  },
  {
    id: 'ig-post-6',
    shortcode: 'STUDIO-HEX-LIGHTS',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    caption: 'Inside Empire Auto Spa Studio at Street 111, G-9/4 Islamabad. Equipped with precision daylight LED hex grids for defect inspection and master-level PPF installation. Visit us or call 0309 0009904. #DetailingStudio #G9Islamabad #PPFStudio #EmpireAutoSpa',
    likes: 588,
    comments: 46,
    timestamp: '2 weeks ago',
    type: 'image',
    carModel: 'Studio Bay Operations',
    serviceDone: 'Quality Inspection'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-ahmad-awan',
    author: 'Ahmad Awan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '5 days ago',
    verified: true,
    carServiced: 'Audi A6 Quattro',
    service: 'Paint Protection Film (PPF)',
    comment: 'Outstanding PPF and detailing service at Empire Auto Spa G-9 Markaz Islamabad. The precision on edge tucking and clarity of the film is exceptional. Very cooperative and highly skilled staff. The daylight studio lighting makes a huge difference in inspection.',
    likesCount: 14,
    photosCount: 4,
    isNew: true,
    ownerReply: 'Thank you Ahmad Awan for trusting Empire Auto Spa with your vehicle! We take great pride in our certified PPF installation standards.'
  },
  {
    id: 'rev-awan-g',
    author: 'AWAN G',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'a week ago',
    verified: true,
    carServiced: 'Toyota Fortuner Legender',
    service: 'German 10H Ceramic Coating',
    comment: 'Best auto detailing experience in Islamabad. Got full ceramic coating and interior steam treatment done. The gloss finish is unmatched and the paint feels like liquid glass. Highly recommended to all car enthusiasts in Islamabad and Rawalpindi!',
    likesCount: 9,
    photosCount: 1,
    isNew: true
  },
  {
    id: 'rev-mudassir-awan',
    author: 'Mudassir Awan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'a month ago',
    verified: true,
    carServiced: 'BMW 5 Series & Land Cruiser',
    service: 'Complete Detailing & PPF Protection',
    comment: 'Empire Auto Spa is the top detailing studio in G-9 Markaz. Imported German products (Koch-Chemie & Sonax), professional hexagonal lighting setup, and genuine care for the customer\'s vehicle. 5/5 stars for transparency, timeliness, and perfection.',
    likesCount: 22,
    photosCount: 22,
    ownerReply: 'Thank you Mudassir Awan for the wonderful review and photos! Always an honour to detail your vehicles at Empire Auto Spa.'
  },
  {
    id: 'rev-shahmir-khan',
    author: 'Shahmir Khan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 months ago',
    verified: true,
    carServiced: 'Honda Civic RS 11th Gen',
    service: 'Solar IR Nano Ceramic Window Tints',
    comment: 'Got heat-rejection nano ceramic tints and exterior multi-stage polish. The heat blockage in direct Islamabad summer sun is remarkable, cabin stays noticeably cooler. Top quality workmanship in G-9/4.',
    likesCount: 11,
    photosCount: 6
  },
  {
    id: 'rev-daniyal-sheikh',
    author: 'Daniyal Sheikh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 months ago',
    verified: true,
    carServiced: 'Mercedes-Benz C-Class',
    service: 'Premium Detailing (German Products)',
    comment: 'Very satisfied with their German detailing package. Swirl marks from previous washes are completely eliminated and the paint is ultra-slick. Transparent pricing with no hidden surprises. 10/10.',
    likesCount: 8,
    photosCount: 3
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'ppf-vs-ceramic-coating-islamabad',
    title: 'PPF vs Ceramic Coating: Which Protection Does Your Car Need in Islamabad?',
    excerpt: 'Understand the distinct advantages of Paint Protection Film and Ceramic Coatings against extreme sun, stone chips on Kashmir Highway, and bore-water marks in Islamabad.',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    date: 'Aug 24, 2026',
    readTime: '6 min read',
    category: 'PPF Guide',
    tags: ['PPF', 'Ceramic Coating', 'Islamabad Cars', 'Paint Protection'],
    author: {
      name: 'Empire Master Tech',
      role: 'Head of PPF & Detailing',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    },
    content: [
      'Car enthusiasts in Islamabad and Rawalpindi frequently ask whether Paint Protection Film (PPF) or Ceramic Coating is the better investment for their vehicle. While both offer exceptional defense, they serve fundamentally different protective purposes.',
      '1. Paint Protection Film (PPF): The Physical Shield. PPF is a thick, transparent thermoplastic polyurethane (TPU) membrane applied directly over your vehicle panels. Its primary superpower is absorbing kinetic impact: stone chips flying on the Islamabad Expressway, gravel on the Motorway (M-2), door dings, and surface scratches. High-grade PPF features self-healing topcoats that cause swirl marks to disappear automatically under sunlight or warm water.',
      '2. Ceramic Coating: Chemical & Hydrophobic Armor. Ceramic coatings are liquid polymers that chemically bond with the clear coat. They produce extreme hydrophobic properties (water and mud slide off effortlessly) and give an intense deep wet candy gloss. However, ceramic coatings cannot stop physical rock chips.',
      'The Ultimate Solution: For maximum protection, we recommend PPF on high-impact areas (bonnet, front bumper, fenders, and side mirrors) coupled with a multi-year ceramic coating over the entire vehicle body and wheels.'
    ]
  },
  {
    id: 'blog-2',
    slug: 'how-to-prevent-swirl-marks-pakistan',
    title: 'The Truth About Local Car Washes: How Swirl Marks Ruin Your Paint',
    excerpt: 'Why traditional bucket-and-cloth washes at home or fuel stations scratch your car clear coat, and how our safe 2-bucket snow foam method preserves showroom gloss.',
    coverImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
    date: 'Aug 15, 2026',
    readTime: '5 min read',
    category: 'Detailing Tips',
    tags: ['Safe Wash', 'Swirl Marks', 'Paint Correction', 'Detailing'],
    author: {
      name: 'Zaryab Hassan',
      role: 'Studio Operations Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    content: [
      'Over 90% of swirl marks and micro-scratches on cars in Pakistan are caused by incorrect washing techniques. The common habit of having domestic helpers wipe dusty cars with dry rags or single dirty buckets acts like sandpaper across your clear coat.',
      'How Empire Auto Spa Prevents Scratches:',
      '• Contactless Pre-Wash: We first soak the vehicle with high-density pH-neutral snow foam that encapsulates dirt and carries it away before any sponge touches the paint.',
      '• Two-Bucket Grit Guard Protocol: Dedicated rinse and wash buckets with dirt traps ensure microfiber mitts are 100% clean with every pass.',
      '• Ultra-Plush Microfiber Towels: We use 1200 GSM edgeless Korean microfiber towels with drying aids to eliminate friction.'
    ]
  },
  {
    id: 'blog-3',
    slug: 'benefits-of-ceramic-uv-window-tints',
    title: 'Beat Islamabad Heat: Why High-IR Ceramic Window Tints Are Crucial',
    excerpt: 'Discover why ordinary dark tints only provide shade while ceramic nano-films actively repel up to 85% of blistering infrared solar heat and 99% UV radiation.',
    coverImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80',
    date: 'Jul 30, 2026',
    readTime: '4 min read',
    category: 'UV Tints',
    tags: ['UV Tints', 'Heat Rejection', 'Summer Protection', 'Islamabad'],
    author: {
      name: 'Empire Master Tech',
      role: 'Tint & PPF Specialist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    },
    content: [
      'During peak summer months in Islamabad, temperatures inside a parked car can quickly exceed 60°C. Standard cheap dyed window films only darken glass without rejecting heat, causing your air conditioning to work in overdrive and deteriorating leather dashboards.',
      'Nano-ceramic window films utilize microscopic ceramic particles that reflect invisible Infrared (IR) heat waves. Even clear 70% ceramic films can reject over 80% of heat without darkening your windows or obstructing nighttime visibility.',
      'At Empire Auto Spa G-9, we provide computer-cut and plotter-fit ceramic tints with zero bubbling and lifetime adhesion.'
    ]
  }
];

export const GALLERY_ITEMS: ProjectGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'BMW 740Li M-Sport - Full TPU PPF & Interior Coat',
    category: 'PPF',
    car: 'BMW 740Li',
    description: 'Complete bumper-to-bumper wrap with 8.5 mil self-healing TPU PPF. Enhanced with German leather coating inside.',
    beforeImage: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Full Body Self-Healing PPF',
    completionTime: '3 Days',
    featured: true
  },
  {
    id: 'gal-2',
    title: 'Mercedes-Maybach S580 - 10H German Ceramic Coating',
    category: 'Ceramic',
    car: 'Mercedes-Maybach S580',
    description: '3-stage paint correction followed by 2 coats of German 10H ceramic coating and glass hydrophobic sealant.',
    beforeImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Premium Detailing (German Products)',
    completionTime: '2 Days',
    featured: true
  },
  {
    id: 'gal-3',
    title: 'Toyota Corolla Grande - Full Cabin Sanitation & Seat Extraction',
    category: 'Interior',
    car: 'Toyota Corolla Grande',
    description: 'Deep high-temperature steam extraction on beige leather, door panels, and headliner restoration.',
    beforeImage: 'https://images.unsplash.com/photo-1563720223523-491ff04651de?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Interior Detailing (Rs. 5,999)',
    completionTime: '4 Hours'
  },
  {
    id: 'gal-4',
    title: 'Honda Civic RS 11th Gen - Miracle PPF Front End & UV Tints',
    category: 'PPF',
    car: 'Honda Civic RS',
    description: 'Impact protection package (Bonnet, Bumper, Fenders, Headlights, Mirrors) + 85% IR rejection ceramic tints.',
    beforeImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Front Impact PPF + UV Tints',
    completionTime: '1 Day'
  },
  {
    id: 'gal-5',
    title: 'Toyota Land Cruiser V8 - Engine Bay Degreasing & Dressing',
    category: 'Detailing',
    car: 'Land Cruiser ZX V8',
    description: 'Comprehensive moisture-isolated steam decontamination of V8 engine bay, battery terminals, and plastic cowl.',
    beforeImage: 'https://images.unsplash.com/photo-1541348263662-e0c86666cc5a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Engine Bay Detailing (Rs. 2,500)',
    completionTime: '2 Hours'
  },
  {
    id: 'gal-6',
    title: 'Porsche Macan GTS - Swirl Removal & German Quartz Seal',
    category: 'Detailing',
    car: 'Porsche Macan GTS',
    description: '2-step compound and finishing polish with German Menzerna abrasives, finished with hydrophobic wax seal.',
    beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    packageUsed: 'Premium Detailing (German Products)',
    completionTime: '1 Day'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1082',
    customerName: 'Ahmad Raza',
    phone: '+92 300 5544332',
    email: 'ahmad.raza@example.com',
    carMake: 'Audi',
    carModel: 'A6 S-Line',
    carYear: '2023',
    vehicleType: 'sedan',
    serviceId: 'premium-german-detailing',
    serviceName: 'Premium Detailing (German Products)',
    selectedAddOns: ['addon-glass-coating', 'addon-engine-bay'],
    date: '2026-09-03',
    timeSlot: '11:00 AM',
    estimatedTotal: 23999,
    notes: 'Please pay extra attention to light scratches on driver side door.',
    status: 'confirmed',
    createdAt: '2026-09-01T09:30:00Z',
    source: 'website'
  },
  {
    id: 'BK-1083',
    customerName: 'Zubair Chaudhry',
    phone: '+92 321 8899001',
    carMake: 'Toyota',
    carModel: 'Fortuner Legender',
    carYear: '2024',
    vehicleType: 'suv',
    serviceId: 'ppf-paint-protection-film',
    serviceName: 'Paint Protection Film (PPF)',
    selectedAddOns: ['addon-leather-ceramic'],
    date: '2026-09-04',
    timeSlot: '02:00 PM',
    estimatedTotal: 'Quote on Inspection',
    notes: 'Full body TPU self-healing PPF quote requested.',
    status: 'pending',
    createdAt: '2026-09-01T10:15:00Z',
    source: 'whatsapp'
  },
  {
    id: 'BK-1084',
    customerName: 'Danyal Farooq',
    phone: '+92 333 4455667',
    carMake: 'Honda',
    carModel: 'Civic RS',
    carYear: '2023',
    vehicleType: 'sedan',
    serviceId: 'interior-detailing',
    serviceName: 'Interior Detailing',
    selectedAddOns: [],
    date: '2026-09-02',
    timeSlot: '10:00 AM',
    estimatedTotal: 5999,
    status: 'in_progress',
    createdAt: '2026-08-31T16:20:00Z',
    source: 'website'
  },
  {
    id: 'BK-1081',
    customerName: 'Col. Tariq Mahmood',
    phone: '+92 301 2233445',
    carMake: 'Mercedes-Benz',
    carModel: 'E200 AMG',
    carYear: '2022',
    vehicleType: 'luxury',
    serviceId: 'complete-detailing',
    serviceName: 'Complete Detailing',
    selectedAddOns: ['addon-wheel-coating'],
    date: '2026-08-30',
    timeSlot: '03:00 PM',
    estimatedTotal: 16499,
    status: 'completed',
    createdAt: '2026-08-29T11:00:00Z',
    source: 'website'
  }
];
