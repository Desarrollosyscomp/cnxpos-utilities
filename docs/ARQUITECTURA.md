# Arquitectura: cnxpos-utilities (front del web reporter)

`cnxpos-utilities` es la aplicación con la que los clientes de Conexión POS consultan sus informes: dashboard, ventas del día, ventas acumuladas, arqueos de caja, cartera e inventario. Funciona en el navegador y como app Android (Capacitor). Todos los datos vienen de la API `web-reporter-v2`, que autentica al usuario y consulta la base MySQL de su negocio.

| Aspecto | Valor |
| --- | --- |
| Framework | Vue 3 (`<script setup>` + TypeScript) sobre Vite 7 |
| Estado | Pinia; sesión y tema persistidos con `useStorage` (`@vueuse/core`) |
| Navegación | Vue Router 4; un router web y otro móvil según `VITE_TARGET` |
| HTTP | axios envuelto en `src/utils/http/http.ts` |
| Gráficas | Chart.js (`chart.js/auto`); vue-chartjs está instalado pero no se usa |
| Validación | Yup (formulario de login) |
| Alertas | Sistema propio `components/beauty-alert` (adaptadores vanilla y Vue) |
| Móvil | Capacitor 8 (`android/`, `webDir: dist`) |
| Backend | `web-reporter-v2` (puerto 3200 por defecto) |

La guía funcional previa (arranque, rutas web y móvil, endpoints, comandos y cómo añadir un reporte) está en [FUNCIONAMIENTO.md](FUNCIONAMIENTO.md); este documento la complementa con diagramas y observaciones.

## 1. Vista general

```mermaid
%% ==================== ARQUITECTURA DEL FRONT CNXPOS-UTILITIES ====================
%% Proyecto: cnxpos-utilities (Vue 3 + Vite + Pinia + Capacitor)
%% Capas: Página/Layout → Componentes → Store (Pinia) → Servicio → Cliente HTTP (axios) → web-reporter-v2

flowchart TB

    USER(["Usuario del cliente<br/>navegador o app Android"])

    subgraph FRONT["cnxpos-utilities (Vite)"]
        direction TB

        subgraph BOOT["1. Arranque"]
            MAIN["main.ts<br/>estilos globales, Pinia<br/>router según VITE_TARGET"]
            APP["App.vue<br/>router-view, splash y pantalla de carga"]
        end

        subgraph NAV["2. Navegación"]
            RWEB["router/index.ts (web)<br/>auth, home, perfil, reportes, inventario<br/>guard: meta.requiresAuth + token"]
            RMOB["router/index.mobile.ts (VITE_TARGET=mobile)<br/>reportes, inventario y perfil<br/>sin validación de sesión"]
            LAY["Layouts<br/>WebReporterLayout, InventoryLayout,<br/>LayoutOne (home y perfil)<br/>escritorio o móvil según 768 px"]
        end

        subgraph VIEWS["3. Módulos (páginas y componentes)"]
            V_AUTH["modules/auth<br/>login + recuperación (solo interfaz)"]
            V_HOME["modules/home y profile<br/>accesos y perfil (maqueta)"]
            V_WR["apps/web-reporter<br/>dashboard, ventas del día, ventas acumuladas,<br/>arqueos, cartera"]
            V_INV["apps/inventory<br/>report-inventory"]
            V_SHARED["components/<br/>Paginator, Modal, RadioLabels,<br/>menús, beauty-alert"]
        end

        subgraph STATE["4. Estado (Pinia)"]
            S_AUTH["auth<br/>token e isLogged en localStorage 'auth'"]
            S_APP["app<br/>carga, tema en localStorage 'theme',<br/>almacenes"]
            S_REP["stores de reportes<br/>página, límite y totales"]
        end

        subgraph DATA["5. Acceso a la API"]
            SVC["*/services/*.ts<br/>URL + params + Authorization: Bearer"]
            URL["utils/http/get-api-url.ts<br/>DEV: VITE_NEST_API_URL<br/>PROD: VITE_QA_API_URL"]
            HTTP["utils/http/http.ts<br/>axios; errores → { status, data }"]
        end
    end

    API["web-reporter-v2<br/>POST /login/auth, GET /warehouses,<br/>GET /reports/*"]
    STORAGE[("localStorage<br/>auth, theme")]
    ANDROID["android/ (Capacitor)<br/>empaqueta dist/"]

    %% ==================== RELACIONES ====================
    USER --> MAIN --> APP
    MAIN --> RWEB & RMOB
    RWEB & RMOB --> LAY --> V_AUTH & V_HOME & V_WR & V_INV
    V_WR & V_INV --> V_SHARED
    V_AUTH --> S_AUTH
    V_WR & V_INV --> S_REP
    V_WR & V_INV --> S_APP
    S_AUTH & S_APP & S_REP --> SVC
    SVC --> URL
    SVC --> HTTP --> API
    S_AUTH & S_APP <--> STORAGE
    RWEB -.->|"lee el token"| S_AUTH
    FRONT -.->|"vite build"| ANDROID
```

