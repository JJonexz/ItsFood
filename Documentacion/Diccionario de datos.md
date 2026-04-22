# 📋 Diccionario de Datos

## Sistema Its Food — Documentación Técnica Completa

**Versión:** 1.0  
**Fecha de creación:** 2025  
**Estado:** Borrador académico  
**Proyecto:** Its Food — Sistema de Gestión para Restaurante  
**Autores:** Gonzalo Gonzalez, Nicolas Faulkner, Maximo Estigarrivia, Julian Rios

---

## Índice

1. [Introducción]
2. [Alcance del documento]
3. [Convenciones y estándares utilizados]
4. [Glosario de términos]
5. [Estructura de datos del sistema]
    - 5.2 [Entidad: Productos]
    - 5.3 [Entidad: Pedidos]
    - 5.4 [Entidad: Ventas]
    - 5.5 [Entidad: Caja]
6. [Relaciones entre entidades]
7. [Modelo relacional propuesto]
8. [Reglas de negocio]
9. [Restricciones e integridad de datos]
10. [Flujos de datos principales]
11. [Consideraciones de seguridad y acceso]
12. [Historial de versiones]
13. [Conclusión]

---

## 1. Introducción

El presente **Diccionario de Datos** es un documento técnico formal que describe de manera exhaustiva los elementos de información utilizados en el sistema **Its Food**. Su propósito es definir con precisión las características de cada dato: su nombre, significado semántico, tipo, estructura, restricciones y su rol dentro del flujo de información del sistema de gestión del restaurante.

Un diccionario de datos es una herramienta fundamental en el desarrollo de software, ya que actúa como fuente de verdad compartida entre todos los integrantes del equipo. Permite evitar ambigüedades, facilita el diseño de la base de datos relacional y establece un lenguaje común entre desarrolladores, diseñadores y usuarios del sistema.

Este documento cubre la totalidad de las entidades del sistema en su versión actual, incluyendo sus atributos, tipos de datos, validaciones, relaciones y las reglas de negocio que rigen su comportamiento. También contempla consideraciones para la implementación futura de una base de datos real y un sistema de autenticación.

---

## 2. Alcance del documento

Este diccionario de datos aplica al sistema **Its Food** en su versión 1.0, desarrollada como trabajo práctico académico. Cubre:

- Las **5 entidades principales** del sistema: Empleados, Productos, Pedidos, Ventas y Caja.
- Todos los **atributos** de cada entidad, con sus tipos, longitudes y valores permitidos.
- Las **relaciones** entre entidades y la cardinalidad de cada una.
- Las **reglas de negocio** que determinan el comportamiento del sistema.
- Las **restricciones de integridad** aplicables a cada campo.
- Los **flujos de datos** entre las distintas secciones del sistema.

**Fuera del alcance de este documento:**

- La implementación específica en un motor de base de datos (MySQL, SQLite, etc.).
- El código fuente de la aplicación.
- La interfaz de usuario y su diseño visual.

---

## 3. Convenciones y estándares utilizados

### 3.1 Nomenclatura de campos

Los nombres de los campos siguen las siguientes convenciones:

- Se utiliza **snake_case** para todos los identificadores (ej: `id_empleado`, `nombre_producto`).
- Los identificadores primarios siguen el patrón `id_[entidad]` (ej: `id_pedido`).
- Los campos de fecha siguen el patrón `fecha_[contexto]` cuando se necesita disambiguar.
- Los campos de referencia foránea conservan el nombre del identificador original.

### 3.2 Tipos de datos

|Tipo|Descripción|Equivalente SQL estándar|Ejemplo|
|---|---|---|---|
|`entero`|Número entero sin decimales|`INT`|`1`, `42`, `10000`|
|`texto`|Cadena de caracteres|`VARCHAR(n)`|`"Juan"`, `"pendiente"`|
|`decimal`|Número con decimales de precisión fija|`DECIMAL(p,s)`|`1500.50`, `99.99`|
|`fecha`|Fecha calendario|`DATE`|`2025-06-01`|
|`booleano`|Valor lógico verdadero/falso|`BOOLEAN`|`true`, `false`|

### 3.3 Notación de longitud

