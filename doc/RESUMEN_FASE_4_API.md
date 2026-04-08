# 📄 RESUMEN_FASE_4_API.md
### Proyecto: `repositorio-indigena` · Fase 4 — API Route Handler

---

## 📋 Información General

| Campo | Valor |
|---|---|
| Fecha de ejecución | 2026-04-08 |
| Hora de inicio | 2026-04-08T18:42:36-05:00 |
| Hora de cierre | 2026-04-08T18:48:02-05:00 |
| Duración | ~5 minutos |
| Ejecutor | Ingeniero Fullstack Senior |
| Objetivo | Crear los Route Handlers de la API RESTful en Next.js 16 App Router, probarlos en local y documentar los outputs |

---

## 🎯 Objetivo de la Fase

Implementar los endpoints HTTP que exponen los datos JSON a través de la capa API del servidor, usando funciones tipadas con Zod del `dataService` y siguiendo los patrones actuales de Next.js 16 (Route Handlers con `Response.json()`, no el patrón legacy de Pages Router).

---

## 📡 Endpoints Creados

| Ruta | Método | Status | Datos servidos |
|---|---|---|---|
| `GET /api/data` | GET | ✅ Operativo | `HomeData` — hero + meta del home |
| `GET /api/config` | GET | ✅ Operativo | `AppConfig` — appName, version, locale, theme |

---

## 📁 Código Completo de los Route Handlers

### `app/api/data/route.ts` — GET /api/data

```typescript
/**
 * app/api/data/route.ts
 * Route Handler — GET /api/data
 *
 * Devuelve los datos de la página Home (/data/home.json) validados con Zod.
 *
 * ⚠️  Server-only: este archivo se ejecuta exclusivamente en el servidor
 *     (Node.js serverless en Vercel). Nunca se envía al cliente.
 *
 * Respuesta exitosa (200):
 *   { "success": true, "data": { "hero": {...}, "meta": {...} } }
 *
 * Respuesta de error (500):
 *   { "success": false, "error": "..." }
 */

import { readHomeData } from "@/lib/dataService";
import type { HomeData } from "@/lib/types";

// Forzar evaluación dinámica en cada request (lectura de archivo en disco)
export const dynamic = "force-dynamic";

/**
 * GET /api/data
 *
 * Lee y valida /data/home.json usando readHomeData() (que internamente
 * usa HomeDataSchema.safeParse()). Retorna los datos tipados como HomeData.
 *
 * @returns 200 con { success: true, data: HomeData }
 * @returns 500 con { success: false, error: string } si el JSON es inválido
 */
export async function GET(): Promise<Response> {
  try {
    const data: HomeData = readHomeData();

    return Response.json(
      { success: true, data },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al leer los datos del home";

    console.error("[GET /api/data] Error:", message);

    return Response.json(
      {
        success: false,
        error: "No se pudieron cargar los datos del home",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
```

---

### `app/api/config/route.ts` — GET /api/config

```typescript
/**
 * app/api/config/route.ts
 * Route Handler — GET /api/config
 *
 * Devuelve la configuración global de la aplicación (/data/config.json)
 * validada con Zod.
 *
 * ⚠️  Server-only: este archivo se ejecuta exclusivamente en el servidor
 *     (Node.js serverless en Vercel). Nunca se envía al cliente.
 *
 * Respuesta exitosa (200):
 *   { "success": true, "data": { "appName": "...", "version": "...", ... } }
 *
 * Respuesta de error (500):
 *   { "success": false, "error": "..." }
 */

import { readAppConfig } from "@/lib/dataService";
import type { AppConfig } from "@/lib/types";

// Forzar evaluación dinámica en cada request (lectura de archivo en disco)
export const dynamic = "force-dynamic";

/**
 * GET /api/config
 *
 * Lee y valida /data/config.json usando readAppConfig() (que internamente
 * usa AppConfigSchema.safeParse()). Retorna los datos tipados como AppConfig.
 *
 * @returns 200 con { success: true, data: AppConfig }
 * @returns 500 con { success: false, error: string } si el JSON es inválido
 */
export async function GET(): Promise<Response> {
  try {
    const data: AppConfig = readAppConfig();

    return Response.json(
      { success: true, data },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al leer la configuración";

    console.error("[GET /api/config] Error:", message);

    return Response.json(
      {
        success: false,
        error: "No se pudo cargar la configuración de la aplicación",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
```

---

## 🧪 Outputs de Pruebas Locales

Servidor: `npm run dev` — Next.js 16.2.3 (Turbopack) · Listo en 356ms

### GET http://localhost:3000/api/data

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Hola Mundo",
      "subtitle": "TypeScript + Next.js + Vercel",
      "description": "Sistema fullstack funcionando correctamente.",
      "animationStyle": "typewriter"
    },
    "meta": {
      "pageTitle": "Home | Mi App",
      "description": "Página principal del sistema"
    }
  }
}
```

**Log del servidor:**
```
GET /api/data 200 in 429ms (next.js: 408ms, application-code: 21ms)
```

### GET http://localhost:3000/api/config

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "appName": "Mi App TypeScript",
    "version": "1.0.0",
    "locale": "es-CO",
    "theme": "dark"
  }
}
```

**Log del servidor:**
```
GET /api/config 200 in 97ms (next.js: 93ms, application-code: 4ms)
```

---

## 🛡️ Manejo de Errores Implementado

### Flujo de error en runtime

