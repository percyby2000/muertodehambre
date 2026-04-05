/**
 * @file components/add-to-cart-button.tsx
 * @description Componente reutilizable para botón de "Agregar al Carrito"
 * Muestra cantidad y permite agregar productos al carrito
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types/cart';

/**
 * Propiedades del componente AddToCartButton
 * @interface AddToCartButtonProps
 * @property {CartItem} producto - Producto a agregar al carrito
 * @property {string} [className] - Clases CSS adicionales
 */
interface AddToCartButtonProps {
  producto: CartItem;
  className?: string;
}

/**
 * Componente AddToCartButton
 * Botón interactivo para agregar productos al carrito con:
 * - Selector de cantidad
 * - Feedback visual de éxito
 * - Integración con contexto del carrito
 * 
 * @component
 * @param {AddToCartButtonProps} props - Propiedades del componente
 * @returns {React.ReactElement} Botón para agregar al carrito
 * 
 * @example
 * const producto = {
 *   id: 'burger-1',
 *   nombre: 'Hamburguesa Clásica',
 *   precio: 15.00,
 *   cantidad: 1
 * };
 * <AddToCartButton producto={producto} />
 */
export const AddToCartButton = ({ producto, className = '' }: AddToCartButtonProps) => {
  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  /**
   * Maneja el click en el botón de agregar al carrito
   */
  const handleAgregar = () => {
    // Validar que la cantidad sea mayor a 0
    if (cantidad <= 0) {
      alert('Por favor selecciona una cantidad válida');
      return;
    }

    // Agregar el producto con la cantidad especificada
    agregarAlCarrito({
      ...producto,
      cantidad,
    });

    // Mostrar feedback visual
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setCantidad(1); // Resetear cantidad
    }, 1500);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Selector de cantidad */}
      <div className="flex items-center gap-2 bg-secondary rounded-lg p-2">
        <button
          onClick={() => setCantidad(Math.max(1, cantidad - 1))}
          className="px-3 py-1 hover:bg-background rounded transition-colors font-bold"
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => {
            const valor = parseInt(e.target.value) || 1;
            setCantidad(Math.max(1, valor));
          }}
          className="flex-1 text-center bg-transparent font-bold outline-none"
          min="1"
          aria-label="Cantidad de productos"
        />
        <button
          onClick={() => setCantidad(cantidad + 1)}
          className="px-3 py-1 hover:bg-background rounded transition-colors font-bold"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      {/* Botón de agregar */}
      <button
        onClick={handleAgregar}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold tracking-wider transition-all ${
          isAdded
            ? 'bg-green-500 text-white'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Agregado
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Agregar al Carrito
          </>
        )}
      </button>

      {/* Mostrar precio total */}
      <p className="text-center text-muted-foreground text-sm">
        Total: <span className="font-bold text-primary">S/ {(producto.precio * cantidad).toFixed(2)}</span>
      </p>
    </div>
  );
};
