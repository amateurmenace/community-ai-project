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
        id: "control-z",
        category: "creative",
        badge: "Free Toolkit",
        icon: "clapperboard",
        title: "control-z",
        description: "Free, open-source cleaning, prepping, and finishing tools for the free version of DaVinci Resolve — a whole finishing pipeline (noise reduction, contrast, resampling, and more), not a plugin pile. Built for the community media centers, journalists, filmmakers, and artists the market skips. Start with Hush, stay for the pipeline.",
        techStack: ["OpenFX", "DaVinci Resolve", "Open Source"],
        links: { open: "https://control-z.org" }
    },
    {
        id: "driftwood",
        category: "creative",
        badge: "Beta Board",
        icon: "waves",
        title: "Driftwood",
        description: "Software drifts — every time you ship, something works loose and floats downstream. Driftwood is a small, self-contained Kanban board for running a beta without losing the plot: catch the bugs, feedback, and loose ends before they drift away.",
        techStack: ["Open Source", "Kanban", "Self-Contained"],
        links: { open: "https://cmd-z.com/home" }
    },
    {
        id: "command-z",
        category: "creative",
        badge: "Undo Button",
        icon: "undo-2",
        title: "Command-Z",
        description: "Built on a simple idea: the world needs an undo button. An open-source family of free civic and creative tools that let communities reverse extractive defaults and take back the technology they rely on.",
        techStack: ["Open Source", "Civic Tech", "Undo"],
        links: { open: "https://command-z.org" }
    },
    {
        id: "hush-speak",
        category: "creative",
        badge: "Open Source",
        icon: "audio-waveform",
        title: "Hush / Speak",
        description: "An attempt at the world's best free video noise reducer — open-source denoising (Hush) and film emulation (Speak) for the free edition of DaVinci Resolve, so paywalls stop deciding who gets to make great-looking work. (<a href='https://amateurmenace.github.io/Hush-OpenNR/whitepaper.html' target='_blank' rel='noopener' style='color:var(--primary-green); font-weight:700; text-decoration:underline;'>read the design study</a>)",
        techStack: ["OpenFX", "DaVinci Resolve", "Denoising"],
        links: { open: "https://amateurmenace.github.io/Hush-OpenNR/" }
    },
    {
        id: "neighborhood-ai",
        category: "agents",
        badge: ["Local LLM", " Newest!"],

        icon: "message-square-share",
        title: "Neighborhood AI",
        description: "An app for fine tuning + launching constitutional local AI models for communities.",
        techStack: ["RAG", "LLM", "Vector DB", "Ollama"],
        links: { open: "https://neighborhood-ai.netlify.app" }
    },
    {
        id: "artificial",
        category: "agents",
        badge: "Experimental",
        icon: "brain-circuit",
        title: "Artificial: the Game of AI",
        description: "A three-part game for learning, practicing, and critiquing AI.",
        techStack: ["AI Literacy", "Simulation", "Game",],
        links: { open: "https://artificial.weirdmachine.org/" }
    },
     {
        id: "civic-agent",
        category: "agents",
        badge: "Beta",
        icon: "bot-message-square",
        title: "Commit: a localized AI Agent for cities + towns",
        description: "An experimental agental AI chatbot and get-things-done tool that helps you take real-world actions in your community.",
        techStack: ["AI Agent", "Local LLM", "Vibe Coding"],
        links: { open: "https://commit-ai-civic-agent-390658405112.us-west1.run.app/" }
    },
    {
        id: "highlighter",
        category: "meetings",
        badge: "Live",
        icon: "video", 
        title: "Community Highlighter",
        description: "Paste a YouTube URL of a public meeting and get a searchable, speaker-diarized transcript synced to the video.",
        techStack: ["Python", "FFMPEG", "React"],
        links: { open: "https://community-highlighter.onrender.com/" }
    },
    {
        id: "captioner",
        category: "accessibility",
        badge: "Web Tool",
        featured: true,
        icon: "subtitles",
        title: "Community Captioner",
        description: "Free browser-based tool to generate real-time open captions for OBS live streams without expensive hardware.",
        techStack: ["Whisper", "WebSpeech API", "OBS"],
        links: { open: "https://caption.weirdmachine.org/" }
    },
    {
        id: "documenter",
        category: "docs",
        badge: "Anti-Bureaucracy",
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
        id: "anti-ai",
        category: "agents",
        badge: "Realism Exposure Therapy",
        icon: "file-search",
        title: "Anti-AI",
        description: "A tool for critiquing and counteracting the negative impacts of AI in civic contexts.",
        techStack: ["AI Literacy", "Critical Thinking", "Community Engagement"],
        links: { open: "https://anti-ai-89463051012.us-west1.run.app/" }
    }
];