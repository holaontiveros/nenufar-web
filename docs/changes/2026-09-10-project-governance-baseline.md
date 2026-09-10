# Baseline de gobierno del proyecto

## Objetivo

Establecer el protocolo de colaboración para continuar la base generada por Google AI Studio de forma planificada, documentada y trazable en Git.

## Alcance

- Se añadió `AGENTS.md` con el estado técnico conocido del proyecto y reglas obligatorias para planificación, trabajo incremental, documentación, aprobación de arquitectura, calidad y commits.
- No se modificó el comportamiento de la aplicación ni sus dependencias.

## Decisiones

- Cada capacidad se desarrollará en un chunk pequeño y revisable.
- Los cambios deberán documentarse en `docs/changes/`.
- Las decisiones arquitectónicas se someterán a aprobación explícita y se registrarán como ADRs en `docs/architecture/`.
- Cada chunk concluido se añadirá a Git mediante un commit atómico.

## Archivos modificados

- `AGENTS.md`
- `docs/changes/2026-09-10-project-governance-baseline.md`

## Validación

- `npm run lint` — correcto.
- `npm run build` — correcto.

## Riesgos pendientes

- Productos, variantes Shopify, precios, reseñas y dominio son datos de ejemplo que requieren confirmación.
- Las imágenes externas y las dependencias/configuración heredadas de AI Studio deben revisarse antes de producción.

## Rollback

Revertir el commit que introduce esta documentación y guía de colaboración.
