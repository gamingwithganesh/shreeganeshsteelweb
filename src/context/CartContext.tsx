'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  // Dynamic fabrication customization attributes
  widthFeet?: number;
  heightFeet?: number;
  lengthFeet?: number;
  breadthFeet?: number;
  dimensionsText?: string;
  calculatedSqFt?: number;
  selectedGauge?: string;
  selectedFinish?: string;
  quantity?: number;
  unitPriceNumeric?: number;
  calculatedTotalPrice?: number;
  siteNotes?: string;
  customDesignImage?: string;
  customDesignFileName?: string;
}

export interface ProjectSiteInfo {
  clientName: string;
  siteAddress: string;
  city: string;
  phone: string;
  whatsapp: string;
  siteIncharge: string;
  includeInstallation: boolean;
  includeAntiRustPrimer?: boolean;
  deliveryMethod: 'workshop_dispatch' | 'factory_pickup';
  customDesignImage?: string;
  customDesignFileName?: string;
  customDesignSizeKb?: number;
}

export type StoredOrderStatus =
  | 'order_confirmed'
  | 'assigned'
  | 'under_work'
  | 'work_completed'
  | 'out_for_delivery'
  | 'delivered'
  | 'confirmed'
  | 'cutting'
  | 'welding'
  | 'coating'
  | 'dispatched'
  | 'installed'
  | 'pending';

export interface StoredOrder {
  orderId: string;
  date: string;
  status: StoredOrderStatus;
  items: CartItem[];
  subtotal: number;
  coatingCharge: number;
  deliveryCharge: number;
  installationCharge: number;
  grandTotal: number;
  advancePaid: number;
  balanceDue: number;
  paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'advance_token';
  siteInfo: ProjectSiteInfo;
  paymentScreenshot?: string;
  transactionRef?: string;
  customDesignImage?: string;
  customDesignFileName?: string;
}

export interface DeliveryCity {
  name: string;
  distanceKm: number;
  transitDays: string;
  baseDeliveryFee: number;
  isHQ?: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
  isLoggedIn?: boolean;
}

