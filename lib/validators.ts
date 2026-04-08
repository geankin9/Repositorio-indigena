/**
 * validators.ts
 * Schemas de validación Zod para los archivos JSON de /data.
 *
 * Cada schema refleja exactamente la estructura de su archivo JSON correspondiente.
 * Los schemas se usan en dataService.ts para validar los datos en runtime antes
 * de devolverlos al llamador, garantizando que el JSON en disco no tiene datos
 * corruptos ni con tipos incorrectos.
 *
 * ⚠️  SOLO EJECUTAR EN EL SERVIDOR — los schemas usan Zod que está disponible
 *     tanto en servidor como en cliente, pero los datos provienen de fs (server-only).
 */

import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// AppConfig Schema — valida /data/config.json
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Schema Zod para la configuración global de la aplicación.
 * Usa z.enum() para el campo theme para garantizar que solo
 * contiene "light" o "dark" y rechaza cualquier otro valor en runtime.
 */
export const AppConfigSchema = z.object({
  appName: z.string().min(1, "appName no puede estar vacío"),
  version: z.string().min(1, "version no puede estar vacía"),
  locale: z.string().min(2, "locale debe ser un código válido (ej: es-CO)"),
  theme: z.enum(["light", "dark"], {
    error: "theme debe ser 'light' o 'dark'",
  }),
});

/**
 * Tipo TypeScript inferido del schema AppConfigSchema.
 * Equivalente a la interfaz AppConfig de types.ts — garantiza consistencia
 * entre el schema de validación y el tipo estático.
 */
export type AppConfigZod = z.infer<typeof AppConfigSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// HomeData Schema — valida /data/home.json
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sub-schema para la sección Hero del Home.
 */
const HeroSectionSchema = z.object({
  title: z.string().min(1, "hero.title no puede estar vacío"),
  subtitle: z.string().min(1, "hero.subtitle no puede estar vacío"),
  description: z.string().min(1, "hero.description no puede estar vacío"),
  animationStyle: z.enum(["typewriter", "fadeIn", "slideUp"], {
    error: "animationStyle debe ser 'typewriter', 'fadeIn' o 'slideUp'",
  }),
});

/**
 * Sub-schema para los metadatos SEO del Home.
 */
const MetaSectionSchema = z.object({
  pageTitle: z.string().min(1, "meta.pageTitle no puede estar vacío"),
  description: z.string().min(1, "meta.description no puede estar vacío"),
});

/**
 * Schema Zod completo para los datos de la página Home.
 * Compone los sub-schemas HeroSection y MetaSection.
 * Usa z.enum() para animationStyle por la misma razón que theme en AppConfig.
 */
export const HomeDataSchema = z.object({
  hero: HeroSectionSchema,
  meta: MetaSectionSchema,
});

/**
 * Tipo TypeScript inferido del schema HomeDataSchema.
 * Equivalente a la interfaz HomeData de types.ts.
 */
export type HomeDataZod = z.infer<typeof HomeDataSchema>;
