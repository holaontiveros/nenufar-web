# MetaObject multiline fields converted to rich text

## Objective

Align long-form merchant-authored copy with Shopify's rich-text editor so headings, paragraphs, lists, and emphasis can be maintained without encoding layout in plain text.

## Scope

The production schema conversion targets these merchant-owned MetaObject fields:

- `nenufar_product_personalization.preview_copy`
- `nenufar_product_process_step.body`
- `nenufar_faq_group.description`
- `nenufar_faq_item.answer`

`preview_copy` was recreated as Rich text after its legacy Multi-line text definition was removed. The process-step body was removed from the old definition and is awaiting its replacement Rich text field; FAQ fields remain to be converted in the next Admin schema chunk.

## Data-loss note

Shopify does not support changing these field types in place. Removing a field deletes values associated with that field. The existing values were demo/test content and were approved for disposal. Production content must be entered only after the replacement definitions are saved.

## Validation

- Confirmed `preview_copy` is saved as Rich text in Shopify Admin.
- Confirmed the legacy process-step `body` field was removed; replacement is pending.
- No storefront code or production content entries were changed.

## Risks and rollback

The rollback is manual: recreate the original field with its prior type and restore values from an export or source copy. Recreating the key after deletion must be done as a separate Shopify Admin save.

## Follow-up

1. Recreate `nenufar_product_process_step.body` as Rich text.
2. Replace `nenufar_faq_group.description` and `nenufar_faq_item.answer` as Rich text.
3. Migrate authored production entries and update Hydrogen readers to render rich-text HTML safely.
