import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { setPersonalInfo, goToNextStep } from "../store/builderSlice";
import styles from "./BuilderStep.module.css";

function StepPersonalInfo() {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.builder.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: personalInfo });

  function onSubmit(data) {
    dispatch(setPersonalInfo(data));
    dispatch(goToNextStep());
  }

  return (
    <form className={styles.step} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Tell us about yourself</h2>
      <p className={styles.subtitle}>This information appears at the top of your portfolio.</p>

      <Input
        label="Full name"
        placeholder="Jane Doe"
        error={errors.fullName?.message}
        {...register("fullName", { required: "Full name is required" })}
      />
      <Input
        label="Professional role"
        placeholder="Front-End Developer"
        error={errors.role?.message}
        {...register("role", { required: "Professional role is required" })}
      />
      <Input
        label="Email"
        type="email"
        placeholder="jane@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
        })}
      />
      <Input
        label="GitHub username"
        placeholder="janedoe"
        error={errors.githubUsername?.message}
        {...register("githubUsername", { required: "GitHub username is required" })}
      />

      <div className={styles.actions}>
        <span />
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}

export default StepPersonalInfo;
