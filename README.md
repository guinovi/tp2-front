# GymOS – Portal de Acceso y Comparativa de Agentes

* **Autor:** Guillermo Novillo  
* **Materia:** Desarrollo de Sistemas Web (Front End) - 2° D  
* **Despliegue Unificado (Vercel):** [https://tp2-front-rouge.vercel.app/](https://tp2-front-rouge.vercel.app/)

---

## 📝 Especificación y Prompt del Proyecto

Este proyecto fue generado a partir del siguiente conjunto de requerimientos para simular el desarrollo ágil de un sistema SaaS multi-tenant:

> ### 🎯 Objetivo General
> Desarrollar el código completo, funcional y en un solo archivo (HTML5) para la Landing Page de un sistema SaaS multi-tenant diseñado para la gestión de centros de fitness y gimnasios.

> ### 🎨 Sistema de Diseño
> * **Primary (Pink Neon):** `#ec4899` (Para CTAs principales y acentos fuertes)
> * **Secondary (Cyan Neon):** `#06b6d4` (Para iconos, bordes activos y estados hover)
> * **Accent (Volt Gold):** `#eab308` (Para insignias, estrellas de reseñas o alertas)
> * **Background Space:** `#090d16` (Fondo principal ultra oscuro)
> * **Text Crisp:** `#f8fafc` (Párrafos y encabezados generales)
> * **Card Background:** `#131a2b` (Fondos de tarjetas, formularios y secciones destacadas)

> ### 📋 Requerimientos de Secciones (Orden Estricto)
> 1. **Header:** Barra de navegación pegajosa (sticky), logo a la izquierda, enlaces al centro y botón CTA "Probar Gratis" a la derecha.
> 2. **Hero Section:** Título principal de alto impacto para dueños de gimnasios, subtítulo descriptivo, CTA dual ("Comenzar ahora" y "Ver Demo") y una maqueta estilizada del dashboard del software.
> 3. **About Us / Contexto:** Explicación breve de la misión para modernizar la gestión deportiva.
> 4. **Características (Features):** Grid de 3x2 tarjetas destacando módulos clave (miembros, facturación recurrente, reservas, métricas en tiempo real).
> 5. **Testimonios:** Grid o carrusel con mínimo 3 reseñas de clientes estilo tarjeta.
> 6. **Formulario de Contacto:** Formulario maquetado dentro de una tarjeta.
> 7. **Footer:** Enlaces rápidos, copyright y links sociales.

> ### ⚙️ Restricciones Técnicas
> * Cero dependencias locales (Tailwind CSS cargado vía CDN oficial).
> * Animaciones nativas y personalizadas (efecto floating en el Hero, glows en botones mediante box-shadow y fade-ins al hacer scroll).
> * Código completo sin marcadores de posición ("complete production-ready").
> * Layouts adaptables (`md:` y `lg:` de Tailwind) desde móvil hasta multiespacio de escritorio.

---

## 📸 Capturas de Pantalla

A continuación se detalla la secuencia visual del flujo de la aplicación:

### 1. Portada de Acceso (Home)
Página principal unificada con estilo espacial y accesos interactivos de efecto neón.
![01-home](./capturas/01-home.png)

### 2. Modal de Prompt Integrado
Detalle del prompt de instrucciones original visualizado en el modal interactivo de la portada con opción de copiado.
![02-prompt](./capturas/02-prompt.png)

### 3. Landing Page - Agente Sonnet
Versión interactiva en React 19 y Tailwind CSS v4 generada por el agente Claude 3.5 Sonnet.
![03-sonnet](./capturas/03-sonnet.png)

### 4. Landing Page - Agente GPT
Versión modular estructurada en componentes y animada mediante clases utilitarias por el agente GPT.
![04-gpt](./capturas/04-gpt.png)

---

## 🛠️ Tecnologías del Proyecto

* **React 19 & React 18**: Las implementaciones de las landings corren sobre React con renderizados optimizados de componentes.
* **Vite**: Configuración multi-página en la raíz (`vite.config.js`) que procesa múltiples puntos de entrada de forma optimizada.
* **Tailwind CSS (v4 y CDN)**: Integración mixta que demuestra el uso de Tailwind a través de su CDN nativo y a través de bundles de Vite.
* **CSS Custom Animations**: Keyframes para floats, pulse glows y transitions nativas de Tailwind CSS.
