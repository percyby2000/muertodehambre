/**
 * @file components/menu-section.tsx
 * @description Sección de menú con categorías y precios en soles peruanos
 * Muestra hamburguesas, entradas, pollo frito y bebidas con opción de carrito
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

"use client"

import { useState } from "react"
import { MenuCategory } from "./menu-category"
import { PizzaSlice as BurgerIcon, CoffeeCup, Leaf, FireFlame as Flame } from "iconoir-react"

/**
 * Función para convertir precios de euros a soles peruanos
 * Tasa de cambio aproximada: 1 EUR = 3.60 PEN
 * 
 * @param {string} precioEuro - Precio en euros con formato "XX,XX€" o "XX.XX€"
 * @returns {number} Precio convertido a soles peruanos
 */
const convertirASOles = (precioEuro: string): number => {
  // Extraer el número del formato "10,50€" o "10.50€"
  const valor = parseFloat(precioEuro.replace(/[€,]/g, '.'));
  // Multiplicar por tasa de cambio EUR a PEN (1 EUR ≈ 3.60 PEN)
  return Math.round(valor * 3.6 * 100) / 100;
};

const categories = [
  { id: "beef", label: "Hamburguesa Carne", icon: BurgerIcon },
  { id: "chicken", label: "Hamburguesa Pollo", icon: Flame },
  { id: "veggie", label: "Veggie", icon: Leaf },
  { id: "drinks", label: "Bebidas", icon: CoffeeCup },
]

/**
 * Objeto con los menús de todas las categorías
 * Cada producto incluye precio en euros y su conversión a soles peruanos
 * @constant
 */
