import React, { useState } from 'react';
import { CatalogProduct } from '../types';
import { X, Sparkles, ShoppingBag, ShoppingCart, MessageCircle, Check, Clock, ShieldCheck, Tag } from 'lucide-react';

interface ProductPersonalizeModalProps {
  product: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CatalogProduct, customText: string, variantId?: string) => Promise<void>;
  onBuyNow: (product: CatalogProduct, customText: string, variantId?: string) => Promise<void>;
  onOpenWhatsApp: (preset?: string) => void;
}

export const ProductPersonalizeModal: React.FC<ProductPersonalizeModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenWhatsApp,
}) => {
  const [customText, setCustomText] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initialize selected variant
  React.useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    } else if (product) {
      setSelectedVariantId(product.shopifyVariantId);
    }
    setCustomText('');
  }, [product]);

  if (!isOpen || !product) return null;

  const currentVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const activePrice = currentVariant ? currentVariant.price : product.price;

  const handleBuyNow = () => void onBuyNow(product, customText, selectedVariantId || product.shopifyVariantId);

  const handleAddToCart = () => {
    void onAddToCart(product, customText, selectedVariantId);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInquiry = () => {
    const textNote = customText.trim() ? ` con la personalización: "${customText.trim()}"` : '';
    const variantNote = currentVariant ? ` (${currentVariant.name})` : '';
    const msg = `¡Hola! Me interesa el producto "${product.name}"${variantNote} del catálogo ${product.catalogName}${textNote}. ¿Me confirman disponibilidad y tiempos de entrega?`;
    onOpenWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#fdfbfd] rounded-3xl shadow-2xl border border-white/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-pink-100/80 bg-white/70">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-900 border border-pink-200">
              {product.catalogName}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {product.technique}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-50 text-stone-500 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Product Photo & Live Preview Badge */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 bg-stone-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Tag */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                <Tag className="w-3 h-3 text-pink-400" />
                <span>{product.tag}</span>
              </div>

              {/* Live Engraving Overlay Simulator */}
              {customText.trim() && (
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-pink-300 shadow-lg text-center animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-pink-800 font-semibold mb-0.5">
                    <Sparkles className="w-3 h-3 text-pink-600" />
                    <span>Vista previa del grabado</span>
                  </div>
                  <p className="font-display italic text-xs sm:text-sm text-stone-900 line-clamp-2">
                    «{customText}»
                  </p>
                </div>
              )}
            </div>

            {/* Quick Specs */}
            <div className="mt-3.5 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Tiempo de taller: <strong>{product.leadTime}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Muestra digital previa por WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Fields & Buy Options */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-medium text-xl sm:text-2xl text-stone-900 leading-tight">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-pink-700">
                    ${activePrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">USD por pieza</span>
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variant Selector (if available) */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Seleccionar Variante / Acabado:
                  </label>
                  <div className="space-y-1.5">
                    {product.variants.map((v) => (
                      <label
                        key={v.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedVariantId === v.id
                            ? 'bg-pink-50/70 border-pink-500 text-pink-950 font-medium shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="product-variant"
                            value={v.id}
                            checked={selectedVariantId === v.id}
                            onChange={() => setSelectedVariantId(v.id)}
                            className="text-pink-600 focus:ring-pink-500"
                          />
                          <span>{v.name}</span>
                        </div>
                        <span className="font-semibold text-stone-900">${v.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization Input */}
              {product.allowCustomText && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Texto o Nombres a Personalizar:
                    </label>
                    <span className="text-[10px] text-pink-700 font-medium">
                      {customText.length}/90 caracteres
                    </span>
                  </div>
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.slice(0, 90))}
                    placeholder={product.customTextPlaceholder || 'Escribe el nombre, inicial o frase que deseas que grabemos...'}
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner resize-none"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    *Te enviaremos la maqueta digital antes de fabricar para tu aprobación final.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 pt-4 border-t border-pink-100/80 space-y-2">
              <div className="flex items-center gap-2">
                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-pink-50/70 border border-pink-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">¡Añadido!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 text-pink-600" />
                      <span>Añadir al Carrito</span>
                    </>
                  )}
                </button>

                {/* Direct purchase */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-pink-900/15 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-pink-200" />
                  <span>Comprar ahora</span>
                </button>
              </div>

              {/* Direct WhatsApp Consultation */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-2 px-3 rounded-xl text-stone-600 hover:text-emerald-700 hover:bg-emerald-50/60 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>¿Dudas o requerimientos especiales? Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
