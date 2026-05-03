interface SeoContentBlockProps {
  proofOnly?: boolean;
}

function WhyRatingsChangedSection() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Why the ratings changed</p>
      <p className="mt-3 text-lg font-semibold leading-8 text-ink">
        The rating system changed, so a newer 50-pint label may be the correct replacement class for many older 70-pint units.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <a
          href="https://www.energystar.gov/products/dehumidifier_testing_and_capacity"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake"
        >
          <p className="font-semibold text-ink">ENERGY STAR testing and capacity</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Why modern capacity labels look smaller and how testing standards changed.</p>
        </a>
        <a
          href="https://www.energystar.gov/products/dehumidifiers"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake"
        >
          <p className="font-semibold text-ink">ENERGY STAR dehumidifier criteria</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Current class and efficiency context for consumer dehumidifier comparisons.</p>
        </a>
        <a
          href="https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake"
        >
          <p className="font-semibold text-ink">EPA moisture guidance</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Practical moisture-control context and why source issues still need attention.</p>
        </a>
      </div>
    </section>
  );
}

export function SeoContentBlock({ proofOnly = false }: SeoContentBlockProps) {
  if (proofOnly) {
    return <WhyRatingsChangedSection />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">Why old dehumidifier ratings feel misleading now</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-ink/75">
          <p>
            Older dehumidifiers were commonly marketed with pint ratings measured under different test conditions.
            Current DOE labels are more conservative, so a homeowner replacing an old 50-pint unit can feel like they
            need to downsize when they really just need the modern equivalent.
          </p>
          <p>
            This calculator compares your basement size, moisture severity, temperature, drainage setup, and budget so
            the recommendation stays grounded in how the space behaves instead of marketing shorthand alone.
          </p>
          <p>
            If your basement is very large or actively flooded, the tool stops early because portable units are not a
            reliable stand-in for a full site assessment.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">How old ratings line up with newer DOE labels</h2>
        <div className="mt-6 space-y-6 text-base leading-7 text-ink/75">
          <div>
            <h3 className="text-xl font-semibold text-ink">Old 30-pint vs new 20-22 pint</h3>
            <p className="mt-2">If you are replacing an older 30-pint unit, start by comparing today&apos;s 20-22 pint class first. The printed number looks lower, but the shopping tier is often the right place to begin.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">Old 50-pint vs new 30-35 pint</h3>
            <p className="mt-2">Many shoppers replacing an old 50-pint model land in the current 30-35 pint DOE class, unless the basement is larger, colder, or wetter than average.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">Old 70-pint vs new 45-50 pint</h3>
            <p className="mt-2">Older 70-pint models often line up closer to the modern 45-50 pint class. That is why newer labels can feel unexpectedly smaller at first glance.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">Pump vs gravity drain</h3>
            <p className="mt-2">Pump models help when you need to send water upward or across the room. Gravity drain models are usually simpler if you already have a floor drain or lower drain point nearby.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">Why cold basements need careful product matching</h3>
            <p className="mt-2">Capacity alone is not enough in a cold basement. Compare the stated operating range and defrost behavior because some units are better suited to cool spaces than others.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">When a portable dehumidifier is not enough</h3>
            <p className="mt-2">If the basement is flooded or extremely large, a portable unit is not a complete shopping answer. Use that as a cue to compare broader drainage or professional site-review options first.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">FAQ</h2>
        <div className="mt-6 space-y-4">
          <details className="rounded-2xl border border-ink/10 px-5 py-4" open>
            <summary className="cursor-pointer text-lg font-semibold text-ink">Why does an old 70-pint unit map closer to a current 50-pint class model?</summary>
            <p className="mt-3 text-base leading-7 text-ink/75">
              The older rating system used different test conditions, so modern DOE numbers are lower for roughly similar
              real-world moisture removal classes.
            </p>
          </details>
          <details className="rounded-2xl border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-ink">When should I prefer a pump model?</summary>
            <p className="mt-3 text-base leading-7 text-ink/75">
              Choose a pump-capable model when you need the condensate sent upward or across the room because a floor
              drain is not available near the unit.
            </p>
          </details>
          <details className="rounded-2xl border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-ink">What if my basement is under 60°F?</summary>
            <p className="mt-3 text-base leading-7 text-ink/75">
              Cooler basements can reduce coil efficiency. Favor models that explicitly mention low-temperature or
              defrost support and avoid assuming every 50-pint unit performs the same way.
            </p>
          </details>
          <details className="rounded-2xl border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-ink">Does a higher price tier always mean better moisture control?</summary>
            <p className="mt-3 text-base leading-7 text-ink/75">
              Not always. Higher tiers often add quieter operation, controls, or drainage convenience. Capacity fit and
              drainage setup still matter more than a premium badge alone.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
