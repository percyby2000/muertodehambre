/**
 * @file INICIO_RAPIDO.md
 * @description Guía de inicio rápido para desarrolladores
 * Todo lo que necesitas saber en 5 minutos
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

# ⚡ INICIO RÁPIDO - MUERTODEHAMBRE

## 🎯 En 5 Minutos

### 1️⃣ Entender el Carrito
```typescript
// El carrito es global, accesible en cualquier componente
import { useCart } from '@/context/CartContext';

export function MiComponente() {
  const { cart, agregarAlCarrito } = useCart();
  
  // Ver carrito
  console.log(cart.items);      // Productos
  console.log(cart.total);      // Total en soles
}
```

### 2️⃣ Agregar Producto
```typescript
// En cualquier componente
const { agregarAlCarrito } = useCart();

agregarAlCarrito({
  id: 'burger-1',
  nombre: 'Hamburguesa Clásica',
  precio: 25.00,           // En soles
  cantidad: 1,
  descripcion: 'Deliciosa'
});
```

### 3️⃣ Abrir WhatsApp
```typescript
import { abrirWhatsApp } from '@/lib/whatsapp';

// Enviar pedido
abrirWhatsApp(cart.items, cart.total);
```

### 4️⃣ Convertir Precios
```typescript
import { menu-section.tsx }; // Ver función convertirASOles

const precioEuro = "10,50€";
const precioSOL = convertirASOles(precioEuro);  // 37.80
```

---

## 📂 Archivos Clave

| Archivo | Uso |
|---------|-----|
| `context/CartContext.tsx` | Estado global del carrito |
| `types/cart.ts` | Tipos TypeScript |
| `lib/whatsapp.ts` | Funciones WhatsApp |
| `components/cart-drawer.tsx` | Panel del carrito |
| `components/add-to-cart-button.tsx` | Botón agregar |

---

## 🔑 5 Hooks/Funciones Principales

### 1. `useCart()`
Acceder al carrito en cualquier componente.
```typescript
const { cart, agregarAlCarrito, removerDelCarrito, actualizarCantidad, vaciarCarrito } = useCart();
```

### 2. `agregarAlCarrito(item)`
Agrega producto o incrementa cantidad si existe.
```typescript
agregarAlCarrito({ id, nombre, precio, cantidad });
```

### 3. `abrirWhatsApp(items, total)`
Abre WhatsApp con mensaje pre-escrito.
```typescript
abrirWhatsApp(cart.items, cart.total);
```

### 4. `copiarMensajePedido(items, total)`
Copia mensaje al portapapeles.
```typescript
await copiarMensajePedido(cart.items, cart.total);
```

### 5. `convertirASOles(precioEuro)`
Convierte euros a soles (1 EUR = 3.60 PEN).
```typescript
convertirASOles("10,50€");  // 37.80
```

---

## 🛣️ Flujo Típico

```
Usuario en menú
    ↓
Selecciona cantidad
    ↓
Click "Agregar al Carrito"
    ↓
AddToCartButton llama useCart()
    ↓
agregarAlCarrito() actualiza estado
    ↓
localStorage guarda automáticamente
    ↓
Contador en header actualiza
    ↓
Usuario click icono carrito
    ↓
CartDrawer abre desde la derecha
    ↓
Muestra todos los productos + total en soles
    ↓
Usuario click "Pedido por WhatsApp"
    ↓
abrirWhatsApp() abre chat con mensaje automático
    ↓
Personal confirma pedido
```

---

## 🎨 Componentes Nuevos

### CartDrawer
```typescript
// En app/page.tsx
const [isCartOpen, setIsCartOpen] = useState(false);
<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
```

### AddToCartButton
```typescript
// En componentes de productos
<AddToCartButton producto={producto} />
```

---

## 📊 Estructura de Datos

### CartItem
```typescript
{
  id: 'burger-1',
  nombre: 'Hamburguesa Clásica',
  precio: 25.00,              // En soles
  cantidad: 2,
  descripcion: 'Con queso y lechuga',
  imagen: '/url/imagen.jpg'
}
```

### Cart
```typescript
{
  items: [CartItem, CartItem, ...],
  total: 75.50  // En soles
}
```

---

## 🌍 Mensajes WhatsApp

Mensaje automático que se envía:

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

## 💡 Ejemplos Rápidos

### Ejemplo 1: Agregar producto en componente
```typescript
'use client';
import { useCart } from '@/context/CartContext';

export function BotonAgregarPersonalizado() {
  const { agregarAlCarrito } = useCart();
  
  const handleClick = () => {
    agregarAlCarrito({
      id: 'custom-1',
      nombre: 'Producto Custom',
      precio: 30.00,
      cantidad: 1
    });
  };
  
  return <button onClick={handleClick}>Agregar</button>;
}
```

### Ejemplo 2: Mostrar total del carrito
```typescript
import { useCart } from '@/context/CartContext';

export function MostrarTotal() {
  const { cart } = useCart();
  return <p>Total: S/ {cart.total.toFixed(2)}</p>;
}
```

### Ejemplo 3: Contar artículos
```typescript
import { useCart } from '@/context/CartContext';

export function ContadorCarrito() {
  const { cart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.cantidad, 0);
  return <span>{total} artículos</span>;
}
```

---

## 🚀 Pasos Para Agregar Nuevo Producto

1. **En `menu-section.tsx`, agregar a `menuItems`:**
```typescript
{
  id: "nuevo-producto",
  name: "Nuevo Producto",
  price: "15,00€",
  priceSOL: convertirASOles("15,00€"),
  description: "Descripción...",
  spiceLevel: 2,
  image: "/url/imagen.webp"
}
```

2. **El componente `MenuCategory` automáticamente:**
   - Mostrará el producto
   - Incluirá el botón "Agregar al Carrito"
   - Convertirá el precio a soles
   - Actualizará el carrito

---

## 🔧 Configuración

### Cambiar Número WhatsApp
En `lib/whatsapp.ts`:
```typescript
export const WHATSAPP_NUMBER = '51913882945';  // Cambiar aquí
```

### Cambiar Tasa de Cambio EUR a PEN
En `menu-section.tsx`:
```typescript
// Cambiar multiplicador (actualmente 3.6)
return Math.round(valor * 3.6 * 100) / 100;  // ← Cambiar aquí
```

---

## 📚 Documentación Completa

- **DOCUMENTACION_CODIGO.md** - Guía técnica detallada
- **COMENTARIOS_JSDOC.md** - Patrones de documentación
- **RESUMEN_CAMBIOS.md** - Resumen de cambios

---

## ❓ Preguntas Frecuentes

**¿Dónde está mi carrito?**
El carrito está en el contexto, accesible con `useCart()` en cualquier componente.

**¿Los datos se guardan?**
Sí, en localStorage del navegador. Se cargan automáticamente al recargar.

**¿Cómo cambio el precio de un producto?**
En `menu-section.tsx`, edita el valor en `price` (euro) y `priceSOL` se recalcula automáticamente.

**¿Puedo vender sin WhatsApp?**
Sí, puedes agregar otros métodos de pago en `cart-drawer.tsx`.

**¿Es responsive?**
Sí, todo es responsive. Funciona en mobile, tablet y desktop.

---

## 🎓 Conceptos Clave

```
Context API → Estado global sin props drilling
localStorage → Datos persisten entre sesiones
JSDoc → Documentación en el código
TypeScript → Tipos seguros
Componentes reutilizables → DRY (Don't Repeat Yourself)
```

---

## ✅ Verificación Rápida

Ejecuta esto en la consola del navegador:

```javascript
// Debería retornar objeto con items y total
localStorage.getItem('muertodehambre_carrito')

// Debería mostrar número
'51913882945'.length
```

---

## 🆘 Troubleshooting

**Error: "useCart debe usarse dentro de un CartProvider"**
→ Asegúrate de que `CartProvider` envuelve tu componente en `layout.tsx`

**Carrito vacío después de recargar**
→ Revisa que localStorage no esté deshabilitado en navegador

**Precios en euros en lugar de soles**
→ Verifica que `priceSOL` esté en los datos del menú

---

## 📞 Información de Contacto MUERTODEHAMBRE

- **WhatsApp:** +51 913882945
- **Ubicación:** Ayacucho, Huamanga, Manzana I, Lote 12
- **Horario:** 6:00 AM - 12:00 PM
- **Moneda:** Soles Peruanos (PEN)

---

## 🎉 ¡Listo!

Ya sabes lo básico. Para más detalles, lee `DOCUMENTACION_CODIGO.md`.

**Happy coding! 🚀**

---

**Última actualización:** 4 de abril de 2026
**Versión:** 1.0.0
