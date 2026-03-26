# 🧠 Prompts de Ejecución — `repositorio-indigena`

> Archivo maestro de prompts para ejecutar el plan de implementación fase por fase.
> Cada prompt está diseñado para ser usado con un agente de IA (Claude, Cursor, Copilot, etc.).
> **Instrucción general:** Antes de usar cualquier prompt, asegúrate de que los tres documentos de referencia estén accesibles: `PLAN_INFRAESTRUCTURA.md`, `PLAN_IMPLEMENTACION_FASES.md` y `ESTADO_EJECUCION.md`.

---

## 📌 Instrucciones de Uso

1. Ejecuta los prompts **en orden**, una fase a la vez.
2. Cada prompt **inicia** registrando el comienzo en `ESTADO_EJECUCION.md`.
3. Cada prompt **finaliza** documentando los resultados en `ESTADO_EJECUCION.md`.
4. Al terminar cada fase, el agente **crea un archivo de resumen independiente** (`RESUMEN_FASE_N_*.md`).
5. No saltes fases — cada una declara su dependencia.

---

---

## 🔧 FASE 1 — Setup Inicial del Proyecto

### 📄 Documentos de Referencia (leer antes de comenzar)

```
- PLAN_INFRAESTRUCTURA.md       → Sección 2 (Stack), Sección 3 (Estructura de carpetas), Sección 12 (Comandos)
- PLAN_IMPLEMENTACION_FASES.md  → Fase 1 completa (Setup Inicial)
- ESTADO_EJECUCION.md           → Leer estado actual antes de iniciar
```

### 🎭 Rol / Skill

```
Actúa como un Ingeniero Fullstack Senior especializado en ecosistemas TypeScript modernos.
Tu stack de referencia es: Next.js 14 App Router, TypeScript 5 en modo estricto, Tailwind CSS, Vercel.
Tienes experiencia configurando proyectos desde cero con las mejores prácticas de la industria.
Eres meticuloso con la configuración inicial porque sabes que una base sólida evita problemas en fases posteriores.
```

### 📋 Prompt Completo

```
Lee completamente los siguientes documentos antes de ejecutar cualquier acción:
1. PLAN_INFRAESTRUCTURA.md (especialmente secciones 2, 3 y 12)
2. PLAN_IMPLEMENTACION_FASES.md (Fase 1 — Setup Inicial)
3. ESTADO_EJECUCION.md (estado actual del proyecto)

--- REGISTRO DE INICIO ---
Antes de hacer cualquier otra cosa, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 1 de "⬜ Pendiente" a "🔄 En progreso"
- Registra la fecha y hora de inicio en el campo "Inicio" de la Fase 1
- Agrega una entrada al Historial con formato:
  ### 🔄 [FECHA HORA] — Fase 1 iniciada
  - **Rol activo:** Ingeniero Fullstack Senior
  - **Acción:** Inicio de setup inicial del proyecto
  - **Estado previo leído:** [describir qué encontraste en ESTADO_EJECUCION.md]

--- EJECUCIÓN ---
Ejecuta todas las tareas de la Fase 1 según el plan:
1. Crea el repositorio `repositorio-indigena` en GitHub
2. Inicializa Next.js con TypeScript usando el comando exacto del plan
3. Limpia los archivos de demo de create-next-app
4. Configura tsconfig.json en modo estricto (strict, noUncheckedIndexedAccess, noImplicitAny)
5. Instala framer-motion
6. Vincula el repositorio con Vercel desde vercel.com/new

Para cada tarea: documenta el comando exacto ejecutado y el resultado obtenido.

--- VALIDACIÓN ---
Verifica los criterios de éxito de la Fase 1:
- [ ] `npm run dev` arranca en http://localhost:3000 sin errores
- [ ] El repositorio aparece vinculado en el dashboard de Vercel
Documenta el resultado de cada criterio (pasó / falló / pendiente manual).

--- REGISTRO DE CIERRE ---
Actualiza ESTADO_EJECUCION.md al finalizar:
- Cambia el estado de la Fase 1 a "✅ Completada" (o "❌ Bloqueada" si hubo errores críticos)
- Registra la fecha y hora de fin
- Agrega entrada al Historial con formato:
  ### ✅ [FECHA HORA] — Fase 1 completada
  - **Tareas completadas:** [lista de lo que se hizo]
  - **Comandos ejecutados:** [comandos clave usados]
  - **Criterios de éxito:** [resultado de cada criterio]
  - **Observaciones:** [problemas encontrados, decisiones tomadas, notas relevantes]
- Si hubo problemas, agrégalos a la sección "Problemas y Bloqueos Registrados"

--- RESUMEN DE FASE ---
Crea el archivo RESUMEN_FASE_1_SETUP.md con la siguiente estructura:
# Resumen Fase 1 — Setup Inicial
## Objetivo cumplido
## Comandos ejecutados
## Archivos creados/modificados
## Configuraciones aplicadas
## Criterios de éxito (resultado)
## Decisiones técnicas tomadas
## Notas para la Fase 2

Actualiza en ESTADO_EJECUCION.md la tabla de archivos de resumen marcando RESUMEN_FASE_1_SETUP.md como creado.
```

