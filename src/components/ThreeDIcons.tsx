import React from 'react';

interface Icon3DProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

// 3D Gate Icon (Dimensional isometric security gate with metallic bars, bevel, and depth shadow)
export function ThreeDGate({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="gate_steel_l" x1="12" y1="8" x2="28" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8cc8e8" />
          <stop offset="50%" stopColor="#2c7fae" />
          <stop offset="100%" stopColor="#134767" />
        </linearGradient>
        <linearGradient id="gate_steel_r" x1="36" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#68bae2" />
          <stop offset="50%" stopColor="#216c96" />
          <stop offset="100%" stopColor="#0f344c" />
        </linearGradient>
        <linearGradient id="gate_gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <filter id="gate_shadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#0c2d42" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Pillars (3D Beveled) */}
      <rect x="8" y="10" width="6" height="46" rx="2" fill="url(#gate_steel_l)" filter="url(#gate_shadow)" />
      <rect x="50" y="10" width="6" height="46" rx="2" fill="url(#gate_steel_r)" filter="url(#gate_shadow)" />
      
      {/* Pillar Finials (3D Gold Spheres) */}
      <circle cx="11" cy="8" r="4" fill="url(#gate_gold)" />
      <circle cx="53" cy="8" r="4" fill="url(#gate_gold)" />

      {/* Main Top Arch Beam */}
      <path d="M12 16C24 10 40 10 52 16V22C40 16 24 16 12 22V16Z" fill="url(#gate_steel_l)" filter="url(#gate_shadow)" />

      {/* Left Gate Leaf */}
      <rect x="16" y="20" width="15" height="34" rx="2" fill="#1e293b" opacity="0.1" />
      <path d="M16 20H30V54H16V20Z" fill="url(#gate_steel_l)" />
      <line x1="20" y1="23" x2="20" y2="51" stroke="#a3d4ee" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="23" x2="26" y2="51" stroke="#a3d4ee" strokeWidth="2" strokeLinecap="round" />

      {/* Right Gate Leaf */}
      <path d="M34 20H48V54H34V20Z" fill="url(#gate_steel_r)" />
      <line x1="38" y1="23" x2="38" y2="51" stroke="#8cc8e8" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="23" x2="44" y2="51" stroke="#8cc8e8" strokeWidth="2" strokeLinecap="round" />

      {/* 3D Gate Handles */}
      <circle cx="28" cy="38" r="2.5" fill="url(#gate_gold)" filter="url(#gate_shadow)" />
      <circle cx="36" cy="38" r="2.5" fill="url(#gate_gold)" filter="url(#gate_shadow)" />

      {/* Base Threshold */}
      <rect x="6" y="54" width="52" height="4" rx="1.5" fill="#0f172a" opacity="0.8" />
    </svg>
  );
}

// 3D Railing Icon (Architectural Stainless Steel balustrade with glass reflections)
export function ThreeDRailing({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="ss_chrome" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="glass_panel" x1="10" y1="20" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(104, 186, 226, 0.45)" />
          <stop offset="50%" stopColor="rgba(204, 231, 245, 0.15)" />
          <stop offset="100%" stopColor="rgba(56, 158, 211, 0.35)" />
        </linearGradient>
      </defs>

      {/* Glass Safety Panel (3D Translucent) */}
      <rect x="12" y="22" width="40" height="28" rx="4" fill="url(#glass_panel)" stroke="#a3d4ee" strokeWidth="1.5" />
      {/* Diagonal Glass Sheen Reflection */}
      <path d="M16 48L36 24H42L22 48H16Z" fill="white" opacity="0.4" />

      {/* 3D Top Cylindrical Handrail */}
      <rect x="6" y="14" width="52" height="7" rx="3.5" fill="url(#ss_chrome)" />
      {/* Specular Glare Highlight */}
      <line x1="8" y1="16" x2="56" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

      {/* Vertical SS Newel Posts */}
      <rect x="14" y="20" width="5" height="34" rx="2" fill="url(#ss_chrome)" />
      <rect x="45" y="20" width="5" height="34" rx="2" fill="url(#ss_chrome)" />

      {/* Base Anchor Flanges (3D Flange Caps) */}
      <ellipse cx="16.5" cy="54" rx="5" ry="2.5" fill="#334155" />
      <ellipse cx="47.5" cy="54" rx="5" ry="2.5" fill="#334155" />
      <ellipse cx="16.5" cy="53" rx="4" ry="2" fill="#cbd5e1" />
      <ellipse cx="47.5" cy="53" rx="4" ry="2" fill="#cbd5e1" />
    </svg>
  );
}

