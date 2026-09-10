import React, { useState } from 'react';
import { PORTFOLIO_PIECES } from '../data/mockData';
import { PortfolioPiece } from '../types';
import { Sparkles, MessageCircle, ArrowUpRight, Check, Tag } from 'lucide-react';

interface PortfolioGalleryProps {
  onOpenWhatsApp: (preset?: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenWhatsApp }) => {
  const [filter, setFilter] = useState<'all' | 'personal' | 'corporativo'>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioPiece | null>(null);

  const filteredPieces = PORTFOLIO_PIECES.filter((piece) => {
    if (filter === 'all') return true;
    return piece.category === filter;
  });

  return (
    <section id="galeria" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Trabajos Salidos del Taller</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            Creaciones reales, manos reales
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Desde un detalle único para un aniversario inolvidable hasta cientos de piezas de marca para eventos corporativos.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex p-1.5 rounded-full glass-panel border border-stone-200/60 gap-1 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todos ({PORTFOLIO_PIECES.length})
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === 'personal'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Ocasiones Especiales
            </button>
            <button
              onClick={() => setFilter('corporativo')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === 'corporativo'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Empresas & Marcas
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-4 bg-stone-100">
                  <img
                    src={piece.image}
                    alt={piece.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-amber-200 text-[10px] font-semibold">
                    {piece.category === 'personal' ? 'Regalo Especial' : 'Corporativo'}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-stone-800 text-[10px] font-medium shadow-xs">
                    {piece.highlight}
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold uppercase tracking-wider mb-1">
                  <span>{piece.occasion}</span>
                </div>
                <h3 className="font-display font-semibold text-stone-900 text-lg leading-snug group-hover:text-amber-950 transition-colors">
                  {piece.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {piece.description}
                </p>

                {/* Technical specs */}
                <div className="mt-3 pt-3 border-t border-stone-200/50 space-y-1 text-[11px] text-stone-500">
                  <div>
                    <strong className="text-stone-700">Técnica:</strong> {piece.technique}
                  </div>
                  <div>
                    <strong className="text-stone-700">Materiales:</strong> {piece.materials}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-stone-200/40 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Hecho en Acento</span>
                <button
                  onClick={() => onOpenWhatsApp(`¡Hola! Vi en su galería el proyecto "${piece.title}" y me gustaría cotizar algo parecido.`)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quiero algo así</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
