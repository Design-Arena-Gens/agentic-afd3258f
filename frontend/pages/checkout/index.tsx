import { useState } from 'react';
import Layout from '@/components/Layout';
import StepIndicator from '@/components/StepIndicator';
import { useCart } from '@/context/cart-context';
import { Address } from '@/types';
import { createPaymentIntent } from '@/lib/api';

const steps = ['Details', 'Shipping', 'Payment', 'Review'];

const defaultAddress: Address = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  defaultAddress: true
};

const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState<Address>(defaultAddress);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentSecret, setPaymentSecret] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleNext = async () => {
    if (currentStep === 2) {
      try {
        setProcessing(true);
        const intent = await createPaymentIntent({
          customerName: name,
          email,
          shippingAddress: address,
          items: items.map(item => ({
            cakeId: item.cake.id,
            quantity: item.quantity,
            selectedSize: item.size,
            frostingOption: item.frostingOption,
            customMessage: item.customMessage
          }))
        });
        setPaymentSecret(intent.clientSecret);
      } catch (error) {
        console.error('Payment intent failed', error);
      } finally {
        setProcessing(false);
      }
    }
    if (currentStep === steps.length - 1) {
      setConfirmation('Thank you! Your cake order is confirmed. We will follow up shortly.');
      clear();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <Layout title="Checkout — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Secure Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-midnight">Let’s finish your celebration</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-0">
        <div className="space-y-8">
          {currentStep === 0 && (
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8">
              <h2 className="text-xl font-semibold text-midnight">Contact Details</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8">
              <h2 className="text-xl font-semibold text-midnight">Shipping Address</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="line1" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Street Address
                  </label>
                  <input
                    id="line1"
                    type="text"
                    value={address.line1}
                    onChange={event => setAddress(prev => ({ ...prev, line1: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="line2" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Apt, Suite (optional)
                  </label>
                  <input
                    id="line2"
                    type="text"
                    value={address.line2 ?? ''}
                    onChange={event => setAddress(prev => ({ ...prev, line2: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={address.city}
                    onChange={event => setAddress(prev => ({ ...prev, city: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={address.state}
                    onChange={event => setAddress(prev => ({ ...prev, state: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="postal" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Postal Code
                  </label>
                  <input
                    id="postal"
                    type="text"
                    value={address.postalCode}
                    onChange={event => setAddress(prev => ({ ...prev, postalCode: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={address.country}
                    onChange={event => setAddress(prev => ({ ...prev, country: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8">
              <h2 className="text-xl font-semibold text-midnight">Payment</h2>
              <p className="mt-4 text-sm text-midnight/70">
                We use Stripe to securely process your payment. Enter your card details at the hosted checkout after reviewing your order.
              </p>
              {processing ? (
                <p className="mt-4 text-sm text-midnight/60">Preparing payment...</p>
              ) : paymentSecret ? (
                <p className="mt-4 text-sm text-midnight/60">
                  Payment intent ready. Complete payment to finalize your order. (Demo placeholder — integrate Stripe Elements for live flows.)
                </p>
              ) : (
                <p className="mt-4 text-sm text-midnight/60">Click Continue to generate a payment intent.</p>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="rounded-3xl border border-white/60 bg-white/90 p-8">
              <h2 className="text-xl font-semibold text-midnight">Review Order</h2>
              <ul className="mt-6 space-y-4 text-sm text-midnight/70">
                {items.map(item => (
                  <li key={item.cake.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold text-midnight">{item.cake.name}</p>
                      <p className="text-xs">
                        {item.size} • {item.frostingOption} {item.customMessage && `• "${item.customMessage}"`}
                      </p>
                    </div>
                    <p className="font-semibold text-midnight">${(item.cake.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-white/60 pt-4 text-sm font-semibold text-midnight">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-xs text-midnight/60">Estimated delivery within 5 days of payment confirmation.</p>
            </div>
          )}

          {confirmation && (
            <div className="rounded-3xl border border-white/60 bg-sky/20 p-6 text-midnight/80">{confirmation}</div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="rounded-full border border-midnight/20 px-5 py-2 text-sm font-semibold text-midnight/70 focus-ring disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
            >
              {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;