- Para campos de texto: la longitud indica el **número máximo de caracteres**.
- Para campos decimales: la notación `p,s` indica `p` dígitos totales con `s` posiciones decimales. Por ejemplo, `10,2` admite valores de hasta `99999999.99`.
- Para campos de tipo fecha: la longitud no aplica como número, sino como formato estándar.

### 3.4 Notación de cardinalidad

|Símbolo|Significado|
|---|---|
|`1 a 1`|Un registro de A se relaciona con exactamente uno de B|
|`1 a N`|Un registro de A se relaciona con uno o más de B|
|`N a N`|Múltiples registros de A se relacionan con múltiples de B|

---

## 4. Glosario de términos

|Término|Definición|
|---|---|
|**Entidad**|Objeto o concepto del mundo real sobre el que se almacena información (ej: empleado, producto).|
|**Atributo**|Propiedad o característica de una entidad (ej: nombre, precio).|
|**Clave primaria**|Atributo o conjunto de atributos que identifican de forma única a cada registro de una entidad.|
|**Clave foránea**|Atributo que referencia a la clave primaria de otra entidad, estableciendo una relación entre ambas.|
|**Dominio**|Conjunto de valores válidos que puede tomar un atributo.|
|**Restricción**|Regla que limita los valores o comportamientos permitidos sobre un dato.|
|**Integridad referencial**|Garantía de que las claves foráneas siempre referencian registros existentes en la entidad relacionada.|
|**Stock**|Cantidad disponible de un producto en el inventario del restaurante.|
|**Movimiento de caja**|Registro de entrada o salida de dinero en la caja del restaurante.|
|**Estado del pedido**|Etapa actual en el ciclo de vida de un pedido dentro del sistema.|
|**Pedido**|Solicitud de uno o más productos realizada por un cliente.|
|**Venta**|Transacción económica concretada, vinculada o no a un pedido previo.|
|**Egreso**|Salida de dinero de la caja (pagos, gastos operativos, etc.).|
|**Ingreso**|Entrada de dinero a la caja (ventas, otros conceptos).|
|**Balance de caja**|Diferencia entre los ingresos y egresos registrados en un período.|
|**Rol / Puesto**|Función específica que cumple un empleado en el restaurante.|

---

## 5. Estructura de datos del sistema

---

### 5.1 Entidad: Empleados

**Descripción general:**  
La entidad `Empleados` representa al personal del restaurante registrado en el sistema. Cada empleado tiene un rol específico (puesto) que determina sus responsabilidades operativas. Esta entidad es fundamental para la trazabilidad de las operaciones, ya que en una implementación completa permitiría asociar cada venta, pedido o movimiento de caja con el empleado responsable.

**Tabla de atributos:**

|Nombre del dato|Alias|Tipo|Longitud|Obligatorio|Clave|Valores permitidos|Descripción|
|---|---|---|---|---|---|---|---|
|`id_empleado`|codigo_empleado|Entero|11|Sí|Primaria|Enteros positivos, únicos|Identificador único autogenerado para cada empleado|
|`nombre`|nombre_empleado|Texto|50|Sí|—|Caracteres alfabéticos y espacios|Nombre de pila del empleado|
|`apellido`|apellido_empleado|Texto|50|Sí|—|Caracteres alfabéticos y espacios|Apellido del empleado|
|`puesto`|cargo|Texto|30|Sí|—|`administrador`, `cajero`, `cocinero`, `mozo`|Rol funcional del empleado dentro del restaurante|
|`telefono`|telefono_empleado|Texto|20|No|—|Dígitos, `+`, `-`, `( )`, espacios|Número de contacto del empleado|

**Detalle de atributos:**

- **`id_empleado`**  
    Identificador numérico autoincrementable. Es la clave primaria de la entidad. No puede ser nulo, no puede repetirse y no debe modificarse una vez asignado. En una base de datos relacional, este campo sería de tipo `INT AUTO_INCREMENT PRIMARY KEY`.
    
- **`nombre`**  
    Nombre de pila del empleado. Solo se permiten caracteres del alfabeto y espacios (para nombres compuestos como "María José"). No se permiten caracteres especiales ni números. Longitud mínima recomendada: 2 caracteres.
    
- **`apellido`**  
    Apellido del empleado. Aplican las mismas restricciones que el campo `nombre`. En futuras versiones podría separarse en `primer_apellido` y `segundo_apellido` para mayor precisión.
    
