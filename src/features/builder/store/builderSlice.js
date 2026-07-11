import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    fullName: "",
    role: "",
    email: "",
    githubUsername: "",
  },
  githubProfile: null,
  repos: [],
  selectedProjects: [],
  aboutMe: "",
  tone: "Professional",
  currentStep: 0,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setPersonalInfo(state, action) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setGithubProfile(state, action) {
      state.githubProfile = action.payload;
    },
    setRepos(state, action) {
      state.repos = action.payload;
    },
    toggleProjectSelection(state, action) {
      const project = action.payload;
      const isSelected = state.selectedProjects.some((p) => p.id === project.id);
      state.selectedProjects = isSelected
        ? state.selectedProjects.filter((p) => p.id !== project.id)
        : [...state.selectedProjects, project];
    },
    updateProjectDescription(state, action) {
      const { projectId, description } = action.payload;
      const isSelected = state.selectedProjects.some((p) => p.id === projectId);

      if (isSelected) {
        state.selectedProjects = state.selectedProjects.map((project) =>
          project.id === projectId ? { ...project, description } : project
        );
      } else {
        const project = state.repos.find((repo) => repo.id === projectId);
        if (project) state.selectedProjects.push({ ...project, description });
      }
    },
    setAboutMe(state, action) {
      state.aboutMe = action.payload;
    },
    setTone(state, action) {
      state.tone = action.payload;
    },
    goToNextStep(state) {
      state.currentStep += 1;
    },
    goToPreviousStep(state) {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    goToStep(state, action) {
      state.currentStep = action.payload;
    },
    resetDraft() {
      return initialState;
    },
  },
});

export const {
  setPersonalInfo,
  setGithubProfile,
  setRepos,
  toggleProjectSelection,
  updateProjectDescription,
  setAboutMe,
  setTone,
  goToNextStep,
  goToPreviousStep,
  goToStep,
  resetDraft,
} = builderSlice.actions;

export default builderSlice.reducer;
