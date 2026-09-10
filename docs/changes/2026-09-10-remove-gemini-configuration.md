# Retiro de configuración Gemini

## Objetivo

Eliminar la dependencia y configuración de Gemini que no tiene uso en la aplicación.

## Alcance

- Se eliminó `@google/genai` de las dependencias.
- Se retiraron `GEMINI_API_KEY`, `APP_URL`, las instrucciones heredadas de AI Studio, el capability de Gemini y el plugin de medios sin activos asociados.
- `.env.example` y `README.md` ahora documentan solamente la configuración de Storefront API necesaria para la compra.

## Decisiones

- No quedan activos locales que requieran el plugin de medios heredado de AI Studio, por lo que se retiró junto con su configuración.

## Archivos modificados

- `package.json`
- `package-lock.json`
- `.env.example`
- `README.md`
- `AGENTS.md`
- `metadata.json`
- `vite.config.ts`

## Validación

- Pendiente de ejecutar junto con el siguiente chunk de integración Shopify.

## Riesgos pendientes

- No se incluyó ningún token real; el entorno de producción debe definir sus propias variables.

## Rollback

Revertir el commit de este chunk y restaurar la dependencia únicamente si se aprueba volver a incorporar una función Gemini.
