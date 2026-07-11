import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import styles from "./PortfolioPreview.module.css";

function PortfolioPreview() {
  const { personalInfo, aboutMe, selectedProjects, githubProfile } = useSelector((state) => state.builder);

  return (
    <div className={styles.preview}>
      <section className={styles.hero}>
        {githubProfile?.avatarUrl && (
          <img src={githubProfile.avatarUrl} alt={personalInfo.fullName} className={styles.avatar} />
        )}
        <div>
          <h1>{personalInfo.fullName || "Your Name"}</h1>
          <p className={styles.role}>{personalInfo.role || "Your Role"}</p>
          <a href={`mailto:${personalInfo.email}`} className={styles.email}>
            {personalInfo.email}
          </a>
        </div>
      </section>

      {aboutMe && (
        <section className={styles.about}>
          <h2>About Me</h2>
          <p>{aboutMe}</p>
        </section>
      )}

      <section className={styles.projects}>
        <h2>Projects</h2>
        {selectedProjects.length === 0 ? (
          <p className={styles.empty}>No projects selected yet.</p>
        ) : (
          <ul className={styles.grid}>
            {selectedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default PortfolioPreview;
