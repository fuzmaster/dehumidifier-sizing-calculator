import type { AnalyticsEvent } from '../types/calculator';

type AnalyticsProvider = 'console' | 'plausible' | 'ga4' | 'none';

interface AnalyticsConfig {
  provider: AnalyticsProvider;
  domain?: string;
  measurementId?: string;
  debug?: boolean;
}

function getAnalyticsConfig(): AnalyticsConfig {
  const configuredProvider = import.meta.env.VITE_ANALYTICS_PROVIDER;
  const provider = configuredProvider ?? (import.meta.env.DEV ? 'console' : 'none');

  return {
    provider,
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
    measurementId: import.meta.env.VITE_GA4_ID,
    debug: import.meta.env.DEV,
  };
}

function normalizePayload(payload?: AnalyticsEvent['payload']): Record<string, string | number | boolean> {
  return Object.fromEntries(Object.entries(payload ?? {}).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined));
}

export function trackAnalyticsEvent(event: AnalyticsEvent): void {
  const config = getAnalyticsConfig();
  const payload = normalizePayload(event.payload);

  switch (config.provider) {
    case 'console':
      console.info('[analytics]', event.name, payload);
      return;
    case 'plausible':
      if (config.domain) {
        window.plausible?.(event.name, { props: payload });
        if (config.debug) {
          console.info('[plausible]', event.name, payload);
        }
      } else if (config.debug) {
        console.warn('[plausible] missing VITE_PLAUSIBLE_DOMAIN');
      }
      return;
    case 'ga4':
      if (config.measurementId) {
        window.gtag?.('event', event.name, payload);
      } else if (config.debug) {
        console.warn('[ga4] measurementId missing for event', event.name);
      }
      if (config.debug) {
        console.info('[ga4]', event.name, payload);
      }
      return;
    case 'none':
      if (config.debug) {
        console.info('[analytics:none]', event.name, payload);
      }
  }
}
