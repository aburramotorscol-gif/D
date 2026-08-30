# Aburrá Motors

Compraventa de vehículos **100 % virtual** del Valle de Aburrá (Medellín, Colombia).
Compra, venta, financiación, retoma, seguros, trámites y consignación, sin que el
cliente tenga que desplazarse.

Este repositorio es la **fase 1** de la hoja de ruta: el sitio web público. Las
decisiones están tomadas para no cerrar las fases siguientes (automatización
comercial, CRM, integración con WhatsApp, portal del cliente y app móvil).

---

## Arquitectura del monorepo

```
AburraMotors/
├── web/                         Frontend — Next.js 16 (App Router) + TypeScript + Tailwind 4
│   ├── src/
│   │   ├── app/                 Rutas (Server Components por defecto)
│   │   │   ├── page.tsx                  Home
│   │   │   ├── vehiculos/                Catálogo y ficha [slug]
│   │   │   ├── vender/  financiacion/  seguros/
│   │   │   ├── tramites/  consignacion/
│   │   │   ├── nosotros/  contacto/
│   │   │   ├── politica-de-datos/  terminos/
│   │   │   ├── not-found.tsx  sitemap.ts  robots.ts
│   │   │   └── layout.tsx  globals.css   Sistema de diseño
│   │   ├── components/          UI. Solo son "use client" las islas interactivas
│   │   ├── config/site.ts       ⭐ CONFIGURACIÓN EDITABLE DEL SITIO
│   │   ├── data/vehiculos/      ⭐ UN JSON POR VEHÍCULO (fuente de datos actual)
│   │   └── lib/
│   │       ├── vehiculos.ts     ⭐ ÚNICO acceso a datos del catálogo
│   │       ├── leads.ts         ⭐ ÚNICO punto de envío de formularios
│   │       ├── financiacion.ts  Amortización francesa (simulador)
│   │       ├── schemas.ts       Esquemas Zod del dominio
│   │       ├── formato.ts       Pesos colombianos, kilometraje, fechas
│   │       ├── jsonld.ts        Datos estructurados schema.org
│   │       └── rutas.ts         Prefijo basePath para imágenes de public/
│   └── public/vehiculos/<slug>/ Imágenes (hoy placeholders SVG)
│
├── api/                         Backend — Python 3.12 + FastAPI + SQLModel
│   ├── app/
│   │   ├── api/routers/         health, vehiculos, leads, simulaciones
│   │   ├── models/              Tablas SQLModel
│   │   ├── schemas/             Entrada y salida Pydantic v2
│   │   ├── services/            Lógica de negocio (incluye amortizacion.py)
│   │   ├── core/                config, logging JSON, manejo de errores
│   │   └── db/session.py        Motor y sesiones
│   ├── alembic/                 Migraciones desde el primer commit
│   ├── scripts/                 seed.py y exportar_inventario.py
│   └── tests/                   30 pruebas con pytest + httpx
│
└── .github/workflows/
    ├── ci.yml                   Lint + build del frontend, ruff + pytest del backend
    └── deploy.yml               Build y publicación en GitHub Pages
```

### Las cuatro piezas que importan

| Archivo | Por qué importa |
|---|---|
| `web/src/config/site.ts` | Único archivo a tocar para cambiar WhatsApp, correo, redes, horarios, cobertura y la tasa por defecto del simulador. |
| `web/src/lib/vehiculos.ts` | Único sitio que sabe de dónde salen los vehículos. Cambiar la fuente de JSON local a la API **no obliga a tocar ninguna vista**. |
| `web/src/lib/leads.ts` | Único sitio por el que salen los formularios. Hoy compone un mensaje de WhatsApp; la implementación de `POST /leads` ya está escrita al lado. |
| `api/app/models/lead.py` | Una sola tabla para las seis solicitudes, discriminadas por `tipo`, con un campo JSON `datos`. Es la semilla del CRM de la fase 3. |

---

## Requisitos

