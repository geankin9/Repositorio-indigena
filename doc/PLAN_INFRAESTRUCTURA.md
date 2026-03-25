# 🏗️ Plan de Infraestructura — Sistema Fullstack TypeScript
### Repositorio: `repositorio-indigena` · Despliegue: Vercel

---

## 📋 Tabla de Contenidos

1. [Visión General](#1-visión-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura de Carpetas](#3-estructura-de-carpetas)
4. [Capa de Datos — JSON como Base de Datos](#4-capa-de-datos--json-como-base-de-datos)
5. [Arquitectura Frontend](#5-arquitectura-frontend)
6. [Arquitectura Backend / API Routes](#6-arquitectura-backend--api-routes)
7. [Validación TypeScript](#7-validación-typescript)
8. [Página Home — Hola Mundo](#8-página-home--hola-mundo)
9. [Configuración de Vercel](#9-configuración-de-vercel)
10. [Flujo de Despliegue CI/CD](#10-flujo-de-despliegue-cicd)
11. [Checklist de Implementación](#11-checklist-de-implementación)
12. [Comandos de Referencia](#12-comandos-de-referencia)

---

## 1. Visión General

Sistema web fullstack construido con **Next.js + TypeScript** que utiliza archivos JSON como capa de persistencia de datos (sin base de datos convencional). El sistema se aloja en GitHub bajo el repositorio `repositorio-indigena` y se despliega automáticamente en **Vercel** mediante integración continua.

```
GitHub (repositorio-indigena)
        │
        ▼  push → main
   Vercel CI/CD
        │
        ▼
  Next.js App (TypeScript)
   ├── Frontend (React + CSS)
   ├── API Routes (Node.js serverless)
   └── /data/*.json  ← "Base de datos"
```

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión Mínima | Propósito |
|------|-----------|---------------|-----------|
| Framework | Next.js | 14.x (App Router) | SSR + API Routes + routing |
| Lenguaje | TypeScript | 5.x | Tipado estático en todo el proyecto |
| Estilos | CSS Modules + Tailwind CSS | 3.x | Diseño elegante y responsivo |
| Animaciones | Framer Motion | 11.x | Efecto elegante en Home |
| Datos | JSON files | — | Persistencia sin BD convencional |
| Runtime | Node.js | 18.x LTS | Compatibilidad con Vercel |
| Control de versiones | Git + GitHub | — | Repositorio: `repositorio-indigena` |
| Despliegue | Vercel | — | Vinculado a cuenta personal |
| Linting | ESLint + Prettier | — | Calidad de código TypeScript |

---

## 3. Estructura de Carpetas

```
repositorio-indigena/
│
├── 📁 app/                          # Next.js App Router
│   ├── layout.tsx                   # Layout raíz con metadata
│   ├── page.tsx                     # Home → "Hola Mundo" elegante
│   ├── globals.css                  # Estilos globales
│   └── 📁 api/                      # API Routes (serverless)
│       └── 📁 data/
│           └── route.ts             # GET /api/data → lee JSON
│
├── 📁 components/                   # Componentes reutilizables
│   ├── HelloWorld.tsx               # Componente principal del Home
│   └── AnimatedText.tsx             # Efecto de texto animado
│
├── 📁 data/                         # ⭐ "Base de datos" JSON
│   ├── site.json                    # Configuración general del sitio
│   └── README.md                    # Documentación del esquema de datos
│
├── 📁 lib/                          # Utilidades TypeScript
│   ├── dataLoader.ts                # Lector/escritor de archivos JSON
│   └── types.ts                     # Interfaces y tipos globales
│
├── 📁 public/                       # Assets estáticos
│   └── favicon.ico
│
├── .env.local                       # Variables de entorno (no versionar)
├── .env.example                     # Plantilla de variables de entorno
├── .gitignore
├── next.config.ts                   # Configuración de Next.js en TypeScript
├── tsconfig.json                    # Configuración TypeScript estricta
├── tailwind.config.ts               # Configuración Tailwind en TypeScript
├── package.json
└── vercel.json                      # Configuración de despliegue Vercel
```

---

## 4. Capa de Datos — JSON como Base de Datos

### 4.1 Filosofía

Los archivos `.json` dentro de `/data` actúan como tablas de una base de datos. Cada archivo representa una **entidad o colección**. La lectura/escritura se centraliza en `lib/dataLoader.ts`.

### 4.2 Archivo: `data/site.json`

```json
{
  "meta": {
    "title": "Repositorio Indígena",
    "description": "Sistema de gestión cultural",
    "version": "1.0.0",
    "lastUpdated": "2026-03-25"
  },
  "home": {
    "headline": "Hola Mundo",
    "subheadline": "Bienvenido al Repositorio Indígena",
    "animationStyle": "fade-slide"
  }
}
```

### 4.3 Archivo: `lib/types.ts`

```typescript
// Tipos globales — validan la estructura de los JSON

export interface SiteMeta {
  title: string;
  description: string;
  version: string;
  lastUpdated: string;
}

export interface HomeConfig {
  headline: string;
  subheadline: string;
  animationStyle: "fade-slide" | "typewriter" | "bounce";
}

export interface SiteData {
  meta: SiteMeta;
  home: HomeConfig;
}
```

### 4.4 Archivo: `lib/dataLoader.ts`

```typescript
// Utilidad centralizada para leer archivos JSON
// TypeScript garantiza que los datos coincidan con los tipos definidos

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Lee un archivo JSON de la carpeta /data y lo devuelve tipado.
 * @param filename - Nombre del archivo (sin extensión)
 */
export function readData<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, `${filename}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo de datos no encontrado: ${filename}.json`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Error al parsear ${filename}.json — verifica el formato`);
  }
}

/**
 * Escribe datos tipados en un archivo JSON de la carpeta /data.
 * @param filename - Nombre del archivo (sin extensión)
 * @param data - Datos a guardar
 */
export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
```

---

## 5. Arquitectura Frontend

### 5.1 Layout raíz — `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repositorio Indígena",
  description: "Sistema cultural fullstack en TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 5.2 Página Home — `app/page.tsx`

```typescript
import { readData } from "@/lib/dataLoader";
import type { SiteData } from "@/lib/types";
import HelloWorld from "@/components/HelloWorld";

// Server Component — lee datos del JSON en el servidor
export default function HomePage() {
  const siteData = readData<SiteData>("site");

  return (
    <main>
      <HelloWorld config={siteData.home} />
    </main>
  );
}
```

---

## 6. Arquitectura Backend / API Routes

### 6.1 API Route — `app/api/data/route.ts`

```typescript
import { NextResponse } from "next/server";
import { readData } from "@/lib/dataLoader";
import type { SiteData } from "@/lib/types";

// GET /api/data → devuelve la configuración del sitio
export async function GET() {
  try {
    const data = readData<SiteData>("site");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "No se pudieron cargar los datos" },
      { status: 500 }
    );
  }
}
```

> **Nota:** Las API Routes de Next.js se despliegan como **funciones serverless** en Vercel automáticamente. No se requiere configuración adicional de servidor.

---

## 7. Validación TypeScript

### 7.1 `tsconfig.json` — Configuración estricta

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 7.2 Validación activa

El flag `"strict": true` activa las siguientes verificaciones automáticas:

| Flag | Qué valida |
|------|-----------|
| `strictNullChecks` | Previene errores de `null`/`undefined` |
| `noImplicitAny` | Prohíbe tipos `any` implícitos |
| `noUncheckedIndexedAccess` | Valida accesos a arrays/objetos |
| `resolveJsonModule` | Permite importar `.json` con tipos |

### 7.3 Verificación de tipos antes de deploy

```bash
# Verifica tipos sin compilar (ideal para CI/CD)
npx tsc --noEmit

# Salida esperada: sin errores = TypeScript válido ✅
```

---

## 8. Página Home — Hola Mundo

### 8.1 Componente — `components/HelloWorld.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import type { HomeConfig } from "@/lib/types";
import styles from "./HelloWorld.module.css";

interface Props {
  config: HomeConfig;
}

export default function HelloWorld({ config }: Props) {
  return (
    <section className={styles.container}>
      {/* Fondo con efecto de partículas/degradado */}
      <div className={styles.background} aria-hidden="true" />

      {/* Texto principal animado */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {config.headline}
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {config.subheadline}
        </motion.p>

        {/* Línea decorativa animada */}
        <motion.div
          className={styles.divider}
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 1.0, duration: 0.5 }}
        />
      </motion.div>
    </section>
  );
}
```

### 8.2 Estilos — `components/HelloWorld.module.css`

```css
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  background: #0a0a0f;
}

.background {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(10, 10, 15, 0) 70%
  );
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.05); }
}

.content {
  position: relative;
  text-align: center;
  z-index: 10;
  padding: 2rem;
}

.headline {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin: 0 0 1rem;
}

.subheadline {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #818cf8, transparent);
  margin: 1.5rem auto 0;
  border-radius: 2px;
}
```

### 8.3 Estilos globales — `app/globals.css`

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  background: #0a0a0f;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
```

---

## 9. Configuración de Vercel

### 9.1 `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["gru1"]
}
```

> `"regions": ["gru1"]` → Sao Paulo (el edge más cercano desde Colombia)

### 9.2 Variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables, agregar:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `NODE_ENV` | `production` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.vercel.app` | All |

### 9.3 Configuración Next.js — `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Permite que las API Routes lean archivos del sistema
  // (necesario para leer /data/*.json en producción)
  serverExternalPackages: ["fs", "path"],
};

