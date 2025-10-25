import Layout from '@/components/Layout';
import { FormEvent, useState } from 'react';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api'}/users/password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      const token = await response.text();
      setMessage(`Password reset token: ${token}`);
    } else {
      setMessage('Unable to process reset request.');
    }
  };

  return (
    <Layout title="Reset Password — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl">
          <h1 className="text-3xl font-semibold text-midnight">Reset your password</h1>
          <p className="mt-2 text-sm text-midnight/70">
            We will email a secure link to reset your password. For demo purposes, the token is displayed after submission.
          </p>
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
            <button type="submit" className="w-full rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring">
              Send reset link
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-midnight/70">{message}</p>}
        </div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;

