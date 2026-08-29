import { createContext, useEffect, useMemo, useState } from "react";

export const JobContext = createContext();

const STORAGE_KEY = "job-tracker-jobs";

const initialJobs = [
  {
    id: "demo-1",
    company: "Google",
    position: "React Developer",
    status: "Applied",
    applicationDate: "2026-08-20",
    jobType: "Full-time",
    location: "Bangalore",
    jobUrl: "https://careers.google.com/",
    notes: "Prepare React and JavaScript interview topics."
  },
  {
    id: "demo-2",
    company: "TCS",
    position: "Frontend Developer",
    status: "Interview",
    applicationDate: "2026-08-22",
    jobType: "Full-time",
    location: "Remote",
    jobUrl: "",
    notes: "Revise React Router, hooks and API handling."
  }
];

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem(STORAGE_KEY);
      return savedJobs ? JSON.parse(savedJobs) : initialJobs;
    } catch {
      return initialJobs;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  function clearError() {
    setError("");
  }

  function addJob(jobData) {
    setLoading(true);
    clearError();

    try {
      const newJob = {
        id: crypto.randomUUID(),
        company: jobData.company.trim(),
        position: jobData.position.trim(),
        status: jobData.status,
        applicationDate: jobData.applicationDate || "",
        jobType: jobData.jobType || "Full-time",
        location: jobData.location?.trim() || "Remote",
        jobUrl: jobData.jobUrl?.trim() || "",
        notes: jobData.notes?.trim() || ""
      };

      setJobs((previousJobs) => [newJob, ...previousJobs]);
      return newJob;
    } catch (err) {
      setError("Unable to add the job.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function updateJob(id, jobData) {
    setLoading(true);
    clearError();

    try {
      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job.id === id
            ? {
                ...job,
                company: jobData.company.trim(),
                position: jobData.position.trim(),
                status: jobData.status,
                applicationDate: jobData.applicationDate || "",
                jobType: jobData.jobType || "Full-time",
                location: jobData.location?.trim() || "Remote",
                jobUrl: jobData.jobUrl?.trim() || "",
                notes: jobData.notes?.trim() || ""
              }
            : job
        )
      );
    } catch (err) {
      setError("Unable to update the job.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function deleteJob(id) {
    setLoading(true);
    clearError();

    try {
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );
    } catch (err) {
      setError("Unable to delete the job.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function resetJobs() {
    setJobs(initialJobs);
    clearError();
  }

  const value = useMemo(
    () => ({
      jobs,
      setJobs,
      loading,
      error,
      clearError,
      addJob,
      updateJob,
      deleteJob,
      resetJobs
    }),
    [jobs, loading, error]
  );

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}
