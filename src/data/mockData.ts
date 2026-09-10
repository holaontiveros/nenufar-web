import { SeasonalCatalog, WorkshopTechnique, PortfolioPiece, ClientReview, FaqItem } from '../types';

export const SEASONAL_CATALOGS: SeasonalCatalog[] = [
  {
    id: 'madre',
    title: 'Día de la Madre',
    subtitle: 'Piezas que abrazan con afecto, luz y memoria',
    seasonName: 'Temporada Mayo & Afecto',
    badge: 'Colección Floral & Madera',
    accentColor: 'rose',
    bgGradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80', // elegant gift box & flowers & warm crafted items
    description: 'Nuestra colección más tierna combina maderas nobles grabadas con dedicatorias manuscritas, acrílicos transparentes con flores preservadas y tazas térmicas en tonos pasteles empaquetadas en cajas regalo listas para entregar.',
    itemsCount: 18,
    downloadName: 'Catalogo-Dia-De-La-Madre-Acento.pdf',
    suggestedPrompt: '¡Hola! Me encantó el catálogo del Día de la Madre. Quisiera información y pedir el kit de joyero de madera y termo pastel.',
    highlightItems: [
      {
        id: 'mad-1',
        name: 'Joyero Roble con Caligrafía Grabada',
        technique: 'Corte y Grabado Láser CO2',
        materials: 'Madera de haya/roble con interior en terciopelo suave',
        priceFrom: 28,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
        tag: 'Más solicitado',
        description: 'Grabado profundo con el nombre o firma manuscrita de los hijos. Cierre magnético de precisión.',
        leadTime: '24 a 48 horas',
        isPopular: true
      },
      {
        id: 'mad-2',
        name: 'Termo Slim Pastel con Inicial Metalizada',
        technique: 'Sublimación Térmica + Vinil Horneado',
        materials: 'Acero inoxidable doble pared 500ml',
        priceFrom: 18,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
        tag: 'Térmico 12h',
        description: 'Mantiene frío o calor por 12 horas. Acabado soft-touch con nombre en tipografía caligráfica.',
        leadTime: '24 horas'
      },
      {
        id: 'mad-3',
        name: 'Marco Acrílico Flotante con Flor Preservada',
        technique: 'Corte Láser en Acrílico Cristal 4mm',
        materials: 'Acrílico óptico virgen y flores botánicas reales',
        priceFrom: 24,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80',
        tag: 'Exclusivo',
        description: 'Diseño flotante translúcido con peana de nogal pulida. Frase o fecha grabada en bajorrelieve.',
        leadTime: '48 horas'
      },
      {
        id: 'mad-4',
        name: 'Tote Bag Lona Orgánica con Retrato Minimalista',
        technique: 'Estampado DTF Premium Alta Resistencia',
        materials: 'Algodón canvas 320g crudo',
        priceFrom: 16,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=700&q=80',
        tag: 'Ecológico',
        description: 'Lona gruesa lavable con diseño vectorial lineal de mamá o familia a partir de tu foto favorita.',
        leadTime: '24 a 48 horas'
      }
    ]
  },
  {
    id: 'padre',
    title: 'Día del Padre',
    subtitle: 'Carácter, maestría y detalles hechos para durar',
    seasonName: 'Temporada Junio & Paternidad',
    badge: 'Acero, Nogal & Cuero',
    accentColor: 'amber',
    bgGradient: 'from-amber-600/10 via-orange-500/5 to-transparent',
    coverImage: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=900&q=80', // wooden craft / leather / rustic refinement
    description: 'Objetos utilitarios de gran presencia: jarras cerveceras térmicas, navajas y destapadores en madera maciza, delantales parrilleros con parche de cuero y botellas de acero grabadas con láser de fibra permanente.',
    itemsCount: 16,
    downloadName: 'Catalogo-Dia-Del-Padre-Acento.pdf',
    suggestedPrompt: '¡Hola! Quisiera ver las opciones del catálogo del Día del Padre, especialmente los tarros cerveceros y el kit parrillero.',
    highlightItems: [
      {
        id: 'pad-1',
        name: 'Tarro Cervecero Mate Térmico 700ml',
        technique: 'Grabado Láser de Fibra Permanente',
        materials: 'Acero inoxidable negro mate y empuñadura ergonómica',
        priceFrom: 22,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1538488881522-4326c3647717?auto=format&fit=crop&w=700&q=80',
        tag: 'Inoxidable',
        description: 'El láser retira el recubrimiento mate revelando el acero reluciente con su apodo, año de estreno como papá o logo de equipo.',
        leadTime: '24 horas',
        isPopular: true
      },
      {
        id: 'pad-2',
        name: 'Kit Parrillero en Nogal y Acero Forjado',
        technique: 'Grabado Láser en Madera y Estuche de Cuero',
        materials: 'Mango en madera dura de nogal y acero inox 430',
        priceFrom: 34,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
        tag: 'Set Premium',
        description: 'Pinzas, espátula y cuchillo grabados individualmente en estuche enrollable de cuero encerado.',
        leadTime: '48 horas'
      },
      {
        id: 'pad-3',
        name: 'Destapador Rústico de Pared con Colector Magnético',
        technique: 'Corte Láser & Tratamiento al Aceite',
        materials: 'Madera de pino recuperado e imanes de neodimio',
        priceFrom: 19,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=700&q=80',
        tag: 'Hecho a mano',
        description: 'Atrapa las corcholatas en el aire antes de caer. Personalizado con apellido familiar o taller personal.',
        leadTime: '24 a 48 horas'
      },
      {
        id: 'pad-4',
        name: 'Gorra Trucker Vintage con Parche de Cuero',
        technique: 'Corte y Grabado Láser en Cuero Curtido',
        materials: 'Sarga de algodón y malla transpirable',
        priceFrom: 15,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80',
        tag: 'Tendencia',
        description: 'Parche cosido a mano con hilo encerado, grabado con emblema personalizado o iniciales.',
        leadTime: '24 horas'
      }
    ]
  },
  {
    id: 'maestro',
    title: 'Día del Maestro',
    subtitle: 'Gratitud genuina para quienes enseñan con el corazón',
    seasonName: 'Temporada Educativa & Agradecimiento',
    badge: 'Organización & Inspiración',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-600/10 via-teal-500/5 to-transparent',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80', // stationery / notebook / warm appreciation
    description: 'Diseños pensados para su día a día en el aula: libretas de pastas rígidas en bambú grabadas a fuego suave, sellos entintados con mensajes motivadores, tazas térmicas con frases memorables y paquetes de stickers impermeables para calificar.',
    itemsCount: 14,
    downloadName: 'Catalogo-Dia-Del-Maestro-Acento.pdf',
    suggestedPrompt: '¡Hola! Nos gustaría cotizar detalles para los maestros de nuestro colegio o para la maestra de mi hijo.',
    highlightItems: [
      {
        id: 'mae-1',
        name: 'Libreta Ejecutiva Bambú con Bolígrafo a Juego',
        technique: 'Grabado Láser en Madera y Metal',
        materials: 'Cubierta de bambú natural y hojas de papel ecológico de 90g',
        priceFrom: 17,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
        tag: 'Favorito colegios',
        description: 'Nombre del maestro(a), materia y dedicatoria en la primera guarda interior. Presentación en caja kraft.',
        leadTime: '24 horas',
        isPopular: true
      },
      {
        id: 'mae-2',
        name: 'Kit de 4 Sellos Calificadores con Estuche',
        technique: 'Grabado Láser en Goma Vulcanizada',
        materials: 'Base de madera torneada y almohadilla entintada',
        priceFrom: 21,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80',
        tag: 'Personalizado',
        description: 'Frases tipo "¡Excelente esfuerzo!", "Revisado por Prof. Carlos" con simpáticas ilustraciones.',
        leadTime: '48 horas'
      },
      {
        id: 'mae-3',
        name: 'Taza Cerámica Latte "Dosis de Paciencia"',
        technique: 'Sublimación Cerámica Vitrificada',
        materials: 'Cerámica pesada calidad AAA apta microondas',
        priceFrom: 11,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
        tag: 'Económico & Lindo',
        description: 'Ilustración llena de color con todos los nombres de los alumnos del grado en la parte posterior.',
        leadTime: '24 horas'
      },
      {
        id: 'mae-4',
        name: 'Pack 50 Stickers Vinílicos Impermeables',
        technique: 'Impresión Láser UV + Troquelado de Precisión',
        materials: 'Vinil mate laminado anti-rayaduras',
        priceFrom: 12,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
        tag: 'Pack 50 unidades',
        description: 'Stickers motivadores con nombre del docente listos para despegar y pegar en cuadernos y tareas.',
        leadTime: '24 horas'
      }
    ]
  },
  {
    id: 'navidad',
    title: 'Navidad & Fin de Año',
    subtitle: 'Brillo festivo, recuerdos familiares y regalos de empresa',
    seasonName: 'Temporada Diciembre & Cierres Corporativos',
    badge: 'Esferas, Cajas & Brindis',
    accentColor: 'indigo',
    bgGradient: 'from-blue-600/10 via-amber-500/5 to-transparent',
    coverImage: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80', // holiday sparkles & crafted ornaments
    description: 'La época más esperada en el taller: esferas personalizadas multicapa en madera y acrílico espejo, calendarios de escritorio para marcas, botellas de vino grabadas y cajas de regalo corporativas listas con tu logotipo.',
    itemsCount: 22,
    downloadName: 'Catalogo-Navidad-FinDeAno-Acento.pdf',
    suggestedPrompt: '¡Hola! Me gustaría cotizar las esferas personalizadas para mi familia y/o cajas corporativas de fin de año.',
    highlightItems: [
      {
        id: 'nav-1',
        name: 'Esfera Multicapa Relieve 3D en Madera y Acrílico Espejo',
        technique: 'Corte Láser de Ultra-Detalle',
        materials: 'Chapa de abedul báltico y acrílico oro/plata reflectivo',
        priceFrom: 6.5,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=700&q=80',
        tag: 'Éxito en ventas',
        description: 'Nombres en relieve con lazo de terciopelo y cascabel. Incluye cajita individual decorada.',
        leadTime: '24 a 48 horas',
        isPopular: true
      },
      {
        id: 'nav-2',
        name: 'Caja Regalo Corporativa "Agradecimiento"',
        technique: 'Grabado Láser en Caja de Pino + Termo Sublimado',
        materials: 'Caja deslizable de madera con viruta natural y lazo',
        priceFrom: 36,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
        tag: 'Especial Empresas',
        description: 'Termo grabado con logo de la empresa, libreta corporativa y esfera navideña con nombre del colaborador.',
        leadTime: '3 a 5 días hábiles'
      },
      {
        id: 'nav-3',
        name: 'Calendario de Escritorio Perpetuo en Roble',
        technique: 'Corte y Grabado Láser Preciso',
        materials: 'Base de madera maciza y fichas de acrílico grabado',
        priceFrom: 19,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=700&q=80',
        tag: 'Para el escritorio',
        description: 'Pieza atemporal con el logo de tu marca o apellido familiar. No caduca jamás.',
        leadTime: '48 horas'
      },
      {
        id: 'nav-4',
        name: 'Copa de Brindis Grabada con Oro Líquido o Esmeril',
        technique: 'Grabado Rotativo Láser en Cristal',
        materials: 'Cristal templado fino de alta resonancia',
        priceFrom: 13,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80',
        tag: 'Elegancia',
        description: 'Grabado permanente suave al tacto con motivos navideños, nombres o monogramas de fin de año.',
        leadTime: '24 horas'
      }
    ]
  }
];

