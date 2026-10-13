# Documentación: cnxpos-utilities

Índice de la documentación del front del web reporter de Conexión POS (web y Android).

| Documento | Contenido |
| --- | --- |
| [ARQUITECTURA.md](ARQUITECTURA.md) | Capas, configuración de la API, sesión, flujo de datos, estructura y observaciones técnicas. |
| [MODULOS.md](MODULOS.md) | Rutas, vistas, stores y endpoints de cada módulo, y diferencias del router móvil. |
| [FUNCIONAMIENTO.md](FUNCIONAMIENTO.md) | Guía funcional previa: arranque, rutas web y móvil, endpoints, comandos y cómo añadir un reporte (antes `arquitectura.md`). |

## Diagramas (Mermaid)

Los archivos `.mmd` son la fuente de los diagramas; los `.md` los incluyen en bloques `mermaid` para leerlos directamente en GitHub, GitLab o VS Code.

| Archivo | Tipo | Muestra |
| --- | --- | --- |
| [arquitectura.mmd](arquitectura.mmd) | flowchart | Capas del front y su relación con la API, `localStorage` y Android. |
| [flujo-datos.mmd](flujo-datos.mmd) | sequenceDiagram | Login, petición autenticada (almacenes) y el reporte de ventas del día con facturas y detalle. |
| [funciones.mmd](funciones.mmd) | flowchart | Cada ruta con su acción de store y su endpoint. |
| [estructura.mmd](estructura.mmd) | flowchart | Carpetas del proyecto y patrón de cada módulo de reportes. |

Si se modifica un `.mmd`, hay que actualizar el bloque equivalente en los `.md` que lo incluyen.

## Ejecutar en local

1. Crear `.env` en la raíz del proyecto con la URL de la API (`web-reporter-v2`, puerto 3200 por defecto):

   ```
   VITE_NEST_API_URL='http://localhost:3200'
   VITE_QA_API_URL='http://localhost:3200'
   ```

2. Instalar dependencias y arrancar:

   ```bash
   npm install
   ```

   ```bash
   npx vite
   ```

   `npm run dev` ejecuta además `vue-tsc -b` antes de levantar Vite. Para la variante móvil: `npx vite --mode mobile` (carga `.env.mobile`, `VITE_TARGET=mobile`).

3. Abrir la URL que indique Vite (por ejemplo `/auth/login`) con la API en marcha.

## Comentarios en el código

Cada archivo de `src/` (salvo `assets/` y hojas de estilo) y los archivos de configuración `vite.config.ts` y `capacitor.config.ts` empiezan con una cabecera que resume su propósito. En los `.vue` la cabecera está dentro del bloque `<script>`; los componentes sin script la llevan como comentario HTML al inicio:

```ts
// ==================== STORE: ventas del día ====================
// Resumen por almacén, facturas paginadas de un almacén y detalle de una factura.
```

```html
<!-- ==================== COMPONENTE: LoadingScreen ==================== -->
<!-- Capa 'Cargando...' que se muestra con appStore.showLoadingScreen. -->
```

Las funciones, acciones de store y llamadas a la API llevan una línea descriptiva encima:

```ts
// -------------------- GET /reports/sales-day?init_date=YYYYMMDD --------------------
```

Los comentarios no modifican el código: solo se agregaron líneas de comentario.

## Proyecto relacionado

La API que consume este front es `web-reporter-v2`; su documentación está en `web-reporter-v2/docs/`.
