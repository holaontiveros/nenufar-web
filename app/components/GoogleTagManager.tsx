import {useEffect, useState} from 'react';
import {useAnalytics, useNonce} from '@shopify/hydrogen';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function GoogleTagManager({containerId}: {containerId?: string}) {
  const {customerPrivacy} = useAnalytics();
  const nonce = useNonce();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      setAllowed(customerPrivacy?.analyticsProcessingAllowed() ?? false);
    };

    updateConsent();
    document.addEventListener('visitorConsentCollected', updateConsent);
    return () => document.removeEventListener('visitorConsentCollected', updateConsent);
  }, [customerPrivacy]);

  useEffect(() => {
    if (!containerId || !allowed || document.getElementById('nenufar-gtm')) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
    const script = document.createElement('script');
    script.id = 'nenufar-gtm';
    script.async = true;
    script.nonce = nonce;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
    document.head.appendChild(script);
  }, [allowed, containerId]);

  return null;
}