export const WORKSHOP_TECHNIQUES: WorkshopTechnique[] = [
  {
    id: 'laser',
    name: 'Corte y Grabado Láser',
    category: 'Precisión Milimétrica',
    description: 'Nuestra tecnología láser CO2 y fibra graba con una fidelidad asombrosa hasta el más fino detalle tipográfico o ilustración, dejando acabados limpios y bordes perfectamente sellados.',
    materials: ['Madera noble & MDF', 'Acrílico cristal y espejo', 'Cuero legítimo y vaqueta', 'Acero inoxidable y aluminio anodizado'],
    features: ['Sin límite de complejidad en vectores', 'Grabado plano y cilíndrico en 360°', 'Bordes pulidos sin astillas'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', // laser precision cutting & sparks
    tag: 'Fabricación 100% interna',
    turnaround: 'Desde 24 horas'
  },
  {
    id: 'sublimacion',
    name: 'Sublimación Cerámica & Térmica HD',
    category: 'Color Vivo Inalterable',
    description: 'La tinta se funde a nivel molecular con el polímero del producto bajo calor y presión constante. El resultado no se desprende, no se raya y soporta lavados continuos manteniendo su brillo original.',
    materials: ['Tazas de cerámica premium AAA', 'Termos doble pared de acero', 'Botellas deportivas de aluminio', 'Mousepads y posavasos de neopreno'],
    features: ['Gama cromática fotográfica completa', 'Resistente a microondas y lavavajillas', 'Tacto liso completamente integrado'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', // high quality sublimation mug / tumbler
    tag: 'Calidad fotográfica',
    turnaround: 'Desde 12 a 24 horas'
  },
  {
    id: 'textiles',
    name: 'Camisas & Textiles Personalizados',
    category: 'Confección & Estampado',
    description: 'Combinamos estampados DTF (Direct-to-Film) de última generación con vinil textil termotransferible de alto relieve. Brindamos tacto suave, colores ultra densos y gran durabilidad lavado tras lavado.',
    materials: ['Algodón peinado 100%', 'Mezclas poliéster dry-fit', 'Lona y canvas para tote bags', 'Sudaderas con capucha y gorras'],
    features: ['Tacto ultra flexible sin acartonamiento', 'Degradados de color y sombras nítidas', 'Desde 1 pieza hasta tiradas de 500+'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', // printed textiles / boutique shirts
    tag: 'Resistente a lavados',
    turnaround: 'Desde 24 a 48 horas'
  },
  {
    id: 'vinil',
    name: 'Vinil de Corte, Adhesivo & Stickers Die-Cut',
    category: 'Branding & Resistencia',
    description: 'Stickers troquelados individualmente con contorno exacto, viniles reflectivos, holográficos, mate y metálicos. Acabados impermeables diseñados para sobrevivir en termos, autos, vitrinas y laptops.',
    materials: ['Vinil polimérico para exteriores', 'Holográfico arcoíris prismático', 'Acabado mate aterciopelado', 'Vinil translúcido tipo vitral'],
    features: ['Corte a registro milimétrico', 'Adhesivo extra fuerte libre de residuos', 'Laminado protector UV anti-rayones'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', // die-cut stickers & vinyl
    tag: 'Impermeable 100%',
    turnaround: 'Mismo día / 24 horas'
  }
];

export const PORTFOLIO_PIECES: PortfolioPiece[] = [
  {
    id: 'port-1',
    title: 'Kit de Bienvenida Corporativo Tech & Coffee',
    category: 'corporativo',
    occasion: 'Onboarding Empresarial',
    technique: 'Láser Fibra + Sublimación + Vinil Mate',
    materials: 'Termo negro grabado + Libreta bambú + Stickers en caja kraft',
    description: 'Set de 85 unidades para una startup de software. Cada termo incluía el nombre de pila del nuevo integrante y el logo de la empresa.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    highlight: '85 kits entregados en 4 días'
  },
  {
    id: 'port-2',
    title: 'Libro de Firmas y Recuerdos en Madera Grabada',
    category: 'personal',
    occasion: 'Boda en Jardín & Aniversario',
    technique: 'Corte Láser en Relieve y Bisagras de Cuero',
    materials: 'Madera de nogal americano, hojas de papel algodón 240g',
    description: 'Cubierta grabada con monograma entrelazado de los novios, lomo con costura artesanal japonesa y detalles florales calados.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    highlight: 'Pieza única irrepetible'
  },
  {
    id: 'port-3',
    title: 'Menús Rígidos y Señalética para Cafetería de Especialidad',
    category: 'corporativo',
    occasion: 'Identidad de Negocio',
    technique: 'Corte Láser en Chapa de Roble + Acrílico Humo',
    materials: 'Roble europeo 5mm con clip metálico en latón envejecido',
    description: 'Tableros de mesa y letrero de barra resistentes al uso rudo y derrames frecuentes. Grabado de código QR dinámico incluido.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    highlight: 'Diseñado para durar años'
  },
  {
    id: 'port-4',
    title: 'Camisas Familiares y Termos "Reunión 50 Años"',
    category: 'personal',
    occasion: 'Bodas de Oro & Celebración Familiar',
    technique: 'Estampado DTF Suave + Grabado Rotativo',
    materials: 'Camisas de algodón peinado 180g + Vasos térmicos',
    description: '45 camisetas en tallas desde 2 años hasta 3XL con caricatura familiar personalizada y termos para los abuelos agasajados.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    highlight: 'Emoción garantizada'
  },
  {
    id: 'port-5',
    title: 'Lote de 2,000 Stickers Holográficos para Marca de Ropa',
    category: 'corporativo',
    occasion: 'Packaging & Envíos E-commerce',
    technique: 'Impresión UV en Vinil Prisma Rainbow',
    materials: 'Vinil holográfico 120 micras con adhesivo permanente',
    description: 'Stickers que cambian de color con la luz para incluir de regalo en cada paquete de compra de su tienda en línea.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    highlight: 'Tolerancia al agua y sol'
  },
  {
    id: 'port-6',
    title: 'Cuadro de Constelación y Audio Soundwave en Acrílico',
    category: 'personal',
    occasion: 'Aniversario de Pareja',
    technique: 'Corte Láser + Grabado Inverso en Acrílico',
    materials: 'Acrílico fundido 5mm con base de luz LED cálida',
    description: 'El mapa de estrellas del día exacto en que se conocieron, junto con el grabado de la onda de sonido de su canción favorita con código de Spotify reproducible.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    highlight: 'Interactiva con luz cálida'
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    author: 'Valeria Munguía',
    role: 'Cliente Particular',
    type: 'personal',
    rating: 5,
    comment: 'Pedí el joyero de madera para el Día de la Madre con la letra manuscrita de mi abuelita fallecida escaneada. Cuando mi mamá lo abrió se puso a llorar de la emoción. El grabado en el taller fue idéntico al trazo original. ¡Mil gracias por tanto cariño!',
    productMade: 'Joyero Roble con caligrafía real',
    date: 'Mayo 2026'
  },
  {
    id: 'rev-2',
    author: 'Ignacio Larrea',
    role: 'People Operations Lead en Nexo Digital',
    type: 'empresa',
    rating: 5,
    comment: 'Trabajar con el equipo de Acento ha sido un alivio para nuestros regalos corporativos de fin de año. Nos armaron 120 kits con termos grabados con láser y cajas personalizadas sin un solo error y en tiempo récord. Su taller interno marca toda la diferencia.',
    productMade: '120 Kits Corporativos Fin de Año',
    date: 'Diciembre 2025'
  },
  {
    id: 'rev-3',
    author: 'Mariana & David',
    role: 'Novios',
    type: 'personal',
    rating: 5,
    comment: 'Nos hicieron los letreros de bienvenida en acrílico y los destapadores de madera grabados para los invitados de nuestra boda. Todos quedaron fascinados con los detalles. Atención súper paciente y amable por WhatsApp.',
    productMade: 'Souvenirs de boda y letreros acrílicos',
    date: 'Febrero 2026'
  },
  {
    id: 'rev-4',
    author: 'Sofía Cordero',
    role: 'Fundadora de Café Almendra',
    type: 'empresa',
    rating: 5,
    comment: 'Nos confeccionaron los delantales de barista con parche de cuero y las tablas de servicio grabadas. Soportan la rutina del restaurante y transmiten la calidez que queríamos. Ya somos clientes fijos.',
    productMade: 'Dotación baristas y tablas grabadas',
    date: 'Marzo 2026'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Hay un pedido mínimo para piezas de catálogo?',
    answer: '¡Para nada! En la gran mayoría de nuestros productos para ocasiones personales (Día de la Madre, Padre, Maestro, cumpleaños, etc.) puedes ordenar desde 1 sola pieza completamente personalizada. Para empresas contamos con escalas de descuento por volumen a partir de 15, 50 y 100 unidades.',
    category: 'catalogo'
  },
  {
    id: 'faq-2',
    question: '¿Cómo funciona el proceso de aprobación de diseño antes de fabricar?',
    answer: 'Antes de encender el láser o prensar cualquier producto, te enviamos por WhatsApp una maqueta digital visual (preview) con tu texto, tipografía o logotipo exacto. Solo cuando nos des el visto bueno definitivo comenzamos la fabricación en nuestro taller.',
    category: 'especiales'
  },
  {
    id: 'faq-3',
    question: '¿Tienen opciones si tengo una idea especial fuera del catálogo?',
    answer: '¡Es nuestra especialidad! Contamos con taller propio con cortadoras láser CNC, sublimadoras de gran formato, plotters de corte y confección textil. Si tienes una foto de referencia, un boceto o una idea que viste en internet, envíanosla por mensaje y te preparamos una cotización y propuesta en pocas horas.',
    category: 'especiales'
  },
  {
    id: 'faq-4',
    question: '¿Cuáles son los tiempos de entrega promedio?',
    answer: 'La mayoría de pedidos unitarios o de catálogo de temporada se fabrican entre 24 y 48 horas hábiles. Para pedidos corporativos o lotes mayores a 50 unidades el tiempo oscila entre 3 y 5 días hábiles, siempre acordando una fecha de entrega puntual y segura.',
    category: 'envios'
  },
  {
    id: 'faq-5',
    question: '¿Cómo realizo el pago y cómo me lo entregan?',
    answer: 'Aceptamos transferencias bancarias directas, tarjetas de débito/crédito y links de pago seguros. Puedes recoger tu pedido en nuestro taller creativo o recibirlo por mensajería express a domicilio cuidadosamente empacado listo para regalar.',
    category: 'envios'
  },
  {
    id: 'faq-6',
    question: '¿Emiten factura para empresas y pedidos corporativos?',
    answer: 'Sí, emitimos factura fiscal formal para todas las compras corporativas o institucionales. Solo indícanos tus datos fiscales al coordinar el pedido por WhatsApp o correo.',
    category: 'empresas'
  }
];
