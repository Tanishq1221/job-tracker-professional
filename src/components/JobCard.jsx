import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete, onEdit }) {
  const statusClass = job.status.toLowerCase();

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete the application for ${job.company}?`
    );

    if (confirmed) {
      onDelete(job.id);
    }
  }

  return (
    <article className="job-card">
      <div className="job-card-main">
        <div className="company-logo">
          {job.company.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{job.company}</h3>
          <p className="job-position">{job.position}</p>

          <div className="job-meta">
            <span>{job.location || "Remote"}</span>
            <span>{job.jobType || "Full-time"}</span>
            {job.applicationDate && (
              <span>Applied {job.applicationDate}</span>
            )}
          </div>
        </div>
      </div>

      <div className="job-card-side">
        <span className={`status-badge ${statusClass}`}>
          {job.status}
        </span>

        <div className="job-actions">
          <Link className="button secondary small" to={`/jobs/${job.id}`}>
            View
          </Link>
          <button className="button secondary small" onClick={() => onEdit(job)}>
            Edit
          </button>
          <button className="button danger small" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
