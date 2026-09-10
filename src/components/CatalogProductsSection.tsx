import React, { useState, useMemo } from 'react';
import { CatalogProduct, ShopifyConfig } from '../types';
import { CATALOG_PRODUCTS } from '../data/productsData';
import { buildSingleProductShopifyUrl } from '../utils/shopify';
import {
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  MessageCircle,
  Search,
  Filter,
  Check,
  Tag,
  Clock,
  ExternalLink,
  Store,
  Layers,
  Heart,
  Settings
} from 'lucide-react';

interface CatalogProductsSectionProps {
  config: ShopifyConfig;
  onOpenPersonalizeModal: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, customText?: string) => void;
  onOpenWhatsApp: (preset?: string) => void;
  onOpenShopifyConfig: () => void;
}

export const CatalogProductsSection: React.FC<CatalogProductsSectionProps> = ({
  config,
  onOpenPersonalizeModal,
  onAddToCart,
  onOpenWhatsApp,
  onOpenShopifyConfig,
}) => {
  const [selectedCatalog, setSelectedCatalog] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTechnique, setSelectedTechnique] = useState<string>('todas');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const catalogTabs = [
    { id: 'todos', label: 'Todos los Catálogos', icon: Layers, count: CATALOG_PRODUCTS.length },
    { id: 'madre', label: 'Día de la Madre', icon: Heart, count: CATALOG_PRODUCTS.filter(p => p.catalogId === 'madre').length },
    { id: 'padre', label: 'Día del Padre', icon: Sparkles, count: CATALOG_PRODUCTS.filter(p => p.catalogId === 'padre').length },
    { id: 'maestro', label: 'Día del Maestro', icon: Tag, count: CATALOG_PRODUCTS.filter(p => p.catalogId === 'maestro').length },
    { id: 'navidad', label: 'Navidad & Fin de Año', icon: Sparkles, count: CATALOG_PRODUCTS.filter(p => p.catalogId === 'navidad').length },
    { id: 'bodas', label: 'Bodas & Especiales', icon: Heart, count: CATALOG_PRODUCTS.filter(p => p.catalogId === 'bodas').length },
  ];

  const techniques = [
    { id: 'todas', label: 'Todas las técnicas' },
    { id: 'laser', label: 'Grabado Láser' },
    { id: 'sublimacion', label: 'Sublimación HD' },
    { id: 'textil', label: 'Textiles & DTF' },
    { id: 'vinil', label: 'Vinil & Troquelado' },
  ];

  // Filter products based on selected catalog, search query, and technique
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCatalog = selectedCatalog === 'todos' || product.catalogId === selectedCatalog;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTechnique = true;
      if (selectedTechnique !== 'todas') {
        const techLower = product.technique.toLowerCase();
        if (selectedTechnique === 'laser') matchesTechnique = techLower.includes('láser') || techLower.includes('laser');
        if (selectedTechnique === 'sublimacion') matchesTechnique = techLower.includes('sublimación') || techLower.includes('sublimacion');
        if (selectedTechnique === 'textil') matchesTechnique = techLower.includes('dtf') || techLower.includes('textil') || techLower.includes('estampado');
        if (selectedTechnique === 'vinil') matchesTechnique = techLower.includes('vinil') || techLower.includes('troquelado') || techLower.includes('sticker');
      }

      return matchesCatalog && matchesSearch && matchesTechnique;
    });
  }, [selectedCatalog, searchQuery, selectedTechnique]);

  const handleQuickShopifyBuy = (product: CatalogProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildSingleProductShopifyUrl(product, config);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAddToCart = (product: CatalogProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  return (
    <section id="productos" className="py-20 sm:py-28 relative scroll-mt-20">
      {/* Ambient background light in Nenúfar pink & purple */}
      <div className="absolute top-1/4 left-0 w-96 h-96 cellophane-orb-nenufar-pink blur-3xl pointer-events-none -z-10 opacity-40" />
      <div className="absolute bottom-10 right-0 w-96 h-96 cellophane-orb-nenufar-purple blur-3xl pointer-events-none -z-10 opacity-35" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Shopify Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-200/80 text-pink-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-pink-600" />
              <span>Colección & Tienda Nenúfar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-stone-900 tracking-tight leading-tight">
              Piezas por Catálogo listas para comprar
            </h2>
            <p className="mt-3 text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              Explora y personaliza cada regalo de nuestras colecciones estacionales. Puedes comprar directamente 
              a través de nuestra pasarela de <strong>Shopify</strong> o personalizar los detalles con el taller por WhatsApp.
            </p>
          </div>

          {/* Shopify Live Connection Status Banner */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-pink-200/80 rounded-2xl p-3 shadow-sm shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center text-white shadow-sm">
              <Store className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-stone-900">Shopify Conectado</span>
              </div>
              <p className="text-[11px] text-stone-500 font-mono">
                {config.shopDomain}
              </p>
            </div>
            <button
              onClick={onOpenShopifyConfig}
              className="p-1.5 rounded-lg hover:bg-pink-50 text-pink-700 hover:text-pink-900 transition-colors cursor-pointer"
              title="Configurar tienda Shopify"
              aria-label="Configurar Shopify"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Catalog Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
          {catalogTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCatalog === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCatalog(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-purple-700 text-white shadow-md shadow-pink-950/20 scale-[1.02]'
                    : 'bg-white/70 hover:bg-white text-stone-700 border border-stone-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-200' : 'text-pink-600'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-pink-50 text-pink-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Filters & Search Bar */}
        <div className="mt-4 p-3 rounded-2xl glass-panel flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar joyero, termo, esfera, libreta..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
            />
          </div>

          {/* Technique filter chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider hidden lg:inline mr-1">
              Técnica:
            </span>
            {techniques.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedTechnique(tech.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTechnique === tech.id
                    ? 'bg-pink-100 text-pink-900 font-semibold border border-pink-300'
                    : 'bg-white/60 hover:bg-white text-stone-600 border border-stone-200/60'
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Products Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-stone-500 glass-panel rounded-3xl">
              <Search className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="font-display font-medium text-stone-800 text-lg">
                No encontramos productos con esos filtros
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Prueba buscando otro término o seleccionando «Todos los Catálogos».
              </p>
              <button
                onClick={() => {
                  setSelectedCatalog('todos');
                  setSearchQuery('');
                  setSelectedTechnique('todas');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-medium cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;
              return (
                <div
                  key={product.id}
                  className="group relative rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Photo with Badges */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 mb-3.5 shadow-inner">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide">
                          {product.catalogName}
                        </span>
                        {product.isPopular && (
                          <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-bold shadow-sm">
                            ⭐ Más vendido
                          </span>
                        )}
                      </div>

                      {/* Quick Personalize Floating Overlay Button */}
                      <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <button
                          onClick={() => onOpenPersonalizeModal(product)}
                          className="px-4 py-2 rounded-full bg-white text-stone-900 text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                          <span>Personalizar grabado</span>
                        </button>
                      </div>
                    </div>

                    {/* Technique & Turnaround */}
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 font-medium">
                      <span className="text-pink-700 font-semibold bg-pink-50/90 px-2 py-0.5 rounded-md">
                        {product.technique}
                      </span>
                      <span className="flex items-center gap-1 text-stone-400">
                        <Clock className="w-3 h-3" />
                        {product.leadTime}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display font-semibold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-pink-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & Buying Action Buttons */}
                  <div className="mt-4 pt-3.5 border-t border-stone-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-pink-700">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-stone-400 ml-1 font-medium">USD</span>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {product.materials.split(' ')[0]} {product.materials.split(' ')[1]}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {/* Personalize / Buy in Shopify */}
                      <button
                        onClick={() => onOpenPersonalizeModal(product)}
                        className="col-span-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        title="Personalizar texto y comprar"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                        <span>Personalizar</span>
                      </button>

                      {/* Quick Add to Cart */}
                      <button
                        onClick={(e) => handleQuickAddToCart(product, e)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer border ${
                          isAdded
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-white hover:bg-pink-50 text-stone-700 border-stone-200'
                        }`}
                        title="Añadir directo al carrito"
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 text-pink-600" />
                        )}
                      </button>
                    </div>

                    {/* Secondary Discreet Shopify & WhatsApp Links */}
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
                      <button
                        onClick={(e) => handleQuickShopifyBuy(product, e)}
                        className="hover:text-pink-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-pink-500" />
                        <span>Comprar en Shopify &rarr;</span>
                      </button>

                      <button
                        onClick={() => onOpenWhatsApp(`¡Hola! Quisiera consultar sobre el producto "${product.name}" de su catálogo ${product.catalogName}.`)}
                        className="hover:text-emerald-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner for Custom Orders Outside Catalog */}
        <div className="mt-12 p-6 rounded-3xl glass-panel border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-medium text-stone-900 text-sm sm:text-base">
                ¿Buscas una pieza fuera de catálogo o tiraje para tu empresa?
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Fabricamos proyectos especiales en madera, acrílico, metal, textiles y vinil con tu logotipo.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenWhatsApp('¡Hola! Me gustaría cotizar un pedido especial personalizado para mi empresa o evento.')}
            className="whitespace-nowrap px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-pink-300" />
            <span>Cotizar pedido especial</span>
          </button>
        </div>
      </div>
    </section>
  );
};
