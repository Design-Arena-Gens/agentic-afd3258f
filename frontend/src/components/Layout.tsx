import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const Layout = ({ title = 'Velvet Whisk Cake Studio', description, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;

