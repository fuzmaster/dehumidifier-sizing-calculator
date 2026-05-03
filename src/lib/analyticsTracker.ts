type AnalyticsProvider = 'console' | 'plausible' | 'ga4' | 'none';

function getProvider(): AnalyticsProvider {
  const configured = import.meta.env.VITE_ANALYTICS_PROVIDER as AnalyticsProvider | undefined;
  return configured ?? (import.meta.env.DEV ? 'console' : 'none');
}

/**
 * Call once at app startup (main.tsx). Injects the GA4 script tag and
 * defines window.gtag when VITE_ANALYTICS_PROVIDER=ga4 and VITE_GA4_ID is set.
 * No-ops for every other provider.
 */
export function initAnalytics(): void {
  const provider = getProvider();
  if (provider !== 'ga4') return;

  const measurementId = import.meta.env.VITE_GA4_ID;
  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] VITE_GA4_ID is not set — GA4 will not load');
    }
    return;
  }

  // Define dataLayer + gtag shim synchronously so queued calls survive async load
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  // Inject the loader script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Fire a single analytics event through whichever provider is active.
 * Safe to call before initAnalytics has finished — GA4 queues via dataLayer.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  const provider = getProvider();
  const cleanParams: Record<string, string | number | boolean> = Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined),
  );

  if (import.meta.env.DEV) {
    console.info('[analytics event]', eventName, cleanParams);
  }

  switch (provider) {
    case 'ga4':
      window.gtag?.('event', eventName, cleanParams);
      return;
    case 'plausible':
      window.plausible?.(eventName, { props: cleanParams });
      return;
    case 'console':
      // already logged above in DEV; also log in prod console mode
      if (!import.meta.env.DEV) {
        console.info('[analytics]', eventName, cleanParams);
      }
      return;
    case 'none':
      return;
  }
}
