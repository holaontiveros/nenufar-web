import React from 'react';
import { CLIENT_REVIEWS } from '../data/mockData';
import { Star, MessageSquareQuote, CheckCircle, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Historias de Quienes Ya Regalaron</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            Emoción tangible en cada entrega
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            La confianza se construye con atención al detalle, comunicación clara y piezas que superan expectativas.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {rev.type === 'personal' ? 'Regalo Ocasión' : 'Empresa / B2B'}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
                  «{rev.comment}»
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-stone-900 text-sm sm:text-base">
                    {rev.author}
                  </div>
                  <div className="text-xs text-stone-500">{rev.role}</div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-amber-800 font-medium">
                    {rev.productMade}
                  </div>
                  <div className="text-[10px] text-stone-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
