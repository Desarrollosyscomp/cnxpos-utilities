# Arquitectura y funcionamiento

## Qué contiene

CNXPOS Utilities es una aplicación cliente para consultar información de ventas, inventario, cajas, cartera y paneles de resumen. La interfaz usa Vue 3 y TypeScript; Pinia conserva el estado de sesión y de los módulos; Vue Router resuelve las pantallas; los servicios llaman a una API HTTP. `android/` contiene el proyecto nativo generado/integrado con Capacitor.

## Arranque de la aplicación

1. `index.html` sirve de documento raíz de Vite.
2. `src/main.ts` crea la aplicación Vue, importa estilos globales y registra Pinia.
3. `src/main.ts` evalúa `import.meta.env.VITE_TARGET`. Si vale `mobile`, importa `src/router/index.mobile.ts`; en otro caso importa `src/router/index.ts`.
4. El router se instala y la aplicación se monta en `#app`.

La resolución de rutas y componentes se hace en gran parte mediante importaciones dinámicas, de modo que cada ruta carga su pantalla cuando se necesita. El `vite.config.ts` actual solo registra el plugin de Vue; la configuración de API se toma de variables de entorno.

## Estructura del código

```text
src/
  main.ts, App.vue             Entrada y composición raíz
  router/                      Catálogos de rutas web y móvil
  modules/                     Funcionalidades generales: auth, home y profile
  apps/web-reporter/            Reportes y dashboard
  apps/inventory/               Reporte de inventario
  components/                   Componentes reutilizables y alertas
  layouts/                      Estructuras comunes de pantalla
  services/                     Servicios compartidos (por ejemplo, almacenes)
  store/                        Estado general (tema y pantallas de carga)
  utils/http/                   Cliente Axios, URL de API y utilidades HTTP
  utils/parsers/                Conversión de fechas y moneda
  interfaces/                   Contratos compartidos de respuestas
  styles/, assets/              Estilos, iconos, imágenes y fuentes
android/                        Proyecto Android de Capacitor
```

Los módulos de reportes suelen seguir una misma división:

- `router/`: asocia una URL con un layout y una página.
- `pages/` o `page/`: compone la pantalla de escritorio o móvil.
- `components/`: presenta tablas, filtros, gráficos y contenido.
- `store/`: mantiene estado de interfaz, llama al servicio y adapta la respuesta.
- `services/`: define URL, parámetros y cabeceras de la API.
- `interfaces/`: describe los datos esperados por el módulo.

## Navegación y variantes

El router web (`src/router/index.ts`) reúne rutas de autenticación, inicio, perfil, Web Reporter e inventario. La ruta `/` redirige al login. El guard también redirige a `/auth/login` si una ruta tiene `meta.requiresAuth` y no hay token guardado.

El router móvil (`src/router/index.mobile.ts`) registra rutas móviles de reportes e inventario y redirige `/` a `/home/welcome`. En el código actual no incorpora las rutas de auth ni home que están comentadas. Hay rutas móviles que reutilizan layouts y componentes distintos a sus equivalentes web; consultar sus archivos `router/*mobile*.ts` antes de asumir que solo cambia el diseño.

Rutas principales definidas en los routers:

| Funcionalidad | Ruta web | Ruta móvil |
| --- | --- | --- |
| Inicio de sesión | `/auth/login` | No se registra en el router móvil actual |
| Inicio | `/home/welcome` | Se intenta redirigir aquí desde `/`, pero `HomeRouter` móvil no está incluido |
| Dashboard | `/web-report-v2/dashboard` | `/web-report-v2/dashboard` |
| Ventas del día | `/web-report-v2/daily-sales` | `/daily-sales/daily-sales` |
| Ventas por rango | `/web-report-v2/range-sales` | `/web-report-v2/range-sales` |
| Conteos de caja | `/web-report-v2/registers` | `/web-report-v2/registers` |
| Cuentas por cobrar/pagar | `/web-report-v2/accounts-payable-receivable` | Igual que web |
| Inventario | `/inventory/report-inventory` | `/inventory/report-inventory` |

El registro real de vistas está en `src/router/` y en los routers de cada módulo. Algunas rutas comparten prefijos o componentes; esa tabla es una orientación, no reemplaza el catálogo de rutas.

## Flujo de datos

Una pantalla llama a una acción de Pinia. La acción llama al servicio de su módulo; el servicio usa `Http` (`src/utils/http/http.ts`) y `getApiUrl()` para formar la llamada Axios. Los reportes agregan `Authorization: Bearer <token>` y pasan filtros/paginación como parámetros. La respuesta vuelve al store, que normalmente la expone dentro del contrato `IStoreResponse` (`error` y `data`), y el componente la presenta.

```text
Componente / página
        ↓ acción
Store Pinia (estado, paginación, adaptación)
        ↓ método
Servicio (endpoint, query params, Bearer token)
        ↓
Http / Axios → API
```

`src/modules/auth/store/auth.store.ts` mantiene `auth` en almacenamiento persistente mediante VueUse `useStorage` y la clave local `auth`. El login usa `POST /login/auth`; al recibir estado 200 guarda el token y marca la sesión como iniciada. `src/services/app.services.ts` consulta `/warehouses`. Los stores de reportes mantienen parámetros como página, límite, búsqueda y totales; por ejemplo, ventas diarias carga resumen, facturas por almacén y detalle de factura.

El cliente `Http` ofrece `get`, `post`, `patch`, `put` y `delete`, y serializa queries con `buildQueryString`. Cuando Axios lanza una excepción devuelve un objeto con `status` y `data`; las notificaciones HTTP están comentadas actualmente. Por ello, cada acción debe revisar cómo trata respuestas no exitosas: varios stores las verifican, otros asumen estructura de éxito.

