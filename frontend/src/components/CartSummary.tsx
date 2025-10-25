import Link from 'next/link';
import { useCart } from '@/context/cart-context';

const CartSummary = () => {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-white/60 bg-white/80 p-8 text-center">
        <p className="text-lg font-semibold text-midnight">Your cart is a blank canvas.</p>
        <p className="mt-2 text-sm text-midnight/70">Add a cake to begin your celebration.</p>
        <Link href="/catalog" className="mt-6 inline-block rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring">
          Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {items.map(item => (
          <li key={`${item.cake.id}-${item.size}-${item.frostingOption}`} className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-midnight">{item.cake.name}</h3>
                <p className="text-sm text-midnight/60">
                  {item.size} • {item.frostingOption}
                </p>
                {item.customMessage && <p className="mt-1 text-xs text-midnight/60">Message: {item.customMessage}</p>}
              </div>
              <div className="flex items-center gap-3">
                <label className="sr-only" htmlFor={`quantity-${item.cake.id}`}>
                  Quantity
                </label>
                <input
                  id={`quantity-${item.cake.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={event => updateQuantity(item.cake.id, Number(event.target.value))}
                  className="w-16 rounded-xl border border-white/60 bg-white px-3 py-2 text-sm focus-ring"
                />
                <p className="text-sm font-semibold text-midnight">${(item.quantity * item.cake.price).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.cake.id)}
                  className="rounded-xl border border-midnight/10 px-3 py-2 text-xs font-semibold text-midnight/70 focus-ring"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold uppercase tracking-wide text-midnight/60">Subtotal</span>
          <span className="text-lg font-semibold text-midnight">${subtotal.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-midnight/60">Shipping calculated at checkout. Orders ship within 48 hours.</p>
        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;

