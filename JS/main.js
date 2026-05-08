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

    // Font size adjustment
    let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;
    const updateFontSize = (size) => {
        body.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', size);
    };
    updateFontSize(currentFontSize);

    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');

    if (fontIncrease) {
        fontIncrease.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFontSize += 1;
            updateFontSize(currentFontSize);
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFontSize -= 1;
            if (currentFontSize < 10) currentFontSize = 10;
            updateFontSize(currentFontSize);
        });
    }

    // Draggable functionality
    const makeDraggable = (element) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        element.ontouchstart = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            // Only drag if not clicking a child button that should handle its own click
            if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('draggable-handle')) {
                // If it's a click on the button itself, don't drag if we just want to click
                // But we want the whole container to be draggable.
            }
            
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            pos3 = clientX;
            pos4 = clientY;
            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            pos3 = clientX;
            pos4 = clientY;
            
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
            
            // Save position
            localStorage.setItem(element.id + '-top', element.style.top);
            localStorage.setItem(element.id + '-left', element.style.left);
        }
        
        // Load saved position
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
    const fontControl = document.getElementById('font-size-control');
    if (fontControl) makeDraggable(fontControl);

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
                    const img = document.querySelector(`img[usemap="#${mapName}"]`);
                    if (img) {
                        const imgRect = img.getBoundingClientRect();
                        const wrapperRect = img.parentElement.getBoundingClientRect();
                        tooltip.style.left = (e.clientX - wrapperRect.left + 15) + 'px';
                        tooltip.style.top = (e.clientY - wrapperRect.top + 15) + 'px';
                    } else {
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
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('completed');
            }
        });
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
        sidebarToggle.addEventListener('click', () => {
            mainNavForSidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('visible');
            if (mainNavForSidebar.classList.contains('collapsed')) {
                sidebarToggle.textContent = '»';
            } else {
                sidebarToggle.textContent = '«';
            }
        });
        
        const collapsedMenuIndicator = document.querySelector('.collapsed-menu-indicator');
        if (collapsedMenuIndicator) {
            collapsedMenuIndicator.addEventListener('click', () => {
                mainNavForSidebar.classList.remove('collapsed');
                sidebarToggle.classList.remove('visible');
                sidebarToggle.textContent = '«';
            });
        }
    }

    document.querySelectorAll('details').forEach(detail => {
        detail.removeAttribute('open');
    });
});

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
