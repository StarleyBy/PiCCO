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

    // Ensure all details elements start as closed
    document.querySelectorAll('details').forEach(detail => {
        detail.removeAttribute('open');
    });
});

// Language support functionality
const languageSupport = {
    currentLang: 'en',
    translations: {
        en: {},
        he: {},
        ru: {}
    },
    
    init: function() {
        this.loadCurrentLanguage();
        this.setupLanguageToggle();
        this.translatePage();
    },
    
    loadCurrentLanguage: function() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && ['en', 'he', 'ru'].includes(savedLang)) {
            this.currentLang = savedLang;
        } else {
            this.currentLang = 'en';
            localStorage.setItem('preferredLanguage', 'en');
        }
    },
    
    setupLanguageToggle: function() {
        let langToggle = document.getElementById('language-toggle');
        if (!langToggle) {
            langToggle = document.createElement('button');
            langToggle.id = 'language-toggle';
            langToggle.className = 'language-toggle';
            langToggle.setAttribute('aria-label', 'Switch language');
            langToggle.innerHTML = '🌐 EN';
            document.body.appendChild(langToggle);
            
            langToggle.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
        this.updateLanguageButton();
    },
    
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
    
    updateHtmlLangAttribute: function() {
        document.documentElement.lang = this.currentLang;
    },
    
    translatePage: function() {
        this.updateHtmlLangAttribute();
        document.body.setAttribute('data-lang', this.currentLang);
        
        if (this.currentLang === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
        }
        
        this.translateContent();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    },
    
    translateContent: function() {
        if (!document.body.hasAttribute('data-original-content')) {
            this.storeOriginalContent();
        }
        
        if (this.currentLang !== 'en') {
            this.applySimulatedTranslation(this.currentLang);
        } else {
            this.restoreOriginalContent();
        }
    },
    
    storeOriginalContent: function() {
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
        
        translatableElements.forEach(element => {
            if (element.children.length === 0) {
                element.setAttribute('data-original-text', element.textContent.trim());
            } else {
                element.setAttribute('data-original-html', element.innerHTML);
            }
        });
        
        document.body.setAttribute('data-original-content', 'true');
    },
    
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
    
    applySimulatedTranslation: function(targetLang) {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.children.length === 0 && element.textContent.trim() !== '') {
                element.setAttribute('translate', 'yes');
            }
        });
        
        document.body.classList.add('translated-content');
        
        if (this.currentLang === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
        }
        
        this.translateUsingContentMD(this.currentLang);
    },
    
    translateUsingContentMD: async function(targetLang) {
        try {
            const response = await fetch('../Content.md');
            const content = await response.text();
            
            if (!document.body.hasAttribute('data-original-content-stored')) {
                this.storeOriginalContent();
                document.body.setAttribute('data-original-content-stored', 'true');
            }
            
            if (targetLang === 'ru') {
                await this.applyRussianTranslation(content);
            } else if (targetLang === 'he') {
                await this.applyHebrewTranslation(content);
            } else {
                this.restoreOriginalContent();
            }
            
            document.documentElement.lang = targetLang;
            
            if (targetLang === 'he') {
                document.body.setAttribute('dir', 'rtl');
            } else {
                document.body.removeAttribute('dir');
            }
            
        } catch (error) {
            console.warn('Could not load Content.md for translation:', error);
            this.fallbackToBrowserTranslation(targetLang);
        }
    },
    
    applyTranslationFromContent: async function(content, targetLang) {
        if (targetLang === 'ru') {
            await this.applyRussianTranslation(content);
        } else if (targetLang === 'he') {
            await this.applyHebrewTranslation(content);
        }
    },
    
    applyRussianTranslation: async function(content) {
        const translatableElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, th, li, a, span, strong, em, i, b, u, code, pre, blockquote, dt, dd, label, caption');
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
    
    applyHebrewTranslation: async function(content) {
        const hebrewPattern = /[\u0590-\u05FF\uFB00-\uFB4F]/;
        if (hebrewPattern.test(content)) {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'rtl');
        }
    },
    
    createRussianTranslationMap: function() {
        return {
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
    },
    
    performTranslation: function(targetLang) {
        if (!window.originalPageContent) {
            window.originalPageContent = document.documentElement.innerHTML;
        }
        document.documentElement.lang = targetLang;
        this.triggerBrowserTranslation(targetLang);
    },
    
    triggerBrowserTranslation: function(targetLang) {
        document.body.setAttribute('translate', 'no');
        document.documentElement.lang = targetLang;
        console.log(`Translation to ${targetLang} would be triggered`);
    },
    
    fallbackToBrowserTranslation: function(targetLang) {
        document.documentElement.lang = targetLang;
        document.body.classList.add('browser-translation-mode');
    }
};

// Auto-initialize language support
if (typeof languageSupport !== 'undefined') {
    languageSupport.init();
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

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

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