const menuItems = {
  beef: [
    {
      id: "cheesy-buffalo",
      name: "Cheesy Buffalo",
      price: "10,50€",
      priceSOL: convertirASOles("10,50€"),
      description: "Brioche Bun, Carne Molida Casera 140g, Queso, Salsa Burger, Pepinillo, Cebolla, Tomate, Lechuga",
      spiceLevel: 3,
      image: "/burgers/beef/Cheesy-Buffalo_10,50euros.webp",
    },
    {
      id: "angry-bull",
      name: "Angry Bull",
      price: "12,00€",
      priceSOL: convertirASOles("12,00€"),
      description:
        "Brioche Bun, Carne Molida Casera 140g, Queso, Salsa Queso Picante, Jalapeño, Pepinillo, Cebolla, Lechuga",
      spiceLevel: 3,
      image: "/burgers/beef/Angry-Bull_12euros.webp",
    },
    {
      id: "smokie-beefy-bbq",
      name: "Smokie Beefy BBQ",
      price: "13,00€",
      priceSOL: convertirASOles("13,00€"),
      description:
        "Brioche Bun, Carne Molida Casera 140g, Queso, Salsa Burger, Pepinillo, Aros de Cebolla, Cebolla Rostizada, Salsa BBQ, Tomate, Lechuga",
      spiceLevel: 3,
      image: "/burgers/beef/Smookie-Beefy-BBQ_13euros.webp",
    },
    {
      id: "blazing-nacho-beef",
      name: "Blazing Nacho Beef",
      price: "13,00€",
      priceSOL: convertirASOles("13,00€"),
      description:
        "Brioche Bun, Carne Molida Casera 140g, Queso, Salsa Burger, Pepinillo, Jalapeño, Nachos, Salsa Sriracha, Tomate, Lechuga",
      spiceLevel: 3,
      image: "/burgers/beef/Blazing-Nacho-Beef_13euros.webp",
    },
    {
      id: "cheese-burger",
      name: "Cheese Burger",
      price: "7,00€",
      priceSOL: convertirASOles("7,00€"),
      description: "Brioche Bun, Carne Molida Casera 140g, Queso, Salsa Burger, Pepinillo, Cebolla, Tomate, Lechuga",
      spiceLevel: 1,
      image: "/burgers/beef/Cheese-Burger_7euros.webp",
    },
  ],
  chicken: [
    {
      id: "crunchy-chicken",
      name: "Crunchy Chicken",
      price: "8,50€",
      priceSOL: convertirASOles("8,50€"),
      description: "Brioche Bun, Tiras de Pollo, Queso, Salsa Burger, Lechuga",
      spiceLevel: 2,
      image: "/burgers/chicken/Chrunchy-Chicken_8,50euros.webp",
    },
    {
      id: "loaded-crunchy",
      name: "Loaded Crunchy",
      price: "9,00€",
      priceSOL: convertirASOles("9,00€"),
      description: "Brioche Bun, Tiras de Pollo, Queso, Salsa Burger, Tomate, Cebolla, Pepinillo, Lechuga",
      spiceLevel: 2,
      image: "/burgers/chicken/Loaded-Chrunchy_9euros.webp",
    },
    {
      id: "crispy-ringer",
      name: "Crispy Ringer",
      price: "10,00€",
      priceSOL: convertirASOles("10,00€"),
      description: "Brioche Bun, Tiras de Pollo, Queso, Salsa Burger, Aros de Cebolla, Cebolla, Tomate, Lechuga",
      spiceLevel: 2,
      image: "/burgers/chicken/Crispy-Ringer_10euros.webp",
    },
    {
      id: "mexican-cracker",
      name: "Mexican Cracker",
      price: "11,00€",
      priceSOL: convertirASOles("11,00€"),
      description:
        "Brioche Bun, Tiras de Pollo, Queso, Salsa Burger, Jalapeño, Pepinillo, Nachos, Salsa Sriracha, Cebolla, Lechuga",
      spiceLevel: 2,
      image: "/burgers/chicken/Mexican-Cracker_11euros.webp",
    },
    {
      id: "flip-chicken-burger",
      name: "Flip Chicken Burger",
      price: "6,00€",
      priceSOL: convertirASOles("6,00€"),
      description: "Brioche Bun, Tiras de Pollo, Queso, Salsa Burger, Lechuga",
      spiceLevel: 1,
      image: "/burgers/chicken/Flip-Chicken-Burger_6euros.webp",
    },
    {
      id: "foodie-bomber",
      name: "Foodie Bomber",
      price: "13,00€",
      priceSOL: convertirASOles("13,00€"),
      description:
        "Brioche Bun, Tiras de Pollo, Queso, Nuggets Queso Picante, Salsa Queso Picante, Cebolla, Jalapeño, Lechuga",
      spiceLevel: 2,
      image: "/burgers/chicken/Foodie-Bomber-13euros.webp",
    },
  ],
  veggie: [
    {
      id: "plant-power",
      name: "Plant Power",
      price: "9,00€",
      priceSOL: convertirASOles("9,00€"),
      description: "Brioche Bun, Falafel, Queso, Salsa Burger, Pepinillo, Lechuga, Cebolla, Tomate",
      spiceLevel: 0,
    },
    {
      id: "veggie-bbq",
      name: "Veggie BBQ",
      price: "11,00€",
      priceSOL: convertirASOles("11,00€"),
      description:
        "Brioche Bun, Falafel, Queso, Salsa Burger, Pepinillo, Aros de Cebolla, Cebolla Rostizada, Salsa BBQ, Tomate, Lechuga",
      spiceLevel: 0,
    },
  ],
  drinks: [
    { id: "coca-cola", name: "Coca Cola", price: "2,50€", priceSOL: convertirASOles("2,50€"), description: "330ml Lata", image: "/graphics/cold drinks sprite cola fanta.svg" },
    { id: "coca-cola-zero", name: "Coca Cola Zero", price: "2,50€", priceSOL: convertirASOles("2,50€"), description: "330ml Lata", image: "/graphics/cold drinks sprite cola fanta.svg" },
    { id: "fanta", name: "Fanta", price: "2,50€", priceSOL: convertirASOles("2,50€"), description: "330ml Lata", image: "/graphics/cold drinks sprite cola fanta.svg" },
    { id: "sprite", name: "Sprite", price: "2,50€", priceSOL: convertirASOles("2,50€"), description: "330ml Lata", image: "/graphics/cold drinks sprite cola fanta.svg" },
    { id: "capri-sun", name: "Capri Sun", price: "1,50€", priceSOL: convertirASOles("1,50€"), description: "200ml", image: "/graphics/caprisun.svg" },
    { id: "agua", name: "Agua Mineral", price: "2,00€", priceSOL: convertirASOles("2,00€"), description: "500ml", image: "/graphics/water.svg" },
    { id: "mezzo-mix", name: "Mezzo Mix", price: "2,50€", priceSOL: convertirASOles("2,50€"), description: "330ml Lata", image: "/graphics/cold drinks sprite cola fanta.svg" },
    { id: "red-bull", name: "Red Bull", price: "3,50€", priceSOL: convertirASOles("3,50€"), description: "250ml Lata", image: "/graphics/redbull.svg" },
  ],
}

/**
 * Componente MenuSection
 * Sección principal de menú que muestra:
 * - Tabs con categorías de productos
 * - Grid de productos con precios en soles
 * - Entradas, pollo frito y salsas adicionales
 * - Sistema de carrito integrado
 * 
 * @component
 * @returns {React.ReactElement} Sección completa del menú
 */
