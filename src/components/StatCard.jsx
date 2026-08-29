export default function StatCard({ title, value, description }) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      {description && <small>{description}</small>}
    </article>
  );
}
