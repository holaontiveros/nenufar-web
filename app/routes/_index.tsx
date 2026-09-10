import type {Route} from './+types/_index';
import {NenufarCatalogue, type NenufarCatalogueItem} from '~/components/NenufarCatalogue';
import {NenufarStory} from '~/components/NenufarStory';
import {WHATSAPP_URL} from '~/lib/contact';

export const meta: Route.MetaFunction = () => [{title: 'Nenúfar | Regalos personalizados'}];

export async function loader({context}: Route.LoaderArgs) {
  const {products} = await context.storefront.query(NENUFAR_CATALOG_QUERY, {cache: context.storefront.CacheLong()});
  const catalogue: NenufarCatalogueItem[] = products.nodes.map((product) => ({
    id: product.id, title: product.title, handle: product.handle,
    image: product.featuredImage ? {url: product.featuredImage.url, altText: product.featuredImage.altText} : undefined,
    price: product.priceRange.minVariantPrice,
    description: product.description,
    catalogName: metafieldValue(product.metafields, 'catalog_name'),
    technique: metafieldValue(product.metafields, 'technique'),
    leadTime: metafieldValue(product.metafields, 'lead_time'),
  }));
  return {catalogue};
}

export default function Homepage({loaderData}: Route.ComponentProps) {
  return <>
    <section className="nenufar-hero"><div className="nenufar-hero__orb nenufar-hero__orb--pink" /><div className="nenufar-hero__orb nenufar-hero__orb--purple" />
      <div className="nenufar-shell nenufar-hero__content"><p className="hero-pill"><i /> <strong>nenúfar taller activo</strong> <span>•</span> Catálogos y regalos personalizados ✦</p>
        <h1>Regalos con alma y piezas de marca <em>hechas a tu medida</em></h1>
        <p className="nenufar-hero__intro">Grabado láser, sublimación, stickers y textiles personalizados con mimo en el taller de <strong>nenúfar</strong>. Detalles memorables para cada ocasión especial y artículos corporativos listos para comprar.</p>
        <div className="hero-actions"><a className="hero-actions__primary" href="#productos">⌑ Ver productos de catálogo <span>→</span></a><a className="hero-actions__secondary" href="#catalogos">Explorar colecciones de temporada</a><a className="hero-actions__chat" href={WHATSAPP_URL} target="_blank" rel="noreferrer">◌ Escríbenos por chat</a></div>
        <div className="hero-trust"><span>✓ Compra segura en Shopify</span><span>♢ Personalización incluida</span><span>⌁ Hecho en el taller</span></div>
      </div>
    </section>
    <NenufarCatalogue products={loaderData.catalogue} />
    <NenufarStory />
  </>;
}

function metafieldValue(metafields: Array<{key: string; value: string} | null>, key: string) {
  return metafields.find((metafield) => metafield?.key === key)?.value;
}

const NENUFAR_CATALOG_QUERY = `#graphql
  query NenufarCatalog($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 100, sortKey: TITLE) { nodes {
      id title handle description
      featuredImage { id url altText width height }
      priceRange { minVariantPrice { amount currencyCode } }
      metafields(identifiers: [
        {namespace: "custom", key: "catalog_name"}
        {namespace: "custom", key: "technique"}
        {namespace: "custom", key: "lead_time"}
      ]) { key value }
    }}
  }
` as const;
