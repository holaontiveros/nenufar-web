import {data} from 'react-router';
import type {Route} from './+types/$';
import {ActionLink} from '~/components/Action';

export const meta: Route.MetaFunction = () => [
  {title: 'Página no encontrada | Nenúfar'},
];

export async function loader() {
  return data(null, {status: 404});
}

export default function CatchAllPage() {
  return (
    <section className="not-found">
      <div className="not-found__orb not-found__orb--pink" aria-hidden="true" />
      <div className="not-found__orb not-found__orb--violet" aria-hidden="true" />
      <div className="not-found__content nenufar-shell">
        <p className="not-found__eyebrow">Ruta extraviada</p>
        <div className="not-found__scene" aria-hidden="true">
          <span className="not-found__star not-found__star--one">✦</span>
          <span className="not-found__star not-found__star--two">✧</span>
          <span className="not-found__star not-found__star--three">✦</span>
          <div className="not-found__ribbon not-found__ribbon--first" />
          <div className="not-found__ribbon not-found__ribbon--second" />
          <div className="not-found__gift">
            <span className="not-found__gift-lid" />
            <span className="not-found__gift-bow not-found__gift-bow--left" />
            <span className="not-found__gift-bow not-found__gift-bow--right" />
            <span className="not-found__gift-mark">404</span>
          </div>
        </div>
        <h1>
          Esta pieza se fue <em>de paseo.</em>
        </h1>
        <p className="not-found__copy">
          No encontramos esta página, pero sí muchos detalles bonitos esperando
          convertirse en un regalo.
        </p>
        <div className="not-found__actions">
          <ActionLink to="/" size="large" variant="primary">
            Volver al inicio <span aria-hidden="true">→</span>
          </ActionLink>
          <ActionLink className="not-found__catalog-link" to="/catalogo" variant="ghost">
            Explorar el catálogo
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
