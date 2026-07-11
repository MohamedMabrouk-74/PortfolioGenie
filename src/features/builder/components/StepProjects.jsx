import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button/Button";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useOptimizeDescription } from "../../ai/hooks/useOptimizeDescription";
import { toggleProjectSelection, updateProjectDescription, goToNextStep, goToPreviousStep } from "../store/builderSlice";
import { getLanguageColor, truncateText } from "../../../utils/helpers";
import styles from "./StepProjects.module.css";
import stepStyles from "./BuilderStep.module.css";

function StepProjects() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.builder.repos);
  const selectedProjects = useSelector((state) => state.builder.selectedProjects);
  const [optimizingId, setOptimizingId] = useState(null);
  const optimizeMutation = useOptimizeDescription();

  function isSelected(project) {
    return selectedProjects.some((p) => p.id === project.id);
  }

  function handleOptimize(project) {
    setOptimizingId(project.id);
    optimizeMutation.mutate(project, {
      onSuccess: (data) => {
        if (!isSelected(project)) dispatch(toggleProjectSelection(project));
        dispatch(updateProjectDescription({ projectId: project.id, description: data.description }));
      },
      onSettled: () => setOptimizingId(null),
    });
  }

  return (
    <div className={stepStyles.step}>
      <h2 className={stepStyles.title}>Select your best projects</h2>
      <p className={stepStyles.subtitle}>
        Choose which repositories to showcase, then let AI polish each description.
      </p>

      <ul className={styles.grid}>
        {repos.map((project) => (
          <li key={project.id} className={`${styles.card} ${isSelected(project) ? styles.selected : ""}`}>
            <div className={styles.cardHeader}>
              <h3>{project.name}</h3>
              <span className={styles.languageDot} style={{ backgroundColor: getLanguageColor(project.language) }} />
              <span>{project.language}</span>
            </div>

            <p className={styles.description}>
              {truncateText(selectedProjects.find((p) => p.id === project.id)?.description || project.description)}
            </p>

            <div className={styles.cardFooter}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={isSelected(project)} onChange={() => dispatch(toggleProjectSelection(project))} />
                Include in portfolio
              </label>

              <button
                type="button"
                className={styles.optimizeButton}
                onClick={() => handleOptimize(project)}
                disabled={optimizingId === project.id}
              >
                {optimizingId === project.id ? <Spinner size="sm" /> : "✨ Optimize with AI"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={stepStyles.actions}>
        <Button variant="secondary" onClick={() => dispatch(goToPreviousStep())}>
          Back
        </Button>
        <Button onClick={() => dispatch(goToNextStep())} disabled={selectedProjects.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default StepProjects;
