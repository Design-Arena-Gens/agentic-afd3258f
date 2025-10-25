import Layout from '@/components/Layout';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/account';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Login — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl">
          <h1 className="text-3xl font-semibold text-midnight">Welcome back</h1>
          <p className="mt-2 text-sm text-midnight/70">Sign in to view your orders, saved addresses, and preferences.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 flex justify-between text-xs font-semibold uppercase tracking-wide text-midnight/60">
            <Link href="/register" className="focus-ring">
              Create account
            </Link>
            <Link href="/reset-password" className="focus-ring">
              Forgot password?
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;

