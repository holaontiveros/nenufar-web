# Guía de colaboración de Nenúfar Web

## Estado base

- Aplicación de una sola página construida con React 19, TypeScript, Vite y Tailwind CSS v4.
- La migración aprobada a Hydrogen/Oxygen está en curso bajo `hydrogen/`. Hasta el cutover aprobado, la aplicación Vite en la raíz sigue siendo la implementación activa.
- La composición de la página y el estado compartido viven hoy en `src/App.tsx`; los bloques visuales viven en `src/components/`.
- El contenido actual es semilla/demo: productos, precios, variantes, dominio y reseñas deben validarse antes de considerarse datos de producción.
- Shopify es la fuente de verdad de productos, variantes, precios e imágenes en entornos configurados. El carrito usa Storefront Cart API y sólo su ID se guarda en `localStorage`; el pago usa el `checkoutUrl` real.
- Las imágenes remotas provienen principalmente de Unsplash. Antes de publicar se debe definir un inventario de activos propios y sus licencias.
- La integración comercial usa Shopify Storefront API con variables públicas de Vite. Los tokens Admin nunca deben incluirse en el frontend ni en el repositorio.
- Los atributos de catálogo que sostienen la UI se modelan como metafields de producto `custom`; consultar `docs/shopify/metafields.md` antes de cambiar la consulta o los filtros.
- La verificación mínima disponible es `npm run lint` (TypeScript) y `npm run build` (Vite). No hay suite de pruebas automatizadas aún.

## Flujo obligatorio para cada cambio

1. **Planear primero.** Antes de editar, presentar un plan breve con objetivo, alcance, archivos previstos, criterios de aceptación, validación y riesgo/rollback. Esperar confirmación si el cambio no fue solicitado de forma suficientemente concreta o si implica una decisión de arquitectura.
2. **Trabajar en un chunk pequeño.** Cada entrega debe resolver una sola capacidad coherente, ser revisable por sí misma y evitar mezclar refactors, contenido y funcionalidades no relacionadas.
3. **Ejecutar y verificar.** Implementar únicamente el plan aprobado. Correr los comandos de validación relevantes y comprobar manualmente los flujos afectados cuando aplique.
4. **Documentar.** Todo cambio debe dejar un registro en `docs/changes/` con el formato `YYYY-MM-DD-slug.md`, que incluya: objetivo, alcance, decisiones, archivos modificados, validación ejecutada, riesgos pendientes y rollback. Crear o actualizar documentación funcional/técnica adicional cuando el cambio la requiera.
5. **Registrar en Git.** Al terminar un chunk, revisar `git status`, añadir solamente los archivos correspondientes, crear un commit con un mensaje claro y confirmar el hash. No incorporar cambios ajenos ni secretos. El árbol de trabajo debe quedar limpio salvo cambios del usuario claramente ajenos al chunk.

## Gobierno de arquitectura

- Las decisiones arquitectónicas requieren aprobación explícita antes de implementarse. Esto incluye cambios de framework o dependencias, modelo de datos, persistencia, autenticación, APIs/backend, Shopify/checkout, despliegue, estructura principal de carpetas, estrategia de estado, seguridad y observabilidad.
- Para solicitar aprobación, documentar alternativas, recomendación, impacto, coste, migración, riesgos y rollback. Registrar la decisión aprobada en `docs/architecture/ADR-YYYY-MM-DD-slug.md` antes o dentro del mismo chunk que la implementa.
- Si una solicitud funcional exige una decisión arquitectónica no aprobada, detener la ejecución tras presentar las opciones; no asumir una elección.

## Reglas de calidad y seguridad

- Mantener TypeScript estricto y evitar `any`, secretos en el repositorio, cambios destructivos y dependencias innecesarias.
- Tratar datos demo, IDs de variante, precios, URLs, enlaces de WhatsApp y textos comerciales como datos no verificados hasta que el responsable los confirme.
- Preservar accesibilidad, diseño responsivo y español consistente en la interfaz.
- No eliminar ni sobrescribir trabajo existente sin una instrucción explícita y una comprobación previa del alcance.

## Convenciones de commits

- Usar commits atómicos con prefijos como `feat:`, `fix:`, `docs:`, `refactor:`, `test:` o `chore:`.
- El commit debe incluir la documentación del chunk y ninguna modificación no relacionada.
