export const PROJECTS_DATA = [
  {
    id: 'project-card-1',
    slug: 'Educator Management Platform',
    title: 'Tableu',
    category: 'Fullstack Web App',
    year: '2026',
    tagline: 'The All-in-One AI Workspace for Modern Educators.',
    liveUrl: 'https://public.tableau.com/app/profile/adian.alvin/viz/finaltabluEVD/USFlightDelay',
    image: '/assets/project-img/beroang/Beroang Mockup.webp',
    mockupImage: '/assets/project-img/beroang/Beroang Mockup.webp',
    overview:
      'Beroang is a client-side frontend prototype of a personal AI teaching assistant tailored for the Indonesian educational landscape. The project stems from direct field research conducted at regional high schools (including SMAN 2 and SMAN 5 Samarinda) to pinpoint the daily administrative bottlenecks educators face. Built without external backend dependencies, it showcases robust state management and UI architecture to deliver a seamless, low-latency workspace.',
    myRole:
      'From collaborative feature ideation to solo technical execution, taking full ownership of UI/UX design, frontend engineering, and client-side architecture',
    teamDescription:
      'Beroang is the result of a cross-functional collaborative effort. Together, our team conducted comprehensive field research at local high schools to observe the daily administrative burdens placed on teachers. While the team primarily drove problem validation and business strategy, I served as the technical partner during the feature ideation stage.',
    teamMembers: [
      {
        id: 'team-1',
        name: 'Adian Prastiyo Alvin',
        linkedin: 'https://www.linkedin.com/in/adianprastiyoalvin/',
      },
    ],
    timeline:
      'Developed over 3 months with a focus on responsive client-side performance, a secure local-first data architecture, and an intuitive interface for teachers.',
    documentations: [
      {
        id: 'doc-1',
        image: '/assets/project-img/beroang/smartlearning.webp',
      },
      {
        id: 'doc-2',
        image: '/assets/project-img/beroang/ruangp5.webp',
      },
      {
        id: 'doc-3',
        image: '/assets/project-img/beroang/analystics.webp',
      },
      {
        id: 'doc-4',
        image: '/assets/project-img/beroang/asistenai.webp',
      },
      {
        id: 'doc-5',
        image: '/assets/project-img/beroang/roadmap.webp',
      },
    ],
  },
  {
    id: 'project-card-2',
    slug: 'Acid Mine Dashboard & Prediction System',
    title: 'Project ML',
    category: 'Web Dashboard',
    year: '2026',
    tagline: 'An IoT + AI dashboard system for early detection, prediction, and real-time mitigation of Acid Mine Drainage (AMD) in coal mining operations.',
    liveUrl: 'https://dashboardanxiety1.streamlit.app',
    image: '/assets/project-img/Kideco Mockup.webp',
    mockupImage: '/assets/project-img/Kideco Mockup.webp',
    overview:
      'SIMPATI-AAT is an integrated IoT and AI environmental monitoring dashboard designed to detect, predict, and provide mitigation plans for Acid Mine Drainage (AMD) in real time during coal mining operations. Using an ESP32/LoRa telemetry sensor network across settling ponds, the system streams live pH and TDS data over a Socket.IO connection. It features dual Groq AI models (Llama 3.1 8B for instant insights and Llama 3.3 70B for AMDAL-compliant mitigation action plans), audio/visual hazard alarms, multi-node device tracking (KDC01, KDC02), plus trend analytics, anomaly detection, and forecasting.',
    myRole:
      'Led the frontend engineering and UI/UX design using React 18, Tailwind CSS 4, and Recharts. Implemented real-time data streaming via Socket.IO, centralized state management with SensorContext, engineered the visual alert system, and ensured UI reliability through Playwright E2E testing.',
    teamDescription:
      'Developed by the Sawit4Kilo team, a cross-functional group of 4 members. While I spearheaded the frontend engineering and UI/UX design, I collaborated closely with IoT engineers who deployed the ESP32 sensor nodes, and backend developers who managed the Express.js proxy and Groq AI integrations. This dynamic required strict API contracts and precise Socket.IO synchronization to ensure field data was accurately reflected on the client side.',
    teamMembers: [
      {
        id: 'team-1',
        name: 'Adian Prastiyo Alvin',
      },
      {
        id: 'team-2',
        name: 'Muhammad Izzul Afif Nasrullah',
        linkedin: 'https://www.instagram.com/muhamadfadzliramadhan',
      },
      {
        id: 'team-3',
        name: 'Muhamad fadzli Ramadhan',
        linkedin: 'https://www.instagram.com/muhamadfadzliramadhan/',
      },
    ],
    timeline:
      'Designed and developed intensively for a technology/academic innovation competition, covering hardware telemetry integration, API proxying, and E2E testing.',
    documentations: [
      {
        id: 'doc-1',
        image: '/assets/project-img/SIMPATI/1.webp',
      },
      {
        id: 'doc-2',
        image: '/assets/project-img/SIMPATI/2.webp',
      },
      {
        id: 'doc-3',
        image: '/assets/project-img/SIMPATI/3.webp',
      },
      {
        id: 'doc-4',
        image: '/assets/project-img/SIMPATI/4.webp',
      },
    ],
  },
  {
    id: 'project-card-3',
    slug: 'Gamified Agriculture Simulation',
    title: 'AgriVerse Simulation Platform',
    category: 'Game Simulation & Web App',
    year: '2026',
    tagline: 'AI-Powered, Turn-Based Farming Management Simulator.',
    liveUrl: '',
    image: '/assets/project-img/AgriVerse Mockup.webp',
    mockupImage: '/assets/project-img/AgriVerse Mockup.webp',
    overview:
    'AgriVerse is an interactive farming strategy simulator that blends retro pixel-art aesthetics with a multi-agent Artificial Intelligence engine. Designed as an educational management platform, players operate farms across 40+ real-world Indonesian climates. Users interact with AI specialists, manage resources (fertilizers, labor, crop selection), and navigate dynamic stochastic events to optimize yields and financial profitability.',
    myRole:
    'I spearheaded the frontend development and interface design, transforming a complex simulation engine into an intuitive, game-like experience and also Integrated the LLM API for contextual in-game advice and utilized Recharts to visualize post-simulation financial and production trends.',
    teamDescription:
      'AgriVerse was developed as a competitive entry for the INSPACE innovation challenge by a cross-functional team. While I took full ownership of the interface design and technical frontend execution, the products conceptualization and domain mechanics were a collaborative effort.',
    teamMembers: [
      {
        id: 'team-1',
        name: 'ADIAN Abiyyu Rahman',
      },
      {
        id: 'team-2',
        name: 'Nayla camelia indraswari',
        linkedin: 'https://www.linkedin.com/in/naylacamelia/',
      },
      {
        id: 'team-3',
        name: 'Jen Agresia Misti',
        linkedin: 'https://www.linkedin.com/in/jen-agresia-598912331/',
      },
    ],
    timeline:
      'Completed in 1 months, from gamification conceptualization to web prototype implementation.',
    documentations: [
      {
        id: 'doc-1',
        image: '/assets/project-img/AgriVerse/1.webp',
      },
      {
        id: 'doc-2',
        image: '/assets/project-img/AgriVerse/2.webp',
      },
      {
        id: 'doc-3',
        image: '/assets/project-img/AgriVerse/3.webp',
      },
    ],
  },
  {
    id: 'project-card-4',
    slug: 'inconnect-umkm-platform',
    title: 'InConnect Platform',
    category: 'UI UX Design',
    year: '2026',
    tagline: 'Bridging Visionary Investors and MSMEs through Intuitive Digital Design.',
    liveUrl: '',
    image: '/assets/project-img/inconnect Mockup.webp',
    mockupImage: '/assets/project-img/inconnect Mockup.webp',
    overview:
    'InConnect is an innovative digital investment platform concept aimed at closing the funding gap between investors and local Micro, Small, and Medium Enterprises (MSMEs). Conceived to accelerate national economic growth, the platform digitalizes access to capital while establishing a secure and transparent ecosystem for both parties.',
    myRole:
    'Serving exclusively as the UI/UX Designer, my objective was to translate complex financial interactions and business logic into a modern, accessible visual experience',
    teamDescription:
      'InConnect was conceptualized as a collaborative initiative. While I was solely responsible for the end-to-end visual interface and user experience design in Figma, I worked alongside a team that established the core business logic and project feasibility.',
    teamMembers: [
      {
        id: 'team-1',
        name: 'ADIAN Abiyyu Rahman',
      },
      {
        id: 'team-2',
        name: 'Taufik Ramadhani',
        linkedin: 'https://www.linkedin.com/in/taufik-ramadhani/',
      },
      {
        id: 'team-3',
        name: 'Muhammad Rizky Setiawan',
        linkedin: 'https://www.linkedin.com/in/muhammadrizky-setiawan/',
      },
    ],
    timeline:
      'Completed in 5 weeks, from wireframing to delivery of interactive design assets.',
    documentations: [
      {
        id: 'doc-1',
        image: '/assets/project-img/Inconnect/1.webp',
      },
      {
        id: 'doc-2',
        image: '/assets/project-img/Inconnect/2.webp',
      },
      {
        id: 'doc-3',
        image: '/assets/project-img/Inconnect/3.webp',
      },
      {
        id: 'doc-4',
        image: '/assets/project-img/Inconnect/4.webp',
      },
      {
        id: 'doc-5',
        image: '/assets/project-img/Inconnect/5.webp',
      },
      {
        id: 'doc-6',
        image: '/assets/project-img/Inconnect/6.webp',
      },
      {
        id: 'doc-7',
        image: '/assets/project-img/Inconnect/7.webp',
      },
      {
        id: 'doc-8',
        image: '/assets/project-img/Inconnect/8.webp',
      },
      {
        id: 'doc-9',
        image: '/assets/project-img/Inconnect/9.webp',
      },
    ],
  },
];

export const DEFAULT_PROJECT = PROJECTS_DATA[0];