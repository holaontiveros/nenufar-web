import React from 'react';
import { NenufarLogo } from './NenufarLogo';
import { Sparkles, MessageCircle, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: (preset?: string) => void;
  onExploreCatalogs: () => void;
  onExploreProducts: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWhatsApp,
  onExploreCatalogs,
  onExploreProducts,
}) => {
  return (
    <footer className="relative pt-16 pb-12 bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1: Brand & Craft Ethos */}
          <div className="space-y-4">
            <NenufarLogo variant="horizontal" iconSize={36} />
            <p className="text-xs text-stone-400 leading-relaxed">
              Taller creativo de personalización y regalos con alma. Corte láser, sublimación de alta definición, 
              stickers troquelados y textiles hechos con dedicación para personas y empresas.
            </p>
          </div>

          {/* Col 2: Catálogos de Temporada & Productos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-pink-400 mb-4">
              Colecciones & Tienda
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onExploreProducts}
                  className="hover:text-pink-300 font-semibold text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Ver Todos los Productos &rarr;</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCatalogs}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Día de la Madre (Floral & Madera)
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCatalogs}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Día del Padre (Acero, Nogal & Cuero)
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCatalogs}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Día del Maestro (Organización & Agradecimiento)
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCatalogs}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Navidad & Fin de Año (Esferas & Cajas B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCatalogs}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bodas & Bautizos (Libros & Recuerdos)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Técnicas del Taller */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-pink-400 mb-4">
              Técnicas del Taller
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Corte y grabado láser CO2 & Fibra óptica</li>
              <li>Sublimación térmica en cerámica y acero doble pared</li>
              <li>Confección y estampado DTF textil flexible</li>
              <li>Vinil troquelado die-cut laminado impermeable</li>
              <li>Diseño, maquetación y muestra digital previa</li>
            </ul>
          </div>

          {/* Col 4: Contacto y compras */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-pink-400 mb-4">
              Atención & Compras
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-stone-400">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Lun a Sáb: 9:00 AM – 7:00 PM</span>
              </li>
              <li className="flex items-start gap-2 text-stone-400">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Entregas en taller o envíos express a domicilio</span>
              </li>
              <li className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => onOpenWhatsApp('¡Hola! Me comunico desde la tienda web de nenúfar.')}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700/50 hover:bg-emerald-700/70 border border-emerald-500/50 text-emerald-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: Asesoría de Taller</span>
                </button>

              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} nenúfar. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Hecho con dedicación, madera, láser, color y calidez humana.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
