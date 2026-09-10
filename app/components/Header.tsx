import {Suspense, useState} from 'react';
import {Await, Link, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

const navigation = [
  ['Productos', '#productos'], ['Catálogos', '#catalogos'], ['El Taller', '#tecnicas'],
  ['Trabajos Reales', '#galeria'], ['Pedidos a Medida', '#cotizador'], ['Preguntas', '#faq'],
] as const;

export function Header({cart}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="brand-header">
      <div className="brand-header__inner">
        <Link className="brand-logo" prefetch="intent" to="/" aria-label="Nenúfar, inicio">
          <span className="brand-logo__mark" aria-hidden="true">✦</span>
          <span><strong>nenúfar</strong><small>taller creativo</small></span>
        </Link>
        <nav className="brand-nav" aria-label="Navegación principal">
          {navigation.map(([label, href]) => <a key={href} href={`/${href}`}>{label}</a>)}
        </nav>
        <div className="brand-header__actions">
          <CartToggle cart={cart} />
          <a className="brand-whatsapp" href="#cotizador">◌ <span>WhatsApp</span></a>
          <button className="brand-menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>☰</button>
        </div>
        {mobileMenuOpen && <nav className="brand-mobile-nav" aria-label="Navegación móvil">
          {navigation.map(([label, href]) => <a key={href} href={`/${href}`} onClick={() => setMobileMenuOpen(false)}>{label}</a>)}
        </nav>}
      </div>
    </header>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return <Suspense fallback={<CartBadge count={0} />}><Await resolve={cart}><CartBanner /></Await></Suspense>;
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();
  return <a className="brand-cart" href="/cart" onClick={(event) => {
    event.preventDefault();
    open('cart');
    publish('cart_viewed', {cart, prevCart, shop, url: window.location.href || ''} as CartViewPayload);
  }} aria-label={`Abrir carrito (${count} productos)`}><span aria-hidden="true">⌑</span>{count > 0 && <b>{count}</b>}</a>;
}
