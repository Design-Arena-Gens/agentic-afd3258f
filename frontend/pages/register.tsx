import Layout from '@/components/Layout';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/account';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Register — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl">
          <h1 className="text-3xl font-semibold text-midnight">Create your account</h1>
          <p className="mt-2 text-sm text-midnight/70">Track orders, save addresses, and customize future cake designs.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2 md:gap-3">
              <div>
                <label htmlFor="first-name" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="text-xs font-semibold uppercase tracking-wide text-midnight/60">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm focus-ring"
                />
              </div>
            </div>
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
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-midnight/60">
            Already have an account?{' '}
            <Link href="/login" className="text-midnight focus-ring">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;

