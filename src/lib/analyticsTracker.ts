import type { AnalyticsEvent } from '../types/calculator';

type AnalyticsProvider = 'console' | 'plausible' | 'ga4' | 'none';

interface AnalyticsConfig {
  provider: AnalyticsProvider;
  domain?: string;
  measurementId?: string;
  debug?: boolean;
}

function getAnalyticsConfig(): AnalyticsConfig {
  return {
    provider: window.__APP_ANALYTICS__?.provider ?? 'console',
    domain: window.__APP_ANALYTICS__?.domain,
    measurementId: window.__APP_ANALYTICS__?.measurementId,
    debug: window.__APP_ANALYTICS__?.debug,
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
      window.plausible?.(event.name, { props: payload });
      if (config.debug) {
        console.info('[plausible]', event.name, payload);
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
