# Portfolio Website

## Goal

Build a clean personal portfolio website for job search positioning and project showcase.

Positioning:

```text
IT Implementation | Workflow Automation | Data Analysis | AI-assisted Systems
```

This subproject is separate from `01-progress-tracking-agent`. It contains the website source only. Non-code assets such as screenshots, resume PDFs, exports, and profile images should stay in the Google Drive project folder unless there is a clear reason to commit optimized web assets.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel-ready project structure

## Pages

- Home: systems narrative, positioning, philosophy, featured system, workflow transformation, and selected projects.
- About: reflective introduction to working style, systems thinking, and human-centered implementation.
- Projects: single source for systems, workflows, implementations, ongoing builds, and research projects using `src/data/projects.ts`.
- Resume: narrative resume page based on real implementation, research, education, skills, and current direction.
- Contact: public contact page with positioning, email, and LinkedIn.

## Components

- `Navbar`
- `Footer`
- `ProjectCard`
- `SkillTag`
- `SectionHeader`

## Project Data

Project content lives in:

```text
src/data/projects.ts
```

Unfinished projects must stay labeled as `In Progress`, `Research`, or `Planned`. Do not add fake companies, fake metrics, or fake results.

Initial projects:

1. Job Search Agent OS
2. Progress Tracking Agent
3. Inventory Forecasting Dashboard
4. ERP/CRM Implementation Work
5. Drone Data Pipeline / ICON Lab Research

## Folder Structure

```text
02-portfolio-website/
  README.md
  next.config.mjs
  package.json
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
  public/
  src/
    app/
      about/
      contact/
      projects/
      resume/
      globals.css
      layout.tsx
      page.tsx
    components/
    data/
      profile.ts
      projects.ts
```

## Run Locally

From this folder:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Build Check

```bash
npm run build
```

## Vercel Deployment

When ready to deploy:

1. Push the repository to GitHub.
2. Create a Vercel project.
3. Set the project root to `02-portfolio-website`.
4. Use the default Next.js build settings.
5. Deploy from the `main` branch.

## Next Content Tasks

- Replace placeholder contact text with the preferred public email and links.
- Add real resume details and decide whether to include a PDF.
- Expand each project with evidence, screenshots, and case study notes.
- Keep unfinished work labeled honestly as `In Progress`, `Research`, or `Planned`.
