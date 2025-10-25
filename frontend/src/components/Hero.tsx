import Image from 'next/image';
import Link from 'next/link';

const Hero = () => (
  <section className="gradient-bg relative overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="Assorted cakes on display"
        fill
        priority
        className="object-cover"
      />
    </div>
    <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center md:gap-16 lg:px-8">
      <div className="max-w-xl rounded-3xl bg-white/85 p-8 shadow-lg backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Velvet Whisk Cake Studio</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-midnight sm:text-5xl">
          Elevate celebrations with bespoke cakes crafted to delight every sense.
        </h1>
        <p className="mt-4 text-lg text-midnight/80">
          From intimate birthdays to grand weddings, our pastry artists compose layers of flavor, texture, and beauty.
          Custom flavors, dietary-friendly options, and hand-painted finishes ensure each cake is uniquely yours.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/catalog"
            className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-midnight/20 transition hover:-translate-y-0.5 focus-ring"
          >
            Browse Cakes
          </Link>
          <Link
            href="/consultation"
            className="rounded-full border border-midnight/20 bg-white/70 px-6 py-3 text-sm font-semibold text-midnight transition hover:border-midnight/40 focus-ring"
          >
            Design Consultation
          </Link>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        {[
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
          'https://images.unsplash.com/photo-1614707267537-32297a66f55f',
          'https://images.unsplash.com/photo-1549572189-0ba19be3b530',
          'https://images.unsplash.com/photo-1599785209707-a456fc1337db'
        ].map((src, idx) => (
          <div
            className="group relative h-44 overflow-hidden rounded-3xl shadow-lg transition hover:shadow-2xl md:h-56"
            key={src}
          >
            <Image
              src={src}
              alt={`Decorated cake ${idx + 1}`}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;

