import {useMemo, useState} from 'react';
import {Link} from 'react-router';

export type NenufarCatalogueItem = {
  id: string;
  title: string;
  handle: string;
  image?: {url: string; altText?: string | null};
  price: {amount: string; currencyCode: string};
  catalogName?: string;
  technique?: string;
  leadTime?: string;
  description?: string;
};

export function NenufarCatalogue({products}: {products: NenufarCatalogueItem[]}) {
  const [catalog, setCatalog] = useState('todos');
  const [technique, setTechnique] = useState('todas');
  const [query, setQuery] = useState('');
  const catalogues = ['todos', ...Array.from(new Set(products.map((product) => product.catalogName).filter(Boolean)))];
  const techniques = ['todas', ...Array.from(new Set(products.map((product) => product.technique).filter(Boolean)))];
  const visibleProducts = useMemo(() => products.filter((product) => {
    const search = `${product.title} ${product.description ?? ''} ${product.technique ?? ''}`.toLowerCase();
    return (catalog === 'todos' || product.catalogName === catalog) &&
      (technique === 'todas' || product.technique === technique) &&
      (!query.trim() || search.includes(query.trim().toLowerCase()));
  }), [catalog, products, query, technique]);

  return <section id="productos" className="nenufar-catalogue">
    <div className="nenufar-shell">
      <div className="section-heading"><p>⌑ Colección & tienda Nenúfar</p><h2>Piezas por catálogo <em>listas para comprar</em></h2><span>Explora y personaliza cada regalo de nuestras colecciones estacionales. Compra en línea o consulta los detalles con el taller.</span></div>
      <div id="catalogos" className="catalogue-tabs" aria-label="Filtrar por catálogo">
        {catalogues.map((item) => <button key={item} type="button" className={catalog === item ? 'active' : ''} onClick={() => setCatalog(item)}>{item === 'todos' ? 'Todos los catálogos' : item}<b>{item === 'todos' ? products.length : products.filter((product) => product.catalogName === item).length}</b></button>)}
      </div>
      <div className="catalogue-filters">
        <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar joyero, termo, esfera, libreta..." /></label>
        <div>{techniques.map((item) => <button key={item} type="button" className={technique === item ? 'active' : ''} onClick={() => setTechnique(item)}>{item === 'todas' ? 'Todas las técnicas' : item}</button>)}</div>
      </div>
      {visibleProducts.length ? <div className="catalogue-grid">{visibleProducts.map((product) => <article className="catalogue-card" key={product.id}>
        <Link to={`/products/${product.handle}`} prefetch="intent" className="catalogue-card__image">
          {product.image ? <img src={product.image.url} alt={product.image.altText || product.title} /> : <span />}
          {product.catalogName && <b>{product.catalogName}</b>}
        </Link>
        <div className="catalogue-card__body"><div className="catalogue-card__meta"><span>{product.technique || 'Personalizado'}</span>{product.leadTime && <small>◷ {product.leadTime}</small>}</div>
          <h3><Link to={`/products/${product.handle}`} prefetch="intent">{product.title}</Link></h3><p>{product.description || 'Una pieza hecha con cuidado para convertir cada ocasión en un recuerdo.'}</p>
          <div className="catalogue-card__purchase"><strong>{new Intl.NumberFormat('es-MX', {style: 'currency', currency: product.price.currencyCode}).format(Number(product.price.amount))}</strong><Link to={`/products/${product.handle}`} prefetch="intent">Personalizar <span>→</span></Link></div>
        </div>
      </article>)}</div> : <div className="catalogue-empty"><p>No encontramos productos con esos filtros.</p><button type="button" onClick={() => {setCatalog('todos'); setTechnique('todas'); setQuery('');}}>Restablecer filtros</button></div>}
      <div className="catalogue-custom-order"><span>✦</span><div><h3>¿Buscas una pieza fuera de catálogo o un tiraje para tu empresa?</h3><p>Fabricamos proyectos especiales en madera, acrílico, metal, textiles y vinil con tu logotipo.</p></div><a href="#cotizador">Cotizar pedido especial</a></div>
    </div>
  </section>;
}
