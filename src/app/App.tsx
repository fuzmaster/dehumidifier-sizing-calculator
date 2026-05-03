import { FormEvent, useEffect, useRef, useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { ResultPanel } from '../components/ResultPanel';
import { SeoContentBlock } from '../components/SeoContentBlock';
import { AffiliateDisclosure } from '../components/AffiliateDisclosure';
import { calculateRecommendation } from '../lib/calculateRecommendation';
import { filterProducts } from '../lib/filterProducts';
import { formatNumber } from '../lib/formatters';
import {
  trackAffiliateCardClicked,
  trackAffiliateCtaClicked,
  trackCalculatorCompleted,
  trackCalculatorStarted,
  trackResultCapacityTier,
} from '../lib/tracking';
import type { CalculatorInputs, CapacityTier, ProductRecord, RecommendationAnalyticsPayload } from '../types/calculator';

const initialInputs: CalculatorInputs = {
  squareFootage: 1200,
  humiditySeverity: 'damp',
  basementTemperature: '65_75',
  drainagePreference: 'gravity_drain',
  confusionMode: 'first_unit',
  budgetRange: 'mid',
};

function isCapacityTier(value: string): value is CapacityTier {
  return [
    'small_20_22',
    'medium_30_35',
    'large_45_50',
    'large_45_50_pump',
    'premium_basement',
  ].includes(value);
}

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);
  const [submittedInputs, setSubmittedInputs] = useState<CalculatorInputs | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const submittedResultRef = useRef<HTMLElement | null>(null);

  const previewRecommendation = calculateRecommendation(inputs);
  const submittedRecommendation = submittedInputs ? calculateRecommendation(submittedInputs) : null;
  const submittedCapacityTier =
    submittedRecommendation && isCapacityTier(submittedRecommendation.capacityTier)
      ? submittedRecommendation.capacityTier
      : null;
  const productMatches =
    submittedInputs && submittedRecommendation?.status === 'ok' && submittedCapacityTier
      ? filterProducts({
          capacityTier: submittedCapacityTier,
          drainagePreference: submittedInputs.drainagePreference,
          basementTemperature: submittedInputs.basementTemperature,
          budgetRange: submittedInputs.budgetRange,
        })
      : null;

  useEffect(() => {
    if (!submittedRecommendation || !submittedResultRef.current) {
      return;
    }

    submittedResultRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [submittedRecommendation]);

  function updateField<K extends keyof CalculatorInputs>(field: K, value: CalculatorInputs[K]) {
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStarted();
    }

    setInputs((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedInputs({ ...inputs });

    const result = calculateRecommendation(inputs);
    const analyticsPayload: RecommendationAnalyticsPayload = {
      squareFootage: inputs.squareFootage,
      humiditySeverity: inputs.humiditySeverity,
      basementTemperature: inputs.basementTemperature,
      drainagePreference: inputs.drainagePreference,
      ratingConfusionMode: inputs.confusionMode,
      budgetRange: inputs.budgetRange,
      resultCapacityTier: result.capacityTier,
      confidenceLevel: result.confidenceLevel,
      fallbackStepsUsed: productMatches?.fallbackStepsUsed.join(' | '),
    };

    trackCalculatorCompleted(analyticsPayload);
    trackResultCapacityTier({
      resultCapacityTier: result.capacityTier,
      confidenceLevel: result.confidenceLevel,
      fallbackStepsUsed: productMatches?.fallbackStepsUsed.join(' | '),
    });
  }

  function handleAffiliateCardClick(product: ProductRecord, productPosition: number) {
    if (!submittedRecommendation) {
      return;
    }

    trackAffiliateCardClicked({
      productId: product.id,
      retailer: product.retailer,
      resultCapacityTier: submittedRecommendation.capacityTier,
      confidenceLevel: submittedRecommendation.confidenceLevel,
      productPosition,
    });
  }

  function handleAffiliateCtaClick(product: ProductRecord, productPosition: number) {
    if (!submittedRecommendation) {
      return;
    }

    handleAffiliateCardClick(product, productPosition);
    trackAffiliateCtaClicked({
      productId: product.id,
      retailer: product.retailer,
      resultCapacityTier: submittedRecommendation.capacityTier,
      confidenceLevel: submittedRecommendation.confidenceLevel,
      productPosition,
    });
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pb-16 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="animate-rise">
            <p className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-moss shadow-sm">
              Basement buying guide
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-ink md:text-6xl">
              Replacing an old 70-pint dehumidifier? Start with the right modern size.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/80">
              New DOE labels can look smaller than older labels. This calculator helps you compare the right 22,
              35, 50-pint, or pump-equipped class for your basement.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Old 70-pint confusion</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Modern labels are lower, so the right replacement class can look smaller at first glance.</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Basement drainage matters</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Pump or gravity drainage changes which units are practical, not just which labels look familiar.</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Static catalog</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Catalog rules are manually reviewed and prices are not live retailer feeds.</p>
              </div>
            </div>
          </div>

          <div className="animate-rise rounded-[2rem] border border-ink/10 bg-white/90 p-7 shadow-soft backdrop-blur md:p-9">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">Calculator</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">Basement sizing form</h2>
              </div>
              <span className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-lake">
                {formatNumber(inputs.squareFootage)} sq ft
              </span>
            </div>
            <CalculatorForm inputs={inputs} onChange={updateField} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>

      {!submittedRecommendation ? (
        <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
          <ResultPanel
            eyebrow="Live preview"
            title="Live preview"
            result={previewRecommendation}
            preview
          />
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <SeoContentBlock proofOnly />
      </section>

      {submittedRecommendation ? (
        <section ref={submittedResultRef} className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-12 md:scroll-mt-8 md:pb-16">
          <div className="space-y-8">
            <ResultPanel
              eyebrow="Final result"
              title="Your basement recommendation"
              result={submittedRecommendation}
            />
            {submittedRecommendation.status === 'ok' && productMatches ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">Product comparison</p>
                    <h2 className="mt-2 font-display text-3xl md:text-4xl">Compare these first</h2>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-ink/70">
                      These product links are matched to your result using static catalog rules. Prices are not live.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-lake shadow-sm">
                    {productMatches.products.length} comparison options
                  </span>
                </div>
                <AffiliateDisclosure />
                <div className="grid gap-6 lg:grid-cols-3">
                  {productMatches.products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      capacityTier={submittedRecommendation.capacityLabel}
                      productPosition={index + 1}
                      onCtaClick={handleAffiliateCtaClick}
                    />
                  ))}
                </div>

                {productMatches.fallbackStepsUsed.length > 0 ? (
                  <div className="rounded-2xl border border-ink/10 bg-sand/60 p-4 text-sm text-ink/80">
                    <p className="font-semibold text-ink">Some filters were relaxed to keep comparison options available.</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium">Show filter details</summary>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-ink/75">
                        {productMatches.fallbackStepsUsed.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-ink/10 px-5 py-4 text-base leading-7 text-ink/80">
                  <p className="font-semibold text-ink">Safety note</p>
                  <p className="mt-2">{submittedRecommendation.safetyNote}</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <SeoContentBlock />
      </section>
    </Layout>
  );
}
