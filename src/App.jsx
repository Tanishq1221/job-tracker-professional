import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Skills from "./components/Skills";
import { JobProvider } from "./context/JobContext";

export default function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Header
          name="Tanishq"
          role="React Developer"
          goal="Become a professional React Native Developer"
        />

        <Navbar />

        <main className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </JobProvider>
  );
}