| Herramienta | Versión | Para qué |
|---|---|---|
| Node.js | 20.9+ (probado con 24 LTS) | Frontend |
| Python | 3.12+ (probado con 3.13) | Backend |
| Git | cualquiera reciente | — |

`uv` es opcional. Las instrucciones de abajo usan `venv`, que viene con Python.

---

## Frontend (`web/`)

### Instalación y desarrollo

```powershell
cd web
npm install
npm run dev
```

Abre **http://localhost:3000**. En desarrollo el sitio se sirve en la raíz, sin
el prefijo `/AburraMotors` que sí lleva en GitHub Pages.

### Probar el build estático de producción

Reproduce exactamente lo que publica el workflow, incluido el `basePath`:

```powershell
cd web
$env:NEXT_PUBLIC_BASE_PATH = "/AburraMotors"
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

El resultado queda en `web/out/`. Para servirlo igual que GitHub Pages —bajo el
subdirectorio— hay que montarlo en una carpeta con ese nombre:

```powershell
cd web
New-Item -ItemType Directory -Force ..\_publicado\AburraMotors | Out-Null
Copy-Item -Recurse -Force out\* ..\_publicado\AburraMotors\
cd ..\_publicado
python -m http.server 8000
```

Abre **http://localhost:8000/AburraMotors/**.

> Si sirves `out/` directamente en la raíz, las rutas con `basePath` darán 404.
> Para eso, compila **sin** `NEXT_PUBLIC_BASE_PATH` y sirve `out/` tal cual.

### Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build + verificación de tipos + export estático a `out/` |
| `npm run lint` | ESLint |

---

## Backend (`api/`)

### Instalación

```powershell
cd api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env
```

> Si PowerShell bloquea el script de activación:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

### Levantar la API

```powershell
cd api
.\.venv\Scripts\Activate.ps1
alembic upgrade head        # crea el esquema
python scripts\seed.py      # carga los 8 vehículos de ejemplo
uvicorn app.main:app --reload
```

| URL | Qué es |
|---|---|
| http://127.0.0.1:8000/docs | **Documentación interactiva (Swagger UI)** |
| http://127.0.0.1:8000/redoc | Documentación alternativa |
| http://127.0.0.1:8000/health | Estado del servicio |

### Comandos

| Comando | Qué hace |
|---|---|
| `uvicorn app.main:app --reload` | Levanta la API en el puerto 8000 |
| `pytest -q` | Corre las 30 pruebas |
| `ruff check .` / `ruff format .` | Lint y formateo |
| `alembic upgrade head` | Aplica las migraciones |
| `alembic revision --autogenerate -m "..."` | Crea una migración tras cambiar un modelo |
| `python scripts\seed.py [--reset]` | Carga los JSON del frontend en la base de datos |
| `python scripts\exportar_inventario.py` | Vuelca la base de datos al formato del frontend |

### Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/health` | Estado del servicio |
| `GET` | `/vehiculos` | Catálogo con filtros y paginación |
| `GET` | `/vehiculos/marcas` | Marcas con inventario disponible |
| `GET` | `/vehiculos/{slug}` | Detalle de un vehículo |
| `POST` | `/leads` | Registra una solicitud (`tipo` la discrimina) |
| `POST` | `/simulaciones` | Calcula y guarda una simulación de crédito |

La base de datos se configura con `DATABASE_URL`. SQLite en desarrollo,
PostgreSQL en producción: **solo cambia la variable, no hay código que tocar.**

---

## Cómo agregar un vehículo

Hoy el catálogo del sitio publicado sale de los JSON de `web/src/data/vehiculos/`.

1. **Crea el JSON** en `web/src/data/vehiculos/<slug>.json`. Copia uno existente
   como plantilla. El `slug` debe coincidir con el nombre del archivo y solo
   admite minúsculas, números y guiones.

