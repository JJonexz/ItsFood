# 🧪 ItsFood — Suite de Testing E2E con Playwright

## Estructura del proyecto

```
ItsFood/
├── playwright.config.js   ← Configuración principal (baseURL, browsers, etc.)
├── package.json
├── tests/
│   ├── login.spec.js        ← Escenario 1: Seguridad y Acceso
│   ├── inventario.spec.js   ← Escenario 2: Integridad de Datos (Lectura)
│   └── operaciones.spec.js  ← Escenario 3: Transacción Crítica (Escritura)
└── ...archivos del sitio...
```

---

## ⚙️ Setup inicial (una sola vez)

### 1. Requisitos previos
- [Node.js LTS](https://nodejs.org) instalado
- XAMPP con **Apache corriendo** antes de ejecutar tests
- El proyecto en la carpeta: `C:\xampp\htdocs\ItsFood\`

### 2. Instalar dependencias
```bash
npm install
npx playwright install chromium
```

---

## 🚀 Comandos principales

| Comando | Descripción |
|---|---|
| `npx playwright test` | Corre toda la suite en modo headless |
| `npx playwright test --headed` | Corre los tests con el navegador visible |
| `npx playwright test --ui` | Modo interactivo paso a paso |
| `npx playwright show-report` | Abre el reporte HTML del último run |
| `npx playwright codegen http://localhost/ItsFood/` | Graba clics y genera código automáticamente |

---

## 📋 Escenarios cubiertos

### Escenario 1 — `tests/login.spec.js`
| Test | Descripción |
|---|---|
| Test A | Login con `admin123` → redirige a `caja.html` (Dashboard) |
| Test B | Login con campos vacíos → muestra `#adminError` |
| Test C (bonus) | Contraseña incorrecta → muestra error |

### Escenario 2 — `tests/inventario.spec.js`
| Test | Descripción |
|---|---|
| Test A | La tabla `#stock-tbody` en `stock.html` no está vacía |
| Test B | El input `#search` filtra correctamente por nombre |
| Test C (bonus) | Búsqueda sin coincidencias → tabla vacía |

### Escenario 3 — `tests/operaciones.spec.js`
| Test | Descripción |
|---|---|
| Test principal | Crear empleado completo → toast de éxito + aparece en tabla |
| Test B (bonus) | Formulario vacío → validación visible, modal no cierra |

---

## 👥 Guía para el equipo

Para evitar conflictos entre integrantes al agregar empleados de prueba,
**cada integrante debe cambiar el número** en `operaciones.spec.js`:

```js
// Integrante 1
const EMPLEADO_TEST = { nombre: 'Test-Empleado-01', dni: '99887701', ... }

// Integrante 2
const EMPLEADO_TEST = { nombre: 'Test-Empleado-02', dni: '99887702', ... }

// Integrante 3
const EMPLEADO_TEST = { nombre: 'Test-Empleado-03', dni: '99887703', ... }
```

---

## 🗺️ Arquitectura de la aplicación (para entender los tests)

```
index.html        → Menú público + modal de login admin
  └─ Login OK ──→ caja.html     (Dashboard / Caja)
                  ├─ stock.html      (Ingredientes)
                  ├─ empleados.html  (Equipo)
                  └─ pedidos.html    (Órdenes)

Almacenamiento: localStorage["itsfood_data"]
Login: localStorage["IFFood_adminPass"] (default: "admin123")
```

---

## 🔑 Credenciales por defecto

| Campo | Valor |
|---|---|
| Contraseña admin | `admin123` |
| Clave localStorage | `IFFood_adminPass` |
