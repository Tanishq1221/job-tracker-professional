import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../context/JobContext";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { jobs } = useContext(JobContext);

  const stats = useMemo(() => {
    const applied = jobs.filter((job) => job.status === "Applied").length;
    const interviews = jobs.filter((job) => job.status === "Interview").length;
    const rejected = jobs.filter((job) => job.status === "Rejected").length;
    const selected = jobs.filter((job) => job.status === "Selected").length;

    return { applied, interviews, rejected, selected };
  }, [jobs]);

  const selectionRate = jobs.length
    ? Math.round((stats.selected / jobs.length) * 100)
    : 0;

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>Job Dashboard</h2>
          <p>Track your job applications and career progress.</p>
        </div>

        <Link className="button primary" to="/jobs">
          Manage Jobs
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Jobs" value={jobs.length} description="All applications" />
        <StatCard title="Applied" value={stats.applied} description="Waiting for response" />
        <StatCard title="Interview" value={stats.interviews} description="Interview stage" />
        <StatCard title="Rejected" value={stats.rejected} description="Not selected" />
        <StatCard title="Selected" value={stats.selected} description="Successful applications" />
      </div>

      <div className="overview-panel">
        <div>
          <p className="eyebrow">SUCCESS RATE</p>
          <h3>{selectionRate}%</h3>
          <p>Your current selection rate across tracked applications.</p>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{ width: `${selectionRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