// 3D Heavy Structural Beam / Crane Gantry
export function ThreeDStructural({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="beam_top" x1="10" y1="10" x2="54" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4aa8cc" />
          <stop offset="100%" stopColor="#1d6796" />
        </linearGradient>
        <linearGradient id="beam_web" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c577d" />
          <stop offset="100%" stopColor="#0d3148" />
        </linearGradient>
        <linearGradient id="beam_yellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* 3D Isometric I-Beam Flange Front */}
      <path d="M14 12L34 6L52 14L32 20L14 12Z" fill="url(#beam_top)" />
      <path d="M34 6L38 8L56 16L52 14L34 6Z" fill="#174766" />

      {/* Center Web */}
      <path d="M30 19V45L34 47V21L30 19Z" fill="url(#beam_web)" />
      
      {/* Structural Cross-Bracing / PEB Truss */}
      <path d="M16 22L48 46M48 22L16 46" stroke="#389ed3" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      
      {/* Bottom Flange */}
      <path d="M12 44L32 38L50 46L30 52L12 44Z" fill="url(#beam_top)" />
      <path d="M30 52L34 54L52 48L50 46L30 52Z" fill="#13364d" />

      {/* Crane Hook (3D Safety Gold) */}
      <circle cx="32" cy="32" r="4" fill="url(#beam_yellow)" />
      <path d="M32 36C32 41 38 41 38 37" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 3D Laser Cutting Head / Optic Lens
export function ThreeDLaser({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <radialGradient id="laser_core" cx="32" cy="32" r="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="90%" stopColor="#082f49" />
        </radialGradient>
        <radialGradient id="spark_glow" cx="32" cy="32" r="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* 3D Outer Laser Lens Housing Ring */}
      <circle cx="32" cy="32" r="26" fill="url(#laser_core)" />
      <circle cx="32" cy="32" r="23" stroke="#e0f2fe" strokeWidth="2" opacity="0.7" />

      {/* 3D Beveled Inner Chamber */}
      <circle cx="32" cy="32" r="16" fill="#0369a1" />
      <circle cx="32" cy="32" r="14" fill="#024e77" />

      {/* Glowing Focal Point */}
      <circle cx="32" cy="32" r="10" fill="url(#spark_glow)" />
      <circle cx="32" cy="32" r="3.5" fill="#ffffff" />

      {/* Optical Crosshair Beams */}
      <line x1="32" y1="4" x2="32" y2="18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="46" x2="32" y2="60" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="32" x2="18" y2="32" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="46" y1="32" x2="60" y2="32" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 3D Welding Bolt / Inverter Spark (Electric blue & cyan faceted 3D bolt)
export function ThreeDBolt({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="bolt_grad_main" x1="14" y1="6" x2="48" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="bolt_highlight" x1="28" y1="6" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <filter id="bolt_glow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Background Dimensional Ambient Glow */}
      <ellipse cx="32" cy="34" rx="20" ry="24" fill="#38bdf8" opacity="0.15" />

      {/* 3D Faceted Lightning Bolt */}
      <polygon
        points="36 4 12 34 32 34 26 60 52 26 34 26 42 4"
        fill="url(#bolt_grad_main)"
        filter="url(#bolt_glow)"
      />

      {/* Specular Facet Highlight */}
      <polygon
        points="36 4 22 34 32 34 28 52 38 30 33 26 40 4"
        fill="url(#bolt_highlight)"
        opacity="0.85"
      />
    </svg>
  );
}

// 3D Furniture / Industrial Storage Rack
export function ThreeDFurniture({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="rack_steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="shelf_board" x1="10" y1="18" x2="54" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#68bae2" />
          <stop offset="100%" stopColor="#1d6796" />
        </linearGradient>
      </defs>

      {/* 4 Vertical Steel Corner Box Tubes */}
      <rect x="10" y="10" width="4" height="46" rx="1.5" fill="url(#rack_steel)" />
      <rect x="50" y="10" width="4" height="46" rx="1.5" fill="url(#rack_steel)" />
      <rect x="18" y="8" width="4" height="44" rx="1.5" fill="#334155" opacity="0.6" />
      <rect x="42" y="8" width="4" height="44" rx="1.5" fill="#334155" opacity="0.6" />

      {/* Top 3D Shelf Tier */}
      <rect x="8" y="14" width="48" height="5" rx="2" fill="url(#shelf_board)" />
      <line x1="10" y1="15.5" x2="54" y2="15.5" stroke="#e0f2fe" strokeWidth="1" />

      {/* Middle 3D Shelf Tier */}
      <rect x="8" y="28" width="48" height="5" rx="2" fill="url(#shelf_board)" />
      <line x1="10" y1="29.5" x2="54" y2="29.5" stroke="#e0f2fe" strokeWidth="1" />

      {/* Bottom 3D Shelf Tier */}
      <rect x="8" y="44" width="48" height="5" rx="2" fill="url(#shelf_board)" />
      <line x1="10" y1="45.5" x2="54" y2="45.5" stroke="#e0f2fe" strokeWidth="1" />

      {/* X Bracing Wires */}
      <line x1="14" y1="19" x2="50" y2="44" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="19" x2="14" y2="44" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// 3D Industrial Factory Facility
export function ThreeDFactory({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="fact_facade" x1="10" y1="20" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4aa8cc" />
          <stop offset="100%" stopColor="#154c70" />
        </linearGradient>
      </defs>
      {/* Sawtooth Industrial Roof Structure */}
      <path d="M8 52V28L22 18V28L36 18V28L50 18V52H8Z" fill="url(#fact_facade)" />
      {/* Smokestack */}
      <rect x="48" y="10" width="8" height="42" rx="2" fill="#0f172a" />
      <path d="M46 10H58V14H46V10Z" fill="#389ed3" />
      {/* Factory Windows */}
      <rect x="14" y="34" width="6" height="8" rx="1.5" fill="#e0f2fe" opacity="0.9" />
      <rect x="26" y="34" width="6" height="8" rx="1.5" fill="#e0f2fe" opacity="0.9" />
      <rect x="38" y="34" width="6" height="8" rx="1.5" fill="#e0f2fe" opacity="0.9" />
      {/* Roll-up Steel Shutter Door */}
      <rect x="22" y="44" width="14" height="8" rx="1" fill="#cbd5e1" />
      <line x1="22" y1="46" x2="36" y2="46" stroke="#64748b" />
      <line x1="22" y1="49" x2="36" y2="49" stroke="#64748b" />
    </svg>
  );
}

// 3D Shield Icon (10-Year Rust & Quality Guarantee)
export function ThreeDShield({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="shield_gold" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="shield_glare" x1="16" y1="10" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* 3D Shield Outer Shell */}
      <path
        d="M32 6L10 14V30C10 44 20 54 32 58C44 54 54 44 54 30V14L32 6Z"
        fill="url(#shield_gold)"
      />

      {/* Specular Left Reflection */}
      <path
        d="M32 9L13 16V30C13 41.5 21.5 50.5 32 54.5V9Z"
        fill="url(#shield_glare)"
        opacity="0.35"
      />

      {/* Inner Metallic Bevel */}
      <path
        d="M32 12L16 18V29C16 40 23.5 48 32 51.5C40.5 48 48 40 48 29V18L32 12Z"
        fill="#075985"
        opacity="0.5"
      />

      {/* Central Emblem Checkmark */}
      <path
        d="M23 31L29 37L41 23"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3D Dimensional Chronometer / Clock (Lead Time)
export function ThreeDClock({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <radialGradient id="clock_face" cx="32" cy="32" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
        <linearGradient id="clock_rim" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Beveled Rim */}
      <circle cx="32" cy="32" r="26" fill="url(#clock_rim)" />
      {/* Clock Face */}
      <circle cx="32" cy="32" r="21" fill="url(#clock_face)" />

      {/* Hour Markers */}
      <circle cx="32" cy="16" r="1.5" fill="#0284c7" />
      <circle cx="48" cy="32" r="1.5" fill="#0284c7" />
      <circle cx="32" cy="48" r="1.5" fill="#0284c7" />
      <circle cx="16" cy="32" r="1.5" fill="#0284c7" />

      {/* 3D Hands */}
      <line x1="32" y1="32" x2="32" y2="20" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="32" x2="42" y2="32" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

      {/* Center Pivot Jewel */}
      <circle cx="32" cy="32" r="3" fill="#f59e0b" />
    </svg>
  );
}

// 3D Delivery Logistics Truck
export function ThreeDTruck({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="truck_box" x1="8" y1="16" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="truck_cab" x1="42" y1="24" x2="58" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Cargo Box */}
      <rect x="8" y="16" width="34" height="26" rx="3" fill="url(#truck_box)" />
      {/* Cargo Stripe */}
      <line x1="8" y1="29" x2="42" y2="29" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

      {/* Cab */}
      <path d="M42 24H50L56 34V42H42V24Z" fill="url(#truck_cab)" />
      {/* Windshield */}
      <path d="M44 26H49L53 33H44V26Z" fill="#e0f2fe" opacity="0.8" />

      {/* Chassis */}
      <rect x="6" y="42" width="52" height="4" fill="#1e293b" rx="1" />

      {/* 3D Wheels with Chrome Hubcaps */}
      <circle cx="18" cy="46" r="6" fill="#0f172a" />
      <circle cx="18" cy="46" r="2.5" fill="#cbd5e1" />
      <circle cx="48" cy="46" r="6" fill="#0f172a" />
      <circle cx="48" cy="46" r="2.5" fill="#cbd5e1" />
    </svg>
  );
}

// Modern Precision Location Pin Beacon
export function ThreeDMapPin({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="modern_pin_body" x1="16" y1="6" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="modern_pin_glow" x1="20" y1="8" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pin_drop_shadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Radar Target Pulse Rings */}
      <ellipse cx="32" cy="56" rx="14" ry="4.5" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <ellipse cx="32" cy="56" rx="8" ry="2.8" fill="#0f172a" opacity="0.18" />

      {/* Modern Sculpted Location Pin */}
      <path
        d="M32 54C32 54 48 35 48 23C48 11.95 40.84 3 32 3C23.16 3 16 11.95 16 23C16 35 32 54 32 54Z"
        fill="url(#modern_pin_body)"
        filter="url(#pin_drop_shadow)"
      />

      {/* Inner Precision Target Ring */}
      <circle cx="32" cy="23" r="9.5" stroke="url(#modern_pin_glow)" strokeWidth="2.2" fill="none" />
      <circle cx="32" cy="23" r="4" fill="#ffffff" />
      <circle cx="32" cy="23" r="1.8" fill="#0f172a" />
    </svg>
  );
}

// 3D Phone Hotline
export function ThreeDPhone({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="phone_grad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="#e0f2fe" opacity="0.4" />
      <path
        d="M20 18C20 16 22 14 24 14H28C29.5 14 31 15.5 31.5 17L33.5 23C34 24.5 33.5 26 32 27L29.5 28.5C31.5 33 35 36.5 39.5 38.5L41 36C42 34.5 43.5 34 45 34.5L51 36.5C52.5 37 54 38.5 54 40V44C54 46 52 48 50 48C33.4 48 20 34.6 20 18Z"
        fill="url(#phone_grad)"
      />
    </svg>
  );
}

// 3D Precision Ruler & Drafting Triangle
export function ThreeDRuler({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="ruler_metal" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* 3D Triangle Body */}
      <path d="M10 52L54 52L10 8V52Z" fill="url(#ruler_metal)" />
      {/* Triangular Cutout */}
      <path d="M18 46L40 46L18 24V46Z" fill="#f8fbfd" />
      {/* Millimeter Ticks */}
      <line x1="14" y1="52" x2="14" y2="49" stroke="#082f49" strokeWidth="1.5" />
      <line x1="20" y1="52" x2="20" y2="48" stroke="#082f49" strokeWidth="1.5" />
      <line x1="26" y1="52" x2="26" y2="49" stroke="#082f49" strokeWidth="1.5" />
      <line x1="32" y1="52" x2="32" y2="48" stroke="#082f49" strokeWidth="1.5" />
      <line x1="38" y1="52" x2="38" y2="49" stroke="#082f49" strokeWidth="1.5" />
      <line x1="44" y1="52" x2="44" y2="48" stroke="#082f49" strokeWidth="1.5" />
      <line x1="50" y1="52" x2="50" y2="49" stroke="#082f49" strokeWidth="1.5" />
    </svg>
  );
}

// 3D Optical Metallurgy Microscope
export function ThreeDMicroscope({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="micro_barrel" x1="20" y1="12" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      {/* Base */}
      <ellipse cx="32" cy="52" rx="18" ry="5" fill="#0f172a" />
      {/* Stage */}
      <rect x="22" y="38" width="20" height="4" rx="1.5" fill="#38bdf8" />
      {/* Curved Arm */}
      <path d="M42 50C42 34 38 24 32 20" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
      {/* Objective Turret & Eyepiece */}
      <rect x="22" y="14" width="8" height="18" rx="2" fill="url(#micro_barrel)" transform="rotate(-15 22 14)" />
      <circle cx="30" cy="12" r="4" fill="#0284c7" />
    </svg>
  );
}

// 3D Faceted Gold Star (Reviews & Ratings)
export function ThreeDStar({ size = 20, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="star_light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="star_dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77" fill="url(#star_light)" />
      <polygon points="12,2 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="url(#star_dark)" opacity="0.8" />
    </svg>
  );
}

// 3D Success Celebration Check Badge
export function ThreeDSuccess({ size = 56, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <radialGradient id="succ_sphere" cx="26" cy="20" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
      </defs>
      {/* 3D Convex Badge Body */}
      <circle cx="32" cy="32" r="26" fill="url(#succ_sphere)" />
      {/* Inner Bevel */}
      <circle cx="32" cy="32" r="22" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      {/* Checkmark with depth shadow */}
      <path d="M20 33L28 41L44 23" stroke="#082f49" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      <path d="M20 32L28 40L44 22" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 3D Consultation Quote Clipboard
export function ThreeDClipboard({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="board_wood" x1="12" y1="10" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      {/* 3D Board */}
      <rect x="12" y="10" width="40" height="48" rx="4" fill="url(#board_wood)" />
      {/* Paper Stack */}
      <rect x="16" y="16" width="32" height="38" rx="2" fill="#ffffff" />
      {/* Paper Lines */}
      <line x1="20" y1="26" x2="38" y2="26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="33" x2="44" y2="33" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="40" x2="40" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      {/* Top Metallic Clamp */}
      <rect x="24" y="6" width="16" height="8" rx="2" fill="#0f172a" />
      <circle cx="32" cy="10" r="2" fill="#f8fafc" />
    </svg>
  );
}

// 3D Consultation Quote Cart
export function ThreeDCart({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="cart_metal" x1="10" y1="12" x2="54" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Basket Frame */}
      <path d="M10 14H18L24 40H48L54 20H20" stroke="url(#cart_metal)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Inner Mesh Details */}
      <line x1="22" y1="26" x2="50" y2="26" stroke="#7dd3fc" strokeWidth="1.5" />
      <line x1="24" y1="33" x2="46" y2="33" stroke="#7dd3fc" strokeWidth="1.5" />
      {/* 3D Ball Bearing Wheels */}
      <circle cx="26" cy="48" r="5" fill="#0f172a" />
      <circle cx="26" cy="48" r="2" fill="#38bdf8" />
      <circle cx="46" cy="48" r="5" fill="#0f172a" />
      <circle cx="46" cy="48" r="2" fill="#38bdf8" />
    </svg>
  );
}

// 3D Lightbulb (Knowledge & Insights)
export function ThreeDLightbulb({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <radialGradient id="bulb_glow" cx="32" cy="22" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      {/* Glass Bulb Body */}
      <path
        d="M32 6C22 6 14 14 14 24C14 30 18 35 22 39V46C22 47.1 22.9 48 24 48H40C41.1 48 42 47.1 42 46V39C46 35 50 30 50 24C50 14 42 6 32 6Z"
        fill="url(#bulb_glow)"
      />
      {/* Metallic Screw Base */}
      <rect x="25" y="50" width="14" height="4" rx="1.5" fill="#64748b" />
      <rect x="27" y="55" width="10" height="3" rx="1.5" fill="#475569" />
      {/* Filament Specular */}
      <path d="M27 24C27 18 37 18 37 24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// 3D Chat Speech Bubble
export function ThreeDChat({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="chat_grad" x1="12" y1="10" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <path
        d="M52 14H12C8.7 14 6 16.7 6 20V42C6 45.3 8.7 48 12 48H20V56L32 48H52C55.3 48 58 45.3 58 42V20C58 16.7 55.3 14 52 14Z"
        fill="url(#chat_grad)"
      />
      {/* Specular Highlight Sheen */}
      <path d="M12 18H52C53.5 18 54 18.5 54 20C40 24 24 24 10 20C10 18.5 10.5 18 12 18Z" fill="#ffffff" opacity="0.4" />
      <circle cx="22" cy="32" r="3" fill="#ffffff" />
      <circle cx="32" cy="32" r="3" fill="#ffffff" />
      <circle cx="42" cy="32" r="3" fill="#ffffff" />
    </svg>
  );
}

// 3D Master Artisan / Craftsman Avatar
export function ThreeDUser({ size = 48, style }: Icon3DProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <radialGradient id="user_head" cx="30" cy="18" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
        <linearGradient id="user_torso" x1="14" y1="36" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>
      {/* Hardhat / Head */}
      <path d="M20 22C20 15.4 25.4 10 32 10C38.6 10 44 15.4 44 22V24H20V22Z" fill="url(#user_head)" />
      <rect x="18" y="22" width="28" height="4" rx="2" fill="#eab308" />
      {/* Head */}
      <circle cx="32" cy="27" r="7" fill="#fed7aa" />
      {/* 3D Torso */}
      <path d="M14 56C14 44.9 22.9 36 34 36C45.1 36 50 44.9 50 56H14Z" fill="url(#user_torso)" />
      {/* Collar */}
      <path d="M28 36L32 44L36 36H28Z" fill="#ffffff" />
    </svg>
  );
}
