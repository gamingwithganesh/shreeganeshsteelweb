export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ReviewItem {
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedProject: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Gates & Entrances' | 'Railings & Balustrades' | 'Industrial Sheds & PEB' | 'CNC Laser Facade Screens' | 'Custom Metal Furniture' | 'Agro & Utility Fabrications';
  sector: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  price: string;
  unitPriceNumeric: number; // base price in INR (either unit price or per sq.ft)
  priceType: 'per_unit' | 'per_sqft' | 'per_ft';
  rating: string;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  fullDescription: string;
  badge?: string;
  material: string;
  materialGrade: 'Mild Steel (MS)' | 'SS Grade 304' | 'SS Grade 316 Marine' | 'Hot-Dip Galvanized (GI)' | 'Corten Steel';
  defaultDimensions: {
    widthFeet: number;
    heightFeet: number;
    lengthFeet?: number;
    breadthFeet?: number;
    depthInches?: number;
  };
  dimensionsText: string;
  leadTime: string;
  inStockStandard: boolean;
  availableGauges: string[];
  availableFinishes: string[];
  features: string[];
  specs: ProductSpecification[];
  reviews: ReviewItem[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Art Deco Ornamental Laser Gate',
    category: 'Gates & Entrances',
    sector: 'Residential',
    price: '₹28,500',
    unitPriceNumeric: 28500,
    priceType: 'per_unit',
    rating: '4.9',
    reviewsCount: 38,
    image: '/images/product_gate.jpg',
    galleryImages: [
      '/images/product_gate.jpg',
      '/images/hero_welding.jpg',
      '/images/product_door.jpg',
    ],
    description: 'Precision laser-cut mild steel with custom welded geometric infill and anti-corrosive primer.',
    fullDescription: 'Custom handcrafted art deco gate engineered from heavy-gauge mild steel box sections with CNC-machined geometric inserts. Features high-tensile hinges, dual-coat zinc phosphate anti-rust treatment, and smooth automated motor compatibility.',
    badge: 'Popular Choice',
    material: 'Mild Steel with Zinc Epoxy Primer',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 12, heightFeet: 6 },
    dimensionsText: 'Standard: 12ft (W) x 6ft (H) — Custom sizes built to order',
    leadTime: '7 - 10 working days',
    inStockStandard: true,
    availableGauges: ['14 Gauge (2.0 mm)', '12 Gauge (2.5 mm)', '10 Gauge (3.2 mm)'],
    availableFinishes: ['Zinc Phosphate Anti-Rust Primer', 'Matte Black Electrostatic Powder Coat', 'Antique Bronze Textured Finish'],
    features: [
      'Dual-pass TIG welded aesthetic joints ground smooth',
      'Anti-sag heavy duty ball bearing pivot hinges rated for 800 kg',
      'Zinc chromate anti-rust undercoat with polyurethane matte finish',
      'Compatible with Italian automatic swing arm gate motors',
    ],
    specs: [
      { label: 'Frame Tube Size', value: '50mm x 50mm x 2.5mm SHS' },
      { label: 'Infill Plate Thickness', value: '3mm Cold Rolled CNC Laser Sheet' },
      { label: 'Hinge Bearing Type', value: 'Double Sealed Ball Bearing Pivot' },
      { label: 'Corrosion Protection', value: 'Epoxy Zinc Primer + 70μm Powder Coat' },
      { label: 'Warranty', value: '5 Years Structural & Anti-Sag Guarantee' },
    ],
    reviews: [
      {
        author: 'Sanjay Deshmukh',
        location: 'Yavatmal (Civil Lines)',
        rating: 5,
        date: 'August 2026',
        comment: 'Installed this gate for my new bungalow. The laser cutting precision is remarkable and the hinges swing with one finger!',
        verifiedProject: '14ft Driveway Gate',
      },
      {
        author: 'Pravin Rathod',
        location: 'Ghatanji',
        rating: 5,
        date: 'July 2026',
        comment: 'Fabricated right here at the Ghatanji workshop. Solid weight, clean welds, and quick on-site fitting team.',
        verifiedProject: 'Farmhouse Main Entrance',
      },
    ],
  },
  {
    id: '2',
    name: 'Architectural Jindal SS 304 Railing',
    category: 'Railings & Balustrades',
    sector: 'Residential',
    price: '₹1,450 / ft',
    unitPriceNumeric: 1450,
    priceType: 'per_ft',
    rating: '4.8',
    reviewsCount: 52,
    image: '/images/product_railing.jpg',
    galleryImages: [
      '/images/product_railing.jpg',
      '/images/product_gate.jpg',
      '/images/hero_welding.jpg',
    ],
    description: 'Grade 304 stainless steel with satin brushed finish and concealed anchor weld joints.',
    fullDescription: 'Architectural grade 304 stainless steel balustrade with 50mm cylindrical top handrail and 3-tier horizontal safety bars. Precision argon-purged TIG welded with invisible ground joins and mirror or satin hairline brushed polish.',
    badge: 'Top Rated',
    material: 'Stainless Steel Grade 304 Jindal Certified',
    materialGrade: 'SS Grade 304',
    defaultDimensions: { widthFeet: 10, heightFeet: 3 },
    dimensionsText: 'Height: 36" or 42", lengths customized per floor/stair run',
    leadTime: '4 - 6 working days',
    inStockStandard: true,
    availableGauges: ['16 Gauge (1.6 mm)', '14 Gauge (2.0 mm)'],
    availableFinishes: ['Satin Hairline Brushed Finish', 'Gloss Mirror Polish Finish', 'PVD Gold Electroplated Titanium Coating'],
    features: [
      'Pure Grade 304 Jindal stainless steel certified pipes',
      'Concealed base-plate anchor bolting with decorative SS cover caps',
      'Child-safe bar spacing adhering to National Building Code (NBC)',
      '10-year corrosion resistance warranty in outdoor environments',
    ],
    specs: [
      { label: 'Top Handrail Diameter', value: '50.8mm Round Pipe (2.0mm thickness)' },
      { label: 'Baluster Posts', value: '38mm Square SS 304 Hollow Section' },
      { label: 'Intermediate Infill', value: '3x 19mm SS Safety Tubes or 10mm Toughened Glass' },
      { label: 'Weld Technology', value: '100% Argon Shielded TIG Welding' },
      { label: 'Testing Standard', value: 'Certified 1.5 kN/m Horizontal Load Resistance' },
    ],
    reviews: [
      {
        author: 'Dr. Nikhil Kulkarni',
        location: 'Nagpur (Wardha Road)',
        rating: 5,
        date: 'September 2026',
        comment: 'We ordered 85 running feet for our hospital staircase. The satin finish is pristine and completely seamless joints.',
        verifiedProject: 'Hospital Balustrade & Ramp Railings',
      },
    ],
  },
  {
    id: '3',
    name: 'Industrial Heavy Duty Storage Rack',
    category: 'Custom Metal Furniture',
    sector: 'Industrial',
    price: '₹9,800',
    unitPriceNumeric: 9800,
    priceType: 'per_unit',
    rating: '5.0',
    reviewsCount: 29,
    image: '/images/product_shelf.jpg',
    galleryImages: [
      '/images/product_shelf.jpg',
      '/images/hero_welding.jpg',
    ],
    description: 'Constructed with 40x40mm box section steel with reinforced wire mesh decks. 350kg capacity.',
    fullDescription: 'Industrial open shelving unit built for heavy-duty workshop, warehouse, or modern industrial loft interiors. Crafted using 40x40mm cold-rolled steel square tubing, cross-braced stability framing, and high-density welded wire mesh shelves.',
    badge: 'Heavy Duty',
    material: 'Cold-Rolled Structural Steel Tubing',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 4, heightFeet: 6, depthInches: 18 },
    dimensionsText: 'Height: 72", Width: 48", Depth: 18" (4 Tiers)',
    leadTime: '3 - 5 working days',
    inStockStandard: true,
    availableGauges: ['14 Gauge (2.0 mm)', '12 Gauge (2.5 mm)'],
    availableFinishes: ['Zinc Phosphate Anti-Rust Primer', 'Textured Industrial Matte Black', 'Safety Yellow & Blue Powder Coat', 'Galvanized Industrial Zinc'],
    features: [
      'Load capacity of 350kg distributed uniformly per shelf (1400kg total)',
      'Scratch-resistant textured matte black powder coating',
      'Adjustable rubberized leveling foot pads included',
      'Modular bolt-together assembly or fully seamless welded frame',
    ],
    specs: [
      { label: 'Upright Posts', value: '40x40x2.0mm Heavy Structural Square Tube' },
      { label: 'Deck Mesh', value: '50x50mm x 4.0mm Welded Wire Grid' },
      { label: 'Shelf Spacing', value: '18 inches clearance per tier' },
      { label: 'Total Load Rating', value: '1,400 Kilograms Maximum Uniform Load' },
    ],
    reviews: [
      {
        author: 'Vikram Patel',
        location: 'Wardha (MIDC)',
        rating: 5,
        date: 'July 2026',
        comment: 'Ordered 6 units for our agro-tools warehouse. Super sturdy, zero wobble even under heavy metal dies.',
        verifiedProject: 'Warehouse Storage Racks',
      },
    ],
  },
  {
    id: '4',
    name: 'Modern Geometric Laser Cut Security Door',
    category: 'Gates & Entrances',
    sector: 'Residential',
    price: '₹34,000',
    unitPriceNumeric: 34000,
    priceType: 'per_unit',
    rating: '4.9',
    reviewsCount: 44,
    image: '/images/product_door.jpg',
    galleryImages: [
      '/images/product_door.jpg',
      '/images/product_gate.jpg',
    ],
    description: 'Solid brushed steel sheet with structural reinforcement, heavy-duty hinges, and multi-point lock.',
    fullDescription: 'High-security architectural front door combining solid 2mm steel plate backing with geometric cutouts and internal reinforced sound/heat deadening core. Fitted with multi-point Euro-profile deadbolt locking mechanisms.',
    badge: 'New Design',
    material: 'High-Tensile Cold Rolled Sheet & Solid Bar Iron',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 3.5, heightFeet: 7 },
    dimensionsText: 'Standard: 7ft (H) x 3.5ft (W) x 2.5" thick (Customizable)',
    leadTime: '10 - 14 working days',
    inStockStandard: false,
    availableGauges: ['12 Gauge (2.5 mm)', '10 Gauge (3.2 mm)'],
    availableFinishes: ['Zinc Epoxy Anti-Rust Primer', 'Automotive Grade Metallic Graphite', 'Baked Copper Patina Finish', 'Textured Matte Charcoal'],
    features: [
      'Multi-point locking box with hardened drill-resistant plates',
      'Weatherproof perimeter rubber acoustic gasket sealing',
      'Full height concealed piano hinge or 3x heavy-duty bearing butt hinges',
      'Thermal baked automotive-grade epoxy coat in customized RAL color tones',
    ],
    specs: [
      { label: 'Leaf Thickness', value: '55mm Double-Skin Insulated Box' },
      { label: 'Laser Detail', value: 'Fiber Laser Precision ±0.05mm cut' },
      { label: 'Lock Hardware', value: 'Godrej / Yale Multi-Point Security Mortise' },
      { label: 'Sound Reduction', value: '28 dB Noise Attenuation Core' },
    ],
    reviews: [
      {
        author: 'Mahesh Gandhe',
        location: 'Amravati',
        rating: 5,
        date: 'August 2026',
        comment: 'Gives the entrance a royal look. Extremely heavy and feels like a bank vault when closed.',
        verifiedProject: 'Villa Security Main Door',
      },
    ],
  },
  {
    id: '5',
    name: 'Pre-Engineered Industrial Warehouse Shed Truss',
    category: 'Industrial Sheds & PEB',
    sector: 'Industrial',
    price: '₹320 / sq.ft',
    unitPriceNumeric: 320,
    priceType: 'per_sqft',
    rating: '5.0',
    reviewsCount: 31,
    image: '/images/hero_welding.jpg',
    galleryImages: [
      '/images/hero_welding.jpg',
      '/images/product_shelf.jpg',
    ],
    description: 'Custom clear-span tubular or lattice trusses with anti-corrosion primer and high wind load compliance.',
    fullDescription: 'Custom engineered clear-span industrial roofing trusses fabricated with structural IS 2062 Grade E250 steel pipes. Designed to withstand 150 km/h wind gusts and heavy crane hoist loads, fabricated right at our Ghatanji shop with turnkey on-site assembly.',
    badge: 'Industrial Masterwork',
    material: 'IS 2062 Grade Structural Steel Tubing & Channels',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 30, heightFeet: 50 },
    dimensionsText: 'Spans: 20ft to 80ft clear-span, lengths up to 300ft',
    leadTime: '15 - 25 working days',
    inStockStandard: false,
    availableGauges: ['Heavy Structural Grade (3.2mm to 6.0mm)'],
    availableFinishes: ['Zinc Chromate Epoxy Primer (Red Oxide)', 'Hot-Dip Galvanized Zinc 85μm', 'Industrial Polyurethane Grey'],
    features: [
      'Complete CAD blueprint engineering with wind & live load calculations',
      'Pre-punched base plates for easy anchor bolt erection',
      'Purlin brackets, sag rods, and cross-bracing included',
      'Turnkey on-site welding and crane lifting crew dispatched across Vidarbha',
    ],
    specs: [
      { label: 'Steel Standard', value: 'IS 2062 Grade E250 / IS 1161 YST-310' },
      { label: 'Wind Load Rating', value: 'Engineered for Zone III (up to 44 m/s)' },
      { label: 'Roof Pitch', value: '1:3 or 1:4 customized drainage slope' },
      { label: 'Galvanizing Option', value: 'IS 2629 Hot-Dip Galvanizing' },
    ],
    reviews: [
      {
        author: 'Anil Agrawal',
        location: 'Pandharkawada',
        rating: 5,
        date: 'June 2026',
        comment: 'Erected our 4,000 sq.ft cotton processing shed in just 3 weeks. Trusses were delivered straight from Ghatanji on flatbeds.',
        verifiedProject: '4,000 sq.ft Agricultural Ginning Shed',
      },
    ],
  },
  {
    id: '6',
    name: 'CNC Laser Cut Architectural Facade Screen',
    category: 'CNC Laser Facade Screens',
    sector: 'Commercial',
    price: '₹480 / sq.ft',
    unitPriceNumeric: 480,
    priceType: 'per_sqft',
    rating: '4.9',
    reviewsCount: 23,
    image: '/images/product_gate.jpg',
    galleryImages: [
      '/images/product_gate.jpg',
      '/images/product_railing.jpg',
    ],
    description: 'Custom parametric jali screens in MS, SS, or Corten steel for exterior sun shading and interior privacy.',
    fullDescription: 'High-definition laser cut metal facade panels engineered for building elevations, balcony privacy enclosures, and interior acoustic feature walls. Custom CAD vector designs cut with fiber laser and finished with UV-resistant electrostatic powder coating.',
    badge: 'Architectural Trend',
    material: 'Cold Rolled Sheet / SS 304 / Corten Steel',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 4, heightFeet: 8 },
    dimensionsText: 'Standard sheets: 8ft x 4ft, customizable modular tessellations',
    leadTime: '5 - 7 working days',
    inStockStandard: true,
    availableGauges: ['14 Gauge (2.0 mm)', '12 Gauge (2.5 mm)', '10 Gauge (3.2 mm)'],
    availableFinishes: ['UV-Resistant Architectural Powder Coat', 'Rust-Proof Corten Natural Patina', 'Brushed SS with Clear Coat'],
    features: [
      'Over 250+ parametric, Islamic jali, floral, and contemporary geometric patterns',
      'Hemmed and folded perimeter flanges for rigid bolt-on installation',
      'Provides 40% to 70% solar heat shading without obstructing daylight',
      'Zero distortion fiber laser cutting with burr-free chamfered edges',
    ],
    specs: [
      { label: 'Cutting Tolerance', value: '±0.05 mm Fiber Laser Head' },
      { label: 'Mounting Provision', value: 'Pre-slotted 10mm mounting holes along perimeter' },
      { label: 'Max Panel Size', value: '10ft x 5ft seamless single sheet' },
      { label: 'Wind Deflection', value: 'Reinforced with rear stiffener ribs' },
    ],
    reviews: [
      {
        author: 'Ar. Snehal Joshi',
        location: 'Akola',
        rating: 5,
        date: 'July 2026',
        comment: 'Specified these screens for a commercial complex in Akola. Precision cutting matched our AutoCAD elevation drawings perfectly.',
        verifiedProject: 'Commercial Showroom Elevation',
      },
    ],
  },
  {
    id: '7',
    name: 'Heavy Duty Tractor Trolley Tailgate & Cattle Gate',
    category: 'Agro & Utility Fabrications',
    sector: 'Agricultural',
    price: '₹16,500',
    unitPriceNumeric: 16500,
    priceType: 'per_unit',
    rating: '5.0',
    reviewsCount: 41,
    image: '/images/hero_welding.jpg',
    galleryImages: [
      '/images/hero_welding.jpg',
      '/images/product_gate.jpg',
    ],
    description: 'Reinforced channel iron frame with heavy locking pins and dual swinging utility hinges.',
    fullDescription: 'Engineered specifically for agricultural transport and rural farm operations across Vidarbha. Fabricated using heavy ISMC 75 channel iron, 10-gauge corrugated steel deck, and forged drop-forged locking pins that stay secured on rough dirt farm roads.',
    badge: 'Farm Proven',
    material: 'High-Tensile Structural Channel Iron & Steel Plate',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 6, heightFeet: 3.5 },
    dimensionsText: 'Width: 6ft, Height: 42", fits all standard Vidarbha trolleys',
    leadTime: '3 - 5 working days',
    inStockStandard: true,
    availableGauges: ['10 Gauge (3.2 mm)', 'Heavy 4.0 mm Industrial Plate'],
    availableFinishes: ['Tractor Red Enamel Paint', 'Anti-Corrosive Zinc Oxide Primer', 'Deep Olive Green Coating'],
    features: [
      'Forged locking cotter pins with retaining chains',
      'Double reinforced corner gussets to withstand grain and fertilizer load pressure',
      'Dual swing action: can open outwards or swing completely downwards',
      'Built by master rural fabricators with 25+ years field experience',
    ],
    specs: [
      { label: 'Frame Channel', value: 'ISMC 75 x 40 mm Structural Steel' },
      { label: 'Infill Plate', value: '3.2mm Pressed Rigidity Corrugated Sheet' },
      { label: 'Hinge Pins', value: '25mm Solid Bright Steel Bar with Grease Nipples' },
      { label: 'Load Impact', value: 'Tested for 8 Metric Ton crop load' },
    ],
    reviews: [
      {
        author: 'Gajananrao Patil',
        location: 'Ghatanji (Rural)',
        rating: 5,
        date: 'August 2026',
        comment: 'Best quality welding in Yavatmal district. Carrying heavy cotton bales and soybean harvests with zero bending.',
        verifiedProject: 'Tractor Trolley Custom Gate',
      },
    ],
  },
  {
    id: '8',
    name: 'Minimalist Live-Edge Steel Conference Table Base',
    category: 'Custom Metal Furniture',
    sector: 'Commercial',
    price: '₹18,500',
    unitPriceNumeric: 18500,
    priceType: 'per_unit',
    rating: '4.8',
    reviewsCount: 19,
    image: '/images/product_shelf.jpg',
    galleryImages: [
      '/images/product_shelf.jpg',
      '/images/product_door.jpg',
    ],
    description: 'Architectural geometric spider leg steel table base engineered for heavy natural teak or marble slabs.',
    fullDescription: 'Custom architectural furniture frame constructed with 80x40mm seamless steel rect tubing. Miter-cut at 45 degree precision angles with fully ground seamless welds, engineered to support up to 450kg natural marble or solid teak wood tabletop slabs.',
    badge: 'Luxury Finish',
    material: 'Precision Cold Drawn Heavy Steel Tubing',
    materialGrade: 'Mild Steel (MS)',
    defaultDimensions: { widthFeet: 6, heightFeet: 2.5, depthInches: 36 },
    dimensionsText: 'Length: 6ft, Width: 3ft, Height: 29.5" (Custom sizes)',
    leadTime: '5 - 8 working days',
    inStockStandard: true,
    availableGauges: ['12 Gauge (2.5 mm)', '10 Gauge (3.2 mm)'],
    availableFinishes: ['Matte Velvet Black Powder Coat', 'Brushed Raw Steel with Clear Matte Epoxy', 'Warm Brass Electroplating'],
    features: [
      'Slotted top mounting plates allow natural timber seasonal expansion',
      'Heavy duty concealed M10 floor leveling adjusters with felt cushions',
      'Weight capacity up to 450 kg without center sag',
      'Available in Spider, Trapeze, U-shape, or A-frame architectural profiles',
    ],
    specs: [
      { label: 'Tube Dimension', value: '80mm x 40mm x 2.5mm Rectangular Hollow Section' },
      { label: 'Mounting Plate', value: '6mm Solid Steel with 12x slotted screw apertures' },
      { label: 'Coating', value: 'Super-durable architectural powder coat baked at 210°C' },
      { label: 'Max Table Slab', value: 'Up to 10ft x 4ft solid wood or granite' },
    ],
    reviews: [
      {
        author: 'Vikrant Sawant',
        location: 'Nagpur (Dharampeth)',
        rating: 5,
        date: 'May 2026',
        comment: 'Purchased for our law firm conference room. Holds our 300kg teak tabletop rock steady with zero vibrations.',
        verifiedProject: '8-Seater Boardroom Table Frame',
      },
    ],
  },
];

export const CATEGORIES = [
  'All',
  'Gates & Entrances',
  'Railings & Balustrades',
  'Industrial Sheds & PEB',
  'CNC Laser Facade Screens',
  'Custom Metal Furniture',
  'Agro & Utility Fabrications',
] as const;

export const SECTORS = ['All Sectors', 'Residential', 'Commercial', 'Industrial', 'Agricultural'] as const;

export const MATERIAL_GRADES = [
  'All Materials',
  'Mild Steel (MS)',
  'SS Grade 304',
  'SS Grade 316 Marine',
  'Hot-Dip Galvanized (GI)',
  'Corten Steel',
] as const;
