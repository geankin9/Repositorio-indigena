/**
 * types.ts
 * Interfaces y tipos globales de TypeScript para el sistema repositorio-indigena.
 *
 * Estos tipos son la fuente de verdad para la estructura de los archivos JSON
 * en /data. TypeScript usa estas interfaces para garantizar la integridad de
 * los datos en tiempo de compilación.
 *
 * ⚠️  Exportaciones individuales — sin default export.
 *     Importar siempre con: import type { AppConfig, HomeData } from "@/lib/types"
 */

// ─────────────────────────────────────────────────────────────────────────────
// AppConfig — Tipos para /data/config.json
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tema visual de la aplicación.
 * Literal union en vez de string para que TypeScript impida valores inválidos
 * como "Dark" (mayúscula) o "sistema" en tiempo de compilación.
 */
export type Theme = "light" | "dark";

/**
 * Configuración global de la aplicación.
 * Corresponde a la estructura de /data/config.json.
 */
export interface AppConfig {
  /** Nombre visible de la aplicación */
  appName: string;
  /** Versión semántica del sistema (SemVer) */
  version: string;
  /** Código regional IETF BCP 47 (ej: "es-CO", "en-US") */
  locale: string;
  /** Tema visual — valores permitidos: "light" | "dark" */
  theme: Theme;
}

// ─────────────────────────────────────────────────────────────────────────────
// HomeData — Tipos para /data/home.json
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Estilo de animación para el texto del Hero.
 * Literal union para garantizar que solo se usen estilos implementados
 * en los componentes de animación de Framer Motion.
 */
export type AnimationStyle = "typewriter" | "fadeIn" | "slideUp";

/**
 * Sección Hero de la página principal.
 * Contiene todos los textos visibles del área superior de la Home.
 */
export interface HeroSection {
  /** Título principal — animado con Framer Motion */
  title: string;
  /** Subtítulo debajo del título */
  subtitle: string;
  /** Párrafo descriptivo del sistema */
  description: string;
  /** Tipo de animación aplicada al título — controla el componente AnimatedText */
  animationStyle: AnimationStyle;
}

/**
 * Metadatos SEO de la página principal.
 * Se usan en Next.js generateMetadata o export const metadata.
 */
export interface MetaSection {
  /** Título de la pestaña del navegador */
  pageTitle: string;
  /** Descripción para motores de búsqueda y Open Graph */
  description: string;
}

/**
 * Datos completos de la página Home.
 * Corresponde a la estructura de /data/home.json.
 */
export interface HomeData {
  /** Sección Hero visible en la parte superior */
  hero: HeroSection;
  /** Metadatos SEO de la página */
  meta: MetaSection;
}
