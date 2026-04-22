// ═══════════════════════════════════════
//  ITS FOOD — SHARED DATA & UTILITIES
// ═══════════════════════════════════════

const IFData = (() => {

  const KEY = 'itsfood_data';

  const defaults = {
    productos: [
      {id:1,  nombre:'Hamburguesa Vegana',   precio:5.00, emoji:'🍔', categoria:'comida',  ingredientes:['Tofu orgánico']},
      {id:2,  nombre:'Ensalada Verde',        precio:3.00, emoji:'🥗', categoria:'entrada', ingredientes:['Lechuga romana']},
      {id:3,  nombre:'Bowl de Quinoa',        precio:6.00, emoji:'🥣', categoria:'comida',  ingredientes:['Quinoa real']},
      {id:4,  nombre:'Wrap de Falafel',       precio:4.50, emoji:'🌯', categoria:'comida',  ingredientes:['Garbanzos cocidos']},
      {id:5,  nombre:'Smoothie Detox',        precio:3.50, emoji:'🥤', categoria:'bebida',  ingredientes:['Leche de coco']},
      {id:6,  nombre:'Tarta de Espinaca',     precio:4.00, emoji:'🥧', categoria:'entrada', ingredientes:['Harina de almendras']},
      {id:7,  nombre:'Sopa Cremosa',          precio:3.50, emoji:'🍲', categoria:'entrada', ingredientes:['Leche de coco']},
      {id:8,  nombre:'Brownie Raw',           precio:2.50, emoji:'🍫', categoria:'postre',  ingredientes:['Harina de almendras']},
      {id:9,  nombre:'Tacos de Tofu',         precio:5.50, emoji:'🌮', categoria:'comida',  ingredientes:['Tofu orgánico','Lechuga romana']},
      {id:10, nombre:'Pizza Vegana',          precio:7.00, emoji:'🍕', categoria:'comida',  ingredientes:['Garbanzos cocidos','Quinoa real']}
    ],
    ventas: [
      {id:1, producto:'Hamburguesa Vegana', cantidad:28},
      {id:2, producto:'Ensalada Verde',     cantidad:15},
      {id:3, producto:'Bowl de Quinoa',     cantidad:22},
      {id:4, producto:'Wrap de Falafel',    cantidad:18},
      {id:5, producto:'Smoothie Detox',     cantidad:31},
      {id:6, producto:'Pizza Vegana',       cantidad:12},
      {id:7, producto:'Tacos de Tofu',      cantidad:19},
      {id:8, producto:'Brownie Raw',        cantidad:25}
    ],
    stock: [
      {id:1, nombre:'Tofu orgánico',       fecha:'2026-03-20', ubicacion:'Depósito A', precio:2.00,  cantidad: 20},
      {id:2, nombre:'Lechuga romana',      fecha:'2026-03-22', ubicacion:'Heladera 1', precio:0.80,  cantidad: 15},
      {id:3, nombre:'Garbanzos cocidos',   fecha:'2026-03-18', ubicacion:'Depósito B', precio:1.20,  cantidad: 5},
      {id:4, nombre:'Quinoa real',         fecha:'2026-03-15', ubicacion:'Depósito A', precio:3.00,  cantidad: 10},
      {id:5, nombre:'Harina de almendras', fecha:'2026-03-10', ubicacion:'Depósito C', precio:4.00,  cantidad: 0},
      {id:6, nombre:'Leche de coco',       fecha:'2026-03-21', ubicacion:'Heladera 2', precio:1.50,  cantidad: 8}
    ],
    empleados: [
      {nombre:'Ana Rodríguez',   dni:'12345678', telefono:'011-222-3344', sueldo:500, puesto:'Cajera',   horas:40},
      {nombre:'Carlos Méndez',   dni:'23456789', telefono:'011-333-4455', sueldo:450, puesto:'Cocinero', horas:35},
      {nombre:'Lucía Fernández', dni:'34567890', telefono:'011-444-5566', sueldo:520, puesto:'Gerente',  horas:48},
      {nombre:'Tomás Paz',       dni:'45678901', telefono:'011-555-6677', sueldo:480, puesto:'Mozo',     horas:38}
    ],
    pedidos: [],
    mesas: [1,2,3,4,5],
    ingredientes: {
      1:  [{ nombre:'Tofu orgánico', cantidad: 1 }],
      2:  [{ nombre:'Lechuga romana', cantidad: 1 }],
      3:  [{ nombre:'Quinoa real', cantidad: 1 }],
      4:  [{ nombre:'Garbanzos cocidos', cantidad: 1 }],
      5:  [{ nombre:'Leche de coco', cantidad: 1 }],
      6:  [{ nombre:'Harina de almendras', cantidad: 1 }],
      7:  [{ nombre:'Leche de coco', cantidad: 1 }],
      8:  [{ nombre:'Harina de almendras', cantidad: 1 }],
      9:  [{ nombre:'Tofu orgánico', cantidad: 1 }, { nombre:'Lechuga romana', cantidad: 1 }],
      10: [{ nombre:'Garbanzos cocidos', cantidad: 1 }, { nombre:'Quinoa real', cantidad: 1 }]
    }
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaults));
      const data = JSON.parse(raw);
      if (!data.mesas) data.mesas = [1,2,3,4,5];
      if (data.empleados) {
        data.empleados = data.empleados.map(e => ({ puesto:'', horas:0, ...e }));
      }
      if (data.productos) {
        const defProds = defaults.productos;
        data.productos = data.productos.map(p => {
          const d = defProds.find(x => x.id === p.id);
          return { categoria: d ? d.categoria : 'comida', ingredientes: d ? d.ingredientes : [], ...p };
        });
      }
      return data;
    } catch(e) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e) {}
  }

  function reset() {
    localStorage.removeItem(KEY);
    return JSON.parse(JSON.stringify(defaults));
  }

  function getMaxStock(productoId, stockArray, ingredientesMap) {
    const reqs = ingredientesMap[productoId];
    if (!reqs || reqs.length === 0) return Infinity;
    let max = Infinity;
    for (const req of reqs) {
      const s = stockArray.find(s => s.nombre === req.nombre);
      const disponible = s ? (s.cantidad || 0) : 0;
      max = Math.min(max, Math.floor(disponible / req.cantidad));
    }
    return max === Infinity ? 0 : max;
  }

  return { load, save, reset, getMaxStock };
})();

