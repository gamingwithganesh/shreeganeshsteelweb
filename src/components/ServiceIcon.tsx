import React from 'react';
import {
  ThreeDGate,
  ThreeDRailing,
  ThreeDStructural,
  ThreeDLaser,
  ThreeDBolt,
  ThreeDFurniture,
} from './ThreeDIcons';

export default function ServiceIcon({
  name,
  size = 38,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  switch (name) {
    case 'gate':
      return <ThreeDGate size={size} />;
    case 'railing':
      return <ThreeDRailing size={size} />;
    case 'structural':
      return <ThreeDStructural size={size} />;
    case 'laser':
      return <ThreeDLaser size={size} />;
    case 'mobile':
      return <ThreeDBolt size={size} />;
    case 'furniture':
      return <ThreeDFurniture size={size} />;
    default:
      return <ThreeDBolt size={size} />;
  }
}
