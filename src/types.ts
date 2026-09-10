export interface CatalogItem {
  id: string;
  name: string;
  technique: string;
  materials: string;
  priceFrom: number;
  currency: string;
  image: string;
  tag: string;
  description: string;
  leadTime: string;
  isPopular?: boolean;
}

export interface SeasonalCatalog {
  id: string;
  title: string;
  subtitle: string;
  seasonName: string;
  badge: string;
  accentColor: 'rose' | 'amber' | 'emerald' | 'indigo' | 'plum';
  bgGradient: string;
  coverImage: string;
  description: string;
  itemsCount: number;
  highlightItems: CatalogItem[];
  downloadName: string;
  suggestedPrompt: string;
}

export interface CatalogProduct {
  id: string;
  catalogId: 'madre' | 'padre' | 'maestro' | 'navidad' | 'bodas' | 'todo-el-ano';
  catalogName: string;
  name: string;
  category: string;
  technique: string;
  materials: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  leadTime: string;
  tag: string;
  isPopular?: boolean;
  shopifyVariantId: string;
  shopifyHandle: string;
  allowCustomText: boolean;
  customTextPlaceholder?: string;
  variants?: { id: string; name: string; price: number }[];
}

export interface ShopifyConfig {
  shopDomain: string; // e.g. nenufar-regalos.myshopify.com or custom domain
  storefrontAccessToken?: string;
  isConnected: boolean;
  currencySymbol: string;
  currencyCode: string;
  liveMode: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart
  product: CatalogProduct;
  quantity: number;
  customText: string;
  selectedVariant?: string;
  notes?: string;
}

export interface WorkshopTechnique {
  id: string;
  name: string;
  category: string;
  description: string;
  materials: string[];
  features: string[];
  image: string;
  tag: string;
  turnaround: string;
}

export interface PortfolioPiece {
  id: string;
  title: string;
  category: 'personal' | 'corporativo';
  occasion: string;
  technique: string;
  materials: string;
  description: string;
  image: string;
  highlight: string;
}

export interface ClientReview {
  id: string;
  author: string;
  role: string;
  type: 'personal' | 'empresa';
  rating: number;
  comment: string;
  productMade: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'catalogo' | 'especiales' | 'envios' | 'empresas';
}
