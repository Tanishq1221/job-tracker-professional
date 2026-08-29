const skills = [
  { name: "HTML", level: "Strong" },
  { name: "CSS", level: "Strong" },
  { name: "JavaScript", level: "Learning" },
  { name: "React JS", level: "Learning" },
  { name: "React Native", level: "Goal" }
];

export default function Skills() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DEVELOPMENT</p>
          <h2>Skills</h2>
          <p>Track the technologies you are learning for your career goal.</p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <div className="skill-icon">{skill.name.charAt(0)}</div>
            <div>
              <h3>{skill.name}</h3>
              <span>{skill.level}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
