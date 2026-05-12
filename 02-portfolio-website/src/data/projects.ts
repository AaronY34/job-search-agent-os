export type ProjectStatus = "In Progress" | "Research" | "Planned";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category: string;
  summary: string;
  problem: string;
  role: string;
  tools: string[];
  focus: string[];
  outcome: string;
  currentProgress: string;
};

export const projects: Project[] = [
  {
    slug: "job-search-agent-os",
    title: "Job Search Agent OS",
    status: "In Progress",
    category: "AI-assisted systems",
    summary:
      "A human-in-the-loop operating system for organizing a job search across progress tracking, portfolio work, and future application workflows.",
    problem:
      "Job search work is repetitive, emotionally heavy, and easy to lose track of across resumes, job descriptions, applications, and follow-ups.",
    role: "System designer and builder",
    tools: ["Next.js", "Python", "Markdown", "Git", "AI-assisted workflow design"],
    focus: ["Workflow design", "Documentation", "AI-assisted process support"],
    outcome:
      "Repository structure, project documentation, and progress logging workflow are in place.",
    currentProgress:
      "Subprojects are organized, daily session notes are active, and the portfolio is being redesigned as the visible systems narrative.",
  },
  {
    slug: "progress-tracking-agent",
    title: "Progress Tracking Agent",
    status: "In Progress",
    category: "Workflow automation",
    summary:
      "A local and GitHub Actions-supported tracker that turns session notes and Git evidence into daily markdown progress logs.",
    problem:
      "Project progress can disappear into scattered commits and chat notes unless the evidence is converted into readable daily updates.",
    role: "Automation designer and implementer",
    tools: ["Python", "GitHub Actions", "Git", "Markdown"],
    focus: ["Python", "GitHub Actions", "Markdown automation"],
    outcome:
      "Daily progress logs can be generated from repository evidence without Google Sheets or OpenAI APIs.",
    currentProgress:
      "The first local markdown workflow is implemented and documented, with future integrations intentionally deferred.",
  },
  {
    slug: "inventory-forecasting-dashboard",
    title: "Inventory Forecasting Dashboard",
    status: "In Progress",
    category: "Data analysis",
    summary:
      "A dashboard concept for tracking inventory signals and forecasting needs from structured business data.",
    problem:
      "Operational teams need clearer visibility into inventory signals before they become planning or fulfillment problems.",
    role: "Data workflow planner",
    tools: ["Excel", "Power BI", "Tableau", "Forecasting workflow planning"],
    focus: ["Forecasting workflow", "Dashboard planning", "Operational reporting"],
    outcome: "Initial project is listed for portfolio development; implementation details are still being gathered.",
    currentProgress:
      "Concept and portfolio framing are defined; evidence and implementation details still need to be gathered.",
  },
  {
    slug: "erp-crm-implementation-work",
    title: "ERP/CRM Implementation Work",
    status: "In Progress",
    category: "IT implementation",
    summary:
      "A case study draft focused on implementation planning, process mapping, data readiness, and user adoption.",
    problem:
      "Manual Excel workflows, disconnected users, and unclear handoffs make business operations harder to scale.",
    role: "Implementation analyst",
    tools: ["ERP/CRM", "Excel", "Training documentation", "Stakeholder coordination"],
    focus: ["Requirements", "Process mapping", "Change support"],
    outcome: "Case study structure is planned; specific evidence will be added when ready.",
    currentProgress:
      "Grounded in ALBA implementation experience; public-facing case study details still need careful review.",
  },
  {
    slug: "drone-data-pipeline-research-project",
    title: "Drone Data Pipeline / ICON Lab Research",
    status: "Research",
    category: "Data systems",
    summary:
      "A research project exploring how drone data can move from collection into organized, reviewable, analysis-ready outputs.",
    problem:
      "Research teams need reliable ways to connect drone setup, field testing, data acquisition, and analysis workflows.",
    role: "Researcher and workflow designer",
    tools: ["Drone systems", "CURA", "3D printing", "Data pipelines", "Dashboards"],
    focus: ["Data pipeline research", "Geospatial workflow planning", "Documentation"],
    outcome: "Research direction is defined; implementation evidence is still in progress.",
    currentProgress:
      "Experience is grounded in UBC ICON Lab coordination, drone systems support, and BuildSys 2024 research contribution.",
  },
];
