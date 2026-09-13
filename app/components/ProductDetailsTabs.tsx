import {useEffect, useMemo, useState, type ReactNode} from 'react';
import {RichTextContent} from './RichTextContent';

export type ProductProcessStep = {
  body: string;
  position: string;
  title: string;
};

export type ProductDetailReference = {
  body: string;
  position?: string;
  title?: string;
};

type ProductDetailsTabsProps = {
  careGuide?: ProductDetailReference[];
  compatibleTechniques?: string[];
  dimensions?: string | null;
  materials?: string | null;
  packageIncludes?: string | null;
  packagingDetails?: ProductDetailReference[];
  processSteps?: ProductProcessStep[];
  shippingDetails?: ProductDetailReference[];
  technique?: string | null;
  weight?: string | null;
};

function parseList(value?: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function ProductDetailsTabs({
  careGuide = [],
  compatibleTechniques = [],
  dimensions,
  materials,
  packageIncludes,
  packagingDetails = [],
  processSteps = [],
  shippingDetails = [],
  technique,
  weight,
}: ProductDetailsTabsProps) {
  const packageItems = parseList(packageIncludes);
  const tabs = useMemo(() => {
    const nextTabs: Array<{content: ReactNode; id: string; label: string}> = [];

    if (dimensions || weight || technique || materials || packageItems.length > 0 || compatibleTechniques.length > 0) {
      nextTabs.push({
        id: 'materials',
        label: 'Características',
        content: (
          <div className="product-details-grid">
            {(dimensions || weight || technique) && (
              <section>
                <h3>Dimensiones y peso</h3>
                {dimensions && <div><strong>Medidas:</strong> <RichTextContent value={dimensions} /></div>}
                {weight && <p><strong>Peso aproximado:</strong> {weight}</p>}
                {technique && <p><strong>Técnica aplicada:</strong> {technique}</p>}
              </section>
            )}
            {materials && (
              <section>
                <h3>Materiales</h3>
                <RichTextContent className="product-details-rich-text" value={materials} />
              </section>
            )}
            {packageItems.length > 0 && (
              <section>
                <h3>Qué incluye tu paquete</h3>
                <ul>
                  {packageItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
            {compatibleTechniques.length > 0 && (
              <section>
                <h3>Técnicas compatibles</h3>
                <ul>
                  {compatibleTechniques.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>
        ),
      });
    }

    if (processSteps.length > 0) {
      nextTabs.push({
        id: 'making',
        label: 'Cómo lo fabricamos',
        content: (
          <section className="product-process">
            <h2 className="product-process__heading">
              El paso a paso de tu pieza en el taller nenúfar
            </h2>
            <ol>
              {processSteps.map((step) => (
                <li key={`${step.position}-${step.title}`}>
                  <span>{step.position}</span>
                  <RichTextContent className="product-process__body" value={step.body} />
                </li>
              ))}
            </ol>
          </section>
        ),
      });
    }

    if (shippingDetails.length > 0 || packagingDetails.length > 0) {
      nextTabs.push({
        id: 'shipping',
        label: 'Envíos y empaque',
        content: (
          <div className="product-details-grid product-details-grid--two-columns">
            {shippingDetails.length > 0 && <section><h3>Tiempos de fabricación y entrega</h3>{shippingDetails.map((detail, index) => <RichTextContent className="product-details-rich-text" key={`${detail.title ?? 'shipping'}-${index}`} value={detail.body} />)}</section>}
            {packagingDetails.length > 0 && <section><h3>Cuidado de empaque y protección</h3>{packagingDetails.map((detail, index) => <RichTextContent className="product-details-rich-text" key={`${detail.title ?? 'packaging'}-${index}`} value={detail.body} />)}</section>}
          </div>
        ),
      });
    }

    if (careGuide.length > 0) {
      nextTabs.push({
        id: 'care',
        label: 'Guía de cuidados',
        content: <section className="product-care-guide"><h3>Recomendaciones</h3>{careGuide.map((detail, index) => <RichTextContent className="product-details-rich-text" key={`${detail.title ?? 'care'}-${index}`} value={detail.body} />)}</section>,
      });
    }

    return nextTabs;
  }, [careGuide, compatibleTechniques, dimensions, materials, packageItems, packagingDetails, processSteps, shippingDetails, technique, weight]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? '');

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTabId)) {
      setActiveTabId(tabs[0]?.id ?? '');
    }
  }, [activeTabId, tabs]);

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  return (
    <section className="product-details" aria-label="Detalles del producto">
      <div aria-label="Secciones de detalles" className="product-details-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-controls={`product-detail-${tab.id}`}
            aria-selected={tab.id === activeTab.id}
            className={tab.id === activeTab.id ? 'is-active' : ''}
            id={`product-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`product-tab-${activeTab.id}`}
        className="product-details-panel"
        id={`product-detail-${activeTab.id}`}
        role="tabpanel"
      >
        {activeTab.content}
      </div>
    </section>
  );
}
