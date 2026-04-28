// tests/operaciones.spec.js
// ═══════════════════════════════════════════════════════════
//  ESCENARIO 3 – Transacción Crítica (Escritura)
//  Flujo completo de creación de un nuevo empleado.
//
//  Módulo:    empleados.html
//  Formulario: modal #modal-emp
//  Campos:
//    • #e-nombre  → nombre completo
//    • #e-dni     → DNI (7-8 dígitos)
//    • #e-tel     → teléfono
//    • #e-puesto  → cargo/rol
//    • #e-horas   → horas semanales
//    • #e-sueldo  → sueldo
//  Guardar: botón "Guardar" dentro del modal
//  Éxito:   toast con "agregado ✅" en #toast-container
//  Listado: fila nueva en #emp-tbody
//
//  ⚠️  Se usa el nombre "Test-Empleado-01" para evitar conflictos
//      entre integrantes del equipo. Cada uno debe usar un nombre
//      distinto (ej: "Test-Empleado-02", "Test-Empleado-03", etc.)
// ═══════════════════════════════════════════════════════════

const { test, expect } = require('@playwright/test');

// ─── Datos del empleado de prueba ────────────────────────────
// ⚠️ Cambiar el sufijo (-01) por el número de cada integrante
const EMPLEADO_TEST = {
  nombre:  'Test-Empleado-01',
  dni:     '99887701',
  tel:     '011-900-0001',
  puesto:  'Tester QA',
  horas:   '40',
  sueldo:  '1500',
};

// ─────────────────────────────────────────────────────────────
//  TEST PRINCIPAL: Crear nuevo empleado y verificar en listado
// ─────────────────────────────────────────────────────────────
test('Flujo completo – Agregar nuevo empleado y verificar en el listado', async ({ page }) => {
  // ── 1. Navegar al módulo de Empleados ───────────────────────
  await page.goto('empleados.html');

  // Esperamos que la tabla cargue los empleados existentes
  const tbody = page.locator('#emp-tbody');
  await expect(tbody).toBeVisible();
  await expect(tbody.locator('tr').first()).toBeVisible({ timeout: 5000 });

  // Contamos cuántos empleados hay antes de agregar
  const cantidadInicial = await tbody.locator('tr').count();
  console.log(`Empleados antes del test: ${cantidadInicial}`);

  // ── 2. Abrir el modal "Agregar empleado" ────────────────────
  await page.click('button:has-text("+ Agregar empleado")');

  // El modal debe abrirse
  await expect(page.locator('#modal-emp')).toHaveClass(/open/);

  // ── 3. Completar el formulario ──────────────────────────────
  await page.fill('#e-nombre',  EMPLEADO_TEST.nombre);
  await page.fill('#e-dni',     EMPLEADO_TEST.dni);
  await page.fill('#e-tel',     EMPLEADO_TEST.tel);
  await page.fill('#e-puesto',  EMPLEADO_TEST.puesto);
  await page.fill('#e-horas',   EMPLEADO_TEST.horas);
  await page.fill('#e-sueldo',  EMPLEADO_TEST.sueldo);

  // ── 4. Guardar ──────────────────────────────────────────────
  // Click en el botón "Guardar" dentro del modal #modal-emp
  await page.locator('#modal-emp').getByRole('button', { name: 'Guardar' }).click();

  // ── 5. Verificar aviso de éxito (toast) ─────────────────────
  // El sistema muestra un toast: '"Test-Empleado-01" agregado ✅'
  const toast = page.locator('#toast-container .toast');
  await expect(toast).toBeVisible({ timeout: 3000 });
  await expect(toast).toContainText('agregado');
  await expect(toast).toContainText(EMPLEADO_TEST.nombre);

  console.log('✅ Toast de éxito visible.');

  // ── 6. Verificar que el nuevo empleado aparece en la tabla ──
  // La tabla debe tener una fila más que antes
  const cantidadFinal = await tbody.locator('tr').count();
  expect(cantidadFinal).toBe(cantidadInicial + 1);

  // El nombre del nuevo empleado debe estar en la última fila
  const ultimaFila = tbody.locator('tr').last();
  await expect(ultimaFila).toContainText(EMPLEADO_TEST.nombre);
  await expect(ultimaFila).toContainText(EMPLEADO_TEST.puesto);

  console.log(`✅ Empleado "${EMPLEADO_TEST.nombre}" encontrado en la tabla.`);
  console.log(`   Empleados ahora: ${cantidadFinal}`);
});

// ─────────────────────────────────────────────────────────────
//  TEST B (BONUS): Validación del formulario (campos vacíos)
// ─────────────────────────────────────────────────────────────
test('Test B (bonus) – El formulario valida campos obligatorios', async ({ page }) => {
  await page.goto('empleados.html');

  // Abrir modal
  await page.click('button:has-text("+ Agregar empleado")');
  await expect(page.locator('#modal-emp')).toHaveClass(/open/);

  // Intentar guardar sin completar nada
  await page.locator('#modal-emp').getByRole('button', { name: 'Guardar' }).click();

  // Debe aparecer el mensaje de error en el campo Nombre
  const errNombre = page.locator('#err-e-nombre');
  await expect(errNombre).toBeVisible();
  await expect(errNombre).toContainText('requerido');

  // El modal NO debe cerrarse
  await expect(page.locator('#modal-emp')).toHaveClass(/open/);

  console.log('✅ Validación de formulario funciona correctamente.');
});
