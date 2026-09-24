export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: string;
  turnaroundTime: string;
  materials: string[];
  keyApplications: string[];
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'architectural-gates',
    title: 'Architectural Gates & Safety Grills',
    shortDesc: 'Bespoke modern swing, sliding, cantilever gates and designer security window grills.',
    detailedDesc: 'Engineered for residential villas, modern bungalows, and commercial estates. We design and fabricate custom sliding, cantilever, and bi-fold gates utilizing laser-cut sheet inserts, wrought iron motifs, and heavy-wall structural tubing.',
    icon: 'gate',
    turnaroundTime: '7 - 12 days',
    materials: ['Mild Steel (Grade IS 2062)', 'Galvanized Iron (GI)', 'Forged Wrought Iron'],
    keyApplications: ['Main driveway entrance gates', 'Compound security fencing', 'Balcony safety grills', 'Ventilation grates'],
    features: [
      'Precision laser-cut decorative infill patterns',
      'Anti-sag heavy-duty pivot ball bearing hinges',
      'Automation motor bracket integration',
      'Multi-stage zinc epoxy primer and PU weather coating',
    ],
  },
  {
    id: 'ss-railings',
    title: 'Stainless Steel Railings & Balustrades',
    shortDesc: 'Grade 304/316 SS handrails, glass railings with spigots, and spiral stair balustrades.',
    detailedDesc: 'Sleek, maintenance-free balustrade systems for residential stairways, terrace perimeters, and commercial corridors. We offer satin brushed or mirror finishes with precision argon-shielded TIG welds.',
    icon: 'railing',
    turnaroundTime: '4 - 8 days',
    materials: ['Grade 304 Jindal Stainless Steel', 'Grade 316 Marine Stainless Steel', 'Toughened Laminated Glass'],
    keyApplications: ['Internal staircase handrails', 'Balcony perimeter railings', 'Atrium balustrades', 'Ramp handicap grab bars'],
    features: [
      'Pinhole-free argon gas purged TIG welding',
      'Concealed anchor floor flanges with stainless base escutcheons',
      'Compatible with 12mm toughened clear or frosted glass panels',
      'Strict adherence to National Building Code railing height norms',
    ],
  },
  {
    id: 'structural-steel',
    title: 'Heavy Structural Steel Works & Sheds',
    shortDesc: 'Industrial factory sheds, PEB framing, mezzanine floors, canopy roofs, and crane gantries.',
    detailedDesc: 'Certified structural steel fabrication and on-site erection for industrial warehouses, commercial showrooms, and factory sheds. Complete calculation of live, dead, and wind load engineering.',
    icon: 'structural',
    turnaroundTime: '15 - 30 days (Project scale dependent)',
    materials: ['ISMB Beams', 'ISMC Channels', 'SHS / RHS Hollow Sections', 'High-Tensile Foundation Bolts'],
    keyApplications: ['Warehouse roofing sheds', 'Mezzanine storage platforms', 'Industrial crane runways', 'Car parking tensile shades'],
    features: [
      'Structural design validation and CAD shop drawings',
      'Certified welders under AWS D1.1 structural welding code',
      'Ultrasonic & dye-penetrant weld testing available on request',
      'Turnkey installation including foundation grouting and roof sheeting',
    ],
  },
  {
    id: 'laser-cut-panels',
    title: 'CNC Laser Cut Metal Screens & Facades',
    shortDesc: 'Architectural parametric screens, privacy partitions, exterior building facade louvers.',
    detailedDesc: 'Transform architectural interiors and building exteriors with custom laser-perforated steel and aluminum screens. Perfect for sun-shading facades, room partitions, landscape screens, and branding backdrops.',
    icon: 'laser',
    turnaroundTime: '5 - 10 days',
    materials: ['Mild Steel (1.5mm - 8mm)', 'Corten Weathering Steel', 'Aluminum 5052', 'Stainless Steel 304'],
    keyApplications: ['Modern building elevation facades', 'Interior room divider screens', 'Terrace privacy pergolas', 'Illuminated backdrop panels'],
    features: [
      'Fiber laser cutting tolerance ±0.1mm for intricate geometry',
      'Folded edge perimeter returns for structural rigidity',
      'Durable powder coating in fine-texture metallic shades',
      'Subframe bracket design for swift on-site mechanical anchoring',
    ],
  },
  {
    id: 'mobile-welding-repair',
    title: 'On-Site Mobile Welding & Structural Repairs',
    shortDesc: 'Emergency site welding, broken gate hinge repairs, reinforcement stiffening, retrofitting.',
    detailedDesc: 'Equipped with mobile inverter welding units, generators, and certified field technicians. We arrive on-site for rapid crack repair, structural reinforcement, beam modification, and emergency gate restoration.',
    icon: 'mobile',
    turnaroundTime: 'Immediate dispatch / Same day',
    materials: ['On-site joining of all ferrous metals', 'Cast iron repair rods', 'Stainless steel electrodes'],
    keyApplications: ['Broken gate hinges & latch failure', 'Structural column stiffening', 'On-site beam cutouts and modification', 'Factory machinery steel repair'],
    features: [
      'Rapid emergency mobile dispatch across the industrial MIDC zone',
      'Portable high-frequency inverter welding generators',
      'Safe spark shielding and on-site fire prevention protocol',
      'Post-repair grinding and protective touch-up anti-rust coat',
    ],
  },
  {
    id: 'custom-furniture',
    title: 'Industrial & Bespoke Steel Furniture',
    shortDesc: 'Heavy-duty workshop storage racks, minimalist steel dining tables, display fixtures.',
    detailedDesc: 'Combining raw industrial steel strength with minimalist design sensibilities. We build custom workbenches, open shelving units, conference table steel bases, and retail display racks.',
    icon: 'furniture',
    turnaroundTime: '4 - 7 days',
    materials: ['Box Section Steel', 'Cold Rolled Sheets', 'Reclaimed Hardwood Inserts', 'Expanded Metal Mesh'],
    keyApplications: ['Heavy-load warehouse storage racks', 'Industrial chic dining and coffee table bases', 'Retail merchandise displays', 'Tool storage workstations'],
    features: [
      'Smooth hand-finished ground seams without visible weld bead',
      'Integrated leveling glides with floor-protection pads',
      'High-durability powder coat or natural steel clear epoxy clear coat',
      'Custom sizing tailored down to exact millimeter specifications',
    ],
  },
];
