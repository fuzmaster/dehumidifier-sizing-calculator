import type { PropsWithChildren } from 'react';
import { AffiliateDisclosure } from './AffiliateDisclosure';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-hero-radial opacity-90" />
      <main>{children}</main>
      <footer className="border-t border-ink/10 bg-white/80">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-6 md:grid-cols-[1.7fr_1fr] md:items-start">
            <div>
              <p className="font-display text-2xl">Old vs New Dehumidifier Rating Calculator</p>
              <p className="mt-3 max-w-2xl text-sm text-ink/70 md:text-base">
                Built as a static React app for homeowners comparing older pint ratings with current DOE labels and
                drainage needs.
              </p>
            </div>
            <AffiliateDisclosure compact />
          </div>
        </div>
      </footer>
    </div>
  );
}
