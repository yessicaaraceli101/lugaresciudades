// ============================================================
//  DATOS — departamentos, ciudades y lugares.
//  Los lugares turísticos son reales (coordenadas aproximadas).
//  Los comercios son EJEMPLOS para la demo: reemplazalos por
//  negocios reales que se registren (ver README, Fase 2).
// ============================================================

// ---- Los 17 departamentos + la Capital, con sus distritos ----
// lat/lng del departamento = punto donde se centra el mapa
// cuando una ciudad todavía no tiene coordenadas propias.
const DEPARTAMENTOS = [
  { id: "capital", nombre: "Asunción (Capital)", lat: -25.2865, lng: -57.6250, ciudades: ["Asunción"] },
  { id: "alto-paraguay", nombre: "Alto Paraguay", lat: -21.0417, lng: -57.8733, ciudades: [
    "Fuerte Olimpo", "Bahía Negra", "Carmelo Peralta", "Puerto Casado"] },
  { id: "alto-parana", nombre: "Alto Paraná", lat: -25.5097, lng: -54.6111, ciudades: [
    "Ciudad del Este", "Doctor Juan León Mallorquín", "Doctor Raúl Peña", "Domingo Martínez de Irala",
    "Hernandarias", "Iruña", "Itakyry", "Juan Emilio O'Leary", "Los Cedrales", "Mbaracayú", "Minga Guazú",
    "Minga Porá", "Naranjal", "Ñacunday", "Presidente Franco", "San Alberto", "San Cristóbal",
    "Santa Fe del Paraná", "Santa Rita", "Santa Rosa del Monday", "Tavapy", "Yguazú"] },
  { id: "amambay", nombre: "Amambay", lat: -22.5472, lng: -55.7333, ciudades: [
    "Pedro Juan Caballero", "Bella Vista Norte", "Capitán Bado", "Karapaí", "Zanja Pytã"] },
  { id: "boqueron", nombre: "Boquerón", lat: -22.3500, lng: -60.0333, ciudades: [
    "Filadelfia", "Loma Plata", "Mariscal Estigarribia"] },
  { id: "caaguazu", nombre: "Caaguazú", lat: -25.4167, lng: -56.4500, ciudades: [
    "Coronel Oviedo", "Caaguazú", "Carayaó", "Doctor Cecilio Báez", "Doctor J. Eulogio Estigarribia",
    "Doctor Juan Manuel Frutos", "José Domingo Ocampos", "La Pastora", "Mariscal Francisco Solano López",
    "Nueva Londres", "Nueva Toledo", "R.I. 3 Corrales", "Raúl Arsenio Oviedo", "Repatriación",
    "San Joaquín", "San José de los Arroyos", "Santa Rosa del Mbutuy", "Simón Bolívar", "Tembiaporá",
    "Tres de Febrero", "Vaquería", "Yhú"] },
  { id: "caazapa", nombre: "Caazapá", lat: -26.1953, lng: -56.3681, ciudades: [
    "Caazapá", "Abaí", "Buena Vista", "Doctor Moisés S. Bertoni", "General Higinio Morínigo", "Maciel",
    "San Juan Nepomuceno", "Tavaí", "Tres de Mayo", "Yegros", "Yuty"] },
  { id: "canindeyu", nombre: "Canindeyú", lat: -24.0625, lng: -54.3083, ciudades: [
    "Salto del Guairá", "Corpus Christi", "Curuguaty", "Francisco Caballero Álvarez", "Itanará", "Katueté",
    "La Paloma del Espíritu Santo", "Laurel", "Maracaná", "Nueva Esperanza", "Puerto Adela",
    "Villa Ygatimí", "Yasy Cañy", "Ybyrarobaná", "Yby Pytã", "Ypejhú"] },
  { id: "central", nombre: "Central", lat: -25.3900, lng: -57.5000, ciudades: [
    "Areguá", "Capiatá", "Fernando de la Mora", "Guarambaré", "Itá", "Itauguá", "J. Augusto Saldívar",
    "Lambaré", "Limpio", "Luque", "Mariano Roque Alonso", "Nueva Italia", "Ñemby", "San Antonio",
    "San Lorenzo", "Villa Elisa", "Villeta", "Ypacaraí", "Ypané"] },
  { id: "concepcion", nombre: "Concepción", lat: -23.4064, lng: -57.4344, ciudades: [
    "Concepción", "Arroyito", "Azotey", "Belén", "Horqueta", "Loreto", "Paso Barreto", "San Alfredo",
    "San Carlos del Apa", "San Lázaro", "Sargento José Félix López", "Yby Yaú"] },
  { id: "cordillera", nombre: "Cordillera", lat: -25.3861, lng: -57.1403, ciudades: [
    "Caacupé", "Altos", "Arroyos y Esteros", "Atyrá", "Caraguatay", "Emboscada", "Eusebio Ayala",
    "Isla Pucú", "Itacurubí de la Cordillera", "Juan de Mena", "Loma Grande", "Mbocayaty del Yhaguy",
    "Nueva Colombia", "Piribebuy", "Primero de Marzo", "San Bernardino", "San José Obrero",
    "Santa Elena", "Tobatí", "Valenzuela"] },
  { id: "guaira", nombre: "Guairá", lat: -25.7500, lng: -56.4333, ciudades: [
    "Villarrica", "Borja", "Colonia Independencia", "Coronel Martínez", "Doctor Bottrell",
    "Eugenio A. Garay", "Félix Pérez Cardozo", "Itapé", "Iturbe", "José Fassardi",
    "Mbocayaty del Guairá", "Natalicio Talavera", "Ñumí", "Paso Yobái", "San Salvador", "Tebicuary",
    "Yataity"] },
  { id: "itapua", nombre: "Itapúa", lat: -27.3306, lng: -55.8667, ciudades: [
    "Encarnación", "Alto Verá", "Bella Vista", "Cambyretá", "Capitán Meza", "Capitán Miranda",
    "Carlos Antonio López", "Carmen del Paraná", "Coronel Bogado", "Edelira", "Fram", "General Artigas",
    "General Delgado", "Hohenau", "Itapúa Poty", "Jesús", "José Leandro Oviedo", "La Paz",
    "Mayor Julio D. Otaño", "Natalio", "Nueva Alborada", "Obligado", "Pirapó", "San Cosme y Damián",
    "San Juan del Paraná", "San Pedro del Paraná", "San Rafael del Paraná", "Tomás Romero Pereira",
    "Trinidad", "Yatytay"] },
  { id: "misiones", nombre: "Misiones", lat: -26.6694, lng: -57.1453, ciudades: [
    "San Juan Bautista", "Ayolas", "San Ignacio", "San Miguel", "San Patricio", "Santa María",
    "Santa Rosa", "Santiago", "Villa Florida", "Yabebyry"] },
  { id: "neembucu", nombre: "Ñeembucú", lat: -26.8583, lng: -58.3000, ciudades: [
    "Pilar", "Alberdi", "Cerrito", "Desmochados", "General José Eduvigis Díaz", "Guazú Cuá", "Humaitá",
    "Isla Umbú", "Laureles", "Mayor José J. Martínez", "Paso de Patria", "San Juan Bautista de Ñeembucú",
    "Tacuaras", "Villa Franca", "Villa Oliva", "Villalbín"] },
  { id: "paraguari", nombre: "Paraguarí", lat: -25.6203, lng: -57.1464, ciudades: [
    "Paraguarí", "Acahay", "Caapucú", "Carapeguá", "Escobar", "General Bernardino Caballero",
    "La Colmena", "María Antonia", "Mbuyapey", "Pirayú", "Quiindy", "Quyquyhó",
    "Roque González de Santa Cruz", "Sapucai", "Tebicuary-mí", "Yaguarón", "Ybycuí", "Ybytimí"] },
  { id: "presidente-hayes", nombre: "Presidente Hayes", lat: -25.0930, lng: -57.5236, ciudades: [
    "Villa Hayes", "Benjamín Aceval", "General José María Bruguez", "José Falcón", "Nanawa",
    "Puerto Pinasco", "Teniente Esteban Martínez", "Teniente Primero Manuel Irala Fernández"] },
  { id: "san-pedro", nombre: "San Pedro", lat: -24.0917, lng: -57.0833, ciudades: [
    "San Pedro de Ycuamandiyú", "25 de Diciembre", "Antequera", "Capiibary", "Choré",
    "General Elizardo Aquino", "General Francisco Isidoro Resquín", "Guayaibí", "Itacurubí del Rosario",
    "Liberación", "Lima", "Nueva Germania", "San Estanislao", "San Pablo", "San Vicente Pancholo",
    "Santa Rosa del Aguaray", "Tacuatí", "Unión", "Villa del Rosario", "Yataity del Norte", "Yrybucuá"] }
];