2. **Pon las imágenes** en `web/public/vehiculos/<slug>/`. Referéncialas desde
   el JSON con ruta absoluta y un `alt` descriptivo:

   ```json
   "imagenes": [
     { "src": "/vehiculos/mi-carro-2022/1.jpg", "alt": "Marca Línea 2022 — vista frontal" }
   ]
   ```

3. **Regístralo en `web/src/lib/vehiculos.ts`**: agrega el `import` arriba y el
   nombre a la lista `CRUDOS`. La lista es explícita a propósito, para que el
   build sea determinista y falle si un JSON está mal.

4. `npm run build`. Si el JSON no cumple el esquema Zod, el build falla
   diciendo exactamente qué campo está mal. La ficha `/vehiculos/<slug>/` y la
   entrada del `sitemap.xml` se generan solas.

**Con el backend en marcha**, el flujo es al revés: administras el inventario en
la API y corres `python scripts\exportar_inventario.py`, que reescribe los JSON.
La ida y vuelta (`seed.py` → base de datos → `exportar_inventario.py`) reproduce
los archivos byte a byte.

---

## Cómo cambiar la configuración del sitio

Todo está en **`web/src/config/site.ts`**: nombre comercial, WhatsApp, correo,
redes, horarios, cobertura, coordenadas y los parámetros del simulador (tasa por
defecto, mínima y máxima, plazos, cuota inicial sugerida y porcentaje máximo
financiable). Los servicios que se muestran en la home y en el pie también se
declaran ahí, en el arreglo `servicios`.

**Si cambias la tasa por defecto del simulador**, cámbiala también en
`api/.env` (`TASA_MENSUAL_POR_DEFECTO`) para que el backend calcule igual.

---

## Qué se pierde con el export estático

`web/next.config.ts` usa `output: "export"`: el build produce HTML, CSS y JS
estáticos que GitHub Pages puede servir sin costo de servidor. A cambio **no
funciona nada que necesite un proceso Node en ejecución**:

| No disponible | Consecuencia hoy | Cómo lo resolvimos |
|---|---|---|
| Route Handlers con `Request` | No se puede recibir un `POST` del formulario | Los formularios abren WhatsApp con el mensaje prellenado |
| Server Actions | Sin mutaciones desde el servidor | Igual que arriba |
| ISR y revalidación | El catálogo solo cambia al recompilar | Cada cambio de inventario necesita un nuevo despliegue |
| Middleware / proxy | Sin redirecciones ni reescrituras dinámicas | No las usamos |
| `cookies()`, `headers()` | Sin sesiones ni autenticación | El portal del cliente requiere salir del export |
| Optimización de imágenes | `images.unoptimized: true` | Hay que subir las fotos ya comprimidas |
| `searchParams` en el servidor | La query no se lee al renderizar | El catálogo y el simulador la leen en el cliente con `useSearchParams` |

⚠️ **Detalle que cuesta caro si se olvida:** con `unoptimized: true`, `next/image`
**no** le antepone el `basePath` al `src`. Por eso las imágenes de `public/` se
envuelven en `rutaPublica()` (`web/src/lib/rutas.ts`). Si agregas un componente
que muestre imágenes de `public/`, úsalo, o las fotos darán 404 en producción.

---

## De export estático a servidor

Cuando llegue el portal del cliente (fase 5), o antes si el inventario cambia
tan seguido que recompilar molesta:

1. **Quita el export** de `web/next.config.ts`: borra `output: "export"`,
   `trailingSlash`, `basePath`, `assetPrefix` e `images.unoptimized`.
2. **Despliega en un servidor**: Vercel (cero configuración) o un contenedor
   propio con `next build && next start`. Deja de usar el workflow de Pages.
3. **Apunta el catálogo a la API**: en `web/src/lib/vehiculos.ts` reemplaza la
   lectura de los JSON por `fetch` a `GET /vehiculos` y `GET /vehiculos/{slug}`.
   Las firmas ya son asíncronas y devuelven lo mismo: **ninguna vista cambia.**
