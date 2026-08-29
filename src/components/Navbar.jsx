import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Skills
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Jobs
        </NavLink>
      </div>
    </nav>
  );
}
