import { mockPost } from "../../../services/httpClient";

const TONE_INTROS = {
  Professional: "Hello, I'm a results-driven developer.",
  Friendly: "Hey there! 👋",
  Confident: "I turn ideas into fast, reliable products.",
  Minimalist: "Developer. Builder. Problem-solver.",
};

export function optimizeProjectDescription(project) {
  return mockPost("/ai/optimize-description", project, (payload) => {
    const techList = payload.topics?.length ? payload.topics.join(", ") : payload.language;
    return {
      description: `${payload.name.replace(/[-_]/g, " ")} — a ${payload.language} project leveraging ${techList} to deliver a fast, user-focused experience.`,
    };
  });
}

export function generateAboutMe(payload) {
  return mockPost("/ai/generate-about-me", payload, ({ name, techStack, tone }) => {
    const stackText = techStack?.length ? techStack.join(", ") : "modern web technologies";
    const toneIntro = TONE_INTROS[tone] || TONE_INTROS.Professional;

    return {
      text: `${toneIntro} I'm ${name || "a developer"}, and I build with ${stackText}. I care about clean architecture, accessible interfaces, and shipping products that solve real problems. I'm currently looking for opportunities to grow as a front-end engineer.`,
    };
  });
}
