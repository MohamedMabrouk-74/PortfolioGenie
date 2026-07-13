# 🚀 PortfolioGenie

<p align="center">
  <img src="https://img.shields.io/badge/React-19-111827?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-8-111827?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-111827?style=for-the-badge&logo=redux&logoColor=764ABC" />
  <img src="https://img.shields.io/badge/React_Query-5-111827?style=for-the-badge&logo=reactquery&logoColor=FF4154" />
  <img src="https://img.shields.io/badge/License-MIT-111827?style=for-the-badge" />
</p>

<p align="center">
  AI-Powered Portfolio Builder — From Code to Career Brand
  <br/>
  <sub>Built by Digital Egypt Pioneers Initiative (DEPI) — Graduation Project 🇪🇬</sub>
</p>

---

## 🎓 About

**PortfolioGenie** is a team graduation project for the **Digital Egypt Pioneers Initiative (DEPI)**. It's a single-page React application that walks a developer through a guided, multi-step wizard to turn their GitHub activity into a polished, recruiter-ready portfolio page — with AI-assisted copywriting for project descriptions and a personal "About Me" section.

> **Current status:** the app is a fully working **front-end prototype**. The GitHub import and the AI text-generation features are implemented against a **mocked API layer** (simulated network delay + static sample data) so the entire user flow can be demoed end-to-end without a real backend. See [Current Limitations](#-current-limitations--whats-mocked) below.

---

## ✨ Features

* 🧙 **5-step guided builder wizard** with a visual step indicator and Redux-backed state that persists as the user moves back and forth between steps
* 🐙 **GitHub import step** — fetches a profile and repository list for a given username (currently simulated)
* 🤖 **AI-assisted content generation**:
  * "✨ Optimize with AI" — rewrites a single project's description
  * "✨ Generate with AI" — drafts an "About Me" paragraph based on the user's name, tech stack, and a selected tone (Professional / Friendly / Confident / Minimalist)
* ✅ **Form validation** on personal info and content fields via React Hook Form
* 🖼️ **Live portfolio preview page** rendering the final result (hero section, about, project cards)
* 🌗 **Light / dark theme toggle**, persisted in `localStorage`
* ⚡ **Fast dev/build tooling** with Vite, and **linting** with `oxlint`
* 📱 Responsive, CSS-Modules-based UI kit (Button, Input, Select, TextArea, Spinner)

---

## 🧩 Architecture

The codebase follows a **feature-based (screaming) architecture**: instead of grouping files by type only, domain logic lives inside `src/features/<domain>`, each with its own `api/`, `hooks/`, `components/`, and (where needed) `store/`.

```text
Client (React 19 + Vite)
 ├─ Pages            → route-level screens (Home, Builder, Preview, NotFound)
 ├─ Features         → self-contained domains (github, ai, builder, preview)
 ├─ Components       → shared/reusable UI kit + layout
 ├─ Store            → Redux Toolkit (builder wizard state)
 ├─ Context          → Theme (light/dark)
 └─ Services         → HTTP client abstraction (currently mocked)

Data flow per step:
 UI Component → React Query hook → feature api/*.js → services/httpClient (mock) → Redux (builder slice) → Preview
```

**State management strategy** (deliberately split by responsibility):
| Concern | Tool | Why |
|---|---|---|
| Server / async data (GitHub profile & repos, AI generations) | **TanStack Query** | caching, loading & error states, retries |
| Cross-step wizard/form data (personal info, selected projects, about me, current step) | **Redux Toolkit** | needs to persist and be shared across all 5 wizard steps |
| Local UI-only state (which card is currently being optimized, theme) | **React `useState` / Context** | scoped to a single component/subtree |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Global state | Redux Toolkit + React-Redux |
| Server state / async | TanStack React Query 5 |
| Forms & validation | React Hook Form |
| Styling | CSS Modules (no external UI framework) |
| Linting | oxlint |
| AI / GitHub data | Mocked API layer (see below) — designed to be swapped for a real backend |

---

## 📂 Project Structure

```text
PortfolioGenie/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                    # React root, mounts <App />
    ├── App.jsx                     # Providers: Redux, React Query, Theme, Router
    ├── router/
    │   └── AppRouter.jsx           # Routes: "/", "/builder", "/preview", "*"
    ├── store/
    │   └── store.js                # Redux store (builder reducer)
    ├── context/
    │   └── ThemeContext.jsx        # Light/dark theme provider (localStorage)
    ├── services/
    │   └── httpClient.js           # mockGet / mockPost — simulated REST client
    ├── utils/
    │   ├── constants.js            # TONE_OPTIONS
    │   └── helpers.js              # truncateText, getLanguageColor
    ├── data/
    │   └── mockRepos.js            # (legacy) sample repo data, superseded by features/github
    ├── pages/
    │   ├── Home/HomePage.jsx
    │   ├── Builder/BuilderPage.jsx
    │   ├── Preview/PreviewPage.jsx
    │   └── NotFound/NotFoundPage.jsx
    ├── features/
    │   ├── github/
    │   │   ├── api/githubApi.js            # fetchGithubProfile, fetchGithubRepos (mocked)
    │   │   └── hooks/useGithubProfile.js, useGithubRepos.js
    │   ├── ai/
    │   │   ├── api/aiApi.js                # optimizeProjectDescription, generateAboutMe (mocked)
    │   │   └── hooks/useOptimizeDescription.js, useGenerateAboutMe.js
    │   ├── builder/
    │   │   ├── store/builderSlice.js       # Redux slice: wizard state
    │   │   └── components/                 # StepPersonalInfo, StepGithubImport,
    │   │                                    # StepProjects, StepAboutMe, StepReview,
    │   │                                    # StepIndicator
    │   └── preview/
    │       └── components/PortfolioPreview.jsx, ProjectCard.jsx
    └── components/
        ├── ui/                      # Button, Input, Select, TextArea, Spinner
        ├── layout/AppLayout.jsx     # Navbar + <Outlet />
        └── Navbar/Navbar.jsx
```

> ⚠️ **Note on legacy files:** loose files directly under `src/components/` (e.g. `HomePage.jsx`, `StepProjects.jsx`, `PortfolioPreview.jsx`, `ProjectCard.jsx`, `Header.jsx`, and the standalone `Step*.jsx` files) are **leftovers from an earlier version** of the project, before it was refactored into the `src/features/` structure. They are **not imported anywhere** and are safe to delete as part of cleanup.

---

## 🔄 Application Flow

1. **Home (`/`)** — landing page with a feature summary and a CTA into the builder.
2. **Builder (`/builder`)** — a 5-step wizard, with progress tracked in `builder.currentStep` (Redux):
   1. **Personal Info** — full name, role, email, GitHub username (validated form)
   2. **Import GitHub** — fetches profile + repo list for the given username
   3. **Projects** — select which repos to feature; optionally run "Optimize with AI" per project
   4. **About Me** — pick a tone and either write manually or "Generate with AI"
   5. **Review & Publish** — summary of choices, then navigates to `/preview`
3. **Preview (`/preview`)** — renders the final portfolio (hero, about, project grid) from the Redux store.
4. **NotFound (`*`)** — 404 fallback with a "go home" action.

---

## ⚙️ Current Limitations / What's Mocked

This is important context for reviewers: there is **no real backend, no real GitHub API call, and no real AI model call yet**.

| Feature | Current behavior | Location |
|---|---|---|
| GitHub profile & repos | Returns a fixed, hardcoded list of sample repositories after an artificial delay | `src/features/github/api/githubApi.js` |
| AI "Optimize description" | Builds a templated sentence from the repo's name/language/topics — no real LLM call | `src/features/ai/api/aiApi.js` |
| AI "Generate About Me" | Fills a hand-written template based on tone + tech stack — no real LLM call | `src/features/ai/api/aiApi.js` |
| Networking | `mockGet` / `mockPost` simulate REST calls with `setTimeout` and log to console | `src/services/httpClient.js` |

Known data issue: the mocked repo list in `githubApi.js` currently contains duplicate entries with mismatched IDs (`task-flow-app` appears 3 times), which should be cleaned up.

---

## 🗺️ Roadmap

* [ ] Real GitHub REST/GraphQL API integration
* [ ] Real AI provider integration (prompt engineering layer already scaffolded)
* [ ] User authentication
* [ ] Portfolio export (PDF / shareable link / static site)
* [ ] Drag & drop project ordering in the builder
* [ ] Remove legacy/unused files under `src/components/`
* [ ] Automated tests (unit + e2e)

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ and npm

### Installation
```bash
git clone https://github.com/<your-username>/PortfolioGenie.git
cd PortfolioGenie
npm install
```

### Available Scripts
```bash
npm run dev       # start the Vite dev server
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

---

## 👥 Team

| Name | Role |
|---|---|
| Mohamed Mabrouk Heshmat | |
| Ibrahim Mohamed Rady | |
| Mohamed Samy Ahmed | |
| Shimaa Bakri Ahmed | |
| Shaimaa Ahmed Mohamed | |
| Shahd Ebrahem Desouqy | |

*Graduation Project — Digital Egypt Pioneers Initiative (DEPI) 🇪🇬*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repo and open a pull request.

## 📜 License

MIT License
