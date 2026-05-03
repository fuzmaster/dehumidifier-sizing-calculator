import { FormEvent, useEffect, useRef, useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { ResultPanel } from '../components/ResultPanel';
import { SeoContentBlock, SourceProofStrip } from '../components/SeoContentBlock';
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
  confusionMode: 'replace_old_70',
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
  const exampleRecommendation = calculateRecommendation(initialInputs);
  const submittedRecommendation = submittedInputs ? calculateRecommendation(submittedInputs) : null;
  const submittedCapacityTier =
    submittedRecommendation && isCapacityTier(submittedRecommendation.capacityTier)
      ? submittedRecommendation.capacityTier
      : null;
  const exampleCapacityTier =
    exampleRecommendation.status === 'ok' && isCapacityTier(exampleRecommendation.capacityTier)
      ? exampleRecommendation.capacityTier
      : null;
  const exampleProducts =
    exampleRecommendation.status === 'ok' && exampleCapacityTier
      ? filterProducts({
          capacityTier: exampleCapacityTier,
          drainagePreference: initialInputs.drainagePreference,
          basementTemperature: initialInputs.basementTemperature,
          budgetRange: initialInputs.budgetRange,
        })
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
  const shouldShowComparisonSection =
    submittedRecommendation?.status === 'ok' &&
    submittedRecommendation.confidenceLevel !== 'professional_review' &&
    !!productMatches;

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
    // Guarantee calculator_started fires even if user never touched a field
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStarted();
    }
    setSubmittedInputs({ ...inputs });

    const result = calculateRecommendation(inputs);
    const resultCapacityTier = isCapacityTier(result.capacityTier) ? result.capacityTier : null;
    const fallbackMatches =
      result.status === 'ok' && result.confidenceLevel !== 'professional_review' && resultCapacityTier
        ? filterProducts({
            capacityTier: resultCapacityTier,
            drainagePreference: inputs.drainagePreference,
            basementTemperature: inputs.basementTemperature,
            budgetRange: inputs.budgetRange,
          })
        : null;
    const analyticsPayload: RecommendationAnalyticsPayload = {
      squareFootage: inputs.squareFootage,
      humiditySeverity: inputs.humiditySeverity,
      basementTemperature: inputs.basementTemperature,
      drainagePreference: inputs.drainagePreference,
      ratingConfusionMode: inputs.confusionMode,
      budgetRange: inputs.budgetRange,
      resultCapacityTier: result.capacityTier,
      confidenceLevel: result.confidenceLevel,
      fallbackStepsUsed: fallbackMatches?.fallbackStepsUsed.join(' | '),
    };

    trackCalculatorCompleted(analyticsPayload);
    trackResultCapacityTier({
      resultCapacityTier: result.capacityTier,
      confidenceLevel: result.confidenceLevel,
      fallbackStepsUsed: fallbackMatches?.fallbackStepsUsed.join(' | '),
    });
  }

  function getProductRankLabel(product: ProductRecord, productPosition: number): string {
    const pumpNeeded = submittedInputs?.drainagePreference === 'pump_needed';

    if (pumpNeeded && product.hasPump) {
      return 'Best pump option';
    }

    if (productPosition === 1 && product.verificationStatus === 'exact_model') {
      return 'Recommended first';
    }

    if (productPosition === 1) {
      return 'Top comparison';
    }

    if (product.priceTier === 'budget') {
      return 'Budget alternative';
    }

    if (product.smartFeatures.length > 0) {
      return 'Smart-control option';
    }

    return 'Comparison option';
  }

  function handleAffiliateCardClick(product: ProductRecord, productPosition: number, productRankLabel: string) {
    if (!submittedRecommendation) {
      return;
    }

    trackAffiliateCardClicked({
      productId: product.id,
      productName: product.name,
      retailer: product.retailer,
      capacityTier: product.capacityTier,
      resultCapacityTier: submittedRecommendation.capacityTier,
      confidenceLevel: submittedRecommendation.confidenceLevel,
      fallbackStepsUsed: productMatches?.fallbackStepsUsed.join(' | '),
      productPosition,
      productRankLabel,
      verificationStatus: product.verificationStatus,
    });
  }

  function handleAffiliateCtaClick(product: ProductRecord, productPosition: number, productRankLabel: string) {
    if (!submittedRecommendation) {
      return;
    }

    handleAffiliateCardClick(product, productPosition, productRankLabel);
    trackAffiliateCtaClicked({
      productId: product.id,
      productName: product.name,
      retailer: product.retailer,
      capacityTier: product.capacityTier,
      resultCapacityTier: submittedRecommendation.capacityTier,
      confidenceLevel: submittedRecommendation.confidenceLevel,
      fallbackStepsUsed: productMatches?.fallbackStepsUsed.join(' | '),
      productPosition,
      productRankLabel,
      verificationStatus: product.verificationStatus,
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
              Old 70-Pint Dehumidifier Replacement Calculator
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/80">
              New DOE labels can look smaller than older labels. Use this calculator to find the modern 22, 35,
              50-pint, or pump-equipped class to compare first.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Old 70-pint confusion</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Older 70-pint labels often compare closer to current 45-50 pint classes.</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Basement drainage matters</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Pump and gravity-drain needs can change which units make sense.</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Static catalog, no live prices</p>
                <p className="mt-2 text-base leading-7 text-ink/75">Product matches use manually reviewed catalog rules. Retailer prices may change.</p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-ink/10 bg-white/85 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">What you&apos;ll get</p>
              <ul className="mt-4 grid gap-3 text-[15px] leading-7 text-ink/80 md:grid-cols-2 md:text-base">
                <li>Your recommended modern DOE class to compare first</li>
                <li>Plain-English reasoning for the size match</li>
                <li>A pump versus gravity-drain note for your setup</li>
                <li>Three ranked replacement options in normal sizing states</li>
              </ul>
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
          <div className="space-y-8">
            <ResultPanel
              eyebrow="Live preview"
              title="Live preview"
              result={previewRecommendation}
              preview
            />

            {exampleProducts ? (
              <div className="space-y-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">Example comparison</p>
                    <h2 className="mt-2 font-display text-3xl md:text-4xl">Typical old 70-pint replacement path</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-ink/75 md:text-lg">
                      This example uses a 1,200 sq ft damp basement with normal temperatures and gravity drainage.
                      Use the calculator above for your exact match.
                    </p>
                  </div>
                  <span className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">
                    {exampleRecommendation.capacityLabel}
                  </span>
                </div>
                <AffiliateDisclosure />
                <div className="grid gap-6 lg:grid-cols-3">
                  {exampleProducts.products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      capacityTier={exampleRecommendation.capacityLabel}
                      productPosition={index + 1}
                      rankLabel={getProductRankLabel(product, index + 1)}
                      onCtaClick={() => undefined}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <SourceProofStrip />
      </section>

      {submittedRecommendation ? (
        <section ref={submittedResultRef} className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-12 md:scroll-mt-8 md:pb-16">
          <div className="space-y-8">
            <ResultPanel
              eyebrow="Final result"
              title="Your basement recommendation"
              result={submittedRecommendation}
            />
            {shouldShowComparisonSection && productMatches ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">Product comparison</p>
                    <h2 className="mt-2 font-display text-3xl md:text-4xl">Start with these 3 replacement options</h2>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-ink/70">
                      Matched to your replacement result using static catalog rules. Retailer price may change, so confirm today&apos;s listing before buying.
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
                      rankLabel={getProductRankLabel(product, index + 1)}
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
