import {WHATSAPP_URL} from '~/lib/contact';
import {WhatsAppIcon} from '~/components/WhatsAppIcon';

const collections = [
  ['Día de la Madre', 'Piezas que abrazan con afecto, luz y memoria', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1513519245088-0e12902e5a38.jpg?v=1789051498', 'dia-de-la-madre'],
  ['Día del Padre', 'Carácter, maestría y detalles hechos para durar', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1519751138087-5bf79df62d5b.jpg?v=1789051519', 'dia-del-padre'],
  ['Día del Maestro', 'Gratitud genuina para quienes enseñan con el corazón', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1456513080510-7bf3a84b82f8.jpg?v=1789051528', 'dia-del-maestro'],
  ['Navidad & Fin de Año', 'Brillo festivo, recuerdos familiares y regalos de empresa', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1512909006721-3d6018887383.jpg?v=1789051539', 'navidad-fin-de-ano'],
];
const techniques = [
  ['Corte y Grabado Láser', 'Precisión milimétrica sobre madera, acrílico, cuero y metal.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1513519245088-0e12902e5a38.jpg?v=1789051498'],
  ['Sublimación Cerámica & Térmica HD', 'Color vivo, durable y con acabado integrado.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1514432324607-a09d9b4aefdd.jpg?v=1789051501'],
  ['Camisas & Textiles Personalizados', 'DTF y vinil textil para una pieza o tirajes completos.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1597484661643-2f5fef640dd1.jpg?v=1789051504'],
  ['Vinil, Adhesivo & Stickers', 'Troquelado exacto y acabados resistentes al uso diario.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1607604276583-eef5d076aa5f.jpg?v=1789051526'],
];
const projects = [
  ['Kit de Bienvenida Corporativo Tech & Coffee', 'Onboarding Empresarial', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1549465220-1a8b9238cd48.jpg?v=1789051533'],
  ['Libro de Firmas y Recuerdos en Madera Grabada', 'Boda en Jardín & Aniversario', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1513519245088-0e12902e5a38_6a8b6313-1eb1-45d4-9600-93c78fb7508d.jpg?v=1789051543'],
  ['Camisas Familiares y Termos', 'Bodas de Oro & Celebración Familiar', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1597484661643-2f5fef640dd1.jpg?v=1789051504'],
];
const reviews = [['“La atención fue hermosa y el joyero quedó todavía más especial de lo que imaginaba.”', 'Mariana R. · Regalo personal'], ['“Cumplieron el tiempo de entrega y cada pieza llegó perfecta para nuestro equipo.”', 'Lucía M. · Empresa / B2B']];
const faqs = [['¿Cuánto tarda un pedido personalizado?', 'La mayoría de los pedidos se produce entre 24 y 72 horas; los proyectos por volumen se confirman con una fecha específica.'], ['¿Puedo ver una muestra antes de producir?', 'Sí. Para proyectos personalizados se revisa el texto, diseño y especificaciones antes de iniciar el taller.'], ['¿Hacen pedidos para empresas?', 'Sí, elaboramos desde una pieza hasta tirajes corporativos con logotipo y nombres individuales.']];

export function NenufarStory() {
  return <>
    <section id="catalogos" className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Colecciones & catálogos Nenúfar" title="Puertas visuales a regalos que emocionan" copy="Cada fecha especial merece una atmósfera y materiales únicos." /><div className="story-grid story-grid--two">{collections.map(([name, copy, image, handle]) => <article className="story-card story-card--collection" key={name}><img src={image} alt="" /><div><span>Temporada Nenúfar</span><h3>{name}</h3><p>«{copy}»</p><a href={`/catalogo?collection=${handle}`}>Ver productos de esta colección →</a></div></article>)}</div></div></section>
    <section id="tecnicas" className="story-section story-section--tint"><div className="nenufar-shell"><StoryHeading eyebrow="Fabricación 100% interna" title="El taller detrás de cada detalle" copy="Técnicas, materiales y acabados elegidos para que cada pieza dure." /><div className="story-grid story-grid--four">{techniques.map(([name, copy, image]) => <article className="story-card story-card--technique" key={name}><img src={image} alt="" /><span>Desde 24 horas</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>
    <section id="galeria" className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Trabajos salidos del taller" title="Creaciones reales, manos reales" copy="Desde un detalle único hasta cientos de piezas de marca para eventos corporativos." /><div className="story-grid story-grid--three">{projects.map(([name, occasion, image]) => <article className="story-card story-card--project" key={name}><img src={image} alt="" /><span>{occasion}</span><h3>{name}</h3><p>Una pieza desarrollada con atención al material, al mensaje y al momento que celebra.</p><a href="#cotizador">Quiero algo así →</a></article>)}</div></div></section>
    <section id="cotizador" className="story-section story-section--tint"><div className="nenufar-shell quote-banner"><div><span>✦ Taller a medida</span><h2>¿Tienes una idea? La hacemos pieza por pieza.</h2><p>Cuéntanos la ocasión, cantidad y materiales que imaginas. Te responderemos con opciones, precios y fecha de entrega.</p></div><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Enviar mi idea</a></div></section>
    <section className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Historias de quienes ya regalaron" title="Emoción tangible en cada entrega" copy="La confianza se construye con atención al detalle y comunicación clara." /><div className="story-grid story-grid--two">{reviews.map(([quote, author]) => <blockquote className="review-card" key={author}><b>★★★★★</b><p>{quote}</p><footer>{author}</footer></blockquote>)}</div></div></section>
    <section id="faq" className="story-section story-section--tint"><div className="nenufar-shell faq"><StoryHeading eyebrow="Claridad & procesos" title="Preguntas frecuentes" copy="Todo lo que necesitas saber antes de ordenar." />{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>⌄</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="story-final"><div><span>Hagamos algo inolvidable hoy</span><h2>Tu próxima idea merece existir <em>con intención.</em></h2><p>Regalos personales, piezas corporativas y detalles que cuentan una historia.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Iniciar conversación</a></div></section><a className="floating-chat" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp"><WhatsAppIcon /></a>
  </>;
}
function StoryHeading({eyebrow, title, copy}: {eyebrow: string; title: string; copy: string}) { return <header className="story-heading"><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></header>; }
