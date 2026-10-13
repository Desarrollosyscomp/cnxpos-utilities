# Módulos de cnxpos-utilities

Detalle de cada módulo: rutas, vistas, store y endpoints de `web-reporter-v2` que utiliza. Los reportes tienen versión de escritorio y móvil; la página del módulo elige una u otra según el ancho de la ventana (768 px) o por CSS (`hide-on-mobile` / `hide-on-desktop`).

## Mapa de funciones

```mermaid
%% ==================== MAPA DE FUNCIONES DEL FRONT CNXPOS-UTILITIES ====================
%% Proyecto: cnxpos-utilities
%% Para cada ruta: vista → acción del store → endpoint de web-reporter-v2 que se invoca.

flowchart TB

    %% ==================== AUTH ====================
    subgraph AUTH["Autenticación (/auth)"]
        direction LR
        R_LOGIN["/auth/login<br/>Login.vue"] --> A_LOGIN["authStore.login"] --> E_LOGIN["POST /login/auth"]
        R_REC["/auth/forgot-password, check-email,<br/>enter-code, reset-password, process-finished"] --> A_REC["sin store"] --> E_REC["sin llamada a la API"]
        A_LOGOUT["logout() en los layouts"] --> E_LOGOUT["borra auth en localStorage<br/>y va a /auth/login"]
    end

    %% ==================== HOME Y PERFIL ====================
    subgraph HOME["Inicio y perfil"]
        direction LR
        R_HOME["/home/welcome<br/>DesktopHome / MobileHome"] --> H_NAV["accesos a dashboard e inventario"]
        R_PROF["/account/profile<br/>DesktopProfile / MobileProfile"] --> P_NONE["maqueta: guardar contraseña sin acción"]
    end

    %% ==================== DASHBOARD Y VENTAS ====================
    subgraph SALES["Web reporter: dashboard y ventas"]
        direction LR
        R_DASH["/web-report-v2/dashboard<br/>DesktopDashboard"] --> S_DASH["dashboardStore.getDashboardSummary"] --> E_DASH["GET /reports/dashboard/summary"]
        R_DAY["/web-report-v2/daily-sales<br/>DesktopDailySalesMain"] --> S_DAY["dailySalesStore.dailySales"] --> E_DAY["GET /reports/sales-day"]
        R_DAY --> S_INV["dailyInvoices"] --> E_INV["GET /reports/sales-day/:date/:warehouse_id"]
        R_DAY --> S_DET["dailyInvoiceDetails"] --> E_DET["GET /reports/invoice-detail/:warehouse_id/:invoice_id"]
        R_RANGE["/web-report-v2/range-sales<br/>DesktopRangeSalesMain"] --> S_RANGE["rangeSalesStore.rangeSales"] --> E_RANGE["GET /reports/cumulative-sales"]
    end

    %% ==================== CAJA Y CARTERA ====================
    subgraph CASH["Web reporter: arqueos y cartera"]
        direction LR
        R_REG["/web-report-v2/registers<br/>DesktopCashCounts"] --> S_REG["cashCountsStore.cashCounts"] --> E_REG["GET /reports/cash-counts"]
        R_ACC["/web-report-v2/accounts-payable-receivable<br/>DesktopAccountsPayableReceivableMain"] --> S_PAY["accountsPayable"] --> E_PAY["GET /reports/payable-portfolio"]
        R_ACC --> S_REC["accountsReceivable"] --> E_REC2["GET /reports/receivable-portfolio"]
    end

    %% ==================== INVENTARIO ====================
    subgraph INV["Inventario"]
        direction LR
        R_INV["/inventory/report-inventory<br/>ReportInventoryDesktopMain"] --> S_INV2["reportInventoryStore.reportInventory"] --> E_INV2["GET /reports/inventory"]
    end

    %% ==================== COMPARTIDO ====================
    subgraph SHARED["Compartido por los reportes"]
        direction LR
        C_WH["filtro de almacén<br/>(range-sales, registers, cartera, inventario)"] --> S_WH["appStore.getWarehouses"] --> E_WH["GET /warehouses"]
    end

    %% Enlaces invisibles: apilan los grupos en vertical
    AUTH ~~~ HOME ~~~ SALES ~~~ CASH ~~~ INV ~~~ SHARED
```

Fuente del diagrama: [funciones.mmd](funciones.mmd).

## Autenticación (`src/modules/auth`)

| Ruta | Vista | Store / acción | Endpoint |
| --- | --- | --- | --- |
| `/auth/login` | `forms/Login.vue` dentro de `AuthPage` | `authStore.login` | `POST /login/auth` |
| `/auth/forgot-password` | `forms/ForgotPasswordForm.vue` | — | Ninguno (solo interfaz) |
| `/auth/check-email`, `/auth/enter-code`, `/auth/reset-password`, `/auth/process-finished` | `forms/*.vue` | — | Ninguno (solo interfaz) |

- El login valida los campos con Yup, guarda el token en `localStorage` (`auth`) y navega a `/home/welcome`. Si la API responde con error muestra su mensaje en una alerta temporizada (`beauty-alert`, adaptador `timer`).
- Cada ruta define en `meta.headerComponent` el mensaje del asistente "Beto" (`components/beto-messages/`).
- El cierre de sesión está en los layouts (`logout()`): vacía `auth` y navega a `/auth/login`.

## Inicio y perfil (`src/modules/home`, `src/modules/profile`)

