document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');

    if (menuToggle && mainNav && navOverlay) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            navOverlay.classList.toggle('is-open');
        });

        navOverlay.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            navOverlay.classList.remove('is-open');
        });
    }

    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Function to apply theme
    const applyTheme = (theme) => {
        const iconSun = document.querySelector('#theme-switcher .icon-sun');
        const iconMoon = document.querySelector('#theme-switcher .icon-moon');

        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (iconSun) iconSun.style.display = 'none';
            if (iconMoon) iconMoon.style.display = 'inline-block';
        } else {
            body.removeAttribute('data-theme');
            if (iconSun) iconSun.style.display = 'inline-block';
            if (iconMoon) iconMoon.style.display = 'none';
        }
    };

    // Function to toggle theme
    const toggleTheme = () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        } else {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        }
    };

    // Check saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Attach handler to button
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }

    // Interactive Diagram Tooltips (generalized)
    document.querySelectorAll('map[name$="-map"]').forEach(mapElement => {
        const mapName = mapElement.getAttribute('name');
        const tooltipId = `diagram-tooltip-${mapName.replace('-map', '')}`;
        const tooltip = document.getElementById(tooltipId);
        const areas = mapElement.querySelectorAll('area');

        if (tooltip && areas.length > 0) {
            areas.forEach(area => {
                area.addEventListener('mouseover', (e) => {
                    const tooltipText = area.getAttribute('data-tooltip-text');
                    if (tooltipText) {
                        tooltip.innerHTML = tooltipText;
                        tooltip.classList.add('is-active');
                    }
                });

                area.addEventListener('mousemove', (e) => {
                    // Position the tooltip relative to the image, not the page
                    // Need to find the image associated with this map
                    const img = document.querySelector(`img[usemap="#${mapName}"]`);
                    if (img) {
                        const imgRect = img.getBoundingClientRect();
                        const wrapperRect = img.parentElement.getBoundingClientRect(); // assuming parent is .interactive-diagram-container

                        // Calculate position relative to the wrapper and then add 15px offset
                        tooltip.style.left = (e.clientX - wrapperRect.left + 15) + 'px';
                        tooltip.style.top = (e.clientY - wrapperRect.top + 15) + 'px';
                    } else { // Fallback if image not found, position relative to page
                         tooltip.style.left = e.pageX + 15 + 'px';
                         tooltip.style.top = e.pageY + 15 + 'px';
                    }
                });

                area.addEventListener('mouseout', () => {
                    tooltip.classList.remove('is-active');
                });
            });
        }
    });

    // CI Calculator
    const calculateCiBtn = document.getElementById('calculate-ci');
    if (calculateCiBtn) {
        calculateCiBtn.addEventListener('click', () => {
            const heightInput = document.getElementById('height');
            const weightInput = document.getElementById('weight');
            const coInput = document.getElementById('co');
            const resultDiv = document.getElementById('ci-result');

            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);
            const co = parseFloat(coInput.value);

            if (height > 0 && weight > 0 && co > 0) {
                // Mosteller formula for BSA
                const bsa = Math.sqrt((height * weight) / 3600);
                const ci = co / bsa;
                resultDiv.innerHTML = `Body Surface Area (BSA): ${bsa.toFixed(2)} m²<br>Cardiac Index (CI): ${ci.toFixed(2)} L/min/m²`;
            } else {
                resultDiv.innerHTML = "Please enter valid values for height, weight, and cardiac output.";
            }
        });
    }

    // Interactive Checklist
    const setupChecklist = document.getElementById('setup-checklist');
    if (setupChecklist) {
        const checkboxes = setupChecklist.querySelectorAll('input[type="checkbox"]');

        // Load saved state
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('completed');
            }
        });

        // Add event listeners
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    e.target.parentElement.classList.add('completed');
                    localStorage.setItem(e.target.id, 'true');
                } else {
                    e.target.parentElement.classList.remove('completed');
                    localStorage.setItem(e.target.id, 'false');
                }
            });
        });
    }

    // Add collapsible sidebar functionality
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.id = 'sidebar-toggle';
    sidebarToggle.innerHTML = '«';
    sidebarToggle.title = 'Toggle sidebar';
    document.body.appendChild(sidebarToggle);

    const mainNavForSidebar = document.getElementById('main-nav');
    
    if (mainNavForSidebar && sidebarToggle) {
        // Add click handler to toggle sidebar collapse
        sidebarToggle.addEventListener('click', () => {
            mainNavForSidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('visible');
            
            // Update toggle button text
            if (mainNavForSidebar.classList.contains('collapsed')) {
                sidebarToggle.textContent = '»';
            } else {
                sidebarToggle.textContent = '«';
            }
        });
        
        // Add click handler to collapsed menu indicator to expand
        const collapsedMenuIndicator = document.querySelector('.collapsed-menu-indicator');
        if (collapsedMenuIndicator) {
            collapsedMenuIndicator.addEventListener('click', () => {
                mainNavForSidebar.classList.remove('collapsed');
                sidebarToggle.classList.remove('visible');
                sidebarToggle.textContent = '«';
            });
        }
    }
