import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Fabrication Product Detail | Shree Ganesh Steel Workshop',
    };
  }
  return {
    title: `${product.name} | Shree Ganesh Steel Workshop`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  return <ProductDetailClient product={product} productId={params.id} />;
}
