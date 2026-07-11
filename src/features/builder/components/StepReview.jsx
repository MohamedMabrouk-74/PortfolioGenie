import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button/Button";
import { goToPreviousStep } from "../store/builderSlice";
import styles from "./BuilderStep.module.css";

function StepReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { personalInfo, selectedProjects, tone } = useSelector((state) => state.builder);

  function handlePublish() {
    navigate("/preview");
  }

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>Review your portfolio</h2>
      <p className={styles.subtitle}>Everything looks good? Publish to see the live preview.</p>

      <ul className={styles.summaryList}>
        <li>
          <strong>Name:</strong> {personalInfo.fullName}
        </li>
        <li>
          <strong>Role:</strong> {personalInfo.role}
        </li>
        <li>
          <strong>Projects selected:</strong> {selectedProjects.length}
        </li>
        <li>
          <strong>Tone:</strong> {tone}
        </li>
      </ul>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => dispatch(goToPreviousStep())}>
          Back
        </Button>
        <Button onClick={handlePublish}>Publish portfolio</Button>
      </div>
    </div>
  );
}

export default StepReview;