// Auto-initialize language support after the original DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    if (typeof languageSupport !== 'undefined') {
        languageSupport.init();
    }
    
    // Ensure all details elements start as closed
    document.querySelectorAll('details').forEach(detail => {
        detail.removeAttribute('open');
    });
});
});
// Language support functionality
const languageSupport = {
    currentLang: 'en',
    // This will be populated with translations when content is loaded
    translations: {
        en: {},
        he: {},
        ru: {}
    },
    
    // Initialize language support
    init: function() {
        this.loadCurrentLanguage();
        this.setupLanguageToggle();
        this.translatePage();
    },
    
    // Load current language from localStorage or default to 'en'
    loadCurrentLanguage: function() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && ['en', 'he', 'ru'].includes(savedLang)) {
            this.currentLang = savedLang;
        } else {
            // Default to English if no preference is set
            this.currentLang = 'en';
            localStorage.setItem('preferredLanguage', 'en');
        }
    },
    
    // Set up the language toggle UI
    setupLanguageToggle: function() {
        // Create language toggle button if it doesn't exist
        let langToggle = document.getElementById('language-toggle');
        if (!langToggle) {
            langToggle = document.createElement('button');
            langToggle.id = 'language-toggle';
            langToggle.className = 'language-toggle';
            langToggle.setAttribute('aria-label', 'Switch language');
            langToggle.innerHTML = '🌐 EN';
            document.body.appendChild(langToggle);
            
            // Add click handler
            langToggle.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
        
        // Update button text based on current language
        this.updateLanguageButton();
    },
    
    // Switch to next language in sequence
    switchLanguage: function() {
        const languages = ['en', 'he', 'ru'];
        const currentIndex = languages.indexOf(this.currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        this.currentLang = languages[nextIndex];
        
        localStorage.setItem('preferredLanguage', this.currentLang);
        this.updateLanguageButton();
        this.translatePage();
        this.updateHtmlLangAttribute();
    },
    
    // Update the language toggle button text
    updateLanguageButton: function() {
        const langNames = {
            'en': 'EN',
            'he': 'HE',
            'ru': 'RU'
        };
        
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.innerHTML = `🌐 ${langNames[this.currentLang]}`;
        }
    },
    
    // Update the html lang attribute
    updateHtmlLangAttribute: function() {
        document.documentElement.lang = this.currentLang;
    },
    
    // Translate the current page
    translatePage: function() {
        // Update html lang attribute
        this.updateHtmlLangAttribute();
        
        // For static content, we'll add language-specific classes to trigger different styling
        // For dynamic content, we'll need to implement actual translation
        document.body.setAttribute('data-lang', this.currentLang);
        
        // Update text direction for Hebrew
        if (this.currentLang === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
        }
        
        // Perform content translation
        this.translateContent();
        
        // Trigger custom event for other parts of the application to handle
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    },
    
    // Translate page content using browser's built-in translation
    translateContent: function() {
        // For now, we'll use a simulated translation approach
        // In a real implementation, we would either:
        // 1. Use pre-translated content from a data attribute
        // 2. Use a translation API
        // 3. Use the browser's built-in translation feature
        
        // For this implementation, we'll use a simulated approach where we store original content
        // and use a translation function when needed
        
        // Store original content if not already stored
        if (!document.body.hasAttribute('data-original-content')) {
            this.storeOriginalContent();
        }
        
        // If switching to a non-English language, apply simulated translation
        // (In a real implementation, this would be actual translated text)
        if (this.currentLang !== 'en') {
            this.applySimulatedTranslation(this.currentLang);
        } else {
            // If switching back to English, restore original content
            this.restoreOriginalContent();
        }
    },
    
    // Store original content in data attributes
    storeOriginalContent: function() {
        // Store original text content for all elements that might be translated
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
        
        translatableElements.forEach(element => {
            // Store original text content
            if (element.children.length === 0) { // Only for elements without child elements
                element.setAttribute('data-original-text', element.textContent.trim());
            } else {
                // For elements with children, store innerHTML
                element.setAttribute('data-original-html', element.innerHTML);
            }
        });
        
        document.body.setAttribute('data-original-content', 'true');
    },
    
    // Restore original English content
    restoreOriginalContent: function() {
        const translatableElements = document.querySelectorAll('[data-original-text], [data-original-html]');
        
        translatableElements.forEach(element => {
            if (element.hasAttribute('data-original-text')) {
                element.textContent = element.getAttribute('data-original-text');
            } else if (element.hasAttribute('data-original-html')) {
                element.innerHTML = element.getAttribute('data-original-html');
            }
        });
    },
    
    // Apply translation using browser's translate functionality or simulated approach
    applySimulatedTranslation: function(targetLang) {
        // For a real-world implementation, we would use:
        // 1. Pre-translated content stored in the page
        // 2. A translation API
        // 3. Or the browser's built-in translation feature
        
        // For this implementation, we'll use the browser's translate attribute
        // to indicate to browser translation tools which language to translate to
        
        // First, ensure all content has the translate attribute set to yes
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.children.length === 0 && element.textContent.trim() !== '') {
                // For elements without children, we'll use the translate attribute
                element.setAttribute('translate', 'yes');
            }
        });
        
        // Add a class to body to indicate active translation
        document.body.classList.add('translated-content');
        
        // Special handling for Hebrew - ensure right-to-left text direction
        if (this.currentLang === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
        }
        
        // Now we'll implement the actual translation using Content.md
        this.translateUsingContentMD(this.currentLang);
    },
    
    // Translate content using Content.md as translation source
    translateUsingContentMD: async function(targetLang) {
        // Fetch the Content.md file to use as translation source
        try {
            const response = await fetch('../Content.md');
            const content = await response.text();
            
            // Store original content if not already stored
            if (!document.body.hasAttribute('data-original-content-stored')) {
                this.storeOriginalContent();
                document.body.setAttribute('data-original-content-stored', 'true');
            }
            
            // Process translation based on target language
            if (targetLang === 'ru') {
                // Apply Russian translation from Content.md
                await this.applyTranslationFromContent(content, 'ru');
            } else if (targetLang === 'he') {
                // Apply Hebrew translation from Content.md
                await this.applyTranslationFromContent(content, 'he');
            } else {
                // For English or any other language, restore original content
                this.restoreOriginalContent();
            }
            
            // Update document language attribute
            document.documentElement.lang = targetLang;
            
            // Update direction for Hebrew
            if (targetLang === 'he') {
                document.body.setAttribute('dir', 'rtl');
            } else {
                document.body.removeAttribute('dir');
            }
            
        } catch (error) {
            console.warn('Could not load Content.md for translation:', error);
            // Fallback to browser's own translation
            this.fallbackToBrowserTranslation(targetLang);
        }
    },
    
    // Apply translation from Content.md based on language
    applyTranslationFromContent: async function(content, targetLang) {
        // Parse Content.md to extract language-specific content
        // Since Content.md already contains Russian text, we'll implement a pattern-based approach
        
        if (targetLang === 'ru') {
            // For Russian, we'll use the fact that Content.md already contains Russian text
            // In a real implementation, Content.md would have structured language sections
            await this.applyRussianTranslation(content);
        } else if (targetLang === 'he') {
            // For Hebrew, check if Hebrew content exists in Content.md
            await this.applyHebrewTranslation(content);
        }
    },
    
    // Apply Russian translation
    applyRussianTranslation: async function(content) {
        // In a real implementation, we would parse Content.md for Russian sections
        // For now, we'll implement a simulated approach that demonstrates how it would work
        
        // Identify elements that need translation
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
        
        // For demonstration, we'll create a simple mapping based on Content.md structure
        // In a real implementation, this would be more sophisticated
        const translationMap = this.createRussianTranslationMap();
        
        translatableElements.forEach(element => {
            if (element.hasAttribute('data-original-text')) {
                const originalText = element.getAttribute('data-original-text');
                if (translationMap[originalText]) {
                    element.textContent = translationMap[originalText];
                }
            } else if (element.hasAttribute('data-original-html')) {
                const originalHtml = element.getAttribute('data-original-html');
                if (translationMap[originalHtml]) {
                    element.innerHTML = translationMap[originalHtml];
                }
            }
        });
    },
    
    // Apply Hebrew translation
    applyHebrewTranslation: async function(content) {
        // Check if Hebrew content exists in Content.md
        const hebrewPattern = /[\u0590-\u05FF\uFB00-\uFB4F]/;
        if (hebrewPattern.test(content)) {
            // Apply Hebrew-specific formatting
            document.body.setAttribute('dir', 'rtl');
            
            // In a real implementation, we would extract Hebrew text from Content.md
            const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
            
            // For demonstration, we'll just set the direction
            // In a real implementation, we would have Hebrew translations
        } else {
            // If no Hebrew content found in source, apply RTL direction only
            document.body.setAttribute('dir', 'rtl');
        }
    },
    
    // Create Russian translation map based on Content.md
    createRussianTranslationMap: function() {
        // This would be populated with translations extracted from Content.md
        // For this implementation, we'll create a sample mapping based on common terms
        const translationMap = {
            // Common medical terms and phrases that might appear in the interface
            'PiCCO - Online Manual': 'PiCCO - Онлайн руководство',
            'Global End-Diastolic Volume Index': 'Индекс глобального конца диастолического объема',
            'Extravascular Lung Water Index': 'Индекс внеклеточной легочной воды',
            'Cardiac Index': 'Кардиальный индекс',
            'Systemic Vascular Resistance Index': 'Индекс системного сосудистого сопротивления',
            'Stroke Volume Variation': 'Вариация объема систолического выброса',
            'Pulse Pressure Variation': 'Вариация пульсового давления',
            'Cardiac Function Index': 'Индекс сердечной функции',
            'Global Ejection Fraction': 'Глобальная фракция выброса',
            'Pulmonary Vascular Permeability Index': 'Индекс проницаемости легочных сосудов',
            'Cardiogenic Shock': 'Кардиогенный шок',
            'Septic Shock': 'Септический шок',
            'Hypovolemic Shock': 'Гиповолемический шок',
            'Distributive Shock': 'Дистрибутивный шок',
            'Oxygen Delivery': 'Доставка кислорода',
            'Oxygen Consumption': 'Потребление кислорода',
            'Oxygen Extraction Ratio': 'Коэффициент извлечения кислорода'
        };
        
        // In a real implementation, this would be dynamically generated from Content.md
        return translationMap;
    },
    
    // Store original content for translation purposes
    storeOriginalContent: function() {
        // Store original text content for all elements that might be translated
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
        
        translatableElements.forEach(element => {
            // Store original text content
            if (element.children.length === 0) { // Only for elements without child elements
                element.setAttribute('data-original-text', element.textContent.trim());
            } else {
                // For elements with children, store innerHTML
                element.setAttribute('data-original-html', element.innerHTML);
            }
        });
        
        document.body.setAttribute('data-original-content', 'true');
    },
    
    // Apply translation from Content.md based on language
    applyTranslationFromContent: async function(content, targetLang) {
        // Parse Content.md to extract language-specific content
        // Since Content.md already contains Russian text, we'll implement a pattern-based approach
        
        if (targetLang === 'ru') {
            // For Russian, we'll use the fact that Content.md already contains Russian text
            // In a real implementation, Content.md would have structured language sections
            await this.applyRussianTranslation(content);
        } else if (targetLang === 'he') {
            // For Hebrew, check if Hebrew content exists in Content.md
            await this.applyHebrewTranslation(content);
        }
    },
    
    // Apply Russian translation
    applyRussianTranslation: async function(content) {
        // In a real implementation, we would parse Content.md for Russian sections
        // For now, we'll implement a simulated approach that demonstrates how it would work
        
        // Identify elements that need translation
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
        
        // For demonstration, we'll create a simple mapping based on Content.md structure
        // In a real implementation, this would be more sophisticated
        const translationMap = this.createRussianTranslationMap();
        
        translatableElements.forEach(element => {
            if (element.hasAttribute('data-original-text')) {
                const originalText = element.getAttribute('data-original-text');
                if (translationMap[originalText]) {
                    element.textContent = translationMap[originalText];
                }
            } else if (element.hasAttribute('data-original-html')) {
                const originalHtml = element.getAttribute('data-original-html');
                if (translationMap[originalHtml]) {
                    element.innerHTML = translationMap[originalHtml];
                }
            }
        });
    },
    
    // Apply Hebrew translation
    applyHebrewTranslation: async function(content) {
        // Check if Hebrew content exists in Content.md
        const hebrewPattern = /[\u0590-\u05FF\uFB00-\uFB4F]/;
        if (hebrewPattern.test(content)) {
            // Apply Hebrew-specific formatting
            document.body.setAttribute('dir', 'rtl');
            
            // In a real implementation, we would extract Hebrew text from Content.md
            const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
            
            // For demonstration, we'll just set the direction
            // In a real implementation, we would have Hebrew translations
        } else {
            // If no Hebrew content found in source, apply RTL direction only
            document.body.setAttribute('dir', 'rtl');
        }
    },
    
    // Create Russian translation map based on Content.md
    createRussianTranslationMap: function() {
        // This would be populated with translations extracted from Content.md
        // For this implementation, we'll create a sample mapping based on common terms
        const translationMap = {
            // Common medical terms and phrases that might appear in the interface
            'PiCCO - Online Manual': 'PiCCO - Онлайн руководство',
            'Global End-Diastolic Volume Index': 'Индекс глобального конца диастолического объема',
            'Extravascular Lung Water Index': 'Индекс внеклеточной легочной воды',
            'Cardiac Index': 'Кардиальный индекс',
            'Systemic Vascular Resistance Index': 'Индекс системного сосудистого сопротивления',
            'Stroke Volume Variation': 'Вариация объема систолического выброса',
            'Pulse Pressure Variation': 'Вариация пульсового давления',
            'Cardiac Function Index': 'Индекс сердечной функции',
            'Global Ejection Fraction': 'Глобальная фракция выброса',
            'Pulmonary Vascular Permeability Index': 'Индекс проницаемости легочных сосудов',
            'Cardiogenic Shock': 'Кардиогенный шок',
            'Septic Shock': 'Септический шок',
            'Hypovolemic Shock': 'Гиповолемический шок',
            'Distributive Shock': 'Дистрибутивный шок',
            'Oxygen Delivery': 'Доставка кислорода',
            'Oxygen Consumption': 'Потребление кислорода',
            'Oxygen Extraction Ratio': 'Коэффициент извлечения кислорода'
        };
        
        // In a real implementation, this would be dynamically generated from Content.md
        return translationMap;
    },
    
    // Perform actual translation
    performTranslation: function(targetLang) {
        // This is where we would implement the actual translation logic
        // For now, we'll implement a solution that would work with real translations
        
        // In a real implementation, we could:
        // 1. Use a translation API
        // 2. Have pre-translated content in data attributes
        // 3. Dynamically load translated versions of the page
        
        // For this implementation, we'll create a more robust solution that could work
        // with actual translated content
        
        // Store the original page content
        if (!window.originalPageContent) {
            window.originalPageContent = document.documentElement.innerHTML;
        }
        
        // In a real implementation, we would replace content with translations
        // For now, we'll just ensure the page is ready for translation
        document.documentElement.lang = targetLang;
        
        // Trigger browser translation if available
        this.triggerBrowserTranslation(targetLang);
    },
    
    // Trigger browser translation
    triggerBrowserTranslation: function(targetLang) {
        // Some browsers have built-in translation capabilities
        // We can hint to the browser that translation is needed
        
        // Add translate attribute to body
        document.body.setAttribute('translate', 'no'); // Initially disable translation
        
        // Then set the desired language
        document.documentElement.lang = targetLang;
        
        // Some translation services look for specific patterns
        // This is where we would integrate with a translation API in a real implementation
        
        // For demonstration, we'll just log that translation would be triggered
        console.log(`Translation to ${targetLang} would be triggered`);
    },
    
    // Fallback to browser's own translation mechanism
    fallbackToBrowserTranslation: function(targetLang) {
        // Set the document's language attribute to trigger browser translation
        document.documentElement.lang = targetLang;
        
        // Some browsers may recognize this as a signal to translate the page
        // Add a class to indicate translation state
        document.body.classList.add('browser-translation-mode');
    }
};

// The language support initialization is now handled in the separate block after the original DOMContentLoaded

// Add CSS for language toggle button
const css = `
.language-toggle {
    position: fixed;
    bottom: 25px;
    left: 25px;
    padding: 12px 18px;
    background: var(--button-bg);
    color: var(--light-text-color);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 999;
    transition: all 0.3s ease;
}

.language-toggle:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
}

/* RTL support for Hebrew */
body[dir="rtl"] .language-toggle {
    left: auto;
    right: 25px;
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);