export function MenuSection() {
  // Estado para la categoría actualmente seleccionada
  const [activeCategory, setActiveCategory] = useState("beef")

  return (
    <section id="menu" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Restaurant Style */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tighter mb-4">
            NUESTRAS HAMBURGUESAS
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-medium">
            Carne Molida Casera, Pollo Frito Crujiente e Ingredientes Frescos
          </p>
        </div>

        {/* Deal Banner - Eye-Catching */}
        <div className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-amber-400 to-primary opacity-20 animate-pulse" />
          <div className="relative p-8 text-center border-4 border-primary rounded-3xl bg-card">
            <p className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-2">
              COMBO ESPECIAL
            </p>
            <p className="text-xl md:text-2xl font-bold text-foreground">
              Hamburguesa + Papas + Bebida = <span className="text-primary">Precio Especial</span>
            </p>
          </div>
        </div>

        {/* Category Tabs - Bold Restaurant Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg tracking-tight transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/50 scale-105"
                    : "bg-card border-2 border-border text-foreground hover:border-primary/50 hover:scale-105"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>

        {/* Menu Items */}
        <MenuCategory items={menuItems[activeCategory as keyof typeof menuItems]} />

        {/* Sides & Extras - Floating Style */}
        <div className="mt-24 space-y-16">
          {/* Appetizers Section */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-primary mb-12 tracking-tighter text-center">
              ENTRADAS Y ACOMPAÑAMIENTOS
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { name: "Chili Cheese Nuggets", image: "/Appetizers/Chilli-Cheese-Nuggets.webp", prices: "6 Ud. S/ 18 • 10 Ud. S/ 27 • 16 Ud. S/ 40" },
                { name: "Mozzarella Sticks", image: "/Appetizers/Mozarella-Sticks.webp", prices: "4 Ud. S/ 18 • 8 Ud. S/ 32 • 14 Ud. S/ 50" },
                { name: "Aros de Cebolla", image: "/Appetizers/Onion-Rings.webp", prices: "6 Ud. S/ 14 • 12 Ud. S/ 25 • 24 Ud. S/ 43" },
                { name: "Porción de Papas", image: "/Appetizers/Pommes_3,5euros.webp", prices: "S/ 13", featured: true }
              ].map((item) => (
                <div
                  key={item.name}
                  className="group relative cursor-pointer"
                >
                  <div className="relative w-full aspect-square mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                    {/* Halal Badge - Bottom Left Corner */}
                    <div className="absolute bottom-2 left-2 z-20 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/graphics/halal logo.svg"
                        alt="100% Halal"
                        className="h-10 w-10 md:h-12 md:w-12 drop-shadow-lg"
                      />
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
                      style={{ filter: 'drop-shadow(0 8px 20px rgba(251, 191, 36, 0.2))' }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-black text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className={`font-bold ${item.featured ? 'text-2xl text-primary' : 'text-sm text-primary'}`}>
                      {item.prices}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fried Chicken Section */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-primary mb-12 tracking-tighter text-center">
              POLLO FRITO
            </h3>
            <div className="grid sm:grid-cols-2 gap-12">
              {[
                { name: "Alas de Pollo", image: "/Fried-Chicken/Chicken-Wings.webp", prices: "6 Ud. S/ 27 • 10 Ud. S/ 40 • 20 Ud. S/ 72" },
                { name: "Tiras de Pollo", image: "/Fried-Chicken/Chicken-Stripes.webp", prices: "3 Ud. S/ 22 • 6 Ud. S/ 41 • 9 Ud. S/ 58" }
              ].map((item) => (
                <div
                  key={item.name}
                  className="group relative cursor-pointer"
                >
                  <div className="relative w-full aspect-video mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                    {/* Halal Badge - Bottom Left Corner */}
                    <div className="absolute bottom-2 left-2 z-20 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/graphics/halal logo.svg"
                        alt="100% Halal"
                        className="h-12 w-12 md:h-14 md:w-14 drop-shadow-lg"
                      />
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_25px_70px_rgba(0,0,0,0.4)] transition-all duration-500"
                      style={{ filter: 'drop-shadow(0 10px 25px rgba(251, 191, 36, 0.25))' }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl lg:text-3xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-lg font-bold text-primary">{item.prices}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dips Section - Restaurant Menu Style */}
        <div className="mt-16">
          <h3 className="text-4xl md:text-5xl font-black text-primary mb-12 tracking-tighter text-center">
            SALSAS Y DIPS
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "Mayo", price: "S/ 2" },
              { name: "Ketchup", price: "S/ 2" },
              { name: "Ajo Especial", price: "S/ 4" },
              { name: "BBQ Picante", price: "S/ 4" },
              { name: "Curry Premium", price: "S/ 4" },
              { name: "Llama de Dragón", price: "S/ 4" },
              { name: "Volcán Ahumado", price: "S/ 4" },
              { name: "Magia Chili Dulce", price: "S/ 4" },
              { name: "Chili Queso Picante", price: "S/ 4" },
              { name: "Salsa Burger Clásica", price: "S/ 4" },
            ].map((dip) => (
              <div
                key={dip.name}
                className="group cursor-pointer"
              >
                <div className="relative w-full aspect-square mb-3">
                  <img
                    src="/graphics/dips.svg"
                    alt={dip.name}
                    className="w-full h-full object-contain group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <p className="text-foreground font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                    {dip.name}
                  </p>
                  <p className="text-primary font-black text-lg">{dip.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
