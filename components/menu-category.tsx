/**
 * @file components/menu-category.tsx
 * @description Componente para mostrar productos de una categoría de menú
 * Muestra imágenes flotantes, precios y opción de agregar al carrito
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client';

import { FireFlame } from "iconoir-react"
import Image from "next/image"
import { AddToCartButton } from "./add-to-cart-button"

/**
 * Interfaz para un artículo de menú
 * @interface MenuItem
 * @property {string} name - Nombre del producto
 * @property {string} price - Precio en euros (formato "XX,XX€")
 * @property {number} priceSOL - Precio en soles peruanos
 * @property {string} description - Descripción del producto
 * @property {number} [spiceLevel] - Nivel de picor (1-3)
 * @property {string} [image] - URL de la imagen del producto
 * @property {string} [id] - ID único del producto para el carrito
 */
interface MenuItem {
  name: string
  price: string
  priceSOL: number
  description: string
  spiceLevel?: number
  image?: string
  id?: string
}

/**
 * Propiedades del componente MenuCategory
 * @interface MenuCategoryProps
 * @property {MenuItem[]} items - Array de productos a mostrar
 */
interface MenuCategoryProps {
  items: MenuItem[]
}

/**
 * Componente MenuCategory
 * Muestra una cuadrícula de productos con:
 * - Imágenes flotantes con efecto hover
 * - Precios en soles peruanos
 * - Indicador de nivel de picor
 * - Botón de agregar al carrito
 * 
 * @component
 * @param {MenuCategoryProps} props - Propiedades del componente
 * @returns {React.ReactElement} Grid de productos
 */
export function MenuCategory({ items }: MenuCategoryProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
      {items.map((item) => (
        <div
          key={item.name}
          className="group relative cursor-pointer"
        >
          {/* Floating Burger Image - NO BOX */}
          {item.image && (
            <div className="relative w-full aspect-square mb-6">
              {/* Price Badge - Floating on Image */}
              <div className="absolute -top-4 -right-4 z-20 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-black">S/ {item.priceSOL}</span>
              </div>

              {/* Halal Badge - Bottom Left Corner */}
              <div className="absolute bottom-2 left-2 z-20 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/graphics/halal logo.svg"
                  alt="100% Halal"
                  className="h-12 w-12 md:h-16 md:w-16 drop-shadow-lg"
                />
              </div>

              {/* Burger Image - Transparent Background, Floating Effect */}
              <div className="relative w-full h-full group-hover:-translate-y-2 transition-transform duration-500">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(251, 191, 36, 0.3))' }}
                />
              </div>
            </div>
          )}

          {/* Product Info - Below Floating Image */}
          <div className="text-center px-2">
            <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
              {item.description}
            </p>

            {/* Spice Level Indicator */}
            {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
              <div className="flex items-center justify-center gap-1 mt-2 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <FireFlame
                    key={i}
                    className={`w-5 h-5 ${i < item.spiceLevel! ? "text-red-500 fill-red-500" : "text-muted"}`}
                  />
                ))}
              </div>
            )}

            {/* Botón de agregar al carrito */}
            <AddToCartButton
              producto={{
                id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
                nombre: item.name,
                precio: item.priceSOL,
                cantidad: 1,
                descripcion: item.description,
                imagen: item.image,
              }}
              className="mt-6"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
