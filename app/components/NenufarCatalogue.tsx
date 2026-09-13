import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export type NenufarCatalogueItem = {
  id: string;
  title: string;
  handle: string;
  image?: { url: string; altText?: string | null };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  catalogName?: string;
  catalogHandle?: string;
  catalogNames?: string[];
  catalogHandles?: string[];
  technique?: string;
  leadTime?: string;
  description?: string;
};

function formatPriceRange(priceRange: NenufarCatalogueItem['priceRange']) {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: priceRange.minVariantPrice.currencyCode,
  });
  const minimum = formatter.format(Number(priceRange.minVariantPrice.amount));

  if (
    priceRange.minVariantPrice.amount === priceRange.maxVariantPrice.amount &&
    priceRange.minVariantPrice.currencyCode ===
      priceRange.maxVariantPrice.currencyCode
  ) {
    return minimum;
  }

  const maximum = formatter.format(Number(priceRange.maxVariantPrice.amount));
  return `${minimum} – ${maximum}`;
}

export function NenufarCatalogue({
  collection,
  products,
}: {
  collection?: {title: string; description?: string | null};
  products: NenufarCatalogueItem[];
}) {
  const [searchParams] = useSearchParams();
  const requestedCollection = searchParams.get('collection');
  const requestedCatalog = products.find((product) =>
    product.catalogHandles?.includes(requestedCollection ?? ''),
  )?.catalogName;
  const [catalog, setCatalog] = useState(
    collection?.title ?? requestedCatalog ?? 'todos',
  );
  const [technique, setTechnique] = useState('todas');
  const [query, setQuery] = useState('');
  const catalogues = [
    'todos',
    ...Array.from(
      new Set(
        products.flatMap(
          (product) =>
            product.catalogNames ??
            (product.catalogName ? [product.catalogName] : []),
        ),
      ),
    ),
  ];
  const techniques = [
    'todas',
    ...Array.from(
      new Set(products.map((product) => product.technique).filter(Boolean)),
    ),
  ];
  const activeCatalog = collection?.title
    ? collection.title
    : catalogues.includes(catalog)
      ? catalog
      : 'todos';
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const search =
          `${product.title} ${product.description ?? ''} ${product.technique ?? ''}`.toLowerCase();
        return (
          (activeCatalog === 'todos' ||
            product.catalogNames?.includes(activeCatalog)) &&
          (technique === 'todas' || product.technique === technique) &&
          (!query.trim() || search.includes(query.trim().toLowerCase()))
        );
      }),
    [activeCatalog, products, query, technique],
  );

  return (
    <section id="productos" className="nenufar-catalogue">
      <div className="nenufar-shell">
        <div className="section-heading">
          <p>{collection ? '⌑ Colección Nenúfar' : '⌑ Colección & tienda Nenúfar'}</p>
          <h2>
            {collection ? (
              <>
                Piezas de <em>{collection.title}</em>
              </>
            ) : (
              <>
                Piezas por catálogo <em>listas para elaboración</em>
              </>
            )}
          </h2>
          <span>
            {collection?.description ||
              'Explora y personaliza cada regalo de nuestras colecciones estacionales. Compra en línea o consulta los detalles con el taller.'}
          </span>
        </div>
        {!collection && (
          <div
            id="catalogos"
            className="catalogue-tabs"
            aria-label="Filtrar por catálogo"
          >
            {catalogues.map((item) => (
              <button
                key={item}
                type="button"
                className={activeCatalog === item ? 'active' : ''}
                onClick={() => setCatalog(item)}
              >
                {item === 'todos' ? 'Todos los catálogos' : item}
                <b>
                  {item === 'todos'
                    ? products.length
                    : products.filter((product) =>
                        product.catalogNames?.includes(item),
                      ).length}
                </b>
              </button>
            ))}
          </div>
        )}
        <div className="catalogue-filters">
          <label>
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar joyero, termo, esfera, libreta..."
            />
          </label>
          <div>
            {techniques.map((item) => (
              <button
                key={item}
                type="button"
                className={technique === item ? 'active' : ''}
                onClick={() => setTechnique(item)}
              >
                {item === 'todas' ? 'Todas las técnicas' : item}
              </button>
            ))}
          </div>
        </div>
        {visibleProducts.length ? (
          <div className="catalogue-grid">
            {visibleProducts.map((product) => (
              <article className="catalogue-card" key={product.id}>
                <Link
                  to={`/products/${product.handle}`}
                  prefetch="intent"
                  className="catalogue-card__image"
                >
                  {product.image ? (
                    <img
                      src={product.image.url}
                      alt={product.image.altText || product.title}
                    />
                  ) : (
                    <span />
                  )}
                  {product.catalogName && <b>{product.catalogName}</b>}
                </Link>
                <div className="catalogue-card__body">
                  <div className="catalogue-card__meta">
                    <span>{product.technique || 'Personalizado'}</span>
                    {product.leadTime && (
                      <small>
                        ◷ Tiempo de elaboración: {product.leadTime}
                      </small>
                    )}
                  </div>
                  <h3>
                    <Link to={`/products/${product.handle}`} prefetch="intent">
                      {product.title}
                    </Link>
                  </h3>
                  <p>
                    {product.description ||
                      'Una pieza hecha con cuidado para convertir cada ocasión en un recuerdo.'}
                  </p>
                  <div className="catalogue-card__purchase">
                    <strong>
                      {formatPriceRange(product.priceRange)}
                    </strong>
                    <Link to={`/products/${product.handle}`} prefetch="intent">
                      Personalizar <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalogue-empty">
            <p>No encontramos productos con esos filtros.</p>
            <button
              type="button"
              onClick={() => {
                if (!collection) setCatalog('todos');
                setTechnique('todas');
                setQuery('');
              }}
            >
              Restablecer filtros
            </button>
          </div>
        )}
        <div className="catalogue-custom-order">
          <span>✦</span>
          <div>
            <h3>
              ¿Buscas una pieza fuera de catálogo o un tiraje para tu empresa?
            </h3>
            <p>
              Fabricamos proyectos especiales en madera, acrílico, metal,
              textiles y vinil con tu logotipo.
            </p>
          </div>
          <a href="/#cotizador">Cotizar pedido especial</a>
        </div>
      </div>
    </section>
  );
}
