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
