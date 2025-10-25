import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { Address, OrderSummary } from '@/types';

const AccountPage = () => {
  const [profile, setProfile] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';
    fetch(`${baseUrl}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setProfile)
      .catch(() => setProfile(null));
    fetch(`${baseUrl}/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setOrders)
      .catch(() => setOrders([]));
    fetch(`${baseUrl}/users/me/addresses`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setAddresses)
      .catch(() => setAddresses([]));
  }, []);

  return (
    <Layout title="My Account — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Welcome</p>
          <h1 className="mt-3 text-4xl font-semibold text-midnight">Account Dashboard</h1>
          <p className="mt-2 text-midnight/70">
            Manage orders, addresses, and personal details. Keep your celebrations organized effortlessly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-4 py-12 lg:px-0">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg md:col-span-2">
            <h2 className="text-xl font-semibold text-midnight">Profile</h2>
            {profile ? (
              <dl className="mt-4 space-y-3 text-sm text-midnight/70">
                <div>
                  <dt className="uppercase text-xs font-semibold tracking-wide text-midnight/60">Name</dt>
                  <dd>{profile.firstName} {profile.lastName}</dd>
                </div>
                <div>
                  <dt className="uppercase text-xs font-semibold tracking-wide text-midnight/60">Email</dt>
                  <dd>{profile.email}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-4 text-sm text-midnight/60">Sign in to view your profile details.</p>
            )}
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-midnight">Saved Addresses</h2>
            <ul className="mt-4 space-y-3 text-sm text-midnight/70">
              {addresses.length === 0 && <li>No saved addresses yet.</li>}
              {addresses.map(address => (
                <li key={address.id} className="rounded-2xl bg-white/80 p-3">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-midnight">Order History</h2>
          <div className="mt-4 space-y-4">
            {orders.length === 0 && <p className="text-sm text-midnight/60">You have not placed any orders yet.</p>}
            {orders.map(order => (
              <div key={order.id} className="rounded-2xl border border-white/60 bg-white/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-midnight">Order #{order.id}</p>
                    <p className="text-midnight/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="rounded-full bg-sky/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-midnight">
                    {order.status}
                  </div>
                  <p className="text-sm font-semibold text-midnight">${order.total.toFixed(2)}</p>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-midnight/70">
                  {order.items.map(item => (
                    <li key={item.cakeId}>
                      {item.quantity} × {item.cakeName} ({item.selectedSize}) — ${item.totalPrice.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;

