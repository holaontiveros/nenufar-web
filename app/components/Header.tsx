import {Suspense, useState} from 'react';
import {Await, Link, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {ActionAnchor, ActionButton} from '~/components/Action';
import {CartIcon} from '~/components/CartIcons';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  whatsappUrl: string | null;
}

export function Header({cart, header}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = header.menu?.items ?? [];

  return (
    <header className="brand-header">
      <div className="brand-header__inner">
        <Link className="brand-logo" prefetch="intent" to="/" aria-label="Nenúfar, inicio">
          <img alt="Nenúfar" src="/assets/nenufar_logo_horizontal.svg" />
        </Link>
        <nav className="brand-nav" aria-label="Navegación principal">
          {navigation.map((item) => item.url && <a key={item.id} href={item.url}>{item.title}</a>)}
        </nav>
        <div className="brand-header__actions">
          <CartToggle cart={cart} />
          <ActionButton className="brand-menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} size="icon-sm" variant="icon">☰</ActionButton>
        </div>
        {mobileMenuOpen && <nav className="brand-mobile-nav" aria-label="Navegación móvil">
          {navigation.map((item) => item.url && <a key={item.id} href={item.url} onClick={() => setMobileMenuOpen(false)}>{item.title}</a>)}
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
  return <ActionAnchor className="brand-cart" href="/cart" onClick={(event) => {
    event.preventDefault();
    open('cart');
    publish('cart_viewed', {cart, prevCart, shop, url: window.location.href || ''} as CartViewPayload);
  }} aria-label={`Abrir carrito (${count} productos)`} size="icon-sm" variant="icon"><CartIcon />{count > 0 && <b>{count}</b>}</ActionAnchor>;
}
