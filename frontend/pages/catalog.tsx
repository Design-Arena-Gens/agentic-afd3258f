import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import FiltersPanel, { Filters } from '@/components/FiltersPanel';
import CakeCard from '@/components/CakeCard';
import { useCakes } from '@/hooks/useCakes';

const CatalogPage = () => {
  const [filters, setFilters] = useState<Filters>({});
  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {};
    if (filters.flavor) params.flavor = filters.flavor;
    if (filters.occasion) params.occasion = filters.occasion;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.dietary && filters.dietary.length > 0) params.dietary = filters.dietary.join(',');
    if (filters.sort) params.sort = filters.sort;
    return params;
  }, [filters]);

  const { cakes, loading, error } = useCakes(queryParams);

  return (
    <Layout title="Cake Catalog — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Curated Collection</p>
          <h1 className="mt-2 text-4xl font-semibold text-midnight">Find your perfect cake</h1>
          <p className="mt-4 max-w-2xl text-midnight/70">
            Filter by flavor, occasion, budget, or dietary preferences. Every cake is handmade with premium ingredients and customizable finishes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <FiltersPanel filters={filters} onChange={setFilters} />

          <div>
            {loading && <p className="text-midnight/70">Loading cakes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && cakes.length === 0 && (
              <p className="rounded-3xl border border-white/60 bg-white/80 p-6 text-midnight/70">No cakes matched your filters.</p>
            )}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CatalogPage;

