import {useEffect} from 'react';
import {
  AnalyticsEvent,
  type CartLineUpdatePayload,
  useAnalytics,
} from '@shopify/hydrogen';

type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_variant: string;
  price: number;
  quantity: number;
  item_brand: string;
  item_category?: string;
  item_sku?: string | null;
};

function amount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function productItem(product: {
  id: string;
  title: string;
  price: string;
  quantity: number;
  vendor: string;
  variantId: string;
  variantTitle: string;
  productType?: string;
  sku?: string | null;
}): AnalyticsItem {
  return {
    item_id: product.id,
    item_name: product.title,
    item_variant: product.variantTitle,
    price: amount(product.price),
    quantity: product.quantity,
    item_brand: product.vendor,
    ...(product.productType ? {item_category: product.productType} : {}),
    ...(product.sku ? {item_sku: product.sku} : {}),
  };
}

function cartLineItem(line: NonNullable<CartLineUpdatePayload['currentLine']>) {
  const merchandise = line.merchandise;

  return {
    item_id: merchandise.product.id,
    item_name: merchandise.product.title,
    item_variant: merchandise.title,
    price: amount(merchandise.price.amount),
    quantity: line.quantity,
    item_brand: merchandise.product.vendor,
  } satisfies AnalyticsItem;
}

function cartValue(item: AnalyticsItem) {
  return item.price * item.quantity;
}

export function StorefrontAnalytics() {
  const {canTrack, register, shop, subscribe} = useAnalytics();
  const {ready} = register('nenufar-gtm');

  useEffect(() => {
    const push = (event: string, values: Record<string, unknown>) => {
      if (!canTrack()) return;

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({event, ...values});
    };

    subscribe(AnalyticsEvent.PAGE_VIEWED, ({url}) => {
      push('page_view', {page_location: url});
    });

    subscribe(AnalyticsEvent.PRODUCT_VIEWED, ({products}) => {
      const items = products.map(productItem);
      push('view_item', {
        currency: shop?.currency,
        value: items.reduce((total, item) => total + cartValue(item), 0),
        items,
      });
    });

    subscribe(AnalyticsEvent.CART_VIEWED, ({cart}) => {
      if (!cart) return;

      const items = cart.lines.nodes.map(cartLineItem);
      push('view_cart', {
        currency: cart.cost.totalAmount.currencyCode,
        value: amount(cart.cost.totalAmount.amount),
        items,
      });
    });

    subscribe(AnalyticsEvent.PRODUCT_ADD_TO_CART, ({currentLine}) => {
      if (!currentLine) return;

      const item = cartLineItem(currentLine);
      push('add_to_cart', {
        currency: currentLine.cost.totalAmount.currencyCode,
        value: cartValue(item),
        items: [item],
      });
    });

    subscribe(AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, ({prevLine}) => {
      if (!prevLine) return;

      const item = cartLineItem(prevLine);
      push('remove_from_cart', {
        currency: prevLine.cost.totalAmount.currencyCode,
        value: cartValue(item),
        items: [item],
      });
    });

    subscribe(AnalyticsEvent.SEARCH_VIEWED, ({searchTerm}) => {
      push('view_search_results', {search_term: searchTerm});
    });

    ready();
  }, [canTrack, ready, shop?.currency, subscribe]);

  return null;
}
