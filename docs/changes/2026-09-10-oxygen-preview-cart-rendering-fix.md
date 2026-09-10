# Oxygen preview: cart rendering fix

## Objective

Deploy the cart optimistic-line rendering fix for preview verification.

## Scope

Publish commit `c46827b` to a Shopify Oxygen preview environment.

## Deployment

- Preview URL: https://01m262yzykem48kzdf8e0q7www-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

- Oxygen completed the build, upload, deployment, and routing checks.
- The preview access gate loaded successfully. It requires a signed-in Shopify
  account before a live add-to-cart action can be performed.

## Remaining risks

The final interaction check is pending Shopify preview authentication. The
cart should be tested by adding a product and confirming that the cart drawer
opens instead of the 500 error page.

## Rollback

Deploy the prior preview or revert commit `c46827b` and deploy again.