- **`puesto`**  
    Define el rol del empleado. Solo acepta los cuatro valores del dominio definido:
    
    - `administrador`: acceso completo al sistema, gestión general.
    - `cajero`: gestión de caja y ventas.
    - `cocinero`: recibe y procesa pedidos en cocina.
    - `mozo`: toma pedidos y atiende mesas.
- **`telefono`**  
    Campo opcional. Admite formatos variados para contemplar códigos de área, prefijos internacionales y distintos formatos nacionales. Ejemplo: `+54 9 11 1234-5678`.
    

**Ejemplo de registro:**

|id_empleado|nombre|apellido|puesto|telefono|
|---|---|---|---|---|
|1|Carlos|Rodríguez|mozo|+54 9 11 5555-1234|
|2|Ana|López|cajero|+54 9 11 5555-5678|
|3|Martín|Gómez|cocinero|—|
|4|Laura|Pérez|administrador|+54 9 11 5555-9999|

**Posibles errores y validaciones:**

|Error|Causa|Acción recomendada|
|---|---|---|
|`id_empleado` duplicado|Intento de insertar un ID ya existente|Rechazar la inserción y notificar|
|`puesto` fuera de dominio|Valor no permitido ingresado|Mostrar lista de opciones válidas|
|`nombre` vacío|Campo obligatorio sin valor|Requerir el dato antes de guardar|
|`telefono` con letras|Formato inválido|Validar formato con expresión regular|

---

### 5.2 Entidad: Productos

**Descripción general:**  
La entidad `Productos` almacena todos los ítems disponibles en el menú del restaurante. Cada producto tiene un precio de venta y un nivel de stock que indica la cantidad disponible. Esta entidad es central en el sistema, ya que es referenciada por los pedidos y afecta directamente el control de inventario.

**Tabla de atributos:**

|Nombre del dato|Alias|Tipo|Longitud|Obligatorio|Clave|Valores permitidos|Descripción|
|---|---|---|---|---|---|---|---|
|`id_producto`|codigo_producto|Entero|11|Sí|Primaria|Enteros positivos, únicos|Identificador único autogenerado para cada producto|
|`nombre_producto`|producto|Texto|50|Sí|—|Caracteres alfanuméricos|Nombre del producto en el menú|
|`descripcion`|detalle_producto|Texto|150|No|—|Texto libre|Descripción detallada del producto|
|`precio`|costo|Decimal|10,2|Sí|—|Números positivos mayores a 0|Precio de venta unitario del producto|
|`stock`|inventario|Entero|11|Sí|—|Enteros iguales o mayores a 0|Cantidad disponible del producto en inventario|

**Detalle de atributos:**

- **`id_producto`**  
    Identificador único autoincrementable. Clave primaria de la entidad. No puede ser nulo ni repetirse.
    
- **`nombre_producto`**  
    Nombre del plato o bebida tal como aparecerá en el menú y en los pedidos. Permite caracteres alfanuméricos para contemplar nombres como "Combo N°2" o "Agua 500ml". Longitud mínima recomendada: 3 caracteres.
    
- **`descripcion`**  
    Campo opcional que permite detallar ingredientes, características o información nutricional del producto. Máximo 150 caracteres. Útil para la vista del menú público.
    
- **`precio`**  
    Precio de venta unitario en la moneda local. Debe ser un número positivo mayor a cero. No se permiten precios negativos ni nulos. El formato `10,2` permite valores de hasta `99,999,999.99`.
    
- **`stock`**  
    Cantidad de unidades disponibles del producto. Un valor de `0` indica que el producto está agotado y no debería poder pedirse. No puede ser negativo. Cada vez que se confirma un pedido, el stock debería decrementarse en la cantidad correspondiente.
    

**Ejemplo de registro:**

|id_producto|nombre_producto|descripcion|precio|stock|
|---|---|---|---|---|
|1|Milanesa napolitana|Milanesa con salsa de tomate, jamón y queso|3500.00|20|
|2|Agua mineral 500ml|Agua sin gas, 500ml|800.00|50|
|3|Combo hamburguesa|Hamburguesa con papas fritas y bebida|5200.00|15|
|4|Tiramisú|Postre italiano con mascarpone y café|2800.00|0|

