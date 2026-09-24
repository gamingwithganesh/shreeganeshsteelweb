'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Order,
  OrderStatus,
  Machine,
  MachineStatus,
  MaintenanceLog,
  AdminUser,
  AdminRole,
  AdminStatus,
  StoreSettings,
  INITIAL_ORDERS,
  INITIAL_MACHINES,
  INITIAL_MAINTENANCE_LOGS,
  INITIAL_ADMIN_USERS,
  INITIAL_SETTINGS,
} from '@/data/adminInitialData';
import { ProductItem, PRODUCTS } from '@/data/products';
import {
  sendBrowserNotification,
  requestBrowserNotificationPermission,
  getNotificationPermission,
  NotificationStatus,
} from '@/utils/browserNotification';

interface CategoryBreakdown {
  category: string;
  count: number;
  totalValue: number;
}

interface StatusBreakdown {
  status: OrderStatus;
  label: string;
  count: number;
}

export interface PlatformStats {
  totalPlatformRevenue: number;
  totalPlatformOrders: number;
  totalProductsCount: number;
  activeAdminsCount: number;
  pausedAdminsCount: number;
}

export interface AdminStats extends PlatformStats {
  totalRevenue: number;
  totalAdvanceCollected: number;
  totalBalanceDue: number;
  activeOrdersCount: number;
  completedOrdersCount: number;
  machineHealthScore: number;
  maintenanceAlertsCount: number;
  conversionRate: number;
  categoryBreakdown: CategoryBreakdown[];
  statusBreakdown: StatusBreakdown[];
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: AdminUser;
}