| Ruta | Vista | Comportamiento |
| --- | --- | --- |
| `/home/welcome` | `HomePage` → `DesktopHome` / `MobileHome` | Accesos al dashboard del web reporter y al inventario. |
| `/account/profile` | `ProfilePage` → `DesktopProfile` / `MobileProfile` | Maqueta: elección de avatar y cambio de contraseña sin acción. |

`Home.services.ts` y `Profile.services.ts` definen `logIn` contra `/auth/login`, ruta que no existe en la API; no se usan. Sus stores están vacíos.

## Web reporter (`src/apps/web-reporter`)

Las rutas cuelgan de `/web-report-v2` y se muestran dentro de `WebReporterLayout` (menú con `MenuOptions`: ventas acumuladas, ventas del día, dashboard, arqueos y cartera).

| Módulo | Ruta | Componente principal | Store / acción | Endpoint |
| --- | --- | --- | --- | --- |
| dashboard | `/web-report-v2/dashboard` | `DesktopDashboard` / `MobileDashboard` | `dashboardStore.getDashboardSummary` | `GET /reports/dashboard/summary` |
| daily-sales | `/web-report-v2/daily-sales` | `DesktopDailySalesMain` / `MobileDailySalesMain` | `dailySalesStore.dailySales` | `GET /reports/sales-day?init_date` |
| daily-sales | modal de facturas o `/web-report-v2/invoices/:date/:warehouse_id` | `DesktopDailySalesMain` / `InvoicesMain` | `dailySalesStore.dailyInvoices` | `GET /reports/sales-day/:date/:warehouse_id` |
| daily-sales | detalle o `/web-report-v2/invoice-details/:warehouse_id/:invoice_id` | `DesktopDailySalesMain` / `InvoicesDetails` | `dailySalesStore.dailyInvoiceDetails` | `GET /reports/invoice-detail/:warehouse_id/:invoice_id` |
| sales-by-range | `/web-report-v2/range-sales` | `DesktopRangeSalesMain` / `MobileRangeSalesMain` | `rangeSalesStore.rangeSales` | `GET /reports/cumulative-sales` |
| cash-counts | `/web-report-v2/registers` | `DesktopCashCounts` / `MobileCashCounts` | `cashCountsStore.cashCounts` | `GET /reports/cash-counts` |
| accounts-payable-receivable | `/web-report-v2/accounts-payable-receivable` | `DesktopAccountsPayableReceivableMain` / `MobileAccountsPayableReceivable` | `accountsPayable` / `accountsReceivable` | `GET /reports/payable-portfolio` / `GET /reports/receivable-portfolio` |

Detalles por módulo:

- **dashboard**: envía la fecha de hoy como `init_date`/`end_date`, pero la API calcula sus propios rangos (hoy y últimos 7 días). La gráfica usa `BarChart` (escritorio) o `BarChart2` (móvil) sobre Chart.js y el tema se aplica con `useChartTheme`.
- **daily-sales**: la fecha se envía como `YYYYMMDD`. Las facturas se paginan con `page` y `limit` del store (5 por página).
- **sales-by-range**: exige rango de fechas y almacén o "todos" (`warehouse_id = 0`); 6 filas por página.
- **cash-counts**: consulta por fecha y almacén; muestra apertura, cierre, ventas, salidas y pagos.
- **accounts-payable-receivable**: alterna entre cuentas por pagar y por cobrar; 5 filas por página.

## Inventario (`src/apps/inventory`)

| Ruta | Componente principal | Store / acción | Endpoint |
| --- | --- | --- | --- |
| `/inventory/report-inventory` | `ReportInventoryDesktopMain` / `ReportInventoryMobileMain` | `reportInventoryStore.reportInventory` | `GET /reports/inventory` (`warehouse_id`, `page`, `limit`, `search`) |

Se muestra dentro de `InventoryLayout`. Su `MenuOptions` es una copia del del web reporter y navega a las rutas `/web-report-v2/*`.

## Compartido

| Pieza | Ubicación | Uso |
| --- | --- | --- |
| Almacenes | `appStore.getWarehouses` → `AppService.getWarehouses` | `GET /warehouses` para los filtros de ventas acumuladas, arqueos, cartera e inventario. |
| Pantalla de carga | `appStore.afterLoading(fn)` | Muestra `LoadingScreen` mientras se ejecuta una carga. |
| Tema | `utils/theme-transitions.ts`, `appStore.theme` | Claro u oscuro, persistido en `localStorage` (`theme`). |
| Paginación | `components/Paginator.vue` | Emite la página elegida; el componente actualiza `store.page` y vuelve a consultar. |
| Alertas | `components/beauty-alert/` | `createAlertCore(vueAdapters)` con tipos `confirm` y `timer`. |
| Formatos | `utils/parsers/` | Moneda COP y fechas. |
| Datos de prueba | `utils/faker/` | Generador de datos falsos usado por servicios comentados. |

## Router móvil (`VITE_TARGET=mobile`)

`src/router/index.mobile.ts` registra ventas acumuladas, perfil, inventario, arqueos, cartera, ventas del día (`/daily-sales/daily-sales`) y dashboard. No registra login ni home, redirige `/` a `/home/welcome` y no valida la sesión. Algunas rutas reutilizan componentes de otros módulos (por ejemplo, `registers` muestra `MobileRangeSalesMain`). Ver [ARQUITECTURA.md](ARQUITECTURA.md), sección "Observaciones técnicas".