// ---- Datos extra por ciudad (la clave es el id: nombre sin tildes, con guiones) ----
// demo: true → se generan comercios de ejemplo en esa ciudad.
// Las ciudades sin lat/lng usan el centro de su departamento en el mapa.
// Para completar las coordenadas que faltan: node tools/coordenadas.mjs
const CIUDADES_INFO = {
  "asuncion": { lat: -25.2865, lng: -57.6250, sub: "La capital: costanera, historia y los mejores lomitos.", demo: true },
  "encarnacion": { lat: -27.3306, lng: -55.8667, sub: "Playas, carnaval y las misiones jesuíticas cerca.", demo: true },
  "ciudad-del-este": { lat: -25.5097, lng: -54.6111, sub: "Compras, Itaipú y los Saltos del Monday.", demo: true },
  "san-bernardino": { lat: -25.3106, lng: -57.2961, sub: "El lago Ypacaraí y el verano paraguayo.", demo: true },
  "aregua": { lat: -25.3122, lng: -57.3847, sub: "Artesanía, frutillas y el cerro Kõi.", demo: true },
  "luque": { lat: -25.2667, lng: -57.4872, sub: "Guitarras, filigrana y el aeropuerto.", demo: true },
  "villarrica": { lat: -25.7500, lng: -56.4333, sub: "La ciudad culta del Guairá.", demo: true },
  "concepcion": { lat: -23.4064, lng: -57.4344, sub: "La perla del norte, a orillas del río Paraguay.", demo: true },
  "pedro-juan-caballero": { lat: -22.5472, lng: -55.7333, sub: "Frontera, comercio y el cerro Corá cerca.", demo: true },
  "coronel-oviedo": { lat: -25.4167, lng: -56.4500, sub: "Cruce de rutas en el corazón del país.", demo: true },

  // Capitales departamentales y ciudades grandes (coordenadas aproximadas)
  "caacupe": { lat: -25.3861, lng: -57.1403, sub: "La capital espiritual del país." },
  "san-lorenzo": { lat: -25.3397, lng: -57.5089 },
  "capiata": { lat: -25.3552, lng: -57.4455 },
  "lambare": { lat: -25.3468, lng: -57.6065 },
  "fernando-de-la-mora": { lat: -25.3300, lng: -57.5500 },
  "limpio": { lat: -25.1661, lng: -57.4856 },
  "nemby": { lat: -25.3949, lng: -57.5357 },
  "mariano-roque-alonso": { lat: -25.2079, lng: -57.5320 },
  "itaugua": { lat: -25.3926, lng: -57.3544 },
  "villa-elisa": { lat: -25.3676, lng: -57.5927 },
  "hernandarias": { lat: -25.4056, lng: -54.6389 },
  "presidente-franco": { lat: -25.5611, lng: -54.6111 },
  "caaguazu": { lat: -25.4667, lng: -56.0167 },
  "san-pedro-de-ycuamandiyu": { lat: -24.0917, lng: -57.0833 },
  "caazapa": { lat: -26.1953, lng: -56.3681 },
  "san-juan-bautista": { lat: -26.6694, lng: -57.1453 },
  "paraguari": { lat: -25.6203, lng: -57.1464 },
  "pilar": { lat: -26.8583, lng: -58.3000 },
  "salto-del-guaira": { lat: -24.0625, lng: -54.3083 },
  "villa-hayes": { lat: -25.0930, lng: -57.5236 },
  "filadelfia": { lat: -22.3500, lng: -60.0333 },
  "fuerte-olimpo": { lat: -21.0417, lng: -57.8733 },
  "valenzuela": { lat: -25.5942, lng: -56.8679 }
};

