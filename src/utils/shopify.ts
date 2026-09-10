import { CartItem, CatalogProduct } from '../types';

const API_VERSION = '2026-01';
const CART_STORAGE_KEY = 'nenufar_shopify_cart_id_v1';

type Money = { amount: string; currencyCode: string };
type ShopifyMetafield = { key: string; value: string } | null;

interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  metafields: ShopifyMetafield[];
  variants: { nodes: Array<{ id: string; title: string; price: Money }> };
}

interface ShopifyCartLineNode {
  id: string;
  quantity: number;
  attributes: Array<{ key: string; value: string }>;
  merchandise: { id: string; title: string; price: Money; product: ShopifyProductNode };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: ShopifyCartLineNode[] };
}

const PRODUCT_FIELDS = `
  id title description productType tags
  featuredImage { url altText }
  metafields(identifiers: [
    { namespace: "custom", key: "catalog_id" }
    { namespace: "custom", key: "catalog_name" }
    { namespace: "custom", key: "technique" }
    { namespace: "custom", key: "materials" }
    { namespace: "custom", key: "lead_time" }
    { namespace: "custom", key: "badge" }
    { namespace: "custom", key: "is_popular" }
    { namespace: "custom", key: "allow_custom_text" }
    { namespace: "custom", key: "custom_text_placeholder" }
  ]) { key value }
  variants(first: 20) { nodes { id title price { amount currencyCode } } }
`;

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  lines(first: 100) {
    nodes {
      id quantity attributes { key value }
      merchandise {
        ... on ProductVariant {
          id title price { amount currencyCode }
          product { ${PRODUCT_FIELDS} }
        }
      }
    }
  }
`;

function getConfig() {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  if (!domain || !token) throw new Error('La tienda no está disponible en este momento.');
  return { domain: domain.replace(/^https?:\/\//, '').replace(/\/+$/, ''), token };
}

async function request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const { domain, token } = getConfig();
  const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error('No pudimos comunicarnos con la tienda.');
  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message || 'No pudimos procesar la solicitud de compra.');
  }
  return payload.data;
}

function meta(product: ShopifyProductNode, key: string): string | undefined {
  return product.metafields.find((field) => field?.key === key)?.value;
}

function catalogId(value: string | undefined): CatalogProduct['catalogId'] {
  const ids: CatalogProduct['catalogId'][] = ['madre', 'padre', 'maestro', 'navidad', 'bodas', 'todo-el-ano'];
  return ids.includes(value as CatalogProduct['catalogId']) ? (value as CatalogProduct['catalogId']) : 'todo-el-ano';
}

export function mapShopifyProduct(product: ShopifyProductNode, selectedVariantId?: string): CatalogProduct {
  const variants = product.variants.nodes.map((variant) => ({ id: variant.id, name: variant.title, price: Number(variant.price.amount) }));
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const selectedCatalog = catalogId(meta(product, 'catalog_id'));
  return {
    id: product.id,
    catalogId: selectedCatalog,
    catalogName: meta(product, 'catalog_name') || (selectedCatalog === 'todo-el-ano' ? 'Todo el año' : selectedCatalog),
    name: product.title,
    category: product.productType || 'Regalos personalizados',
    technique: meta(product, 'technique') || 'Personalización artesanal',
    materials: meta(product, 'materials') || product.productType || 'Materiales seleccionados',
    price: selectedVariant?.price ?? 0,
    currency: product.variants.nodes[0]?.price.currencyCode || 'MXN',
    image: product.featuredImage?.url || '',
    description: product.description,
    leadTime: meta(product, 'lead_time') || 'Consulta disponibilidad',
    tag: meta(product, 'badge') || product.tags[0] || 'Personalizable',
    isPopular: meta(product, 'is_popular') === 'true',
    shopifyVariantId: selectedVariant?.id || '',
    shopifyHandle: product.id,
    allowCustomText: meta(product, 'allow_custom_text') === 'true',
    customTextPlaceholder: meta(product, 'custom_text_placeholder'),
    variants,
  };
}

function mapCart(cart: ShopifyCart): CartItem[] {
  return cart.lines.nodes.map((line) => ({
    id: line.id,
    product: mapShopifyProduct(line.merchandise.product, line.merchandise.id),
    quantity: line.quantity,
    customText: line.attributes.find((attribute) => attribute.key === 'Personalización')?.value || '',
    selectedVariant: line.merchandise.id,
  }));
}

function getUserErrors(payload: { userErrors: Array<{ message: string }> }) {
  if (payload.userErrors.length) throw new Error(payload.userErrors[0].message);
}

export function getStoredCartId(): string | null {
  return typeof window === 'undefined' ? null : localStorage.getItem(CART_STORAGE_KEY);
}

export function clearStoredCartId(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(CART_STORAGE_KEY);
}

function saveCartId(cartId: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(CART_STORAGE_KEY, cartId);
}

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  const data = await request<{ products: { nodes: ShopifyProductNode[] } }>(`query CatalogProducts { products(first: 100, sortKey: TITLE) { nodes { ${PRODUCT_FIELDS} } } }`);
  return data.products.nodes.map((product) => mapShopifyProduct(product));
}

export async function fetchCart(cartId: string): Promise<{ id: string; checkoutUrl: string; items: CartItem[] } | null> {
  const data = await request<{ cart: ShopifyCart | null }>(`query Cart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: cartId });
  return data.cart ? { id: data.cart.id, checkoutUrl: data.cart.checkoutUrl, items: mapCart(data.cart) } : null;
}

