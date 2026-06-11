# GymOS – Portal de Acceso y Comparativa de Agentes

Este repositorio contiene la unificación del **Trabajo Práctico 3 (TSDS 2D)**. El proyecto expone una portada de acceso (landing principal) que sirve como portal comparativo entre dos desarrollos de Landing Pages para el sistema SaaS multi-tenant **GymOS**, creados por dos agentes inteligentes diferentes (Claude 3.5 Sonnet y GPT).

El proyecto se encuentra configurado como una aplicación multi-página de **Vite** para evitar la duplicación de dependencias (`node_modules`) y facilitar su ejecución desde un único servidor local.

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Instalar Dependencias** (en la raíz del proyecto):
   ```bash
   npm install
   ```
2. **Iniciar Servidor de Desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador para ver la Portada.
3. **Compilar para Producción**:
   ```bash
   npm run build
   ```

---

## 🛠️ Comparativa de Agentes y Tecnologías

### 🔹 1. Versión del Primer Agente (Carpeta: `/sonett`)
Desarrollado de forma autónoma utilizando **Claude 3.5 Sonnet** (Thinking) y **Gemini 1.5 Flash**.

#### Tecnologías Aplicadas:
* **React 19 (SPA)**: Framework para estructurar la aplicación en un componente funcional único.
* **Vite**: Bundler para HMR ultra rápido.
* **Tailwind CSS v4**: Integración nativa a través de `@tailwindcss/vite` directamente en CSS usando `@theme`.
* **Google Fonts (Inter)**: Tipografía cargada asíncronamente.

#### Skills y Habilidades del Agente:
* **`cognitive-doc-design`**: Estructura legible y síntesis documental.
* **`comment-writer`**: Documentación clara de la lógica interactiva en el código.
* **Virtual Loop Carousel**: Lógica avanzada para carrusel de testimonios con rotación infinita y resets en `onTransitionEnd` sin parpadeos.
* **Tailwind v4 `@theme`**: Uso moderno de CSS Custom Properties en Tailwind.

---

### 🔹 2. Versión del Segundo Agente (Carpeta: `/gpt`)
Desarrollado utilizando **GPT**.

#### Tecnologías Aplicadas:
* **React**: Desglose modular de componentes (`Header`, `Hero`, `Features`, `Testimonios`, `Contacto`, `Footer`).
* **Vite**: Soporte del entorno de desarrollo.
* **Tailwind CSS CDN**: Estilos utilitarios aplicados de manera directa.
* **CSS Personalizado**: Animaciones CSS, glow neón, efectos espaciales de fondo y flotación del Dashboard.

#### Skills y Habilidades del Agente:
* **`frontend-design`**: Diseño de interfaz SaaS altamente responsive orientado a conversión.
* **`cognitive-doc-design`**: Documentación escaneable del entorno.

---

## 📝 Prompt Utilizado (Link 1)

El siguiente es el prompt de especificaciones técnicas enviado a los agentes para generar las respectivas páginas de aterrizaje:

```text
Actúa como un Desarrollador Frontend Senior experto en UI/UX, especializado en conversiones SaaS y Tailwind CSS avanzado.

<task>
Tu objetivo es desarrollar el código completo, funcional y en un solo archivo (HTML5) para la Landing Page de un sistema SaaS multi-tenant diseñado para la gestión de centros de fitness y gimnasios. 
</task>

<design_system>
Debes aplicar estrictamente el siguiente esquema de colores usando valores arbitrarios de Tailwind (ej. `bg-[#090d16]` o definiéndolos en la configuración de Tailwind en el script):
- primary: "#ec4899" (Cyber neon pink - usar para CTAs principales y acentos fuertes)
- secondary: "#06b6d4" (Neon cyan - usar para iconos, bordes activos y hover states)
- accent: "#eab308" (Volt gold - usar para insignias, estrellas de reseñas o alertas)
- bgSpace: "#090d16" (Ultra dark space - usar como color de fondo principal de la página)
- textCrisp: "#f8fafc" (Crisp text - usar para párrafos y encabezados generales)
- cardBg: "#131a2b" (Card dark navy - usar para fondos de tarjetas, formularios y secciones destacadas)
</design_system>

<requirements>
La Landing Page debe contener las siguientes secciones semánticas en este orden exacto:
1. Header: Barra de navegación pegajosa (sticky) con el logo a la izquierda, enlaces al centro y un botón CTA "Probar Gratis" a la derecha.
2. Hero Section: Título principal de alto impacto orientado a dueños de gimnasios, subtítulo descriptivo, CTA dual ("Comenzar ahora" y "Ver Demo") y una representación visual del software (puede ser un contenedor estilizado que simule un dashboard).
3. About Us / Contexto: Breve sección explicando la misión de modernizar la gestión deportiva.
4. Características (Features): Un grid de al menos 3x2 tarjetas que destaquen módulos clave (ej. gestión de miembros, facturación recurrente, reservas de clases, métricas en tiempo real).
5. Testimonios: Carrusel o grid (min 3) de reseñas de clientes con estilo tarjeta.
6. Formulario de Contacto: Un formulario maquetado visualmente (nombre, gimnasio, email, mensaje, botón de envío) dentro de un contenedor tipo tarjeta.
7. Footer: Enlaces rápidos, copyright y enlaces simulados a redes sociales.
</requirements>

<technical_constraints>
1. Cero dependencias locales: Utiliza Tailwind CSS a través de su script CDN oficial (`<script src="https://cdn.tailwindcss.com"></script>`).
2. Interactividad y Animaciones: 
   - Utiliza clases nativas de Tailwind para hover, focus y transiciones (`transition-all`, `hover:scale-105`, `duration-300`).
   - Incluye un bloque `<style>` en el `<head>` con animaciones CSS personalizadas (`@keyframes` para flotación suave del dashboard en el Hero, efectos de "glow" (resplandor) en botones usando `box-shadow` con los colores neón, y fade-in al hacer scroll usando animación simple on-load).
3. Completitud Estricta: NO omitas código. Está estrictamente prohibido usar marcadores de posición como "<!-- resto del código -->" o "/* CSS goes here */". El archivo generado debe poder renderizarse perfectamente al abrirlo en el navegador.
4. Accesibilidad y Responsividad: Asegúrate de usar la directiva `md:` y `lg:` de Tailwind para garantizar que el diseño cambie correctamente de móvil (1 columna) a desktop (multiespacio).
</technical_constraints>

<output_format>
Devuelve ÚNICAMENTE el código HTML dentro de un solo bloque de código. No incluyas explicaciones iniciales ni conclusiones. Tu respuesta debe empezar con `<!DOCTYPE html>` y terminar con `</html>`.
</output_format>
```
