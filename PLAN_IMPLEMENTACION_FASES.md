# 🚀 Plan de Implementación por Fases
### Sistema Fullstack TypeScript · `repositorio-indigena` · Vercel

---

## 📊 Resumen General

| Componente | Detalle |
|---|---|
| Repositorio | `repositorio-indigena` (GitHub) |
| Framework | Next.js 14.x — App Router |
| Lenguaje | TypeScript 5.x — modo estricto |
| Persistencia | Archivos JSON en `/data` |
| Despliegue | Vercel (región `gru1` — São Paulo) |
| **Tiempo total estimado** | **3.5 – 6 horas de trabajo efectivo** |

---

## ⏱️ Cronograma

| Fase | Nombre | Duración Est. | Dependencia |
|---|---|---|---|
| 1 | Setup Inicial | 30 – 45 min | — |
| 2 | Capa de Datos | 45 – 60 min | Fase 1 |
| 3 | Frontend | 60 – 90 min | Fases 1 y 2 |
| 4 | Backend / API | 30 – 45 min | Fase 2 |
| 5 | Despliegue | 30 – 60 min | Fases 1 – 4 |

---

## Fase 1 — Setup Inicial del Proyecto

**Objetivo:** Crear la base del repositorio, inicializar Next.js con TypeScript y vincular el proyecto con Vercel para el despliegue continuo.

### Tareas

- [ ] Crear repositorio `repositorio-indigena` en GitHub
- [ ] Inicializar Next.js con TypeScript:
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
  ```
- [ ] Limpiar archivos de demo generados por `create-next-app`
- [ ] Configurar `tsconfig.json` con modo estricto (`strict`, `noUncheckedIndexedAccess`, `noImplicitAny`)
- [ ] Instalar dependencia de animaciones:
  ```bash
  npm install framer-motion
  ```
- [ ] Vincular repositorio con cuenta de Vercel desde `vercel.com/new`

### Comandos de Referencia

```bash
# Scaffolding completo
npx create-next-app@latest repositorio-indigena \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir

cd repositorio-indigena
npm install framer-motion

# Conectar con GitHub
git init && git remote add origin <URL_DEL_REPO>
```

### ✅ Criterios de Éxito

- `npm run dev` arranca en `http://localhost:3000` sin errores
- El repositorio aparece en el dashboard de Vercel como proyecto vinculado

---

## Fase 2 — Capa de Datos (JSON + TypeScript)

**Objetivo:** Construir la capa de persistencia usando archivos JSON tipados. Los tipos de TypeScript garantizan la integridad de los datos en todo el proyecto.

### Archivos a Crear

| Archivo | Descripción |
|---|---|
| `/data/site.json` | Configuración del sitio: `meta`, `home` (headline, subheadline, animationStyle) |
| `/lib/types.ts` | Interfaces: `SiteMeta`, `HomeConfig`, `SiteData` — validan el JSON en TypeScript |
| `/lib/dataLoader.ts` | Utilidades `readData<T>()` y `writeData<T>()` centralizadas |
| `/data/README.md` | Documentación del esquema de datos para colaboradores |

### Tareas

- [ ] Crear carpeta `/data` en la raíz del proyecto
- [ ] Crear `data/site.json` con la estructura `meta` + `home`:
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
- [ ] Crear `lib/types.ts` con interfaces `SiteMeta`, `HomeConfig` y `SiteData`
- [ ] Crear `lib/dataLoader.ts` con las funciones `readData` y `writeData`
- [ ] Ejecutar `npx tsc --noEmit` — verificar que no haya errores de tipos
- [ ] Crear `data/README.md` con documentación del esquema

### ✅ Criterios de Éxito

- `npx tsc --noEmit` pasa sin errores
- `readData<SiteData>('site')` retorna el objeto correctamente tipado en una prueba manual

---

## Fase 3 — Arquitectura Frontend

**Objetivo:** Implementar la interfaz de usuario con Next.js App Router, Framer Motion y CSS Modules. El Home debe mostrar "Hola Mundo" con el efecto `fade-slide` animado.

### Archivos a Crear / Modificar

| Archivo | Acción | Descripción |
|---|---|---|
| `app/layout.tsx` | MODIFICAR | Layout raíz — metadata, fuente Inter, `html lang="es"` |
| `app/page.tsx` | MODIFICAR | Server Component — lee JSON y renderiza `HelloWorld` |
| `app/globals.css` | MODIFICAR | Reset CSS + body con fondo `#0a0a0f` |
| `components/HelloWorld.tsx` | CREAR | Componente con animaciones Framer Motion |
| `components/HelloWorld.module.css` | CREAR | Estilos: gradiente, headline, subheadline, divider |

### Tareas

