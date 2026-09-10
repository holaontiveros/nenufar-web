import React, { useState } from 'react';
import { MessageCircle, X, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface WhatsAppDialogProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({ isOpen, message, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedMessage = encodeURIComponent(message);
  // Default WhatsApp link (using international universal format)
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenLink = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#fdfbf9] rounded-3xl shadow-2xl border border-white/90 overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-stone-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-stone-900">
                Iniciar conversación por WhatsApp
              </h3>
              <p className="text-xs text-stone-500">
                nenúfar • Regalos y Productos Personalizados
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
            Tu mensaje preparado:
          </label>
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed shadow-inner">
            {message}
          </div>
          <p className="text-[11px] text-stone-500">
            Al presionar «Abrir en WhatsApp», se iniciará el chat con nuestro taller y este mensaje prellenado para atenderte de inmediato.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-600" />
                <span>Copiar texto</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenLink}
            className="w-full sm:flex-1 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Abrir en WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
