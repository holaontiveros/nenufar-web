import React from 'react';
import { NenufarLogo } from './NenufarLogo';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, HeartHandshake, CheckCircle2, ShoppingBag, Store, Flame } from 'lucide-react';

interface HeroProps {
  onExploreCatalogs: () => void;
  onExploreProducts: () => void;
  onOpenWhatsApp: (preset?: string) => void;
  onOpenShopifyConfig: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalogs,
  onExploreProducts,
  onOpenWhatsApp,
  onOpenShopifyConfig,
}) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      {/* Background Nenúfar Cellophane Light Diffusers (Pink & Violet) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] sm:w-[900px] h-[480px] cellophane-orb-nenufar-pink blur-3xl pointer-events-none -z-10 opacity-70" />
      <div className="absolute top-48 -right-24 w-[420px] h-[420px] cellophane-orb-nenufar-purple blur-3xl pointer-events-none -z-10 opacity-60" />
      <div className="absolute top-72 -left-28 w-[400px] h-[400px] cellophane-orb-1 blur-3xl pointer-events-none -z-10 opacity-40" />

      {/* Subtle Craft Grid Pattern */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#701a75 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luminous Top Pill Badge with Lotus Icon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-pink-800 font-semibold tracking-wide">nenúfar taller activo</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600">Catálogos & Tienda conectada con Shopify</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-600 ml-0.5" />
          </div>
        </div>

        {/* Main Headings and Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-stone-900 tracking-tight leading-[1.15] mb-5">
            Regalos con alma y piezas de marca{' '}
            <span className="relative inline-block whitespace-nowrap text-purple-950">
              <span className="relative z-10 italic font-normal">hechas a tu medida</span>
              <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-pink-200/60 -rotate-1 rounded-sm -z-0" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Grabado láser, sublimación, stickers y textiles personalizados con mimo en el taller de <strong>nenúfar</strong>. 
            Detalles memorables para cada ocasión especial y artículos corporativos listos para comprar en Shopify o personalizar por WhatsApp.
          </p>

          {/* Primary Dominant CTA and Secondary Store / WhatsApp Links */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExploreProducts}
              id="hero-dominant-products-cta"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold text-base shadow-lg shadow-pink-950/20 hover:shadow-xl hover:shadow-pink-900/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-pink-200" />
              <span>Ver productos de catálogo</span>
              <ArrowRight className="w-4 h-4 text-pink-200 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreCatalogs}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-pink-200/80 font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explorar colecciones de temporada</span>
            </button>

            <button
              onClick={() => onOpenWhatsApp('¡Hola! Estuve viendo el taller de nenúfar y me gustaría consultar por un pedido personalizado.')}
              id="hero-discreet-whatsapp-link"
              className="w-full sm:w-auto px-4 py-3 rounded-full text-stone-600 hover:text-emerald-700 text-sm font-medium hover:bg-white/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Escríbenos por chat</span>
            </button>
          </div>

          {/* Quick Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-pink-100 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sin mínimos para ocasiones personales</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-pink-600" />
              <span>Fabricación 100% en nuestro taller</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Conexión segura con Shopify y muestra digital</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Curated "Taller Glass Table" Grid */}
        <div className="relative mt-8 sm:mt-12">
          <div className="glass-panel rounded-3xl p-4 sm:p-7 relative overflow-hidden border border-white/90">
            {/* Top Bar of the Studio Desk */}
            <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-pink-100/70 mb-5 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px] text-stone-700 font-bold">Mesa Creativa nenúfar</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-stone-400 text-xs">
                <span>Madera de roble & nogal</span>
                <span>•</span>
                <span>Acero térmico 24h</span>
                <span>•</span>
                <span>Acrílico espejo</span>
                <span>•</span>
                <span>Algodón & Cuero</span>
              </div>
            </div>

            {/* 4 Feature Columns Representing the Materials & Real Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Product 1: Laser Engraved Keepsake Box */}
              <div className="group relative rounded-2xl overflow-hidden bg-white/60 border border-pink-100 p-3 hover:shadow-md transition-all">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                    alt="Caja de madera con grabado láser"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] font-medium text-pink-200">
                    Corte & Láser
                  </div>
                </div>
                <h3 className="font-display font-medium text-stone-900 text-sm">Joyeros & Recuerdos en Roble</h3>
                <p className="text-[12px] text-stone-500 line-clamp-2 mt-0.5">
                  Grabado de caligrafía, dedicatorias y fechas con bajorrelieve impecable.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-pink-100/60">
                  <span className="text-pink-700 font-bold">$28.00 USD</span>
                  <span className="text-stone-400">Desde 1 pieza</span>
                </div>
              </div>

              {/* Product 2: Sublimated & Engraved Tumblers */}
              <div className="group relative rounded-2xl overflow-hidden bg-white/60 border border-pink-100 p-3 hover:shadow-md transition-all">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                    alt="Termos y tazas personalizadas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] font-medium text-pink-200">
                    Sublimación & Acero
                  </div>
                </div>
                <h3 className="font-display font-medium text-stone-900 text-sm">Termos Slim & Tarros Mate</h3>
                <p className="text-[12px] text-stone-500 line-clamp-2 mt-0.5">
                  Doble pared térmica, colores mate y grabado permanente de fibra.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-pink-100/60">
                  <span className="text-pink-700 font-bold">$18.00 USD</span>
                  <span className="text-stone-400">12h frío/calor</span>
                </div>
              </div>

              {/* Product 3: Die-cut Stickers & Holographic Decals */}
              <div className="group relative rounded-2xl overflow-hidden bg-white/60 border border-pink-100 p-3 hover:shadow-md transition-all">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                    alt="Stickers troquelados y vinil"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] font-medium text-pink-200">
                    Vinil & Troquelado
                  </div>
                </div>
                <h3 className="font-display font-medium text-stone-900 text-sm">Stickers Die-Cut & Viniles</h3>
                <p className="text-[12px] text-stone-500 line-clamp-2 mt-0.5">
                  Laminados resistentes al agua, roce y rayos UV. Holográficos o mate.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-pink-100/60">
                  <span className="text-pink-700 font-bold">Packs $12 USD</span>
                  <span className="text-stone-400">100% Impermeables</span>
                </div>
              </div>

              {/* Product 4: Custom Textiles & Apparel */}
              <div className="group relative rounded-2xl overflow-hidden bg-white/60 border border-pink-100 p-3 hover:shadow-md transition-all">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
                    alt="Textiles y camisas estampadas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] font-medium text-pink-200">
                    Textiles & DTF
                  </div>
                </div>
                <h3 className="font-display font-medium text-stone-900 text-sm">Tote Bags & Camisas DTF</h3>
                <p className="text-[12px] text-stone-500 line-clamp-2 mt-0.5">
                  Estampado suave sin acartonamiento para familias, bodas y dotaciones.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-pink-100/60">
                  <span className="text-pink-700 font-bold">Desde $14 USD</span>
                  <span className="text-stone-400">Algodón 320g</span>
                </div>
              </div>
            </div>

            {/* Bottom Glass Card Note with Shopify direct link */}
            <div className="mt-5 p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-4 h-4 text-pink-700 shrink-0" />
                <span>
                  <strong>¿Quieres comprar ahora o cotizar para tu empresa?</strong> Agrega al carrito y paga directo con Shopify, o escríbenos para pedidos corporativos con descuento por volumen.
                </span>
              </div>
              <button
                onClick={onExploreProducts}
                className="whitespace-nowrap font-semibold text-pink-800 hover:text-pink-950 underline underline-offset-4 cursor-pointer"
              >
                Ver catálogo de productos &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
