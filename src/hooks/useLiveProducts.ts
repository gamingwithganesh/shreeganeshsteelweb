'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProductItem, PRODUCTS } from '@/data/products';

export const PRODUCTS_STORAGE_KEY = 'sgwwsp_admin_products_v2';

export function getStoredProducts(): ProductItem[] {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored products from localStorage:', e);
  }
  return PRODUCTS;
}

export function useLiveProducts() {
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProducts = useCallback(() => {
    const stored = getStoredProducts();
    setProducts(stored);
  }, []);

  useEffect(() => {
    // 1. Synchronously load from localStorage on client mount
    refreshProducts();
    setIsLoaded(true);

    // 2. Fetch server-side products if available in MongoDB Atlas
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts((current) => {
            const currentIds = new Set(current.map((p) => p.id));
            const merged = [...current];
            let hasNew = false;
            for (const serverP of data.products) {
              if (!currentIds.has(serverP.id)) {
                merged.push(serverP);
                hasNew = true;
              }
            }
            if (hasNew) {
              try {
                localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            }
            return current;
          });
        }
      })
      .catch((err) => {
        // Silently catch network failures and continue using localStorage/static PRODUCTS
        console.debug('Products API background sync notice:', err);
      });

    // 3. Real-time reactivity across same-tab and multi-tab admin actions
    const handleStorage = (e?: StorageEvent) => {
      if (!e || e.key === PRODUCTS_STORAGE_KEY) {
        refreshProducts();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('sgwwsp_products_changed', refreshProducts);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sgwwsp_products_changed', refreshProducts);
    };
  }, [refreshProducts]);

  return { products, isLoaded, refreshProducts };
}
