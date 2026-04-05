/**
 * @file COMENTARIOS_JSDOC.md
 * @description Guía de patrones de comentarios JSDoc usados en el código
 * Referencia rápida para mantener consistencia en la documentación
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

# 📚 Guía de Comentarios JSDoc - MUERTODEHAMBRE

## Patrones de Documentación

Todos los archivos siguen el estándar **JSDoc** para documentación de código en español.

---

## 1. Encabezado de Archivo

**Ubicación:** Primera línea del archivo

```typescript
/**
 * @file componentes/mi-componente.tsx
 * @description Descripción clara de qué hace este archivo
 * Línea adicional de contexto si es necesario
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */
```

**Ejemplo real:**
```typescript
/**
 * @file components/cart-drawer.tsx
 * @description Componente drawer (panel lateral) que muestra el carrito de compras
 * Permite ver artículos, actualizar cantidades y procesar pedidos por WhatsApp
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */
```

---

## 2. Interfaces y Tipos

**Ubicación:** Encima de la definición

```typescript
/**
 * Interfaz que representa [qué es esto]
 * @interface NombreInterface
 * @property {tipo} nombre - Descripción de la propiedad
 * @property {tipo} [propiedad-opcional] - Descripción (opcional)
 */
interface NombreInterface {
  nombre: tipo;
  propiedadOpcional?: tipo;
}
```

**Ejemplo real:**
```typescript
/**
 * Interfaz que representa un artículo individual en el carrito
 * @interface CartItem
 * @property {string} id - ID único del artículo
 * @property {string} nombre - Nombre del producto
 * @property {number} precio - Precio unitario en soles peruanos
 * @property {number} cantidad - Cantidad de artículos en el carrito
 * @property {string} [descripcion] - Descripción opcional del producto
 * @property {string} [imagen] - URL de la imagen del producto
 */
export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion?: string;
  imagen?: string;
}
```

---

## 3. Funciones

**Ubicación:** Encima de la definición

```typescript
/**
 * Descripción breve de qué hace la función
 * Descripción más detallada si es necesario
 * 
 * @param {tipo} nombreParametro - Descripción del parámetro
 * @param {tipo} [parametroOpcional] - Descripción (opcional)
 * @returns {tipo} Descripción de lo que retorna
 * 
 * @example
 * const resultado = miFuncion(parametro1, parametro2);
 * // resultado es [descripción]
 */
function miFuncion(param1: tipo, param2: tipo): tipo {
  // implementación
}
```

**Ejemplo real:**
```typescript
/**
 * Convierte precios de euros a soles peruanos
 * @param {string} precioEuro - Precio en euros con formato "XX,XX€" o "XX.XX€"
 * @returns {number} Precio convertido a soles peruanos
 * 
 * @example
 * convertirASOles("10,50€")  // 37.80
 * convertirASOles("2,50€")   // 9.00
 */
const convertirASOles = (precioEuro: string): number => {
  const valor = parseFloat(precioEuro.replace(/[€,]/g, '.'));
  return Math.round(valor * 3.6 * 100) / 100;
};
```

---

## 4. Componentes React

**Ubicación:** Encima de la definición

```typescript
/**
 * Componente [Nombre]
 * [Descripción general]
 * 
 * Características:
 * - Característica 1
 * - Característica 2
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {tipo} props.propiedad - Descripción
 * @returns {React.ReactElement} Descripción del elemento retornado
 * 
 * @example
 * <MiComponente propiedad={valor} />
 */
export function MiComponente({ propiedad }: Props) {
  return <div>...</div>;
}
```

**Ejemplo real:**
```typescript
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
  // implementación
};
```

---

## 5. Hooks Personalizados

**Ubicación:** Encima de la definición

```typescript
/**
 * Hook [Nombre]
 * [Descripción de qué hace el hook]
 * Debe usarse dentro de [proveedor/contexto]
 * 
 * @returns {tipo} Descripción de lo que retorna
 * @throws {Error} Descripción del error si se usa incorrectamente
 * 
 * @example
 * const { valor, funcion } = useHook();
 */
