/**
 * @file DOCUMENTACION_CODIGO.md
 * @description Documentación completa del código de MUERTODEHAMBRE
 * Sistema de carrito de compras y pedidos por WhatsApp
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 * @date 2026-04-04
 */

# 📋 Documentación del Código - MUERTODEHAMBRE

## 📑 Tabla de Contenidos
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Sistema de Carrito](#sistema-de-carrito)
3. [Integración WhatsApp](#integración-whatsapp)
4. [Precios en Soles Peruanos](#precios-en-soles-peruanos)
5. [Componentes Principales](#componentes-principales)
6. [Archivos Nuevos](#archivos-nuevos)
7. [Guía de Uso](#guía-de-uso)

---

## 🏗️ Estructura del Proyecto

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Layout raíz con CartProvider
│   ├── page.tsx                # Página principal
│   ├── globals.css             # Estilos globales
│   └── ...
├── components/
│   ├── header.tsx              # Encabezado con botón carrito
│   ├── menu-section.tsx        # Sección de menú con categorías
│   ├── menu-category.tsx       # Grid de productos
│   ├── cart-drawer.tsx         # Panel lateral del carrito ✨ NUEVO
│   ├── add-to-cart-button.tsx  # Botón para agregar productos ✨ NUEVO
│   ├── footer.tsx              # Pie de página
│   └── ...
├── context/
│   └── CartContext.tsx         # Contexto global del carrito ✨ NUEVO
├── types/
│   └── cart.ts                 # Tipos TypeScript del carrito ✨ NUEVO
├── lib/
│   └── whatsapp.ts             # Utilidades de WhatsApp ✨ NUEVO
└── ...
```

---

## 🛒 Sistema de Carrito

### Descripción General
El sistema de carrito utiliza **React Context API** para manejar el estado global de las compras con persistencia en **localStorage**.

### Características
- ✅ Agregar/remover productos
- ✅ Actualizar cantidades
- ✅ Cálculo automático de totales
- ✅ Persistencia en localStorage
- ✅ Carrito accesible desde cualquier componente

### Flujo de Datos

```
Usuario selecciona producto
    ↓
AddToCartButton → useCart()
    ↓
CartContext actualiza estado
    ↓
localStorage guarda estado
    ↓
CartDrawer muestra carrito actualizado
    ↓
Usuario puede procesar pedido por WhatsApp
```

### Archivos Principales

#### 1. `types/cart.ts`
Define las interfaces TypeScript para el carrito.

```typescript
/**
 * Interface para un artículo en el carrito
 */
interface CartItem {
  id: string;              // ID único del producto
  nombre: string;          // Nombre del producto
  precio: number;          // Precio en soles peruanos
  cantidad: number;        // Cantidad seleccionada
  descripcion?: string;    // Descripción opcional
  imagen?: string;         // URL de imagen
}

/**
 * Interface para el estado del carrito
 */
interface Cart {
  items: CartItem[];       // Array de artículos
  total: number;           // Total en soles
}
```

#### 2. `context/CartContext.tsx`
Proporciona el contexto global y el hook `useCart()`.

**Funciones principales:**
- `agregarAlCarrito()` - Agrega un producto (incrementa cantidad si existe)
- `removerDelCarrito()` - Elimina un producto
- `actualizarCantidad()` - Cambia la cantidad de un producto
- `vaciarCarrito()` - Vacía el carrito completamente

**Ejemplo de uso:**
```typescript
import { useCart } from '@/context/CartContext';

export function MiComponente() {
  const { cart, agregarAlCarrito, removerDelCarrito } = useCart();
  
  const handleAgregar = () => {
    agregarAlCarrito({
      id: 'burger-1',
      nombre: 'Hamburguesa Clásica',
      precio: 25.00,
      cantidad: 1
    });
  };
  
  return (
    <div>
      <button onClick={handleAgregar}>Agregar</button>
      <p>Total: S/ {cart.total.toFixed(2)}</p>
    </div>
  );
}
```

---

## 📱 Integración WhatsApp

### Descripción General
Genera mensajes de pedidos personalizados y abre WhatsApp automáticamente.

### Características
- ✅ Mensaje formateado con todos los productos
- ✅ Cálculo automático de total
- ✅ Incluye información de ubicación y horario
- ✅ Copiar mensaje al portapapeles
- ✅ Integración con número +51 913882945

### Archivo Principal: `lib/whatsapp.ts`

**Funciones disponibles:**

#### `generarMensajePedido(items, total)`
Genera un mensaje formateado para WhatsApp.

```typescript
const items = [
  { id: '1', nombre: 'Hamburguesa', precio: 25.00, cantidad: 2 }
];
const total = 50.00;

const mensaje = generarMensajePedido(items, total);
// Resultado:
// "¡Hola! 👋 Quisiera hacer un pedido de MUERTODEHAMBRE:
// 
// 📋 PEDIDO:
// • 2x Hamburguesa - S/ 50.00
// 
// 💰 TOTAL: S/ 50.00
// ..."
```

#### `generarEnlaceWhatsApp(items, total)`
Genera URL codificada para WhatsApp.

```typescript
const enlace = generarEnlaceWhatsApp(items, total);
// https://wa.me/51913882945?text=...
```

#### `abrirWhatsApp(items, total)`
Abre WhatsApp automáticamente en nueva ventana.

```typescript
// En el componente CartDrawer
<button onClick={() => abrirWhatsApp(cart.items, cart.total)}>
  Pedido por WhatsApp
</button>
```

#### `copiarMensajePedido(items, total)`
Copia el mensaje al portapapeles.

```typescript
await copiarMensajePedido(cart.items, cart.total);
// Mensaje copiado - mostrar feedback
```

### Ejemplo de Mensaje Generado

```
¡Hola! 👋 Quisiera hacer un pedido de MUERTODEHAMBRE:

📋 PEDIDO:
• 2x Cheesy Buffalo - S/ 75.60
• 1x Coca Cola - S/ 9.00

💰 TOTAL: S/ 84.60

📍 UBICACIÓN: Ayacucho, Huamanga
⏰ HORARIO: 6:00 AM - 12:00 PM
💳 PAGO: Efectivo, Yape o Plin

¿Puedo confirmar mi pedido?
```

---

## 💱 Precios en Soles Peruanos

### Sistema de Conversión
Los precios están almacenados en euros pero se convierten a soles automáticamente.

**Tasa de cambio:** 1 EUR = 3.60 PEN (configurable)

### Función de Conversión
```typescript
/**
 * Convierte precio de euros a soles peruanos
 * @param precioEuro - Formato "10,50€" o "10.50€"
 * @returns Precio en soles
 */
const convertirASOles = (precioEuro: string): number => {
  const valor = parseFloat(precioEuro.replace(/[€,]/g, '.'));
  return Math.round(valor * 3.6 * 100) / 100;
};

// Ejemplo:
convertirASOles("10,50€")  // 37.80 soles
convertirASOles("2,50€")   // 9.00 soles
```

### Dónde se Usa
- ✅ `menu-section.tsx` - Conversión de precios de menú
- ✅ `menu-category.tsx` - Mostrar precios en soles en productos
- ✅ `cart-drawer.tsx` - Mostrar totales en soles
- ✅ `whatsapp.ts` - Mensaje de pedido con precios en soles

---

## 🎨 Componentes Principales

### 1. Header (`components/header.tsx`)

**Cambios principales:**
- Botón carrito con contador de artículos
- Icono de carrito con badge rojo
- Responsive para mobile y desktop

```typescript
// Uso
<Header onCartClick={() => setIsCartOpen(true)} />
```

### 2. Menu Section (`components/menu-section.tsx`)

**Cambios principales:**
- Función de conversión de precios a soles
- Descripción completa de cada componente en JSDoc
- Datos de menú con `priceSOL` incluido

```typescript
// Estructura de producto
{
  id: "cheesy-buffalo",           // ID único
  name: "Cheesy Buffalo",         // Nombre
  price: "10,50€",                // Precio original
  priceSOL: 37.80,                // Precio en soles (calculado)
  description: "...",             // Descripción
  spiceLevel: 3,                  // Nivel de picor
  image: "/burgers/beef/..."      // URL imagen
}
```

### 3. Menu Category (`components/menu-category.tsx`)

**Cambios principales:**
- Integración con `AddToCartButton`
- Mostrar precios en soles (S/)
- Pasa datos completos al carrito

### 4. Add to Cart Button (`components/add-to-cart-button.tsx`) ✨ NUEVO

**Características:**
- Selector de cantidad
- Botón con feedback visual (cambio de color)
- Calcula subtotal dinámicamente
- Integrado con `useCart()`

```typescript
<AddToCartButton
  producto={{
    id: 'burger-1',
    nombre: 'Hamburguesa Clásica',
    precio: 25.00,
    cantidad: 1
  }}
/>
```

### 5. Cart Drawer (`components/cart-drawer.tsx`) ✨ NUEVO

**Características:**
- Panel lateral deslizable
- Mostrar artículos del carrito
- Modificar cantidades (+ / -)
- Botón "Pedido por WhatsApp" (verde)
- Botón "Copiar Mensaje"
- Botón "Vaciar Carrito"
- Mostrar total en soles

```typescript
// Uso en page.tsx
const [isCartOpen, setIsCartOpen] = useState(false);
<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
```

### 6. Layout (`app/layout.tsx`)

**Cambios principales:**
- Envuelve la app con `CartProvider`
- Metadatos en español
- Documentación JSDoc completa

```typescript
<CartProvider>
  {children}
</CartProvider>
```

---

## 📂 Archivos Nuevos

### ✨ `types/cart.ts` (54 líneas)
Define todos los tipos TypeScript para el carrito.
- `CartItem` - Artículo en carrito
- `Cart` - Estado del carrito
- `CartContextType` - Interface del contexto

### ✨ `context/CartContext.tsx` (191 líneas)
Proveedor y hook del carrito.
- `CartProvider` - Componente proveedor
- `useCart()` - Hook para acceder al contexto
- Persistencia con localStorage

### ✨ `lib/whatsapp.ts` (104 líneas)
Utilidades para integración WhatsApp.
- `generarMensajePedido()` - Mensaje formateado
- `generarEnlaceWhatsApp()` - URL de WhatsApp
- `abrirWhatsApp()` - Abre WhatsApp
- `copiarMensajePedido()` - Copia al portapapeles

### ✨ `components/cart-drawer.tsx` (214 líneas)
Panel lateral con carrito de compras.
- Mostrar artículos
- Modificar cantidades
- Botones de WhatsApp y copiar
- Vaciar carrito

### ✨ `components/add-to-cart-button.tsx` (136 líneas)
Botón reutilizable para agregar productos.
- Selector de cantidad
- Feedback visual
- Cálculo de subtotal

---

## 🚀 Guía de Uso

### Para el Usuario

#### Agregar Producto
1. Ver menú con categorías
2. Seleccionar cantidad con +/-
3. Click "Agregar al Carrito"
4. Ícono carrito muestra contador

#### Ver Carrito
1. Click ícono carrito (arriba derecha)
2. Panel desliza desde la derecha
3. Ver todos los productos

#### Modificar Carrito
1. Usar botones +/- para cantidad
2. Click basura para remover
3. Total actualiza automáticamente

#### Hacer Pedido
1. Click "Pedido por WhatsApp" (botón verde)
2. Se abre WhatsApp con mensaje automático
3. Escribir número: 51 913882945
4. Confirmar envío

#### Alternativa
1. Click "Copiar Mensaje"
2. Abrir WhatsApp manualmente
3. Pegar mensaje en chat

### Para el Desarrollador

#### Agregar Nuevo Producto
```typescript
// En menu-section.tsx
{
  id: "nuevo-producto",
  name: "Nombre Producto",
  price: "10,00€",
  priceSOL: convertirASOles("10,00€"),
  description: "Descripción...",
  spiceLevel: 2,
  image: "/url/imagen.webp"
}
```

#### Cambiar Tasa de Cambio
```typescript
// En lib/whatsapp.ts o menu-section.tsx
const valor * 3.6;  // Cambiar este número
```

#### Acceder al Carrito en Componente
```typescript
import { useCart } from '@/context/CartContext';

export function MiComponente() {
  const { cart, agregarAlCarrito } = useCart();
  // Usar aquí
}
```

---

## 📱 Información WhatsApp

- **Número:** +51 913882945
- **Ubicación:** Ayacucho, Huamanga, Manzana I, Lote 12
- **Horario:** 6:00 AM - 12:00 PM
- **Pago:** Efectivo, Yape, Plin
- **Moneda:** Soles Peruanos (PEN)

---

## ✅ Checklist de Implementación

- [x] Sistema de carrito con Context API
- [x] Persistencia en localStorage
- [x] Componente CartDrawer
- [x] Botón AddToCartButton
- [x] Integración WhatsApp
- [x] Conversión de precios a soles
- [x] Documentación en JSDoc
- [x] Tipos TypeScript completos
- [x] Función copiar mensaje
- [x] Respuesta mobile y desktop

---

## 🎯 Resumen de Cambios

| Archivo | Estado | Descripción |
|---------|--------|-------------|
| `types/cart.ts` | ✨ NUEVO | Tipos del carrito |
| `context/CartContext.tsx` | ✨ NUEVO | Contexto global |
| `lib/whatsapp.ts` | ✨ NUEVO | Integración WhatsApp |
| `components/cart-drawer.tsx` | ✨ NUEVO | Panel carrito |
| `components/add-to-cart-button.tsx` | ✨ NUEVO | Botón agregar |
| `components/header.tsx` | 🔄 ACTUALIZADO | Botón carrito |
| `components/menu-section.tsx` | 🔄 ACTUALIZADO | Precios soles + JSDoc |
| `components/menu-category.tsx` | 🔄 ACTUALIZADO | Botón carrito + JSDoc |
| `app/layout.tsx` | 🔄 ACTUALIZADO | CartProvider + JSDoc |
| `app/page.tsx` | 🔄 ACTUALIZADO | CartDrawer + JSDoc |

---

**Última actualización:** 4 de abril de 2026
**Versión:** 1.0.0
**Estado:** Producción ✅
