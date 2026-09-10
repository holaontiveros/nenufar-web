import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SeasonalCatalogs } from './components/SeasonalCatalogs';
import { CatalogProductsSection } from './components/CatalogProductsSection';
import { TechniquesShowcase } from './components/TechniquesShowcase';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CustomQuoteBuilder } from './components/CustomQuoteBuilder';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { WhatsAppDialog } from './components/WhatsAppDialog';
import { CartDrawer } from './components/CartDrawer';
import { ProductPersonalizeModal } from './components/ProductPersonalizeModal';
import { CartItem, CatalogProduct } from './types';
import { CATALOG_PRODUCTS } from './data/productsData';
import { addCartLine, clearStoredCartId, fetchCart, fetchCatalogProducts, getStoredCartId, removeCartLine, updateCartAttributes, updateCartLine } from './utils/shopify';

export default function App() {
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState('¡Hola! Me gustaría cotizar productos personalizados en el taller de nenúfar.');
  const [products, setProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [personalizeModalOpen, setPersonalizeModalOpen] = useState(false);
  const [selectedProductForPersonalize, setSelectedProductForPersonalize] = useState<CatalogProduct | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  useEffect(() => {
    void fetchCatalogProducts().then(setProducts).catch(() => undefined);
    const savedCartId = getStoredCartId();
    if (!savedCartId) return;
    void fetchCart(savedCartId).then((cart) => {
      if (!cart) {
        clearStoredCartId();
        return;
      }
      setCartId(cart.id);
      setCheckoutUrl(cart.checkoutUrl);
      setCartItems(cart.items);
    }).catch(clearStoredCartId);
  }, []);

  const handleOpenWhatsApp = (presetMessage?: string) => {
    setActiveMessage(presetMessage || '¡Hola! Quisiera información sobre sus productos y catálogos de temporada en nenúfar.');
    setWhatsAppModalOpen(true);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const applyCart = (cart: { id: string; checkoutUrl: string; items: CartItem[] }) => {
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    setCartItems(cart.items);
  };

  const handleAddToCart = async (product: CatalogProduct, customText = '', variantId?: string) => {
    try {
      setPurchaseError(null);
      applyCart(await addCartLine(cartId, product, 1, customText, variantId));
      setCartDrawerOpen(true);
    } catch (error) {
      setPurchaseError(error instanceof Error ? error.message : 'No pudimos añadir el producto.');
    }
  };

  const handleBuyNow = async (product: CatalogProduct, customText = '', variantId?: string) => {
    try {
      setPurchaseError(null);
      const cart = await addCartLine(cartId, product, 1, customText, variantId);
      applyCart(cart);
      window.location.assign(cart.checkoutUrl);
    } catch (error) {
      setPurchaseError(error instanceof Error ? error.message : 'No pudimos iniciar el pago.');
    }
  };

  const handleUpdateQuantity = async (item: CartItem, quantity: number) => {
    if (!cartId) return;
    try {
      if (quantity <= 0) {
        applyCart(await removeCartLine(cartId, item.id));
      } else {
        applyCart(await updateCartLine(cartId, item, quantity));
      }
    } catch (error) {
      setPurchaseError(error instanceof Error ? error.message : 'No pudimos actualizar el carrito.');
    }
  };

  const handleUpdateCustomText = async (item: CartItem, customText: string) => {
    if (!cartId) return;
    try {
      applyCart(await updateCartLine(cartId, item, item.quantity, customText));
    } catch (error) {
      setPurchaseError(error instanceof Error ? error.message : 'No pudimos actualizar la personalización.');
    }
  };

  const handleCheckout = async (orderNotes: string) => {
    if (!cartId || !checkoutUrl) return;
    try {
      const cart = await updateCartAttributes(cartId, orderNotes);
      applyCart(cart);
      window.location.assign(cart.checkoutUrl);
    } catch (error) {
      setPurchaseError(error instanceof Error ? error.message : 'No pudimos iniciar el pago.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] text-[#242120] relative selection:bg-pink-200 selection:text-pink-950 font-sans">
      <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setCartDrawerOpen(true)} onOpenWhatsApp={handleOpenWhatsApp} onExploreCatalogs={() => scrollTo('catalogos')} />
      <main>
        <Hero onExploreCatalogs={() => scrollTo('catalogos')} onExploreProducts={() => scrollTo('productos')} onOpenWhatsApp={handleOpenWhatsApp} />
        <CatalogProductsSection products={products} onOpenPersonalizeModal={(product) => { setSelectedProductForPersonalize(product); setPersonalizeModalOpen(true); }} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onOpenWhatsApp={handleOpenWhatsApp} />
        <SeasonalCatalogs onOpenWhatsApp={handleOpenWhatsApp} onSelectCatalogProducts={() => scrollTo('productos')} />
        <TechniquesShowcase onOpenWhatsApp={handleOpenWhatsApp} />
        <PortfolioGallery onOpenWhatsApp={handleOpenWhatsApp} />
        <CustomQuoteBuilder onOpenWhatsApp={handleOpenWhatsApp} />
        <ReviewsSection />
        <FaqSection onOpenWhatsApp={handleOpenWhatsApp} />
        <CtaBanner onOpenWhatsApp={handleOpenWhatsApp} onExploreCatalogs={() => scrollTo('catalogos')} />
      </main>
      <Footer onOpenWhatsApp={handleOpenWhatsApp} onExploreCatalogs={() => scrollTo('catalogos')} onExploreProducts={() => scrollTo('productos')} />
      <FloatingChatWidget onSendMessage={handleOpenWhatsApp} />
      <WhatsAppDialog isOpen={whatsAppModalOpen} message={activeMessage} onClose={() => setWhatsAppModalOpen(false)} />
      <CartDrawer isOpen={cartDrawerOpen} cartItems={cartItems} onClose={() => setCartDrawerOpen(false)} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={(item) => void handleUpdateQuantity(item, 0)} onUpdateCustomText={handleUpdateCustomText} onCheckout={(notes) => void handleCheckout(notes)} onOpenWhatsApp={handleOpenWhatsApp} />
      <ProductPersonalizeModal product={selectedProductForPersonalize} isOpen={personalizeModalOpen} onClose={() => { setPersonalizeModalOpen(false); setSelectedProductForPersonalize(null); }} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onOpenWhatsApp={handleOpenWhatsApp} />
      {purchaseError && <div role="alert" className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-center text-sm text-rose-800 shadow-xl">{purchaseError}<button className="ml-3 font-semibold" onClick={() => setPurchaseError(null)}>Cerrar</button></div>}
    </div>
  );
}
