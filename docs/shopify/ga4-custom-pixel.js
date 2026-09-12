// Nenúfar checkout measurement — Shopify Custom Pixel
// Configure the pixel's Customer privacy setting to require Analytics consent.

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

gtag('consent', 'update', {
  analytics_storage: 'granted',
});

(function loadGtm(window, document, scriptTag, dataLayerName, containerId) {
  window[dataLayerName].push({'gtm.start': Date.now(), event: 'gtm.js'});
  const firstScript = document.getElementsByTagName(scriptTag)[0];
  const script = document.createElement(scriptTag);
  const query = dataLayerName !== 'dataLayer' ? `&l=${dataLayerName}` : '';

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}${query}`;
  firstScript.parentNode.insertBefore(script, firstScript);
})(window, document, 'script', 'dataLayer', 'GTM-KZQS4HLW');

function money(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function item(lineItem) {
  const variant = lineItem.variant;
  const product = variant?.product;

  return {
    item_id: product?.id || variant?.id || lineItem.id,
    item_name: product?.title || lineItem.title,
    item_variant: variant?.title,
    item_sku: variant?.sku,
    price: money(variant?.price?.amount),
    quantity: lineItem.quantity,
    item_brand: product?.vendor,
  };
}

function checkoutData(event) {
  const checkout = event.data.checkout;
  const items = checkout.lineItems.map(item);

  return {
    currency: checkout.currencyCode,
    value: money(checkout.totalPrice?.amount),
    items,
  };
}

analytics.subscribe('checkout_started', (event) => {
  window.dataLayer.push({event: 'begin_checkout', ...checkoutData(event)});
});

analytics.subscribe('checkout_shipping_info_submitted', (event) => {
  window.dataLayer.push({event: 'add_shipping_info', ...checkoutData(event)});
});

analytics.subscribe('payment_info_submitted', (event) => {
  window.dataLayer.push({event: 'add_payment_info', ...checkoutData(event)});
});

analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  const transactionId = checkout.order?.id || checkout.token;

  if (!transactionId) return;

  window.dataLayer.push({
    event: 'purchase',
    transaction_id: transactionId,
    shipping: money(checkout.shippingLine?.price?.amount),
    tax: money(checkout.totalTax?.amount),
    ...checkoutData(event),
  });
});