// ---- Construcción de la lista de ciudades (no hace falta tocar) ----
const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CIUDADES = DEPARTAMENTOS.flatMap(d =>
  [...d.ciudades].sort((a, b) => a.localeCompare(b, "es")).map(nombre => {
    const id = slug(nombre), info = CIUDADES_INFO[id] || {};
    return {
      id, nombre, depto: d.id,
      lat: info.lat ?? null, lng: info.lng ?? null,
      sub: info.sub || (d.id === "capital" ? "La capital del país." : `Departamento ${d.nombre}.`),
      demo: !!info.demo
    };
  }));

const DEPTO_BY_ID = Object.fromEntries(DEPARTAMENTOS.map(d => [d.id, d]));
const CIUDAD_BY_ID = Object.fromEntries(CIUDADES.map(c => [c.id, c]));
if (Object.keys(CIUDAD_BY_ID).length !== CIUDADES.length) console.warn("Guía PY: hay ciudades con el mismo id");

// ---- Lugares turísticos reales ----
const TURISMO = [
  { ciudad: "asuncion", nombre: "Panteón Nacional de los Héroes", lat: -25.2822, lng: -57.6350, desc: "Monumento histórico en el microcentro donde descansan los héroes nacionales. Hay cambio de guardia.", horario: "07:00-18:00" },
  { ciudad: "asuncion", nombre: "Palacio de López", lat: -25.2786, lng: -57.6392, desc: "Sede del gobierno, iluminado de noche frente a la bahía.", horario: "24h" },
  { ciudad: "asuncion", nombre: "Costanera de Asunción", lat: -25.2765, lng: -57.6300, desc: "Paseo junto a la bahía, ideal para caminar o andar en bici al atardecer.", horario: "24h" },
  { ciudad: "asuncion", nombre: "Mercado 4", lat: -25.2950, lng: -57.6225, desc: "El mercado popular más grande: comida, yuyos, ropa y de todo.", horario: "05:00-18:00" },
  { ciudad: "asuncion", nombre: "Loma San Jerónimo", lat: -25.2800, lng: -57.6450, desc: "Barrio colorido con escaleras pintadas y vista a la bahía.", horario: "24h" },
  { ciudad: "encarnacion", nombre: "Playa San José", lat: -27.3380, lng: -55.8590, desc: "La playa más famosa del país sobre el río Paraná.", horario: "24h" },
  { ciudad: "encarnacion", nombre: "Costanera de Encarnación", lat: -27.3285, lng: -55.8705, desc: "Varios kilómetros de paseo frente al Paraná.", horario: "24h" },
  { ciudad: "trinidad", nombre: "Ruinas de Trinidad", lat: -27.1296, lng: -55.7040, desc: "Misión jesuítica, Patrimonio de la Humanidad. A unos 30 km de Encarnación.", horario: "07:00-19:00" },
  { ciudad: "hernandarias", nombre: "Represa de Itaipú", lat: -25.4080, lng: -54.5890, desc: "Una de las hidroeléctricas más grandes del mundo. Tiene visitas guiadas.", horario: "08:00-16:00" },
  { ciudad: "presidente-franco", nombre: "Saltos del Monday", lat: -25.5680, lng: -54.6360, desc: "Cataratas de unos 40 metros en Presidente Franco.", horario: "07:00-17:30" },
  { ciudad: "ciudad-del-este", nombre: "Puente de la Amistad", lat: -25.5095, lng: -54.6030, desc: "Une Paraguay con Brasil sobre el río Paraná.", horario: "24h" },
  { ciudad: "san-bernardino", nombre: "Lago Ypacaraí", lat: -25.3050, lng: -57.3000, desc: "El lago más conocido del país, famoso por la canción.", horario: "24h" },
  { ciudad: "caacupe", nombre: "Basílica de Caacupé", lat: -25.3858, lng: -57.1417, desc: "Santuario de la Virgen de Caacupé, destino de la gran peregrinación de cada 8 de diciembre.", horario: "07:00-19:00" },
  { ciudad: "aregua", nombre: "Cerro Kõi", lat: -25.3000, lng: -57.3950, desc: "Formaciones de arenisca hexagonales únicas en el mundo.", horario: "07:00-17:00" },
  { ciudad: "aregua", nombre: "Centro histórico de Areguá", lat: -25.3120, lng: -57.3860, desc: "Casonas antiguas, artesanos de cerámica y la iglesia en la colina.", horario: "24h" },
  { ciudad: "luque", nombre: "Centro de Luque", lat: -25.2670, lng: -57.4870, desc: "Talleres de guitarras y joyería en filigrana.", horario: "08:00-19:00" },
  { ciudad: "villarrica", nombre: "Catedral de Villarrica", lat: -25.7810, lng: -56.4460, desc: "Templo emblemático del Guairá.", horario: "07:00-19:00" },
  { ciudad: "concepcion", nombre: "Costanera de Concepción", lat: -23.4040, lng: -57.4420, desc: "Vista al río Paraguay y al puerto.", horario: "24h" },
  { ciudad: "pedro-juan-caballero", nombre: "Parque Nacional Cerro Corá", lat: -22.6500, lng: -56.0170, desc: "Sitio histórico del final de la Guerra Grande, rodeado de naturaleza.", horario: "07:00-17:00" }
];

// ---- Lugares y negocios REALES (cargalos acá) ----
// id: un número único que no se repita (seguí 1002, 1003…)
// cat: comer, farmacia, turismo, hotel, super, salud, cajero o combustible
// horario: "07:00-19:00" o "24h"
// telefono: celular sin espacios ("0981123456"); si es fijo, dejalo vacío ("")
const NEGOCIOS = [
  {
    id: 1001,
    ciudad: "valenzuela",
    cat: "salud",
    nombre: "Centro de Salud de Valenzuela",
    tipo: "Centro de salud",
    lat: -25.594204, lng: -56.867949,
    direccion: "",
    telefono: "",
    horario: "07:00-19:00",   // ← confirmar el horario real
    desc: "Centro de salud público de Valenzuela."
  }
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

  // Lugares y negocios reales
  NEGOCIOS.forEach(n => lugares.push({
    ...n, telefono: n.telefono || "", direccion: n.direccion || "", destacado: !!n.destacado, ejemplo: false
  }));

  // Solo las ciudades marcadas con demo: true reciben comercios de ejemplo
  CIUDADES.filter(c => c.demo).forEach(c => {
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