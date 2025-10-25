import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/cart-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Cakes' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/40 bg-cream/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Velvet Whisk
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide hover:text-midnight/70 transition focus-ring"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm font-semibold hover:text-midnight/70 focus-ring">
            Account
          </Link>
          <Link href="/cart" className="relative focus-ring">
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-midnight px-2 py-0.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
            <span className="sr-only">View cart</span>
          </Link>
        </div>

        <button
          className="md:hidden focus-ring"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(prev => !prev)}
        >
          {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/40 bg-cream px-4 pb-6">
          <div className="flex flex-col gap-4 py-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium hover:text-midnight/70 focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-base font-semibold focus-ring" onClick={() => setMobileOpen(false)}>
              Account
            </Link>
            <Link href="/cart" className="relative focus-ring" onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Cart ({cartCount})</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

