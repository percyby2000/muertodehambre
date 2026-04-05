/**
 * @file context/CartContext.tsx
 * @description Contexto React para manejar el estado global del carrito de compras
 * Utiliza localStorage para persistencia de datos
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cart, CartItem, CartContextType } from '@/types/cart';

/**
 * Contexto del carrito de compras
 * Proporciona acceso a las funciones y estado del carrito en toda la aplicación
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Proveedor del contexto del carrito
 * Envuelve la aplicación para proporcionar acceso al carrito
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Elementos hijo que tendrán acceso al contexto
 * @returns {React.ReactElement} Proveedor del contexto
 * 
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado local del carrito
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
  });

  // Flag para saber si ya se cargó desde localStorage
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Calcula el total del carrito basado en los artículos
   * @param {CartItem[]} items - Array de artículos del carrito
   * @returns {number} Total en soles peruanos
   */
  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  };

  /**
   * Carga el carrito desde localStorage cuando la aplicación se monta
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('muertodehambre_carrito');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('[CARRITO] Error al cargar desde localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  /**
   * Guarda el carrito en localStorage cada vez que cambia
   */
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('muertodehambre_carrito', JSON.stringify(cart));
      } catch (error) {
        console.error('[CARRITO] Error al guardar en localStorage:', error);
      }
    }
  }, [cart, isLoaded]);

  /**
   * Agrega un artículo al carrito o incrementa su cantidad si ya existe
   * @param {CartItem} nuevoArticulo - Artículo a agregar
   */
  const agregarAlCarrito = (nuevoArticulo: CartItem) => {
    setCart((prevCart) => {
      const articuloExistente = prevCart.items.find(
        (item) => item.id === nuevoArticulo.id
      );

      let itemsActualizados: CartItem[];

      if (articuloExistente) {
        // Si el artículo ya existe, incrementar su cantidad
        itemsActualizados = prevCart.items.map((item) =>
          item.id === nuevoArticulo.id
            ? { ...item, cantidad: item.cantidad + nuevoArticulo.cantidad }
            : item
        );
      } else {
        // Si no existe, agregarlo al carrito
        itemsActualizados = [...prevCart.items, nuevoArticulo];
      }

      return {
        items: itemsActualizados,
        total: calculateTotal(itemsActualizados),
      };
    });
  };

  /**
   * Remueve un artículo del carrito por su ID
   * @param {string} id - ID del artículo a remover
   */
  const removerDelCarrito = (id: string) => {
    setCart((prevCart) => {
      const itemsActualizados = prevCart.items.filter((item) => item.id !== id);
      return {
        items: itemsActualizados,
        total: calculateTotal(itemsActualizados),
      };
    });
  };

  /**
   * Actualiza la cantidad de un artículo en el carrito
   * @param {string} id - ID del artículo
   * @param {number} cantidad - Nueva cantidad (debe ser mayor a 0)
   */
  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removerDelCarrito(id);
      return;
    }

    setCart((prevCart) => {
      const itemsActualizados = prevCart.items.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      );
      return {
        items: itemsActualizados,
        total: calculateTotal(itemsActualizados),
      };
    });
  };

  /**
   * Vacía completamente el carrito
   */
  const vaciarCarrito = () => {
    setCart({
      items: [],
      total: 0,
    });
  };

  const value: CartContextType = {
    cart,
    agregarAlCarrito,
    removerDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del carrito
 * Debe usarse dentro de un CartProvider
 * 
 * @returns {CartContextType} Objeto con el estado y funciones del carrito
 * @throws {Error} Si se usa fuera de un CartProvider
 * 
 * @example
 * const { cart, agregarAlCarrito } = useCart();
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
