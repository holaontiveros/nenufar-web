import type { Route } from './+types/_index';
import { NenufarStory } from '~/components/NenufarStory';
import { WhatsAppIcon } from '~/components/WhatsAppIcon';
import { useEffect, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';
import type { HomepageCollectionsQuery } from 'storefrontapi.generated';
import {ActionAnchor, ActionLink} from '~/components/Action';

export const meta: Route.MetaFunction = () => [
  { title: 'Regalos personalizados | Nenúfar' },
];

const HERO_PILL_MESSAGES = [
  'Ideas bonitas que se vuelven recuerdos',
  'Pequeños detalles, grandes abrazos',
  'Regalos pensados despacito y con cariño',
  'Creatividad hecha para celebrar',
  'Una idea bonita merece existir',
  'Personalizamos momentos que importan',
  'Para regalar algo que se siente',
  'Tu historia, convertida en detalle',
  'Manos, materiales y mucho corazón',
  'Hay magia en los regalos bien pensados',
] as const;

export async function loader({ context }: Route.LoaderArgs) {
  const { storefront } = context;
  const collectionData = await storefront.query(COLLECTIONS_QUERY, {
    cache: storefront.CacheLong(),
  });

  const edges =
    (collectionData as HomepageCollectionsQuery).collections?.edges ?? [];
  const collections = edges
    .filter(
      (edge): edge is { node: NonNullable<typeof edge.node> } =>
        !!edge?.node && edge.node.showOnHome?.value === 'true',
    )
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
    collections,
  };
}

export default function Homepage() {
  const { collections } = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const whatsappUrl = rootData?.whatsappUrl ?? null;

  return (
    <>
      <section className="nenufar-hero">
        <div className="nenufar-hero__orb nenufar-hero__orb--pink" />
        <div className="nenufar-hero__orb nenufar-hero__orb--purple" />
        <div className="nenufar-shell nenufar-hero__content">
          <HeroPill />
          <h1>
            Regalos con alma y piezas de marca <em>hechas a tu medida</em>
          </h1>
          <p className="nenufar-hero__intro">
            Grabado láser, sublimación, stickers y textiles personalizados con
            mimo en el taller de <strong>nenúfar</strong>. Detalles memorables
            para cada ocasión especial y artículos corporativos listos para
            comprar.
          </p>
          <div className="hero-actions">
            <ActionLink className="hero-actions__primary" to="/catalogo" variant="primary">
              ⌑ Ver productos de catálogo <span>→</span>
            </ActionLink>
            <a className="hero-actions__secondary" href="#catalogos">
              Explorar colecciones de temporada
            </a>
            {whatsappUrl && (
              <ActionAnchor
                className="hero-actions__chat"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
              >
                <WhatsAppIcon /> Escríbenos por chat
              </ActionAnchor>
            )}
          </div>
          <div className="hero-trust">
            <span>✓ Compra segura en Shopify</span>
            <span>♢ Personalización incluida</span>
            <span>⌁ Hecho en el taller</span>
          </div>
        </div>
      </section>
      <NenufarStory collections={collections} whatsappUrl={whatsappUrl} />
    </>
  );
}

function HeroPill() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % HERO_PILL_MESSAGES.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="hero-pill">
      <i />
      <strong>nenúfar</strong>
      <span>•</span>
      <span className="hero-pill__message" aria-live="polite">
        {HERO_PILL_MESSAGES.map((message, index) => (
          <span
            className={index === messageIndex ? 'is-active' : undefined}
            aria-hidden={index !== messageIndex}
            key={message}
          >
            {message}
          </span>
        ))}
      </span>
    </p>
  );
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
