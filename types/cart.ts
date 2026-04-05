/**
 * @file tipos/cart.ts
 * @description Definición de tipos e interfaces para el sistema de carrito de compras
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

/**
 * Interfaz que representa un artículo individual en el carrito
 * @interface CartItem
 * @property {string} id - ID único del artículo
 * @property {string} nombre - Nombre del producto
 * @property {number} precio - Precio unitario en soles peruanos
 * @property {number} cantidad - Cantidad de artículos en el carrito
 * @property {string} [descripcion] - Descripción opcional del producto
 * @property {string} [imagen] - URL de la imagen del producto
 */
export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion?: string;
  imagen?: string;
}

/**
 * Interfaz que representa el estado completo del carrito
 * @interface Cart
 * @property {CartItem[]} items - Array de artículos en el carrito
 * @property {number} total - Total del carrito en soles peruanos
 */
export interface Cart {
  items: CartItem[];
  total: number;
}

/**
 * Interfaz para el contexto del carrito
 * @interface CartContextType
 * @property {Cart} cart - Estado actual del carrito
 * @property {(item: CartItem) => void} agregarAlCarrito - Función para agregar artículos
 * @property {(id: string) => void} removerDelCarrito - Función para remover artículos
 * @property {(id: string, cantidad: number) => void} actualizarCantidad - Función para actualizar cantidad
 * @property {() => void} vaciarCarrito - Función para vaciar el carrito
 */
export interface CartContextType {
  cart: Cart;
  agregarAlCarrito: (item: CartItem) => void;
  removerDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  vaciarCarrito: () => void;
}
