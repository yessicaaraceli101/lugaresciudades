// ============================================================
//  DATOS — ciudades y lugares.
//  Los lugares turísticos son reales (coordenadas aproximadas).
//  Los comercios son EJEMPLOS para la demo: reemplazalos por
//  negocios reales que se registren (ver README, Fase 2).
// ============================================================

const CIUDADES = [
  { id: "asuncion", nombre: "Asunción", lat: -25.2865, lng: -57.6250, sub: "La capital: costanera, historia y los mejores lomitos." },
  { id: "encarnacion", nombre: "Encarnación", lat: -27.3306, lng: -55.8667, sub: "Playas, carnaval y las misiones jesuíticas cerca." },
  { id: "cde", nombre: "Ciudad del Este", lat: -25.5097, lng: -54.6111, sub: "Compras, Itaipú y los Saltos del Monday." },
  { id: "sanber", nombre: "San Bernardino", lat: -25.3106, lng: -57.2961, sub: "El lago Ypacaraí y el verano paraguayo." },
  { id: "aregua", nombre: "Areguá", lat: -25.3122, lng: -57.3847, sub: "Artesanía, frutillas y el cerro Kõi." },
  { id: "luque", nombre: "Luque", lat: -25.2667, lng: -57.4872, sub: "Guitarras, filigrana y el aeropuerto." },
  { id: "villarrica", nombre: "Villarrica", lat: -25.7500, lng: -56.4333, sub: "La ciudad culta del Guairá." },
  { id: "concepcion", nombre: "Concepción", lat: -23.4064, lng: -57.4344, sub: "La perla del norte, a orillas del río Paraguay." },
  { id: "pjc", nombre: "Pedro Juan Caballero", lat: -22.5472, lng: -55.7333, sub: "Frontera, comercio y el cerro Corá cerca." },
  { id: "oviedo", nombre: "Coronel Oviedo", lat: -25.4167, lng: -56.4500, sub: "Cruce de rutas en el corazón del país." }
];

// Lugares turísticos reales
const TURISMO = [
  { ciudad: "asuncion", nombre: "Panteón Nacional de los Héroes", lat: -25.2822, lng: -57.6350, desc: "Monumento histórico en el microcentro donde descansan los héroes nacionales. Hay cambio de guardia.", horario: "07:00-18:00" },
  { ciudad: "asuncion", nombre: "Palacio de López", lat: -25.2786, lng: -57.6392, desc: "Sede del gobierno, iluminado de noche frente a la bahía.", horario: "24h" },
  { ciudad: "asuncion", nombre: "Costanera de Asunción", lat: -25.2765, lng: -57.6300, desc: "Paseo junto a la bahía, ideal para caminar o andar en bici al atardecer.", horario: "24h" },
  { ciudad: "asuncion", nombre: "Mercado 4", lat: -25.2950, lng: -57.6225, desc: "El mercado popular más grande: comida, yuyos, ropa y de todo.", horario: "05:00-18:00" },
  { ciudad: "asuncion", nombre: "Loma San Jerónimo", lat: -25.2800, lng: -57.6450, desc: "Barrio colorido con escaleras pintadas y vista a la bahía.", horario: "24h" },
  { ciudad: "encarnacion", nombre: "Playa San José", lat: -27.3380, lng: -55.8590, desc: "La playa más famosa del país sobre el río Paraná.", horario: "24h" },
  { ciudad: "encarnacion", nombre: "Costanera de Encarnación", lat: -27.3285, lng: -55.8705, desc: "Varios kilómetros de paseo frente al Paraná.", horario: "24h" },
  { ciudad: "encarnacion", nombre: "Ruinas de Trinidad", lat: -27.1296, lng: -55.7040, desc: "Misión jesuítica, Patrimonio de la Humanidad. A unos 30 km de la ciudad.", horario: "07:00-19:00" },
  { ciudad: "cde", nombre: "Represa de Itaipú", lat: -25.4080, lng: -54.5890, desc: "Una de las hidroeléctricas más grandes del mundo. Tiene visitas guiadas.", horario: "08:00-16:00" },
  { ciudad: "cde", nombre: "Saltos del Monday", lat: -25.5680, lng: -54.6360, desc: "Cataratas de unos 40 metros en Presidente Franco.", horario: "07:00-17:30" },
  { ciudad: "cde", nombre: "Puente de la Amistad", lat: -25.5095, lng: -54.6030, desc: "Une Paraguay con Brasil sobre el río Paraná.", horario: "24h" },
  { ciudad: "sanber", nombre: "Lago Ypacaraí", lat: -25.3050, lng: -57.3000, desc: "El lago más conocido del país, famoso por la canción.", horario: "24h" },
  { ciudad: "aregua", nombre: "Cerro Kõi", lat: -25.3000, lng: -57.3950, desc: "Formaciones de arenisca hexagonales únicas en el mundo.", horario: "07:00-17:00" },
  { ciudad: "aregua", nombre: "Centro histórico de Areguá", lat: -25.3120, lng: -57.3860, desc: "Casonas antiguas, artesanos de cerámica y la iglesia en la colina.", horario: "24h" },
  { ciudad: "luque", nombre: "Centro de Luque", lat: -25.2670, lng: -57.4870, desc: "Talleres de guitarras y joyería en filigrana.", horario: "08:00-19:00" },
  { ciudad: "villarrica", nombre: "Catedral de Villarrica", lat: -25.7810, lng: -56.4460, desc: "Templo emblemático del Guairá.", horario: "07:00-19:00" },
  { ciudad: "concepcion", nombre: "Costanera de Concepción", lat: -23.4040, lng: -57.4420, desc: "Vista al río Paraguay y al puerto.", horario: "24h" },
  { ciudad: "pjc", nombre: "Parque Nacional Cerro Corá", lat: -22.6500, lng: -56.0170, desc: "Sitio histórico del final de la Guerra Grande, rodeado de naturaleza.", horario: "07:00-17:00" }
];

