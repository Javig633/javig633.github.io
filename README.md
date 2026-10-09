# Portfolio de Ciberseguridad

Portfolio personal donde documento writeups de máquinas, comparto recursos y herramientas, y muestro mis proyectos. Construido con [Astro](https://astro.build/) y desplegado en GitHub Pages.

🔗 **Sitio en vivo**: [0xSkunk.github.io](0xSkunk.github.io)

## Stack

- **[Astro](https://astro.build/)** — Framework estático con Content Collections
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Estilos utilitarios
- **[MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)** — Markdown extendido
- **[Shiki](https://shiki.style/)** — Resaltado de sintaxis con tema `github-dark-dimmed`
- **[rehype-callouts](https://github.com/lin-stephanie/rehype-callouts)** — Callouts estilo Obsidian
- **[Fuse.js](https://www.fusejs.io/)** — Búsqueda difusa en cliente para writeups

## Estructura

```
portfolio-cyber/
├── .github/workflows/      # CI/CD para GitHub Pages
├── public/                 # Assets estáticos (favicon, robots.txt)
├── scripts/                # Utilidades (conversión de writeups de Obsidian)
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── content/            # Writeups (Content Collection)
│   ├── data/               # Datos estáticos (recursos, herramientas, proyectos)
│   ├── layouts/            # Layout base
│   ├── pages/              # Rutas del sitio
│   └── styles/             # CSS global
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/writeups` | Index de writeups con buscador y paginación |
| `/writeups/[slug]` | Detalle de cada writeup con TOC lateral |
| `/proyectos` | Proyectos personales |
| `/recursos` | Colección de blogs, labs y recursos |
| `/herramientas` | Herramientas de pentesting organizadas por categoría |

## Desarrollo

### Requisitos

- Node.js 20 o superior
- npm

### Instalación

```bash
git clone https://github.com/0xskunk/0xskunk.github.io.git
cd 0xskunk.github.io
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.


## Añadir un writeup

Los writeups viven en `src/content/writeups/`. Cada uno es una carpeta con esta estructura:

```
src/content/writeups/nombre-maquina/
├── index.md
└── Images/
    ├── captura-1.png
    └── captura-2.png
```

### Frontmatter del `index.md`

- Colocarlo arriba del todo de cada writeup, esto te muestra informacion sobre las maquinas y le coloca la imagen que debe de estar en `Images` y llamarla `machine.png`

```yaml
---
title: Nombre de la máquina
platform: HackTheBox       # HackTheBox / TryHackMe / VulnHub / etc
difficulty: Easy           # Easy / Medium / Hard / Insane
os: Linux                  # Linux / Windows
date: 2024-05-10
tags: [web, drupal, cms]
image: ./Images/machine.png
---
```

### Notas importantes

- **Las imágenes se referencian con rutas relativas** al `.md`:
  ```markdown
  ![descripción](./Images/captura-1.png)
  ```
- **La carpeta de imágenes DEBE llamarse `Images` con `I` mayúscula**. Linux es case-sensitive y no encontraría la carpeta si la llamas `images`.
- **Los `.md` escritos en Obsidian no son compatibles directamente** (Obsidian usa `![[imagen.png]]` en lugar de `![](ruta)`). Para convertirlos, hay un script:


### Conversión desde Obsidian

Si tienes un writeup escrito en Obsidian con la sintaxis `![[Pasted image 20260101.png]]`, usa el script de conversión:

```bash
npm run convert
```

El script:

1. Renombra el `.md` principal a `index.md`.
2. Reemplaza espacios por guiones en los nombres de las imágenes.
3. Convierte la sintaxis `![[...]]` de Obsidian a `![](./Images/...)` estándar de Markdown.

## Añadir un proyecto

Edita `src/data/projects.ts` y añade un objeto al array:

```ts
{
  name: "Nombre del proyecto",
  tagline: "Frase corta descriptiva",
  description: "Descripción de 2-3 líneas.",
  github: "https://github.com/tuusuario/repo",
  demo: "https://demo.tudominio.com",  // opcional
  image: "/images/projects/nombre.png", // opcional
  stack: ["python", "fastapi"],
  status: "active", // active | wip | archived
}
```

## Añadir recursos o herramientas

Los recursos y herramientas están en `src/data/resources.ts` y `src/data/tools.ts` respectivamente. Sigue la estructura existente — cada ítem tiene `name`, `url` y opcionalmente `description`, `tags` e `icon`.

Para los iconos de herramientas se usa [Simple Icons](https://simpleicons.org/) vía CDN:

```ts
icon: "https://cdn.simpleicons.org/nmap/9ab8ff"
```

## Personalización

### Paleta de colores

Definida en `src/styles/global.css`:

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg` | `#262932` | Fondo general |
| `--color-surface` | `#2e323c` | Superficie de tarjetas |
| `--color-border` | `#3a3f4a` | Bordes |
| `--color-fg` | `#dce0e6` | Texto principal |
| `--color-fg-muted` | `#9aa1ae` | Texto secundario |
| `--color-accent` | `#9ab8ff` | Azul de acento |


## Licencia

El código de este proyecto está disponible bajo la licencia MIT. Los writeups y el contenido textual son propiedad del autor.

---