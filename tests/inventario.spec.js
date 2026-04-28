// tests/inventario.spec.js
// ═══════════════════════════════════════════════════════════
//  ESCENARIO 2 – Integridad de Datos (Lectura)
//  Valida que la tabla de Stock tenga datos y que la búsqueda
//  funcione correctamente.
//
//  Módulo: stock.html
//  Tabla:  #stock-tbody  (ingredientes del restaurante)
//  Buscar: #search        (input con oninput="applyFilter()")
//
//  Datos por defecto del sistema (localStorage "itsfood_data"):
//    • Tofu orgánico       (Depósito A)
//    • Lechuga romana      (Heladera 1)
//    • Garbanzos cocidos   (Depósito B)
//    • Quinoa real         (Depósito A)
//    • Harina de almendras (Depósito C)
//    • Leche de coco       (Heladera 2)
// ═══════════════════════════════════════════════════════════

const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────
//  TEST A: La tabla de Stock no está vacía
// ─────────────────────────────────────────────────────────────
test('Test A – La tabla de Stock contiene ingredientes cargados', async ({ page }) => {
  await page.goto('stock.html');

  // Esperamos que el tbody se renderice (el JS carga datos de localStorage)
  const tbody = page.locator('#stock-tbody');
  await expect(tbody).toBeVisible();

  // Debe haber al menos una fila con datos
  const filas = tbody.locator('tr');
  await expect(filas).not.toHaveCount(0);

  // Verificamos que haya al menos 4 ingredientes (los datos por defecto son 6)
  const cantidadFilas = await filas.count();
  expect(cantidadFilas).toBeGreaterThanOrEqual(4);

  console.log(`✅ Se encontraron ${cantidadFilas} ingredientes en la tabla de Stock.`);
});

// ─────────────────────────────────────────────────────────────
//  TEST B: La barra de búsqueda filtra correctamente
// ─────────────────────────────────────────────────────────────
test('Test B – La búsqueda filtra por nombre de ingrediente', async ({ page }) => {
  await page.goto('stock.html');

  // Esperamos que la tabla se cargue primero
  await expect(page.locator('#stock-tbody tr').first()).toBeVisible();

  const searchInput = page.locator('#search');
  await expect(searchInput).toBeVisible();

  // ── Paso 1: Buscamos "Tofu" ────────────────────────────────
  await searchInput.fill('Tofu');

  // Espera a que el filtro se aplique (el evento oninput es síncrono)
  await page.waitForTimeout(300);

  // Obtenemos las filas visibles
  const filasVisibles = page.locator('#stock-tbody tr:visible');
  const countConFiltro = await filasVisibles.count();
  expect(countConFiltro).toBeGreaterThanOrEqual(1);

  // Al menos una fila debe contener "Tofu" en su texto
  const primeraFila = filasVisibles.first();
  await expect(primeraFila).toContainText('Tofu');

  console.log(`✅ Búsqueda "Tofu": se muestran ${countConFiltro} resultado(s).`);

  // ── Paso 2: Limpiamos el buscador → vuelven todas las filas ─
  await searchInput.fill('');
  await page.waitForTimeout(300);

  const todasLasFilas = page.locator('#stock-tbody tr');
  const countSinFiltro = await todasLasFilas.count();
  expect(countSinFiltro).toBeGreaterThan(countConFiltro);

  console.log(`✅ Al limpiar la búsqueda se muestran ${countSinFiltro} filas.`);
});