// ---- Generador de comercios de ejemplo (siempre los mismos) ----
const NOMBRES = {
  comer: ["Lomitería Don Pepe", "Parrillada La Chacra", "Pizzería Napoli", "Copetín Mbaretē", "Chipería La Abuela", "Bar El Rincón", "Sushi Kōi", "Empanadas Ña Rosa"],
  farmacia: ["Farmacia Santa Ana", "Farmacia del Centro", "Farmacia San Roque", "Farmacia La Popular"],
  hotel: ["Hotel Guaraní Plaza", "Posada Los Lapachos", "Hostal El Viajero"],
  super: ["Supermercado El Ahorro", "Súper La Familia", "Autoservicio Don Blas"],
  salud: ["Sanatorio San Luis", "Clínica Integral", "Centro Médico Norte"],
  cajero: ["Cajero Banco Red", "Cajero Infonet", "Cajero Dinelco"],
  combustible: ["Estación Ruta Sur", "Estación Km 5", "Estación La Rotonda"]
};
const SUBTIPOS = {
  comer: ["Lomitos", "Parrilla", "Pizza", "Comida rápida", "Chipa y café", "Bar", "Sushi", "Empanadas"],
  farmacia: ["Farmacia"], hotel: ["Hotel", "Posada", "Hostal"], super: ["Supermercado"],
  salud: ["Sanatorio", "Clínica", "Centro médico"], cajero: ["Cajero 24 h"], combustible: ["Estación de servicio"]
};
const HORARIOS = {
  comer: ["11:00-23:30", "18:00-01:00", "07:00-21:00"],
  farmacia: ["24h", "07:00-22:00"],
  hotel: ["24h"], super: ["07:00-22:00", "08:00-21:00"],
  salud: ["24h"], cajero: ["24h"], combustible: ["24h", "06:00-22:00"]
};
const CALLES = ["Mcal. López", "España", "Eusebio Ayala", "Artigas", "Mcal. Estigarribia", "25 de Mayo", "Gral. Díaz", "Independencia Nacional", "Carlos A. López", "Ruta PY02"];

function semilla(s) { let x = 0; for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }

function generarLugares() {
  const lugares = [];
  let id = 1;
  TURISMO.forEach(t => lugares.push({
    id: id++, ciudad: t.ciudad, cat: "turismo", nombre: t.nombre, tipo: "Lugar turístico",
    lat: t.lat, lng: t.lng, desc: t.desc, horario: t.horario, direccion: "", telefono: "", destacado: false, ejemplo: false
  }));

  CIUDADES.forEach(c => {
    const rnd = semilla(c.id);
    Object.keys(NOMBRES).forEach(cat => {
      const cant = c.id === "asuncion" ? NOMBRES[cat].length : Math.min(NOMBRES[cat].length, cat === "comer" ? 5 : 2);
      for (let i = 0; i < cant; i++) {
        const sub = SUBTIPOS[cat][i % SUBTIPOS[cat].length];
        lugares.push({
          id: id++, ciudad: c.id, cat,
          nombre: NOMBRES[cat][i],
          tipo: sub,
          lat: c.lat + (rnd() - 0.5) * 0.035,
          lng: c.lng + (rnd() - 0.5) * 0.035,
          desc: `${sub} en ${c.nombre}. Este es un comercio de ejemplo para la demostración.`,
          horario: HORARIOS[cat][Math.floor(rnd() * HORARIOS[cat].length)],
          direccion: `${CALLES[Math.floor(rnd() * CALLES.length)]} c/ ${CALLES[Math.floor(rnd() * CALLES.length)]}`,
          telefono: "0981" + String(Math.floor(100000 + rnd() * 899999)),
          destacado: i === 0 && ["comer", "farmacia", "hotel"].includes(cat),
          ejemplo: true
        });
      }
    });
  });
  return lugares;
}

const LUGARES = generarLugares();