**Posibles errores y validaciones:**

|Error|Causa|Acción recomendada|
|---|---|---|
|`precio` igual a 0 o negativo|Valor fuera del dominio|Rechazar y mostrar mensaje de error|
|`stock` negativo|Actualización incorrecta al registrar pedido|Validar antes de decrementar|
|`nombre_producto` duplicado|Dos productos con el mismo nombre|Advertir pero permitir (puede haber variantes)|
|`descripcion` supera 150 caracteres|Texto demasiado largo|Truncar o mostrar error al usuario|

---

### 5.3 Entidad: Pedidos

**Descripción general:**  
La entidad `Pedidos` registra cada solicitud de productos realizada en el restaurante. Un pedido tiene un estado que evoluciona a lo largo de su ciclo de vida: desde que es ingresado, pasa por la cocina, hasta que es entregado al cliente. Esta entidad es el núcleo operativo del sistema.

**Tabla de atributos:**

|Nombre del dato|Alias|Tipo|Longitud|Obligatorio|Clave|Valores permitidos|Descripción|
|---|---|---|---|---|---|---|---|
|`id_pedido`|codigo_pedido|Entero|11|Sí|Primaria|Enteros positivos, únicos|Identificador único autogenerado para cada pedido|
|`fecha`|fecha_pedido|Fecha|—|Sí|—|Fechas válidas (no futuras)|Fecha en la que se registra el pedido|
|`estado`|estado_pedido|Texto|20|Sí|—|`pendiente`, `en preparación`, `entregado`|Estado actual del pedido en su ciclo de vida|
|`total`|total_pedido|Decimal|10,2|Sí|—|Números positivos mayores a 0|Monto total calculado del pedido|

**Detalle de atributos:**

- **`id_pedido`**  
    Identificador único autoincrementable. Clave primaria de la entidad. Es referenciado por la entidad `Ventas` como clave foránea.
    
- **`fecha`**  
    Fecha en que se registra el pedido en el sistema. No debería admitir fechas futuras. En una implementación con base de datos real, podría completarse automáticamente con la fecha del sistema (`CURRENT_DATE` o `NOW()`).
    
- **`estado`**  
    Campo de control del flujo del pedido. Solo acepta tres valores en un orden lógico secuencial:
    
    - `pendiente`: el pedido fue ingresado pero aún no fue tomado por cocina.
    - `en preparación`: cocina recibió el pedido y está siendo elaborado.
    - `entregado`: el pedido fue entregado al cliente. Estado final.
    
    No debería ser posible retroceder un estado (ej: pasar de `entregado` a `pendiente`).
    
- **`total`**  
    Monto calculado sumando el precio de cada producto incluido en el pedido, multiplicado por su cantidad. Este campo se calcula automáticamente y no debería editarse de forma manual.
    

**Ciclo de vida del pedido:**

```
[INGRESO] → pendiente → en preparación → entregado → [VENTA GENERADA]
```

**Ejemplo de registro:**

|id_pedido|fecha|estado|total|
|---|---|---|---|
|1|2025-06-01|entregado|8700.00|
|2|2025-06-01|en preparación|5200.00|
|3|2025-06-01|pendiente|3500.00|
|4|2025-06-02|entregado|11200.00|

**Posibles errores y validaciones:**

|Error|Causa|Acción recomendada|
|---|---|---|
|`estado` fuera de dominio|Valor no permitido|Mostrar selector con valores válidos|
|`total` no coincide con suma de productos|Cálculo manual incorrecto|Calcular automáticamente desde los productos|
|`fecha` futura|Error de carga|Validar que la fecha no supere la fecha actual|
|Retroceso de estado|Cambio inválido en el flujo|Restringir transiciones no permitidas|

---

### 5.4 Entidad: Ventas

**Descripción general:**  
La entidad `Ventas` registra las transacciones económicas concretadas en el restaurante. Cada venta puede estar asociada a un pedido previo. Esta entidad alimenta directamente los movimientos de caja y constituye el registro histórico de ingresos del negocio.

**Tabla de atributos:**

