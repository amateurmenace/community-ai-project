/* projects.js 
   
   HOW TO ADD A NEW PROJECT:
   1. Copy the block between { ... },
   2. Paste it at the top of the array.
   3. Update the fields.
   
   Categories: 'meetings', 'docs', 'agents', 'accessibility'
   Icons: Use names from lucide.dev (e.g., 'globe', 'zap', 'code')
*/

const projectsData = [
    {
        id: "highlighter",
        category: "meetings",
        badge: "Live",
        icon: "video", 
        title: "Community Highlighter",
        description: "Paste a YouTube URL of a public meeting and get a searchable, speaker-diarized transcript synced to the video.",
        techStack: ["Python", "Whisper", "React"],
        links: { open: "https://community-highlighter.onrender.com/" }
    },
    {
        id: "captioner",
        category: "accessibility",
        badge: "Web Tool",
        icon: "subtitles",
        title: "Community Captioner",
        description: "Free browser-based tool to generate real-time open captions for OBS live streams without expensive hardware.",
        techStack: ["JS", "WebSpeech API", "OBS"],
        links: { open: "https://community-captioner.netlify.app/" }
    },
    {
        id: "documenter",
        category: "docs",
        badge: "New",
        icon: "file-search",
        title: "Civic Documenter",
        description: "Turn messy PDF attachments from municipal agendas into structured, readable data using AI parsing.",
        techStack: ["OCR", "LLM", "Vector DB"],
        links: { open: "https://documenter.weirdmachine.org/" }
    },
    {
        id: "translator",
        category: "accessibility",
        badge: null,
        icon: "languages",
        title: "Civic Translator",
        description: "Instantly translate complex civic documents into multiple community languages while preserving formatting.",
        techStack: ["AI Translation", "PDF parsing"],
        links: { open: "https://translator.weirdmachine.org/" }
    },
    {
        id: "civic-agent",
        category: "agents",
        badge: "Beta",
        featured: true,
        icon: "bot-message-square",
        title: "Commit: the Community AI Agent for Brookline, MA",
        description: "An experimental agental AI chatbot that helps you take real-world actions in your community.",
        techStack: ["AI Agent", "LangChain", "GCP"],
        links: { open: "https://commit-ai-civic-agent-390658405112.us-west1.run.app/" }
    },
    {
        id: "artificial",
        category: "agents",
        badge: "Experimental",
        icon: "brain-circuit",
        title: "Artificial: the Game of AI",
        description: "A three-part game for learning, practicing, and critiquing AI.",
        techStack: ["AI Agents", "Simulation"],
        links: { open: "https://artificial.weirdmachine.org/" }
    }
];