import React, { useState } from 'react';
import { WORKSHOP_TECHNIQUES } from '../data/mockData';
import { WorkshopTechnique } from '../types';
import { Layers, Sparkles, CheckCircle2, Flame, Scissors, Zap, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface TechniquesShowcaseProps {
  onOpenWhatsApp: (preset?: string) => void;
}

export const TechniquesShowcase: React.FC<TechniquesShowcaseProps> = ({ onOpenWhatsApp }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<WorkshopTechnique>(WORKSHOP_TECHNIQUES[0]);

  return (
    <section id="tecnicas" className="py-20 sm:py-28 relative">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] cellophane-orb-3 blur-3xl pointer-events-none -z-10 opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Fabricación 100% Interna</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            El taller creativo: técnicas combinadas bajo un mismo techo
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            No tercerizamos tus ideas. En nuestras mesas de trabajo conviven máquinas de corte láser de precisión, 
            prensas térmicas de alta densidad, plotters de corte y prensas de sublimación. Esa integración nos 
            permite mezclar madera noble con acrílico, acero con vinil horneado o textiles con parches grabados 
            en una sola pieza con riguroso control de calidad.
          </p>
        </div>

        {/* Studio Craft Table / Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Technique Selectors (Buttons) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 px-1">
              Selecciona una técnica para ver posibilidades:
            </div>
            {WORKSHOP_TECHNIQUES.map((tech) => {
              const isActive = selectedTechnique.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTechnique(tech)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'glass-panel bg-white/90 border-amber-300 shadow-md translate-x-1.5'
                      : 'bg-white/40 hover:bg-white/70 border-white/60 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                      {tech.category}
                    </span>
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      {tech.turnaround}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-stone-900 text-base sm:text-lg mt-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {tech.description}
                  </p>
                </button>
              );
            })}

            {/* In-House Quality Stamp Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-stone-700 space-y-2 mt-4">
              <div className="flex items-center gap-2 font-semibold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Control de Calidad Artesanal</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[12px]">
                Cada pieza se limpia a mano, se revisa contra luz natural y se empaca con papel protector antes de despachar.
              </p>
            </div>
          </div>

          {/* Active Technique Interactive Detail Panel */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              {/* Technique Photo */}
              <div className="w-full md:w-5/12 aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md bg-stone-100 shrink-0">
                <img
                  src={selectedTechnique.image}
                  alt={selectedTechnique.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-sm text-amber-200 text-xs font-semibold">
                  {selectedTechnique.tag}
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/80 text-[11px] text-stone-800 text-center font-medium">
                  {selectedTechnique.category}
                </div>
              </div>

              {/* Technical breakdown */}
              <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-medium mb-3">
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>Técnica de Taller</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-stone-900">
                    {selectedTechnique.name}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                    {selectedTechnique.description}
                  </p>

                  {/* Materials Chip List */}
                  <div className="mt-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Materiales con los que trabajamos:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTechnique.materials.map((mat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-stone-200/80 text-stone-700 text-xs font-medium shadow-2xs"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Garantías & ventajas de producción:
                    </h4>
                    {selectedTechnique.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="mt-6 pt-5 border-t border-stone-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Entrega: {selectedTechnique.turnaround}</span>
                  </div>
                  <button
                    onClick={() => onOpenWhatsApp(`¡Hola! Me interesa fabricar un proyecto usando la técnica de ${selectedTechnique.name}. ¿Me pueden asesorar?`)}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Consultar por esta técnica</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