```
readHomeData() / readAppConfig()
       │
       │  ← Zod safeParse falla (JSON mal formado o campo inválido)
       │  ← fs.readFileSync falla (archivo no encontrado)
       ▼
   catch (error: unknown)
       │
       ├── instanceof Error → usar error.message
       └── otro → mensaje genérico
            │
            ▼
       Response.json({ success: false, error: "...", detail?: "..." }, { status: 500 })
```

### Características del manejo de error

| Característica | Implementación |
|---|---|
| Tipo del catch | `error: unknown` (no `any`) |
| Detección de tipo | `instanceof Error` check |
| Log de servidor | `console.error("[GET /api/...]")` |
| Mensaje público | Genérico (no revela detalles internos) |
| Campo `detail` | Solo en `NODE_ENV === 'development'` |
| Status HTTP | 500 Internal Server Error |

---

## 🔧 Patrón Server-Only de los Datos

Los Route Handlers son **exclusivamente server-side**:

```
Cliente (browser)
     │
     │  HTTP GET /api/data
     ▼
Next.js Serverless Function (Vercel)  ← app/api/data/route.ts
     │
     │  readHomeData()
     ▼
lib/dataService.ts (Node.js fs module)
     │
     │  fs.readFileSync(...)
     ▼
data/home.json  ← Archivo en disco del servidor
     │
     │  Zod validation
     ▼
Response.json({ success: true, data: HomeData })
     │
     ▼
Cliente recibe JSON tipado
```

> ⚠️ **Importante:** `fs` y `path` son módulos de Node.js — solo disponibles en el servidor. Los Route Handlers nunca se ejecutan en el browser. En Vercel, cada archivo en `app/api/*/route.ts` se despliega como una función serverless independiente.

---

## ✅ Resultado de `npm run typecheck`

```bash
> repositorio-indigena@0.1.0 typecheck
> tsc --noEmit

# (sin salida adicional = 0 errores)
```

**Exit code: 0 — TypeScript válido sin ningún error.**

> Ejecutado **dos veces**: antes de iniciar el servidor (con tsconfig original) y después de que Next.js lo modificara automáticamente. Ambas pasan sin errores.

### Cambio automático al tsconfig.json

Al ejecutar `npm run dev`, Next.js 16 modificó el `tsconfig.json`:

| Propiedad | Antes | Después | Tipo de cambio |
|---|---|---|---|
| `jsx` | `"preserve"` | `"react-jsx"` | **Obligatorio** (Next.js 16 requiere react-jsx) |
| `include` | `[..., ".next/types/**/*.ts"]` | `[..., ".next/types/**/*.ts", ".next/dev/types/**/*.ts"]` | **Sugerido** (tipos de dev Turbopack) |

Ambos cambios son correctos y alineados con Next.js 16.

---

## 🔑 Decisiones de Diseño Clave

### ¿Por qué `Response.json()` y no `NextResponse.json()`?

La documentación oficial de Next.js 16 en `node_modules/next/dist/docs/` usa `Response.json()` (Web API nativa) como patrón estándar para los Route Handlers. `NextResponse` de `next/server` también funciona, pero es una abstracción adicional no necesaria para este caso de uso.

### ¿Por qué `export const dynamic = "force-dynamic"`?

Sin esta directiva, Next.js puede intentar pre-renderizar estáticamente el Route Handler en build time. Como los handlers leen archivos con `fs.readFileSync`, necesitan ejecutarse en runtime. `force-dynamic` garantiza que siempre se ejecuten en request time.

### ¿Por qué `Cache-Control: no-store`?

Los datos provienen de archivos que se actualizan con cada deploy. CDNs como Vercel Edge Network no deben cachear estas respuestas para garantizar que siempre devuelvan los datos actuales del JSON.

### ¿Por qué `error: unknown` en el catch?

TypeScript con `strict: true` y `useUnknownInCatchVariables` (activado por `strict`) requiere tratar el valor capturado como `unknown`. Esto obliga a verificar `instanceof Error` antes de acceder a `.message`, lo cual es más seguro que asumir que siempre es un `Error`.

---

## 📊 Estado de Archivos al Finalizar la Fase

```
app/
├── api/
│   ├── data/
│   │   └── route.ts     ✅ GET /api/data → { success: true, data: HomeData }
│   └── config/
│       └── route.ts     ✅ GET /api/config → { success: true, data: AppConfig }
├── layout.tsx            ← Sin cambios en esta fase
├── page.tsx              ← Sin cambios en esta fase
└── globals.css           ← Sin cambios en esta fase

lib/
├── types.ts              ← Sin cambios (Fase 3)
├── validators.ts         ← Sin cambios (Fase 3)
└── dataService.ts        ← Sin cambios (Fase 3)

data/
├── config.json           ← Sin cambios (Fase 2)
└── home.json             ← Sin cambios (Fase 2)
```

---

## 🔜 Estado Final y Próxima Fase

| Estado actual | Próxima fase |
|---|---|
| ✅ Fase 4 completada — API Route Handler | 🔵 Fase 5 — Despliegue en Vercel |

### Lo que viene en Fase 5

- Configurar `vercel.json` con la configuración de despliegue
- Configurar variables de entorno en el dashboard de Vercel
- Ejecutar `npm run validate` (typecheck + lint + build) antes del push
- Push a `main` → verificar build automático en Vercel
- Confirmar URL pública del despliegue
- Verificar que los endpoints `/api/data` y `/api/config` funcionan en producción

---

*Resumen generado automáticamente — 2026-04-08T18:48:02-05:00*
*Proyecto: repositorio-indigena · Fase 4 de 5 · Estado: ✅ Completada*
