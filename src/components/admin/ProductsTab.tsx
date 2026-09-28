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

// Helper to safely parse any dimensional input (e.g. "2", "2.5", "2.5f", "2.5ft", "2,5", "0.75")
function parseDimensionValue(input: string | number | undefined | null): number {
  if (input === undefined || input === null) return 0;
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  const str = input.toString().trim().replace(',', '.');
  if (!str) return 0;
  const match = str.match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!match) return 0;
  const parsed = parseFloat(match[0]);
  return isNaN(parsed) ? 0 : parsed;
}

// Helper to convert Google Drive share links to direct embeddable image stream URLs
function formatGoogleImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  const driveMatch1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch1 && driveMatch1[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch1[1]}&sz=w1200`;
  }

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
  
  // Price & Quantity State
  const [priceType, setPriceType] = useState<ProductItem['priceType']>('per_unit');
  const [unitPriceNumeric, setUnitPriceNumeric] = useState<string>('2500');
  const [minQuantity, setMinQuantity] = useState<string>('1');
  const [stockQuantity, setStockQuantity] = useState<string>('25');
  const [unitLabel, setUnitLabel] = useState<string>('Piece');
  
  // Dimensions State
  const [lengthFeet, setLengthFeet] = useState<string>('10');
  const [heightFeet, setHeightFeet] = useState<string>('6');
  const [breadthFeet, setBreadthFeet] = useState<string>('3');
  const [dimensionsText, setDimensionsText] = useState('Standard: 10ft (L) x 6ft (H) x 3ft (B) — Custom sizes built to order');
  
  const [leadTime, setLeadTime] = useState('7 - 12 days');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('/images/product_gate.jpg');
  const [addImageMode, setAddImageMode] = useState<'file' | 'url'>('file');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  // Edit Product Form State
  const [editPriceType, setEditPriceType] = useState<ProductItem['priceType']>('per_unit');
  const [editPriceInput, setEditPriceInput] = useState<string>('2500');
  const [editMinQty, setEditMinQty] = useState<string>('1');
  const [editStockQty, setEditStockQty] = useState<string>('25');
  const [editUnitLabel, setEditUnitLabel] = useState<string>('Piece');
  const [editLength, setEditLength] = useState<string>('10');
  const [editHeight, setEditHeight] = useState<string>('6');
  const [editBreadth, setEditBreadth] = useState<string>('3');
  const [editImageMode, setEditImageMode] = useState<'file' | 'url'>('file');
  const [editImageUrlInput, setEditImageUrlInput] = useState('');
  const [editImageLoadError, setEditImageLoadError] = useState(false);

  const [isCompressing, setIsCompressing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

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

  const materialGrades: Array<ProductItem['materialGrade']> = [
    'Mild Steel (MS)',
    'SS Grade 304',
    'SS Grade 316 Marine',
    'Hot-Dip Galvanized (GI)',
    'Corten Steel',
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

  const handleAddLengthChange = (valStr: string) => {
    setLengthFeet(valStr);
    const lDisplay = valStr.trim() || '0';
    const hDisplay = heightFeet.trim() || '0';
    const bDisplay = breadthFeet.trim() || '0';
    setDimensionsText(`Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`);
  };

  const handleAddHeightChange = (valStr: string) => {
    setHeightFeet(valStr);
    const lDisplay = lengthFeet.trim() || '0';
    const hDisplay = valStr.trim() || '0';
    const bDisplay = breadthFeet.trim() || '0';
    setDimensionsText(`Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`);
  };

  const handleAddBreadthChange = (valStr: string) => {
    setBreadthFeet(valStr);
    const lDisplay = lengthFeet.trim() || '0';
    const hDisplay = heightFeet.trim() || '0';
    const bDisplay = valStr.trim() || '0';
    setDimensionsText(`Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numericPrice = parseFloat(unitPriceNumeric) || 0;
    const minQtyNum = parseInt(minQuantity) || 1;
    const stockQtyNum = parseInt(stockQuantity) || 0;

    let formattedPrice = `₹${numericPrice.toLocaleString('en-IN')}`;
    if (priceType === 'per_sqft') formattedPrice = `₹${numericPrice} / sq.ft`;
    else if (priceType === 'per_ft') formattedPrice = `₹${numericPrice} / running ft`;
    else if (priceType === 'per_kg') formattedPrice = `₹${numericPrice} / kg`;
    else if (priceType === 'per_set') formattedPrice = `₹${numericPrice.toLocaleString('en-IN')} / set`;
    else if (priceType === 'per_unit') formattedPrice = `₹${numericPrice.toLocaleString('en-IN')} / ${unitLabel || 'pc'}`;

    const numL = parseDimensionValue(lengthFeet) || 10;
    const numH = parseDimensionValue(heightFeet) || 6;
    const numB = parseDimensionValue(breadthFeet) || 3;

    const finalDimensionsText =
      dimensionsText.trim() ||
      `Standard: ${numL}ft (L) x ${numH}ft (H) x ${numB}ft (B) — Custom sizes built to order`;

    addProduct({
      name: name.trim(),
      category,
      sector: 'Residential',
      price: formattedPrice,
      priceType,
      unitPriceNumeric: numericPrice,
      minQuantity: minQtyNum,
      stockQuantity: stockQtyNum,
      unitLabel: unitLabel.trim() || 'Piece',
      material,
      materialGrade,
      leadTime: leadTime.trim() || '7 - 12 days',
      rating: '4.9',
      image: imageBase64,
      galleryImages: [imageBase64],
      reviewsCount: 12,
      description: description.trim() || 'Custom engineered structural metal fabrication.',
      fullDescription: description.trim() || 'Custom engineered structural metal fabrication with precision welding.',
      dimensionsText: finalDimensionsText,
      inStockStandard: stockQtyNum > 0,
      features: [
        'Anti-corrosion multi-stage primer undercoat',
        'Precision TIG/MIG welding with argon gas purging',
        'Custom dimensional sizing to fit on-site structural openings',
      ],
      availableGauges: ['16 Gauge (1.6 mm)', '14 Gauge (2.0 mm)', '12 Gauge (2.5 mm)'],
      availableFinishes: ['Zinc Epoxy Anti-Rust Primer', 'Matte Black Powder Coating', 'Gloss Polyurethane (PU) Coat'],
      defaultDimensions: {
        widthFeet: numB || numL,
        heightFeet: numH,
        lengthFeet: numL,
        breadthFeet: numB,
      },
      specs: [
        { label: 'Standard Dimensions (L×H×B)', value: `${numL}ft (L) x ${numH}ft (H) x ${numB}ft (B)` },
        { label: 'Minimum Order Quantity', value: `${minQtyNum} ${unitLabel || 'Units'}` },
        { label: 'Weld Technology', value: 'TIG / MIG Argon Purged' },
      ],
      reviews: [],
    });

    setIsAddModalOpen(false);
    setName('');
    setDescription('');
    setUnitPriceNumeric('2500');
    setMinQuantity('1');
    setStockQuantity('25');
    setLengthFeet('10');
    setHeightFeet('6');
    setBreadthFeet('3');
    setDimensionsText('Standard: 10ft (L) x 6ft (H) x 3ft (B) — Custom sizes built to order');
    setAddImageMode('file');
    setImageUrlInput('');
    setImageLoadError(false);
    setToastMsg(`Product added successfully.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const openEditModal = (product: ProductItem) => {
    const l = product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet ?? 10;
    const h = product.defaultDimensions?.heightFeet ?? 6;
    const b = product.defaultDimensions?.breadthFeet ?? product.defaultDimensions?.depthInches ?? product.defaultDimensions?.widthFeet ?? 3;
    const dText = product.dimensionsText || `Standard: ${l}ft (L) x ${h}ft (H) x ${b}ft (B)`;

    setEditPriceType(product.priceType || 'per_unit');
    setEditPriceInput(String(product.unitPriceNumeric || 0));
    setEditMinQty(String(product.minQuantity || 1));
    setEditStockQty(String(product.stockQuantity || 10));
    setEditUnitLabel(product.unitLabel || 'Piece');
    setEditLength(String(l));
    setEditHeight(String(h));
    setEditBreadth(String(b));

    setEditingProduct({
      ...product,
      dimensionsText: dText,
      defaultDimensions: {
        ...product.defaultDimensions,
        lengthFeet: l,
        heightFeet: h,
        breadthFeet: b,
        widthFeet: b,
      },
    });

    if (product.image?.startsWith('http')) {
      setEditImageMode('url');
      setEditImageUrlInput(product.image);
    } else {
      setEditImageMode('file');
      setEditImageUrlInput('');
    }
    setEditImageLoadError(false);
  };

  const handleEditLengthChange = (valStr: string) => {
    setEditLength(valStr);
    if (editingProduct) {
      const lDisplay = valStr.trim() || '0';
      const hDisplay = editHeight.trim() || '0';
      const bDisplay = editBreadth.trim() || '0';
      setEditingProduct({
        ...editingProduct,
        dimensionsText: `Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`,
      });
    }
  };

  const handleEditHeightChange = (valStr: string) => {
    setEditHeight(valStr);
    if (editingProduct) {
      const lDisplay = editLength.trim() || '0';
      const hDisplay = valStr.trim() || '0';
      const bDisplay = editBreadth.trim() || '0';
      setEditingProduct({
        ...editingProduct,
        dimensionsText: `Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`,
      });
    }
  };

  const handleEditBreadthChange = (valStr: string) => {
    setEditBreadth(valStr);
    if (editingProduct) {
      const lDisplay = editLength.trim() || '0';
      const hDisplay = editHeight.trim() || '0';
      const bDisplay = valStr.trim() || '0';
      setEditingProduct({
        ...editingProduct,
        dimensionsText: `Standard: ${lDisplay}ft (L) x ${hDisplay}ft (H) x ${bDisplay}ft (B) — Custom sizes built to order`,
      });
    }
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const numericPrice = parseFloat(editPriceInput) || 0;
    const minQtyNum = parseInt(editMinQty) || 1;
    const stockQtyNum = parseInt(editStockQty) || 0;

    let formattedPrice = `₹${numericPrice.toLocaleString('en-IN')}`;
    if (editPriceType === 'per_sqft') formattedPrice = `₹${numericPrice} / sq.ft`;
    else if (editPriceType === 'per_ft') formattedPrice = `₹${numericPrice} / running ft`;
    else if (editPriceType === 'per_kg') formattedPrice = `₹${numericPrice} / kg`;
    else if (editPriceType === 'per_set') formattedPrice = `₹${numericPrice.toLocaleString('en-IN')} / set`;
    else if (editPriceType === 'per_unit') formattedPrice = `₹${numericPrice.toLocaleString('en-IN')} / ${editUnitLabel || 'pc'}`;

    const numL = parseDimensionValue(editLength) || 10;
    const numH = parseDimensionValue(editHeight) || 6;
    const numB = parseDimensionValue(editBreadth) || 3;

    const finalDimensionsText =
      editingProduct.dimensionsText?.trim() ||
      `Standard: ${numL}ft (L) x ${numH}ft (H) x ${numB}ft (B) — Custom sizes built to order`;

    updateProduct(editingProduct.id, {
      ...editingProduct,
      priceType: editPriceType,
      unitPriceNumeric: numericPrice,
      minQuantity: minQtyNum,
      stockQuantity: stockQtyNum,
      unitLabel: editUnitLabel.trim() || 'Piece',
      price: formattedPrice,
      dimensionsText: finalDimensionsText,
      inStockStandard: stockQtyNum > 0,
      defaultDimensions: {
        ...editingProduct.defaultDimensions,
        widthFeet: numB || numL,
        heightFeet: numH,
        lengthFeet: numL,
        breadthFeet: numB,
      },
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
        <div className="admin-tab-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
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
            placeholder="Search products by name, category, or material..."
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
                <th style={{ padding: '10px 18px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ITEM
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  CATEGORY
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  MEASUREMENTS (L×H×B)
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  PRICE &amp; QUANTITY
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
                filteredProducts.map((product) => {
                  const l = product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet ?? 10;
                  const h = product.defaultDimensions?.heightFeet ?? 6;
                  const b = product.defaultDimensions?.breadthFeet ?? product.defaultDimensions?.depthInches ?? product.defaultDimensions?.widthFeet ?? 3;

                  return (
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
                              width: '38px',
                              height: '38px',
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
                          <div>
                            <div style={{ fontWeight: 600, color: '#09090b', fontSize: '0.825rem' }}>
                              {product.name}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#71717a' }}>
                              {product.materialGrade || product.material}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#52525b' }}>
                        {product.category}
                      </td>

                      {/* Measurements (L, H, B) */}
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#f4f4f5',
                            color: '#09090b',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e4e4e7',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {l}ft (L) × {h}ft (H) × {b}ft (B)
                        </span>
                      </td>

                      {/* Price & Quantity */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#09090b', fontSize: '0.825rem' }}>
                          {product.price}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#71717a', marginTop: '2px' }}>
                          {product.stockQuantity !== undefined ? `Stock: ${product.stockQuantity} ${product.unitLabel || 'units'}` : 'Standard Stock'}
                          {product.minQuantity && product.minQuantity > 1 ? ` • Min: ${product.minQuantity}` : ''}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
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
                  );
                })
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
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Add Product
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '2px 0 0 0' }}>
                  Set up dimensions (L, H, B), pricing basis, and quantity limits.
                </p>
              </div>
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
              {/* Product Picture */}
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

                {/* File / URL switcher */}
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
                  </div>
                )}
              </div>

              {/* Product Name & Category */}
              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Laser Gate / Custom Trolley"
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
              </div>

              {/* SECTION: PRICE & QUANTITY SETTINGS */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    💰 Price &amp; Quantity Settings
                  </label>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    ₹{unitPriceNumeric || '0'} / {unitLabel || 'unit'} (Min: {minQuantity || '1'})
                  </span>
                </div>

                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Pricing Basis / Model *
                    </label>
                    <select
                      value={priceType}
                      onChange={(e) => {
                        const pt = e.target.value as ProductItem['priceType'];
                        setPriceType(pt);
                        if (pt === 'per_unit') setUnitLabel('Piece');
                        else if (pt === 'per_sqft') setUnitLabel('Sq.Ft');
                        else if (pt === 'per_ft') setUnitLabel('Running Ft');
                        else if (pt === 'per_kg') setUnitLabel('Kg');
                        else if (pt === 'per_set') setUnitLabel('Set');
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    >
                      <option value="per_unit">Per Piece / Unit (Quantity Based)</option>
                      <option value="per_sqft">Per Sq. Ft (Area Based)</option>
                      <option value="per_ft">Per Running Ft (Length Based)</option>
                      <option value="per_kg">Per Kilogram (Weight Based)</option>
                      <option value="per_set">Per Set / Pair (Package Based)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Unit Price (₹) *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={unitPriceNumeric}
                      onChange={(e) => setUnitPriceNumeric(e.target.value)}
                      placeholder="e.g. 2500"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-grid-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Min Order Qty (MOQ)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={minQuantity}
                      onChange={(e) => setMinQuantity(e.target.value)}
                      placeholder="1"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      placeholder="e.g. 50"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Unit Name / Label
                    </label>
                    <input
                      type="text"
                      value={unitLabel}
                      onChange={(e) => setUnitLabel(e.target.value)}
                      placeholder="Piece / Unit / Kg"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: MEASUREMENTS (L, H, B) */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    📐 Product Measurements (L, H, B)
                  </label>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {parseDimensionValue(lengthFeet)}ft (L) × {parseDimensionValue(heightFeet)}ft (H) × {parseDimensionValue(breadthFeet)}ft (B)
                  </span>
                </div>

                <div className="admin-form-grid-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Length (L) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={lengthFeet}
                      onChange={(e) => handleAddLengthChange(e.target.value)}
                      placeholder="e.g. 2 or 2.5"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Height (H) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={heightFeet}
                      onChange={(e) => handleAddHeightChange(e.target.value)}
                      placeholder="e.g. 2.5 or 6"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Breadth / Width (B) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={breadthFeet}
                      onChange={(e) => handleAddBreadthChange(e.target.value)}
                      placeholder="e.g. 2.5 or 3"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                    Dimensions Display Text
                  </label>
                  <input
                    type="text"
                    value={dimensionsText}
                    onChange={(e) => setDimensionsText(e.target.value)}
                    placeholder="e.g. Standard: 2ft (L) x 2.5ft (H) x 2.5ft (B) — Custom sizes built to order"
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.78rem',
                      color: '#09090b',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Material & Grade */}
              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Material Grade
                  </label>
                  <select
                    value={materialGrade}
                    onChange={(e) => setMaterialGrade(e.target.value as any)}
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
                    {materialGrades.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Lead Time
                  </label>
                  <input
                    type="text"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    placeholder="e.g. 7 - 12 days"
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

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Structural specifications, gauge thickness, finish details..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    fontSize: '0.825rem',
                    color: '#09090b',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
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
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Edit Product
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '2px 0 0 0' }}>
                  Update pricing, quantity basis, measurements (L, H, B), or specifications.
                </p>
              </div>
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
              {/* Product Picture */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '8px' }}>
                  Product Picture
                </label>

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
                  </div>
                )}
              </div>

              {/* Product Name & Category */}
              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Product Name *
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
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
              </div>

              {/* SECTION: PRICE & QUANTITY SETTINGS (EDIT) */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    💰 Price &amp; Quantity Settings
                  </label>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    ₹{editPriceInput || '0'} / {editUnitLabel || 'unit'} (Min: {editMinQty || '1'})
                  </span>
                </div>

                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Pricing Basis / Model *
                    </label>
                    <select
                      value={editPriceType}
                      onChange={(e) => {
                        const pt = e.target.value as ProductItem['priceType'];
                        setEditPriceType(pt);
                        if (pt === 'per_unit') setEditUnitLabel('Piece');
                        else if (pt === 'per_sqft') setEditUnitLabel('Sq.Ft');
                        else if (pt === 'per_ft') setEditUnitLabel('Running Ft');
                        else if (pt === 'per_kg') setEditUnitLabel('Kg');
                        else if (pt === 'per_set') setEditUnitLabel('Set');
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    >
                      <option value="per_unit">Per Piece / Unit (Quantity Based)</option>
                      <option value="per_sqft">Per Sq. Ft (Area Based)</option>
                      <option value="per_ft">Per Running Ft (Length Based)</option>
                      <option value="per_kg">Per Kilogram (Weight Based)</option>
                      <option value="per_set">Per Set / Pair (Package Based)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Unit Price (₹) *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={editPriceInput}
                      onChange={(e) => setEditPriceInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-grid-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Min Order Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editMinQty}
                      onChange={(e) => setEditMinQty(e.target.value)}
                      placeholder="1"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editStockQty}
                      onChange={(e) => setEditStockQty(e.target.value)}
                      placeholder="50"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Unit Name / Label
                    </label>
                    <input
                      type="text"
                      value={editUnitLabel}
                      onChange={(e) => setEditUnitLabel(e.target.value)}
                      placeholder="Piece / Unit / Kg"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: MEASUREMENTS (L, H, B) */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    📐 Product Measurements (L, H, B)
                  </label>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {parseDimensionValue(editLength)}ft (L) × {parseDimensionValue(editHeight)}ft (H) × {parseDimensionValue(editBreadth)}ft (B)
                  </span>
                </div>

                <div className="admin-form-grid-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Length (L) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={editLength}
                      onChange={(e) => handleEditLengthChange(e.target.value)}
                      placeholder="e.g. 2 or 2.5"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Height (H) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={editHeight}
                      onChange={(e) => handleEditHeightChange(e.target.value)}
                      placeholder="e.g. 2.5 or 6"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                      Breadth / Width (B) <span style={{ color: '#64748b', fontWeight: 500 }}>(ft)</span> *
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      required
                      value={editBreadth}
                      onChange={(e) => handleEditBreadthChange(e.target.value)}
                      placeholder="e.g. 2.5 or 3"
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                    Dimensions Display Text
                  </label>
                  <input
                    type="text"
                    value={editingProduct.dimensionsText || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensionsText: e.target.value })}
                    placeholder="e.g. Standard: 2ft (L) x 2.5ft (H) x 2.5ft (B) — Custom sizes built to order"
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.78rem',
                      color: '#09090b',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Material & Grade */}
              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Material Grade
                  </label>
                  <select
                    value={editingProduct.materialGrade || 'Mild Steel (MS)'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, materialGrade: e.target.value as any })}
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
                    {materialGrades.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                    Lead Time
                  </label>
                  <input
                    type="text"
                    value={editingProduct.leadTime || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, leadTime: e.target.value })}
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

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#09090b', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    fontSize: '0.825rem',
                    color: '#09090b',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
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
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
