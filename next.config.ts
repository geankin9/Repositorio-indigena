import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Permite que las API Routes lean archivos del sistema
  // (necesario para leer /data/*.json en producción)
  serverExternalPackages: ["fs", "path"],

  typescript: {
    // En CI/CD queremos que los errores de TypeScript fallen el build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