Fuente del diagrama: [arquitectura.mmd](arquitectura.mmd).

## 2. Capas y responsabilidades

| Capa | Ubicación | Responsabilidad |
| --- | --- | --- |
| Arranque | `src/main.ts`, `src/App.vue` | Estilos globales, Pinia, elección del router por `VITE_TARGET`, splash y pantalla de carga. |
| Navegación | `src/router/`, `*/router/*.ts` | Catálogo de rutas web y móvil. El guard web exige token solo en rutas con `meta.requiresAuth`. |
| Layouts | `src/layouts/`, `apps/*/layouts/` | Marco de cada aplicación (encabezado, menú, tema, cierre de sesión). Escritorio o móvil según 768 px. |
| Páginas | `*/pages/`, `*/page/` | Eligen el componente de escritorio o móvil del módulo. |
| Componentes | `*/components/desktop`, `*/components/mobile`, `src/components/` | Filtros, tablas, tarjetas, modales y gráficas. |
| Stores | `*/store/*.ts`, `src/store/app.store.ts` | Paginación y filtros; llaman al servicio y devuelven `IStoreResponse { error, data }`. |
| Servicios | `*/services/*.ts`, `src/services/app.services.ts` | Arman la URL, los `params` y el encabezado `Authorization: Bearer`. |
| Cliente HTTP | `src/utils/http/` | axios; los errores se devuelven como `{ status, data }` en lugar de lanzarse. |

## 3. Configuración de la API y sesión

- `getApiUrl()` usa `VITE_NEST_API_URL` en desarrollo y `VITE_QA_API_URL` en un build de producción. Las variables `VITE_*` quedan dentro del bundle: no deben contener secretos.
- `VITE_TARGET=mobile` (archivo `.env.mobile`, `vite --mode mobile`) activa `router/index.mobile.ts`.
- `authStore` guarda `{ token, isLogged }` en `localStorage` bajo la clave `auth`. "Salir" solo vacía ese objeto: el token no se revoca en la API ni se revisa su vencimiento en el front.
- Los servicios de reportes leen `useAuthStore()` al importarse el archivo; `AppService.getWarehouses()` lo lee en cada llamada.

## 4. Flujo de datos

