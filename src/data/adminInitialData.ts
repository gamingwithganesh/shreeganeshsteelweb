export type AdminRole = 'superadmin' | 'admin';
export type AdminStatus = 'active' | 'paused';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  status: AdminStatus;
  department: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PromoCardSetting {
  id: string;
  title: string;
  badge: string;
  startingPrice: string;
  link: string;
  description: string;
}

export interface StoreSettings {
  promoBanner: {
    enabled: boolean;
    text: string;
    couponCode: string;
    discountPercent: number;
    statusTag: string;
  };
  promoCards: PromoCardSetting[];
  updatedAt: string;
}

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Ganesh Shende',
    email: 'ganeshb.shende0@gmail.com',
    password: 'ganeshb.shende0@gmail.com',
    role: 'superadmin',
    status: 'active',
    department: 'Workshop Operations & Administration',
    phone: '+91 94230 32182',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  promoBanner: {
    enabled: true,
    text: '⚡ Monsoon Construction Special: Flat 10% Off on Custom Laser Cut Gates & Stainless Balustrades',
    couponCode: 'GANESH2026',
    discountPercent: 10,
    statusTag: 'LIMITED TIME',
  },
  promoCards: [
    {
      id: 'promo-1',
      title: 'Architectural Laser Gates',
      badge: 'TOP SELLER',
      startingPrice: '₹340 / sq.ft',
      link: '/shop',
      description: 'Precision fiber laser CNC cut motifs with multi-stage zinc epoxy undercoat.',
    },
    {
      id: 'promo-2',
      title: 'Stainless Railings (Grade 304)',
      badge: 'POPULAR',
      startingPrice: '₹750 / rft',
      link: '/shop',
      description: 'Mirror-polished SS 304 balustrades with 12mm toughened safety glass.',
    },
    {
      id: 'promo-3',
      title: 'Industrial Pre-Fab Sheds',
      badge: 'B2B CONTRACTS',
      startingPrice: '₹220 / sq.ft',
      link: '/shop',
      description: 'Heavy tubular columns, truss roofing, and rapid on-site erection across Vidarbha.',
    },
  ],
  updatedAt: new Date().toISOString(),
};

export type OrderStatus =
  | 'order_confirmed'
  | 'assigned'
  | 'under_work'
  | 'work_completed'
  | 'out_for_delivery'
  | 'delivered'
  | 'pending'
  | 'material_procured'
  | 'in_fabrication'
  | 'qc_inspection'
  | 'ready_dispatch'
  | 'confirmed'
  | 'cutting'
  | 'welding'
  | 'coating'
  | 'dispatched'
  | 'installed';

export type OrderPriority = 'urgent' | 'standard' | 'low';

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceCategory: string;
  material: string;
  amount: number; // in INR
  status: OrderStatus;
  priority: OrderPriority;
  createdAt: string;
  targetDate: string;
  dimensions?: string;
  notes?: string;
  paymentScreenshot?: string;
  transactionRef?: string;
  customDesignImage?: string;
  customDesignFileName?: string;
  advancePaid?: number;
  balanceDue?: number;
  siteAddress?: string;
  city?: string;
  itemsSummary?: string;
  deliveryMethod?: 'workshop_dispatch' | 'factory_pickup';
  deliveryCharge?: number;
  includeAntiRustPrimer?: boolean;
  coatingCharge?: number;
  includeInstallation?: boolean;
  installationCharge?: number;
  items?: any[];
  siteInfo?: any;
}

export type MachineStatus = 'operational' | 'scheduled_service' | 'maintenance_required';

export interface Machine {
  id: string;
  name: string;
  model: string;
  category: string;
  status: MachineStatus;
  healthPercentage: number;
  lastServiceDate: string;
  nextServiceDue: string;
  hoursRun: number;
  assignedTechnician: string;
  notes?: string;
}

