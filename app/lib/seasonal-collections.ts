const SEASONAL_COLLECTION_LABELS: Record<string, string> = {
  madre: 'Día de la Madre',
  padre: 'Día del Padre',
  maestro: 'Día del Maestro',
  navidad: 'Navidad & Fin de Año',
  bodas: 'Bodas & Eventos Especiales',
};

export function getSeasonalCollectionLabel(tags: string[] = []) {
  return (
    tags
      .map((tag) => SEASONAL_COLLECTION_LABELS[tag.toLowerCase()])
      .find(Boolean) ?? 'Pieza personalizada'
  );
}
