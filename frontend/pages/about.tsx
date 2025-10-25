import Layout from '@/components/Layout';

const AboutPage = () => (
  <Layout title="About — Velvet Whisk">
    <section className="gradient-bg py-16">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Our Story</p>
        <h1 className="mt-3 text-4xl font-semibold text-midnight">Bespoke cakes crafted with heart</h1>
        <p className="mt-4 text-lg text-midnight/70">
          Velvet Whisk Cake Studio blends French pastry techniques with modern artistry. Every cake is a collaboration between our pastry team and your imagination.
        </p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12 lg:px-0">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-midnight">Sustainable ingredients</h2>
        <p className="mt-3 text-sm text-midnight/70">
          We partner with local dairy farms, organic flour mills, and fair-trade cocoa cooperatives. Our kitchen is powered by renewable energy and we reduce waste via composting.
        </p>
      </div>
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-midnight">Inclusive baking</h2>
        <p className="mt-3 text-sm text-midnight/70">
          Dedicated gluten-free, vegan, and allergen-aware production schedules ensure we can accommodate your guests safely without compromising flavor or texture.
        </p>
      </div>
    </section>
  </Layout>
);

export default AboutPage;

