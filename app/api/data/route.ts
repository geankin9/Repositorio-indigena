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