export const VIDARBHA_CITIES: DeliveryCity[] = [
  { name: 'Ghatanji', distanceKm: 0, transitDays: 'Same-Day Dispatch', baseDeliveryFee: 0, isHQ: true },
  { name: 'Yavatmal', distanceKm: 38, transitDays: 'Next Day', baseDeliveryFee: 850 },
  { name: 'Pandharkawada', distanceKm: 42, transitDays: '1 - 2 Days', baseDeliveryFee: 950 },
  { name: 'Wardha', distanceKm: 115, transitDays: '2 Days', baseDeliveryFee: 1800 },
  { name: 'Amravati', distanceKm: 135, transitDays: '2 - 3 Days', baseDeliveryFee: 2200 },
  { name: 'Nagpur', distanceKm: 185, transitDays: '2 - 3 Days', baseDeliveryFee: 2800 },
  { name: 'Akola', distanceKm: 160, transitDays: '3 Days', baseDeliveryFee: 2500 },
];

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Sizing & Pricing Breakdowns
  subtotal: number;
  coatingCharge: number;
  deliveryCharge: number;
  installationCharge: number;
  grandTotal: number;

  // Location & Site Delivery
  selectedCity: DeliveryCity;
  setSelectedCityByName: (cityName: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  projectSiteInfo: ProjectSiteInfo;
  setProjectSiteInfo: React.Dispatch<React.SetStateAction<ProjectSiteInfo>>;

  // Order Management & Tracking
  userOrders: StoredOrder[];
  placeOrder: (orderData: Omit<StoredOrder, 'orderId' | 'date'>) => StoredOrder;

  // User Authentication
  currentUser: UserProfile | null;
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<DeliveryCity>(VIDARBHA_CITIES[0]);

  const [projectSiteInfo, setProjectSiteInfo] = useState<ProjectSiteInfo>({
    clientName: '',
    siteAddress: '',
    city: 'Ghatanji',
    phone: '',
    whatsapp: '',
    siteIncharge: '',
    includeInstallation: true,
    includeAntiRustPrimer: true,
    deliveryMethod: 'workshop_dispatch',
  });

  const [userOrders, setUserOrders] = useState<StoredOrder[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sgwwsp_cart_v2');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedCity = localStorage.getItem('sgwwsp_selected_city');
      if (savedCity) {
        const found = VIDARBHA_CITIES.find((c) => c.name.toLowerCase() === savedCity.toLowerCase());
        if (found) setSelectedCity(found);
      }

      const savedOrders = localStorage.getItem('sgwwsp_user_orders');
      if (savedOrders) {
        setUserOrders(JSON.parse(savedOrders));
      } else {
        setUserOrders([]);
      }

      const savedUser = localStorage.getItem('sgwwsp_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading localStorage state', e);
    }
  }, []);

  // Listen for cross-module real-time order status updates from Admin
  useEffect(() => {
    const handleOrderSync = (e?: any) => {
      try {
        const savedOrders = localStorage.getItem('sgwwsp_user_orders');
        if (savedOrders) {
          setUserOrders(JSON.parse(savedOrders));
        }
      } catch (err) {}
    };

    window.addEventListener('storage', handleOrderSync);
    window.addEventListener('sgwwsp_order_updated', handleOrderSync);
    window.addEventListener('sgwwsp_order_created', handleOrderSync);

    return () => {
      window.removeEventListener('storage', handleOrderSync);
      window.removeEventListener('sgwwsp_order_updated', handleOrderSync);
      window.removeEventListener('sgwwsp_order_created', handleOrderSync);
    };
  }, []);

  const loginUser = (user: UserProfile) => {
    const profile = { ...user, isLoggedIn: true };
    setCurrentUser(profile);
    localStorage.setItem('sgwwsp_user', JSON.stringify(profile));
    showToast(`Welcome back, ${user.name}!`);
    setProjectSiteInfo((prev) => ({
      ...prev,
      clientName: user.name || prev.clientName,
      phone: user.phone || prev.phone,
      siteAddress: user.address || prev.siteAddress,
      city: user.city || prev.city,
    }));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sgwwsp_user');
    } catch (e) { }
    showToast('You have been logged out.');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sgwwsp_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setSelectedCityByName = (cityName: string) => {
    const found = VIDARBHA_CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
      setSelectedCity(found);
      setProjectSiteInfo((prev) => ({ ...prev, city: found.name }));
      localStorage.setItem('sgwwsp_selected_city', found.name);
      showToast(`Delivery location set to ${found.name} (${found.transitDays})`);
    }
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id && i.selectedGauge === item.selectedGauge && i.selectedFinish === item.selectedFinish);
      if (idx > -1) {
        const updated = [...prev];
        const cur = updated[idx];
        const newQty = (cur.quantity || 1) + (item.quantity || 1);
        updated[idx] = {
          ...cur,
          quantity: newQty,
          calculatedTotalPrice: (cur.calculatedTotalPrice || 0) + (item.calculatedTotalPrice || 0),
        };
        showToast(`Quantity updated (${newQty})`);
        return updated;
      }
      showToast(`${item.name.length > 26 ? item.name.slice(0, 24) + '…' : item.name} added to cart`);
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const oldQty = item.quantity || 1;
          const unitPrice =
            item.unitPriceNumeric ||
            (item.calculatedTotalPrice ? Math.round(item.calculatedTotalPrice / oldQty) : parseInt(item.price.replace(/[^0-9]/g, '')) || 0);

          return {
            ...item,
            quantity: newQuantity,
            unitPriceNumeric: unitPrice,
            calculatedTotalPrice: unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Price calculations
  const subtotal = cart.reduce((acc, item) => {
    if (item.calculatedTotalPrice) return acc + item.calculatedTotalPrice;
    const num = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    return acc + num * (item.quantity || 1);
  }, 0);

  const coatingCharge =
    projectSiteInfo.includeAntiRustPrimer !== false && cart.length > 0
      ? Math.round(subtotal * 0.06)
      : 0; // standard 6% for zinc-rich powder coating
  const deliveryCharge =
    projectSiteInfo.deliveryMethod === 'factory_pickup' || selectedCity.isHQ
      ? 0
      : selectedCity.baseDeliveryFee;
  const installationCharge = projectSiteInfo.includeInstallation && cart.length > 0 ? Math.round(subtotal * 0.08) : 0;
  const grandTotal = subtotal + coatingCharge + deliveryCharge + installationCharge;

  const placeOrder = (orderData: Omit<StoredOrder, 'orderId' | 'date'>) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const orderId = `SG-2026-${randomNum}`;
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder: StoredOrder = {
      ...orderData,
      orderId,
      date,
    };

    const updated = [newOrder, ...userOrders];
    setUserOrders(updated);
    try {
      localStorage.setItem('sgwwsp_user_orders', JSON.stringify(updated));
      localStorage.setItem('sgwwsp_last_placed_bill', JSON.stringify(newOrder));

      // Also sync to admin orders so the workshop admin sees it immediately
      const savedAdminOrders = localStorage.getItem('sgwwsp_admin_orders_v2');
      const currentAdminOrders = savedAdminOrders ? JSON.parse(savedAdminOrders) : [];
      const isPickup = newOrder.siteInfo.deliveryMethod === 'factory_pickup';
      const hasPrimer = newOrder.siteInfo.includeAntiRustPrimer !== false;
      const hasInstall = Boolean(newOrder.siteInfo.includeInstallation);
      const deliveryLabel = isPickup ? 'Self Pickup from Workshop (Free)' : `Workshop Delivery to Site (${newOrder.siteInfo.city})`;

      const adminOrderEntry = {
        id: `ord-${randomNum}`,
        orderNumber: orderId,
        clientName: newOrder.siteInfo.clientName,
        clientPhone: newOrder.siteInfo.phone,
        clientEmail: currentUser?.email || `${newOrder.siteInfo.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}@client.in`,
        serviceCategory: newOrder.items.map((i) => i.name).join(', ') || 'Custom Steel Fabrication',
        material: newOrder.items[0]?.selectedGauge ? `${newOrder.items[0].selectedGauge}` : 'Structural Steel',
        amount: newOrder.grandTotal,
        status: 'pending',
        priority: 'urgent',
        createdAt: new Date().toLocaleString(),
        targetDate: 'Within 7-10 Days',
        dimensions: newOrder.items[0]?.dimensionsText || (newOrder.items[0]?.lengthFeet || newOrder.items[0]?.widthFeet ? `${newOrder.items[0].lengthFeet || newOrder.items[0].widthFeet}ft (L) × ${newOrder.items[0].heightFeet || 6}ft (H)${newOrder.items[0].breadthFeet ? ` × ${newOrder.items[0].breadthFeet}ft (B)` : ''}` : 'Custom Fit'),
        notes: `${deliveryLabel} | ${hasPrimer ? 'Dual-Coat Anti-Rust Primer (+6%)' : 'Raw Finish'} | ${hasInstall ? 'On-Site Installation Included' : 'Supply Only'} | Adv: ₹${newOrder.advancePaid}, Due: ₹${newOrder.balanceDue}`,
        paymentScreenshot: newOrder.paymentScreenshot,
        transactionRef: newOrder.transactionRef,
        customDesignImage: newOrder.siteInfo.customDesignImage || newOrder.customDesignImage,
        customDesignFileName: newOrder.siteInfo.customDesignFileName || newOrder.customDesignFileName,
        advancePaid: newOrder.advancePaid,
        balanceDue: newOrder.balanceDue,
        siteAddress: newOrder.siteInfo.siteAddress,
        city: newOrder.siteInfo.city,
        itemsSummary: newOrder.items.map((i) => `${i.name} (x${i.quantity || 1})`).join(', '),
        deliveryMethod: newOrder.siteInfo.deliveryMethod || 'workshop_dispatch',
        deliveryCharge: newOrder.deliveryCharge || 0,
        includeAntiRustPrimer: hasPrimer,
        coatingCharge: newOrder.coatingCharge || 0,
        includeInstallation: hasInstall,
        installationCharge: newOrder.installationCharge || 0,
        items: newOrder.items,
        siteInfo: newOrder.siteInfo,
      };
      const updatedAdminOrders = [adminOrderEntry, ...currentAdminOrders];
      localStorage.setItem('sgwwsp_admin_orders_v2', JSON.stringify(updatedAdminOrders));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sgwwsp_order_created', { detail: adminOrderEntry }));

      // Also attempt backend API sync
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      }).catch(() => {});
    } catch (e) {
      console.error('Error saving order', e);
    }

    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
        subtotal,
        coatingCharge,
        deliveryCharge,
        installationCharge,
        grandTotal,
        selectedCity,
        setSelectedCityByName,
        isLocationModalOpen,
        setIsLocationModalOpen,
        projectSiteInfo,
        setProjectSiteInfo,
        userOrders,
        placeOrder,
        currentUser,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