interface AdminContextType {
  orders: Order[];
  machines: Machine[];
  maintenanceLogs: MaintenanceLog[];
  products: ProductItem[];
  settings: StoreSettings;
  adminUsers: AdminUser[];
  currentAdmin: AdminUser | null;
  stats: AdminStats;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => LoginResult;
  logout: () => void;
  // Multi-Admin Management (Super Admin)
  createAdmin: (data: Omit<AdminUser, 'id' | 'createdAt'>) => { success: boolean; message: string; admin?: AdminUser };
  updateAdmin: (id: string, data: Partial<AdminUser>) => { success: boolean; message: string };
  toggleAdminStatus: (id: string) => { success: boolean; message: string; newStatus?: AdminStatus };
  deleteAdmin: (id: string) => { success: boolean; message: string };
  updateSuperAdminPassword: (newPassword: string) => boolean;
  // Products Management
  addProduct: (product: Omit<ProductItem, 'id'>) => ProductItem;
  updateProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  // Promotional Settings
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  // Order Management
  addOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => void;
  updateOrder: (id: string, updated: Partial<Order>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  // Machine Management
  updateMachineStatus: (id: string, status: MachineStatus, health?: number, notes?: string) => void;
  addMaintenanceLog: (logData: Omit<MaintenanceLog, 'id'>) => void;
  resolveMaintenanceTicket: (logId: string, machineId: string, resolutionNotes?: string) => void;
  // System Reset & Seed
  seedSampleData: () => void;
  clearAllStoreData: () => void;
  wipeAllAppData: () => Promise<void>;
  resetToDefaults: () => void;
  // Browser Notifications & Toast
  notificationPermission: NotificationStatus;
  requestNotificationPermission: () => Promise<NotificationStatus>;
  triggerTestNotification: () => Promise<boolean>;
  toastNotification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToastNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ORDERS_KEY = 'sgwwsp_admin_orders_v2';
const MACHINES_KEY = 'sgwwsp_admin_machines_v2';
const MAINT_KEY = 'sgwwsp_admin_maint_v2';
const USERS_KEY = 'sgwwsp_admin_users_v2';
const SETTINGS_KEY = 'sgwwsp_admin_settings_v2';
const PRODUCTS_KEY = 'sgwwsp_admin_products_v2';
const CURRENT_ADMIN_KEY = 'sgwwsp_current_admin_v2';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [machines, setMachines] = useState<Machine[]>(INITIAL_MACHINES);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>(INITIAL_MAINTENANCE_LOGS);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem(USERS_KEY);
      if (savedUsers) {
        const parsed: AdminUser[] = JSON.parse(savedUsers);
        // Ensure ganeshb.shende0@gmail.com is present with updated password
        const updated = parsed.filter(
          (u) => u.email.toLowerCase() !== 'ganeshb.shende0@gmail.com' && u.email.toLowerCase() !== 'admin@sgwwsp.com'
        );
        setAdminUsers([INITIAL_ADMIN_USERS[0], ...updated]);
      } else {
        setAdminUsers(INITIAL_ADMIN_USERS);
      }

      const savedOrders = localStorage.getItem(ORDERS_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([]);
      }

      const savedMachines = localStorage.getItem(MACHINES_KEY);
      if (savedMachines) setMachines(JSON.parse(savedMachines));

      const savedLogs = localStorage.getItem(MAINT_KEY);
      if (savedLogs) setMaintenanceLogs(JSON.parse(savedLogs));

      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCurrentAdmin = localStorage.getItem(CURRENT_ADMIN_KEY);
      if (savedCurrentAdmin) {
        const parsedAdmin: AdminUser = JSON.parse(savedCurrentAdmin);
        if (parsedAdmin.email.toLowerCase() === 'ganeshb.shende0@gmail.com') {
          setCurrentAdmin(INITIAL_ADMIN_USERS[0]);
        } else {
          setCurrentAdmin(parsedAdmin);
        }
      }
    } catch (e) {
      console.warn('Error loading admin state from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen for real-time order creations and cross-tab storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedOrders = localStorage.getItem(ORDERS_KEY);
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sgwwsp_order_created', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sgwwsp_order_created', handleStorageChange);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(adminUsers));
    } catch (e) {}
  }, [adminUsers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {}
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(MACHINES_KEY, JSON.stringify(machines));
    } catch (e) {}
  }, [machines, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(MAINT_KEY, JSON.stringify(maintenanceLogs));
    } catch (e) {}
  }, [maintenanceLogs, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }, [settings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {}
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentAdmin) {
        localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(currentAdmin));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sgwwsp_admin_auth_changed'));
          window.dispatchEvent(new Event('storage'));
        }
      } else {
        localStorage.removeItem(CURRENT_ADMIN_KEY);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sgwwsp_admin_auth_changed'));
          window.dispatchEvent(new Event('storage'));
        }
      }
    } catch (e) {}
  }, [currentAdmin, isLoaded]);

  // Authentication & Login
  const login = (identifier: string, password: string): LoginResult => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPw = password.trim();

    // Direct check for specified administrator credentials:
    // Email: ganeshb.shende0@gmail.com, Password: ganeshb.shende0@gmail.com
    if (
      (cleanId === 'ganeshb.shende0@gmail.com' || cleanId === 'admin') &&
      cleanPw === 'ganeshb.shende0@gmail.com'
    ) {
      const ganeshAdmin: AdminUser = {
        id: 'usr-admin-1',
        name: 'Ganesh Shende',
        email: 'ganeshb.shende0@gmail.com',
        password: 'ganeshb.shende0@gmail.com',
        role: 'superadmin',
        status: 'active',
        department: 'Workshop Operations & Administration',
        phone: '+91 94230 32182',
        createdAt: '2026-01-01T00:00:00.000Z',
      };
      setCurrentAdmin(ganeshAdmin);
      try {
        localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(ganeshAdmin));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sgwwsp_admin_auth_changed'));
          window.dispatchEvent(new Event('storage'));
        }
      } catch (e) {}
      return {
        success: true,
        message: 'Welcome back, Ganesh Shende!',
        user: ganeshAdmin,
      };
    }

    // Find in adminUsers list
    const found = adminUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanId ||
          (cleanId === 'admin' && u.email === 'ganeshb.shende0@gmail.com') ||
          (cleanId === 'superadmin' && u.role === 'superadmin')) &&
        u.password === cleanPw
    );

    if (!found) {
      return {
        success: false,
        message: 'Invalid administrative credentials. Please verify your email and password.',
      };
    }

    if (found.status === 'paused') {
      return {
        success: false,
        message: 'Account Suspended: This administrator account has been paused by Z INTECH Super Admin.',
        user: found,
      };
    }

    setCurrentAdmin(found);
    try {
      localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(found));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sgwwsp_admin_auth_changed'));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {}
    return {
      success: true,
      message: `Welcome back, ${found.name}!`,
      user: found,
    };
  };

  const logout = () => {
    setCurrentAdmin(null);
    try {
      localStorage.removeItem(CURRENT_ADMIN_KEY);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sgwwsp_admin_auth_changed'));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {}
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  // Super Admin Multi-Admin Management
  const createAdmin = (data: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const existing = adminUsers.find((u) => u.email.toLowerCase() === data.email.trim().toLowerCase());
    if (existing) {
      return { success: false, message: 'An admin account with this email already exists.' };
    }

    const newAdmin: AdminUser = {
      ...data,
      id: 'usr-admin-' + Date.now(),
      email: data.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
      status: 'active',
      role: 'admin',
    };

    setAdminUsers((prev) => [newAdmin, ...prev]);
    return { success: true, message: `Admin account for ${newAdmin.name} created successfully!`, admin: newAdmin };
  };

  const updateAdmin = (id: string, data: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...data, updatedAt: new Date().toISOString() } : u))
    );
    // If updating current logged in user, refresh session
    if (currentAdmin && currentAdmin.id === id) {
      setCurrentAdmin((prev) => (prev ? { ...prev, ...data } : null));
    }
    return { success: true, message: 'Admin details updated successfully.' };
  };

  const toggleAdminStatus = (id: string) => {
    let newStatus: AdminStatus = 'active';
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          newStatus = u.status === 'active' ? 'paused' : 'active';
          return { ...u, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return u;
      })
    );
    // If current logged-in user got paused, update currentAdmin state
    if (currentAdmin && currentAdmin.id === id) {
      setCurrentAdmin((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    return {
      success: true,
      message: `Admin account is now ${newStatus.toUpperCase()}.`,
      newStatus,
    };
  };

  const deleteAdmin = (id: string) => {
    const target = adminUsers.find((u) => u.id === id);
    if (target?.role === 'superadmin') {
      return { success: false, message: 'Root Super Admin account cannot be deleted.' };
    }
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
    return { success: true, message: 'Admin account removed permanently.' };
  };

  const updateSuperAdminPassword = (newPassword: string) => {
    if (!newPassword.trim() || newPassword.trim().length < 6) return false;
    setAdminUsers((prev) =>
      prev.map((u) => (u.role === 'superadmin' ? { ...u, password: newPassword.trim() } : u))
    );
    if (currentAdmin?.role === 'superadmin') {
      setCurrentAdmin((prev) => (prev ? { ...prev, password: newPassword.trim() } : null));
    }
    return true;
  };

  // Product Catalog CRUD
  const addProduct = (productData: Omit<ProductItem, 'id'>) => {
    const newId = 'prod-' + Date.now();
    const newProduct: ProductItem = {
      ...productData,
      id: newId,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updated: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Settings Management
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Order CRUD
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newId = 'ord-' + Date.now();
    const nextSeq = Math.floor(100 + Math.random() * 900);
    const orderNumber = `SG-2026-${nextSeq}`;

    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber,
      createdAt: today,
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrder = (id: string, updated: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, ...updated } : ord))
    );
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    let targetOrderNumber = '';

    // 1. Update in-memory orders state
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id || ord.orderNumber === id) {
          targetOrderNumber = ord.orderNumber;
          return { ...ord, status };
        }
        return ord;
      })
    );

    // 2. Persist to localStorage for admin orders
    try {
      const savedAdmin = localStorage.getItem(ORDERS_KEY);
      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin);
        const updatedAdmin = parsed.map((ord: any) =>
          ord.id === id || ord.orderNumber === id ? { ...ord, status } : ord
        );
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedAdmin));
      }
    } catch (e) {}

    // 3. CRITICAL: Sync directly to user orders (sgwwsp_user_orders)
    try {
      const savedUserOrders = localStorage.getItem('sgwwsp_user_orders');
      if (savedUserOrders) {
        const parsed = JSON.parse(savedUserOrders);
        if (Array.isArray(parsed)) {
          const updatedUserOrders = parsed.map((uOrd: any) => {
            const matches =
              uOrd.orderId === id ||
              uOrd.orderId === targetOrderNumber ||
              (targetOrderNumber && uOrd.orderId && uOrd.orderId.includes(targetOrderNumber)) ||
              (id && uOrd.orderId && uOrd.orderId.includes(id)) ||
              (targetOrderNumber && targetOrderNumber.includes(uOrd.orderId));
            if (matches) {
              return { ...uOrd, status };
            }
            return uOrd;
          });
          localStorage.setItem('sgwwsp_user_orders', JSON.stringify(updatedUserOrders));
        }
      }
    } catch (e) {}

    // 4. CRITICAL: Sync to last placed bill (sgwwsp_last_placed_bill)
    try {
      const lastBill = localStorage.getItem('sgwwsp_last_placed_bill');
      if (lastBill) {
        const parsed = JSON.parse(lastBill);
        if (
          parsed.orderId === id ||
          parsed.orderId === targetOrderNumber ||
          (targetOrderNumber && parsed.orderId && parsed.orderId.includes(targetOrderNumber))
        ) {
          parsed.status = status;
          localStorage.setItem('sgwwsp_last_placed_bill', JSON.stringify(parsed));
        }
      }
    } catch (e) {}

    // 5. Broadcast real-time events to all tabs & React contexts
    try {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(
        new CustomEvent('sgwwsp_order_updated', {
          detail: { id, orderNumber: targetOrderNumber, status },
        })
      );
    } catch (e) {}

    // 6. Update backend MongoDB / API
    try {
      fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, orderId: id, orderNumber: targetOrderNumber, status }),
      }).catch(() => {});
    } catch (e) {}
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  // Maintenance Management
  const updateMachineStatus = (
    id: string,
    status: MachineStatus,
    health?: number,
    notes?: string
  ) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status,
              ...(health !== undefined ? { healthPercentage: health } : {}),
              ...(notes ? { notes } : {}),
            }
          : m
      )
    );
  };

  const addMaintenanceLog = (logData: Omit<MaintenanceLog, 'id'>) => {
    const newLog: MaintenanceLog = {
      ...logData,
      id: 'maint-' + Date.now(),
    };
    setMaintenanceLogs((prev) => [newLog, ...prev]);

    if (logData.status === 'in_progress') {
      updateMachineStatus(logData.machineId, 'maintenance_required');
    }
  };

  const resolveMaintenanceTicket = (
    logId: string,
    machineId: string,
    resolutionNotes?: string
  ) => {
    setMaintenanceLogs((prev) =>
      prev.map((log) =>
        log.id === logId
          ? {
              ...log,
              status: 'completed',
              notes: resolutionNotes ? `${log.notes} | Resolved: ${resolutionNotes}` : log.notes,
            }
          : log
      )
    );
    updateMachineStatus(machineId, 'operational', 98, 'Service completed. Tested and calibrated.');
  };

  // Browser Notifications & Toast states
  const [notificationPermission, setNotificationPermission] = useState<NotificationStatus>('default');
  const [toastNotification, setToastNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  useEffect(() => {
    setNotificationPermission(getNotificationPermission());
  }, []);

  const showToastNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (!message) {
      setToastNotification(null);
      return;
    }
    setToastNotification({ message, type });
    setTimeout(() => {
      setToastNotification((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const requestNotificationPermission = async (): Promise<NotificationStatus> => {
    const perm = await requestBrowserNotificationPermission();
    setNotificationPermission(perm);
    if (perm === 'granted') {
      showToastNotification('Browser desktop notifications enabled!', 'success');
      await sendBrowserNotification('🔔 Notifications Enabled!', {
        body: 'You will receive live alerts for fabrication orders and workshop actions.',
      });
    } else if (perm === 'denied') {
      showToastNotification('Browser notifications were blocked in your browser settings.', 'error');
    }
    return perm;
  };

  const triggerTestNotification = async (): Promise<boolean> => {
    const success = await sendBrowserNotification('🔔 Test Notification • Shree Ganesh Steel', {
      body: 'Browser notifications are working properly! Live order alerts are active.',
    });
    if (success) {
      showToastNotification('Browser notification dispatched! Check your desktop banner.', 'success');
      return true;
    } else {
      const perm = await requestBrowserNotificationPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        await sendBrowserNotification('🔔 Test Notification • Shree Ganesh Steel', {
          body: 'Browser notifications are working properly! Live order alerts are active.',
        });
        showToastNotification('Browser notification dispatched! Check your desktop banner.', 'success');
        return true;
      } else {
        showToastNotification('Please allow browser notifications in your browser address bar.', 'error');
      }
    }
    return false;
  };

  // Seed & Wipe Data
  const wipeAllAppData = async () => {
    // 1. Wipe backend API store
    try {
      await fetch('/api/admin/clear-all', { method: 'POST' });
    } catch (e) {
      console.warn('Backend clear-all API error:', e);
    }

    // 2. Clear state in AdminContext
    setOrders([]);
    setMaintenanceLogs([]);

    // 3. Clear all frontend client local storage keys
    try {
      localStorage.removeItem(ORDERS_KEY);
      localStorage.setItem(ORDERS_KEY, JSON.stringify([]));

      localStorage.removeItem('sgwwsp_user_orders');
      localStorage.setItem('sgwwsp_user_orders', JSON.stringify([]));

      localStorage.removeItem('sgwwsp_cart_v2');
      localStorage.setItem('sgwwsp_cart_v2', JSON.stringify([]));

      localStorage.removeItem('sgwwsp_last_placed_bill');
      localStorage.removeItem('sgwwsp_recent_order');
      localStorage.removeItem(MAINT_KEY);
      localStorage.setItem(MAINT_KEY, JSON.stringify([]));

      sessionStorage.clear();
    } catch (e) {
      console.warn('Storage clear error:', e);
    }

    // 4. Notify all cross-tab listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sgwwsp_order_created'));
      window.dispatchEvent(new CustomEvent('sgwwsp_cart_updated'));
      window.dispatchEvent(new CustomEvent('sgwwsp_data_wiped'));
    }

    // 5. Trigger notifications (both in-app toast & browser desktop notification)
    showToastNotification('All app data, store orders, and carts wiped successfully!', 'success');
    await sendBrowserNotification('Shree Ganesh Steel • App Data Wiped', {
      body: 'All store orders, customer bills, and temporary caches have been cleared.',
    });
  };

  const seedSampleData = () => {
    setOrders(INITIAL_ORDERS);
    setProducts(PRODUCTS);
    setMachines(INITIAL_MACHINES);
    setMaintenanceLogs(INITIAL_MAINTENANCE_LOGS);
    setSettings(INITIAL_SETTINGS);
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      localStorage.setItem('sgwwsp_user_orders', JSON.stringify([
        {
          orderId: 'SG-2026-091',
          date: '18 Sep 2026',
          status: 'welding',
          items: [
            {
              id: '1',
              name: 'Art Deco Ornamental Laser Gate',
              price: '₹28,500',
              category: 'Gates & Entrances',
              image: '/images/product_gate.jpg',
              widthFeet: 12,
              heightFeet: 6,
              selectedGauge: '12 Gauge (2.5 mm)',
              selectedFinish: 'Zinc Primer + Matte Black PU',
              quantity: 1,
              calculatedTotalPrice: 28500,
            },
          ],
          subtotal: 28500,
          coatingCharge: 3800,
          deliveryCharge: 0,
          installationCharge: 4500,
          grandTotal: 36800,
          advancePaid: 15000,
          balanceDue: 21800,
          paymentMethod: 'bank_transfer',
          siteInfo: {
            clientName: 'Suresh Patil',
            siteAddress: 'Plot 14, Ring Road, Cotton Market',
            city: 'Ghatanji',
            phone: '9423032182',
            whatsapp: '9423032182',
            siteIncharge: 'Mahesh Welder',
            includeInstallation: true,
            deliveryMethod: 'workshop_dispatch',
          },
        }
      ]));
      localStorage.setItem(MACHINES_KEY, JSON.stringify(INITIAL_MACHINES));
      localStorage.setItem(MAINT_KEY, JSON.stringify(INITIAL_MAINTENANCE_LOGS));
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
    } catch (e) {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sgwwsp_order_created'));
    }
    showToastNotification('Sample demo inventory & workshop orders restored.', 'info');
    sendBrowserNotification('Shree Ganesh Steel • Demo Data Restored', {
      body: 'Workshop orders & sample steel inventory re-seeded.',
    });
  };

  const clearAllStoreData = () => {
    wipeAllAppData();
  };

  const resetToDefaults = () => {
    setOrders([]);
    setMachines(INITIAL_MACHINES);
    setMaintenanceLogs(INITIAL_MAINTENANCE_LOGS);
    setAdminUsers(INITIAL_ADMIN_USERS);
    setSettings(INITIAL_SETTINGS);
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem(ORDERS_KEY);
      localStorage.removeItem(MACHINES_KEY);
      localStorage.removeItem(MAINT_KEY);
      localStorage.removeItem(USERS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      localStorage.removeItem(PRODUCTS_KEY);
    } catch (e) {}
    showToastNotification('Factory defaults restored.', 'info');
  };

  // Dynamic Statistics
  const totalRevenue = orders.reduce((sum, o) => {
    const amt = typeof o.amount === 'number' ? o.amount : (o as any).grandTotal || parseFloat(String(o.amount || 0).replace(/[^0-9.]/g, '')) || 0;
    return sum + amt;
  }, 0);

  const totalAdvanceCollected = orders.reduce((sum, o) => {
    const adv = typeof o.advancePaid === 'number' ? o.advancePaid : (o as any).advancePaid || 0;
    return sum + adv;
  }, 0);

  const totalBalanceDue = orders.reduce((sum, o) => {
    const bal = typeof o.balanceDue === 'number' ? o.balanceDue : (o as any).balanceDue || 0;
    return sum + bal;
  }, 0);

  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'pending'
  ).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'delivered').length;

  const totalHealth = machines.reduce((sum, m) => sum + m.healthPercentage, 0);
  const machineHealthScore = machines.length > 0 ? Math.round(totalHealth / machines.length) : 100;
  const maintenanceAlertsCount = machines.filter(
    (m) => m.status === 'maintenance_required' || m.status === 'scheduled_service'
  ).length;

  const activeAdminsCount = adminUsers.filter((u) => u.status === 'active').length;
  const pausedAdminsCount = adminUsers.filter((u) => u.status === 'paused').length;

  // Category breakdown
  const categoryMap: Record<string, { count: number; totalValue: number }> = {};
  orders.forEach((o) => {
    const cat = o.serviceCategory || 'Custom Works';
    if (!categoryMap[cat]) categoryMap[cat] = { count: 0, totalValue: 0 };
    categoryMap[cat].count += 1;
    const itemAmount = typeof o.amount === 'number' ? o.amount : (o as any).grandTotal || 0;
    categoryMap[cat].totalValue += itemAmount;
  });
  const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
    category,
    count: data.count,
    totalValue: data.totalValue,
  }));

  // Status breakdown
  const statusLabels: Record<string, string> = {
    order_confirmed: 'Order Confirmed',
    assigned: 'Assigned',
    under_work: 'Under Work',
    work_completed: 'Work Completed',
    out_for_delivery: 'Out for Delivery / Ready',
    delivered: 'Delivered / Picked Up',
    pending: 'Order Confirmed',
    material_procured: 'Assigned',
    in_fabrication: 'Under Work',
    qc_inspection: 'Work Completed',
    ready_dispatch: 'Work Completed',
    confirmed: 'Order Confirmed',
    cutting: 'Under Work',
    welding: 'Under Work',
    coating: 'Work Completed',
    dispatched: 'Out for Delivery / Ready',
    installed: 'Delivered / Picked Up',
  };

  const mainStatuses: OrderStatus[] = [
    'order_confirmed',
    'assigned',
    'under_work',
    'work_completed',
    'out_for_delivery',
    'delivered',
  ];

  const statusBreakdown: StatusBreakdown[] = mainStatuses.map((st) => ({
    status: st,
    label: statusLabels[st] || st,
    count: orders.filter((o) => {
      if (o.status === st) return true;
      if (statusLabels[o.status] === statusLabels[st]) return true;
      return false;
    }).length,
  }));

  const stats: AdminStats = {
    totalRevenue,
    totalAdvanceCollected,
    totalBalanceDue,
    activeOrdersCount,
    completedOrdersCount,
    machineHealthScore,
    maintenanceAlertsCount,
    conversionRate: 84.5,
    categoryBreakdown,
    statusBreakdown,
    // Platform Super Admin Metrics
    totalPlatformRevenue: totalRevenue,
    totalPlatformOrders: orders.length,
    totalProductsCount: products.length,
    activeAdminsCount,
    pausedAdminsCount,
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        machines,
        maintenanceLogs,
        products,
        settings,
        adminUsers,
        currentAdmin,
        stats,
        isAuthenticated: !!currentAdmin && currentAdmin.status !== 'paused',
        login,
        logout,
        createAdmin,
        updateAdmin,
        toggleAdminStatus,
        deleteAdmin,
        updateSuperAdminPassword,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        addOrder,
        updateOrder,
        updateOrderStatus,
        deleteOrder,
        updateMachineStatus,
        addMaintenanceLog,
        resolveMaintenanceTicket,
        seedSampleData,
        clearAllStoreData,
        wipeAllAppData,
        resetToDefaults,
        notificationPermission,
        requestNotificationPermission,
        triggerTestNotification,
        toastNotification,
        showToastNotification,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
