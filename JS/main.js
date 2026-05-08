document.addEventListener('DOMContentLoaded', () => {
    // 1. Core initialization logic
    const body = document.body;

    // 2. Inject floating controls if missing
    function injectControls() {
        if (!document.getElementById('theme-switcher')) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'theme-switcher';
            themeBtn.className = 'theme-switcher';
            themeBtn.setAttribute('aria-label', 'Toggle theme');
            themeBtn.innerHTML = '<span class="icon-sun">☀️</span><span class="icon-moon">🌙</span>';
            document.body.appendChild(themeBtn);
        }

        if (!document.getElementById('font-size-control')) {
            const fontControl = document.createElement('div');
            fontControl.id = 'font-size-control';
            fontControl.className = 'font-size-control';
            fontControl.innerHTML = `
                <button id="font-decrease" title="Уменьшить шрифт">
                    <span class="inner-text">A-</span>
                </button>
                <button id="font-increase" title="Увеличить шрифт">
                    <span class="inner-text">A+</span>
                </button>
            `;
            document.body.appendChild(fontControl);
        }
    }
    injectControls();

    const themeSwitcher = document.getElementById('theme-switcher');
    const fontControl = document.getElementById('font-size-control');

    // 3. Theme logic
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

    const toggleTheme = () => {
        const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    };

    applyTheme(localStorage.getItem('theme') || 'light');

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (themeSwitcher.getAttribute('data-dragged') === 'true') {
                themeSwitcher.removeAttribute('data-dragged');
                return;
            }
            toggleTheme();
        });
    }

    // 4. Font size logic
    let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;
    const updateFontSize = (size) => {
        body.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', size);
    };
    updateFontSize(currentFontSize);

    document.getElementById('font-increase')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentFontSize += 1;
        updateFontSize(currentFontSize);
    });

    document.getElementById('font-decrease')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentFontSize -= 1;
        if (currentFontSize < 10) currentFontSize = 10;
        updateFontSize(currentFontSize);
    });

    // 5. Draggable logic with constraints
    const makeDraggable = (element) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.addEventListener('mousedown', dragStart);
        element.addEventListener('touchstart', dragStart, { passive: false });

        function dragStart(e) {
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            pos3 = clientX;
            pos4 = clientY;
            
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('touchmove', dragMove, { passive: false });
        }

        function dragMove(e) {
            if (e.type === 'touchmove') e.preventDefault();
            
            const clientX = e.type === 'touchstart' || e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' || e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            
            if (Math.abs(pos1) > 5 || Math.abs(pos2) > 5) {
                element.setAttribute('data-dragged', 'true');
            }

            pos3 = clientX;
            pos4 = clientY;
            
            let newTop = element.offsetTop - pos2;
            let newLeft = element.offsetLeft - pos1;

            const rect = element.getBoundingClientRect();
            const pad = 10;
            if (newTop < pad) newTop = pad;
            if (newLeft < pad) newLeft = pad;
            if (newTop + rect.height > window.innerHeight - pad) newTop = window.innerHeight - rect.height - pad;
            if (newLeft + rect.width > window.innerWidth - pad) newLeft = window.innerWidth - rect.width - pad;

            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }

        function dragEnd() {
            document.removeEventListener('mouseup', dragEnd);
            document.removeEventListener('touchend', dragEnd);
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('touchmove', dragMove);
            
            localStorage.setItem(element.id + '-top', element.style.top);
            localStorage.setItem(element.id + '-left', element.style.left);
            
            setTimeout(() => {
                element.removeAttribute('data-dragged');
            }, 100);
        }
        
        const savedTop = localStorage.getItem(element.id + '-top');
        const savedLeft = localStorage.getItem(element.id + '-left');
        if (savedTop && savedLeft) {
            element.style.top = savedTop;
            element.style.left = savedLeft;
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }
    };

    if (themeSwitcher) makeDraggable(themeSwitcher);
    if (fontControl) makeDraggable(fontControl);

    // 6. Navigation / Sidebar logic
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

    if (mainNav && !document.getElementById('sidebar-toggle')) {
        const sidebarToggle = document.createElement('button');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.id = 'sidebar-toggle';
        sidebarToggle.innerHTML = '«';
        document.body.appendChild(sidebarToggle);
        sidebarToggle.addEventListener('click', () => {
            mainNav.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('visible');
            sidebarToggle.textContent = mainNav.classList.contains('collapsed') ? '»' : '«';
        });
    }

    // 7. Interactive Elements logic
    document.querySelectorAll('details').forEach(detail => {
        detail.removeAttribute('open');
    });

    document.querySelectorAll('map[name$="-map"]').forEach(mapElement => {
        const mapName = mapElement.getAttribute('name');
        const tooltipId = `diagram-tooltip-${mapName.replace('-map', '')}`;
        const tooltip = document.getElementById(tooltipId);
        const areas = mapElement.querySelectorAll('area');
        if (tooltip && areas.length > 0) {
            areas.forEach(area => {
                area.addEventListener('mouseover', () => {
                    const txt = area.getAttribute('data-tooltip-text');
                    if (txt) { tooltip.innerHTML = txt; tooltip.classList.add('is-active'); }
                });
                area.addEventListener('mousemove', (e) => {
                    const img = document.querySelector(`img[usemap="#${mapName}"]`);
                    if (img) {
                        const wrapperRect = img.parentElement.getBoundingClientRect();
                        tooltip.style.left = (e.clientX - wrapperRect.left + 15) + 'px';
                        tooltip.style.top = (e.clientY - wrapperRect.top + 15) + 'px';
                    }
                });
                area.addEventListener('mouseout', () => tooltip.classList.remove('is-active'));
            });
        }
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}