export default nextConfig;
```

> ⚠️ **Importante:** En Vercel, las funciones serverless pueden leer archivos estáticos del build, pero **no escribir** en disco en producción. Para operaciones de escritura en producción, considerar Vercel Blob Storage o un servicio externo.

---

## 10. Flujo de Despliegue CI/CD

```
Desarrollador
     │
     │  git push origin main
     ▼
GitHub (repositorio-indigena)
     │
     │  Webhook automático
     ▼
Vercel Build Pipeline
     ├── npm install
     ├── npx tsc --noEmit      ← Valida TypeScript
     ├── npm run build          ← Compila Next.js
     └── Deploy a CDN global
            │
            ▼
     ✅ https://repositorio-indigena.vercel.app
```

### 10.1 Scripts en `package.json`

```json
{
  "scripts": {
    "dev":       "next dev",
    "build":     "next build",
    "start":     "next start",
    "lint":      "next lint",
    "typecheck": "tsc --noEmit",
    "validate":  "npm run typecheck && npm run lint && npm run build"
  }
}
```

### 10.2 Comando de validación completa

```bash
# Antes de hacer push: valida tipos + lint + build
npm run validate
```

---

## 11. Checklist de Implementación

### Fase 1 — Setup inicial

- [ ] Crear repositorio `repositorio-indigena` en GitHub
- [ ] Inicializar Next.js con TypeScript: `npx create-next-app@latest . --typescript --tailwind --app`
- [ ] Limpiar archivos de demo generados por create-next-app
- [ ] Configurar `tsconfig.json` con modo estricto (según sección 7.1)
- [ ] Vincular repositorio con cuenta de Vercel

### Fase 2 — Capa de datos

- [ ] Crear carpeta `/data`
- [ ] Crear `data/site.json` con estructura definida en sección 4.2
- [ ] Crear `lib/types.ts` con interfaces TypeScript
- [ ] Crear `lib/dataLoader.ts` con funciones `readData` y `writeData`
- [ ] Verificar que `tsc --noEmit` no arroje errores

### Fase 3 — Frontend

- [ ] Crear `components/HelloWorld.tsx` con animaciones
- [ ] Crear `components/HelloWorld.module.css` con estilos elegantes
- [ ] Actualizar `app/globals.css`
- [ ] Actualizar `app/layout.tsx` con metadata
- [ ] Actualizar `app/page.tsx` para consumir datos del JSON
- [ ] Instalar Framer Motion: `npm install framer-motion`

### Fase 4 — Backend

- [ ] Crear `app/api/data/route.ts`
- [ ] Probar endpoint: `GET http://localhost:3000/api/data`
- [ ] Verificar respuesta JSON con tipos correctos