- [ ] Actualizar `app/globals.css` con reset CSS y fondo oscuro (`#0a0a0f`)
- [ ] Actualizar `app/layout.tsx` con metadata `'Repositorio Indígena'` y fuente Inter
- [ ] Crear `components/HelloWorld.tsx` con animaciones Framer Motion (fade-slide)
- [ ] Crear `components/HelloWorld.module.css` con gradiente radial y estilos del headline
- [ ] Actualizar `app/page.tsx` para leer `data/site.json` y pasar `config` a `HelloWorld`
- [ ] Verificar que `HelloWorld.tsx` incluye `'use client'` al inicio (requiere Framer Motion)
- [ ] Confirmar que `page.tsx` es Server Component (sin `'use client'`)

> **⚠️ Importante:** `page.tsx` debe ser Server Component para leer los JSON en servidor. `HelloWorld.tsx` debe ser Client Component porque usa Framer Motion.

### ✅ Criterios de Éxito

- `http://localhost:3000` muestra "Hola Mundo" con animación fade-slide sobre fondo oscuro
- El subheadline y la línea divisora se animan en secuencia
- La página es completamente responsiva (`clamp` en `font-size`)

---

## Fase 4 — Arquitectura Backend / API Routes

**Objetivo:** Exponer los datos del sitio a través de un endpoint REST serverless. Las API Routes de Next.js se despliegan automáticamente como funciones serverless en Vercel.

### Endpoint a Implementar

| Método | Ruta | Respuesta |
|---|---|---|
| `GET` | `/api/data` | `{ success: true, data: SiteData }` — configuración completa del sitio |
| `GET` (error) | `/api/data` | `{ success: false, error: string }` — HTTP 500 si falla la lectura |

### Tareas

- [ ] Crear carpeta `app/api/data/`
- [ ] Crear `app/api/data/route.ts` con función `GET` asíncrona
- [ ] Implementar manejo de errores con `try/catch` y `NextResponse.json()`
- [ ] Probar el endpoint: `GET http://localhost:3000/api/data`
- [ ] Verificar que la respuesta incluye `success: true` y el objeto `data` tipado correctamente
- [ ] Confirmar que el tipo de respuesta coincide con la interfaz `SiteData`

### Configuración Adicional en `next.config.ts`

Agregar para que las API Routes puedan leer archivos del sistema en producción:

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["fs", "path"], // ← necesario para leer /data/*.json
};
```

### ✅ Criterios de Éxito

- `GET /api/data` retorna HTTP 200 con JSON válido
- El campo `data.meta.title` contiene `'Repositorio Indígena'`
- `npx tsc --noEmit` continúa sin errores después de agregar la API Route

---

## Fase 5 — Despliegue y Validación en Vercel

**Objetivo:** Desplegar el sistema en producción verificando que el build de TypeScript pase sin errores y que el Home sea accesible públicamente desde la URL de Vercel.

### Configuración de `vercel.json`

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

> `"regions": ["gru1"]` → São Paulo — edge más cercano desde Colombia.

### Variables de Entorno en Vercel Dashboard

Ir a **Settings → Environment Variables** y agregar:

| Variable | Valor | Entorno |
|---|---|---|
| `NODE_ENV` | `production` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://repositorio-indigena.vercel.app` | All |

### Checklist Pre-Despliegue

- [ ] **Ejecutar `npm run validate` (typecheck + lint + build) — sin errores**
- [ ] Revisar que `.env.local` está en `.gitignore` y no fue commiteado
- [ ] Confirmar que `vercel.json` tiene `regions: ["gru1"]` configurado
- [ ] Agregar variables de entorno en Vercel Dashboard

### Checklist de Despliegue

- [ ] **Ejecutar `git push origin main` para disparar el pipeline de Vercel**
- [ ] Verificar que el build automático en Vercel Dashboard pasa (verde ✓)
- [ ] Abrir la URL pública: `https://repositorio-indigena.vercel.app`
- [ ] Confirmar que el Home muestra "Hola Mundo" con el efecto elegante
- [ ] Probar el endpoint: `GET https://repositorio-indigena.vercel.app/api/data`
- [ ] Confirmar respuesta JSON con `success: true` y los datos correctos

### ✅ Criterios de Éxito Final

- El Home muestra "Hola Mundo" animado en la URL pública de Vercel
- `/api/data` responde con el JSON de configuración del sitio
- Cada nuevo push a `main` desencadena un despliegue automático (CI/CD activo)

---

## 📝 Notas Arquitectónicas

> **Escritura JSON en producción:** Las funciones serverless de Vercel son efímeras — no persisten cambios en disco. `writeData()` solo funciona en desarrollo local. Para escritura en producción migrar a **Vercel Blob** (archivos) o **Vercel KV** (clave-valor).

> **Server vs Client Components:** `app/page.tsx` debe ser Server Component para leer los JSON en servidor. `HelloWorld.tsx` debe ser Client Component (`'use client'`) porque usa Framer Motion.

> **Región Vercel:** `gru1` = São Paulo es el edge de Vercel más cercano a Colombia, minimizando latencia para usuarios latinoamericanos.

---

*Plan generado el 25 de marzo de 2026 · Arquitectura: TypeScript Fullstack · Target: `repositorio-indigena` → Vercel*
