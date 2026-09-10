import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  onOpenWhatsApp: (preset?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWhatsApp }) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Claridad & Procesos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Todo lo que necesitas saber sobre precios, muestras digitales, tiempos de taller y entregas antes de ordenar.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/80 transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-stone-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-100 text-amber-900' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-200/40 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Question Assistance */}
        <div className="mt-10 p-4 rounded-2xl bg-white/50 border border-stone-200/60 text-center text-xs sm:text-sm text-stone-600 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span>¿Tienes otra pregunta sobre tu pedido o especificaciones técnicas?</span>
          <button
            onClick={() => onOpenWhatsApp('¡Hola! Tengo una duda que no encontré en las preguntas frecuentes.')}
            className="text-amber-800 font-semibold hover:text-amber-950 underline underline-offset-4 cursor-pointer"
          >
            Pregúntanos por chat &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