// ─── TOAST ───
function showToast(msg, type = 'ok') {
  let tc = document.getElementById('toast-container');
  if (!tc) {
    tc = document.createElement('div');
    tc.id = 'toast-container';
    tc.className = 'toast-container';
    document.body.appendChild(tc);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'err' ? ' err' : '');
  t.innerHTML = (type === 'ok' ? '✅' : '❌') + ' ' + msg;
  tc.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── MODAL ───
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.querySelectorAll('#'+id+' .form-error').forEach(e => e.style.display='none');
}

// ─── CONFIRM MODAL ───
function openConfirm(title, msg, onConfirm) {
  let overlay = document.getElementById('modal-confirm-global');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-confirm-global';
    overlay.innerHTML = `
      <div class="modal" style="max-width:380px;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:0.5rem">⚠️</div>
        <h2 id="confirm-title" style="margin-bottom:0.5rem"></h2>
        <p id="confirm-msg" style="font-size:0.88rem;color:var(--text-mid);margin-bottom:1.5rem;font-weight:600"></p>
        <div class="modal-actions" style="justify-content:center;gap:12px">
          <button class="btn btn-sand" id="confirm-cancel-btn">Cancelar</button>
          <button class="btn btn-danger" id="confirm-ok-btn">Eliminar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  }
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-cancel-btn').onclick = () => overlay.classList.remove('open');
  document.getElementById('confirm-ok-btn').onclick = () => { overlay.classList.remove('open'); onConfirm(); };
  overlay.classList.add('open');
}

// ─── SIDEBAR ACTIVE ───
function setActiveNav(page) {
  document.querySelectorAll('.sidebar a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page+'.html');
  });
}
