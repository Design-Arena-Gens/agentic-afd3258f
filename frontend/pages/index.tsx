import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CakeCard from '@/components/CakeCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchCakes } from '@/lib/api';
import { Cake } from '@/types';

const HomePage = () => {
  const [featured, setFeatured] = useState<Cake[]>([]);

  useEffect(() => {
    fetchCakes({ sort: 'rating_desc' })
      .then(data => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <Layout description="Velvet Whisk Cake Studio delivers bespoke cakes with pastel artistry and unforgettable flavor.">
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-midnight/50">Signature Collection</p>
            <h2 className="mt-2 text-3xl font-semibold text-midnight">Our most-loved cakes</h2>
            <p className="mt-3 max-w-xl text-midnight/70">
              Discover pastel-hued creations layered with seasonal curds, silken ganache, and cloudlike buttercream.
            </p>
          </div>
          <Link href="/catalog" className="hidden rounded-full border border-midnight/20 px-5 py-2 text-sm font-semibold text-midnight focus-ring md:inline-block">
            Explore Catalog
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      <TestimonialCarousel />

      <section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-white/60 bg-white/80 px-4 py-16 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-midnight/50">Design Experience</p>
            <h2 className="mt-2 text-3xl font-semibold text-midnight">Collaborate with our cake artists</h2>
            <p className="mt-4 text-lg text-midnight/70">
              Schedule a consultation to dream up bespoke designs, choose flavor flights, and ensure dietary needs are celebrated.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-midnight/60">
              <li>• Virtual or in-studio consultations</li>
              <li>• Flavor tasting boxes delivered nationwide</li>
              <li>• keepsake sketches of your cake concept</li>
            </ul>
            <Link
              href="/consultation"
              className="mt-8 inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
            >
              Book a Consultation
            </Link>
          </div>
          <div className="space-y-6 text-midnight/70">
            <div className="rounded-2xl border border-white/60 bg-white/70 p-6">
              <h3 className="text-lg font-semibold text-midnight">Pastel design language</h3>
              <p className="mt-3 text-sm">
                We layer gradients of blush, lavender, and sky blue with metallic accents, preserving a timeless yet whimsical aesthetic.
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/70 p-6">
              <h3 className="text-lg font-semibold text-midnight">Inclusive flavors</h3>
              <p className="mt-3 text-sm">
                Vegan meringue buttercream, gluten-free almond sponge, and nut-free praline ensure every guest can indulge safely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