---

---

## 📦 FASE 2 — Capa de Datos (JSON + TypeScript)

### 📄 Documentos de Referencia (leer antes de comenzar)

```
- PLAN_INFRAESTRUCTURA.md       → Sección 4 (Capa de Datos), Sección 7 (Validación TypeScript)
- PLAN_IMPLEMENTACION_FASES.md  → Fase 2 completa (Capa de Datos)
- ESTADO_EJECUCION.md           → Verificar que Fase 1 esté ✅ Completada antes de continuar
```

### 🎭 Rol / Skill

```
Actúa como un Ingeniero Fullstack Senior con especialización en arquitectura de datos y TypeScript avanzado.
Tu enfoque principal es la seguridad de tipos: cada dato que entra o sale del sistema debe estar tipado.
Tienes experiencia diseñando capas de abstracción de datos limpias, con funciones genéricas reutilizables.
Sabes que en este proyecto los archivos JSON son la "base de datos" y que TypeScript es la capa de validación.
```

### 📋 Prompt Completo

```
Lee completamente los siguientes documentos antes de ejecutar cualquier acción:
1. PLAN_INFRAESTRUCTURA.md (secciones 4 y 7 completas, incluyendo todos los bloques de código)
2. PLAN_IMPLEMENTACION_FASES.md (Fase 2 — Capa de Datos)
3. ESTADO_EJECUCION.md (verifica que la Fase 1 esté marcada como ✅ Completada)

Si la Fase 1 NO está completada, detente y reporta el bloqueo. No ejecutes esta fase.

--- REGISTRO DE INICIO ---
Actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 2 de "⬜ Pendiente" a "🔄 En progreso"
- Registra la fecha y hora de inicio
- Agrega entrada al Historial:
  ### 🔄 [FECHA HORA] — Fase 2 iniciada
  - **Rol activo:** Ingeniero Fullstack Senior — Arquitectura de Datos
  - **Dependencia verificada:** Fase 1 ✅ confirmada
  - **Acción:** Inicio de construcción de capa de datos JSON + TypeScript

--- EJECUCIÓN ---
Ejecuta todas las tareas de la Fase 2 según el plan:
1. Crea la carpeta /data en la raíz del proyecto
2. Crea data/site.json con la estructura exacta definida en el plan (sección 4.2 de PLAN_INFRAESTRUCTURA.md)
3. Crea lib/types.ts con las interfaces SiteMeta, HomeConfig y SiteData (sección 4.3)
4. Crea lib/dataLoader.ts con las funciones readData<T> y writeData<T> (sección 4.4)
5. Ejecuta `npx tsc --noEmit` y documenta el resultado
6. Crea data/README.md con documentación del esquema de datos

Para cada archivo creado: muestra el contenido completo y confirma que fue escrito correctamente.

--- VALIDACIÓN ---
Verifica los criterios de éxito de la Fase 2:
- [ ] `npx tsc --noEmit` pasa sin errores de tipos
- [ ] `readData<SiteData>('site')` retorna el objeto correctamente tipado en prueba manual
Documenta el resultado exacto de cada validación.

--- REGISTRO DE CIERRE ---
Actualiza ESTADO_EJECUCION.md al finalizar:
- Cambia el estado de la Fase 2 a "✅ Completada" o "❌ Bloqueada"
- Registra fecha y hora de fin
- Agrega entrada al Historial:
  ### ✅ [FECHA HORA] — Fase 2 completada
  - **Archivos creados:** [lista con rutas completas]
  - **Interfaces TypeScript definidas:** [SiteMeta, HomeConfig, SiteData — confirmar]
  - **Resultado tsc --noEmit:** [sin errores / errores encontrados]
  - **Observaciones:** [notas técnicas relevantes]

--- RESUMEN DE FASE ---
Crea el archivo RESUMEN_FASE_2_DATOS.md con la siguiente estructura:
# Resumen Fase 2 — Capa de Datos
## Objetivo cumplido
## Archivos creados
## Interfaces TypeScript definidas
## Esquema JSON implementado
## Resultado de validación TypeScript
## Decisiones de arquitectura tomadas
## Notas para la Fase 3

Actualiza en ESTADO_EJECUCION.md la tabla de archivos de resumen marcando RESUMEN_FASE_2_DATOS.md como creado.
```

