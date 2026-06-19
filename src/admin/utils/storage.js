import { products as defaultProducts, categories as defaultCategories } from '../../data/products';

const KEYS = {
  products: 'xtrogeno-products',
  categories: 'xtrogeno-categories',
  orders: 'xtrogeno-orders',
  config: 'xtrogeno-config',
};

const defaultConfig = {
  name: 'Tienda Xtrógeno',
  phone: '+1 829-675-9148',
  whatsapp: '+18296759148',
  instagram: '@tiendaxtrogeno',
  email: 'contacto@tiendaxtrogeno.com',
  hours: { weekdays: '10:00 AM - 8:00 PM', saturday: '10:00 AM - 8:00 PM', sunday: '10:00 AM - 4:00 PM' },
  location: 'República Dominicana 🇩🇴',
};

function init(key, defaultValue) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
}

export function getProducts() {
  init(KEYS.products, defaultProducts);
  return JSON.parse(localStorage.getItem(KEYS.products));
}

export function saveProducts(data) {
  localStorage.setItem(KEYS.products, JSON.stringify(data));
}

export function getCategories() {
  init(KEYS.categories, defaultCategories);
  return JSON.parse(localStorage.getItem(KEYS.categories));
}

export function saveCategories(data) {
  localStorage.setItem(KEYS.categories, JSON.stringify(data));
}

export function getOrders() {
  init(KEYS.orders, []);
  return JSON.parse(localStorage.getItem(KEYS.orders));
}

export function saveOrders(data) {
  localStorage.setItem(KEYS.orders, JSON.stringify(data));
}

export function getConfig() {
  init(KEYS.config, defaultConfig);
  return JSON.parse(localStorage.getItem(KEYS.config));
}

export function saveConfig(data) {
  localStorage.setItem(KEYS.config, JSON.stringify(data));
}
