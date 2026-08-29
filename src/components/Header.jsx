export default function Header({ name, role, goal }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div>
          <p className="eyebrow">JOB TRACKER</p>
          <h1>{name}</h1>
          <p className="header-role">{role}</p>
        </div>

        <div className="career-goal">
          <span>CAREER GOAL</span>
          <strong>{goal}</strong>
        </div>
      </div>
    </header>
  );
}
