import Layout from '@/components/Layout';
import Link from 'next/link';

const ConsultationPage = () => (
  <Layout title="Design Consultation — Velvet Whisk">
    <section className="gradient-bg py-16">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Design Concierge</p>
        <h1 className="mt-3 text-4xl font-semibold text-midnight">Book your bespoke cake consultation</h1>
        <p className="mt-4 text-lg text-midnight/70">
          Collaborate with our pastry artists to sketch, taste, and finalize the cake that will anchor your celebration.
        </p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12 lg:px-0">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-midnight">What to expect</h2>
        <ul className="mt-4 space-y-3 text-sm text-midnight/70">
          <li>• Flavor pairing session with three seasonal combinations</li>
          <li>• Custom illustration of your cake concept</li>
          <li>• Dietary preference planning and delivery logistics</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-midnight">Reserve your time</h2>
        <p className="mt-3 text-sm text-midnight/70">
          Consultations are offered virtually or at our San Francisco studio. Choose a slot that fits your schedule.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
        >
          Contact the studio
        </Link>
      </div>
    </section>
  </Layout>
);

export default ConsultationPage;