## Módulos funcionales

- **Auth** (`src/modules/auth`): login y pantallas del flujo de recuperación de contraseña/código. El servicio de login llama a `/login/auth`.
- **Home y perfil** (`src/modules/home`, `src/modules/profile`): pantallas generales y datos del perfil.
- **Web Reporter** (`src/apps/web-reporter`): dashboard, ventas diarias, ventas por rango, conteos de caja y cartera por cobrar/pagar. Sus páginas/componentes separan vistas de escritorio y móvil.
- **Inventario** (`src/apps/inventory/modules/report-inventory`): consulta paginada y búsqueda por almacén.
- **Componentes compartidos** (`src/components`): navegación, modal, paginador, carga, mensajes y sistema `beauty-alert`.

Endpoints observados en los servicios:

| Uso | Método y endpoint | Parámetros principales |
| --- | --- | --- |
| Login | `POST /login/auth` | Cuerpo con datos de acceso |
| Almacenes | `GET /warehouses` | Bearer token |
| Resumen de ventas del día | `GET /reports/sales-day` | `init_date` |
| Facturas del día | `GET /reports/sales-day/:date/:warehouse_id` | `page`, `limit` |
| Detalle de factura | `GET /reports/invoice-detail/:warehouse_id/:invoice_id` | Segmentos de ruta |
| Ventas acumuladas | `GET /reports/cumulative-sales` | `warehouse_id`, `page`, `limit`, fechas |
| Conteos de caja | `GET /reports/cash-counts` | `date`, `warehouse_id` |
| Cuentas por pagar | `GET /reports/payable-portfolio` | `warehouse_id`, paginación, fechas |
| Cuentas por cobrar | `GET /reports/receivable-portfolio` | `warehouse_id`, paginación, fechas |
| Dashboard | `GET /reports/dashboard/summary` | Fechas |
| Inventario | `GET /reports/inventory` | `warehouse_id`, paginación, `search` |

Los endpoints pertenecen a una API externa al repositorio; los tipos locales y los servicios son la referencia del formato que consume el cliente.

## Configuración y comandos

Scripts definidos en `package.json`:

| Comando | Acción |
| --- | --- |
| `yarn dev` | Ejecuta `vue-tsc -b` y abre Vite en modo estándar |
| `yarn build` | Revisa tipos con `vue-tsc -b` y genera `dist/` |
| `yarn preview` | Sirve localmente el build de Vite |

El repositorio contiene `.env.mobile`, que selecciona `VITE_TARGET=mobile` y define las URL de API para ese entorno. Vite solo carga ese archivo si se inicia con `--mode mobile`. `getApiUrl()` selecciona `VITE_NEST_API_URL` cuando `import.meta.env.PROD` es falso y `VITE_QA_API_URL` en build de producción. Para configurar otros entornos, crear los archivos `.env` correspondientes con esas variables; no poner secretos en variables `VITE_*`, ya que se incorporan al cliente.

Comandos móviles equivalentes (no hay scripts móviles dedicados declarados actualmente):

```bash
yarn vue-tsc -b && yarn vite --mode mobile
yarn vue-tsc -b && yarn vite build --mode mobile
```

`capacitor.config.ts` configura `webDir: "dist"` y el identificador `com.example.app`. El flujo habitual es generar el build web/móvil y sincronizar o abrir el proyecto Android con Capacitor. Las dependencias y configuración nativa están en `android/`.

## Cómo añadir un reporte

1. Crear el módulo en `src/apps/web-reporter/modules/<nombre>/` con `router`, página, componentes, `store`, `services` e interfaces según haga falta.
2. Implementar el servicio con `getApiUrl()` y `Http`, incluyendo token y parámetros requeridos por la API.
3. Crear la acción Pinia que llama al servicio, mantiene estado de filtros/paginación y transforma la respuesta al contrato consumido por la vista.
4. Crear la página y los componentes de escritorio/móvil que correspondan.
5. Exportar/incluir la ruta en `src/router/index.ts` y, si debe estar disponible en móvil, también en `src/router/index.mobile.ts`.
6. Agregar aquí el endpoint y la ruta si amplían el catálogo.

## Detalles a tener presentes

- `requiresAuth` solo protege las rutas que declaran ese metadato. Varias rutas del router móvil no lo declaran y el guard móvil no valida sesión.
- Las rutas de login y home no están conectadas al router móvil en su configuración actual, aunque haya routers móviles para esas áreas.
- En servicios de algunos módulos, `useAuthStore()` se evalúa al importar el archivo del servicio. Si se reorganiza la inicialización de Pinia, conviene mover esa lectura dentro de cada llamada, como hace `AppService.getWarehouses()`.
- `Http` convierte los errores de Axios en valores de retorno, en lugar de volver a lanzar la excepción; quien llama debe distinguirlos de respuestas exitosas.
- Algunas rutas móviles actualmente apuntan a componentes con nombres/funciones de otro módulo. Verificar el mapeo antes de cambiar o documentar el comportamiento de UI.
- El router web redirige la raíz a login incondicionalmente; la segunda condición sobre `/` no llega a ejecutarse porque la primera ya retorna.

## Archivos de referencia

- Entrada y selección de router: `src/main.ts`.
- Rutas web/móvil: `src/router/index.ts`, `src/router/index.mobile.ts`.
- Estado de sesión: `src/modules/auth/store/auth.store.ts`.
- Selección de API: `src/utils/http/get-api-url.ts`.
- Cliente HTTP: `src/utils/http/http.ts`.
- Estado global: `src/store/app.store.ts`.
- Reportes: `src/apps/web-reporter/modules/`.
- Inventario: `src/apps/inventory/modules/report-inventory/`.
