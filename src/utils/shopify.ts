import { CartItem, ShopifyConfig, CatalogProduct } from '../types';
import { DEFAULT_SHOPIFY_CONFIG } from '../data/productsData';

const SHOPIFY_STORAGE_KEY = 'nenufar_shopify_config_v1';

export function getStoredShopifyConfig(): ShopifyConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_SHOPIFY_CONFIG;
  }
  try {
    const raw = localStorage.getItem(SHOPIFY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SHOPIFY_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn('Could not read stored Shopify configuration', err);
  }
  return DEFAULT_SHOPIFY_CONFIG;
}

export function saveShopifyConfig(config: ShopifyConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SHOPIFY_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Could not save Shopify configuration', err);
  }
}

export function cleanShopifyDomain(domain: string): string {
  let cleaned = domain.trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//, '');
  cleaned = cleaned.replace(/\/+$/, '');
  if (!cleaned) {
    return 'nenufar-regalos.myshopify.com';
  }
  // If user enters just the store name without myshopify.com or domain, append .myshopify.com
  if (!cleaned.includes('.')) {
    cleaned = `${cleaned}.myshopify.com`;
  }
  return cleaned;
}

/**
 * Generates an official Shopify Cart Permalink for a single product with custom engraving attributes.
 * Shopify Cart Permalinks format:
 * https://{shop}.myshopify.com/cart/{variant_id}:{quantity}?attributes[Custom_Text]={text}&note={note}
 */
export function buildSingleProductShopifyUrl(
  product: CatalogProduct,
  config: ShopifyConfig,
  customText: string = '',
  quantity: number = 1,
  selectedVariantId?: string
): string {
  const domain = cleanShopifyDomain(config.shopDomain);
  const variantId = selectedVariantId || product.shopifyVariantId || '445210982001';
  
  const params = new URLSearchParams();
  if (customText.trim()) {
    params.set('attributes[Personalización_Grabado]', customText.trim());
    params.set('note', `Personalización para ${product.name}: "${customText.trim()}"`);
  }
  params.set('attributes[Catálogo]', product.catalogName);
  params.set('attributes[Taller]', 'nenúfar - Regalos Personalizados');
  params.set('ref', 'nenufar_web');

  const queryString = params.toString();
  return `https://${domain}/cart/${variantId}:${quantity}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Generates an official Shopify Cart Permalink for all items in the cart.
 * Multi-item format:
 * https://{shop}.myshopify.com/cart/{variant_id_1}:{qty_1},{variant_id_2}:{qty_2}?attributes[...]=...
 */
export function buildCartShopifyCheckoutUrl(
  cartItems: CartItem[],
  config: ShopifyConfig,
  orderNotes?: string
): string {
  if (cartItems.length === 0) return '';
  const domain = cleanShopifyDomain(config.shopDomain);

  const cartPathParts = cartItems.map((item) => {
    const variantId = item.selectedVariant || item.product.shopifyVariantId || '445210982001';
    return `${variantId}:${item.quantity}`;
  });
  const cartPath = cartPathParts.join(',');

  const params = new URLSearchParams();
  
  // Combine all personalizations into cart attributes for the Shopify merchant
  cartItems.forEach((item, index) => {
    if (item.customText.trim()) {
      params.set(
        `attributes[Item_${index + 1}_${item.product.name.slice(0, 20)}]`,
        item.customText.trim()
      );
    }
  });

  const notesList = cartItems
    .filter((i) => i.customText.trim())
    .map((i) => `• ${i.product.name}: "${i.customText.trim()}"`)
    .join('\n');

  const fullNote = [orderNotes, notesList].filter(Boolean).join('\n\n');
  if (fullNote) {
    params.set('note', fullNote);
  }

  params.set('attributes[Plataforma]', 'nenúfar - Catálogo Web');
  params.set('ref', 'nenufar_landing');

  const queryString = params.toString();
  return `https://${domain}/cart/${cartPath}${queryString ? `?${queryString}` : ''}`;
}