4. **Apunta los formularios a la API**: en `web/src/lib/leads.ts`, el cuerpo de
   `enviarLead` pasa a ser `return enviarLeadAlBackend(lead);`. La función ya
   está escrita y tipada. Define `NEXT_PUBLIC_API_URL`. Ningún formulario cambia.
5. **Despliega el backend** con PostgreSQL: cambia `DATABASE_URL`, corre
   `alembic upgrade head` y agrega el dominio del frontend a `CORS_ORIGINS`.
6. **Quita `rutaPublica()`** de los componentes de imagen: sin `basePath` deja
   de hacer falta (aunque es inofensivo, devuelve la ruta tal cual).

---

## Despliegue

`.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main`.
Toma el `basePath` del nombre real del repositorio
(`/${{ github.event.repository.name }}`), no de un valor escrito a mano.

**Para que funcione hay que activar Pages una vez**, a mano, en GitHub:

1. **Settings → Pages → Build and deployment → Source**: escoge
   **GitHub Actions** (no "Deploy from a branch").
2. **Settings → Actions → General → Workflow permissions**: deja
   **Read and write permissions** activado.
3. Vuelve a lanzar el workflow desde la pestaña **Actions** si el primer intento
   falló por permisos.

El sitio queda en **https://cbaldor19.github.io/AburraMotors/**.

`.github/workflows/ci.yml` corre en cada push y PR: lint y build del frontend,
`ruff` y `pytest` del backend, y comprueba que las migraciones apliquen desde
cero y que el seed cargue.

---

## Placeholders pendientes

Los valores marcados con `TODO` en `web/src/config/site.ts`:

- **Número de WhatsApp** (`whatsapp` y `whatsappVisible`) — hoy `573001112233`.
- **Correo** (`email`) — hoy `contacto@aburramotors.com`.
- **Redes sociales** (`redes`) — perfiles de ejemplo; pon `null` para ocultar uno.
- **Horarios de atención** (`horarios`).
- **Tasa del simulador** (`financiacion.tasaMensualPorDefecto`) — confirmar con
  las entidades aliadas, y replicarla en `api/.env`.
- **Dominio propio** (`url`) cuando exista, en lugar de la URL de Pages.

Otros pendientes fuera de `site.ts`:

- **Fotos reales** de los vehículos, en `web/public/vehiculos/<slug>/`. Las
  actuales son placeholders SVG generados.
- **Testimonios** (`web/src/components/home/Testimonios.tsx`) — son de ejemplo y
  la sección lo advierte en pantalla. Reemplázalos por reseñas reales con
  autorización, o borra la sección.
- **Comisión y vigencia de la consignación** (`web/src/app/consignacion/page.tsx`).
- **Revisión legal** de `/politica-de-datos` y `/terminos`, y completar razón
  social, NIT y domicilio del responsable del tratamiento.

---

## Decisiones de diseño

- **Paleta propia**: verde petróleo (marca) y ámbar cobre (acento) sobre neutros
  cálidos. Deliberadamente sin el azul corporativo por defecto.
- **Mobile-first de verdad**: la mayoría del tráfico llega por celular desde un
  enlace de WhatsApp. Botón flotante de WhatsApp siempre visible.
- **Server Components por defecto**. Solo son islas de cliente el menú móvil, la
  búsqueda rápida, los filtros del catálogo, la galería, el simulador y los
  formularios.
- **Sin librerías de componentes**. Únicas dependencias de UI: `lucide-react`
  para iconos y `zod` para validar datos.
- **Accesibilidad**: HTML semántico, `label` en todos los campos, foco visible,
  `alt` en todas las imágenes, `aria-live` en los resultados del catálogo y del
  simulador, y respeto a `prefers-reduced-motion`.
- **La fórmula del crédito está dos veces a propósito** (navegador y servidor),
  y hay un test que fija los valores como contrato entre ambas: 48.000.000 a 60
  meses al 1,45 % mensual son 1.203.272 de cuota en las dos implementaciones.