---

---

## 🎨 FASE 3 — Arquitectura Frontend

### 📄 Documentos de Referencia (leer antes de comenzar)

```
- PLAN_INFRAESTRUCTURA.md       → Sección 5 (Frontend), Sección 8 (HelloWorld completo con código CSS)
- PLAN_IMPLEMENTACION_FASES.md  → Fase 3 completa (Arquitectura Frontend)
- ESTADO_EJECUCION.md           → Verificar que Fases 1 y 2 estén ✅ Completadas
```

### 🎭 Rol / Skill

```
Actúa como un Diseñador UX/UI Senior con experiencia en desarrollo frontend React/Next.js.
Tu filosofía de diseño: elegancia minimalista, animaciones con propósito, tipografía que comunica.
Dominas Framer Motion para animaciones fluidas, CSS Modules para estilos encapsulados, y el sistema
de diseño basado en gradientes, espaciado generoso y jerarquía visual clara.
Tu código es tan limpio como tu diseño: componentes bien separados entre Server y Client Components,
CSS con variables semánticas, y animaciones que respetan el movimiento reducido del usuario.
Cuando implementas, piensas primero en la experiencia visual y luego en la implementación técnica.
```

### 📋 Prompt Completo

```
Lee completamente los siguientes documentos antes de ejecutar cualquier acción:
1. PLAN_INFRAESTRUCTURA.md (secciones 5 y 8 COMPLETAS — incluye todos los bloques de código CSS y TSX)
2. PLAN_IMPLEMENTACION_FASES.md (Fase 3 — Frontend, prestando atención a la advertencia sobre Server vs Client Components)
3. ESTADO_EJECUCION.md (verifica que las Fases 1 y 2 estén marcadas como ✅ Completadas)

Si alguna dependencia NO está completada, detente y reporta el bloqueo. No ejecutes esta fase.

--- REGISTRO DE INICIO ---
Actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 3 de "⬜ Pendiente" a "🔄 En progreso"
- Registra la fecha y hora de inicio
- Agrega entrada al Historial:
  ### 🔄 [FECHA HORA] — Fase 3 iniciada
  - **Rol activo:** Diseñador UX/UI Senior + Ingeniero Frontend
  - **Dependencias verificadas:** Fase 1 ✅ · Fase 2 ✅
  - **Acción:** Inicio de implementación de arquitectura frontend

--- EJECUCIÓN ---
Ejecuta todas las tareas de la Fase 3 según el plan:
1. Actualiza app/globals.css con el reset CSS y fondo oscuro #0a0a0f (código exacto de la sección 8.3)
2. Actualiza app/layout.tsx con metadata "Repositorio Indígena" y fuente Inter (sección 5.1)
3. Crea components/HelloWorld.tsx con animaciones Framer Motion fade-slide (sección 8.1)
   - IMPORTANTE: debe iniciar con 'use client' (Client Component)
   - Verifica que las animaciones initial/animate/transition están correctamente configuradas
4. Crea components/HelloWorld.module.css con gradiente radial y estilos del headline (sección 8.2)
   - Verifica que usa clamp() para font-size responsivo
5. Actualiza app/page.tsx para leer data/site.json con readData<SiteData> y pasar config a HelloWorld
   - IMPORTANTE: page.tsx NO debe tener 'use client' (Server Component)

Para cada archivo: muestra el contenido completo implementado y confirma la distinción Server/Client.

--- VALIDACIÓN ---
Verifica los criterios de éxito de la Fase 3:
- [ ] http://localhost:3000 muestra "Hola Mundo" con animación fade-slide sobre fondo oscuro
- [ ] El subheadline y la línea divisora se animan en secuencia correcta
- [ ] La página es completamente responsiva (clamp en font-size verificado)
- [ ] HelloWorld.tsx tiene 'use client' al inicio
- [ ] page.tsx es Server Component (sin 'use client')
- [ ] npx tsc --noEmit pasa sin errores

--- REGISTRO DE CIERRE ---
Actualiza ESTADO_EJECUCION.md al finalizar:
- Cambia el estado de la Fase 3 a "✅ Completada" o "❌ Bloqueada"
- Registra fecha y hora de fin
- Agrega entrada al Historial:
  ### ✅ [FECHA HORA] — Fase 3 completada
  - **Archivos creados/modificados:** [lista con rutas]
  - **Componentes implementados:** HelloWorld (Client) + page.tsx (Server)
  - **Animaciones configuradas:** [descripción del fade-slide implementado]
  - **Resultado visual:** [descripción de lo que se ve en el navegador]
  - **Observaciones de diseño:** [decisiones tomadas sobre estilos, colores, tipografía]

--- RESUMEN DE FASE ---
Crea el archivo RESUMEN_FASE_3_FRONTEND.md con la siguiente estructura:
# Resumen Fase 3 — Arquitectura Frontend
## Objetivo cumplido
## Archivos creados/modificados
## Componentes implementados (Server vs Client)
## Sistema de animaciones (Framer Motion)
## Decisiones de diseño UX/UI
## Resultado visual en navegador
## Notas para la Fase 4

Actualiza en ESTADO_EJECUCION.md la tabla de archivos de resumen marcando RESUMEN_FASE_3_FRONTEND.md como creado.
```

