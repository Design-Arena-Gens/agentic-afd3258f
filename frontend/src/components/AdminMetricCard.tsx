type AdminMetricCardProps = {
  label: string;
  value: string;
  hint?: string;
};

const AdminMetricCard = ({ label, value, hint }: AdminMetricCardProps) => (
  <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg">
    <p className="text-xs font-semibold uppercase tracking-wide text-midnight/60">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-midnight">{value}</p>
    {hint && <p className="mt-1 text-xs text-midnight/60">{hint}</p>}
  </div>
);

export default AdminMetricCard;

