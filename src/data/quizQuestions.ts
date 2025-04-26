
export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  careerPoints: {
    [key: string]: number; // Maps career ID to points
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "When solving problems, you prefer to:",
    options: [
      {
        id: "1a",
        text: "Use logical reasoning and follow step-by-step procedures",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      },
      {
        id: "1b",
        text: "Think creatively and find innovative solutions",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 1, 
          "systems-analysis": 0, 
          "project-management": 1,
          "ux-design": 3
        }
      },
      {
        id: "1c",
        text: "Collaborate with others to find the best approach",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 2
        }
      },
      {
        id: "1d",
        text: "Analyze data and identify patterns",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      }
    ]
  },
  {
    id: 2,
    text: "Which of these activities would you most enjoy?",
    options: [
      {
        id: "2a",
        text: "Building and creating digital products",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 2
        }
      },
      {
        id: "2b",
        text: "Designing user-friendly interfaces",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 3
        }
      },
      {
        id: "2c",
        text: "Leading teams and coordinating efforts",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1
        }
      },
      {
        id: "2d",
        text: "Working with numbers and statistical analysis",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      }
    ]
  },
  {
    id: 3,
    text: "How do you approach learning new technologies?",
    options: [
      {
        id: "3a",
        text: "Dive into documentation and experiment through trial and error",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 1
        }
      },
      {
        id: "3b",
        text: "Follow structured courses and tutorials",
        careerPoints: { 
          "software-development": 2, 
          "data-science": 2, 
          "systems-analysis": 2, 
          "project-management": 2,
          "ux-design": 2
        }
      },
      {
        id: "3c",
        text: "Focus on how it affects users and business processes",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 1, 
          "systems-analysis": 2, 
          "project-management": 3,
          "ux-design": 3
        }
      },
      {
        id: "3d",
        text: "Research it thoroughly before implementing",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 3, 
          "project-management": 1,
          "ux-design": 1
        }
      }
    ]
  },
  {
    id: 4,
    text: "When working on a project, what aspect interests you most?",
    options: [
      {
        id: "4a",
        text: "Making sure it functions correctly and efficiently",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      },
      {
        id: "4b",
        text: "Creating an intuitive and visually appealing experience",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 1,
          "ux-design": 3
        }
      },
      {
        id: "4c",
        text: "Meeting objectives on time and within budget",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 0
        }
      },
      {
        id: "4d",
        text: "Finding valuable insights from information",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 1
        }
      }
    ]
  },
  {
    id: 5,
    text: "Which of these best describes your communication style?",
    options: [
      {
        id: "5a",
        text: "Precise and technical",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      },
      {
        id: "5b",
        text: "Visual and demonstrative",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 1, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3
        }
      },
      {
        id: "5c",
        text: "Diplomatic and people-oriented",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 2
        }
      },
      {
        id: "5d",
        text: "Analytical and data-driven",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0
        }
      }
    ]
  }
];
