import {
  INITIAL_ADMIN_USERS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  AdminUser,
  Order,
  StoreSettings,
} from './adminInitialData';
import { PRODUCTS, ProductItem } from './products';

// Global singleton in-memory storage for Next.js API routes
declare global {
  var _sgwwsp_api_users: AdminUser[] | undefined;
  var _sgwwsp_api_orders: Order[] | undefined;
  var _sgwwsp_api_products: ProductItem[] | undefined;
  var _sgwwsp_api_settings: StoreSettings | undefined;
}

if (!global._sgwwsp_api_users) {
  global._sgwwsp_api_users = [...INITIAL_ADMIN_USERS];
}

if (!global._sgwwsp_api_orders) {
  global._sgwwsp_api_orders = [];
}

if (!global._sgwwsp_api_products) {
  global._sgwwsp_api_products = [...PRODUCTS];
}

if (!global._sgwwsp_api_settings) {
  global._sgwwsp_api_settings = { ...INITIAL_SETTINGS };
}

export const apiStore = {
  getUsers: () => global._sgwwsp_api_users!,
  setUsers: (users: AdminUser[]) => {
    global._sgwwsp_api_users = users;
  },
  getOrders: () => global._sgwwsp_api_orders!,
  setOrders: (orders: Order[]) => {
    global._sgwwsp_api_orders = orders;
  },
  getProducts: () => global._sgwwsp_api_products!,
  setProducts: (products: ProductItem[]) => {
    global._sgwwsp_api_products = products;
  },
  getSettings: () => global._sgwwsp_api_settings!,
  setSettings: (settings: StoreSettings) => {
    global._sgwwsp_api_settings = settings;
  },
  resetAll: () => {
    global._sgwwsp_api_users = [...INITIAL_ADMIN_USERS];
    global._sgwwsp_api_orders = [...INITIAL_ORDERS];
    global._sgwwsp_api_products = [...PRODUCTS];
    global._sgwwsp_api_settings = { ...INITIAL_SETTINGS };
  },
  clearAll: () => {
    global._sgwwsp_api_orders = [];
    global._sgwwsp_api_products = [...PRODUCTS];
  },
};
