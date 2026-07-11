import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button/Button";
import TextArea from "../../../components/ui/TextArea/TextArea";
import Select from "../../../components/ui/Select/Select";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useGenerateAboutMe } from "../../ai/hooks/useGenerateAboutMe";
import { setAboutMe, setTone, goToNextStep, goToPreviousStep } from "../store/builderSlice";
import { TONE_OPTIONS } from "../../../utils/constants";
import styles from "./BuilderStep.module.css";

function StepAboutMe() {
  const dispatch = useDispatch();
  const { personalInfo, selectedProjects, aboutMe, tone } = useSelector((state) => state.builder);
  const generateMutation = useGenerateAboutMe();

  const { control, register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { aboutMe, tone },
  });

  const watchedAboutMe = watch("aboutMe");

  function handleGenerate() {
    const topLanguages = [...new Set(selectedProjects.map((p) => p.language).filter(Boolean))];

    generateMutation.mutate(
      { name: personalInfo.fullName, techStack: topLanguages, tone: watch("tone") },
      {
        onSuccess: (data) => setValue("aboutMe", data.text, { shouldValidate: true }),
      }
    );
  }

  function onSubmit(data) {
    dispatch(setAboutMe(data.aboutMe));
    dispatch(setTone(data.tone));
    dispatch(goToNextStep());
  }

  return (
    <form className={styles.step} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Craft your About Me section</h2>
      <p className={styles.subtitle}>Pick a tone and let AI draft a starting point you can edit.</p>

      <Controller
        name="tone"
        control={control}
        render={({ field }) => <Select label="Tone" options={TONE_OPTIONS} {...field} />}
      />

      <Button variant="secondary" onClick={handleGenerate} disabled={generateMutation.isPending}>
        {generateMutation.isPending ? <Spinner size="sm" /> : "✨ Generate with AI"}
      </Button>

      <div style={{ marginTop: "1.8rem" }}>
        <TextArea
          label="About Me"
          rows={6}
          placeholder="Write or generate your introduction..."
          {...register("aboutMe", { required: true })}
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={() => dispatch(goToPreviousStep())}>
          Back
        </Button>
        <Button type="submit" disabled={!watchedAboutMe?.trim()}>
          Continue
        </Button>
      </div>
    </form>
  );
}

export default StepAboutMe;
