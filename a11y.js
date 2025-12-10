/* a11y.js - Accessibility Functions */

function toggleA11yPanel() {
    const panel = document.getElementById('a11y-panel');
    panel.classList.toggle('open');
}

let currentTextSize = 18;
function adjustTextSize(delta) {
    currentTextSize += delta;
    currentTextSize = Math.max(12, Math.min(28, currentTextSize));
    document.documentElement.style.setProperty('--base-font-size', currentTextSize + 'px');
}

function resetTextSize() {
    currentTextSize = 18;
    document.documentElement.style.setProperty('--base-font-size', '18px');
}

let currentLineHeight = 1.8;
function adjustLineHeight(delta) {
    currentLineHeight += delta;
    currentLineHeight = Math.max(1.2, Math.min(3, currentLineHeight));
    document.body.style.lineHeight = currentLineHeight;
}

function resetLineHeight() {
    currentLineHeight = 1.8;
    document.body.style.lineHeight = 1.8;
}

function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic-font');
    const btn = document.getElementById('dyslexic-toggle');
    if (btn) btn.classList.toggle('active');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const btn = document.getElementById('contrast-toggle');
    if (btn) btn.classList.toggle('active');
}

function toggleReducedMotion() {
    document.body.classList.toggle('reduced-motion');
    const btn = document.getElementById('motion-toggle');
    if (btn) btn.classList.toggle('active');
}

function toggleFocusHighlight() {
    document.body.classList.toggle('enhanced-focus');
    const btn = document.getElementById('focus-toggle');
    if (btn) btn.classList.toggle('active');
}

function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (lang !== 'en' && lang !== 'simple') {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
        }
    }
}

function resetAllA11y() {
    resetTextSize();
    resetLineHeight();
    document.body.classList.remove('dyslexic-font', 'high-contrast', 'reduced-motion', 'enhanced-focus');
    document.querySelectorAll('.a11y-btn').forEach(btn => btn.classList.remove('active'));
    const enBtn = document.querySelector('[data-lang="en"]');
    if (enBtn) enBtn.classList.add('active');
    setLanguage('en');
}
