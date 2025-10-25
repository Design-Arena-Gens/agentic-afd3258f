import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { fetchCake, fetchCakes } from '@/lib/api';
import { Cake } from '@/types';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useMemo, useState } from 'react';
import CakeCard from '@/components/CakeCard';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type CakeDetailPageProps = {
  cake: Cake;
  related: Cake[];
};

const CakeDetailPage = ({ cake, related }: CakeDetailPageProps) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(cake.images[0]);
  const [selectedSize, setSelectedSize] = useState(cake.sizes[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(cake.frostingOptions[0]);
  const [customMessage, setCustomMessage] = useState('');

  const reviewsAverage = useMemo(() => cake.averageRating.toFixed(1), [cake.averageRating]);

  return (
    <Layout title={`${cake.name} — Velvet Whisk`}>
      <div className="bg-gradient-to-b from-white via-white to-cream">
        <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
          <Link href="/catalog" className="text-sm font-semibold text-midnight/60 hover:text-midnight focus-ring">
            ← Back to catalog
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/60 bg-white shadow-lg">
                <Image src={selectedImage.url} alt={cake.name} fill className="object-cover" priority />
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto">
                {cake.images.map(image => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border ${
                      selectedImage.id === image.id ? 'border-midnight' : 'border-white/60'
                    } focus-ring`}
                    aria-label={`View ${cake.name} image`}
                  >
                    <Image src={image.url} alt={`${cake.name} angle`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-midnight/60">{cake.occasion}</p>
              <h1 className="mt-2 text-4xl font-semibold text-midnight">{cake.name}</h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-midnight/60">
                <StarIcon className="h-5 w-5 text-blush" />
                <span>{reviewsAverage} rated</span>
                <span aria-hidden="true">•</span>
                <span>{cake.reviews.length} reviews</span>
              </div>
              <p className="mt-6 text-lg text-midnight/80">{cake.description}</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-midnight/60">Size</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cake.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold focus-ring ${
                          selectedSize === size ? 'border-midnight bg-midnight text-white' : 'border-white/60 bg-white'
                        }`}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-midnight/60">Frosting</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cake.frostingOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedFrosting(option)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold focus-ring ${
                          selectedFrosting === option ? 'border-midnight bg-midnight text-white' : 'border-white/60 bg-white'
                        }`}
                        aria-pressed={selectedFrosting === option}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="custom-message" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Custom message
                  </label>
                  <input
                    id="custom-message"
                    type="text"
                    value={customMessage}
                    onChange={event => setCustomMessage(event.target.value)}
                    placeholder="Happy Birthday, Luna!"
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                  <p className="mt-1 text-xs text-midnight/50">Lettering available up to 40 characters.</p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-2xl font-semibold text-midnight">${cake.price.toFixed(2)}</p>
                <button
                  onClick={() =>
                    addToCart({
                      cake,
                      quantity: 1,
                      size: selectedSize,
                      frostingOption: selectedFrosting,
                      customMessage
                    })
                  }
                  className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-sky/20 p-4 text-sm text-midnight/70">
                <p>Made to order with organic butter, local eggs, and real vanilla bean. Vegan and gluten-free options available on request.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
          <h2 className="text-2xl font-semibold text-midnight">Customer Reviews</h2>
          {cake.reviews.length === 0 ? (
            <p className="mt-4 rounded-3xl border border-white/60 bg-white/80 p-6 text-midnight/70">
              Be the first to share your experience with {cake.name}.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {cake.reviews.map(review => (
                <li key={review.id} className="rounded-3xl border border-white/60 bg-white/80 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-midnight">{review.reviewer}</p>
                    <span className="flex items-center gap-1 text-sm text-midnight/60">
                      <StarIcon className="h-4 w-4 text-blush" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-midnight/70">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
            <h2 className="text-2xl font-semibold text-midnight">You may also love</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map(item => (
                <CakeCard key={item.id} cake={item} variant="related" />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const cake = await fetchCake(id);
  const allCakes = await fetchCakes({});
  const related = allCakes.filter(item => item.id !== cake.id && item.flavor === cake.flavor).slice(0, 3);
  return {
    props: {
      cake,
      related
    }
  };
};

export default CakeDetailPage;