---

---

## ⚙️ FASE 4 — Arquitectura Backend / API Routes

### 📄 Documentos de Referencia (leer antes de comenzar)

```
- PLAN_INFRAESTRUCTURA.md       → Sección 6 (Backend/API Routes), Sección 9.3 (next.config.ts)
- PLAN_IMPLEMENTACION_FASES.md  → Fase 4 completa (Backend / API)
- ESTADO_EJECUCION.md           → Verificar que Fases 1, 2 y 3 estén ✅ Completadas
```

### 🎭 Rol / Skill

```
Actúa como un Ingeniero Backend Senior con especialización en arquitecturas serverless y APIs REST.
Tu experiencia cubre Next.js API Routes, funciones serverless en Vercel, manejo robusto de errores
y tipado estricto de respuestas HTTP con TypeScript.
Sabes que en este proyecto las API Routes se despliegan como funciones serverless efímeras en Vercel,
lo que significa que la lectura de archivos JSON del sistema de archivos debe funcionar correctamente
en el contexto del build de producción.
Tu código de API siempre incluye: manejo de errores con try/catch, respuestas tipadas, y HTTP status
codes semánticamente correctos.
```

### 📋 Prompt Completo

```
Lee completamente los siguientes documentos antes de ejecutar cualquier acción:
1. PLAN_INFRAESTRUCTURA.md (secciones 6 y 9.3 completas — incluye el bloque de next.config.ts)
2. PLAN_IMPLEMENTACION_FASES.md (Fase 4 — Backend/API, especialmente la tabla de endpoints y next.config.ts)
3. ESTADO_EJECUCION.md (verifica que las Fases 1, 2 y 3 estén marcadas como ✅ Completadas)

Si alguna dependencia NO está completada, detente y reporta el bloqueo. No ejecutes esta fase.

--- REGISTRO DE INICIO ---
Actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 4 de "⬜ Pendiente" a "🔄 En progreso"
- Registra la fecha y hora de inicio
- Agrega entrada al Historial:
  ### 🔄 [FECHA HORA] — Fase 4 iniciada
  - **Rol activo:** Ingeniero Backend Senior — Serverless/API REST
  - **Dependencias verificadas:** Fases 1 ✅ · 2 ✅ · 3 ✅
  - **Acción:** Inicio de implementación de API Routes serverless

--- EJECUCIÓN ---
Ejecuta todas las tareas de la Fase 4 según el plan:
1. Crea la carpeta app/api/data/
2. Crea app/api/data/route.ts con la función GET asíncrona (código exacto de sección 6.1 del plan de infraestructura)
   - Implementa manejo de errores con try/catch
   - Usa NextResponse.json() para las respuestas
   - La respuesta exitosa debe ser: { success: true, data: SiteData }
   - La respuesta de error debe ser: { success: false, error: string } con HTTP 500
3. Actualiza next.config.ts agregando serverExternalPackages: ["fs", "path"] (sección 9.3 del plan)
4. Prueba el endpoint: GET http://localhost:3000/api/data
5. Documenta la respuesta JSON obtenida
6. Ejecuta npx tsc --noEmit para confirmar que no hay errores de tipos nuevos

Para cada archivo: muestra el contenido completo implementado.

--- VALIDACIÓN ---
Verifica los criterios de éxito de la Fase 4:
- [ ] GET /api/data retorna HTTP 200 con JSON válido
- [ ] El campo data.meta.title contiene 'Repositorio Indígena'
- [ ] La respuesta incluye el campo success: true
- [ ] npx tsc --noEmit continúa sin errores después de agregar la API Route
Documenta el resultado exacto de cada prueba, incluyendo el JSON de respuesta.

--- REGISTRO DE CIERRE ---
Actualiza ESTADO_EJECUCION.md al finalizar:
- Cambia el estado de la Fase 4 a "✅ Completada" o "❌ Bloqueada"
- Registra fecha y hora de fin
- Agrega entrada al Historial:
  ### ✅ [FECHA HORA] — Fase 4 completada
  - **Endpoint implementado:** GET /api/data
  - **Archivos creados/modificados:** [lista]
  - **Respuesta JSON obtenida:** [pega el JSON de respuesta de la prueba]
  - **Resultado tsc --noEmit:** sin errores / errores encontrados
  - **Observaciones:** [notas sobre el comportamiento en dev vs producción]

--- RESUMEN DE FASE ---
Crea el archivo RESUMEN_FASE_4_BACKEND.md con la siguiente estructura:
# Resumen Fase 4 — Backend / API Routes
## Objetivo cumplido
## Endpoints implementados
## Archivos creados/modificados
## Respuesta JSON del endpoint (ejemplo real)
## Manejo de errores implementado
## Configuración next.config.ts
## Consideraciones serverless (Vercel)
## Notas para la Fase 5

Actualiza en ESTADO_EJECUCION.md la tabla de archivos de resumen marcando RESUMEN_FASE_4_BACKEND.md como creado.
```

