# Guía PY — Todo Paraguay en un lugar

App tipo directorio + mapa: elegís tu ciudad y ves dónde comer, farmacias, lugares turísticos, hoteles, súper, salud, cajeros y combustible. Colores naranja, verde y blanco.

## Qué trae este prototipo

- 10 ciudades de Paraguay (Asunción, Encarnación, CDE, San Bernardino, Areguá, Luque, Villarrica, Concepción, PJC, Cnel. Oviedo).
- 8 categorías, buscador, filtro "Abierto ahora" y "Cerca de mí" (ordena por distancia usando el GPS).
- Mapa con pines por categoría (OpenStreetMap, gratis, sin API key).
- Ficha de cada lugar con botones "Cómo llegar", WhatsApp, Llamar y Guardar.
- Negocios **Destacados** (primero en la lista, pin naranja más grande) → esto es lo que después cobrás.
- Pestaña "Negocios" con los planes y un formulario que te llega por WhatsApp.
- Se puede instalar en el celular como app (PWA).

> Los lugares turísticos son reales. Los comercios son **de ejemplo**; se reemplazan con negocios reales que se registren.

## Cómo probarla

**Opción rápida:** abrí `index.html` con doble clic (todo funciona salvo instalarla como app).

**Opción recomendada (con servidor local):**
```bash
npx serve .
```
y abrí la dirección que te muestra.

## Qué tenés que cambiar primero

Todo está en `js/config.js`:
- `whatsappAdmin`: tu número (ej. `595981123456`).
- Precios de los planes, nombres y beneficios.
- `lanzamientoGratis`: ponelo en `false` cuando empieces a cobrar.

Para agregar ciudades o lugares turísticos: `js/data.js`.

## Publicarla gratis en internet

1. Creá una cuenta en **Netlify** o **Vercel** (gratis).
2. Arrastrá la carpeta del proyecto → te dan un link tipo `guiapy.netlify.app`.
3. Opcional: comprá un dominio `.com.py` en NIC.py o un `.com` y conectalo.

Desde el celular, abrís el link y "Agregar a pantalla de inicio" → queda como una app.

## Hoja de ruta (cómo crecer)

**Fase 1 — Lanzamiento (este prototipo).** Publicala, cargá lugares a mano y salí a registrar negocios gratis. Meta: tener muchos comercios en 2–3 ciudades antes de ampliar.

**Fase 2 — Base de datos.** Pasá los lugares a **Supabase** o **Firebase** (tienen plan gratis) para que los negocios se registren solos y vos los apruebes desde un panel. Los datos iniciales de farmacias, cajeros, etc. los podés importar de OpenStreetMap (licencia abierta, hay que citarlo). **No copies datos de Google Maps**: sus términos lo prohíben.

**Fase 3 — Play Store / App Store.** Envolvé la misma web con **Capacitor** para publicarla como app nativa (Google Play cobra USD 25 una sola vez; Apple USD 99 por año).

**Fase 4 — Cobrar.** Suscripción mensual a los negocios. En Paraguay podés cobrar con **Bancard (vPOS)**, **Pagopar** o transferencias/QR bancarios. Al principio, cobrar por transferencia y activar el plan a mano es suficiente.

## Modelo de negocio sugerido

| Ingreso | Quién paga | Idea de precio |
|---|---|---|
| Plan Destacado | Comercios | Gs. 99.000 / mes |
| Plan Premium + banner | Comercios | Gs. 199.000 / mes |
| Publicidad por ciudad | Marcas grandes | a negociar |

El usuario que busca lugares nunca paga: eso es lo que hace que la app crezca. Vendé primero en una sola ciudad y mostrale al comercio cuántas visitas tuvo su ficha.

## Estructura

```
index.html        → la app
css/styles.css    → diseño y colores
js/config.js      → tu WhatsApp, planes, categorías
js/data.js        → ciudades y lugares
js/app.js         → lógica (filtros, mapa, fichas)
manifest.json, sw.js → para instalarla como app
```
