import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, Check } from 'lucide-react';

interface FloatingChatWidgetProps {
  onSendMessage: (text: string) => void;
  defaultOpen?: boolean;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    { label: '💐 Catálogo Día de la Madre', msg: '¡Hola! Me gustaría ver opciones y precios para el Día de la Madre.' },
    { label: '🪵 Catálogo Día del Padre', msg: '¡Hola! Quisiera ver los tarros cerveceros y kits para el Día del Padre.' },
    { label: '🏢 Cotización para mi Empresa', msg: '¡Hola! Necesito cotizar regalos con el logotipo de mi empresa.' },
    { label: '💡 Tengo una idea a medida', msg: '¡Hola! Tengo una idea especial que no vi en catálogo y quisiera saber si la pueden fabricar.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    setIsOpen(false);
  };

  const handlePromptClick = (msg: string) => {
    onSendMessage(msg);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Concierge Panel */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] glass-panel rounded-3xl p-5 border border-white/90 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-stone-200/50 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                n
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-sm">
                  nenúfar • Taller Creativo
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>En línea • Respondemos en minutos</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Welcoming message */}
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-xs text-stone-700 leading-relaxed mb-3">
            ¡Hola! 👋 Cuéntanos qué fecha o proyecto tienes en mente. Con gusto te enviamos catálogos digitales o preparamos una propuesta de diseño para ti.
          </div>

          {/* Quick Prompts */}
          <div className="space-y-1.5 mb-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-1">
              Preguntas rápidas:
            </div>
            {quickPrompts.map((item, i) => (
              <button
                key={i}
                onClick={() => handlePromptClick(item.msg)}
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/70 text-stone-700 text-xs transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{item.label}</span>
                <Send className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 transition-colors" />
              </button>
            ))}
          </div>

          {/* Custom message input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-stone-200/50">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu mensaje o idea..."
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
              aria-label="Enviar por WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="floating-whatsapp-widget"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Abrir chat de WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" />
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          ¿En qué podemos ayudarte?
        </span>
      </button>
    </div>
  );
};
