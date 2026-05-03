import type { RecommendationResult } from '../types/calculator';

interface ResultPanelProps {
  result: RecommendationResult;
  title: string;
  eyebrow: string;
  preview?: boolean;
}

export function ResultPanel({ result, title, eyebrow, preview = false }: ResultPanelProps) {
  const badgeClassName =
    result.confidenceLevel === 'professional_review'
      ? 'bg-clay/20 text-clay'
      : result.confidenceLevel === 'medium'
        ? 'bg-moss/15 text-moss'
        : 'bg-lake/10 text-lake';

  const shouldShowProfessionalReview =
    result.status === 'out_of_bounds' || result.confidenceLevel === 'professional_review';

  if (preview) {
    return (
      <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">{eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <h2 className="font-display text-2xl leading-tight md:text-3xl">{title}</h2>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${badgeClassName}`}>{result.confidenceLabel}</span>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-mist p-5 md:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Your current match</p>
            <p className="mt-2 text-2xl font-semibold leading-tight text-ink md:text-3xl">{result.capacityLabel}</p>
            <p className="mt-3 text-base leading-7 text-ink/85 md:text-lg">{result.plainEnglishExplanation}</p>
            {result.reasoningSteps[0] ? (
              <p className="mt-4 text-[15px] leading-6 text-ink/75">
                <span className="font-semibold text-ink">Why:</span> {result.reasoningSteps[0]}
              </p>
            ) : null}
          </div>
          <div className="rounded-3xl border border-ink/10 p-5 md:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">What happens after submit</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-6 text-ink/80 md:text-base md:leading-7">
              <li>See the exact reason this class matched your basement.</li>
              <li>Get a drainage note for pump versus gravity setup.</li>
              <li>Compare 3 ranked product options when the scenario is in normal range.</li>
            </ul>
            <p className="mt-4 font-semibold text-ink">Next: submit to unlock the full comparison path.</p>
          </div>
        </div>
      </section>
    );
  }

  if (shouldShowProfessionalReview) {
    return (
      <section className="rounded-[2rem] border border-clay/25 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">{eyebrow}</p>
        <div className="mt-4 rounded-3xl border border-clay/25 bg-clay/10 p-5 md:p-6">
          <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Professional review needed</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink/85">
            This calculator is not showing product recommendations because your inputs suggest flooding, extreme square footage, or a moisture problem outside normal portable-dehumidifier sizing.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-ink/10 bg-sand/45 p-5">
            <h3 className="text-lg font-semibold text-ink">Why the calculator stopped</h3>
            <ul className="mt-3 space-y-2 text-base leading-7 text-ink/80">
              <li>Flooding, standing water, or very large spaces can involve drainage, foundation, HVAC, or remediation problems.</li>
              <li>A portable dehumidifier may help after the water source is addressed, but it should not be treated as the first fix.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-ink">Check these before shopping</h3>
            <ul className="mt-3 space-y-2 text-base leading-7 text-ink/80">
              <li>Standing water or wet flooring</li>
              <li>Active wall or floor seepage</li>
              <li>Failed or missing drainage path</li>
              <li>Recent leak, storm, or plumbing issue</li>
              <li>Basement area larger than the consumer portable-unit range</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-ink">When to use this calculator again</h3>
            <ul className="mt-3 space-y-2 text-base leading-7 text-ink/80">
              <li>After the water source is fixed</li>
              <li>After the space is dry enough for normal humidity control</li>
              <li>When you are comparing portable dehumidifier sizes, pump options, and drainage setups</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-ink">Safety note</h3>
            <p className="mt-3 text-base leading-7 text-ink/80">
              This tool does not diagnose mold, leaks, HVAC problems, foundation or structural issues, or health risks.
            </p>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">{eyebrow}</p>
      <div className="mt-4 rounded-3xl bg-lake/10 p-5 md:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Your modern replacement class</p>
        <p className="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">{result.capacityLabel}</p>
        {result.reasoningSteps[0] ? (
          <p className="mt-4 text-base leading-7 text-ink/80">
            <span className="font-semibold text-ink">Why: </span>{result.reasoningSteps[0]}
          </p>
        ) : null}
        <span className={`mt-4 inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${badgeClassName}`}>{result.confidenceLabel}</span>
      </div>
      <div className="mt-5">
        <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-ink/70">{result.affiliateMessage.subheadline}</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="space-y-5 rounded-3xl bg-mist p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Plain-English explanation</p>
            <p className="mt-2 text-base leading-7 text-ink/80 md:text-lg">{result.plainEnglishExplanation}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lake">Why you got this result</p>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-ink/80 md:text-base">
              {result.reasoningSteps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lake" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-ink/10 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Drainage recommendation</p>
            <p className="mt-2 text-base leading-7 text-ink/80">{result.drainageRecommendation}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Temperature note</p>
            <p className="mt-2 text-base leading-7 text-ink/80">{result.temperatureNote}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Old-rating translation note</p>
            <p className="mt-2 text-base leading-7 text-ink/80">{result.oldRatingTranslationNote}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Source note</p>
            <p className="mt-2 text-base leading-7 text-ink/80">Based on public DOE and ENERGY STAR rating context. See the source notes and comparison table below.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Safety note</p>
            <p className="mt-2 text-base leading-7 text-ink/80">{result.safetyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