|Nombre del dato|Alias|Tipo|Longitud|Obligatorio|Clave|Valores permitidos|Descripción|
|---|---|---|---|---|---|---|---|
|`id_venta`|codigo_venta|Entero|11|Sí|Primaria|Enteros positivos, únicos|Identificador único autogenerado de la venta|
|`fecha`|fecha_venta|Fecha|—|Sí|—|Fechas válidas|Fecha en que se realiza la venta|
|`total`|total_venta|Decimal|10,2|Sí|—|Números positivos mayores a 0|Monto total cobrado en la venta|
|`id_pedido`|pedido_relacionado|Entero|11|Sí|Foránea|Debe existir en Pedidos|Referencia al pedido que origina la venta|

**Detalle de atributos:**

- **`id_venta`**  
    Identificador único autoincrementable. Clave primaria de la entidad.
    
- **`fecha`**  
    Fecha en que se registra la venta. Puede coincidir con la fecha del pedido asociado o ser posterior (si el pago se realiza después de la entrega). Debería almacenarse automáticamente al momento de crear el registro.
    
- **`total`**  
    Monto total cobrado. Debería coincidir con el total del pedido asociado, salvo que existan descuentos, propinas u otros ajustes que el sistema contemple en versiones futuras.
    
- **`id_pedido`**  
    Clave foránea que referencia al registro correspondiente en la entidad `Pedidos`. Garantiza que no se pueda registrar una venta sin un pedido asociado existente. Solo deberían poder convertirse en venta los pedidos con estado `entregado`.
    

**Ejemplo de registro:**

|id_venta|fecha|total|id_pedido|
|---|---|---|---|
|1|2025-06-01|8700.00|1|
|2|2025-06-02|11200.00|4|
|3|2025-06-02|5200.00|2|

**Posibles errores y validaciones:**

|Error|Causa|Acción recomendada|
|---|---|---|
|`id_pedido` inexistente|Referencia a pedido no registrado|Rechazar por integridad referencial|
|Venta sobre pedido no entregado|Pedido aún en proceso|Validar estado del pedido antes de generar venta|
|`total` distinto al del pedido|Inconsistencia de datos|Advertir y solicitar confirmación|
|Venta duplicada sobre el mismo pedido|Doble registro|Validar que un pedido no tenga más de una venta asociada|

---

### 5.5 Entidad: Caja

**Descripción general:**  
La entidad `Caja` registra todos los movimientos de dinero del restaurante, tanto entradas (ingresos) como salidas (egresos). Esta entidad permite llevar un control del flujo de efectivo del negocio y calcular el balance disponible en caja en cualquier momento.

**Tabla de atributos:**

|Nombre del dato|Alias|Tipo|Longitud|Obligatorio|Clave|Valores permitidos|Descripción|
|---|---|---|---|---|---|---|---|
|`id_movimiento`|codigo_movimiento|Entero|11|Sí|Primaria|Enteros positivos, únicos|Identificador único del movimiento de caja|
|`tipo_movimiento`|tipo|Texto|20|Sí|—|`ingreso`, `egreso`|Tipo de operación realizada en caja|
|`monto`|importe|Decimal|10,2|Sí|—|Números positivos mayores a 0|Cantidad de dinero involucrada en el movimiento|
|`fecha`|fecha_movimiento|Fecha|—|Sí|—|Fechas válidas|Fecha en que se realiza el movimiento|

**Detalle de atributos:**

- **`id_movimiento`**  
    Identificador único autoincrementable. Clave primaria de la entidad. No puede ser nulo ni repetirse.
    
- **`tipo_movimiento`**  
    Clasifica el movimiento como entrada o salida de dinero:
    
    - `ingreso`: dinero que entra a la caja. Ejemplos: cobro de una venta, adelanto de efectivo.
    - `egreso`: dinero que sale de la caja. Ejemplos: pago a proveedor, compra de insumos, pago de servicios.
- **`monto`**  
    Cantidad de dinero del movimiento. Siempre es positivo. El campo `tipo_movimiento` determina si suma o resta al balance. El sistema debe calcular el balance neto aplicando la fórmula:  
    `balance = Σ(ingresos) − Σ(egresos)`
    
- **`fecha`**  
    Fecha del movimiento. En una implementación real, podría incluirse también la hora (`DATETIME`) para mayor precisión en el registro de caja diario.
    