### Fase 5 — Despliegue

- [ ] Ejecutar `npm run validate` sin errores
- [ ] Configurar variables de entorno en Vercel
- [ ] Push a `main` → verificar build automático en Vercel
- [ ] Verificar URL pública del despliegue
- [ ] Confirmar que el Home muestra "Hola Mundo" con el efecto elegante

---

## 12. Comandos de Referencia

```bash
# Crear el proyecto
npx create-next-app@latest repositorio-indigena \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir

# Instalar dependencias del plan
cd repositorio-indigena
npm install framer-motion

# Desarrollo local
npm run dev          # http://localhost:3000

# Validación TypeScript
npx tsc --noEmit     # Sin errores = TypeScript válido ✅

# Validación completa (tipos + lint + build)
npm run validate

# Despliegue manual a Vercel (alternativa al push automático)
npx vercel --prod

# Ver logs de Vercel en tiempo real
npx vercel logs --follow
```

---

## 📝 Notas del Arquitecto

**¿Por qué Next.js App Router?**
Permite combinar Server Components (que leen los JSON directamente en el servidor sin exponer la lógica al cliente) con Client Components (para las animaciones con Framer Motion), logrando el mejor balance entre rendimiento y experiencia visual.

**¿Por qué JSON y no SQLite?**
Para un proyecto que no requiere operaciones concurrentes complejas, los JSON ofrecen: versionado en Git, cero configuración, legibilidad humana y despliegue sin infraestructura adicional. Los tipos de TypeScript garantizan la integridad de los datos.

**¿Limitación de escritura en Vercel?**
Las funciones serverless de Vercel son efímeras — no persisten cambios en disco. Si en el futuro se necesita escritura desde el frontend, migrar a **Vercel Blob** (para archivos) o **Vercel KV** (para datos clave-valor) manteniendo la misma filosofía sin BD convencional.

---

*Plan generado el 25 de marzo de 2026 · Arquitectura: TypeScript Fullstack · Target: repositorio-indigena → Vercel*
