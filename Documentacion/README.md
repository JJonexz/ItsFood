#  Its Food - Sistema de Gestión para Restaurante

## Descripción

**Its Food** es una aplicación web diseñada para la gestión integral de un restaurante. El sistema permite visualizar información relevante del negocio y administrar diferentes áreas operativas de manera centralizada y simple, sin necesidad de instalación ni configuración de servidores.

El sistema está dividido en dos niveles de acceso:

- **Vista de usuario:** permite visualizar el menú del restaurante de forma clara e intuitiva.
- **Vista administrativa:** destinada a los gestores del restaurante, donde se puede acceder a información clave como empleados, ventas, pedidos, stock y caja.

---

##  Funcionalidades principales

###  Vista de usuario
- Visualización del menú del restaurante
- Navegación simple e intuitiva
- Diseño orientado a la experiencia del cliente

###  Vista administrativa
- Gestión de empleados (altas, bajas y consultas)
- Registro y visualización de ventas
- Administración de pedidos
- Control de stock e inventario
- Gestión de caja
- Sistema de búsqueda e historial integrado en todas las secciones

---

##  Estructura del proyecto

```
ItsFood/
├── index.html        → Página principal / menú del restaurante
├── empleados.html    → Gestión de empleados
├── ventas.html       → Registro de ventas
├── pedidos.html      → Administración de pedidos
├── stock.html        → Control de inventario
├── caja.html         → Gestión de caja
├── shared.js         → Funciones compartidas (búsqueda e historial)
├── shared.css        → Estilos compartidos entre secciones
└── styles.css        → Estilos generales del sistema
```

---

##  Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura y contenido de las páginas |
| CSS3 | Estilos, diseño visual y responsive |
| JavaScript | Lógica de negocio, búsqueda e historial |

No se requieren dependencias externas ni frameworks adicionales. El proyecto funciona directamente en el navegador.

---

##  Instalación y uso

1. Descargar o clonar el proyecto
2. Descomprimir el archivo (si corresponde)
3. Abrir el archivo `index.html` en cualquier navegador web moderno
4. Navegar entre las distintas secciones del sistema mediante el menú de navegación

> **Nota:** No se requiere conexión a internet ni servidor local. El sistema funciona completamente en el navegador de forma estática.

---

##  Navegación del sistema

### Desde la vista pública
El usuario accede a `index.html` y puede navegar por el menú del restaurante, visualizando los platos disponibles con sus descripciones.

### Desde la vista administrativa
El administrador tiene acceso a un panel de control que incluye:

- **Empleados** → Ver listado, buscar por nombre o cargo, consultar historial de cambios
- **Ventas** → Registrar nuevas ventas, visualizar el historial y totales
- **Pedidos** → Administrar el estado de los pedidos en curso
- **Stock** → Consultar inventario disponible y registrar movimientos
- **Caja** → Gestión del flujo de dinero diario

Todas las secciones comparten un sistema común de búsqueda e historial provisto por `shared.js`, lo que permite una experiencia consistente en todo el sistema.

---

##  Descripción de archivos clave

### `shared.js`
Módulo JavaScript compartido que centraliza funcionalidades reutilizables:
- Sistema de búsqueda genérico aplicable a todas las secciones
- Registro y visualización del historial de acciones
- Funciones utilitarias comunes

### `shared.css`
Hoja de estilos con componentes visuales reutilizables:
- Estilos de tablas, botones y formularios comunes
- Clases de layout compartidas entre páginas
- Variables de color y tipografía del sistema

### `styles.css`
Estilos globales del sistema:
- Reset y base de estilos
- Tipografía general
- Estilos del encabezado y navegación principal

---

##  Mejoras futuras

- [ ] Integración con base de datos (MySQL / SQLite / Firebase)
- [ ] Implementación de sistema de login con roles (usuario y administrador)
- [ ] Registro real y persistente de pedidos y ventas
- [ ] Exportación de reportes en PDF o Excel
- [ ] Notificaciones en tiempo real para pedidos nuevos
- [ ] Mejora en la experiencia de usuario (UX) y diseño responsive para móviles
- [ ] Panel de estadísticas y métricas del negocio
- [ ] Sistema de reservas para mesas

---

##  Autor(es)

| Nombre | Rol |
|---|---|
| Julian Rios | PM |
| Maximo Estigarrivia | Backend-Inspector |
| Gonzalo Gonzalez | Fronted |
| Nicolas Faulkner | Fronted |
| Jairo Llanos | Documentador |

---

##  Notas

Este sistema fue desarrollado como parte de un **trabajo práctico académico**, con el objetivo de simular un sistema real de gestión para restaurantes. Los datos mostrados son de carácter ilustrativo y no representan información real.

El proyecto tiene una arquitectura frontend pura (HTML + CSS + JS), sin backend, lo que lo hace simple de ejecutar pero con limitaciones en cuanto a persistencia y seguridad. Las mejoras listadas anteriormente apuntan a cerrar esas brechas en futuras versiones.

---

##  Licencia

Este proyecto fue desarrollado con fines educativos. No cuenta con una licencia de distribución comercial.