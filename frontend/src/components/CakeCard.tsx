import Image from 'next/image';
import Link from 'next/link';
import { Cake } from '@/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/context/cart-context';

type CakeCardProps = {
  cake: Cake;
  variant?: 'grid' | 'related';
};

const CakeCard = ({ cake, variant = 'grid' }: CakeCardProps) => {
  const { addToCart } = useCart();
  const image = cake.images.find(img => img.primaryImage) ?? cake.images[0];

  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border border-white/50 bg-white/80 p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${
        variant === 'related' ? 'md:flex-row md:items-center md:gap-6' : ''
      }`}
    >
      {image && (
        <Link href={`/cakes/${cake.id}`} className="relative h-56 w-full overflow-hidden rounded-2xl focus-ring md:h-48 md:w-48">
          <Image
            src={image.url}
            alt={`${cake.name} cake`}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="mt-4 flex flex-1 flex-col gap-4 md:mt-0">
        <div>
          <Link href={`/cakes/${cake.id}`} className="focus-ring">
            <h3 className="text-xl font-semibold text-midnight">{cake.name}</h3>
          </Link>
          <p className="mt-2 text-sm text-midnight/70 line-clamp-2">{cake.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-midnight">${cake.price.toFixed(2)}</p>
            <div className="mt-1 flex items-center gap-1 text-sm text-midnight/60">
              <StarIcon className="h-4 w-4 text-blush" aria-hidden="true" />
              <span>{cake.averageRating.toFixed(1)} / 5</span>
            </div>
          </div>
          <button
            onClick={() =>
              addToCart({
                cake,
                quantity: 1,
                frostingOption: cake.frostingOptions[0],
                size: cake.sizes[0],
                customMessage: ''
              })
            }
            className="rounded-full bg-midnight px-4 py-2 text-sm font-semibold text-white transition hover:bg-midnight/90 focus-ring"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default CakeCard;

