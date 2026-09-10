import { mkdir, writeFile } from 'node:fs/promises';
import { CATALOG_PRODUCTS } from '../src/data/productsData';

const outputPath = new URL('../docs/shopify/nenufar-demo-products.csv', import.meta.url);
const headers = [
  'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker',
  'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service', 'Variant Price',
  'Variant Requires Shipping', 'Variant Taxable', 'Image Src', 'Image Position', 'Image Alt Text', 'Status',
  'Catálogo (product.metafields.custom.catalog_id)',
  'Nombre de catálogo (product.metafields.custom.catalog_name)',
  'Técnica (product.metafields.custom.technique)',
  'Materiales (product.metafields.custom.materials)',
  'Tiempo de producción (product.metafields.custom.lead_time)',
  'Badge (product.metafields.custom.badge)',
  'Destacado (product.metafields.custom.is_popular)',
  'Permite personalización (product.metafields.custom.allow_custom_text)',
  'Indicaciones de personalización (product.metafields.custom.custom_text_placeholder)',
];

function csv(value: string | number | boolean | undefined) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = CATALOG_PRODUCTS.flatMap((product) => {
  const variants = product.variants?.length ? product.variants : [{ id: product.shopifyVariantId, name: 'Default Title', price: product.price }];
  return variants.map((variant, index) => [
    product.shopifyHandle,
    index === 0 ? product.name : '',
    index === 0 ? product.description : '',
    index === 0 ? 'Nenúfar' : '',
    '',
    index === 0 ? product.category : '',
    index === 0 ? `${product.catalogId}, ${product.technique}, ${product.tag}` : '',
    index === 0 ? 'TRUE' : '',
    'Acabado',
    variant.name,
    variant.id,
    '',
    '',
    '',
    'deny',
    'manual',
    variant.price,
    'TRUE',
    'TRUE',
    index === 0 ? product.image : '',
    index === 0 ? 1 : '',
    index === 0 ? product.name : '',
    'active',
    index === 0 ? product.catalogId : '',
    index === 0 ? product.catalogName : '',
    index === 0 ? product.technique : '',
    index === 0 ? product.materials : '',
    index === 0 ? product.leadTime : '',
    index === 0 ? product.tag : '',
    index === 0 ? Boolean(product.isPopular) : '',
    index === 0 ? product.allowCustomText : '',
    index === 0 ? product.customTextPlaceholder : '',
  ]);
});

await mkdir(new URL('../docs/shopify/', import.meta.url), { recursive: true });
await writeFile(outputPath, [headers, ...rows].map((row) => row.map(csv).join(',')).join('\n') + '\n', 'utf8');
