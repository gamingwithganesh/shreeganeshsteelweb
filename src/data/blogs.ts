export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    heading: string;
    paragraphs: string[];
    callout?: string;
  }[];
  keyTakeaways: string[];
}

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Achieving the Perfect Weld: TIG vs MIG for Architectural Steel',
    slug: 'achieving-the-perfect-weld-tig-vs-mig',
    category: 'Welding Techniques',
    date: 'Sep 12, 2026',
    readTime: '4 min read',
    image: '/images/blog_welding_tips.jpg',
    summary: 'Discover when to choose Tungsten Inert Gas (TIG) for pristine aesthetic finishes or Metal Inert Gas (MIG) for structural integrity.',
    author: {
      name: 'Rameshwar Sharma',
      role: 'Chief Metallurgist & Master Welder',
      avatar: 'RS',
    },
    keyTakeaways: [
      'TIG welding provides unmatched aesthetic bead control for luxury railings and furniture.',
      'MIG welding offers superior deposition rates and penetration for structural trusses and heavy gates.',
      'Proper shielding gas selection (Argon vs CO2 mix) directly dictates weld porosity.',
      'Surface pre-cleaning is mandatory to prevent oxide inclusions in architectural stainless steel.',
    ],
    content: [
      {
        heading: 'Understanding the Core Differences',
        paragraphs: [
          'In high-end architectural steel fabrication, the quality of each weld seam does not merely determine structural safety — it defines the visual standard of the finished architectural piece.',
          'MIG (GMAW - Gas Metal Arc Welding) uses a continuously fed consumable wire electrode, making it rapid and deeply penetrating. It excels when assembling heavy box section columns, main driveway gate outer frames, and structural trusses.',
          'TIG (GTAW - Gas Tungsten Arc Welding), on the other hand, utilizes a non-consumable tungsten electrode and requires two-handed coordination. It produces zero spatter and pristine stacked-dime ripples that require minimal post-weld grinding.',
        ],
        callout: 'Rule of thumb: If the joint is exposed to close human touch or eye-level inspection, specify TIG welding with argon purge.',
      },
      {
        heading: 'Heat Input and Distortion Management',
        paragraphs: [
          'One of the greatest challenges when fabricating slender handrails or ornate gates is thermal warping. Stainless steel has higher thermal expansion and lower thermal conductivity than mild steel, concentrating heat in the joint zone.',
          'Using pulse TIG settings allows our workshop fabricators to reduce net heat input by up to 35%, ensuring laser-straight railings without bow or twist.',
        ],
      },
      {
        heading: 'Workshop Recommendation',
        paragraphs: [
          'For indoor staircases and architectural furniture, demand Grade 304 stainless steel joined via TIG with full pickling and passivation. For outdoor gates, MIG root passes followed by cosmetic cap passes provide optimal cost efficiency and structural strength.',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'The Modern Fabrication Blueprint: From CAD Sketch to Finished Steel',
    slug: 'modern-fabrication-blueprint-cad-to-finished-steel',
    category: 'Workshop Craft',
    date: 'Aug 29, 2026',
    readTime: '6 min read',
    image: '/images/blog_fabrication.jpg',
    summary: 'A behind-the-scenes look at how Shree Ganesh Workshop handles precision cutting, bending, jig alignment, and finish coating.',
    author: {
      name: 'Ganesh M. Sutar',
      role: 'Lead Fabrication Engineer',
      avatar: 'GS',
    },
    keyTakeaways: [
      'CAD parametric models eliminate on-site dimensional surprises before steel is cut.',
      'Jig clamping fixtures guarantee sub-millimeter angular precision across duplicate panels.',
      'Multi-step surface prep is critical for powder coat adhesion longevity.',
      'Quality inspection includes weld dye-penetrant checks on load-bearing components.',
    ],
    content: [
      {
        heading: 'Step 1: Digital Modeling and Nesting',
        paragraphs: [
          'Every fabrication at Shree Ganesh begins with precise 2D and 3D CAD modeling. By simulating structural deflection and load points in advance, we optimize wall thicknesses and bracket designs.',
          'Nesting software arranges cut patterns on sheet metal with over 92% material efficiency, keeping project costs competitive while reducing industrial scrap.',
        ],
      },
      {
        heading: 'Step 2: CNC Fiber Laser Cutting and Hydraulic Bending',
        paragraphs: [
          'Our cutting tolerances are held to ±0.1mm using modern fiber laser cutters. This allows seamless interlocking tab-and-slot joinery that squares itself automatically during tack welding.',
          'CNC press brakes then form stiffening return flanges that impart rigidity to door panels without adding excessive dead weight.',
        ],
      },
      {
        heading: 'Step 3: Rigid Jig Clamping and Fit-Up',
        paragraphs: [
          'To ensure diagonal symmetry on large 14-foot gates, assemblies are locked into modular cast-iron welding tables with pneumatic toggle clamps. This prevents thermal contraction pulling the assembly out of square.',
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Preventing Rust & Oxidation in Exterior Coastal Steel Works',
    slug: 'preventing-rust-oxidation-coastal-steel',
    category: 'Maintenance',
    date: 'Aug 14, 2026',
    readTime: '5 min read',
    image: '/images/about_workshop.jpg',
    summary: 'Key techniques including hot-dip galvanizing, zinc phosphate primers, and epoxy clear coats for long-lasting structural steel.',
    author: {
      name: 'Rameshwar Sharma',
      role: 'Chief Metallurgist & Master Welder',
      avatar: 'RS',
    },
    keyTakeaways: [
      'Moisture + airborne chlorides (salts) accelerate electrochemical oxidation by 10x in coastal regions.',
      'Hot-dip galvanizing provides sacrificial galvanic cathodic protection even if the top paint is scratched.',
      'Stainless steel Grades: Use Grade 316 (with Molybdenum) for coastal installations within 5km of the sea.',
      'Avoid trapping water: drainage weep holes in bottom tubes are essential.',
    ],
    content: [
      {
        heading: 'The Chemistry of Steel Corrosion',
        paragraphs: [
          'Mild steel oxidizes when exposed to oxygen and moisture. When chloride ions from industrial smog or coastal maritime air settle on the metal surface, they break down the passive oxide layer, triggering pitting corrosion.',
          'Once rust starts inside a hollow tube, it expands with tremendous force, eventually bursting welds and rupturing seams from within.',
        ],
        callout: 'Always ensure enclosed box sections have bottom weep holes to let condensation escape safely!',
      },
      {
        heading: 'The Duplex Protection System',
        paragraphs: [
          'At Shree Ganesh Workshop, exterior gates and balcony railings undergo our Duplex Anti-Rust Protocol: first, hot-dip galvanizing or zinc-rich primer provides cathodic barrier defense; second, a high-temperature electrostatic polyester powder coat shields the zinc layer.',
          'This synergistic combination delivers up to 2.5 times the service life of galvanizing or painting alone.',
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'High-Tensile PEB Warehouse Trusses & Gantry Systems',
    slug: 'high-tensile-peb-warehouse-trusses-gantry',
    category: 'Industrial PEB',
    date: 'Aug 02, 2026',
    readTime: '5 min read',
    image: '/images/hero_welding.jpg',
    summary: 'Design criteria, wind-load calculations, and heavy-duty crane gantry framing for high-capacity industrial plants.',
    author: {
      name: 'Rameshwar Sharma',
      role: 'Chief Metallurgist & Master Welder',
      avatar: 'RS',
    },
    keyTakeaways: [
      'IS 2062 Grade E250/E350 steel handles dynamic gantry loads without fatigue cracking.',
      'High-strength friction grip (HSFG) bolts ensure zero slippage during high-wind uplift.',
      'Submerged arc welding (SAW) guarantees full penetration on heavy H-beams.',
    ],
    content: [
      {
        heading: 'PEB Structural Engineering Principles',
        paragraphs: [
          'Pre-Engineered Buildings (PEB) revolutionize industrial spaces by tapering steel sections to match exact bending moment diagrams.',
          'Our Ghatanji facility pre-fabricates built-up columns and rafters to AWS D1.1 structural welding specifications.',
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'CNC Fiber Laser Precision: Sub-Millimeter Architectural Gate Facades',
    slug: 'cnc-fiber-laser-precision-gate-facades',
    category: 'Laser & CNC',
    date: 'Jul 21, 2026',
    readTime: '4 min read',
    image: '/images/product_gate.jpg',
    summary: 'How ±0.1mm fiber laser optics sculpt intricate geometric screens, cantilever gates, and modern privacy partitions.',
    author: {
      name: 'Ganesh M. Sutar',
      role: 'Lead Fabrication Engineer',
      avatar: 'GS',
    },
    keyTakeaways: [
      'High-power fiber lasers achieve dross-free edge quality on mild steel up to 25mm thickness.',
      'Nitrogen assist gas prevents edge oxidation for direct powder coating without deburring.',
      'Parametric CAD nesting optimizes yield above 94% on raw Jindal steel sheets.',
    ],
    content: [
      {
        heading: 'Laser Optics and Sheet Metallurgy',
        paragraphs: [
          'Fiber laser cutting eliminates mechanical tool contact, allowing delicate parametric lattice patterns without distortion.',
          'Clean cut edges reduce secondary finishing operations by 60%, delivering mirror-grade joinery for luxury entrances.',
        ],
      },
    ],
  },
];
