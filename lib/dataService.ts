/**
 * dataService.ts
 * Servicio centralizado para leer archivos JSON de la capa de datos.
 *
 * ⚠️  SOLO EJECUTAR EN EL SERVIDOR (Server Components, API Routes).
 *     Nunca importar desde Client Components ("use client").
 *
 * Funciones disponibles:
 *   readJsonFile<T>(filename)  — lectura genérica, cualquier JSON tipado
 *   readAppConfig()            — lee y valida config.json con Zod
 *   readHomeData()             — lee y valida home.json con Zod
 */

import fs from "fs";
import path from "path";
import { AppConfigSchema, HomeDataSchema } from "./validators";
import type { AppConfig, HomeData } from "./types";

/** Directorio raíz de los archivos de datos */
const DATA_DIR = path.join(process.cwd(), "data");

// ─────────────────────────────────────────────────────────────────────────────
// Función genérica base
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lee un archivo JSON de la carpeta /data y lo devuelve tipado como T.
 *
 * @template T - Tipo esperado del contenido del JSON
 * @param filename - Nombre del archivo sin extensión (ej: "config", "home")
 * @returns El contenido del archivo parseado y tipado como T
 * @throws Error si el archivo no existe o no es JSON válido
 *
 * @example
 * ```typescript
 * const config = readJsonFile<AppConfig>("config");
 * const home   = readJsonFile<HomeData>("home");
 * ```
 */
export function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, `${filename}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `[dataService] Archivo de datos no encontrado: ${filename}.json\n` +
        `Ruta buscada: ${filePath}`
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(
      `[dataService] Error al parsear ${filename}.json — verifica que el formato JSON sea válido.`
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Funciones tipadas con validación Zod
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lee y valida /data/config.json usando el schema Zod AppConfigSchema.
 *
 * @returns AppConfig validado en runtime por Zod
 * @throws ZodError si la estructura del JSON no coincide con el schema
 * @throws Error si el archivo no existe o no es JSON válido
 *
 * @example
 * ```typescript
 * // En un Server Component o API Route:
 * import { readAppConfig } from "@/lib/dataService";
 * const config = readAppConfig();
 * console.log(config.appName); // "Mi App TypeScript"
 * ```
 */
export function readAppConfig(): AppConfig {
  const raw = readJsonFile<unknown>("config");
  const result = AppConfigSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(
      `[dataService] config.json no cumple el schema esperado:\n${result.error.message}`
    );
  }

  return result.data;
}

/**
 * Lee y valida /data/home.json usando el schema Zod HomeDataSchema.
 *
 * @returns HomeData validado en runtime por Zod
 * @throws ZodError si la estructura del JSON no coincide con el schema
 * @throws Error si el archivo no existe o no es JSON válido
 *
 * @example
 * ```typescript
 * // En un Server Component o API Route:
 * import { readHomeData } from "@/lib/dataService";
 * const home = readHomeData();
 * console.log(home.hero.title); // "Hola Mundo"
 * ```
 */
export function readHomeData(): HomeData {
  const raw = readJsonFile<unknown>("home");
  const result = HomeDataSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(
      `[dataService] home.json no cumple el schema esperado:\n${result.error.message}`
    );
  }

  return result.data;
}
