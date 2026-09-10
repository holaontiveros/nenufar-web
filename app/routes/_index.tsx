import type {Route} from './+types/_index';
import {NenufarStory} from '~/components/NenufarStory';
import {WhatsAppIcon} from '~/components/WhatsAppIcon';
import {useLoaderData, useRouteLoaderData} from 'react-router';
import type {RootLoader} from '~/root';

export const meta: Route.MetaFunction = () => [{title: 'Nenúfar | Regalos personalizados'}];

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;
  const {metaobjects} = await storefront.query(FAQ_QUERY, {
    cache: storefront.CacheLong(),
  });

  return {
    faqs: metaobjects.nodes.flatMap((faq) => {
      const question = faq.question?.value;
      const answer = faq.answer?.value;
      return question && answer ? [{question, answer}] : [];
    }),
  };
}

export default function Homepage() {
  const {faqs} = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const whatsappUrl = rootData?.whatsappUrl ?? null;

  return <>
    <section className="nenufar-hero"><div className="nenufar-hero__orb nenufar-hero__orb--pink" /><div className="nenufar-hero__orb nenufar-hero__orb--purple" />
      <div className="nenufar-shell nenufar-hero__content"><p className="hero-pill"><i /> <strong>nenúfar taller activo</strong> <span>•</span> Catálogos y regalos personalizados ✦</p>
        <h1>Regalos con alma y piezas de marca <em>hechas a tu medida</em></h1>
        <p className="nenufar-hero__intro">Grabado láser, sublimación, stickers y textiles personalizados con mimo en el taller de <strong>nenúfar</strong>. Detalles memorables para cada ocasión especial y artículos corporativos listos para comprar.</p>
        <div className="hero-actions"><a className="hero-actions__primary" href="/catalogo">⌑ Ver productos de catálogo <span>→</span></a><a className="hero-actions__secondary" href="#catalogos">Explorar colecciones de temporada</a>{whatsappUrl && <a className="hero-actions__chat" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Escríbenos por chat</a>}</div>
        <div className="hero-trust"><span>✓ Compra segura en Shopify</span><span>♢ Personalización incluida</span><span>⌁ Hecho en el taller</span></div>
      </div>
    </section>
    <NenufarStory faqs={faqs} whatsappUrl={whatsappUrl} />
  </>;
}

const FAQ_QUERY = `#graphql
  query HomepageFaqs {
    metaobjects(type: "faq_item", first: 20) {
      nodes {
        handle
        question: field(key: "question") {
          value
        }
        answer: field(key: "answer") {
          value
        }
      }
    }
  }
` as const;
