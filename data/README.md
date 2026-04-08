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

| Archivo | Propósito | Tipo TypeScript |
|---------|-----------|----------------|
| `site.json` | Configuración general del sitio (metadata, home) | `SiteData` |

---

## ⚠️ Regla de Acceso: Solo desde el Servidor

> **CRÍTICO:** Estos archivos JSON **NUNCA** deben ser importados directamente en Client Components.

```
✅ CORRECTO — Server Component o API Route:
   import { readData } from "@/lib/dataLoader";
   const data = readData<SiteData>("site");

❌ INCORRECTO — Client Component:
   import siteData from "@/data/site.json"; // NO usar en "use client"
```

Todos los accesos a los archivos JSON deben pasar por las funciones de `/lib/dataLoader.ts`, que usan `fs` y `path` de Node.js (disponibles solo en el servidor).

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

3. **Leer los datos** en un Server Component o API Route:
   ```typescript
   import { readData } from "@/lib/dataLoader";
   import type { NuevoModulo } from "@/lib/types";

   const datos = readData<NuevoModulo>("nuevo-modulo");
   ```

4. **Ejecutar typecheck** para validar:
   ```bash
   npm run typecheck
   ```

---

## 📝 Reglas de Naming

- Nombres en **kebab-case**: `site.json`, `home-config.json`
- Un archivo por entidad/módulo
- Documentar cada nuevo archivo en la tabla de este README

---

*Capa de datos — repositorio-indigena | Actualizado: 2026-04-08*
