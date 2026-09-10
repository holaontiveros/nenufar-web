import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, CheckCircle2, Sliders, Calendar, UploadCloud, HelpCircle } from 'lucide-react';

interface CustomQuoteBuilderProps {
  onOpenWhatsApp: (preset?: string) => void;
}

export const CustomQuoteBuilder: React.FC<CustomQuoteBuilderProps> = ({ onOpenWhatsApp }) => {
  const [productType, setProductType] = useState('laser');
  const [quantityTier, setQuantityTier] = useState('1-5');
  const [designStatus, setDesignStatus] = useState('idea');
  const [urgency, setUrgency] = useState('normal');
  const [notes, setNotes] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const productTypes = [
    { id: 'laser', label: 'Madera o Acrílico Láser', icon: '🪵', desc: 'Joyeros, letreros, cuadros, llaveros, placas' },
    { id: 'termos', label: 'Tazas & Termos Térmicos', icon: '☕', desc: 'Doble pared, tazas de cerámica, botellas de acero' },
    { id: 'textil', label: 'Camisas & Textiles', icon: '👕', desc: 'Camisetas, hoodies, gorras con parche, tote bags' },
    { id: 'stickers', label: 'Stickers & Vinil', icon: '✨', desc: 'Stickers troquelados waterproof, vinil decorativo' },
    { id: 'kit', label: 'Kit Especial Combinado', icon: '🎁', desc: 'Cajas de regalo con varios productos coordinados' },
  ];

  const quantityTiers = [
    { id: '1-5', label: '1 a 5 piezas', badge: 'Personal / Regalo único' },
    { id: '6-25', label: '6 a 25 piezas', badge: 'Familia o Evento' },
    { id: '26-100', label: '26 a 100 piezas', badge: 'Pymes & Marcas' },
    { id: '100+', label: '100+ piezas', badge: 'Corporativo & Volumen' },
  ];

  const designOptions = [
    { id: 'vector', label: 'Tengo logotipo o diseño listo (PDF/AI/SVG)' },
    { id: 'idea', label: 'Tengo fotos de referencia o boceto de lo que quiero' },
    { id: 'text', label: 'Solo tengo los nombres/frase y necesito que lo diseñen' },
  ];

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const productLabel = productTypes.find((p) => p.id === productType)?.label;
    const tierLabel = quantityTiers.find((q) => q.id === quantityTier)?.label;
    const designLabel = designOptions.find((d) => d.id === designStatus)?.label;

    const message = `¡Hola Taller Acento! Tengo una idea especial fuera de catálogo:
• Tipo de producto: ${productLabel}
• Cantidad aproximada: ${tierLabel}
• Estado del diseño: ${designLabel}
• Tiempo estimado: ${urgency === 'urgent' ? '¡Es para esta semana! (Urgente)' : 'Fecha normal'}
${notes ? `• Detalles de la idea: ${notes}` : ''}
¿Me podrían cotizar y orientar sobre la mejor técnica?`;

    onOpenWhatsApp(message);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <section id="cotizador" className="py-20 sm:py-28 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 cellophane-orb-1 blur-3xl pointer-events-none -z-10 opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Taller a Medida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            ¿Tienes una idea fuera de catálogo?
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Cualquier idea personalizable puede convertirse en una propuesta real. Cuéntanos qué imaginas y te 
            asesoramos con los materiales y la técnica que mejor se adapte a tu presupuesto y plazo.
          </p>
        </div>

        {/* Interactive Custom Quote Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl relative overflow-hidden">
          <form onSubmit={handleGenerateQuote} className="space-y-8">
            {/* Step 1: Product Base */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                1. ¿Qué tipo de pieza o producto tienes en mente?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {productTypes.map((item) => {
                  const isSelected = productType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setProductType(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100/70 border-amber-400 shadow-sm'
                          : 'bg-white/50 border-stone-200/60 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-display font-semibold text-sm text-stone-900">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Quantity Tier */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                2. ¿Cuántas piezas necesitas?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {quantityTiers.map((tier) => {
                  const isSelected = quantityTier === tier.id;
                  return (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setQuantityTier(tier.id)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white/60 text-stone-700 border-stone-200 hover:bg-white'
                      }`}
                    >
                      <div className="text-sm font-semibold">{tier.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                        {tier.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Design Status & Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                  3. ¿Cuentas con diseño o logotipo?
                </label>
                <div className="space-y-2">
                  {designOptions.map((opt) => {
                    const isSelected = designStatus === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-50 border-amber-300 text-stone-900 font-medium'
                            : 'bg-white/50 border-stone-200 text-stone-600 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="designStatus"
                          checked={isSelected}
                          onChange={() => setDesignStatus(opt.id)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                  4. ¿Tienes una fecha límite o urgencia?
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('normal')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        urgency === 'normal'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-white/50 border-stone-200 text-stone-600 hover:bg-white'
                      }`}
                    >
                      ✓ Plazo normal (24 a 72h)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('urgent')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        urgency === 'urgent'
                          ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
                          : 'bg-white/50 border-stone-200 text-stone-600 hover:bg-white'
                      }`}
                    >
                      ⚡ ¡Es urgente!
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 mb-1">
                      Describe brevemente tu idea o lo que te gustaría grabar/estampar:
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej: Necesito 25 termos negros con el logo de mi clínica en plateado y el nombre de cada doctor..."
                      rows={3}
                      className="w-full text-xs p-3 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Section */}
            <div className="pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 text-center sm:text-left">
                <span className="font-semibold text-stone-700">Respuesta rápida:</span> Te responderemos por WhatsApp con opciones de materiales, precios y fecha de entrega.
              </div>

              <button
                type="submit"
                id="submit-quote-whatsapp"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar mi idea por WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