```mermaid
%% ==================== FLUJO DE DATOS DEL FRONT CNXPOS-UTILITIES ====================
%% Proyecto: cnxpos-utilities
%% Tres recorridos representativos:
%% 1) inicio de sesión, 2) petición autenticada (almacenes) resuelta por la API con el tenant y MySQL,
%% 3) un reporte: ventas del día con facturas y detalle.

sequenceDiagram
    autonumber
    actor U as Usuario
    participant V as Vista (componente)
    participant R as Router (guard)
    participant S as Store (Pinia)
    participant SV as Servicio + Http
    participant LS as localStorage
    participant A as web-reporter-v2
    participant DB as PostgreSQL y MySQL del cliente

    %% -------------------- 1. INICIO DE SESIÓN --------------------
    rect rgba(120, 160, 220, 0.12)
    Note over U,A: 1. /auth/login (Login.vue)
    U->>V: usuario y contraseña
    V->>V: validación con Yup
    V->>S: authStore.login(form)
    S->>SV: loginService.logIn
    SV->>A: POST /login/auth
    A->>DB: conxpos_utilities_auth (PostgreSQL)
    alt credenciales válidas
        A-->>SV: 200 { response: { token } }
        S->>LS: auth = { token, isLogged: true }
        V->>R: router.push('/home/welcome')
    else credenciales inválidas
        A-->>SV: 500 { response: { message } }
        SV-->>S: { status, data } (Http no lanza la excepción)
        S-->>V: { error: true, data: mensaje }
        V->>U: alerta temporizada con el mensaje
    end
    end

    %% -------------------- 2. PETICIÓN AUTENTICADA --------------------
    rect rgba(120, 200, 140, 0.12)
    Note over U,DB: 2. Carga de almacenes al abrir un reporte
    U->>R: navega a /web-report-v2/range-sales
    R->>LS: lee auth.token (solo si la ruta tiene meta.requiresAuth)
    R->>V: monta la página dentro de WebReporterLayout
    V->>S: appStore.getWarehouses()
    S->>SV: AppService.getWarehouses
    SV->>A: GET /warehouses + Authorization: Bearer token
    A->>A: middleware: verifica el JWT y obtiene client_id
    A->>DB: credenciales del tenant (PostgreSQL) y SELECT almacenes (MySQL)
    DB-->>A: almacenes activos
    A-->>SV: 200 { response: { warehouses } }
    S-->>V: { error: false, data: warehouses }
    V->>U: opciones del filtro de almacén
    end

    %% -------------------- 3. REPORTE: VENTAS DEL DÍA --------------------
    rect rgba(230, 170, 90, 0.12)
    Note over U,DB: 3. /web-report-v2/daily-sales (DesktopDailySalesMain)
    U->>V: elige la fecha
    V->>S: dailySalesStore.dailySales(YYYYMMDD)
    S->>SV: GET /reports/sales-day?init_date
    SV->>A: petición con token
    A->>DB: facturas, devoluciones y costos del día (MySQL)
    alt hay ventas
        A-->>S: 200 { sales, summary }
        S-->>V: tabla por almacén y resumen
    else sin ventas
        A-->>S: 404
        S-->>V: { error: true } y mensaje del asistente
    end
    U->>V: abre un almacén
    V->>S: dailyInvoices(fecha, almacén) con page y limit
    S->>SV: GET /reports/sales-day/:date/:warehouse_id
    SV-->>S: { list, count, totalPages, summary }
    U->>V: elige una factura
    V->>S: dailyInvoiceDetails(almacén, factura)
    S->>SV: GET /reports/invoice-detail/:warehouse_id/:invoice_id
    SV-->>S: { invoice, summary }
    S-->>V: productos y medios de pago
    end
```

Fuente del diagrama: [flujo-datos.mmd](flujo-datos.mmd).

## 5. Estructura del proyecto

```mermaid
%% ==================== ESTRUCTURA DEL PROYECTO ====================
%% Proyecto: cnxpos-utilities
%% Carpetas principales y su responsabilidad. Cada módulo de reportes repite el patrón:
%% router → page(s) → components (desktop / mobile) → store → services → interfaces

flowchart LR
    ROOT["cnxpos-utilities/"]

    %% ==================== RAÍZ ====================
    ROOT --> SRC["src/<br/>código de la aplicación"]
    ROOT --> AND["android/<br/>proyecto nativo de Capacitor"]
    ROOT --> PUB["public/<br/>archivos estáticos"]
    ROOT --> DOCS["docs/<br/>documentación y diagramas"]
    ROOT --> CFG["index.html, vite.config.ts,<br/>capacitor.config.ts, tsconfig*.json,<br/>.env, .env.mobile"]

    %% ==================== SRC ====================
    SRC --> BOOT["main.ts, App.vue"]
    SRC --> ROUTER["router/<br/>index.ts (web), index.mobile.ts"]
    SRC --> MODS["modules/<br/>auth, home, profile, pages"]
    SRC --> APPS["apps/"]
    SRC --> COMP["components/<br/>Paginator, Modal, menús,<br/>radio-label, beauty-alert"]
    SRC --> LAY["layouts/<br/>DesktopLayout, MobileLayout, LayoutOne"]
    SRC --> STORE["store/ y services/<br/>app.store (tema, carga, almacenes),<br/>app.services (GET /warehouses)"]
    SRC --> UTILS["utils/<br/>http (axios, URL de API),<br/>parsers, faker, tema"]
    SRC --> MISC["interfaces/, styles/, assets/,<br/>responsive-switcher/"]

    %% ==================== APPS ====================
    APPS --> WR["web-reporter/<br/>router, layouts, components"]
    APPS --> INVA["inventory/<br/>layouts, components,<br/>modules/report-inventory"]
    WR --> WRM["modules/<br/>dashboard, daily-sales, sales-by-range,<br/>cash-counts, accounts-payable-receivable"]

    %% ==================== PATRÓN DE MÓDULO ====================
    WRM --> P_ROUTER["router/<br/>ruta web y ruta móvil"]
    WRM --> P_PAGE["pages/ o page/<br/>elige escritorio o móvil"]
    WRM --> P_COMP["components/<br/>desktop/ y mobile/"]
    WRM --> P_STORE["store/<br/>filtros, paginación, { error, data }"]
    WRM --> P_SVC["services/<br/>endpoint + Bearer token"]
    WRM --> P_INT["interfaces/<br/>tipos de la respuesta"]
```