---

---

## 🚀 FASE 5 — Despliegue y Validación en Vercel

### 📄 Documentos de Referencia (leer antes de comenzar)

```
- PLAN_INFRAESTRUCTURA.md       → Sección 9 (Vercel config), Sección 10 (CI/CD), Sección 11 (Checklist)
- PLAN_IMPLEMENTACION_FASES.md  → Fase 5 completa (Despliegue, vercel.json, variables de entorno, checklists)
- ESTADO_EJECUCION.md           → Verificar que TODAS las fases anteriores estén ✅ Completadas
```

### 🎭 Rol / Skill

```
Actúa como un Ingeniero DevOps / Ingeniero Fullstack Senior con experiencia en despliegue en Vercel
y pipelines de CI/CD con GitHub Actions.
Tu especialidad es la validación end-to-end antes del despliegue: ejecutas el checklist completo
(typecheck + lint + build) sin excepciones, configuras las variables de entorno correctamente,
y verificas cada aspecto del sistema en producción después del despliegue.
Sabes que un despliegue exitoso no termina cuando el build es verde: termina cuando has confirmado
que el Home se ve correcto, el endpoint responde y el CI/CD está activo para futuros pushes.
Eres metódico, documentas cada paso y no asumes que algo funciona sin haberlo verificado.
```