export async function addCartLine(cartId: string | null, product: CatalogProduct, quantity: number, customText: string, variantId?: string) {
  const line = { merchandiseId: variantId || product.shopifyVariantId, quantity, attributes: customText.trim() ? [{ key: 'Personalización', value: customText.trim() }] : [] };
  if (cartId) {
    const data = await request<{ cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(`mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lines: [line] });
    getUserErrors(data.cartLinesAdd);
    saveCartId(data.cartLinesAdd.cart.id);
    return { id: data.cartLinesAdd.cart.id, checkoutUrl: data.cartLinesAdd.cart.checkoutUrl, items: mapCart(data.cartLinesAdd.cart) };
  }
  const data = await request<{ cartCreate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(`mutation CreateCart($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } } }`, { input: { lines: [line] } });
  getUserErrors(data.cartCreate);
  saveCartId(data.cartCreate.cart.id);
  return { id: data.cartCreate.cart.id, checkoutUrl: data.cartCreate.cart.checkoutUrl, items: mapCart(data.cartCreate.cart) };
}

export async function updateCartLine(cartId: string, item: CartItem, quantity: number, customText = item.customText) {
  const data = await request<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(`mutation UpdateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lines: [{ id: item.id, quantity, attributes: customText.trim() ? [{ key: 'Personalización', value: customText.trim() }] : [] }] });
  getUserErrors(data.cartLinesUpdate);
  return { id: data.cartLinesUpdate.cart.id, checkoutUrl: data.cartLinesUpdate.cart.checkoutUrl, items: mapCart(data.cartLinesUpdate.cart) };
}

export async function removeCartLine(cartId: string, itemId: string) {
  const data = await request<{ cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(`mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lineIds: [itemId] });
  getUserErrors(data.cartLinesRemove);
  return { id: data.cartLinesRemove.cart.id, checkoutUrl: data.cartLinesRemove.cart.checkoutUrl, items: mapCart(data.cartLinesRemove.cart) };
}

export async function updateCartAttributes(cartId: string, orderNotes: string) {
  const data = await request<{ cartAttributesUpdate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(`mutation UpdateAttributes($cartId: ID!, $attributes: [AttributeInput!]!) { cartAttributesUpdate(cartId: $cartId, attributes: $attributes) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, attributes: orderNotes.trim() ? [{ key: 'Notas de entrega', value: orderNotes.trim() }] : [] });
  getUserErrors(data.cartAttributesUpdate);
  return { id: data.cartAttributesUpdate.cart.id, checkoutUrl: data.cartAttributesUpdate.cart.checkoutUrl, items: mapCart(data.cartAttributesUpdate.cart) };
}
