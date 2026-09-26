'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAdmin } from '@/context/AdminContext';
import { ProductItem } from '@/data/products';
import {
  IconUpload,
  IconLink,
  IconImage,
  IconCheck,
  IconPlus,
  IconClose,
  IconInfo,
} from '@/components/Icons';

// Helper to convert Google Drive share links to direct embeddable image stream URLs
function formatGoogleImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Google Drive sharing URL formats:
  // Format 1: https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
  const driveMatch1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch1 && driveMatch1[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch1[1]}&sz=w1200`;
  }

  // Format 2: https://drive.google.com/open?id={FILE_ID} or ?id={FILE_ID}
  const driveMatch2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch2 && driveMatch2[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch2[1]}&sz=w1200`;
  }

  return trimmed;
}

function isGoogleDriveLink(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com') || url.includes('docs.google.com');
}

export default function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductItem['category'] | 'all'>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Add Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductItem['category']>('Gates & Entrances');
  const [material, setMaterial] = useState('Mild Steel (IS 2062 Grade)');
  const [materialGrade, setMaterialGrade] = useState<ProductItem['materialGrade']>('Mild Steel (MS)');
  const [priceType, setPriceType] = useState<'per_sqft' | 'per_unit' | 'per_ft'>('per_sqft');
  const [unitPriceNumeric, setUnitPriceNumeric] = useState(320);
  const [leadTime, setLeadTime] = useState('7 - 12 days');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('/images/product_gate.jpg');
  const [addImageMode, setAddImageMode] = useState<'file' | 'url'>('file');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  // Edit Product Image State
  const [editImageMode, setEditImageMode] = useState<'file' | 'url'>('file');
  const [editImageUrlInput, setEditImageUrlInput] = useState('');
  const [editImageLoadError, setEditImageLoadError] = useState(false);

  const [isCompressing, setIsCompressing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');


  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

  // Client-Side Image Compressor (< 2MB Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          if (isEdit && editingProduct) {
            setEditingProduct({ ...editingProduct, image: compressed });
          } else {
            setImageBase64(compressed);
          }
        }
        setIsCompressing(false);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (val: string, isEdit = false) => {
    const formatted = formatGoogleImageUrl(val);
    if (isEdit) {
      setEditImageUrlInput(val);
      setEditImageLoadError(false);
      if (editingProduct && formatted) {
        setEditingProduct({ ...editingProduct, image: formatted });
      }
    } else {
      setImageUrlInput(val);
      setImageLoadError(false);
      if (formatted) {
        setImageBase64(formatted);
      }
    }
  };

  const categories: Array<ProductItem['category'] | 'all'> = [
    'all',
    'Gates & Entrances',
    'Railings & Balustrades',
    'Industrial Sheds & PEB',
    'CNC Laser Facade Screens',
    'Custom Metal Furniture',
    'Agro & Utility Fabrications',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formattedPrice =
      priceType === 'per_sqft'
        ? `₹${unitPriceNumeric} / sq.ft`
        : priceType === 'per_ft'
        ? `₹${unitPriceNumeric} / running ft`
        : `₹${unitPriceNumeric.toLocaleString('en-IN')}`;

    addProduct({
      name: name.trim(),
      category,
      sector: 'Residential',
      price: formattedPrice,
      priceType,
      unitPriceNumeric,
      material,
      materialGrade,
      leadTime,
      rating: '4.9',
      image: imageBase64,
      galleryImages: [imageBase64],
      reviewsCount: 12,
      description: description.trim() || 'Custom engineered structural metal fabrication.',
      fullDescription: description.trim() || 'Custom engineered structural metal fabrication with precision welding.',
      dimensionsText: '10ft x 6ft',
      inStockStandard: true,
      features: [
        'Anti-corrosion multi-stage primer undercoat',
        'Precision TIG/MIG welding with argon gas purging',
        'Custom dimensional sizing to fit on-site structural openings',
      ],
      availableGauges: ['16 Gauge (1.6 mm)', '14 Gauge (2.0 mm)', '12 Gauge (2.5 mm)'],
      availableFinishes: ['Zinc Epoxy Anti-Rust Primer', 'Matte Black Powder Coating', 'Gloss Polyurethane (PU) Coat'],
      defaultDimensions: { widthFeet: 10, heightFeet: 6 },
      specs: [
        { label: 'Standard Gauge', value: '14 Gauge (2.0mm)' },
        { label: 'Weld Technology', value: 'TIG / MIG Argon Purged' },
      ],
      reviews: [],
    });

    setIsAddModalOpen(false);
    setName('');
    setDescription('');
    setAddImageMode('file');
    setImageUrlInput('');
    setImageLoadError(false);
    setToastMsg(`Product added successfully.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formattedPrice =
      editingProduct.priceType === 'per_sqft'
        ? `₹${editingProduct.unitPriceNumeric} / sq.ft`
        : editingProduct.priceType === 'per_ft'
        ? `₹${editingProduct.unitPriceNumeric} / running ft`
        : `₹${editingProduct.unitPriceNumeric.toLocaleString('en-IN')}`;

    updateProduct(editingProduct.id, {
      ...editingProduct,
      price: formattedPrice,
    });

    setEditingProduct(null);
    setEditImageMode('file');
    setEditImageUrlInput('');
    setEditImageLoadError(false);
    setToastMsg(`Product updated successfully.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Delete "${prodName}"?`)) {
      deleteProduct(id);
      setToastMsg(`Product removed.`);
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#09090b',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Products
          </h1>
          <span
            style={{
              backgroundColor: '#09090b',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            {filteredProducts.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            style={{
              backgroundColor: '#09090b',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <IconPlus size={14} color="#ffffff" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div
          style={{
            backgroundColor: '#09090b',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '0.825rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <IconCheck size={14} color="#ffffff" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 2. Category Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '14px 18px',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            const count = cat === 'all' ? products.length : products.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: isCatActive ? '1px solid #09090b' : '1px solid #e4e4e7',
                  backgroundColor: isCatActive ? '#09090b' : '#ffffff',
                  color: isCatActive ? '#ffffff' : '#71717a',
                  fontSize: '0.78rem',
                  fontWeight: isCatActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{cat === 'all' ? 'All' : cat}</span>
                <span
                  style={{
                    backgroundColor: isCatActive ? '#27272a' : '#f4f4f5',
                    color: isCatActive ? '#ffffff' : '#71717a',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '9999px',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f4f4f5',
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        >
          <svg width="15" height="15" fill="none" stroke="#71717a" strokeWidth="2.2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products by name or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '0.825rem',
              color: '#09090b',
              background: 'transparent',
            }}
          />
        </div>
      </div>

      {/* 3. Products Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
                <th style={{ padding: '10px 18px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ITEM
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  CATEGORY
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  MATERIAL
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  PRICE
                </th>
                <th style={{ padding: '10px 18px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 18px', textAlign: 'center', color: '#71717a', fontSize: '0.825rem' }}>
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: '1px solid #f4f4f5',
                    }}
                  >
                    {/* Item */}
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: '#f4f4f5',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized={Boolean(product.image?.startsWith('http'))}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ fontWeight: 600, color: '#09090b', fontSize: '0.825rem' }}>
                          {product.name}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#52525b' }}>
                      {product.category}
                    </td>

                    {/* Material */}
                    <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#71717a' }}>
                      {product.materialGrade || product.material}
                    </td>

                    {/* Price */}
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#09090b', fontSize: '0.825rem' }}>
                      {product.price}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct({ ...product });
                            if (product.image?.startsWith('http')) {
                              setEditImageMode('url');
                              setEditImageUrlInput(product.image);
                            } else {
                              setEditImageMode('file');
                              setEditImageUrlInput('');
                            }
                            setEditImageLoadError(false);
                          }}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid #e4e4e7',
                            backgroundColor: '#ffffff',
                            color: '#09090b',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id, product.name)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid #e4e4e7',
                            backgroundColor: '#ffffff',
                            color: '#dc2626',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e4e4e7',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                Add Product
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close"
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
              >
                <IconClose size={18} color="#71717a" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '8px' }}>
                  Product Picture
                </label>

                {/* Segmented Mode Switcher */}
                <div
                  style={{
                    display: 'inline-flex',
                    backgroundColor: '#f4f4f5',
                    padding: '3px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    marginBottom: '10px',
                    gap: '4px',
                    width: '100%',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAddImageMode('file')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: addImageMode === 'file' ? '#09090b' : 'transparent',
                      color: addImageMode === 'file' ? '#ffffff' : '#71717a',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <IconUpload size={14} color={addImageMode === 'file' ? '#ffffff' : '#71717a'} />
                    <span>Upload Picture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddImageMode('url')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: addImageMode === 'url' ? '#09090b' : 'transparent',
                      color: addImageMode === 'url' ? '#ffffff' : '#71717a',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <IconLink size={14} color={addImageMode === 'url' ? '#ffffff' : '#71717a'} />
                    <span>Add URL</span>
                  </button>
                </div>

                {/* Option 1: File Upload */}
                {addImageMode === 'file' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#f4f4f5',
                        border: '1px solid #e4e4e7',
                        flexShrink: 0,
                      }}
                    >
                      {/* Standard img tag avoids Next.js parse crashes on local drafts */}
                      <img
                        src={imageBase64 || '/images/product_gate.jpg'}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: '1px solid #09090b',
                        backgroundColor: '#09090b',
                        color: '#ffffff',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <IconUpload size={14} color="#ffffff" />
                      <span>{isCompressing ? 'Compressing...' : 'Upload Picture'}</span>
                    </button>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>PNG, JPG or WebP</span>
                  </div>
                ) : (
                  /* Option 2: Image URL */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: '#f4f4f5',
                          border: '1px solid #e4e4e7',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {imageLoadError ? (
                          <IconImage size={22} color="#a1a1aa" />
                        ) : (
                          <img
                            src={imageBase64 || '/images/product_gate.jpg'}
                            alt="Preview"
                            onError={() => setImageLoadError(true)}
                            onLoad={() => setImageLoadError(false)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <div
                          style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <IconLink size={14} color="#71717a" />
                        </div>
                        <input
                          type="url"
                          placeholder="Paste image link or Google Drive link..."
                          value={imageUrlInput}
                          onChange={(e) => handleImageUrlChange(e.target.value, false)}
                          style={{
                            width: '100%',
                            padding: '8px 12px 8px 30px',
                            borderRadius: '8px',
                            border: imageLoadError ? '1px solid #dc2626' : '1px solid #e4e4e7',
                            backgroundColor: '#fafafa',
                            color: '#09090b',
                            fontSize: '0.78rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>

                    {isGoogleDriveLink(imageUrlInput) && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.72rem',
                          color: '#09090b',
                          backgroundColor: '#f4f4f5',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #e4e4e7',
                        }}
                      >
                        <IconCheck size={12} color="#09090b" />
                        <span>Google Drive link detected and formatted for display.</span>
                      </div>
                    )}

                    {imageLoadError ? (
                      <div style={{ fontSize: '0.72rem', color: '#dc2626' }}>
                        Could not load preview. If using Google Drive, make sure link sharing is set to &ldquo;Anyone with the link can view&rdquo;.
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.71rem', color: '#71717a', lineHeight: 1.4 }}>
                        Paste any direct image link or Google Drive link (make sure file is shared to anyone with link).
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Modern Swing Gate"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    fontSize: '0.825rem',
                    color: '#09090b',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    fontSize: '0.825rem',
                    color: '#09090b',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {categories.filter((c) => c !== 'all').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Pricing Model
                  </label>
                  <select
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.825rem',
                      color: '#09090b',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="per_sqft">Per Sq. Ft</option>
                    <option value="per_ft">Per Running Ft</option>
                    <option value="per_unit">Per Unit</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Unit Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={unitPriceNumeric}
                    onChange={(e) => setUnitPriceNumeric(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.825rem',
                      color: '#09090b',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    backgroundColor: '#ffffff',
                    color: '#09090b',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setEditingProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e4e4e7',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                Edit Product
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                aria-label="Close"
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
              >
                <IconClose size={18} color="#71717a" />
              </button>
            </div>

            <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '8px' }}>
                  Product Picture
                </label>

                {/* Segmented Mode Switcher */}
                <div
                  style={{
                    display: 'inline-flex',
                    backgroundColor: '#f4f4f5',
                    padding: '3px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    marginBottom: '10px',
                    gap: '4px',
                    width: '100%',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setEditImageMode('file')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: editImageMode === 'file' ? '#09090b' : 'transparent',
                      color: editImageMode === 'file' ? '#ffffff' : '#71717a',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <IconUpload size={14} color={editImageMode === 'file' ? '#ffffff' : '#71717a'} />
                    <span>Upload Picture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditImageMode('url')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: editImageMode === 'url' ? '#09090b' : 'transparent',
                      color: editImageMode === 'url' ? '#ffffff' : '#71717a',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <IconLink size={14} color={editImageMode === 'url' ? '#ffffff' : '#71717a'} />
                    <span>Add URL</span>
                  </button>
                </div>

                {/* Option 1: File Upload */}
                {editImageMode === 'file' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#f4f4f5',
                        border: '1px solid #e4e4e7',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={editingProduct.image || '/images/product_gate.jpg'}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: '1px solid #09090b',
                        backgroundColor: '#09090b',
                        color: '#ffffff',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <IconUpload size={14} color="#ffffff" />
                      <span>{isCompressing ? 'Compressing...' : 'Change Picture'}</span>
                    </button>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>PNG, JPG or WebP</span>
                  </div>
                ) : (
                  /* Option 2: Image URL */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: '#f4f4f5',
                          border: '1px solid #e4e4e7',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {editImageLoadError ? (
                          <IconImage size={22} color="#a1a1aa" />
                        ) : (
                          <img
                            src={editingProduct.image || '/images/product_gate.jpg'}
                            alt="Preview"
                            onError={() => setEditImageLoadError(true)}
                            onLoad={() => setEditImageLoadError(false)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <div
                          style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <IconLink size={14} color="#71717a" />
                        </div>
                        <input
                          type="url"
                          placeholder="Paste image link or Google Drive link..."
                          value={editImageUrlInput}
                          onChange={(e) => handleImageUrlChange(e.target.value, true)}
                          style={{
                            width: '100%',
                            padding: '8px 12px 8px 30px',
                            borderRadius: '8px',
                            border: editImageLoadError ? '1px solid #dc2626' : '1px solid #e4e4e7',
                            backgroundColor: '#fafafa',
                            color: '#09090b',
                            fontSize: '0.78rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>

                    {isGoogleDriveLink(editImageUrlInput) && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.72rem',
                          color: '#09090b',
                          backgroundColor: '#f4f4f5',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #e4e4e7',
                        }}
                      >
                        <IconCheck size={12} color="#09090b" />
                        <span>Google Drive link detected and formatted for display.</span>
                      </div>
                    )}

                    {editImageLoadError ? (
                      <div style={{ fontSize: '0.72rem', color: '#dc2626' }}>
                        Could not load preview. If using Google Drive, make sure link sharing is set to &ldquo;Anyone with the link can view&rdquo;.
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.71rem', color: '#71717a', lineHeight: 1.4 }}>
                        Paste any direct image link or Google Drive link (make sure file is shared to anyone with link).
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    fontSize: '0.825rem',
                    color: '#09090b',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Pricing Model
                  </label>
                  <select
                    value={editingProduct.priceType || 'per_sqft'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceType: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.825rem',
                      color: '#09090b',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="per_sqft">Per Sq. Ft</option>
                    <option value="per_ft">Per Running Ft</option>
                    <option value="per_unit">Per Unit</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Unit Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.unitPriceNumeric}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unitPriceNumeric: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.825rem',
                      color: '#09090b',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    backgroundColor: '#ffffff',
                    color: '#09090b',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
