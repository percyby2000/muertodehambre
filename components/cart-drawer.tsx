/**
 * @file components/cart-drawer.tsx
 * @description Componente drawer (panel lateral) que muestra el carrito de compras
 * Permite ver artículos, actualizar cantidades y procesar pedidos por WhatsApp
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { X, Trash2, MessageCircle, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { abrirWhatsApp, copiarMensajePedido } from '@/lib/whatsapp';

/**
 * Propiedades del componente CartDrawer
 * @interface CartDrawerProps
 * @property {boolean} isOpen - Si el drawer está abierto
 * @property {() => void} onClose - Función callback para cerrar el drawer
 */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente CartDrawer
 * Panel lateral que muestra el resumen del carrito con opciones para:
 * - Ver y modificar artículos
 * - Aumentar/disminuir cantidades
 * - Procesar pedido por WhatsApp
 * - Copiar mensaje del pedido
 * 
 * @component
 * @param {CartDrawerProps} props - Propiedades del componente
 * @returns {React.ReactElement} Elemento del drawer del carrito
 * 
 * @example
 * const [isCartOpen, setIsCartOpen] = useState(false);
 * <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 */
export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removerDelCarrito, actualizarCantidad, vaciarCarrito } = useCart();
  const [isCopyingMessage, setIsCopyingMessage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  /**
   * Maneja la acción de copiar el mensaje del pedido al portapapeles
   */
  const handleCopiarMensaje = async () => {
    try {
      setIsCopyingMessage(true);
      await copiarMensajePedido(cart.items, cart.total);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('[CARRITO] Error al copiar mensaje:', error);
    } finally {
      setIsCopyingMessage(false);
    }
  };

  /**
   * Maneja la acción de procesar pedido por WhatsApp
   */
  const handlePedidoWhatsApp = () => {
    if (cart.items.length === 0) {
      alert('Por favor agrega productos al carrito');
      return;
    }
    abrirWhatsApp(cart.items, cart.total);
  };

  return (
    <>
      {/* Overlay semitransparente */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel del carrito */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Mi Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Tu carrito está vacío</p>
              <p className="text-muted-foreground text-sm mt-2">
                Agrega productos para comenzar tu pedido
              </p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-secondary rounded-lg border border-border space-y-3"
              >
                {/* Nombre y precio */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.nombre}</h3>
                    <p className="text-primary font-bold">S/ {item.precio.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removerDelCarrito(item.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    aria-label="Remover producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-3 bg-background rounded">
                  <button
                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    className="p-2 hover:bg-secondary rounded transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-semibold">{item.cantidad}</span>
                  <button
                    onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    className="p-2 hover:bg-secondary rounded transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right text-sm text-muted-foreground">
                  Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y botones */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary text-2xl">S/ {cart.total.toFixed(2)}</span>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
              {/* Botón de WhatsApp */}
              <button
                onClick={handlePedidoWhatsApp}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Pedido por WhatsApp
              </button>

              {/* Botón de copiar mensaje */}
              <button
                onClick={handleCopiarMensaje}
                disabled={isCopyingMessage}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-colors ${
                  copySuccess
                    ? 'bg-green-500/20 text-green-600 border border-green-500'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
                }`}
              >
                <Copy className="w-5 h-5" />
                {copySuccess ? '¡Copiado!' : 'Copiar Mensaje'}
              </button>

              {/* Botón de vaciar carrito */}
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                    vaciarCarrito();
                  }
                }}
                className="w-full px-4 py-2 text-destructive hover:bg-destructive/10 border border-destructive rounded-lg font-bold transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
