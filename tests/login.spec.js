// tests/login.spec.js
// ═══════════════════════════════════════════════════════════
//  ESCENARIO 1 – Seguridad y Acceso
//  Prueba el sistema de login de administración de ItsFood.
//
//  Flujo del login:
//    1. La página index.html tiene un botón "Acceso Administración"
//       en el footer (clase .footer-admin-btn).
//    2. Al hacerle click se abre un modal con un input de contraseña.
//    3. La contraseña por defecto es "admin123" (guardada en localStorage
//       con la clave IFFood_adminPass).
//    4. Si es correcta → redirige a caja.html (el Dashboard).
//    5. Si es incorrecta → muestra el mensaje de error #adminError.
// ═══════════════════════════════════════════════════════════

const { test, expect } = require('@playwright/test');

// ── Helpers ──────────────────────────────────────────────────
/** Abre el modal de login desde la página principal */
async function abrirModalLogin(page) {
  await page.goto('index.html');
  // El botón está en el footer; hay que hacer scroll hasta él
  const btnAdmin = page.locator('.footer-admin-btn');
  await btnAdmin.scrollIntoViewIfNeeded();
  await btnAdmin.click();
  // Esperamos a que el modal quede visible
  await expect(page.locator('#adminOverlay')).toHaveClass(/open/);
}

// ─────────────────────────────────────────────────────────────
//  TEST A: Login con credenciales válidas
// ─────────────────────────────────────────────────────────────
test('Test A – Login válido redirige al Dashboard (Caja)', async ({ page }) => {
  await abrirModalLogin(page);

  // Ingresa la contraseña correcta
  await page.fill('#adminPassInput', 'admin123');

  // Hace click en "Ingresar"
  await page.click('.admin-btn-primary');

  // ── Verificación ────────────────────────────────────────────
  // Debe redirigir a caja.html
  await page.waitForURL('**/caja.html');

  // El título de la página debe ser "Its Food – Caja"
  await expect(page).toHaveTitle('Its Food – Caja');

  // El elemento exclusivo del Dashboard: .page-title con texto "Caja"
  await expect(page.locator('.page-title')).toHaveText('Caja');

  // La sidebar debe tener el enlace "Caja" marcado como activo
  await expect(page.locator('.sidebar a.active')).toContainText('Caja');
});

// ─────────────────────────────────────────────────────────────
//  TEST B: Login con campos vacíos muestra mensaje de error
// ─────────────────────────────────────────────────────────────
test('Test B – Login con contraseña vacía muestra mensaje de error', async ({ page }) => {
  await abrirModalLogin(page);

  // Deja el campo vacío y hace click en "Ingresar"
  await page.click('.admin-btn-primary');

  // ── Verificación ────────────────────────────────────────────
  // El mensaje de error debe volverse visible
  const errorMsg = page.locator('#adminError');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('incorrecta');

  // NO debe haberse redirigido — seguimos en index.html
  await expect(page).toHaveURL(/index\.html/);
});

// ─────────────────────────────────────────────────────────────
//  TEST C (BONUS): Login con contraseña incorrecta
// ─────────────────────────────────────────────────────────────
test('Test C (bonus) – Contraseña incorrecta muestra error', async ({ page }) => {
  await abrirModalLogin(page);

  await page.fill('#adminPassInput', 'clave_equivocada_123');
  await page.click('.admin-btn-primary');

  const errorMsg = page.locator('#adminError');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('incorrecta');
});
