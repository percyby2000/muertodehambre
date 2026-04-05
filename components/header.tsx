/**
 * @file components/header.tsx
 * @description Componente de encabezado principal con navegación y botón del carrito
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Xmark, MapPin, ShoppingBag } from "iconoir-react"
import { useCart } from "@/context/CartContext"

/**
 * Propiedades del componente Header
 * @interface HeaderProps
 * @property {() => void} [onCartClick] - Callback cuando se hace click en el botón del carrito
 */
interface HeaderProps {
  onCartClick?: () => void;
}

/**
 * Componente Header
 * Encabezado fijo con:
 * - Logo y nombre del negocio
 * - Navegación responsive
 * - Ubicación
 * - Botón del carrito con contador
 * 
 * @component
 * @param {HeaderProps} props - Propiedades del componente
 * @returns {React.ReactElement} Elemento del encabezado
 */
export function Header({ onCartClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useCart()
  
  // Calcular cantidad total de artículos en el carrito
  const totalItems = cart.items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/graphics/fooiewagen logo.svg"
              alt="The Foodie Wagon"
              className="h-12 md:h-16 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-primary font-bold text-xl md:text-2xl tracking-wider uppercase">MUERTODEHAMBRE</h1>
              <p className="text-muted-foreground text-xs tracking-widest">DONDE EL SABOR LLEGA A TI</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#menu"
              className="text-foreground hover:text-primary transition-colors font-medium tracking-wide"
            >
              Menú
            </Link>
            <Link
              href="#location"
              className="text-foreground hover:text-primary transition-colors font-medium tracking-wide"
            >
              Ubicación
            </Link>
            <Link
              href="#contact"
              className="text-foreground hover:text-primary transition-colors font-medium tracking-wide"
            >
              Contacto
            </Link>
            <div className="flex items-center gap-2 text-accent">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Ayacucho</span>
            </div>

            {/* Botón del carrito */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-6 h-6 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Halal Badge */}
          <div className="hidden lg:flex items-center gap-4">
            <img
              src="/graphics/halal logo.svg"
              alt="100% Halal"
              className="h-12 w-auto"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <Xmark className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#menu"
                className="text-foreground hover:text-primary transition-colors font-medium tracking-wide py-2"
                onClick={() => setIsOpen(false)}
              >
                Menú
              </Link>
              <Link
                href="#location"
                className="text-foreground hover:text-primary transition-colors font-medium tracking-wide py-2"
                onClick={() => setIsOpen(false)}
              >
                Ubicación
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium tracking-wide py-2"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Ayacucho</span>
                </div>
                <button
                  onClick={onCartClick}
                  className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Abrir carrito"
                >
                  <ShoppingBag className="w-6 h-6 text-foreground" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
