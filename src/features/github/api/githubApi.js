import { mockGet } from "../../../services/httpClient";

const MOCK_REPOS = [
  {
    id: 1,
    name: "task-flow-app",
    description: "A drag-and-drop kanban board built with React and dnd-kit.",
    language: "JavaScript",
    stars: 34,
    forks: 6,
    topics: ["react", "productivity", "kanban"],
  },
  {
    id: 4,
    name: "task-flow-app",
    description: "A drag-and-drop kanban board built with React and dnd-kit.",
    language: "JavaScript",
    stars: 34,
    forks: 6,
    topics: ["react", "productivity", "kanban"],
  },
  {
    id: 5,
    name: "task-flow-app",
    description: "A drag-and-drop kanban board built with React and dnd-kit.",
    language: "JavaScript",
    stars: 34,
    forks: 6,
    topics: ["react", "productivity", "kanban"],
  },
  {
    id: 2,
    name: "recipe-finder",
    description: "Search and save recipes using a public food API with offline support.",
    language: "TypeScript",
    stars: 19,
    forks: 3,
    topics: ["react", "pwa", "api"],
  },
  {
    id: 3,
    name: "weather-dashboard",
    description: "Real-time weather dashboard with animated data visualizations.",
    language: "JavaScript",
    stars: 12,
    forks: 2,
    topics: ["react", "charts", "weather"],
  },
  {
    id: 4,
    name: "ecommerce-storefront",
    description: "Headless e-commerce storefront with cart and checkout flow.",
    language: "TypeScript",
    stars: 41,
    forks: 9,
    topics: ["nextjs", "ecommerce", "stripe"],
  },
];

export function fetchGithubProfile(username) {
  return mockGet(`/users/${username}`, () => {
    if (!username) throw new Error("GitHub username is required");

    return {
      login: username,
      name: toDisplayName(username),
      avatarUrl: `https://avatars.githubusercontent.com/${username}`,
      bio: "Full-stack developer passionate about building clean, scalable web applications.",
      publicRepos: MOCK_REPOS.length,
      followers: 58,
      htmlUrl: `https://github.com/${username}`,
    };
  });
}

export function fetchGithubRepos(username) {
  return mockGet(`/users/${username}/repos`, () => {
    if (!username) throw new Error("GitHub username is required");
    return MOCK_REPOS.map((repo) => ({ ...repo, htmlUrl: `https://github.com/${username}/${repo.name}` }));
  });
}

function toDisplayName(username) {
  return username.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
