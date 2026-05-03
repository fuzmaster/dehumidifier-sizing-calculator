export function SourceProofStrip() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
      <h2 className="font-display text-3xl md:text-4xl">Why your old 70-pint replacement may be labeled 50-pint now</h2>
      <p className="mt-4 text-lg font-semibold leading-8 text-ink">
        Federal testing standards changed, so many homeowners replacing an older 70-pint unit should start by comparing today&apos;s 45-50 pint DOE class.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
        <table className="min-w-full divide-y divide-ink/10 text-left text-[15px] md:text-base">
          <thead className="bg-mist">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Older label</th>
              <th className="px-4 py-3 font-semibold text-ink">Start by comparing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 bg-white">
            <tr>
              <td className="px-4 py-3 text-ink/80">Older 30-pint label</td>
              <td className="px-4 py-3 text-ink/80">Current 20-22 pint class</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-ink/80">Older 50-pint label</td>
              <td className="px-4 py-3 text-ink/80">Current 30-35 pint class</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-ink/80">Older 70-pint label</td>
              <td className="px-4 py-3 text-ink/80">Current 45-50 pint class</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/70">
        These are shopping comparison classes, not a guarantee that every old and new model performs identically.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <a
          href="https://www.energystar.gov/products/dehumidifier_testing_and_capacity"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake"
        >
          <p className="font-semibold text-ink">ENERGY STAR testing and capacity</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Why modern capacity labels look smaller and how testing standards changed.</p>
        </a>
        <a
          href="https://www.energystar.gov/products/dehumidifiers"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake"
        >
          <p className="font-semibold text-ink">ENERGY STAR dehumidifier criteria</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Current class and efficiency context for dehumidifier comparisons.</p>
        </a>
        <a
          href="https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-ink/10 bg-mist p-4 transition hover:border-lake focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake"
        >
          <p className="font-semibold text-ink">EPA moisture guidance</p>
          <p className="mt-2 text-base leading-7 text-ink/75">Practical moisture-control context and when source fixes come first.</p>
        </a>
      </div>
    </section>
  );
}

export function SeoContentBlock() {
  const officialResources = [
    {
      href: 'https://www.energystar.gov/products/dehumidifiers',
      label: 'ENERGY STAR dehumidifiers',
      description: 'Federal efficiency program guidance and buying context for dehumidifiers.',
    },
    {
      href: 'https://www.energystar.gov/productfinder/product/certified-dehumidifiers/results',
      label: 'ENERGY STAR certified model finder',
      description: 'Search certified dehumidifier models and compare options by class.',
    },
    {
      href: 'https://www.epa.gov/mold',
      label: 'EPA mold and moisture guidance',
      description: 'Official moisture-control and mold-prevention information for homes.',
    },
    {
      href: 'https://www.cdc.gov/mold-health/about/index.html',
      label: 'CDC mold health guidance',
      description: 'Health-focused humidity and mold prevention recommendations.',
    },
    {
      href: 'https://www.energy.gov/energysaver/moisture-control',
      label: 'DOE Energy Saver moisture control',
      description: 'U.S. Department of Energy home moisture-control best practices.',
    },
    {
      href: 'https://www.cpsc.gov/Recalls',
      label: 'CPSC recalls and safety warnings',
      description: 'Check current U.S. product recalls and safety alerts before buying.',
    },
    {
      href: 'https://www.ncei.noaa.gov/access/us-climate-normals/',
      label: 'NOAA climate normals',
      description: 'Local long-term climate averages that help contextualize basement humidity.',
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">Old 70-pint dehumidifier replacement guide</h2>
        <div className="mt-6 space-y-8 text-base leading-7 text-ink/75 md:text-lg md:leading-8">
          <div>
            <h3 className="text-xl font-semibold text-ink">What to compare first</h3>
            <div className="mt-3 space-y-4">
              <p>
                If you are replacing an old 70-pint unit, start by comparing modern 45-50 pint DOE models before assuming
                you need the same printed number. New testing standards make current labels look smaller.
              </p>
              <p>
                This calculator weighs square footage, humidity severity, temperature, drainage layout, and budget so you
                can compare the right class first instead of shopping by label memory alone.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-ink">Is a new 50-pint the same as an old 70-pint?</h3>
            <p className="mt-3">
              Not exactly model-for-model, but the shopping class is often similar. The older rating standard and current
              DOE standard are not directly interchangeable, so this tool uses your basement conditions to keep comparisons realistic.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-ink">When to choose a pump model</h3>
            <p className="mt-3">
              Choose a pump model when water must move upward or across the basement to a sink, window, or drain line.
              If a floor drain is lower than the unit, gravity drainage is often simpler and cheaper.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-ink">Why cold basements complicate sizing</h3>
            <p className="mt-3">
              Lower temperatures can reduce effective moisture removal. Capacity class still matters, but low-temperature
              suitability and defrost behavior become just as important when basements trend below 60°F.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-ink">Why square footage alone is not enough</h3>
            <p className="mt-3">
              Two basements with the same size can need different classes based on moisture severity, temperature, drainage
              constraints, and old-label replacement context. That is why this calculator combines multiple inputs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-ink">When a portable dehumidifier is not enough</h3>
            <p className="mt-3">
              Flooding, active seepage, and very large basement footprints can exceed normal portable-unit sizing. In those
              scenarios, use this tool after the moisture source and drainage problem are addressed.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">FAQ</h2>
        <div className="mt-6 space-y-4">
          <details className="rounded-2xl border border-ink/10 px-5 py-4" open>
            <summary className="cursor-pointer text-lg font-semibold text-ink">Why does an old 70-pint unit map closer to a current 50-pint class model?</summary>
            <p className="mt-3 text-[15px] leading-7 text-ink/75 md:text-base">
              Older labels and current DOE labels use different test standards. That is why the right modern shopping class can show a smaller printed number.
            </p>
          </details>
          <details className="rounded-2xl border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-ink">What if I cannot find the original pint rating on my old unit?</summary>
            <p className="mt-3 text-[15px] leading-7 text-ink/75 md:text-base">
              Check the unit label or owner&apos;s manual for the original capacity. If the rating is not visible, measure the space and use the calculator with your actual basement conditions to reach the right shopping class.
            </p>
          </details>
          <details className="rounded-2xl border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-ink">Can I use this calculator for a crawlspace or above-grade room?</summary>
            <p className="mt-3 text-[15px] leading-7 text-ink/75 md:text-base">
              The calculator is designed around basement conditions and the old 70-pint replacement scenario. Crawlspaces and above-grade rooms have different ventilation and moisture patterns, so treat the result as a starting point rather than a direct recommendation.
            </p>
          </details>
        </div>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-display text-3xl md:text-4xl">More official resources</h2>
        <details className="mt-4 rounded-2xl border border-ink/10 bg-mist/60 p-5">
          <summary className="cursor-pointer text-lg font-semibold text-ink">Open official source links</summary>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink/75">
            Use these government and federal-program sources for standards, recalls, safety, and indoor moisture guidance.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {officialResources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-lake focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake"
              >
                <p className="font-semibold text-ink">{resource.label}</p>
                <p className="mt-2 text-base leading-7 text-ink/75">{resource.description}</p>
              </a>
            ))}
          </div>
        </details>
      </section>
    </div>
  );
}
