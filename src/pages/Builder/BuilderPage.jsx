import { useSelector } from "react-redux";
import StepIndicator from "../../features/builder/components/StepIndicator";
import StepPersonalInfo from "../../features/builder/components/StepPersonalInfo";
import StepGithubImport from "../../features/builder/components/StepGithubImport";
import StepProjects from "../../features/builder/components/StepProjects";
import StepAboutMe from "../../features/builder/components/StepAboutMe";
import StepReview from "../../features/builder/components/StepReview";

const STEP_COMPONENTS = [StepPersonalInfo, StepGithubImport, StepProjects, StepAboutMe, StepReview];

function BuilderPage() {
  const currentStep = useSelector((state) => state.builder.currentStep);
  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div>
      <StepIndicator currentStep={currentStep} />
      <CurrentStepComponent />
    </div>
  );
}

export default BuilderPage;
