
export interface Resource {
  id: string;
  title: string;
  provider: string;
  type: "video" | "article" | "course" | "book" | "tool";
  url: string;
  careerId: string;
  relevance: number;
  description: string;
}

export const resources: Resource[] = [
  // Software Development Resources
  {
    id: "sd-resource-1",
    title: "The Odin Project",
    provider: "The Odin Project",
    type: "course",
    url: "https://www.theodinproject.com/",
    careerId: "software-development",
    relevance: 5,
    description: "Free full-stack curriculum with hands-on projects to learn web development from scratch."
  },
  {
    id: "sd-resource-2",
    title: "freeCodeCamp",
    provider: "freeCodeCamp.org",
    type: "course",
    url: "https://www.freecodecamp.org/",
    careerId: "software-development",
    relevance: 5,
    description: "Learn to code with interactive challenges and build real-world projects."
  },
  {
    id: "sd-resource-3",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    provider: "Robert C. Martin",
    type: "book",
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    careerId: "software-development",
    relevance: 4,
    description: "Essential guide to writing clean, maintainable code with practical examples."
  },
  {
    id: "sd-resource-4",
    title: "GitHub",
    provider: "GitHub",
    type: "tool",
    url: "https://github.com/",
    careerId: "software-development",
    relevance: 5,
    description: "Platform for version control and collaboration on software projects."
  },
  {
    id: "sd-resource-5",
    title: "Codecademy Pro",
    provider: "Codecademy",
    type: "course",
    url: "https://www.codecademy.com/",
    careerId: "software-development",
    relevance: 4,
    description: "Interactive coding lessons in various programming languages and frameworks."
  },
  
  // Data Science Resources
  {
    id: "ds-resource-1",
    title: "Kaggle",
    provider: "Google",
    type: "tool",
    url: "https://www.kaggle.com/",
    careerId: "data-science",
    relevance: 5,
    description: "Platform for data science competitions, datasets, and learning resources."
  },
  {
    id: "ds-resource-2",
    title: "Data Science Specialization",
    provider: "Coursera (Johns Hopkins University)",
    type: "course",
    url: "https://www.coursera.org/specializations/jhu-data-science",
    careerId: "data-science",
    relevance: 5,
    description: "Comprehensive course series on data science fundamentals using R programming."
  },
  {
    id: "ds-resource-3",
    title: "Python for Data Science and Machine Learning Bootcamp",
    provider: "Udemy",
    type: "course",
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    careerId: "data-science",
    relevance: 4,
    description: "Hands-on Python training for data analysis, visualization, and machine learning."
  },
  {
    id: "ds-resource-4",
    title: "Towards Data Science",
    provider: "Medium",
    type: "article",
    url: "https://towardsdatascience.com/",
    careerId: "data-science",
    relevance: 4,
    description: "Publication sharing data science concepts, tutorials, and industry insights."
  },
  {
    id: "ds-resource-5",
    title: "The Elements of Statistical Learning",
    provider: "Trevor Hastie, Robert Tibshirani, Jerome Friedman",
    type: "book",
    url: "https://web.stanford.edu/~hastie/ElemStatLearn/",
    careerId: "data-science",
    relevance: 3,
    description: "Comprehensive book on statistical learning methods (free PDF available)."
  },
  
  // Systems Analysis Resources
  {
    id: "sa-resource-1",
    title: "Business Analysis Fundamentals",
    provider: "LinkedIn Learning",
    type: "course",
    url: "https://www.linkedin.com/learning/business-analysis-foundations",
    careerId: "systems-analysis",
    relevance: 5,
    description: "Introduction to core concepts and techniques in business analysis."
  },
  {
    id: "sa-resource-2",
    title: "Systems Analysis and Design",
    provider: "Coursera (University of Minnesota)",
    type: "course",
    url: "https://www.coursera.org/learn/systems-analysis-design",
    careerId: "systems-analysis",
    relevance: 5,
    description: "Learn to analyze and design information systems for organizations."
  },
  {
    id: "sa-resource-3",
    title: "Lucidchart",
    provider: "Lucid Software",
    type: "tool",
    url: "https://www.lucidchart.com/",
    careerId: "systems-analysis",
    relevance: 4,
    description: "Visual workspace for creating diagrams, flowcharts, and process models."
  },
  {
    id: "sa-resource-4",
    title: "BABOK Guide",
    provider: "International Institute of Business Analysis",
    type: "book",
    url: "https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/",
    careerId: "systems-analysis",
    relevance: 4,
    description: "The definitive guide to business analysis knowledge and practices."
  },
  {
    id: "sa-resource-5",
    title: "Modern Systems Analysis and Design",
    provider: "Joseph Valacich, Joey George",
    type: "book",
    url: "https://www.pearson.com/en-us/subject-catalog/p/modern-systems-analysis-and-design/P200000003037",
    careerId: "systems-analysis",
    relevance: 3,
    description: "Comprehensive textbook on systems analysis methodologies and techniques."
  },
  
  // Project Management Resources
  {
    id: "pm-resource-1",
    title: "Project Management Professional (PMP) Certification",
    provider: "Project Management Institute",
    type: "course",
    url: "https://www.pmi.org/certifications/project-management-pmp",
    careerId: "project-management",
    relevance: 5,
    description: "Industry-standard certification for project management professionals."
  },
  {
    id: "pm-resource-2",
    title: "Trello",
    provider: "Atlassian",
    type: "tool",
    url: "https://trello.com/",
    careerId: "project-management",
    relevance: 4,
    description: "Visual tool for managing projects and organizing tasks with boards and cards."
  },
  {
    id: "pm-resource-3",
    title: "Scrum: A Breathtakingly Brief and Agile Introduction",
    provider: "Chris Sims & Hillary Louise Johnson",
    type: "book",
    url: "https://www.amazon.com/Scrum-Breathtakingly-Brief-Agile-Introduction-ebook/dp/B007P5N8D4",
    careerId: "project-management",
    relevance: 4,
    description: "Concise introduction to Scrum methodology for agile project management."
  },
  {
    id: "pm-resource-4",
    title: "Google Project Management Certificate",
    provider: "Coursera (Google)",
    type: "course",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    careerId: "project-management",
    relevance: 5,
    description: "Comprehensive program to develop job-ready project management skills."
  },
  {
    id: "pm-resource-5",
    title: "The Project Management Podcast",
    provider: "OSP International LLC",
    type: "article",
    url: "https://www.project-management-podcast.com/",
    careerId: "project-management",
    relevance: 3,
    description: "Weekly podcast featuring interviews and tips for project managers."
  },
  
  // UX Design Resources
  {
    id: "ux-resource-1",
    title: "Google UX Design Professional Certificate",
    provider: "Coursera (Google)",
    type: "course",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    careerId: "ux-design",
    relevance: 5,
    description: "Comprehensive program teaching UX design fundamentals and job-ready skills."
  },
  {
    id: "ux-resource-2",
    title: "Figma",
    provider: "Figma",
    type: "tool",
    url: "https://www.figma.com/",
    careerId: "ux-design",
    relevance: 5,
    description: "Collaborative design tool for creating interfaces, prototypes, and design systems."
  },
  {
    id: "ux-resource-3",
    title: "Don't Make Me Think",
    provider: "Steve Krug",
    type: "book",
    url: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515/",
    careerId: "ux-design",
    relevance: 4,
    description: "Classic guide on web usability and intuitive navigation design principles."
  },
  {
    id: "ux-resource-4",
    title: "Nielsen Norman Group Articles",
    provider: "Nielsen Norman Group",
    type: "article",
    url: "https://www.nngroup.com/articles/",
    careerId: "ux-design",
    relevance: 4,
    description: "Research-based articles on user experience best practices and guidelines."
  },
  {
    id: "ux-resource-5",
    title: "Interaction Design Foundation",
    provider: "Interaction Design Foundation",
    type: "course",
    url: "https://www.interaction-design.org/",
    careerId: "ux-design",
    relevance: 4,
    description: "Online design courses and literature focusing on user experience design."
  },
  // Video Game Developer Resources
  {
    id: "vg-resource-1",
    title: "Unity Learn",
    provider: "Unity Technologies",
    type: "course",
    url: "https://learn.unity.com/",
    careerId: "video-game-developer",
    relevance: 5,
    description: "Official Unity learning platform with tutorials and projects for game development."
  },
  {
    id: "vg-resource-2",
    title: "Unreal Engine Documentation",
    provider: "Epic Games",
    type: "article",
    url: "https://docs.unrealengine.com/4.27/en-US/",
    careerId: "video-game-developer",
    relevance: 5,
    description: "Comprehensive documentation and tutorials for Unreal Engine game development."
  },
  {
    id: "vg-resource-3",
    title: "Game Development for Beginners",
    provider: "Udemy",
    type: "course",
    url: "https://www.udemy.com/course/game-development-for-beginners/",
    careerId: "video-game-developer",
    relevance: 4,
    description: "Beginner-friendly course covering the basics of game development."
  },
  {
    id: "vg-resource-4",
    title: "Game Programming Patterns",
    provider: "Robert Nystrom",
    type: "book",
    url: "http://gameprogrammingpatterns.com/",
    careerId: "video-game-developer",
    relevance: 4,
    description: "Book on design patterns and best practices in game programming (free online)."
  },
  {
    id: "vg-resource-5",
    title: "Gamasutra Articles",
    provider: "Gamasutra (Game Developer)",
    type: "article",
    url: "https://www.gamedeveloper.com/",
    careerId: "video-game-developer",
    relevance: 3,
    description: "Articles and insights on game development, design, and industry trends."
  },
  // Cybersecurity Resources
  {
    id: "cs-resource-1",
    title: "Cybrary",
    provider: "Cybrary",
    type: "course",
    url: "https://www.cybrary.it/",
    careerId: "cyber-security",
    relevance: 5,
    description: "Free online courses and resources for cybersecurity professionals."
  },
  {
    id: "cs-resource-2",
    title: "CompTIA Security+ Certification",
    provider: "CompTIA",
    type: "course",
    url: "https://www.comptia.org/certifications/security",
    careerId: "cyber-security",
    relevance: 5,
    description: "Entry-level certification for IT professionals in cybersecurity."
  },
  {
    id: "cs-resource-3",
    title: "Kali Linux Revealed",
    provider: "Raphaël Hertzog, Jim O'Gorman, Devon Kearney",
    type: "book",
    url: "https://www.offsec.com/kali-training/?utm_source=kali&utm_medium=web&utm_campaign=training404",
    careerId: "cyber-security",
    relevance: 4,
    description: "Free book on Kali Linux, a popular penetration testing distribution." 
  },
];
