import React, { useState } from 'react';
import { SeasonalCatalog } from '../types';
import { SEASONAL_CATALOGS } from '../data/mockData';
import { CatalogModal } from './CatalogModal';
import { ArrowUpRight, BookOpen, MessageCircle, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface SeasonalCatalogsProps {
  onOpenWhatsApp: (preset?: string) => void;
  onSelectCatalogProducts?: (catalogId: string) => void;
}

export const SeasonalCatalogs: React.FC<SeasonalCatalogsProps> = ({
  onOpenWhatsApp,
  onSelectCatalogProducts,
}) => {
  const [activeCatalog, setActiveCatalog] = useState<SeasonalCatalog | null>(null);

  const getAccentClass = (color: SeasonalCatalog['accentColor']) => {
    switch (color) {
      case 'rose':
        return 'glass-accent-rose';
      case 'amber':
        return 'glass-accent-amber';
      case 'emerald':
        return 'glass-accent-emerald';
      case 'indigo':
        return 'glass-accent-indigo';
      default:
        return 'glass-accent-plum';
    }
  };

  const getBadgeColor = (color: SeasonalCatalog['accentColor']) => {
    switch (color) {
      case 'rose':
        return 'bg-pink-100 text-pink-900 border-pink-200';
      case 'amber':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'indigo':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      default:
        return 'bg-pink-100 text-pink-800 border-pink-200';
    }
  };

  const handleGoToProducts = (catalogId: string) => {
    if (onSelectCatalogProducts) {
      onSelectCatalogProducts(catalogId);
    }
    const el = document.getElementById('productos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="catalogos" className="py-20 sm:py-28 relative scroll-mt-20">
      {/* Background Soft Gradients in Nenúfar Tones */}
      <div className="absolute top-1/3 right-0 w-96 h-96 cellophane-orb-nenufar-pink blur-3xl pointer-events-none -z-10 opacity-45" />
      <div className="absolute bottom-12 left-0 w-96 h-96 cellophane-orb-nenufar-purple blur-3xl pointer-events-none -z-10 opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-200/80 text-pink-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-pink-700" />
            <span>Colecciones & Catálogos nenúfar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            Puertas visuales a regalos que emocionan
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Cada fecha especial merece una atmósfera y materiales únicos. Explora nuestras colecciones listas 
            para personalizar o compra los productos directamente en línea.
          </p>
        </div>

        {/* The 4 Seasonal Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SEASONAL_CATALOGS.map((catalog) => {
            return (
              <div
                key={catalog.id}
                className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getAccentClass(
                  catalog.accentColor
                )} overflow-hidden flex flex-col justify-between`}
              >
                {/* Decorative background glow inside the card */}
                <div className={`absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-gradient-to-br ${catalog.bgGradient} blur-2xl pointer-events-none opacity-60`} />

                <div>
                  {/* Top Bar with Season Badge and Item Count */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(catalog.accentColor)}`}>
                      {catalog.seasonName}
                    </span>
                    <span className="text-xs font-medium text-stone-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-white/90 shadow-sm">
                      {catalog.itemsCount} piezas diseñadas
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 tracking-tight group-hover:text-pink-950 transition-colors">
                    {catalog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-900/80 mt-1 font-medium italic">
                    «{catalog.subtitle}»
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                    {catalog.description}
                  </p>

                  {/* Cover Image & Interactive Visual Showcase */}
                  <div className="mt-5 rounded-2xl overflow-hidden relative aspect-[16/9] shadow-sm border border-white/80 bg-stone-100">
                    <img
                      src={catalog.coverImage}
                      alt={`Catálogo ${catalog.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent flex items-end p-4">
                      <div className="flex items-center justify-between w-full text-white">
                        <div className="text-xs">
                          <span className="text-pink-300 font-semibold block">{catalog.badge}</span>
                          <span className="text-stone-200 text-[11px]">Desde $6.50 por pieza</span>
                        </div>
                        <button
                          onClick={() => setActiveCatalog(catalog)}
                          className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold backdrop-blur-sm transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                        >
                          <span>Ver dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-stone-700" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Feature Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {catalog.highlightItems.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-white/70 text-stone-700 border border-white/80 font-medium"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-pink-600" />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs per Catalog Card */}
                <div className="mt-6 pt-5 border-t border-pink-100/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    onClick={() => handleGoToProducts(catalog.id)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-pink-200" />
                    <span>Ver productos de esta colección</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-200 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onOpenWhatsApp(catalog.suggestedPrompt)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-pink-50 text-stone-800 text-xs sm:text-sm font-medium border border-pink-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    title="Pedir por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Catalog Download / Direct Chat Notice */}
        <div className="mt-12 p-6 rounded-3xl glass-panel text-center max-w-3xl mx-auto border border-white/90">
          <h4 className="font-display font-medium text-stone-900 text-lg sm:text-xl">
            ¿Necesitas todos los catálogos en un solo enlace o dossier corporativo?
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl mx-auto">
            Te enviamos el PDF completo de nenúfar con lista de precios por volumen, fichas de materiales y opciones de empaque de regalo para tu empresa o evento.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenWhatsApp('¡Hola! Me gustaría recibir el compendio de catálogos y lista de precios completa en PDF de nenúfar.')}
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Solicitar todos los catálogos por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal Component */}
      <CatalogModal
        catalog={activeCatalog}
        onClose={() => setActiveCatalog(null)}
        onOpenWhatsApp={onOpenWhatsApp}
      />
    </section>
  );
};
