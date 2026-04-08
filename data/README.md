# 📂 Capa de Datos — `/data`

> Este directorio actúa como la **base de datos** del sistema `repositorio-indigena`.
> Cada archivo `.json` representa una entidad o colección de datos.

---

## 🏛️ Filosofía de Diseño

Los archivos `.json` en esta carpeta funcionan como tablas en una base de datos tradicional. Este enfoque fue elegido por las siguientes razones:

- ✅ **Versionamiento en Git** — cada cambio queda registrado en el historial
- ✅ **Cero configuración** — no requiere servidor de base de datos
- ✅ **Legibilidad humana** — cualquier desarrollador puede editar directamente
- ✅ **Tipado garantizado** — los tipos TypeScript en `/lib/types.ts` validan la estructura

---

## 📁 Archivos de Datos

| Archivo | Propósito | Tipo TypeScript | Creado |
|---------|-----------|----------------|--------|
| `config.json` | Configuración global de la aplicación (nombre, versión, locale, theme) | `AppConfig` | Fase 2 |
| `home.json` | Contenido y metadatos de la página Home (hero, meta SEO) | `HomeData` | Fase 2 |

---

### `config.json` — Configuración Global

Contiene los parámetros de configuración global de la aplicación.

```json
{
  "appName": "Mi App TypeScript",
  "version": "1.0.0",
  "locale": "es-CO",
  "theme": "dark"
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `appName` | `string` | Nombre de la aplicación |
| `version` | `string` | Versión semántica del sistema |
| `locale` | `string` | Locale regional (IETF BCP 47) |
| `theme` | `"light" \| "dark"` | Tema visual de la aplicación |

---

### `home.json` — Página Home

Contiene todo el contenido editable de la página principal.

```json
{
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
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `hero.title` | `string` | Título principal animado |
| `hero.subtitle` | `string` | Subtítulo bajo el título |
| `hero.description` | `string` | Descripción corta del sistema |
| `hero.animationStyle` | `"typewriter" \| "fadeIn" \| "slideUp"` | Tipo de animación del título |
| `meta.pageTitle` | `string` | Título de la pestaña del navegador |
| `meta.description` | `string` | Descripción para SEO/meta tags |

---

## ⚠️ Regla de Acceso: Solo desde el Servidor

> **CRÍTICO:** Estos archivos JSON **NUNCA** deben ser importados directamente en Client Components.

```typescript
// ✅ CORRECTO — Server Component o API Route:
import { readJsonFile } from "@/lib/dataService";
import type { AppConfig } from "@/lib/types";
const config = readJsonFile<AppConfig>("config");

// ❌ INCORRECTO — Client Component con "use client":
import configData from "@/data/config.json"; // NO usar en componentes cliente
```

Todos los accesos a los archivos JSON deben pasar por las funciones de `/lib/dataService.ts`, que usan `fs` y `path` de Node.js (disponibles **solo en el servidor**).

Los Client Components deben recibir los datos ya leídos como **props** desde un Server Component padre.

---

## 📋 Cómo Agregar Nuevos Archivos JSON

1. **Crear el archivo JSON** en esta carpeta con la estructura deseada:
   ```json
   // data/nuevo-modulo.json
   {
     "campo1": "valor",
     "campo2": 123
   }
   ```

2. **Definir la interfaz TypeScript** en `/lib/types.ts`:
   ```typescript
   export interface NuevoModulo {
     campo1: string;
     campo2: number;
   }
   ```

3. **Agregar función tipada** en `/lib/dataService.ts`:
   ```typescript
   export function readNuevoModulo(): NuevoModulo {
     return readJsonFile<NuevoModulo>("nuevo-modulo");
   }
   ```

4. **Consumir en un Server Component o API Route:**
   ```typescript
   import { readNuevoModulo } from "@/lib/dataService";
   const datos = readNuevoModulo();
   ```

5. **Ejecutar typecheck** para validar la integridad de tipos:
   ```bash
   npm run typecheck
   ```

6. **Documentar el nuevo archivo** en la tabla de este README.

---

## 📝 Reglas de Naming

- Nombres en **kebab-case**: `config.json`, `home.json`, `about-page.json`
- Un archivo por entidad/módulo
- Documentar cada nuevo archivo en la tabla de este README
- Mantener los datos mínimos necesarios — no duplicar información entre archivos

---

*Capa de datos — repositorio-indigena | Actualizado en Fase 2: 2026-04-08*