Fuente del diagrama: [estructura.mmd](estructura.mmd).

## 6. Observaciones técnicas

Problemas detectados en las pruebas funcionales del 2026-10-09 (este front + `web-reporter-v2`) y al revisar el código. No se corrigieron en esta documentación; el informe completo está en `Syscomp-docs/Documentacion markdown/Pagina web/web-reporter-status.md`.

| Tema | Detalle |
| --- | --- |
| Cifras de ventas inconsistentes | Para el mismo día y almacén, ventas por día y ventas acumuladas muestran productos y costo distintos. El origen está en las consultas de la API. |
| Utilidad | Ventas por día calcula la utilidad sobre el total con IVA; ventas acumuladas no resta las devoluciones. |
| Login | Con credenciales inválidas la API responde 500 y con mensajes distintos para usuario inexistente y contraseña incorrecta, lo que permite enumerar usuarios. El front muestra ese mensaje tal cual. |
| Sesión sin vencimiento | La API verifica el JWT con `ignoreExpiration` y el front no revisa `exp`; "Salir" solo borra el token del navegador. |
| Retenciones | La API no devuelve la retención: en el detalle de factura el total no cuadra con el pago. |
| Perfil y recuperación | "Guardar contraseña" del perfil no tiene acción y las pantallas de "olvidé mi contraseña" no llaman a ninguna API. |
| Validación de filtros | No se valida el formato de fecha ni que la fecha inicial sea menor o igual a la final, y la API no limita `limit`. En ventas acumuladas el botón Buscar se deshabilita sin explicar por qué. |
| Servicios muertos | `modules/home/services/Home.services.ts` y `modules/profile/services/Profile.services.ts` llaman a `/auth/login`, ruta inexistente en la API (la real es `/login/auth`). |
| Rutas sin protección | Solo dashboard y ventas del día declaran `meta.requiresAuth`; ventas acumuladas, arqueos, cartera, inventario y perfil se pueden abrir sin token (la API responde 401). El router móvil no valida sesión. |
| Router móvil | No registra login ni home; `registers` apunta al componente de ventas acumuladas y `range-sales` al de escritorio. |
| Estado entre vistas | Escritorio y móvil no comparten filtros ni resultados: al cambiar el ancho de la ventana se pierden. |
| Archivos con nombres parecidos | `ARQUITECTURA.md` y el antiguo `arquitectura.md` chocaban en sistemas de archivos que no distinguen mayúsculas; por eso la guía previa se movió a `FUNCIONAMIENTO.md`. |

## 7. Documentos relacionados

- [MODULOS.md](MODULOS.md): rutas, vistas, stores y endpoints de cada módulo.
- [FUNCIONAMIENTO.md](FUNCIONAMIENTO.md): guía funcional, comandos y cómo añadir un reporte.
- [README.md](README.md): índice de la carpeta y estilo de comentarios del código.
- API consumida: `web-reporter-v2/docs/`.
