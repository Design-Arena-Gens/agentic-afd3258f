import Layout from '@/components/Layout';
import CartSummary from '@/components/CartSummary';

const CartPage = () => (
  <Layout title="Your Cart — Velvet Whisk">
    <section className="gradient-bg py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Your Selection</p>
        <h1 className="mt-2 text-4xl font-semibold text-midnight">Shopping Cart</h1>
        <p className="mt-4 max-w-2xl text-midnight/70">
          Review your cakes, adjust servings, and add a message. Checkout when you are ready to schedule delivery.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <CartSummary />
    </section>
  </Layout>
);

export default CartPage;

