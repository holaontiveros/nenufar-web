import React, { useState } from 'react';
import { CartItem, ShopifyConfig } from '../types';
import { buildCartShopifyCheckoutUrl } from '../utils/shopify';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Sparkles, Edit3 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  config: ShopifyConfig;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateCustomText: (itemId: string, newText: string) => void;
  onOpenWhatsApp: (preset?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  config,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateCustomText,
  onOpenWhatsApp,
}) => {
  const [orderNotes, setOrderNotes] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempCustomText, setTempCustomText] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutShopify = () => {
    const url = buildCartShopifyCheckoutUrl(cartItems, config, orderNotes);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCheckoutWhatsApp = () => {
    const itemsList = cartItems
      .map((item, idx) => {
        const textPart = item.customText.trim() ? `\n   - Personalización: "${item.customText.trim()}"` : '';
        return `${idx + 1}. ${item.quantity}x ${item.product.name} ($${item.product.price * item.quantity} USD)${textPart}`;
      })
      .join('\n');

    const message = `¡Hola nenúfar! Quisiera confirmar y procesar este pedido:\n\n${itemsList}\n\n*Subtotal estimado:* $${subtotal.toFixed(2)} USD${orderNotes ? `\n\n*Notas de entrega:* ${orderNotes}` : ''}\n\n¿Me indican los pasos para coordinar la entrega y maquetas previas?`;
    onOpenWhatsApp(message);
  };

  const startEditCustomText = (item: CartItem) => {
    setEditingItemId(item.id);
    setTempCustomText(item.customText);
  };

  const saveCustomText = (itemId: string) => {
    onUpdateCustomText(itemId, tempCustomText);
    setEditingItemId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbfd] shadow-2xl border-l border-white/80 flex flex-col justify-between overflow-hidden">
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-5 border-b border-pink-100/80 bg-white/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-stone-900 leading-none">
                  Tu Carrito
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {totalItemCount} {totalItemCount === 1 ? 'artículo personalizado' : 'artículos personalizados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-pink-50 text-stone-500 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-300 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display font-medium text-stone-800 text-base">
                  Tu carrito está vacío
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explora las colecciones de temporada y personaliza un detalle inolvidable.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium transition-colors"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col gap-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="font-display font-medium text-stone-900 text-xs sm:text-sm line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="inline-block text-[10px] text-pink-800 font-semibold bg-pink-50 px-2 py-0.5 rounded-md mt-0.5">
                        {item.product.catalogName}
                      </span>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-stone-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-stone-800 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          ${(item.product.price * item.quantity).toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personalization Note Box */}
                  <div className="pt-2 border-t border-stone-100">
                    {editingItemId === item.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={tempCustomText}
                          onChange={(e) => setTempCustomText(e.target.value)}
                          placeholder="Texto personalizado..."
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-500 bg-white"
                          autoFocus
                        />
                        <button
                          onClick={() => saveCustomText(item.id)}
                          className="px-2.5 py-1 text-xs bg-pink-600 text-white rounded-lg font-medium"
                        >
                          Guardar
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-stone-600 bg-pink-50/50 p-2 rounded-xl">
                        <div className="flex items-center gap-1.5 truncate">
                          <Sparkles className="w-3 h-3 text-pink-600 shrink-0" />
                          <span className="truncate">
                            {item.customText.trim() ? (
                              <>
                                <strong>Grabado:</strong> «{item.customText}»
                              </>
                            ) : (
                              <span className="italic text-stone-400">Sin texto especificado</span>
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() => startEditCustomText(item)}
                          className="text-pink-700 hover:text-pink-900 flex items-center gap-0.5 text-[10px] font-semibold shrink-0 cursor-pointer ml-2"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          <span>Editar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Notas de entrega o indicaciones:
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Ej: Empacar para regalo con dedicatoria, fecha límite de entrega, etc."
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-inner resize-none"
                />
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Links */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-pink-100 bg-white/90 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-stone-600 font-medium">
                  Subtotal estimado:
                </span>
                <span className="text-xl sm:text-2xl font-bold text-pink-700 font-display">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Checkout cifrado directo en Shopify. Muestra digital previa por WhatsApp.</span>
              </div>

              {/* Dominant Shopify Checkout Button */}
              <button
                onClick={handleCheckoutShopify}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-pink-950/20 flex items-center justify-center gap-2 group cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-pink-200" />
                <span>Proceder al Pago en Shopify</span>
                <ArrowRight className="w-4 h-4 text-pink-200 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Alternative WhatsApp Checkout */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>O completar y pagar por WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
