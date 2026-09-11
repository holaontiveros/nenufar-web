import {WhatsAppIcon} from '~/components/WhatsAppIcon';
import {RichTextContent} from '~/components/RichTextContent';

type CollectionCard = {
  id: string;
  title: string;
  handle: string;
  image?: {url: string; altText?: string | null};
  description?: string;
  catalogName?: string;
  catalogHandle?: string;
};

const techniques = [
  ['Corte y Grabado Láser', 'Precisión milimétrica sobre madera, acrílico, cuero y metal.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1513519245088-0e12902e5a38.jpg?v=1789051498'],
  ['Sublimación Cerámica & Térmica HD', 'Color vivo, durable y con acabado integrado.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1514432324607-a09aefdd.jpg?v=1789051501'],
  ['Camisas & Textiles Personalizados', 'DTF y vinil textil para una pieza o tirajes completos.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1597484661643-2f5fef640dd1.jpg?v=1789051504'],
  ['Vinil, Adhesivo & Stickers', 'Troquelado exacto y acabados resistentes al uso diario.', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1607604276583-eef5d076aa5f.jpg?v=1789051526'],
];
const projects = [
  ['Kit de Bienvenida Corporativo Tech & Coffee', 'Onboarding Empresarial', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1549465220-1a8b9238cd48.jpg?v=1789051533'],
  ['Libro de Firmas y Recuerdos en Madera Grabada', 'Boda en Jardín & Aniversario', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1513519245088-0e12902e5a38_6a8b6313-1eb1-45d4-9600-93c78fb7508d.jpg?v=1789051543'],
  ['Camisas Familiares y Termos', 'Bodas de Oro & Celebración Familiar', 'https://cdn.shopify.com/s/files/1/1010/7702/5053/files/photo-1597484661643-2f5fef640dd1.jpg?v=1789051504'],
];
const reviews = [['"La atención fue hermosa y el joyero quedó todavía más especial de lo que imaginaba."', 'Mariana R. · Regalo personal'], ['"Cumplieron el tiempo de entrega y cada pieza llegó perfecta para nuestro equipo."', 'Lucía M. · Empresa / B2B']];
type FaqItem = {question: string; answer: string};
export type FaqGroup = {
  id: string;
  title: string;
  description?: string;
  faqs: FaqItem[];
};

export function NenufarStory({
  collections,
  whatsappUrl,
}: {
  collections: CollectionCard[];
  whatsappUrl: string | null;
}) {
  return <>
    <section id="catalogos" className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Colecciones & catálogos Nenúfar" title="Puertas visuales a regalos que emocionan" copy="Cada fecha especial merece una atmósfera y materiales únicos." /><div className="story-grid story-grid--three">{collections.map((collection) => <article className="story-card story-card--collection" key={collection.id}><a aria-label={`Ver productos de ${collection.title}`} className="story-card__image-link" href={`/catalogo?collection=${collection.handle}`}><img src={collection.image?.url ?? ''} alt={collection.image?.altText ?? ''} /></a><div><span>Temporada Nenúfar</span><h3>{collection.title}</h3>{collection.description && <p>«{collection.description}»</p>}<a href={`/catalogo?collection=${collection.handle}`}>Ver productos de esta colección →</a></div></article>)}</div></div></section>
    {/* TODO: re-enable El Taller section when ready
    <section id="tecnicas" className="story-section story-section--tint"><div className="nenufar-shell"><StoryHeading eyebrow="Fabricación 100% interna" title="El taller detrás de cada detalle" copy="Técnicas, materiales y acabados elegidos para que cada pieza dure." /><div className="story-grid story-grid--four">{techniques.map(([name, copy, image]) => <article className="story-card story-card--technique" key={name}><img src={image} alt="" /><span>Desde 24 horas</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>
    */}
    {/* TODO: re-enable Trabajos Reales section when ready
    <section id="galeria" className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Trabajos salidos del taller" title="Creaciones reales, manos reales" copy="Desde un detalle único hasta cientos de piezas de marca para eventos corporativos." /><div className="story-grid story-grid--three">{projects.map(([name, occasion, image]) => <article className="story-card story-card--project" key={name}><a aria-label={`Cotizar una pieza como ${name}`} className="story-card__image-link" href="#cotizador"><img src={image} alt="" /></a><span>{occasion}</span><h3>{name}</h3><p>Una pieza desarrollada con atención al material, al mensaje y al momento que celebra.</p><a href="#cotizador">Quiero algo así →</a></article>)}</div></div></section>
    */}
    <section id="cotizador" className="story-section story-section--tint"><div className="nenufar-shell quote-banner"><div><span>✦ Taller a medida</span><h2>¿Tienes una idea? La hacemos pieza por pieza.</h2><p>Cuéntanos la ocasión, cantidad y materiales que imaginas. Te responderemos con opciones, precios y fecha de entrega.</p></div>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Enviar mi idea</a>}</div></section>
    {/* TODO: re-enable Reviews section when ready
    <section className="story-section"><div className="nenufar-shell"><StoryHeading eyebrow="Historias de quienes ya regalaron" title="Emoción tangible en cada entrega" copy="La confianza se construye con atención al detalle y comunicación clara." /><div className="story-grid story-grid--two">{reviews.map(([quote, author]) => <blockquote className="review-card" key={author}><b>★★★★★</b><p>{quote}</p><footer>{author}</footer></blockquote>)}</div></div></section>
    */}
    <section id="faq" className="story-section story-section--tint"><div className="nenufar-shell faq-preview"><StoryHeading eyebrow="Claridad & procesos" title="Preguntas frecuentes" copy="Resolvemos las dudas más comunes sobre materiales, personalización, tiempos y envíos." /><a className="faq-preview__cta" href="/preguntas">Ver todas las preguntas frecuentes <span>→</span></a></div></section>
    <section className="story-final"><div><span>Hagamos algo inolvidable hoy</span><h2>Tu próxima idea merece existir <em>con intención.</em></h2><p>Regalos personales, piezas corporativas y detalles que cuentan una historia.</p>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Iniciar conversación</a>}</div></section>{whatsappUrl && <a className="floating-chat" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp"><WhatsAppIcon /></a>}
  </>;
}

export function FaqGroups({faqGroups}: {faqGroups: FaqGroup[]}) {
  return <>{faqGroups.map((group) => <section className="faq__group" key={group.id}><header><h3>{group.title}</h3>{group.description && <RichTextContent className="faq__group-description" value={group.description} />}</header>{group.faqs.map(({question, answer}) => <details key={question}><summary>{question}<span>⌄</span></summary><RichTextContent className="faq__answer" value={answer} /></details>)}</section>)}</>;
}

function StoryHeading({eyebrow, title, copy}: {eyebrow: string; title: string; copy: string}) { return <header className="story-heading"><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></header>; }
