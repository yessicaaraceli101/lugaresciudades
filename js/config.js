// ============================================================
//  CONFIGURACIÓN — cambiá estos valores sin tocar el resto
// ============================================================
const CONFIG = {
  nombreApp: "Guía PY",
  // Tu número de WhatsApp (formato internacional, sin + ni espacios)
  whatsappAdmin: "595981000000",

  // ¿Está activo el período gratis de lanzamiento?
  lanzamientoGratis: true,

  planes: [
    {
      id: "basico",
      nombre: "Básico",
      precio: 0,
      nota: "Gratis siempre",
      beneficios: ["Aparecés en la lista y el mapa", "Dirección, horario y teléfono", "Botón de WhatsApp"]
    },
    {
      id: "destacado",
      nombre: "Destacado",
      precio: 99000,
      nota: "Gratis en el lanzamiento",
      recomendado: true,
      beneficios: ["Primero en tu categoría", "Pin naranja más grande en el mapa", "Fotos y descripción larga", "Estadísticas de visitas"]
    },
    {
      id: "premium",
      nombre: "Premium",
      precio: 199000,
      nota: "Gratis en el lanzamiento",
      beneficios: ["Todo lo de Destacado", "Banner publicitario en tu ciudad", "Promos y ofertas semanales", "Aparecés en ciudades cercanas"]
    }
  ],

  categorias: [
    { id: "comer", nombre: "Comer" },
    { id: "farmacia", nombre: "Farmacias" },
    { id: "turismo", nombre: "Turismo" },
    { id: "hotel", nombre: "Hoteles" },
    { id: "super", nombre: "Súper" },
    { id: "salud", nombre: "Salud" },
    { id: "cajero", nombre: "Cajeros" },
    { id: "combustible", nombre: "Combustible" }
  ]
};
