import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer(_: FooterProps) {
  return (
    <footer className="brand-footer">
      <div className="brand-footer__inner">
        <div><p className="brand-footer__name">nenúfar</p><p>Detalles hechos con intención, para recordar.</p></div>
        <div className="brand-footer__links"><a href="/catalogo">Productos</a> {/* El taller — TODO: re-enable */}<a href="/preguntas">Preguntas</a><a href="/#cotizador">Contacto</a></div>
        <p className="brand-footer__copyright">© {new Date().getFullYear()} Nenúfar Taller Creativo</p>
      </div>
    </footer>
  );
}
