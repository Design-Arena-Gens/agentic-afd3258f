import Layout from '@/components/Layout';
import AdminMetricCard from '@/components/AdminMetricCard';
import { useEffect, useState } from 'react';
import { Cake } from '@/types';
import CakeCard from '@/components/CakeCard';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin access requires authentication.');
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';
    fetch(`${baseUrl}/admin/metrics`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setMetrics)
      .catch(() => setMetrics(null));
    fetch(`${baseUrl}/cakes`)
      .then(res => res.json())
      .then(setCakes)
      .catch(() => setCakes([]));
  }, []);

  return (
    <Layout title="Admin Dashboard — Velvet Whisk">
      <section className="gradient-bg py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/60">Admin Panel</p>
          <h1 className="mt-3 text-4xl font-semibold text-midnight">Operational Overview</h1>
          <p className="mt-2 text-midnight/70">
            Manage inventory, track orders, and monitor sales performance in real time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        {error && <p className="rounded-3xl border border-white/60 bg-white/80 p-4 text-sm text-red-500">{error}</p>}
        {metrics && (
          <div className="grid gap-6 md:grid-cols-3">
            <AdminMetricCard label="Total Revenue" value={`$${Number(metrics.totalRevenue ?? 0).toFixed(2)}`} hint="All-time gross sales" />
            <AdminMetricCard label="Open Orders" value={metrics.openOrders?.toString() ?? '0'} hint="Pending & processing" />
            <AdminMetricCard label="Statuses Tracked" value={Object.keys(metrics.ordersByStatus ?? {}).length.toString()} hint="Order statuses" />
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-white/60 bg-white/90 p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-midnight">Inventory</h2>
              <p className="text-sm text-midnight/70">Add, edit, or remove cakes to keep the store current.</p>
            </div>
            <button className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white focus-ring">Add Cake</button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cakes.map(cake => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;