export interface MaintenanceLog {
  id: string;
  machineId: string;
  machineName: string;
  serviceDate: string;
  type: 'preventative' | 'repair' | 'calibration';
  technician: string;
  cost: number;
  status: 'scheduled' | 'in_progress' | 'completed';
  notes: string;
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'SG-2026-089',
    clientName: 'Sunil Patil (Patil Builders)',
    clientPhone: '+91 98230 45120',
    clientEmail: 'sunil@patilbuilders.in',
    serviceCategory: 'Custom Steel Gates',
    material: 'Mild Steel (MS) + Brass CNC Accents',
    amount: 85000,
    advancePaid: 25500,
    balanceDue: 59500,
    status: 'under_work',
    priority: 'urgent',
    createdAt: '2026-09-10',
    targetDate: '2026-09-22',
    dimensions: '14ft Width x 8ft Height',
    city: 'Yavatmal',
    siteAddress: 'Plot 45, MIDC Industrial Area, Yavatmal',
    deliveryMethod: 'workshop_dispatch',
    deliveryCharge: 850,
    includeAntiRustPrimer: true,
    coatingCharge: 5100,
    includeInstallation: true,
    installationCharge: 6500,
    notes: 'Dual swing gate with automated track mounting plates and primer undercoat.',
  },
  {
    id: 'ord-102',
    orderNumber: 'SG-2026-090',
    clientName: 'Dr. Anita Joshi',
    clientPhone: '+91 94220 18742',
    clientEmail: 'anita.joshi@gmail.com',
    serviceCategory: 'SS Balustrade & Glass Railings',
    material: 'Stainless Steel 304 (Hairline Brushed)',
    amount: 142000,
    advancePaid: 42600,
    balanceDue: 99400,
    status: 'work_completed',
    priority: 'standard',
    createdAt: '2026-09-08',
    targetDate: '2026-09-20',
    dimensions: '42 Running Feet',
    city: 'Ghatanji',
    siteAddress: 'Joshi Clinic, Main Market Road, Ghatanji',
    deliveryMethod: 'factory_pickup',
    deliveryCharge: 0,
    includeAntiRustPrimer: false,
    coatingCharge: 0,
    includeInstallation: true,
    installationCharge: 8500,
    notes: 'Spigot base brackets with 12mm toughened laminated glass panels.',
  },
  {
    id: 'ord-103',
    orderNumber: 'SG-2026-091',
    clientName: 'Precision Engineering Hub',
    clientPhone: '+91 99210 99450',
    clientEmail: 'procure@precisionhub.com',
    serviceCategory: 'CNC Fiber Laser Cutting',
    material: 'Mild Steel IS-2062 (8mm Plate)',
    amount: 48000,
    advancePaid: 20000,
    balanceDue: 28000,
    status: 'out_for_delivery',
    priority: 'urgent',
    createdAt: '2026-09-14',
    targetDate: '2026-09-18',
    dimensions: '120 units custom flange profiles',
    city: 'Ghatanji',
    siteAddress: 'Workshop Plant Yard, Ghatanji',
    deliveryMethod: 'factory_pickup',
    deliveryCharge: 0,
    includeAntiRustPrimer: true,
    coatingCharge: 2880,
    includeInstallation: false,
    installationCharge: 0,
    notes: 'Tolerance: +/-0.1mm. High pressure nitrogen cut for clean edges.',
  },
  {
    id: 'ord-104',
    orderNumber: 'SG-2026-092',
    clientName: 'Vikram Deshmukh Farmhouse',
    clientPhone: '+91 98901 23410',
    clientEmail: 'vikram.deshmukh@rediffmail.com',
    serviceCategory: 'Structural PEB & Sheds',
    material: 'Tubular SHS/RHS + Galvanized Sheets',
    amount: 320000,
    advancePaid: 100000,
    balanceDue: 220000,
    status: 'assigned',
    priority: 'standard',
    createdAt: '2026-09-05',
    targetDate: '2026-10-05',
    dimensions: '40ft x 60ft Clear Span',
    city: 'Pandharkawada',
    siteAddress: 'Deshmukh Agro Farm, NH-44 Crossing, Pandharkawada',
    deliveryMethod: 'workshop_dispatch',
    deliveryCharge: 950,
    includeAntiRustPrimer: true,
    coatingCharge: 19200,
    includeInstallation: true,
    installationCharge: 25000,
    notes: 'Site inspection completed. Foundation bolts aligned for column erection.',
  },
  {
    id: 'ord-105',
    orderNumber: 'SG-2026-093',
    clientName: 'Urban Coffee Co.',
    clientPhone: '+91 97654 88312',
    clientEmail: 'hello@urbancoffee.co.in',
    serviceCategory: 'Designer Metal Furniture',
    material: 'Matte Black Powder Coated MS + Teak',
    amount: 62000,
    advancePaid: 20000,
    balanceDue: 42000,
    status: 'pending',
    priority: 'low',
    createdAt: '2026-09-16',
    targetDate: '2026-09-30',
    dimensions: '6 Dining Tables + 12 High Bar Stools',
    city: 'Yavatmal',
    siteAddress: 'Cafe Boulevard, Civil Lines, Yavatmal',
    deliveryMethod: 'workshop_dispatch',
    deliveryCharge: 850,
    includeAntiRustPrimer: true,
    coatingCharge: 3720,
    includeInstallation: false,
    installationCharge: 0,
    notes: 'Waiting for final wood stain selection from client.',
  },
  {
    id: 'ord-106',
    orderNumber: 'SG-2026-094',
    clientName: 'Shree Sai Logistics Park',
    clientPhone: '+91 98221 00922',
    clientEmail: 'ops@shreesailogistics.com',
    serviceCategory: 'On-Site Repair & Welding',
    material: 'Heavy Beam Structural Reinforcement',
    amount: 35000,
    advancePaid: 35000,
    balanceDue: 0,
    status: 'delivered',
    priority: 'urgent',
    createdAt: '2026-09-12',
    targetDate: '2026-09-13',
    dimensions: 'Loading Bay 4 Beam Patching',
    notes: 'Mobile rig truck dispatched. Ultrasonic weld test certified on-site.',
  },
];

