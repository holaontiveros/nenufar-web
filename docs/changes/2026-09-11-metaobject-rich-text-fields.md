# MetaObject multiline fields converted to rich text

## Objective

Align long-form merchant-authored copy with Shopify's rich-text editor so headings, paragraphs, lists, and emphasis can be maintained without encoding layout in plain text.

## Scope

The production schema conversion targets these merchant-owned MetaObject fields:

- `nenufar_product_personalization.preview_copy`
- `nenufar_product_process_step.body`
- `nenufar_faq_group.description`
- `nenufar_faq_item.answer`

All four legacy Multi-line text fields were removed and recreated as Rich text fields in Shopify Admin. The replacement definitions are now saved in the production store.

## Data-loss note

Shopify does not support changing these field types in place. Removing a field deletes values associated with that field. The existing values were demo/test content and were approved for disposal. Production content must be entered only after the replacement definitions are saved.

## Validation

- Confirmed `preview_copy`, process-step `body`, FAQ-group `description`, and FAQ-item `answer` are saved as Rich text in Shopify Admin.
- Confirmed the old Multi-line definitions were removed before each replacement was saved.
- No storefront code or production content entries were changed.

## Risks and rollback

The rollback is manual: recreate the original field with its prior type and restore values from an export or source copy. Recreating the key after deletion must be done as a separate Shopify Admin save.

## Follow-up

1. Migrate authored production entries into the new Rich text fields.
2. Update Hydrogen readers to render rich-text values safely.