**Cálculo del balance de caja:**

```
Balance = (suma de todos los montos con tipo_movimiento = 'ingreso')
        - (suma de todos los montos con tipo_movimiento = 'egreso')
```

**Ejemplo de registro:**

|id_movimiento|tipo_movimiento|monto|fecha|
|---|---|---|---|
|1|ingreso|8700.00|2025-06-01|
|2|egreso|2000.00|2025-06-01|
|3|ingreso|11200.00|2025-06-02|
|4|egreso|1500.00|2025-06-02|
|5|ingreso|5200.00|2025-06-02|

**Balance del ejemplo:** `(8700 + 11200 + 5200) − (2000 + 1500)` = `25100 − 3500` = **$21.600,00**

**Posibles errores y validaciones:**

|Error|Causa|Acción recomendada|
|---|---|---|
|`tipo_movimiento` fuera de dominio|Valor no permitido|Mostrar selector con opciones válidas|
|`monto` igual a 0 o negativo|Valor inválido|Rechazar y mostrar mensaje de error|
|`fecha` futura|Error de carga|Validar contra la fecha actual del sistema|
|Balance negativo resultante|Egresos superiores a ingresos|Advertir al usuario pero permitir el registro|

---

## 6. Relaciones entre entidades

### 6.1 Diagrama textual de relaciones

```
┌─────────────┐         ┌───────────┐         ┌────────┐
│  Empleados  │────────▶│  Ventas   │◀────────│Pedidos │
└─────────────┘  1 a N  └───────────┘  1 a 1  └────────┘
                               │                    │
                               │ 1 a N              │ N a N
                               ▼                    ▼
                           ┌───────┐          ┌──────────┐
                           │ Caja  │          │ Productos│
                           └───────┘          └──────────┘
```

### 6.2 Tabla de relaciones

|Entidad A|Entidad B|Tipo|Campo de unión|Descripción|
|---|---|---|---|---|
|Empleados|Ventas|1 a N|`id_empleado`|Un empleado puede gestionar múltiples ventas|
|Pedidos|Ventas|1 a 1|`id_pedido`|Un pedido puede generar exactamente una venta|
|Productos|Pedidos|N a N|Tabla intermedia*|Un producto puede estar en muchos pedidos; un pedido puede tener muchos productos|
|Ventas|Caja|1 a N|`id_venta` (futuro)|Una venta puede generar uno o más movimientos de caja|

> *La relación N a N entre Productos y Pedidos requiere una **tabla intermedia** (`detalle_pedido` o `pedido_producto`) que no está explícita en la versión actual del sistema pero es necesaria para una implementación real.

### 6.3 Tabla intermedia sugerida: Detalle de Pedido

Para implementar correctamente la relación N a N entre Productos y Pedidos, se sugiere la siguiente entidad adicional:

|Nombre del dato|Tipo|Descripción|
|---|---|---|
|`id_detalle`|Entero|Identificador único del detalle|
|`id_pedido`|Entero|Referencia al pedido (clave foránea)|
|`id_producto`|Entero|Referencia al producto (clave foránea)|
|`cantidad`|Entero|Cantidad de unidades del producto en el pedido|
|`precio_unitario`|Decimal|Precio del producto al momento del pedido|
|`subtotal`|Decimal|Resultado de cantidad × precio_unitario|

---

## 7. Modelo relacional propuesto

El siguiente es el modelo relacional sugerido para una implementación futura con base de datos:

```sql
-- Empleados
CREATE TABLE empleados (
    id_empleado   INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(50) NOT NULL,
    apellido      VARCHAR(50) NOT NULL,
    puesto        ENUM('administrador','cajero','cocinero','mozo') NOT NULL,
    telefono      VARCHAR(20)
);

-- Productos
CREATE TABLE productos (
    id_producto      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto  VARCHAR(50) NOT NULL,
    descripcion      VARCHAR(150),
    precio           DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    stock            INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

-- Pedidos
CREATE TABLE pedidos (
    id_pedido  INT AUTO_INCREMENT PRIMARY KEY,
    fecha      DATE NOT NULL,
    estado     ENUM('pendiente','en preparación','entregado') NOT NULL DEFAULT 'pendiente',
    total      DECIMAL(10,2) NOT NULL CHECK (total > 0)
);

-- Detalle de Pedido (tabla intermedia)
CREATE TABLE detalle_pedido (
    id_detalle      INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido       INT NOT NULL,
    id_producto     INT NOT NULL,
    cantidad        INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal        DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido)   REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Ventas
CREATE TABLE ventas (
    id_venta   INT AUTO_INCREMENT PRIMARY KEY,
    fecha      DATE NOT NULL,
    total      DECIMAL(10,2) NOT NULL CHECK (total > 0),
    id_pedido  INT NOT NULL UNIQUE,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

-- Caja
CREATE TABLE caja (
    id_movimiento   INT AUTO_INCREMENT PRIMARY KEY,
    tipo_movimiento ENUM('ingreso','egreso') NOT NULL,
    monto           DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    fecha           DATE NOT NULL
);
```

---

## 8. Reglas de negocio

Las reglas de negocio definen el comportamiento esperado del sistema más allá de las restricciones de tipo y longitud de los datos.

|ID|Regla|Entidad/Campo|Descripción|
|---|---|---|---|
|RN-01|Un pedido solo puede avanzar en su estado, nunca retroceder|Pedidos / `estado`|El flujo es unidireccional: pendiente → en preparación → entregado|
|RN-02|Solo se puede generar una venta por pedido|Ventas / `id_pedido`|El campo `id_pedido` en Ventas debe ser único|
|RN-03|Solo se puede generar una venta sobre un pedido entregado|Pedidos + Ventas|Antes de crear una venta, validar que el pedido esté en estado `entregado`|
|RN-04|El stock no puede quedar negativo|Productos / `stock`|Al confirmar un pedido, verificar disponibilidad antes de decrementar|
|RN-05|El total de una venta debe coincidir con el del pedido asociado|Ventas / `total`|Coherencia entre ambas entidades|
|RN-06|El monto de un movimiento de caja siempre es positivo|Caja / `monto`|El tipo de movimiento define si suma o resta, no el signo del monto|
|RN-07|El total de un pedido se calcula automáticamente|Pedidos / `total`|Suma de (cantidad × precio_unitario) de cada ítem del detalle|
|RN-08|Un empleado no puede eliminarse si tiene ventas asociadas|Empleados|Integridad referencial: no borrar si existen registros dependientes|
|RN-09|Un producto con stock 0 no debería poder pedirse|Productos / `stock`|Control preventivo antes de agregar al pedido|
|RN-10|Cada movimiento de caja debe tener una fecha no futura|Caja / `fecha`|La fecha del movimiento debe ser menor o igual a la fecha actual|

---

## 9. Restricciones e integridad de datos

### 9.1 Restricciones de unicidad

|Entidad|Campo|Restricción|
|---|---|---|
|Empleados|`id_empleado`|Único, no nulo, autoincrementable|
|Productos|`id_producto`|Único, no nulo, autoincrementable|
|Pedidos|`id_pedido`|Único, no nulo, autoincrementable|
|Ventas|`id_venta`|Único, no nulo, autoincrementable|
|Ventas|`id_pedido`|Único (un pedido → una venta)|
|Caja|`id_movimiento`|Único, no nulo, autoincrementable|

### 9.2 Restricciones de nulidad

|Entidad|Campo|Puede ser nulo|
|---|---|---|
|Empleados|`telefono`|Sí|
|Productos|`descripcion`|Sí|
|Todos|Claves primarias|No|
|Todos|Campos de fecha|No|
|Todos|Campos de monto/total|No|

### 9.3 Integridad referencial

|Clave foránea|Referencia|Comportamiento al eliminar|
|---|---|---|
|`ventas.id_pedido` → `pedidos.id_pedido`|Obligatoria|Restringir eliminación si existe venta|
|`detalle_pedido.id_pedido` → `pedidos.id_pedido`|Obligatoria|Eliminar en cascada los detalles|
|`detalle_pedido.id_producto` → `productos.id_producto`|Obligatoria|Restringir eliminación si hay detalles|

---

## 10. Flujos de datos principales

### 10.1 Flujo: Toma de pedido y venta

