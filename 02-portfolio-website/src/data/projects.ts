export type ProjectStatus = "In Progress" | "Research" | "Planned";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category: string;
  summary: string;
  role: string;
  focus: string[];
  outcome: string;
  caseStudyAvailable: boolean;
};

export const projects: Project[] = [
  {
    slug: "job-search-agent-os",
    title: "Job Search Agent OS",
    status: "In Progress",
    category: "AI-assisted systems",
    summary:
      "A human-in-the-loop operating system for organizing a job search across progress tracking, portfolio work, and future application workflows.",
    role: "System designer and builder",
    focus: ["Workflow design", "Documentation", "AI-assisted process support"],
    outcome:
      "Repository structure, project documentation, and progress logging workflow are in place.",
    caseStudyAvailable: true,
  },
  {
    slug: "progress-tracking-agent",
    title: "Progress Tracking Agent",
    status: "In Progress",
    category: "Workflow automation",
    summary:
      "A local and GitHub Actions-supported tracker that turns session notes and Git evidence into daily markdown progress logs.",
    role: "Automation designer and implementer",
    focus: ["Python", "GitHub Actions", "Markdown automation"],
    outcome:
      "Daily progress logs can be generated from repository evidence without Google Sheets or OpenAI APIs.",
    caseStudyAvailable: true,
  },
  {
    slug: "inventory-forecasting-dashboard",
    title: "Inventory Forecasting Dashboard",
    status: "In Progress",
    category: "Data analysis",
    summary:
      "A dashboard concept for tracking inventory signals and forecasting needs from structured business data.",
    role: "Data workflow planner",
    focus: ["Forecasting workflow", "Dashboard planning", "Operational reporting"],
    outcome: "Initial project is listed for portfolio development; implementation details are still being gathered.",
    caseStudyAvailable: false,
  },
  {
    slug: "erp-crm-implementation-case-study",
    title: "ERP/CRM Implementation Case Study",
    status: "In Progress",
    category: "IT implementation",
    summary:
      "A case study draft focused on implementation planning, process mapping, data readiness, and user adoption.",
    role: "Implementation analyst",
    focus: ["Requirements", "Process mapping", "Change support"],
    outcome: "Case study structure is planned; specific evidence will be added when ready.",
    caseStudyAvailable: true,
  },
  {
    slug: "drone-data-pipeline-research-project",
    title: "Drone Data Pipeline Research Project",
    status: "Research",
    category: "Data systems",
    summary:
      "A research project exploring how drone data can move from collection into organized, reviewable, analysis-ready outputs.",
    role: "Researcher and workflow designer",
    focus: ["Data pipeline research", "Geospatial workflow planning", "Documentation"],
    outcome: "Research direction is defined; implementation evidence is still in progress.",
    caseStudyAvailable: false,
  },
];

export const caseStudies = projects.filter((project) => project.caseStudyAvailable);
