import React from 'react';
import { MessageCircle, BookOpen, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onOpenWhatsApp: (preset?: string) => void;
  onExploreCatalogs: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenWhatsApp, onExploreCatalogs }) => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] cellophane-orb-1 blur-3xl pointer-events-none -z-10 opacity-70" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 glass-panel border border-white/95 shadow-2xl overflow-hidden text-center">
          {/* Decorative cellophane light stripe */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-rose-300/30 to-amber-300/30 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-gradient-to-tr from-teal-300/30 to-amber-300/30 blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Hagamos algo inolvidable hoy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-stone-900 tracking-tight leading-tight">
              ¿Listo para crear un regalo memorable o elevar tu marca?
            </h2>

            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Escríbenos directamente. Te compartimos ideas de temporada, maquetas digitales previas y 
              cotizaciones claras sin ningún compromiso.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenWhatsApp('¡Hola! Me encantó su taller. Me gustaría conversar para encargar unos productos personalizados.')}
                id="cta-banner-whatsapp-button"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-100" />
                <span>Iniciar conversación por WhatsApp</span>
              </button>

              <button
                onClick={onExploreCatalogs}
                id="cta-banner-explore-catalogs"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/80 hover:bg-white text-stone-800 font-medium text-base border border-stone-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Ver catálogos activos</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/50 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Respuesta promedio: menos de 15 minutos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Atención cálida y asesoría experta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
