
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
    text: "What do you enjoy doing in your free time?",
    options: [
      {
        id: "1a",
        text: "Solving puzzles and brain teasers",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 2,
          "cyber-security": 3
        }
      },
      {
        id: "1b",
        text: "Creating art or designing things",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 1,
          "ux-design": 3,
          "video-game-developer": 3,
          "cyber-security": 0
        }
      },
      {
        id: "1c",
        text: "Organizing events or activities with friends",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 2,
          "video-game-developer": 1,
          "cyber-security": 0
        }
      },
      {
        id: "1d",
        text: "Reading about new discoveries and research",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 1,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 2,
    text: "What personal quality are you most proud of?",
    options: [
      {
        id: "2a",
        text: "My logical thinking and problem-solving abilities",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 2,
          "cyber-security": 3
        }
      },
      {
        id: "2b",
        text: "My creativity and eye for design",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 1,
          "ux-design": 3,
          "video-game-developer": 3,
          "cyber-security": 0
        }
      },
      {
        id: "2c",
        text: "My leadership and people skills",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "2d",
        text: "My analytical mind and attention to detail",
        careerPoints: { 
          "software-development": 2, 
          "data-science": 3, 
          "systems-analysis": 3, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 1,
          "cyber-security": 3
        }
      }
    ]
  },
  {
    id: 3,
    text: "What type of books or media do you prefer?",
    options: [
      {
        id: "3a",
        text: "Technical manuals and how-to guides",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 2,
          "cyber-security": 3
        }
      },
      {
        id: "3b",
        text: "Visual arts, design magazines, and creative content",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 1,
          "ux-design": 3,
          "video-game-developer": 3,
          "cyber-security": 0
        }
      },
      {
        id: "3c",
        text: "Business and leadership books",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 0,
          "cyber-security": 1
        }
      },
      {
        id: "3d",
        text: "Scientific journals and research papers",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 1,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 4,
    text: "How do you approach learning something new?",
    options: [
      {
        id: "4a",
        text: "I experiment and learn through trial and error",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 1, 
          "project-management": 1,
          "ux-design": 2,
          "video-game-developer": 3,
          "cyber-security": 2
        }
      },
      {
        id: "4b",
        text: "I look for visual examples and demonstrations",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 1
        }
      },
      {
        id: "4c",
        text: "I prefer structured courses with clear objectives",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 1, 
          "systems-analysis": 2, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 2
        }
      },
      {
        id: "4d",
        text: "I gather and analyze all available information first",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 3, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 3
        }
      }
    ]
  },
  {
    id: 5,
    text: "What environment do you work best in?",
    options: [
      {
        id: "5a",
        text: "Quiet space where I can focus deeply on complex problems",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 1,
          "video-game-developer": 2,
          "cyber-security": 3
        }
      },
      {
        id: "5b",
        text: "Creative environment with visual inspiration",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 3,
          "cyber-security": 0
        }
      },
      {
        id: "5c",
        text: "Collaborative setting with lots of interaction",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 2,
          "video-game-developer": 2,
          "cyber-security": 1
        }
      },
      {
        id: "5d",
        text: "Organized environment with access to data and resources",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 3, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 6,
    text: "When solving technical problems, you prefer to:",
    options: [
      {
        id: "6a",
        text: "Write code and build working solutions",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 1,
          "video-game-developer": 3,
          "cyber-security": 2
        }
      },
      {
        id: "6b",
        text: "Focus on user experience and interface design",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 0
        }
      },
      {
        id: "6c",
        text: "Manage resources and coordinate team efforts",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "6d",
        text: "Analyze data and identify patterns",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 3
        }
      }
    ]
  },
  {
    id: 7,
    text: "Which technical skill would you most like to develop?",
    options: [
      {
        id: "7a",
        text: "Programming and software architecture",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 3,
          "cyber-security": 2
        }
      },
      {
        id: "7b",
        text: "UI/UX design and prototyping tools",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 0
        }
      },
      {
        id: "7c",
        text: "Project planning and team management",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "7d",
        text: "Data analysis and statistical methods",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 8,
    text: "In a technical project, which role would you naturally take?",
    options: [
      {
        id: "8a",
        text: "Developer implementing the core functionality",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 3,
          "cyber-security": 2
        }
      },
      {
        id: "8b",
        text: "Designer creating the user interface and experience",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 0
        }
      },
      {
        id: "8c",
        text: "Project manager coordinating tasks and timelines",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "8d",
        text: "Analyst working with data and creating insights",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 1,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 9,
    text: "Which technical challenge interests you most?",
    options: [
      {
        id: "9a",
        text: "Building efficient, scalable software systems",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 1, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 2,
          "cyber-security": 3
        }
      },
      {
        id: "9b",
        text: "Creating intuitive, accessible user interfaces",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 0
        }
      },
      {
        id: "9c",
        text: "Managing complex projects with multiple stakeholders",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "9d",
        text: "Extracting meaningful insights from large datasets",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 2
        }
      }
    ]
  },
  {
    id: 10,
    text: "Which technology or tool would you most like to master?",
    options: [
      {
        id: "10a",
        text: "Programming languages and development frameworks",
        careerPoints: { 
          "software-development": 3, 
          "data-science": 2, 
          "systems-analysis": 1, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 3,
          "cyber-security": 2
        }
      },
      {
        id: "10b",
        text: "Design software and prototyping tools",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 0, 
          "systems-analysis": 0, 
          "project-management": 0,
          "ux-design": 3,
          "video-game-developer": 2,
          "cyber-security": 0
        }
      },
      {
        id: "10c",
        text: "Project management and collaboration platforms",
        careerPoints: { 
          "software-development": 0, 
          "data-science": 0, 
          "systems-analysis": 1, 
          "project-management": 3,
          "ux-design": 1,
          "video-game-developer": 1,
          "cyber-security": 1
        }
      },
      {
        id: "10d",
        text: "Data analysis and machine learning tools",
        careerPoints: { 
          "software-development": 1, 
          "data-science": 3, 
          "systems-analysis": 2, 
          "project-management": 0,
          "ux-design": 0,
          "video-game-developer": 0,
          "cyber-security": 2
        }
      }
    ]
  }
];
