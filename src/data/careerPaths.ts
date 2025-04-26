
export interface CareerPath {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  alignment: string;
}

export const careerPaths: { [key: string]: CareerPath } = {
  "software-development": {
    id: "software-development",
    title: "Software Development",
    description: "Build applications and systems using programming languages and development tools.",
    color: "purple",
    icon: "Code",
    alignment: "Your logical approach to problem-solving and technical mindset are perfect for coding and developing applications. Software development allows you to create functional solutions through code."
  },
  "data-science": {
    id: "data-science",
    title: "Data Science",
    description: "Extract insights from data using statistical analysis, machine learning, and visualization techniques.",
    color: "blue",
    icon: "BarChart",
    alignment: "Your analytical skills and interest in finding patterns in information are ideal for data science. This career lets you uncover valuable insights from complex datasets."
  },
  "systems-analysis": {
    id: "systems-analysis",
    title: "Systems Analysis",
    description: "Evaluate processes, identify requirements, and design IT solutions for business needs.",
    color: "green",
    icon: "Network",
    alignment: "Your methodical approach and ability to understand both technical and business perspectives make you well-suited for systems analysis, where you'll optimize processes and design effective solutions."
  },
  "project-management": {
    id: "project-management",
    title: "Project Management",
    description: "Plan, execute, and oversee projects to ensure successful and timely completion.",
    color: "orange",
    icon: "ClipboardList",
    alignment: "Your collaborative nature and organization skills are perfect for project management, where you'll coordinate teams and resources to achieve objectives effectively."
  },
  "ux-design": {
    id: "ux-design",
    title: "UX Design",
    description: "Create user-centered designs for digital products to enhance user satisfaction and usability.",
    color: "yellow",
    icon: "Palette",
    alignment: "Your creative thinking and interest in user experience make you an excellent fit for UX design, where you'll craft intuitive interfaces that delight users."
  }
};
