/**
 * @file app/page.tsx
 * @description Página principal de MUERTODEHAMBRE
 * Componente raíz que integra todos los componentes de la aplicación
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CartDrawer } from "@/components/cart-drawer"

/**
 * Componente Home
 * Página principal que contiene:
 * - Header con navegación
 * - Sección hero con call-to-action
 * - Menú interactivo con carrito
 * - Sección de ubicación
 * - Sección de contacto
 * - Footer
 * - Drawer del carrito
 * 
 * @component
 * @returns {React.ReactElement} Página principal de MUERTODEHAMBRE
 */
export default function Home() {
  // Estado para controlar la visibilidad del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://muertodehambre.com/#restaurant",
        "name": "MUERTODEHAMBRE",
        "description": "Hamburguesas Premium Halal en Camión de Comida en Ayacucho - Carne Molida Casera, Pollo Frito, y Comida Callejera Auténtica",
        "url": "https://muertodehambre.com",
        "telephone": "+51-913882945",
        "servesCuisine": ["Burger", "Halal", "Street Food", "Fast Food", "Comida Peruana"],
        "priceRange": "S/",
        "image": "https://muertodehambre.com/graphics/tasty burger.svg",
        "logo": "https://muertodehambre.com/graphics/fooiewagen logo.svg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ayacucho, Huamanga",
          "addressRegion": "Ayacucho",
          "addressCountry": "PE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-13.1539",
          "longitude": "-74.2247"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "06:00",
            "closes": "12:00"
          }
        ],
        "paymentAccepted": "Cash, Yape, Plin",
        "currenciesAccepted": "PEN"
      },
      {
        "@type": "FoodEstablishment",
        "@id": "https://muertodehambre.com/#foodestablishment",
        "name": "MUERTODEHAMBRE",
        "hasMenu": {
          "@type": "Menu",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Beef Burgers",
              "description": "Hausgemachte 140g Beef Patties, 100% Halal",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Cheesy Buffalo",
                  "description": "Brioche Bun, Beef Patty 140g, Käse, Burger Sauce, Gurke, Zwiebel, Tomaten, Salat",
                  "offers": {
                    "@type": "Offer",
                    "price": "10.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                },
                {
                  "@type": "MenuItem",
                  "name": "Angry Bull",
                  "description": "Brioche Bun, Beef Patty 140g, Käse, Chili Cheese Sauce, Jalapeno",
                  "offers": {
                    "@type": "Offer",
                    "price": "12.00",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Chicken Burgers",
              "description": "Knusprige Chicken Strips, 100% Halal",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Crunchy Chicken",
                  "description": "Brioche Bun, Chicken Strips, Käse, Burger Sauce, Salat",
                  "offers": {
                    "@type": "Offer",
                    "price": "8.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Fried Chicken",
              "description": "Knuspriges Fried Chicken - Wings & Strips",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Chicken Wings",
                  "description": "Knusprige Chicken Wings - 6, 10 oder 20 Stück",
                  "offers": {
                    "@type": "Offer",
                    "price": "7.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://muertodehambre.com/#localbusiness",
        "name": "MUERTODEHAMBRE",
        "description": "Camión de Comida Móvil para Hamburguesas Halal y Comida Callejera en Ayacucho",
        "slogan": "Donde el Sabor Llega a Ti",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Halal Certification",
          "name": "100% Certificado Halal"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://muertodehambre.com/#website",
        "url": "https://muertodehambre.com",
        "name": "MUERTODEHAMBRE",
        "description": "Hamburguesas Premium Halal y Comida Callejera en Ayacucho",
        "publisher": {
          "@id": "https://muertodehambre.com/#restaurant"
        },
        "inLanguage": "es-PE"
      }
    ]
  };

  return (
    <>
      {/* Datos estructurados SEO en formato JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Componentes principales de la aplicación */}
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <MenuSection />
      <LocationSection />
      <ContactSection />
      <Footer />
      <StickyCTA />
      
      {/* Drawer del carrito de compras */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
