import Link from 'next/link';

const Footer = () => (
  <footer className="border-t border-white/30 bg-white/60">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm md:grid-cols-4 lg:px-8">
      <div>
        <h3 className="font-semibold uppercase tracking-wide text-midnight/80">Velvet Whisk</h3>
        <p className="mt-3 text-midnight/70">
          Handcrafted cakes baked daily in our studio kitchen. We believe celebrations deserve artistry and flavor.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-midnight">Visit</h4>
        <ul className="mt-3 space-y-1 text-midnight/70">
          <li>123 Patisserie Lane</li>
          <li>San Francisco, CA</li>
          <li>Mon - Sat, 9am — 6pm</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-midnight">Support</h4>
        <ul className="mt-3 space-y-2 text-midnight/70">
          <li>
            <Link href="/faq" className="hover:text-midnight focus-ring">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/shipping" className="hover:text-midnight focus-ring">
              Shipping & Delivery
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-midnight focus-ring">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-midnight">Newsletter</h4>
        <form className="mt-4 flex gap-2" aria-label="Join our newsletter">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/60 bg-white/90 px-3 py-2 text-sm focus-ring"
          />
          <button type="submit" className="rounded-lg bg-midnight px-4 py-2 text-sm font-semibold text-white focus-ring">
            Join
          </button>
        </form>
      </div>
    </div>
    <div className="border-t border-white/40 bg-white/50 py-6">
      <p className="text-center text-xs text-midnight/60">© {new Date().getFullYear()} Velvet Whisk Cake Studio</p>
    </div>
  </footer>
);

export default Footer;

