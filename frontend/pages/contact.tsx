import Layout from '@/components/Layout';

const ContactPage = () => (
  <Layout title="Contact — Velvet Whisk">
    <section className="gradient-bg py-16">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Connect</p>
        <h1 className="mt-3 text-4xl font-semibold text-midnight">We’d love to hear from you</h1>
        <p className="mt-4 text-lg text-midnight/70">
          Share your celebration details and our concierge will reply within one business day.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-12 lg:px-0">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl">
        <form className="grid gap-4 md:grid-cols-2" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
            />
          </div>
          <div>
            <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Event Date
            </label>
            <input
              id="date"
              type="date"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
            />
          </div>
          <div>
            <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Guest Count
            </label>
            <input
              id="guests"
              type="number"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
              Tell us about your vision
            </label>
            <textarea
              id="message"
              rows={5}
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring">
              Submit inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  </Layout>
);

export default ContactPage;