export const useHook = (): TipoRetorno => {
  // implementación
};
```

**Ejemplo real:**
```typescript
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
```

---

## 6. Constantes

**Ubicación:** Encima de la definición

```typescript
/**
 * [Descripción de la constante]
 * @constant
 * @type {tipo}
 * @default valor-por-defecto
 */
export const NOMBRE_CONSTANTE = valor;
```

**Ejemplo real:**
```typescript
/**
 * Número de teléfono de WhatsApp de MUERTODEHAMBRE (Perú)
 * Formato: código de país + número
 * @constant
 */
export const WHATSAPP_NUMBER = '51913882945';
```

---

## 7. Comentarios en Línea

**Uso:** Explicar lógica compleja dentro de funciones

```typescript
// Descripción breve de lo que hace esta línea/bloque
```

**Ejemplo real:**
```typescript
// Calcular cantidad total de artículos en el carrito
const totalItems = cart.items.reduce((sum, item) => sum + item.cantidad, 0);

// Validar que la cantidad sea mayor a 0
if (cantidad <= 0) {
  alert('Por favor selecciona una cantidad válida');
  return;
}

// Mostrar feedback visual por 1.5 segundos
setTimeout(() => {
  setIsAdded(false);
  setCantidad(1);
}, 1500);
```

---

## 8. Comentarios de Sección

**Uso:** Agrupar bloques de código relacionados

```typescript
{/* Encabezado del componente */}
<div className="...">...</div>

{/* Lista de productos */}
<div className="...">...</div>

{/* Pie de página */}
<footer>...</footer>
```

---

## 9. Comentarios TODO y FIXME

**Uso:** Marcar trabajo futuro

```typescript
// TODO: Agregar validación de correo electrónico
// FIXME: Este componente es muy lento con listas grandes
// NOTE: Esto es específico para navegadores modernos
// HACK: Solución temporal hasta que arreglemos la API
```

---

## 10. Patrones de Documentación por Archivo

### archivo.ts (Tipos y Constantes)
```typescript
/**
 * @file types/nombre.ts
 * @description Definición de tipos e interfaces para [contexto]
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

/**
 * Interface/Type 1
 */
interface Nombre1 { ... }

/**
 * Constante importante
 */
export const CONSTANTE = valor;
```

### archivo.tsx (Componentes)
```typescript
/**
 * @file components/nombre.tsx
 * @description Componente que [hace qué]
 * [Detalles adicionales]
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

'use client'; // Si es componente cliente

/**
 * Interfaz Props
 */
interface NombreProps {
  propiedad: tipo;
}

/**
 * Componente
 */
export function Nombre({ propiedad }: NombreProps) {
  {/* Comentarios JSX */}
  return <div>...</div>;
}
```

### archivo.ts (Utilidades y Lógica)
```typescript
/**
 * @file lib/nombre.ts
 * @description Utilidades para [propósito]
 * [Detalles de uso]
 * @author MUERTODEHAMBRE
 * @version 1.0.0
 */

/**
 * Constante de configuración
 */
export const CONFIG = { ... };

/**
 * Función principal
 */
export const funcion = (param) => { ... };

/**
 * Función de apoyo
 */
const funcionInterna = (param) => { ... };
```

---

## Reglas de Oro

1. **Español:** Todo en español, incluyendo ejemplos
2. **Consistencia:** Usar los mismos patrones en todo el proyecto
3. **Claridad:** Explicar QUÉ y POR QUÉ, no CÓMO (el código habla por sí solo)
4. **Ejemplos:** Incluir @example cuando sea útil
5. **Tipos:** Especificar tipos en parámetros y retorno
6. **Ubicación:** JSDoc va ENCIMA de la definición, nunca abajo
7. **Privadas:** Las funciones privadas también necesitan comentarios
8. **Actualización:** Mantener comentarios sincronizados con el código

---

## Herramientas Recomendadas

### VS Code
- Extensión: **JSDoc Comments** (Chetan Patel)
- Genera automáticamente plantillas JSDoc

### Configuración recomendada
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

**Última actualización:** 4 de abril de 2026
**Versión:** 1.0.0
