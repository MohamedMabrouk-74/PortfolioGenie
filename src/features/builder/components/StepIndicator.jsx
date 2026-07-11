import styles from "./StepIndicator.module.css";

const STEP_LABELS = ["Personal Info", "Import GitHub", "Projects", "About Me", "Review & Publish"];

function StepIndicator({ currentStep }) {
  return (
    <ol className={styles.list}>
      {STEP_LABELS.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <li key={label} className={`${styles.item} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}>
            <span className={styles.badge}>{isCompleted ? "✓" : index + 1}</span>
            <span className={styles.label}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default StepIndicator;
