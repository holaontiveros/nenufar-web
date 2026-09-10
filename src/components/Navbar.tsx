import React, { useState, useEffect } from 'react';
import { NenufarLogo } from './NenufarLogo';
import { Sparkles, MessageCircle, BookOpen, Layers, Image as ImageIcon, HelpCircle, ShoppingBag, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsApp: (preset?: string) => void;
  onExploreCatalogs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenWhatsApp,
  onExploreCatalogs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Productos', href: '#productos', icon: ShoppingBag },
    { label: 'Catálogos', href: '#catalogos', icon: BookOpen },
    { label: 'El Taller', href: '#tecnicas', icon: Layers },
    { label: 'Trabajos Reales', href: '#galeria', icon: ImageIcon },
    { label: 'Pedidos a Medida', href: '#cotizador', icon: Sparkles },
    { label: 'Preguntas', href: '#faq', icon: HelpCircle },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-lg shadow-pink-950/5 py-2.5 px-3.5 sm:px-6 border border-white/90'
            : 'bg-white/60 backdrop-blur-md py-3 px-3.5 sm:px-6 border border-white/70 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo with Nenúfar Lotus and typography */}
          <a
            href="#"
            className="flex items-center group focus:outline-none"
            id="brand-logo-link"
          >
            <NenufarLogo variant="horizontal" iconSize={34} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-pink-900 hover:bg-white/80 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: cart and WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              id="nav-cart-btn"
              className="relative p-2 rounded-full bg-white hover:bg-pink-50 text-stone-800 border border-pink-200 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-4 h-4 text-pink-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp CTA Button */}
            <button
              onClick={() => onOpenWhatsApp('¡Hola! Me gustaría hacer una consulta sobre sus productos personalizados en nenúfar.')}
              id="nav-whatsapp-cta"
              className="relative group overflow-hidden px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium shadow-sm transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <MessageCircle className="w-3.5 h-3.5 text-pink-300" />
              <span className="relative hidden xs:inline">WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-white/80 transition-colors focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
              id="mobile-menu-toggle"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-stone-800 rounded-full transition-transform ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-stone-800 rounded-full transition-opacity ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-stone-800 rounded-full transition-transform ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-pink-100 mt-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-white/90 hover:text-pink-900 text-left transition-colors"
                >
                  <Icon className="w-4 h-4 text-pink-600" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreCatalogs();
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 text-white text-xs font-semibold text-center"
              >
                Ver Catálogos de Temporada
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
