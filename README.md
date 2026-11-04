# Hola Mundo 
> **Tienda Online de Artículos para Bebés**  
> Trabajo Práctico 1 para la materia **Construcción de Interfaces de Usuario**  
> **Universidad Nacional de Hurlingham (UNAHUR)**

[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-24292e?style=flat-square&logo=github)](https://danifai.github.io/hola-mundo/)
[![React 19](https://img.shields.io/badge/React-19.3.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-2.10.10-7952b3?style=flat-square&logo=bootstrap)](https://react-bootstrap.netlify.app/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)

---

## Deploy en Producción
Se puede acceder a la aplicación en vivo a través del siguiente enlace:  
**[https://danifai.github.io/hola-mundo/](https://danifai.github.io/hola-mundo/)**

---

## Descripción Breve
**Hola Mundo** es una Single Page Application (SPA) de comercio electrónico especializada en productos de puericultura y primera infancia (sillas, carritos, mecedoras, cunas, butacas, bolsos, alimentación y baño).

El proyecto fue concebido y desarrollado bajo estrictas pautas de accesibilidad, diseño responsivo y rendimiento ágil. Su estética combina tonos pastel cálidos (celeste, durazno y arena) con una metáfora tierna y espacial inspirada en el primer "Hola Mundo" que pronuncia un programador al iniciar su viaje, y en el primer saludo que un recién nacido le regala a su familia.

---

## Integrantes del Grupo
Proyecto desarrollado por estudiantes de la **Universidad Nacional de Hurlingham (UNAHUR)**:

- **Daniel Faigenboim**
- **Roxana Stephanie Rodriguez**
- **Marcos Espinosa**

---

## Tecnologías Utilizadas

- **React 19:** Biblioteca base para la construcción de interfaces de usuario.
  - Uso exclusivo de componentes funcionales.
  - Manejo de estado local y centralizado con `useState` y `useEffect` (sin Context API ni Redux).
  - Persistencia del carrito en `localStorage`.
- **React Router DOM v6:** Enrutamiento declarativo del lado del cliente (`/`, `/productos`, `/producto/:id`, `/carrito`, `/nosotros`, `/preguntas-frecuentes`), con configuración adaptada a subrutas de GitHub Pages.
- **React Bootstrap 2.10 & Bootstrap 5.3:** Sistema de grillas, contenedores responsivos, componentes de navegación, modales, offcanvas, acordeones, tarjetas y formularios controlados.
- **Bootstrap Icons:** Iconografía vectorial integrada.
- **Vite 8:** Herramienta de compilación rápida y servidor de desarrollo con Hot Module Replacement (HMR).
- **CSS3 Puro:** Personalización de la paleta de colores mediante variables CSS (`--hm-*`), efectos de microinteracciones, animaciones de entrada (`@keyframes`), soporte de modo claro/oscuro y efecto Parallax en el Hero del Home.

---

## Características Principales
1. **Catálogo Completo y Filtros:** 18 productos categorizados, búsqueda reactiva por texto, selector de categoría, switches de stock y ofertas, y ordenamiento por precio o novedad.
2. **Vista de Detalle de Producto:** Control de cantidades limitado al stock real disponible, badges de estado, descripción detallada y carrusel de productos relacionados.
3. **Carrito y Checkout Modular:**
   - Resumen rápido lateral (MiniCarrito `Offcanvas`) accesible desde el Header.
   - Vista principal de carrito de 2 columnas con desglose de subtotales y envío gratis.
   - Sistema de cupones de descuento activos (`1010`, `1515`, `2020`).
   - Sugerencias de productos para complementar la compra.
   - Formulario de checkout controlado con validaciones en tiempo real para todos sus campos obligatorios.
   - **Simulación de transacción:** Animación de 2 segundos con spinner pastel y barra de progreso antes de confirmar la compra y emitir el ticket final con número de orden `#HM-XXXXX`.
4. **Header y Navegación Adaptativa:**
   - Contador de carrito con animación física (*pop/bounce*) ante cada producto agregado.
   - Barra de categorías con dropdowns interactivos en escritorio y menú hamburguesa optimizado en mobile y tablet.
   - Alternador dinámico de **Modo Claro / Modo Oscuro**.
5. **Hero Parallax y Carruseles Adaptativos:**
   - Efecto Parallax en desktop y formato adaptable al 100% en tablets y teléfonos móviles.
   - Carruseles táctiles con soporte de gestos swipe en dispositivos móviles para novedades y ofertas.
   - Modal interactivo de **Cuotas sin interés** (Visa hasta 6 cuotas y Mastercard hasta 12 cuotas).
6. **Vistas Institucionales:**
   - **Nosotros:** Presentación del equipo de estudiantes de la UNAHUR, misión y valores de la marca.
   - **Preguntas Frecuentes:** Acordeón con consultas clave más generales.
7. **Botón Flotante de WhatsApp:** Conexión directa y fija en toda la navegación.

---

## Instrucciones para Instalar y Correr el Proyecto

### 1. Prerrequisitos
- **Node.js:** Versión 20 o superior recomendada (el proyecto incluye archivo `.nvmrc`).
- **npm:** Gestor de paquetes incluido con Node.js.

### 2. Clonar el Repositorio
```bash
git clone https://github.com/danifai/hola-mundo.git
cd hola-mundo
```

### 3. Usar la Versión Recomendada de Node (opcional con NVM)
```bash
nvm use
```

### 4. Instalar Dependencias
```bash
npm install
```

### 5. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación quedará disponible en tu navegador en:
`http://localhost:5173/hola-mundo/`

### 6. Compilar para Producción
Para validar y generar el bundle optimizado en la carpeta `dist/`:
```bash
npm run build
```

### 7. Ejecutar Linter
Para validar la sintaxis y buenas prácticas de código:
```bash
npm run lint
```

### 8. Desplegar en GitHub Pages
El proyecto cuenta con el script preconfigurado para subir el bundle compilado a la rama de GitHub Pages:
```bash
npm run deploy
```

---

## Licencia y Marco Académico
Proyecto desarrollado con fines estrictamente académicos para la **Universidad Nacional de Hurlingham (UNAHUR)**.
