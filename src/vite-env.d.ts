/// <reference types="vite/client" />

declare global {
  interface Window {
    __APP_ANALYTICS__?: {
      provider?: 'console' | 'plausible' | 'ga4' | 'none';
      domain?: string;
      measurementId?: string;
      debug?: boolean;
    };
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
