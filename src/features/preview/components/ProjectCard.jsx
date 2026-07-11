import { getLanguageColor } from "../../../utils/helpers";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  return (
    <li className={styles.card}>
      <h3>{project.name.replace(/[-_]/g, " ")}</h3>
      <p>{project.description}</p>
      <div className={styles.meta}>
        <span className={styles.languageDot} style={{ backgroundColor: getLanguageColor(project.language) }} />
        <span>{project.language}</span>
        {project.stars != null && <span>⭐ {project.stars}</span>}
      </div>
      {project.htmlUrl && (
        <a href={project.htmlUrl} target="_blank" rel="noreferrer" className={styles.link}>
          View on GitHub →
        </a>
      )}
    </li>
  );
}

export default ProjectCard;
