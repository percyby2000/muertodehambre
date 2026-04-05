/**
 * @file lib/whatsapp.ts
 * @description Utilidades para integración con WhatsApp y generación de enlaces de pedidos
 * Genera mensajes personalizados y enlaces directos a WhatsApp
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

import { CartItem } from '@/types/cart';

/**
 * Número de teléfono de WhatsApp de MUERTODEHAMBRE (Perú)
 * Formato: código de país + número
 * @constant
 */
export const WHATSAPP_NUMBER = '51913882945';

/**
 * URL base de WhatsApp para enviar mensajes
 * @constant
 */
export const WHATSAPP_API_URL = 'https://wa.me';

/**
 * Genera un mensaje de pedido formateado para WhatsApp
 * @param {CartItem[]} items - Array de artículos del carrito
 * @param {number} total - Total del pedido en soles
 * @returns {string} Mensaje formateado para WhatsApp
 * 
 * @example
 * const mensaje = generarMensajePedido(carrito.items, carrito.total);
 * // Resultado: "Hola! Quisiera hacer un pedido:\n\n1x Hamburguesa Clásica - S/ 15.00..."
 */
export const generarMensajePedido = (items: CartItem[], total: number): string => {
  // Encabezado del mensaje
  let mensaje = '¡Hola! 👋 Quisiera hacer un pedido de MUERTODEHAMBRE:\n\n';
  
  // Agregar cada artículo del carrito
  mensaje += '📋 *PEDIDO:*\n';
  mensaje += items
    .map((item) => `• ${item.cantidad}x ${item.nombre} - S/ ${(item.precio * item.cantidad).toFixed(2)}`)
    .join('\n');
  
  // Agregar total
  mensaje += `\n\n💰 *TOTAL: S/ ${total.toFixed(2)}*\n\n`;
  
  // Información de entrega
  mensaje += '📍 *UBICACIÓN:* Ayacucho, Huamanga\n';
  mensaje += '⏰ *HORARIO:* 6:00 AM - 12:00 PM\n';
  mensaje += '💳 *PAGO:* Efectivo, Yape o Plin\n\n';
  mensaje += '¿Puedo confirmar mi pedido?';
  
  return mensaje;
};

/**
 * Genera un enlace de WhatsApp con el mensaje del pedido
 * @param {CartItem[]} items - Array de artículos del carrito
 * @param {number} total - Total del pedido en soles
 * @returns {string} URL completa de WhatsApp con mensaje codificado
 * 
 * @example
 * const enlace = generarEnlaceWhatsApp(carrito.items, carrito.total);
 * // Resultado: "https://wa.me/51913882945?text=..."
 */
export const generarEnlaceWhatsApp = (items: CartItem[], total: number): string => {
  const mensaje = generarMensajePedido(items, total);
  // Codificar el mensaje para la URL
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `${WHATSAPP_API_URL}/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
};

/**
 * Abre WhatsApp en una nueva ventana con el mensaje del pedido
 * @param {CartItem[]} items - Array de artículos del carrito
 * @param {number} total - Total del pedido en soles
 * 
 * @example
 * abrirWhatsApp(carrito.items, carrito.total);
 */
export const abrirWhatsApp = (items: CartItem[], total: number): void => {
  const enlace = generarEnlaceWhatsApp(items, total);
  window.open(enlace, '_blank');
};

/**
 * Copia el mensaje del pedido al portapapeles
 * @param {CartItem[]} items - Array de artículos del carrito
 * @param {number} total - Total del pedido en soles
 * @returns {Promise<void>}
 * 
 * @example
 * await copiarMensajePedido(carrito.items, carrito.total);
 */
export const copiarMensajePedido = async (items: CartItem[], total: number): Promise<void> => {
  const mensaje = generarMensajePedido(items, total);
  try {
    await navigator.clipboard.writeText(mensaje);
  } catch (error) {
    console.error('[WHATSAPP] Error al copiar mensaje:', error);
    throw error;
  }
};
