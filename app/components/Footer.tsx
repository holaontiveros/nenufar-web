import {Await} from 'react-router';
import {Suspense} from 'react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({footer}: FooterProps) {
  return (
    <footer className="brand-footer">
      <Suspense fallback={<FooterContent footer={null} />}>
        <Await resolve={footer}>{(data) => <FooterContent footer={data} />}</Await>
      </Suspense>
    </footer>
  );
}

function FooterContent({footer}: {footer: FooterQuery | null}) {
  const menuItems = footer?.menu?.items ?? [];
  const socialLinks = footer?.shop.socialLinks?.references?.nodes ?? [];
  const policies = [
    footer?.shop.privacyPolicy,
    footer?.shop.shippingPolicy,
    footer?.shop.termsOfService,
    footer?.shop.refundPolicy,
    footer?.shop.subscriptionPolicy,
  ].filter((policy): policy is NonNullable<typeof policy> => policy != null);

  return (
    <>
      <div className="brand-footer__inner">
        <div className="brand-footer__brand">
          <a href="/" aria-label="Nenúfar, inicio">
            <img src="/assets/nenufar_logo_horizontal-white.svg" alt="Nenúfar" />
          </a>
          <p>Regalos personalizados, piezas hechas con intención y detalles que se quedan para siempre.</p>
        </div>
        {menuItems.length > 0 && <nav className="brand-footer__menu" aria-label="Navegación del pie de página">
          <h2>Explora</h2>
          {menuItems.map((item) => item.url && <a key={item.id} href={item.url}>{item.title}</a>)}
        </nav>}
        {socialLinks.length > 0 && <section className="brand-footer__social" aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">Síguenos</h2>
          <div>
            {socialLinks.map((link) => link.url?.value && <a key={link.id} href={link.url.value} target="_blank" rel="noreferrer" aria-label={link.label?.value || link.platform?.value || 'Red social'} title={link.platform?.value || 'Red social'}>
              <SocialMark platform={link.platform?.value} />
            </a>)}
          </div>
        </section>}
      </div>
      <div className="brand-footer__legal"><div>
        {policies.length > 0 && <><a href="/policies">Políticas</a>{policies.map((policy) => <a key={policy.id} href={`/policies/${policy.handle}`}>{policy.title}</a>)}</>}
      </div><p>© {new Date().getFullYear()} Nenúfar Taller Creativo</p></div>
    </>
  );
}

function SocialMark({platform}: {platform?: string | null}) {
  return <span aria-hidden="true">{({instagram: '◎', facebook: 'f', tiktok: '♪', pinterest: 'p', youtube: '▶', x: '𝕏', linkedin: 'in'} as Record<string, string>)[platform?.toLowerCase() ?? ''] ?? '↗'}</span>;
}
