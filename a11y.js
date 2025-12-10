// --- ACCESSIBILITY PANEL FUNCTIONS ---
let a11ySettings = {
    textSize: 0,
    lineHeight: 0,
    dyslexicFont: false,
    highContrast: false,
    reducedMotion: false,
    enhancedFocus: false,
    language: 'en'
};

// Load saved settings on init
try {
    const saved = localStorage.getItem('a11ySettings');
    if (saved) {
        a11ySettings = { ...a11ySettings, ...JSON.parse(saved) };
    }
} catch(e) { console.log('Could not load a11y settings'); }

function saveSettings() {
    try {
        localStorage.setItem('a11ySettings', JSON.stringify(a11ySettings));
    } catch(e) { console.log('Could not save a11y settings'); }
}

function toggleA11yPanel() {
    const panel = document.getElementById('a11y-panel');
    panel.classList.toggle('open');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function adjustTextSize(delta) {
    a11ySettings.textSize += delta;
    a11ySettings.textSize = Math.max(-6, Math.min(12, a11ySettings.textSize));
    document.documentElement.style.fontSize = (100 + a11ySettings.textSize) + '%';
    saveSettings();
}

function resetTextSize() {
    a11ySettings.textSize = 0;
    document.documentElement.style.fontSize = '100%';
    saveSettings();
}

function adjustLineHeight(delta) {
    a11ySettings.lineHeight += delta;
    a11ySettings.lineHeight = Math.max(-0.4, Math.min(1, a11ySettings.lineHeight));
    document.body.style.lineHeight = (1.6 + a11ySettings.lineHeight);
    saveSettings();
}

function resetLineHeight() {
    a11ySettings.lineHeight = 0;
    document.body.style.lineHeight = '';
    saveSettings();
}

function toggleDyslexicFont() {
    a11ySettings.dyslexicFont = !a11ySettings.dyslexicFont;
    document.body.classList.toggle('dyslexic-font', a11ySettings.dyslexicFont);
    const btn = document.getElementById('dyslexic-toggle');
    if (btn) btn.classList.toggle('active', a11ySettings.dyslexicFont);
    saveSettings();
}

function toggleHighContrast() {
    a11ySettings.highContrast = !a11ySettings.highContrast;
    document.body.classList.toggle('high-contrast', a11ySettings.highContrast);
    const btn = document.getElementById('contrast-toggle');
    if (btn) btn.classList.toggle('active', a11ySettings.highContrast);
    saveSettings();
}

function toggleReducedMotion() {
    a11ySettings.reducedMotion = !a11ySettings.reducedMotion;
    document.body.classList.toggle('reduced-motion', a11ySettings.reducedMotion);
    const btn = document.getElementById('motion-toggle');
    if (btn) btn.classList.toggle('active', a11ySettings.reducedMotion);
    saveSettings();
}

function toggleFocusHighlight() {
    a11ySettings.enhancedFocus = !a11ySettings.enhancedFocus;
    document.body.classList.toggle('enhanced-focus', a11ySettings.enhancedFocus);
    const btn = document.getElementById('focus-toggle');
    if (btn) btn.classList.toggle('active', a11ySettings.enhancedFocus);
    saveSettings();
}

function applyAllSettings() {
    if (a11ySettings.textSize !== 0) {
        document.documentElement.style.fontSize = (100 + a11ySettings.textSize) + '%';
    }
    if (a11ySettings.lineHeight !== 0) {
        document.body.style.lineHeight = (1.6 + a11ySettings.lineHeight);
    }
    if (a11ySettings.dyslexicFont) {
        document.body.classList.add('dyslexic-font');
    }
    if (a11ySettings.highContrast) {
        document.body.classList.add('high-contrast');
    }
    if (a11ySettings.reducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    if (a11ySettings.enhancedFocus) {
        document.body.classList.add('enhanced-focus');
    }
    // Update button states after DOM loads
    setTimeout(() => {
        document.querySelectorAll('.a11y-btn[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === a11ySettings.language);
        });
        if (a11ySettings.dyslexicFont) document.getElementById('dyslexic-toggle')?.classList.add('active');
        if (a11ySettings.highContrast) document.getElementById('contrast-toggle')?.classList.add('active');
        if (a11ySettings.reducedMotion) document.getElementById('motion-toggle')?.classList.add('active');
        if (a11ySettings.enhancedFocus) document.getElementById('focus-toggle')?.classList.add('active');
        
        // Apply saved language
        if (a11ySettings.language !== 'en') {
            setLanguage(a11ySettings.language);
        }
    }, 100);
}

function resetAllA11y() {
    a11ySettings = {
        textSize: 0,
        lineHeight: 0,
        dyslexicFont: false,
        highContrast: false,
        reducedMotion: false,
        enhancedFocus: false,
        language: 'en'
    };
    document.documentElement.style.fontSize = '';
    document.body.style.lineHeight = '';
    document.body.classList.remove('dyslexic-font', 'high-contrast', 'reduced-motion', 'enhanced-focus');
    document.querySelectorAll('.a11y-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.a11y-btn[data-lang="en"]')?.classList.add('active');
    saveSettings();
    // Reset translation
    setLanguage('en');
}

// --- COMPREHENSIVE TRANSLATION SYSTEM ---
// Store original text content for restoration
let originalTexts = new Map();
let translationCache = new Map();

// Simple English dictionary - comprehensive translations
const simpleEnglishDict = {
    // Navigation & UI
    "Browse Tools": "See Our Tools",
    "Our Values": "What We Believe",
    "Mission Control": "Our Goals",
    "Playground": "Try It Out",
    "Learn More": "Read More",
    "Get Involved": "Join Us",
    "Contact Team": "Send Us a Message",
    "GitHub": "Our Code",
    "Terms & License": "Rules & Rights",
    
    // Hero section
    "The Community AI Project": "Community AI Help",
    "Regenerate Identity": "Make New Name",
    "decentralized coalition": "group working together",
    "open-source digital infrastructure": "free computer tools everyone can use",
    "reclaim the future": "take back control",
    
    // Values
    "Climate Justice Seeking": "Helping the Planet",
    "We prioritize locally-run LLMs over frontier models to reduce carbon footprint and environmental impact.": "We use smaller computer programs that use less energy and help the Earth.",
    "Radical Openness": "Being Open and Honest",
    "No black boxes. Anyone can audit our code. Trust is earned through transparency.": "Anyone can see how our tools work. We hide nothing. Trust comes from being open.",
    "Human Centric": "People Come First",
    "AI should serve to amplify human connection and civic action, not replace it.": "Computers should help people connect and do good things, not take over.",
    "Community Owned": "Owned by the Community",
    "We believe neighborhoods should own their digital data just as they own their physical spaces.": "Your neighborhood should control its own computer information, just like it controls its buildings and parks.",
    "Accessible by Default": "Easy for Everyone to Use",
    "We design for disabilities and language barriers first, ensuring no neighbor is left behind.": "We make tools that work for people with disabilities and who speak different languages. No one is left out.",
    "Sustainable Tech": "Technology That Lasts",
    "We build lightweight, resilient tools that run on old hardware and don't require expensive upgrades.": "We make tools that work on older computers and don't cost a lot of money.",
    
    // Mission section
    "Why AI?": "Why Use Computers This Way?",
    "Corporate AI extracts value; Community AI creates value.": "Big company computers take from communities. Our computers give back to communities.",
    "Our Means": "How We Do It",
    "Open Source models": "free tools anyone can check",
    "Local-First deployment": "tools that work on your own computer",
    "Our Ends": "What We Want",
    "stronger citizens": "people who can do more",
    
    // Process page
    "Our Methods": "How We Work",
    "Play as Practice": "Learning by Playing",
    "curiosity-driven development": "building things because we're curious",
    "Micro-Prototyping": "Making Small Test Versions",
    "AI as Tool, Not Author": "AI Helps, Humans Decide",
    
    // Common phrases
    "Learn More About Our Values": "Read More About What We Believe",
    "Learn More About Our Methods": "Read More About How We Work", 
    "Learn More About Our Mission": "Read More About Our Goals",
    "Code Meets Concrete": "Computer Ideas Meet Real Life",
    "The Builders Network": "The People Who Build This",
    "AI Playground": "Try AI Tools Here",
    
    // Footer
    "Makers & Shakers": "People Who Made This",
    "Moral Compass": "What's Right and Wrong"
};

// Spanish translations
const spanishDict = {
    "The Community AI Project": "El Proyecto de IA Comunitaria",
    "Browse Tools": "Ver Herramientas",
    "Our Values": "Nuestros Valores",
    "Mission Control": "Control de Misión",
    "Playground": "Zona de Pruebas",
    "Get Involved": "Participa",
    "Contact Team": "Contactar Equipo",
    "Climate Justice Seeking": "Buscando Justicia Climática",
    "Radical Openness": "Apertura Radical",
    "Human Centric": "Centrado en las Personas",
    "Community Owned": "Propiedad de la Comunidad",
    "Accessible by Default": "Accesible por Defecto",
    "Sustainable Tech": "Tecnología Sostenible",
    "Our Methods": "Nuestros Métodos",
    "Learn More About Our Values": "Más Sobre Nuestros Valores",
    "Learn More About Our Methods": "Más Sobre Nuestros Métodos",
    "Learn More About Our Mission": "Más Sobre Nuestra Misión",
    "The Builders Network": "La Red de Constructores",
    "AI Playground": "Zona de Pruebas de IA",
    "Why AI?": "¿Por Qué IA?",
    "Our Means": "Nuestros Medios",
    "Our Ends": "Nuestros Fines",
    "Code Meets Concrete": "El Código Encuentra lo Concreto",
    "Makers & Shakers": "Creadores y Agitadores",
    "Moral Compass": "Brújula Moral",
    "Back to Home": "Volver al Inicio",
    "Return Home": "Volver al Inicio",
    "Our Values are Coded In.": "Nuestros Valores Están en el Código.",
    "Principles that guide every line of code we write.": "Principios que guían cada línea de código que escribimos.",
    // Hero section
    "We are a decentralized coalition of neighbors, coders, and civic leaders. Our project builds open-source digital infrastructure that allows local communities to govern their own data, use AI for public good, and reclaim the future of their cities from big tech monopolies.": "Somos una coalición descentralizada de vecinos, programadores y líderes cívicos. Nuestro proyecto construye infraestructura digital de código abierto que permite a las comunidades locales gobernar sus propios datos, usar IA para el bien público y recuperar el futuro de sus ciudades de los monopolios tecnológicos.",
    "We believe true freedom is not just escaping or avoiding oppression - it is building a world without it. This site has some of our early attempts at building things for a more thoughtful, accessible, and creative democracy.": "Creemos que la verdadera libertad no es solo escapar o evitar la opresión, es construir un mundo sin ella. Este sitio tiene algunos de nuestros primeros intentos de construir cosas para una democracia más reflexiva, accesible y creativa.",
    // Values descriptions
    "We prioritize locally-run LLMs over frontier models to reduce carbon footprint and environmental impact.": "Priorizamos los modelos locales sobre los modelos frontera para reducir la huella de carbono y el impacto ambiental.",
    "No black boxes. Anyone can audit our code. Trust is earned through transparency.": "Sin cajas negras. Cualquiera puede auditar nuestro código. La confianza se gana con transparencia.",
    "AI should serve to amplify human connection and civic action, not replace it.": "La IA debe servir para amplificar la conexión humana y la acción cívica, no reemplazarla.",
    "We believe neighborhoods should own their digital data just as they own their physical spaces.": "Creemos que los vecindarios deben poseer sus datos digitales como poseen sus espacios físicos.",
    "We design for disabilities and language barriers first, ensuring no neighbor is left behind.": "Diseñamos primero para discapacidades y barreras del idioma, asegurando que ningún vecino quede atrás.",
    "We build lightweight, resilient tools that run on old hardware and don't require expensive upgrades.": "Construimos herramientas ligeras y resistentes que funcionan en hardware antiguo y no requieren actualizaciones costosas.",
    // Mission section
    "Corporate AI extracts value; Community AI creates value. We analyze public data at the scale of a government to empower the individual.": "La IA corporativa extrae valor; la IA comunitaria crea valor. Analizamos datos públicos a escala gubernamental para empoderar al individuo.",
    "We build with Open Source models that can be audited by anyone. We prioritize Local-First deployment. Low cost, high privacy.": "Construimos con modelos de código abierto que cualquiera puede auditar. Priorizamos la implementación local. Bajo costo, alta privacidad.",
    "Our goal isn't just \"smarter\" cities, but": "Nuestro objetivo no son solo ciudades más \"inteligentes\", sino",
    "stronger citizens": "ciudadanos más fuertes",
    "Reducing tedious admin so volunteers can focus on action.": "Reduciendo la administración tediosa para que los voluntarios puedan enfocarse en la acción."
};

// Chinese translations
const chineseDict = {
    "The Community AI Project": "社区人工智能项目",
    "Browse Tools": "浏览工具",
    "Our Values": "我们的价值观",
    "Mission Control": "任务控制",
    "Playground": "体验区",
    "Get Involved": "参与进来",
    "Contact Team": "联系团队",
    "Climate Justice Seeking": "追求气候正义",
    "Radical Openness": "彻底开放",
    "Human Centric": "以人为本",
    "Community Owned": "社区所有",
    "Accessible by Default": "默认无障碍",
    "Sustainable Tech": "可持续技术",
    "Our Methods": "我们的方法",
    "Learn More About Our Values": "了解更多关于我们的价值观",
    "Learn More About Our Methods": "了解更多关于我们的方法",
    "Learn More About Our Mission": "了解更多关于我们的使命",
    "The Builders Network": "建设者网络",
    "AI Playground": "AI体验区",
    "Why AI?": "为什么用人工智能？",
    "Our Means": "我们的方式",
    "Our Ends": "我们的目标",
    "Code Meets Concrete": "代码与现实相遇",
    "Makers & Shakers": "创造者与推动者",
    "Moral Compass": "道德指南",
    "Back to Home": "返回首页",
    "Return Home": "返回首页",
    "Our Values are Coded In.": "我们的价值观融入代码。",
    "Principles that guide every line of code we write.": "指导我们每一行代码的原则。",
    // Hero section
    "We are a decentralized coalition of neighbors, coders, and civic leaders. Our project builds open-source digital infrastructure that allows local communities to govern their own data, use AI for public good, and reclaim the future of their cities from big tech monopolies.": "我们是由邻居、程序员和公民领袖组成的去中心化联盟。我们的项目构建开源数字基础设施，使本地社区能够管理自己的数据，利用人工智能为公共利益服务，并从科技巨头垄断中夺回城市的未来。",
    "We believe true freedom is not just escaping or avoiding oppression - it is building a world without it. This site has some of our early attempts at building things for a more thoughtful, accessible, and creative democracy.": "我们相信真正的自由不仅仅是逃避或避免压迫——而是建设一个没有压迫的世界。这个网站展示了我们为建设更加深思熟虑、无障碍和创新的民主而做的早期尝试。",
    // Values descriptions
    "We prioritize locally-run LLMs over frontier models to reduce carbon footprint and environmental impact.": "我们优先使用本地运行的模型而非前沿模型，以减少碳排放和环境影响。",
    "No black boxes. Anyone can audit our code. Trust is earned through transparency.": "没有黑箱。任何人都可以审计我们的代码。信任来自透明。",
    "AI should serve to amplify human connection and civic action, not replace it.": "人工智能应该增强人与人之间的联系和公民行动，而不是取代它。",
    "We believe neighborhoods should own their digital data just as they own their physical spaces.": "我们相信社区应该像拥有实体空间一样拥有其数字数据。",
    "We design for disabilities and language barriers first, ensuring no neighbor is left behind.": "我们首先考虑残障人士和语言障碍，确保没有邻居被落下。",
    "We build lightweight, resilient tools that run on old hardware and don't require expensive upgrades.": "我们构建轻量级、可靠的工具，可在旧硬件上运行，无需昂贵升级。",
    // Mission section
    "Corporate AI extracts value; Community AI creates value. We analyze public data at the scale of a government to empower the individual.": "企业人工智能提取价值；社区人工智能创造价值。我们以政府规模分析公共数据，赋能个人。",
    "We build with Open Source models that can be audited by anyone. We prioritize Local-First deployment. Low cost, high privacy.": "我们使用任何人都可以审计的开源模型。我们优先本地部署。低成本，高隐私。",
    "stronger citizens": "更强大的公民",
    "Reducing tedious admin so volunteers can focus on action.": "减少繁琐的行政工作，让志愿者专注于行动。"
};

// Portuguese translations
const portugueseDict = {
    "The Community AI Project": "Projeto de IA Comunitária",
    "Browse Tools": "Ver Ferramentas",
    "Our Values": "Nossos Valores",
    "Mission Control": "Controle de Missão",
    "Get Involved": "Participe",
    "Climate Justice Seeking": "Buscando Justiça Climática",
    "Radical Openness": "Abertura Radical",
    "Human Centric": "Centrado nas Pessoas",
    "Community Owned": "Propriedade da Comunidade",
    "Accessible by Default": "Acessível por Padrão",
    "Sustainable Tech": "Tecnologia Sustentável",
    "Our Methods": "Nossos Métodos",
    "The Builders Network": "Rede de Construtores",
    "Makers & Shakers": "Criadores e Inovadores",
    "Moral Compass": "Bússola Moral"
};

// Haitian Creole translations
const haitianDict = {
    "The Community AI Project": "Pwojè AI Kominotè a",
    "Browse Tools": "Gade Zouti yo",
    "Our Values": "Valè Nou yo",
    "Mission Control": "Kontwòl Misyon",
    "Get Involved": "Patisipe",
    "Climate Justice Seeking": "Chèche Jistis Klima",
    "Radical Openness": "Ouvèti Total",
    "Human Centric": "Moun an Premye",
    "Community Owned": "Kominotè Posede",
    "Accessible by Default": "Aksesib pou Tout Moun",
    "Sustainable Tech": "Teknoloji Dirab",
    "Our Methods": "Metòd Nou yo",
    "The Builders Network": "Rezo Konstiktè yo",
    "Makers & Shakers": "Kreyatè ak Inovatè",
    "Moral Compass": "Konpa Moral"
};

// Vietnamese translations
const vietnameseDict = {
    "The Community AI Project": "Dự án AI Cộng đồng",
    "Browse Tools": "Xem Công cụ",
    "Our Values": "Giá trị của chúng tôi",
    "Mission Control": "Điều khiển Nhiệm vụ",
    "Get Involved": "Tham gia",
    "Climate Justice Seeking": "Tìm kiếm Công bằng Khí hậu",
    "Radical Openness": "Cởi mở Triệt để",
    "Human Centric": "Lấy Con người làm Trung tâm",
    "Community Owned": "Thuộc sở hữu Cộng đồng",
    "Accessible by Default": "Dễ tiếp cận Mặc định",
    "Sustainable Tech": "Công nghệ Bền vững",
    "Our Methods": "Phương pháp của chúng tôi",
    "The Builders Network": "Mạng lưới Xây dựng",
    "Makers & Shakers": "Người Tạo và Người Đổi mới",
    "Moral Compass": "La bàn Đạo đức"
};

// Russian translations
const russianDict = {
    "The Community AI Project": "Проект Общественного ИИ",
    "Browse Tools": "Просмотр Инструментов",
    "Our Values": "Наши Ценности",
    "Mission Control": "Центр Управления",
    "Get Involved": "Присоединяйтесь",
    "Climate Justice Seeking": "За Климатическую Справедливость",
    "Radical Openness": "Радикальная Открытость",
    "Human Centric": "Человек в Центре",
    "Community Owned": "Собственность Сообщества",
    "Accessible by Default": "Доступность по Умолчанию",
    "Sustainable Tech": "Устойчивые Технологии",
    "Our Methods": "Наши Методы",
    "The Builders Network": "Сеть Строителей",
    "Makers & Shakers": "Создатели и Новаторы",
    "Moral Compass": "Моральный Компас"
};

const translationDicts = {
    'simple': simpleEnglishDict,
    'es': spanishDict,
    'zh': chineseDict,
    'pt': portugueseDict,
    'ht': haitianDict,
    'vi': vietnameseDict,
    'ru': russianDict
};

function setLanguage(lang) {
    // Update button states
    document.querySelectorAll('.a11y-btn[data-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    a11ySettings.language = lang;
    saveSettings();

    // Restore original texts first
    if (originalTexts.size > 0) {
        originalTexts.forEach((original, element) => {
            if (element && element.parentNode) {
                element.textContent = original;
            }
        });
    }

    if (lang === 'en') {
        return;
    }

    const dict = translationDicts[lang];
    if (!dict) {
        console.log('No dictionary for language:', lang);
        return;
    }

    document.body.classList.add('translating');

    // Get all text nodes in the document
    const textElements = [];
    
    // Get elements with text content
    const selectors = 'h1, h2, h3, h4, h5, h6, p, a, button, span, li, label, .nav-btn, .hero-explainer, .m-text, .b-card p, .value-item-mod p, .value-item-mod h4, .content-text p, .content-text h2, .process-step span, .step-label, .workflow-step span';
    
    document.querySelectorAll(selectors).forEach(el => {
        // Skip elements inside the accessibility panel
        if (el.closest('#a11y-panel') || el.closest('#a11y-toggle')) return;
        // Skip script and style tags
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
        // Skip elements with no direct text
        if (!el.childNodes.length) return;
        
        textElements.push(el);
    });

    // Process each element
    textElements.forEach(el => {
        // Process direct text nodes
        el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                const originalText = node.textContent;
                
                // Store original if not already stored
                if (!originalTexts.has(node)) {
                    originalTexts.set(node, originalText);
                }
                
                // Try to find matching translation
                let translated = originalText;
                const trimmedText = originalText.trim();
                
                // Check for exact match first
                if (dict[trimmedText]) {
                    translated = originalText.replace(trimmedText, dict[trimmedText]);
                } else {
                    // Check for partial matches
                    for (const [eng, trans] of Object.entries(dict)) {
                        if (trimmedText.includes(eng)) {
                            translated = translated.replace(eng, trans);
                        }
                    }
                }
                
                if (translated !== originalText) {
                    node.textContent = translated;
                }
            }
        });
    });

    setTimeout(() => {
        document.body.classList.remove('translating');
    }, 300);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    applyAllSettings();
});

// Also try to apply immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applyAllSettings();
}
