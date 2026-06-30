# Century Clean Group — Documentación de Cambios UI/UX Pro Max

## Skill Instalada
- **UI/UX Pro Max CLI** v2.0 (npm global)
- **Diseño del sistema generado** para: Limpieza y mantenimiento premium de propiedades

## Análisis del Generador UI/UX Pro Max
| Campo | Recomendación |
|-------|--------------|
| **Patrón** | Storytelling + Feature-Rich (CTA above fold) |
| **Estilo** | Liquid Glass (transiciones fluidas, blur, iridiscente) |
| **Colores** | Trust Teal (#0F766E) + Professional Blue (#0369A1) |
| **Tipografía** | Cinzel / Josefin Sans (luxury/real estate) |
| **Efectos** | Morphing SVG/CSS, fluid animations 400-600ms, backdrop-filter blur |

> **Nota:** Se adaptaron las recomendaciones a las preferencias del usuario: **Inter + Poppins** para tipografía y **turquesa (#00B4D8)** como color de acento principal, manteniendo los principios de diseño (espacio visual, micro-animaciones, contraste 4.5:1, reduced-motion).

## Archivos Modificados

### 1. `css/global.css` — Sistema de Diseño Completo
**Cambios principales:**
- Paleta nueva: Blanco puro (#FFFFFF), Azul oscuro (#0A1628), Turquesa (#00B4D8)
- Tipografía: Inter (body) + Poppins (display/headings)
- Gradientes: `linear-gradient(135deg, #00B4D8, #0EA5E9)`
- Sombras suaves con glow turquesa
- Aliases de compatibilidad para subpages (variables antiguas)
- Clases `.italic`, `.gold-text` preservadas
- Subpage hero con texto blanco sobre fondo oscuro

**Variables nuevas:**
```css
--accent-primary: #00B4D8;
--accent-gradient: linear-gradient(135deg, #00B4D8, #0EA5E9);
--bg-dark: #0A1628;
--font-display: 'Poppins';
--font-body: 'Inter';
```

### 2. `index.html` — Estructura Rediseñada
**Nuevas secciones y mejoras:**
- **Loader**: Pantalla de carga con logo centrado + spinner (se oculta automáticamente)
- **Hero**: Logo animado, texto morph, typing effect, parallax floating shapes
- **Stats**: Métricas animadas (150+ propiedades, 98% satisfacción, etc.)
- **Servicios**: Cards con iconos SVG inline, hover premium con glow
- **Timeline**: Proceso de 4 pasos con dots animados
- **Portafolio**: Grid de imágenes con overlay hover
- **Before/After**: Comparador visual deslizable (NUEVA SECCIÓN)
- **Testimonios**: Carrusel con auto-scroll y drag
- **FAQ**: Acordeón con animación
- **CTA Final**: Sección oscura con gradient buttons
- **Footer**: Grid de 4 columnas, links organizados

**Cambios técnicos:**
- Material Icons reemplazados por SVG inline (mejor rendimiento)
- Botones con clases `btn-primary` (gradiente) y `btn-secondary` (outline)
- WhatsApp flotante preservado
- Rutas internas intactas (no se rompieron)

### 3. `js/global.js` — Animaciones y Interacciones
**Nuevas funcionalidades:**
- **Loader**: Se oculta después de 1.2s + fade 600ms (fallback 3s)
- **Scroll reveal**: IntersectionObserver con fadeUp, fadeLeft, fadeRight
- **Parallax**: Floating shapes con data-speed
- **Typing effect**: 4 frases rotativas con cursor parpadeante
- **Morph text**: Palabras que cambian con transición
- **Counter animation**: Números que cuentan hacia arriba
- **Testimonial carousel**: Auto-scroll + drag + touch support
- **Before/After slider**: Drag con clip-path dinámico
- **FAQ accordion**: Toggle con rotación del icono
- **Magnetic buttons**: Efecto magnético al hover
- **Portfolio filter**: Animación stagger al filtrar
- **Active nav highlight**: Resalta página actual

### 4. `responsive.css` — Sin cambios (compatibilidad preservada)

## Cómo Editar Textos e Imágenes

### Editar Textos
Busca en `index.html` los textos entre las etiquetas HTML:
```html
<!-- Título principal del hero -->
<h1 class="h1">
  Cuidamos tu propiedad<br/>
  como si fuera <span class="text-gradient italic" id="heroMorphWord">nuestra.</span>
</h1>

<!-- Subtítulo -->
<p class="body-lg hero-subtitle">
  Administración, mantenimiento y presentación...
</p>
```

### Editar Números de Estadísticas
Modifica los atributos `data-target`:
```html
<div class="stat-number" data-target="150" data-suffix="+">—</div>
```

### Editar Imágenes
Busca las URLs de Unsplash y reemplaza:
```html
<img src="https://images.unsplash.com/photo-XXXXX?w=800&q=85" alt="Descripción"/>
```

### Editar Colores
Modifica las variables CSS al inicio de `css/global.css`:
```css
:root {
  --accent-primary: #00B4D8;  /* Color principal */
  --bg-dark: #0A1628;          /* Fondo oscuro */
}
```

### Editar Textos de Testimonios
Busca las tarjetas `.testimonial-card`:
```html
<p class="testimonial-text">"Tu testimonio aquí"</p>
<p class="testimonial-author">Nombre</p>
<p class="testimonial-role">Cargo</p>
```

### Editar FAQ
Busca los items `.faq-item`:
```html
<div class="faq-question"><span>Tu pregunta</span></div>
<div class="faq-answer"><p>Tu respuesta</p></div>
```

## Accesibilidad y Rendimiento
- ✅ `prefers-reduced-motion` respetado
- ✅ Focus states visibles para navegación por teclado
- ✅ Lazy loading en imágenes
- ✅ Semantic HTML preservado
- ✅ WhatsApp flotante con aria-label
- ✅ Meta tags SEO mantenido

## Despliegue
El sitio está configurado para Vercel (`vercel.json` intacto). 
URL: https://century-clean-group.vercel.app
