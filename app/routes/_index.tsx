import type {Route} from './+types/_index';
import {NenufarStory} from '~/components/NenufarStory';
import {WhatsAppIcon} from '~/components/WhatsAppIcon';
import {useLoaderData, useRouteLoaderData} from 'react-router';
import type {RootLoader} from '~/root';
import type {HomepageCollectionsQuery} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => [{title: 'Nenúfar | Regalos personalizados'}];

type FaqNode = {
  handle?: string;
  question?: {value?: string} | null;
  answer?: {value?: string} | null;
  group?: {
    reference?: {
      id?: string;
      title?: {value?: string} | null;
      description?: {value?: string} | null;
      position?: {value?: string} | null;
    } | null;
  } | null;
};

type FaqItem = {question: string; answer: string};
type FaqGroup = {
  id: string;
  title: string;
  description?: string;
  position: number;
  faqs: FaqItem[];
};

function formatFaqGroups(faqs: FaqNode[]): FaqGroup[] {
  const groups = new Map<string, FaqGroup>();

  faqs.forEach((faq) => {
    const question = faq.question?.value;
    const answer = faq.answer?.value;
    if (!question || !answer) return;

    const reference = faq.group?.reference;
    const id = reference?.id ?? 'ungrouped';
    const title = reference?.title?.value?.trim() || 'Preguntas frecuentes';
    const position = Number(reference?.position?.value);
    const group = groups.get(id) ?? {
      id,
      title,
      description: reference?.description?.value?.trim() || undefined,
      position: Number.isFinite(position) ? position : Number.MAX_SAFE_INTEGER,
      faqs: [],
    };

    group.faqs.push({question, answer});
    groups.set(id, group);
  });

  return [...groups.values()].sort(
    (left, right) => left.position - right.position || left.title.localeCompare(right.title, 'es'),
  );
}

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;
  const [collectionData, {legacyFaqs, productionFaqs}] = await Promise.all([
    storefront.query(COLLECTIONS_QUERY, {cache: storefront.CacheLong()}),
    storefront.query(FAQ_QUERY, {cache: storefront.CacheLong()}),
  ]);

  const edges = (collectionData as HomepageCollectionsQuery).collections?.edges ?? [];
  const collections = edges
    .filter((edge): edge is {node: NonNullable<typeof edge.node>} => !!edge?.node && edge.node.showOnHome?.value === 'true')
    .map((edge) => {
      const node = edge.node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        image: node.image ?? undefined,
        catalogName: node.title,
        catalogHandle: node.handle,
      };
    });

  return {
    faqGroups: formatFaqGroups([
      ...((legacyFaqs.nodes ?? []) as FaqNode[]),
      ...((productionFaqs.nodes ?? []) as FaqNode[]),
    ]),
    collections,
  };
}

export default function Homepage() {
  const {faqGroups, collections} = useLoaderData<typeof loader>();
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
    <NenufarStory faqGroups={faqGroups} collections={collections} whatsappUrl={whatsappUrl} />
  </>;
}

const COLLECTIONS_QUERY = `#graphql
  query HomepageCollections {
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          image { url altText }
          showOnHome: metafield(namespace: "custom", key: "show_on_home") { value }
        }
      }
    }
  }
` as const;

const FAQ_QUERY = `#graphql
  query HomepageFaqs {
    legacyFaqs: metaobjects(type: "faq_item", first: 20) {
      nodes {
        handle
        question: field(key: "question") {
          value
        }
        answer: field(key: "answer") {
          value
        }
        group: field(key: "group") {
          reference {
            ... on Metaobject {
              id
              title: field(key: "title") { value }
              description: field(key: "description") { value }
              position: field(key: "position") { value }
            }
          }
        }
      }
    }
    productionFaqs: metaobjects(type: "nenufar_faq_item", first: 20) {
      nodes {
        handle
        question: field(key: "question") {
          value
        }
        answer: field(key: "answer") {
          value
        }
        group: field(key: "group") {
          reference {
            ... on Metaobject {
              id
              title: field(key: "title") { value }
              description: field(key: "description") { value }
              position: field(key: "position") { value }
            }
          }
        }
      }
    }
  }
` as const;
