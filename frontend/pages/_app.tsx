import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { CartProvider } from '@/context/cart-context';
import '../styles/globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans'
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className={openSans.variable}>
        <Component {...pageProps} />
      </div>
    </CartProvider>
  );
}
