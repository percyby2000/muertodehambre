/**
 * @file app/layout.tsx
 * @description Layout raíz de la aplicación MUERTODEHAMBRE
 * Configura metadatos SEO, fuentes, proveedores de contexto y análisis
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

import type React from "react"
import type { Metadata, Viewport } from "next"
import { Oswald, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/CartContext"
import "./globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://muertodehambre.com'),
  title: {
    default: 'MUERTODEHAMBRE | Hamburguesas Halal Premium y Pollo Frito en Ayacucho',
    template: '%s | MUERTODEHAMBRE'
  },
  description:
    "Descubre MUERTODEHAMBRE - Tu camión de comida para hamburguesas Halal premium caseras, pollo frito crujiente y comida callejera auténtica en Ayacucho. 100% Certificado Halal. ¡Ordena ahora!",
  keywords: [
    "muertodehambre",
    "food truck ayacucho",
    "hamburguesa halal ayacucho",
    "pollo frito ayacucho",
    "comida halal",
    "camión de comida",
    "hamburguesa halal",
    "pollo crujiente",
    "comida callejera",
    "fast food halal",
    "comida ayacucho",
    "camión de comida perú",
    "restaurant halal ayacucho",
    "entrega comida ayacucho",
    "pollo frito halal",
    "alas de pollo",
    "papas fritas",
    "nuggets queso",
    "certificado halal",
    "hamburguesas caseras"
  ],
  authors: [{ name: 'MUERTODEHAMBRE' }],
  creator: 'MUERTODEHAMBRE',
  publisher: 'MUERTODEHAMBRE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MUERTODEHAMBRE | Hamburguesas Halal Premium y Pollo Frito',
    description: 'Hamburguesas Halal premium caseras, pollo frito crujiente & comida callejera auténtica en Ayacucho. 100% Certificado Halal.',
    url: 'https://muertodehambre.com',
    siteName: 'MUERTODEHAMBRE',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: '/graphics/tasty burger.svg',
        width: 1200,
        height: 630,
        alt: 'MUERTODEHAMBRE - Hamburguesas Halal Premium',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUERTODEHAMBRE | Hamburguesas Halal Premium',
    description: 'Hamburguesas Halal premium caseras & Pollo Frito en Ayacucho. 100% Certificado Halal.',
    images: ['/graphics/tasty burger.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

/**
 * Componente RootLayout
 * Layout raíz que envuelve toda la aplicación
 * Proporciona:
 * - Metadatos SEO
 * - Fuentes tipográficas
 * - Contexto global del carrito
 * - Análisis con Vercel Analytics
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijo
 * @returns {React.ReactElement} Layout HTML con proveedores
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://muertodehambre.com" />
      </head>
      <body className={`${oswald.variable} ${playfair.variable} font-sans antialiased`}>
        {/* Proveedor del contexto del carrito */}
        <CartProvider>
          {children}
        </CartProvider>
        {/* Analytics de Vercel para rastreo de uso */}
        <Analytics />
      </body>
    </html>
  )
}
