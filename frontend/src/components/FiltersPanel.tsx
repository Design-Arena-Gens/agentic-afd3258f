import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

export type Filters = {
  flavor?: string;
  occasion?: string;
  dietary?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
};

type FiltersPanelProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const dietaryOptions = ['Gluten-Free', 'Vegan', 'Nut-Free', 'Dairy-Free'];
const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Top Rated' }
];

const FiltersPanel = ({ filters, onChange }: FiltersPanelProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDietary = (option: string) => {
    const dietary = new Set(filters.dietary ?? []);
    if (dietary.has(option)) {
      dietary.delete(option);
    } else {
      dietary.add(option);
    }
    onChange({ ...filters, dietary: Array.from(dietary) });
  };

  return (
    <aside className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg">
      <button
        className="flex w-full items-center justify-between focus-ring md:hidden"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-midnight">
          <FunnelIcon className="h-5 w-5" />
          Filters
        </span>
        <span className="text-xs text-midnight/60">{expanded ? 'Hide' : 'Show'}</span>
      </button>

      <div className={`${expanded ? 'mt-4' : 'hidden md:block md:mt-0'}`}>
        <div className="space-y-6">
          <div>
            <label htmlFor="flavor" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Flavor
            </label>
            <input
              id="flavor"
              type="text"
              value={filters.flavor ?? ''}
              placeholder="Chocolate, Lemon..."
              className="mt-2 w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
              onChange={e => onChange({ ...filters, flavor: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="occasion" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Occasion
            </label>
            <input
              id="occasion"
              type="text"
              value={filters.occasion ?? ''}
              placeholder="Birthday, Wedding..."
              className="mt-2 w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
              onChange={e => onChange({ ...filters, occasion: e.target.value })}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-midnight/60">Dietary Preferences</p>
            <div role="group" aria-label="Dietary filters" className="mt-2 grid grid-cols-2 gap-2">
              {dietaryOptions.map(option => {
                const selected = filters.dietary?.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleDietary(option)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition focus-ring ${
                      selected ? 'border-midnight bg-midnight text-white' : 'border-white/60 bg-white text-midnight'
                    }`}
                    aria-pressed={selected}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="min-price" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                Min Price
              </label>
              <input
                id="min-price"
                type="number"
                min={0}
                value={filters.minPrice ?? ''}
                className="mt-2 w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
                onChange={e => onChange({ ...filters, minPrice: e.target.valueAsNumber || undefined })}
              />
            </div>
            <div>
              <label htmlFor="max-price" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                Max Price
              </label>
              <input
                id="max-price"
                type="number"
                min={0}
                value={filters.maxPrice ?? ''}
                className="mt-2 w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
                onChange={e => onChange({ ...filters, maxPrice: e.target.valueAsNumber || undefined })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Sort By
            </label>
            <select
              id="sort"
              value={filters.sort ?? ''}
              className="mt-2 w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
              onChange={e => onChange({ ...filters, sort: e.target.value || undefined })}
            >
              <option value="">Featured</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full rounded-xl border border-midnight/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-midnight/70 transition hover:border-midnight/40 focus-ring"
            onClick={() =>
              onChange({
                flavor: '',
                occasion: '',
                dietary: [],
                minPrice: undefined,
                maxPrice: undefined,
                sort: undefined
              })
            }
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FiltersPanel;

