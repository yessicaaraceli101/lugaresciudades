// ============================================================
//  Guía PY — lógica principal
// ============================================================
(() => {
  const $ = s => document.querySelector(s);
  const catById = Object.fromEntries(CONFIG.categorias.map(c => [c.id, c]));
  catById.turismo = catById.turismo || { id: "turismo", nombre: "Turismo" };

  // Reemplazar marcadores <i data-icon> del HTML por SVG
  function iconosEstaticos(raiz = document) {
    raiz.querySelectorAll("i[data-icon]").forEach(el => { el.outerHTML = icono(el.dataset.icon, Number(el.dataset.size) || 20); });
  }

  // ---------- Almacenamiento local seguro ----------
  function leer(k) { try { return JSON.parse(localStorage.getItem("guiapy:" + k)); } catch { return null; } }
  function guardar(k, v) { try { localStorage.setItem("guiapy:" + k, JSON.stringify(v)); } catch {} }

  // ---------- Departamento y ciudad ----------
  // Ids de la versión anterior → ids nuevos (para quien ya tenía la app)
  const IDS_VIEJOS = { cde: "ciudad-del-este", sanber: "san-bernardino", pjc: "pedro-juan-caballero", oviedo: "coronel-oviedo" };
  const ciudadesDe = depto => CIUDADES.filter(c => c.depto === depto);
  // Un departamento con una sola ciudad (la Capital) la elige directamente;
  // los demás arrancan en "Todas las ciudades".
  const ciudadPorDefecto = depto => { const cs = ciudadesDe(depto); return cs.length === 1 ? cs[0].id : null; };

  function zonaInicial() {
    let ciudad = leer("ciudad"), depto = leer("depto");
    if (ciudad && !CIUDAD_BY_ID[ciudad]) ciudad = IDS_VIEJOS[ciudad] || null;
    if (ciudad) depto = CIUDAD_BY_ID[ciudad].depto;
    if (!DEPTO_BY_ID[depto]) return { depto: "capital", ciudad: "asuncion" };
    return { depto, ciudad: ciudad || ciudadPorDefecto(depto) };
  }

  const zona = zonaInicial();
  const estado = {
    depto: zona.depto,
    ciudad: zona.ciudad,   // null = todo el departamento
    cat: null,
    q: "",
    abierto: false,
    yo: null,              // {lat,lng} si el usuario comparte ubicación
    vista: "explorar",
    favs: new Set(leer("favs") || [])
  };

  const nombreZona = () => CIUDAD_BY_ID[estado.ciudad]?.nombre || DEPTO_BY_ID[estado.depto].nombre;
  const enZona = l => estado.ciudad ? l.ciudad === estado.ciudad : CIUDAD_BY_ID[l.ciudad]?.depto === estado.depto;

  function elegirZona(depto, ciudad) {
    estado.depto = depto; estado.ciudad = ciudad;
    guardar("depto", depto); guardar("ciudad", ciudad);
    pintarUbicacion(); pintarLista();
  }

  // ---------- Utilidades ----------
  const gs = n => "Gs. " + n.toLocaleString("es-PY");
  function distanciaKm(a, b) {
    const R = 6371, r = x => x * Math.PI / 180;
    const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function abierto(horario) {
    if (horario === "24h") return true;
    const [ini, fin] = horario.split("-").map(t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; });
    const d = new Date(), ahora = d.getHours() * 60 + d.getMinutes();
    return fin > ini ? ahora >= ini && ahora < fin : ahora >= ini || ahora < fin; // cruza medianoche
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // ---------- Filtrado ----------
  function filtrados() {
    const q = norm(estado.q.trim());
    let res = LUGARES.filter(l =>
      enZona(l) &&
      (!estado.cat || l.cat === estado.cat) &&
      (!estado.abierto || abierto(l.horario)) &&
      (!q || norm(l.nombre + " " + l.tipo + " " + (catById[l.cat]?.nombre || "") + " " + (CIUDAD_BY_ID[l.ciudad]?.nombre || "")).includes(q))
    );
    res.forEach(l => l._dist = estado.yo ? distanciaKm(estado.yo, l) : null);
    res.sort((a, b) =>
      (b.destacado - a.destacado) ||
      (estado.yo ? a._dist - b._dist : a.nombre.localeCompare(b.nombre)));
    return res;
  }

  // ---------- Encabezado ----------
  function pintarNanduti() {
    const g = $("#rayos"); let html = "";
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      html += `<line x1="${100 + Math.cos(a) * 18}" y1="${100 + Math.sin(a) * 18}" x2="${100 + Math.cos(a) * 92}" y2="${100 + Math.sin(a) * 92}"/>`;
    }
    g.innerHTML = html;
  }
  function pintarUbicacion() {
    const d = DEPTO_BY_ID[estado.depto], c = CIUDAD_BY_ID[estado.ciudad];
    const ciudades = ciudadesDe(d.id);
    $("#deptoSelect").value = d.id;
    $("#citySelect").innerHTML =
      (ciudades.length > 1 ? `<option value="">Todas las ciudades (${ciudades.length})</option>` : "") +
      ciudades.map(x => `<option value="${x.id}">${esc(x.nombre)}</option>`).join("");
    $("#citySelect").value = c ? c.id : "";
    $("#cityName").textContent = c ? c.nombre : d.nombre;
    $("#citySub").textContent = c ? c.sub : `Todas sus ciudades. Tocá el nombre para elegir una.`;
    document.title = `${nombreZona()} · ${CONFIG.nombreApp}`;
  }

  // ---------- Categorías ----------
  function pintarCategorias() {
    $("#cats").innerHTML = CONFIG.categorias.map(c =>
      `<button class="cat" type="button" data-cat="${c.id}" aria-pressed="${estado.cat === c.id}">${icono(c.id, 18)}${esc(c.nombre)}</button>`).join("");
  }

  // ---------- Tarjeta de lugar ----------
  function tarjeta(l, conCiudad = false) {
    const ab = abierto(l.horario);
    const ciudad = conCiudad ? `<span>${esc(CIUDAD_BY_ID[l.ciudad]?.nombre || "")}</span><span class="sep"></span>` : "";
    return `<button class="place ${l.destacado ? "destacado" : ""}" type="button" data-id="${l.id}">
      ${icono(l.cat, 22)}
      <span>
        ${l.destacado ? `<span class="dest">${icono("estrella", 12)}Destacado</span>` : ""}
        <h3>${esc(l.nombre)}</h3>
        <span class="meta">
          <span>${esc(l.tipo)}</span><span class="sep"></span>${ciudad}
          <span class="${ab ? "abierto" : "cerrado"}">${ab ? "Abierto" : "Cerrado"}</span>
        </span>
      </span>
      <span class="dist">${l._dist != null ? (l._dist < 1 ? Math.round(l._dist * 1000) + " m" : l._dist.toFixed(1) + " km") : ""}</span>
    </button>`;
  }

  function pintarLista() {
    const res = filtrados();
    const sinFiltros = !estado.cat && !estado.q.trim() && !estado.abierto;
    $("#count").textContent = res.length === 1 ? "1 lugar" : `${res.length} lugares`;
    $("#list").innerHTML = res.length ? res.map(l => tarjeta(l, !estado.ciudad)).join("") :
      sinFiltros
        ? `<div class="empty">${icono("negocio", 28)}<strong>Todavía no hay lugares cargados en ${esc(nombreZona())}</strong>Estamos sumando ciudades de todo el país. Si tenés un negocio acá, podés ser el primero.<button class="btn btn-sec" type="button" data-goto="negocios">Registrar mi negocio</button></div>`
        : `<div class="empty">${icono("buscar", 28)}<strong>No hay lugares con esos filtros</strong>Probá otra categoría, quitá “Abierto ahora” o buscá otra palabra.</div>`;
    if (estado.vista === "mapa") pintarMapa(res);
  }

  function pintarFavoritos() {
    const res = LUGARES.filter(l => estado.favs.has(l.id));
    $("#favList").innerHTML = res.length ? res.map(l => tarjeta(l, true)).join("") :
      `<div class="empty">${icono("guardar", 28)}<strong>Todavía no guardaste lugares</strong>Abrí un lugar y tocá “Guardar” para tenerlo a mano.</div>`;
  }

  // ---------- Mapa (Leaflet + OpenStreetMap vía CARTO) ----------
  let mapa, capa, marcadorYo;
  function iniciarMapa() {
    if (mapa || typeof L === "undefined") return;
    mapa = L.map("map", { zoomControl: true });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(mapa);
    capa = L.layerGroup().addTo(mapa);
  }
  function pintarMapa(res = filtrados()) {
    iniciarMapa(); if (!mapa) return;
    setTimeout(() => mapa.invalidateSize(), 50);
    capa.clearLayers();
    const c = CIUDAD_BY_ID[estado.ciudad], d = DEPTO_BY_ID[estado.depto];
    const puntos = [];
    res.forEach(l => {
      const marca = L.divIcon({
        className: "", iconSize: l.destacado ? [40, 40] : [34, 34], iconAnchor: l.destacado ? [20, 40] : [17, 34],
        html: `<div class="pin ${l.destacado ? "destacado" : ""}">${icono(l.cat, l.destacado ? 17 : 15)}</div>`
      });
      L.marker([l.lat, l.lng], { icon: marca, zIndexOffset: l.destacado ? 1000 : 0 })
        .bindPopup(`<b>${esc(l.nombre)}</b><br>${esc(l.tipo)}<br><button class="popup-btn" data-id="${l.id}">Ver ficha</button>`)
        .addTo(capa);
      puntos.push([l.lat, l.lng]);
    });
    if (estado.yo) puntos.push([estado.yo.lat, estado.yo.lng]);
    if (puntos.length > 1) mapa.fitBounds(puntos, { padding: [40, 40], maxZoom: 15 });
    else if (puntos.length === 1) mapa.setView(puntos[0], 14);
    else if (c && c.lat != null) mapa.setView([c.lat, c.lng], 14);
    else mapa.setView([d.lat, d.lng], 9);   // ciudad sin coordenadas o todo el departamento
  }

  // ---------- Ficha ----------
  function abrirFicha(id) {
    const l = LUGARES.find(x => x.id === Number(id)); if (!l) return;
    const ab = abierto(l.horario), fav = estado.favs.has(l.id);
    const c = CIUDAD_BY_ID[l.ciudad];
    const ciudad = c ? c.nombre + (c.depto !== "capital" ? ", " + DEPTO_BY_ID[c.depto].nombre : "") : "";
    const tel = l.telefono ? "595" + l.telefono.replace(/^0/, "") : "";
    const ruta = `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`;
    const horario = l.horario === "24h" ? "Abierto las 24 horas" : "De " + l.horario.replace("-", " a ") + " h";
    $("#sheet").innerHTML = `
      <div class="grip"></div>
      <button class="btn-close" type="button" aria-label="Cerrar" data-close>${icono("cerrar", 18)}</button>
      <div class="sheet-cat">${icono(l.cat, 16)}${esc(l.tipo)}</div>
      <h2 id="sheetTitle">${esc(l.nombre)}</h2>
      ${l.destacado ? `<span class="dest">${icono("estrella", 12)}Destacado</span>` : ""}
      <p class="desc">${esc(l.desc)}</p>
      <div class="info-rows">
        <div class="info-row">${icono("reloj", 20)}<div><small>Horario</small>${esc(horario)} · <span class="${ab ? "abierto" : "cerrado"}">${ab ? "Abierto ahora" : "Cerrado ahora"}</span></div></div>
        <div class="info-row">${icono("pin", 20)}<div><small>Ubicación</small>${l.direccion ? esc(l.direccion) + ", " : ""}${esc(ciudad)}${l._dist != null ? ` · a ${l._dist.toFixed(1)} km` : ""}</div></div>
        ${l.telefono ? `<div class="info-row">${icono("telefono", 20)}<div><small>Teléfono</small>${esc(l.telefono)}</div></div>` : ""}
      </div>
      <div class="actions">
        <a class="btn btn-primary" href="${ruta}" target="_blank" rel="noopener">${icono("ruta", 18)}Cómo llegar</a>
        ${tel ? `<a class="btn btn-verde" href="https://wa.me/${tel}" target="_blank" rel="noopener">${icono("mensaje", 18)}WhatsApp</a>`
              : `<button class="btn btn-verde" type="button" data-share="${l.id}">${icono("compartir", 18)}Compartir</button>`}
        ${tel ? `<a class="btn btn-sec" href="tel:${esc(l.telefono)}">${icono("telefono", 18)}Llamar</a>` : ""}
        <button class="btn btn-sec" type="button" data-fav="${l.id}">${fav ? icono("guardado", 18) + "Guardado" : icono("guardar", 18) + "Guardar"}</button>
      </div>
      ${l.ejemplo ? `<div class="aviso">${icono("info", 18)}<div>Este es un comercio de ejemplo. ¿Es tu negocio? Registralo gratis desde la pestaña Negocios.</div></div>` : ""}
    `;

    $("#sheet").hidden = false; $("#backdrop").hidden = false;
    $("#sheet").querySelector("[data-close]").focus();
  }
  function cerrarFicha() { $("#sheet").hidden = true; $("#backdrop").hidden = true; }

  // ---------- Negocios ----------
  function pintarNegocios() {
    $("#plans").innerHTML = CONFIG.planes.map(p => `
      <article class="plan ${p.recomendado ? "recom" : ""}">
        ${p.recomendado ? '<span class="recom-tag">Recomendado</span>' : ""}
        <h3>${esc(p.nombre)}</h3>
        <div class="precio">${p.precio ? gs(p.precio) : "Gratis"} ${p.precio ? "<small>/ mes</small>" : ""}</div>
        ${p.precio && CONFIG.lanzamientoGratis ? `<div class="nota">${esc(p.nota)}</div>` : ""}
        <ul>${p.beneficios.map(b => `<li>${icono("check", 18)}<span>${esc(b)}</span></li>`).join("")}</ul>
      </article>`).join("");
    // Ciudades agrupadas por departamento
    $("#bizCity").innerHTML = DEPARTAMENTOS.map(d =>
      `<optgroup label="${esc(d.nombre)}">${ciudadesDe(d.id).map(c => `<option value="${c.id}">${esc(c.nombre)}</option>`).join("")}</optgroup>`).join("");
    $("#bizCat").innerHTML = CONFIG.categorias.map(c => `<option>${esc(c.nombre)}</option>`).join("");
    $("#bizPlan").innerHTML = CONFIG.planes.map(p => `<option>${esc(p.nombre)}</option>`).join("");
  }

  // ---------- Vistas ----------
  function cambiarVista(v) {
    estado.vista = v;
    document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("active", b.dataset.view === v));
    ["explorar", "mapa", "favoritos", "negocios"].forEach(x => $("#view-" + x).hidden = x !== v);
    const filtros = v === "explorar" || v === "mapa";
    $("#cats").hidden = !filtros; $("#toolbar").hidden = !filtros;
    if (v === "mapa") pintarMapa();
    if (v === "favoritos") pintarFavoritos();
    if (v === "negocios" && estado.ciudad) $("#bizCity").value = estado.ciudad;
    window.scrollTo({ top: 0 });
  }

  // ---------- Eventos ----------
  $("#deptoSelect").innerHTML = DEPARTAMENTOS.map(d => `<option value="${d.id}">${esc(d.nombre)}</option>`).join("");
  $("#deptoSelect").addEventListener("change", e => elegirZona(e.target.value, ciudadPorDefecto(e.target.value)));
  $("#citySelect").addEventListener("change", e => elegirZona(estado.depto, e.target.value || null));

  $("#searchInput").addEventListener("input", e => { estado.q = e.target.value; pintarLista(); });
  $("#openNow").addEventListener("change", e => { estado.abierto = e.target.checked; pintarLista(); });

  $("#cats").addEventListener("click", e => {
    const b = e.target.closest(".cat"); if (!b) return;
    estado.cat = estado.cat === b.dataset.cat ? null : b.dataset.cat;
    pintarCategorias(); pintarLista();
  });

  $("#nearMe").addEventListener("click", () => {
    const btn = $("#nearMe"), txt = btn.querySelector("span");
    if (estado.yo) {
      estado.yo = null; btn.setAttribute("aria-pressed", "false"); txt.textContent = "Cerca de mí";
      if (marcadorYo) marcadorYo.remove(); pintarLista(); return;
    }
    if (!navigator.geolocation) { alert("Tu navegador no permite ubicar tu posición."); return; }
    txt.textContent = "Ubicando…";
    navigator.geolocation.getCurrentPosition(pos => {
      estado.yo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      // Busca la ciudad con coordenadas más cercana y pasa a su departamento
      const cerca = CIUDADES.filter(c => c.lat != null)
        .reduce((a, c) => distanciaKm(estado.yo, c) < distanciaKm(estado.yo, a) ? c : a);
      if (distanciaKm(estado.yo, cerca) < 40) {
        estado.depto = cerca.depto; estado.ciudad = ciudadPorDefecto(cerca.depto);
        guardar("depto", estado.depto); guardar("ciudad", estado.ciudad);
        pintarUbicacion();
      }
      btn.setAttribute("aria-pressed", "true"); txt.textContent = "Más cerca primero";
      iniciarMapa();
      if (mapa) {
        if (marcadorYo) marcadorYo.remove();
        marcadorYo = L.marker([estado.yo.lat, estado.yo.lng], { icon: L.divIcon({ className: "", html: '<div class="me-dot"></div>', iconSize: [16, 16] }) }).addTo(mapa);
      }
      pintarLista();
    }, () => { txt.textContent = "Cerca de mí"; alert("No pudimos obtener tu ubicación. Revisá los permisos del navegador."); },
    { enableHighAccuracy: true, timeout: 10000 });
  });

  document.addEventListener("click", e => {
    const card = e.target.closest("[data-id]"); if (card) return abrirFicha(card.dataset.id);
    if (e.target.closest("[data-close]") || e.target.id === "backdrop") return cerrarFicha();
    const ir = e.target.closest("[data-goto]"); if (ir) return cambiarVista(ir.dataset.goto);
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const id = Number(fav.dataset.fav);
      estado.favs.has(id) ? estado.favs.delete(id) : estado.favs.add(id);
      guardar("favs", [...estado.favs]);
      fav.innerHTML = estado.favs.has(id) ? icono("guardado", 18) + "Guardado" : icono("guardar", 18) + "Guardar";
      if (estado.vista === "favoritos") pintarFavoritos();
    }
    const sh = e.target.closest("[data-share]");
    if (sh) {
      const l = LUGARES.find(x => x.id === Number(sh.dataset.share));
      const url = `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
      if (navigator.share) navigator.share({ title: l.nombre, text: `${l.nombre} en ${CONFIG.nombreApp}`, url }).catch(() => {});
      else window.open(url, "_blank");
    }
    const tab = e.target.closest(".tabbar button"); if (tab) cambiarVista(tab.dataset.view);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarFicha(); });

  $("#bizForm").addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const c = CIUDAD_BY_ID[d.ciudad];
    const ciudad = c ? `${c.nombre} (${DEPTO_BY_ID[c.depto].nombre})` : d.ciudad;
    const msg = `Hola! Quiero registrar mi negocio en ${CONFIG.nombreApp}:\n\n` +
      `• Nombre: ${d.nombre}\n• Ciudad: ${ciudad}\n• Rubro: ${d.rubro}\n• Dirección: ${d.direccion}\n• WhatsApp: ${d.telefono}\n• Plan: ${d.plan}`;
    window.open(`https://wa.me/${CONFIG.whatsappAdmin}?text=${encodeURIComponent(msg)}`, "_blank");
  });

  // ---------- Inicio ----------
  iconosEstaticos(); pintarNanduti(); pintarUbicacion(); pintarCategorias(); pintarLista(); pintarNegocios();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();