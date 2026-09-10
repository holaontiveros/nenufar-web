/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { ShopifyConfigModal } from './components/ShopifyConfigModal';

import { CatalogProduct, CartItem, ShopifyConfig } from './types';
import { getStoredShopifyConfig } from './utils/shopify';

const CART_STORAGE_KEY = 'nenufar_cart_items_v1';

export default function App() {
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(
    '¡Hola! Me gustaría cotizar productos personalizados en el taller de nenúfar.'
  );

  // Shopify Configuration State
  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(getStoredShopifyConfig);
  const [shopifyConfigModalOpen, setShopifyConfigModalOpen] = useState(false);

  // Cart State & Drawer
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read saved cart', e);
      }
    }
    return [];
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Personalization Modal State
  const [personalizeModalOpen, setPersonalizeModalOpen] = useState(false);
  const [selectedProductForPersonalize, setSelectedProductForPersonalize] = useState<CatalogProduct | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not persist cart', e);
    }
  }, [cartItems]);

  const handleOpenWhatsApp = (presetMessage?: string) => {
    const text = presetMessage || '¡Hola! Quisiera información sobre sus productos y catálogos de temporada en nenúfar.';
    setActiveMessage(text);
    setWhatsAppModalOpen(true);
  };

  const handleExploreCatalogs = () => {
    const el = document.getElementById('catalogos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProducts = () => {
    const el = document.getElementById('productos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: CatalogProduct, customText: string = '', variantId?: string) => {
    setCartItems((prev) => {
      // Check if same product + same customization + same variant already exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customText.trim() === customText.trim() &&
          item.selectedVariant === variantId
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        product,
        quantity: 1,
        customText,
        selectedVariant: variantId || product.shopifyVariantId,
      };
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateCustomText = (itemId: string, newText: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, customText: newText } : item))
    );
  };

  const handleOpenPersonalizeModal = (product: CatalogProduct) => {
    setSelectedProductForPersonalize(product);
    setPersonalizeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] text-[#242120] relative selection:bg-pink-200 selection:text-pink-950 font-sans">
      {/* Top Floating Glass Navbar with Nenúfar Branding & Cart counter */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
        onExploreCatalogs={handleExploreCatalogs}
        onOpenShopifyConfig={() => setShopifyConfigModalOpen(true)}
      />

      <main>
        {/* 1. Hero Section with Real Product Showcase */}
        <Hero
          onExploreCatalogs={handleExploreCatalogs}
          onExploreProducts={handleExploreProducts}
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpenShopifyConfig={() => setShopifyConfigModalOpen(true)}
        />

        {/* 2. New Dedicated Catalog Products Section with Shopify Integration */}
        <CatalogProductsSection
          config={shopifyConfig}
          onOpenPersonalizeModal={handleOpenPersonalizeModal}
          onAddToCart={handleAddToCart}
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpenShopifyConfig={() => setShopifyConfigModalOpen(true)}
        />

        {/* 3. Seasonal Catalogs Gateway (Día de la Madre, Padre, Maestro, Navidad, Bodas) */}
        <SeasonalCatalogs
          onOpenWhatsApp={handleOpenWhatsApp}
          onSelectCatalogProducts={() => handleExploreProducts()}
        />

        {/* 4. In-House Workshop & Combined Techniques (Laser, Sublimation, Vinyl, Textiles) */}
        <TechniquesShowcase onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 5. Real Works Gallery (Personal & Corporate) */}
        <PortfolioGallery onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 6. Custom / Outside Catalog Quote Builder */}
        <CustomQuoteBuilder onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 7. Client Reviews & Trust Stories */}
        <ReviewsSection />

        {/* 8. Frequently Asked Questions (FAQ) */}
        <FaqSection onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 9. Compelling Closing CTA Banner */}
        <CtaBanner
          onOpenWhatsApp={handleOpenWhatsApp}
          onExploreCatalogs={handleExploreCatalogs}
        />
      </main>

      {/* Footer with Nenúfar branding & Shopify link */}
      <Footer
        onOpenWhatsApp={handleOpenWhatsApp}
        onExploreCatalogs={handleExploreCatalogs}
        onExploreProducts={handleExploreProducts}
        onOpenShopifyConfig={() => setShopifyConfigModalOpen(true)}
      />

      {/* Interactive Floating WhatsApp Concierge Widget */}
      <FloatingChatWidget onSendMessage={handleOpenWhatsApp} />

      {/* Direct WhatsApp Messaging Modal */}
      <WhatsAppDialog
        isOpen={whatsAppModalOpen}
        message={activeMessage}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      {/* Slide-over Glass Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        cartItems={cartItems}
        config={shopifyConfig}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateCustomText={handleUpdateCustomText}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Product Personalize & Live Simulation Modal */}
      <ProductPersonalizeModal
        product={selectedProductForPersonalize}
        config={shopifyConfig}
        isOpen={personalizeModalOpen}
        onClose={() => {
          setPersonalizeModalOpen(false);
          setSelectedProductForPersonalize(null);
        }}
        onAddToCart={(product, customText, variantId) => {
          handleAddToCart(product, customText, variantId);
        }}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Shopify Storefront Connection & Configuration Modal */}
      <ShopifyConfigModal
        isOpen={shopifyConfigModalOpen}
        config={shopifyConfig}
        onClose={() => setShopifyConfigModalOpen(false)}
        onSaveConfig={(updated) => setShopifyConfig(updated)}
      />
    </div>
  );
}
