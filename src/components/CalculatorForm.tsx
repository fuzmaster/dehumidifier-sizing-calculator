import type { FormEvent } from 'react';
import type { CalculatorInputs } from '../types/calculator';
import {
  budgetLabels,
  confusionModeLabels,
  drainageLabels,
  humidityLabels,
  temperatureLabels,
} from '../lib/formatters';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: <K extends keyof CalculatorInputs>(field: K, value: CalculatorInputs[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const fieldClassName =
  'mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-base text-ink shadow-sm outline-none transition focus:border-lake focus:ring-2 focus:ring-lake/20 md:py-4';

export function CalculatorForm({ inputs, onChange, onSubmit }: CalculatorFormProps) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="squareFootage">
          Basement square footage
        </label>
        <p className="mt-1 text-sm leading-6 text-ink/70">
          Larger basements may need a stronger class even if the air only feels moderately damp.
        </p>
        <input
          id="squareFootage"
          min={100}
          step={50}
          type="number"
          className={fieldClassName}
          value={Number.isNaN(inputs.squareFootage) ? '' : inputs.squareFootage}
          onChange={(event) => onChange('squareFootage', Math.max(0, Number(event.target.value) || 0))}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="humiditySeverity">
          Humidity severity
        </label>
        <p className="mt-1 text-sm leading-6 text-ink/70">
          Very wet spaces can push the recommendation above a simple replacement match.
        </p>
        <select
          id="humiditySeverity"
          className={fieldClassName}
          value={inputs.humiditySeverity}
          onChange={(event) => onChange('humiditySeverity', event.target.value as CalculatorInputs['humiditySeverity'])}
        >
          {Object.entries(humidityLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="basementTemperature">
          Basement temperature
        </label>
        <p className="mt-1 text-sm leading-6 text-ink/70">
          Cool basements can reduce real-world performance, so low-temperature suitability matters.
        </p>
        <select
          id="basementTemperature"
          className={fieldClassName}
          value={inputs.basementTemperature}
          onChange={(event) => onChange('basementTemperature', event.target.value as CalculatorInputs['basementTemperature'])}
        >
          {Object.entries(temperatureLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="drainagePreference">
          Drainage preference
        </label>
        <p className="mt-1 text-sm leading-6 text-ink/70">
          Choose pump needed if water must move upward to a sink, window, or drain line.
        </p>
        <select
          id="drainagePreference"
          className={fieldClassName}
          value={inputs.drainagePreference}
          onChange={(event) => onChange('drainagePreference', event.target.value as CalculatorInputs['drainagePreference'])}
        >
          {Object.entries(drainageLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="confusionMode">
          Old vs new rating confusion mode
        </label>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Replacing an old 70-pint unit? Many newer labels look smaller because testing standards changed.
        </p>
        <select
          id="confusionMode"
          className={fieldClassName}
          value={inputs.confusionMode}
          onChange={(event) => onChange('confusionMode', event.target.value as CalculatorInputs['confusionMode'])}
        >
          {Object.entries(confusionModeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink" htmlFor="budgetRange">
          Budget range
        </label>
        <p className="mt-1 text-sm leading-6 text-ink/70">
          Budget is used as a preference, but capacity and drainage needs come first.
        </p>
        <select
          id="budgetRange"
          className={fieldClassName}
          value={inputs.budgetRange}
          onChange={(event) => onChange('budgetRange', event.target.value as CalculatorInputs['budgetRange'])}
        >
          {Object.entries(budgetLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-lake px-6 py-4 text-lg font-semibold text-white transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-lake/40 md:py-5"
      >
        Find my modern replacement size
      </button>
    </form>
  );
}