### 📋 Prompt Completo

```
Lee completamente los siguientes documentos antes de ejecutar cualquier acción:
1. PLAN_INFRAESTRUCTURA.md (secciones 9, 10 y 11 completas — incluyendo vercel.json y scripts de package.json)
2. PLAN_IMPLEMENTACION_FASES.md (Fase 5 completa — ambos checklists: Pre-Despliegue y Despliegue)
3. ESTADO_EJECUCION.md (verifica que TODAS las fases 1, 2, 3 y 4 estén marcadas como ✅ Completadas)

Si CUALQUIER fase anterior NO está completada, detente y reporta el bloqueo. No ejecutes el despliegue.

--- REGISTRO DE INICIO ---
Actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 5 de "⬜ Pendiente" a "🔄 En progreso"
- Registra la fecha y hora de inicio
- Agrega entrada al Historial:
  ### 🔄 [FECHA HORA] — Fase 5 iniciada
  - **Rol activo:** Ingeniero DevOps / Fullstack Senior
  - **Dependencias verificadas:** Fases 1 ✅ · 2 ✅ · 3 ✅ · 4 ✅
  - **Acción:** Inicio de proceso de despliegue a producción en Vercel

--- CHECKLIST PRE-DESPLIEGUE ---
Antes de hacer push, ejecuta y documenta resultado de cada ítem:
1. [ ] Ejecuta `npm run validate` (typecheck + lint + build) → documenta resultado completo
2. [ ] Verifica que .env.local está en .gitignore y no fue commiteado
3. [ ] Crea/verifica vercel.json con la configuración exacta del plan (regions: ["gru1"])
4. [ ] Documenta las variables de entorno a configurar en Vercel Dashboard:
       - NODE_ENV = production (entorno: Production)
       - NEXT_PUBLIC_SITE_URL = https://repositorio-indigena.vercel.app (entorno: All)

--- EJECUCIÓN DEL DESPLIEGUE ---
5. Configura las variables de entorno en el Vercel Dashboard (Settings → Environment Variables)
6. Ejecuta `git push origin main` para disparar el pipeline de Vercel
7. Monitorea el build en el Vercel Dashboard — documenta cada etapa del pipeline
8. Cuando el build termine (verde ✓), documenta la URL pública asignada

--- VALIDACIÓN EN PRODUCCIÓN ---
9. Abre la URL pública: https://repositorio-indigena.vercel.app
   - [ ] El Home muestra "Hola Mundo" con el efecto fade-slide
   - [ ] La animación funciona correctamente en producción
   - [ ] El diseño es responsivo en mobile y desktop
10. Prueba el endpoint en producción:
    GET https://repositorio-indigena.vercel.app/api/data
    - [ ] Responde HTTP 200
    - [ ] Retorna JSON con success: true
    - [ ] El campo data.meta.title contiene 'Repositorio Indígena'
11. Verifica CI/CD: haz un pequeño cambio de prueba, push a main, confirma que Vercel inicia un nuevo build automáticamente

--- REGISTRO DE CIERRE ---
Actualiza ESTADO_EJECUCION.md al finalizar:
- Cambia el estado de la Fase 5 a "✅ Completada" o "❌ Bloqueada"
- Registra fecha y hora de fin
- Actualiza el campo "Fase actual" a "✅ Proyecto completado"
- Actualiza "Progreso total" a "5 / 5 fases completadas"
- Agrega entrada al Historial:
  ### ✅ [FECHA HORA] — Fase 5 completada · PROYECTO DESPLEGADO EN PRODUCCIÓN
  - **URL de producción:** [URL real de Vercel]
  - **Build time:** [tiempo que tomó el build]
  - **Resultado npm run validate:** sin errores
  - **Home en producción:** [confirmación visual]
  - **API /api/data en producción:** [respuesta JSON obtenida]
  - **CI/CD activo:** [confirmado / no confirmado]
  - **Observaciones finales:** [reflexiones sobre el despliegue]

--- RESUMEN DE FASE ---
Crea el archivo RESUMEN_FASE_5_DESPLIEGUE.md con la siguiente estructura:
# Resumen Fase 5 — Despliegue y Validación en Vercel
## Objetivo cumplido
## URL de producción
## Configuración vercel.json aplicada
## Variables de entorno configuradas
## Resultado del pipeline CI/CD
## Validaciones en producción (Home + API)
## Tiempo total del proyecto (desde Fase 1 a Fase 5)
## Decisiones de infraestructura tomadas
## Próximos pasos sugeridos (Vercel Blob, KV, etc.)

Actualiza en ESTADO_EJECUCION.md la tabla de archivos de resumen marcando RESUMEN_FASE_5_DESPLIEGUE.md como creado.

--- MENSAJE FINAL ---
Al completar esta fase, agrega al final de ESTADO_EJECUCION.md:
## 🎉 Proyecto Completado
- **URL de producción:** [URL]
- **Fecha de finalización:** [fecha]
- **Total de fases ejecutadas:** 5 / 5
- **Archivos de resumen generados:** RESUMEN_FASE_1 al 5
```

---

---

## 📎 Notas Generales del Sistema de Prompts

> **Sobre el rol:** El rol cambia entre fases para adaptar la perspectiva al trabajo a realizar:
> - Fases 1, 2, 4: **Ingeniero Fullstack/Backend Senior** — enfoque en arquitectura y código
> - Fase 3: **Diseñador UX/UI Senior** — enfoque en experiencia visual y animaciones
> - Fase 5: **Ingeniero DevOps** — enfoque en despliegue, validación y CI/CD

> **Sobre las dependencias:** Cada prompt verifica el estado de las fases anteriores. Si una dependencia no está cumplida, el prompt se detiene. Esto es intencional para garantizar la integridad del proceso.

> **Sobre los archivos de resumen:** Los archivos `RESUMEN_FASE_N_*.md` son independientes de `ESTADO_EJECUCION.md`. El estado tiene el historial cronológico completo; los resúmenes son documentos de referencia por fase, útiles para onboarding de nuevos colaboradores o auditorías del proyecto.

> **Sobre los timestamps:** Usa el formato `DD/MM/YYYY HH:MM` en todos los registros para consistencia.

---

*Prompts generados el 25 de marzo de 2026 · Sistema: `repositorio-indigena` → Vercel · 5 fases · 5 prompts*
