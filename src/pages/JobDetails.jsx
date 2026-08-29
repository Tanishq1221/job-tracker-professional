import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { JobContext } from "../context/JobContext";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, deleteJob } = useContext(JobContext);

  const job = jobs.find((item) => String(item.id) === String(id));

  if (!job) {
    return (
      <section className="empty-state">
        <h2>Job not found</h2>
        <p>This application may have been deleted.</p>
        <Link className="button primary" to="/jobs">
          Back to Jobs
        </Link>
      </section>
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(`Delete ${job.company}?`);

    if (confirmed) {
      deleteJob(job.id);
      navigate("/jobs");
    }
  }

  return (
    <section className="page-section">
      <Link className="back-link" to="/jobs">← Back to Jobs</Link>

      <div className="details-card">
        <div className="details-header">
          <div className="company-logo large">
            {job.company.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="eyebrow">APPLICATION DETAILS</p>
            <h2>{job.company}</h2>
            <p className="job-position">{job.position}</p>
          </div>

          <span className={`status-badge ${job.status.toLowerCase()}`}>
            {job.status}
          </span>
        </div>

        <div className="details-grid">
          <div>
            <span>Location</span>
            <strong>{job.location || "Remote"}</strong>
          </div>
          <div>
            <span>Job Type</span>
            <strong>{job.jobType || "Full-time"}</strong>
          </div>
          <div>
            <span>Application Date</span>
            <strong>{job.applicationDate || "Not added"}</strong>
          </div>
          <div>
            <span>Job URL</span>
            {job.jobUrl ? (
              <a href={job.jobUrl} target="_blank" rel="noreferrer">
                Open job
              </a>
            ) : (
              <strong>Not added</strong>
            )}
          </div>
        </div>

        <div className="notes-box">
          <span>Notes</span>
          <p>{job.notes || "No notes added."}</p>
        </div>

        <div className="details-actions">
          <Link className="button secondary" to="/jobs">
            Back
          </Link>
          <button className="button danger" onClick={handleDelete}>
            Delete Application
          </button>
        </div>
      </div>
    </section>
  );
}
