import { useContext, useMemo, useState } from "react";
import { JobContext } from "../context/JobContext";
import JobCard from "../components/JobCard";
import "./Jobs.css";

const emptyForm = {
  company: "",
  position: "",
  status: "",
  applicationDate: "",
  jobType: "Full-time",
  location: "",
  jobUrl: "",
  notes: ""
};

export default function Jobs() {
  const {
    jobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    clearError
  } = useContext(JobContext);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesFilter =
        filter === "All" || job.status === filter;

      const matchesSearch =
        !query ||
        job.company.toLowerCase().includes(query) ||
        job.position.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [jobs, filter, search]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function startEdit(job) {
    setEditingId(job.id);
    setForm({
      company: job.company || "",
      position: job.position || "",
      status: job.status || "",
      applicationDate: job.applicationDate || "",
      jobType: job.jobType || "Full-time",
      location: job.location || "",
      jobUrl: job.jobUrl || "",
      notes: job.notes || ""
    });

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    clearError();
  }

  function validate() {
    if (!form.company.trim() || !form.position.trim() || !form.status) {
      alert("Please fill Company, Position and Status.");
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    if (editingId) {
      updateJob(editingId, form);
    } else {
      addJob(form);
    }

    resetForm();
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">APPLICATIONS</p>
          <h2>Track Your Job Applications</h2>
          <p>Add, edit, search and manage every application.</p>
        </div>

        <span className="jobs-count">{jobs.length} applications</span>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError}>×</button>
        </div>
      )}

      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search company, position or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="All">All statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs found</h3>
            <p>Try another search or add a new application below.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={deleteJob}
              onEdit={startEdit}
            />
          ))
        )}
      </div>

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <p className="eyebrow">{editingId ? "EDIT" : "NEW APPLICATION"}</p>
            <h3>{editingId ? "Edit Job Application" : "Add New Job"}</h3>
          </div>

          {editingId && (
            <button type="button" className="button secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        <div className="form-grid">
          <label>
            Company *
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Google"
            />
          </label>

          <label>
            Position *
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="React Developer"
            />
          </label>

          <label>
            Status *
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </label>

          <label>
            Application Date
            <input
              type="date"
              name="applicationDate"
              value={form.applicationDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Job Type
            <select name="jobType" value={form.jobType} onChange={handleChange}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </label>

          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Remote / Bangalore"
            />
          </label>

          <label className="full-width">
            Job URL
            <input
              type="url"
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <label className="full-width">
            Notes
            <textarea
              name="notes"
              rows="4"
              value={form.notes}
              onChange={handleChange}
              placeholder="Interview preparation, recruiter notes, next steps..."
            />
          </label>
        </div>

        <button className="button primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Application" : "Add Application"}
        </button>
      </form>
    </section>
  );
}
