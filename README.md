# CNXPOS Utilities

Aplicación de reportes y utilidades de CNXPOS. El cliente está construido con Vue 3, TypeScript y Vite; usa Pinia para estado, Vue Router para navegación y Axios para comunicarse con la API. También incluye una aplicación Android empaquetada con Capacitor.

## Documentación

La guía de arquitectura y funcionamiento está en [docs/arquitectura.md](docs/arquitectura.md). Describe el arranque, los modos web y móvil, módulos, flujo de datos, servicios HTTP, configuración y puntos de atención para desarrollo.

## Inicio rápido

Requisitos: Node.js y Yarn (el repositorio incluye `yarn.lock`).

```bash
yarn install
yarn dev
```

El servidor de desarrollo ejecuta `vue-tsc -b` y luego Vite. Para generar la aplicación web:

```bash
yarn build
yarn preview
```

La selección de la variante móvil se hace con `VITE_TARGET=mobile`. Vite carga `.env.mobile` cuando se ejecuta con `--mode mobile`; por ejemplo:

```bash
yarn vue-tsc -b && yarn vite --mode mobile
yarn vue-tsc -b && yarn vite build --mode mobile
```

## Tecnologías principales

- Vue 3 con componentes `.vue` y `<script setup>`.
- TypeScript, Pinia y Vue Router 4.
- Axios, Chart.js / vue-chartjs y VueUse.
- Vite y Capacitor 8 para empaquetado Android.