export const INITIAL_MACHINES: Machine[] = [
  {
    id: 'mach-1',
    name: '3kW CNC Fiber Laser Cutter',
    model: 'OptiCut Fl-3015 High Precision',
    category: 'Laser Cutting',
    status: 'operational',
    healthPercentage: 98,
    lastServiceDate: '2026-09-02',
    nextServiceDue: '2026-10-02',
    hoursRun: 1420,
    assignedTechnician: 'Dinesh Sawant',
    notes: 'Chiller temperature optimal (19.2°C). Lens focusing calibration verified.',
  },
  {
    id: 'mach-2',
    name: 'Digital Inverter TIG Rigs (Stations 1 & 2)',
    model: 'MasterTig 350 Pulse AC/DC',
    category: 'TIG Welding',
    status: 'operational',
    healthPercentage: 94,
    lastServiceDate: '2026-08-28',
    nextServiceDue: '2026-09-28',
    hoursRun: 2150,
    assignedTechnician: 'Rameshwar Sharma',
    notes: 'High frequency arc starter cleaned. Argon flow meter recalibrated.',
  },
  {
    id: 'mach-3',
    name: '160-Ton Hydraulic Press Brake',
    model: 'HydroBend 3200-160 CNC',
    category: 'Metal Bending',
    status: 'scheduled_service',
    healthPercentage: 88,
    lastServiceDate: '2026-08-15',
    nextServiceDue: '2026-09-19',
    hoursRun: 3410,
    assignedTechnician: 'Dinesh Sawant',
    notes: 'Hydraulic ISO VG 68 oil replacement due in 48 hours.',
  },
  {
    id: 'mach-4',
    name: 'Electrostatic Powder Coating Line',
    model: 'ThermaCoat 200°C Convection Oven',
    category: 'Surface Finishing',
    status: 'operational',
    healthPercentage: 96,
    lastServiceDate: '2026-09-05',
    nextServiceDue: '2026-10-15',
    hoursRun: 1890,
    assignedTechnician: 'Prakash Shinde',
    notes: 'Spray booth filters replaced. Temperature sensor delta within 1.5°C.',
  },
  {
    id: 'mach-5',
    name: 'Mobile Site Welding Truck (Rig 1)',
    model: 'Tata 407 Diesel Gen-Set Mobile Rig',
    category: 'Emergency Site Service',
    status: 'maintenance_required',
    healthPercentage: 74,
    lastServiceDate: '2026-08-10',
    nextServiceDue: '2026-09-15',
    hoursRun: 4200,
    assignedTechnician: 'Ganesh Kadam',
    notes: 'Heavy ground clamp cable connector insulation cracked. Requires immediate replacement.',
  },
];

export const INITIAL_MAINTENANCE_LOGS: MaintenanceLog[] = [
  {
    id: 'maint-1',
    machineId: 'mach-1',
    machineName: '3kW CNC Fiber Laser Cutter',
    serviceDate: '2026-09-02',
    type: 'calibration',
    technician: 'Dinesh Sawant',
    cost: 4500,
    status: 'completed',
    notes: 'Optic lens alignment and collimator purge with high purity nitrogen.',
  },
  {
    id: 'maint-2',
    machineId: 'mach-4',
    machineName: 'Electrostatic Powder Coating Line',
    serviceDate: '2026-09-05',
    type: 'preventative',
    technician: 'Prakash Shinde',
    cost: 8200,
    status: 'completed',
    notes: 'Replaced multi-cyclone recovery cartridge filters and burner nozzles.',
  },
  {
    id: 'maint-3',
    machineId: 'mach-3',
    machineName: '160-Ton Hydraulic Press Brake',
    serviceDate: '2026-09-19',
    type: 'preventative',
    technician: 'Dinesh Sawant',
    cost: 14000,
    status: 'scheduled',
    notes: 'Complete hydraulic flush, manifold seal inspection, and back-gauge recalibration.',
  },
  {
    id: 'maint-4',
    machineId: 'mach-5',
    machineName: 'Mobile Site Welding Truck (Rig 1)',
    serviceDate: '2026-09-17',
    type: 'repair',
    technician: 'Ganesh Kadam',
    cost: 3200,
    status: 'in_progress',
    notes: 'Replacement of 50mm sq copper ground cable and diesel generator oil filter.',
  },
];
