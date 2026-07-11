import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button/Button";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useGithubProfile } from "../../github/hooks/useGithubProfile";
import { useGithubRepos } from "../../github/hooks/useGithubRepos";
import { setGithubProfile, setRepos, goToNextStep, goToPreviousStep } from "../store/builderSlice";
import styles from "./BuilderStep.module.css";

function StepGithubImport() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.builder.personalInfo.githubUsername);

  const profileQuery = useGithubProfile(username);
  const reposQuery = useGithubRepos(username);

  const isLoading = profileQuery.isLoading || reposQuery.isLoading;
  const error = profileQuery.error || reposQuery.error;

  useEffect(() => {
    if (profileQuery.data) dispatch(setGithubProfile(profileQuery.data));
  }, [profileQuery.data, dispatch]);

  useEffect(() => {
    if (reposQuery.data) dispatch(setRepos(reposQuery.data));
  }, [reposQuery.data, dispatch]);

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>Importing your GitHub activity</h2>
      <p className={styles.subtitle}>Analyzing @{username} to find your best repositories.</p>

      {isLoading && <Spinner />}

      {error && <div className={styles.errorBanner}>{error.message}</div>}

      {profileQuery.data && (
        <div className={styles.profileCard}>
          <img src={profileQuery.data.avatarUrl} alt={profileQuery.data.name} onError={hideBrokenImage} />
          <div>
            <strong>{profileQuery.data.name}</strong>
            <p>{profileQuery.data.bio}</p>
            <span>{reposQuery.data?.length ?? 0} repositories found</span>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => dispatch(goToPreviousStep())}>
          Back
        </Button>
        <Button onClick={() => dispatch(goToNextStep())} disabled={isLoading || !!error}>
          Continue
        </Button>
      </div>
    </div>
  );
}

function hideBrokenImage(e) {
  e.target.style.display = "none";
}

export default StepGithubImport;
