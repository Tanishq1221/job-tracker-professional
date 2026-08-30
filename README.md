# Job Tracker

**Live Demo:** [https://job-tracker-professional-ezpi.vercel.app](https://job-tracker-professional-ezpl.vercel.app/)

A professional React job-application tracker based on the same project structure:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── JobCard.jsx
│   ├── Navbar.jsx
│   ├── Skills.jsx
│   └── StatCard.jsx
├── context/
│   └── JobContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── JobDetails.jsx
│   ├── Jobs.css
│   └── Jobs.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Features

- Dashboard statistics
- Add job application
- Edit job application
- Delete job application
- Job details page
- Search jobs
- Filter by status
- Application date
- Job type
- Location
- Job URL
- Notes
- React Context API
- localStorage persistence
- React Router navigation
- Responsive UI
- Loading and error state in context

## Run

```bash
npm install
npm run dev
```

Then open the localhost address shown by Vite.

## Important

This version intentionally uses localStorage for the application data instead of a broken external API URL. That makes the project reliable during development and testing.

The Context API is still structured so an API service can be added later without rewriting the pages.
