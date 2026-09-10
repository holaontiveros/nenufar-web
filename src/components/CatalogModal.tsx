import React, { useState } from 'react';
import { SeasonalCatalog, CatalogItem } from '../types';
import { X, MessageCircle, Download, Check, Sparkles, Clock, ShieldCheck, Tag, ExternalLink } from 'lucide-react';

interface CatalogModalProps {
  catalog: SeasonalCatalog | null;
  onClose: () => void;
  onOpenWhatsApp: (preset?: string) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({ catalog, onClose, onOpenWhatsApp }) => {
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!catalog) return null;

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    // Simulate digital catalog PDF download trigger with visual notification
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  const handleOrderItem = (item: CatalogItem) => {
    const text = `¡Hola! Me interesa pedir el producto "${item.name}" del catálogo de ${catalog.title}. Quisiera personalizarlo.`;
    onOpenWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#fdfbf9] rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Seasonal Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-white to-amber-50/50 border-b border-stone-200/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>{catalog.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 tracking-tight">
                Catálogo de {catalog.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl">
                {catalog.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors focus:outline-none shrink-0"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Bar inside Modal */}
          <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-stone-200/40 text-xs">
            <button
              onClick={() => onOpenWhatsApp(catalog.suggestedPrompt)}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pedir por WhatsApp este catálogo</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 font-medium border border-stone-300/80 flex items-center gap-2 transition-colors cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">¡Catálogo descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Descargar catálogo digital (PDF)</span>
                </>
              )}
            </button>

            <div className="ml-auto text-stone-400 hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Fabricación en 24-48 horas</span>
            </div>
          </div>
        </div>

        {/* Catalog Items Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Mostrando las piezas más solicitadas ({catalog.highlightItems.length} destacadas de {catalog.itemsCount} opciones disponibles)</span>
            <span className="text-amber-800 font-semibold">100% Personalizable</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {catalog.highlightItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-4 bg-white border border-stone-200/70 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 relative bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-stone-900/85 text-amber-200 text-[10px] font-semibold tracking-wide">
                      {item.tag}
                    </div>
                    {item.isPopular && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold uppercase tracking-wider">
                        Favorito
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display font-semibold text-stone-900 text-base">
                      {item.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-stone-400">Desde </span>
                      <span className="text-base font-bold text-amber-900">${item.priceFrom}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 space-y-1 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-stone-700">Técnica:</strong> {item.technique}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-stone-700">Materiales:</strong> {item.materials}
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <Clock className="w-3 h-3" /> Tiempo de elaboración: {item.leadTime}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-stone-400">
                    Incluye muestra digital
                  </span>
                  <button
                    onClick={() => handleOrderItem(item)}
                    className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3 text-amber-300" />
                    <span>Pedir esta pieza</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Box Note */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
              <span>
                <strong>¿Interés para tu empresa o colegio?</strong> Manejamos descuentos progresivos para pedidos a partir de 15, 50 y 100 unidades con factura formal.
              </span>
            </div>
            <button
              onClick={() => onOpenWhatsApp(`¡Hola! Quisiera una cotización por volumen para mi empresa del catálogo ${catalog.title}.`)}
              className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Cotizar por volumen &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