```
1. Mozo selecciona productos del menú
        ↓
2. Se crea un registro en Pedidos (estado: pendiente)
        ↓
3. Se crean registros en Detalle_Pedido (por cada producto)
        ↓
4. Se descuenta el stock de cada Producto involucrado
        ↓
5. Cocina actualiza el estado del Pedido → "en preparación"
        ↓
6. Cocina entrega el pedido → estado → "entregado"
        ↓
7. Cajero registra el cobro → se crea un registro en Ventas
        ↓
8. Se genera un movimiento de Caja con tipo "ingreso"
```

### 10.2 Flujo: Registro de egreso en caja

```
1. Administrador o cajero registra un gasto
        ↓
2. Se crea un registro en Caja con tipo_movimiento = "egreso"
        ↓
3. El balance de caja se actualiza restando el monto
```

### 10.3 Flujo: Control de stock

```
1. Se registra un pedido con uno o más productos
        ↓
2. Sistema verifica stock disponible de cada producto
        ↓
   [Stock suficiente] → Se confirma el pedido y se decrementa el stock
   [Stock insuficiente] → Se notifica al operador y se bloquea el pedido
```

---

## 11. Consideraciones de seguridad y acceso

Aunque la versión actual del sistema no implementa autenticación, se describen a continuación las consideraciones de seguridad relevantes para una implementación futura:

### 11.1 Niveles de acceso por rol

|Rol|Empleados|Productos|Pedidos|Ventas|Caja|
|---|---|---|---|---|---|
|`administrador`|Lectura / Escritura|Lectura / Escritura|Lectura / Escritura|Lectura / Escritura|Lectura / Escritura|
|`cajero`|Solo lectura|Solo lectura|Lectura / Actualizar estado|Lectura / Escritura|Lectura / Escritura|
|`cocinero`|Sin acceso|Solo lectura|Actualizar estado|Sin acceso|Sin acceso|
|`mozo`|Sin acceso|Solo lectura|Lectura / Creación|Sin acceso|Sin acceso|

### 11.2 Recomendaciones para implementación futura

- Implementar autenticación con usuario y contraseña para cada empleado.
- Hashear contraseñas con algoritmos seguros (bcrypt, Argon2).
- Registrar un log de acciones por usuario (auditoría).
- Aplicar control de acceso basado en roles (RBAC) según la tabla anterior.
- Validar todos los datos tanto en el frontend como en el backend.
- No almacenar datos sensibles (contraseñas, datos personales) sin cifrado.

---

## 12. Historial de versiones

|Versión|Fecha|Descripción|Autores|
|---|---|---|---|
|1.0|2025|Versión inicial del diccionario de datos|Gonzalo Gonzalez, Nicolas Faulkner, Maximo Estigarrivia, Julian Rios|

---

## 13. Conclusión

El presente Diccionario de Datos documenta de manera exhaustiva la estructura de información del sistema **Its Food**, cubriendo las cinco entidades principales del sistema (Empleados, Productos, Pedidos, Ventas y Caja), sus atributos, tipos de datos, restricciones, relaciones y reglas de negocio asociadas.

Este documento constituye la base conceptual para una futura implementación con base de datos relacional real, proporcionando:

- Una definición clara y sin ambigüedades de cada campo de datos.
- Las restricciones de integridad necesarias para garantizar la consistencia de la información.
- El modelo relacional sugerido en SQL para facilitar la migración a una base de datos.
- Las reglas de negocio que el sistema debe respetar en su lógica de funcionamiento.
- Los flujos de datos que describen cómo la información se mueve entre las entidades.
- Un marco de seguridad y control de acceso para versiones futuras.

La entidad **Pedidos** actúa como núcleo del sistema, siendo referenciada por Ventas y conectada a Productos a través de una tabla de detalle. La entidad **Caja** opera de forma semi-independiente, registrando el impacto económico de las ventas y otros movimientos del negocio.

Para versiones futuras del sistema, se recomienda incorporar la tabla intermedia `detalle_pedido`, implementar un sistema de login con roles, y migrar la persistencia de datos a un motor de base de datos como MySQL o SQLite, utilizando este diccionario como guía de implementación.

---

_Documento técnico correspondiente al sistema Its Food — Trabajo Práctico Académico._  
_Todos los datos de ejemplo utilizados en este documento son ficticios y de carácter ilustrativo._