document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const navLinks = document.querySelectorAll('.main-nav ul li');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            navLinks.forEach(li => {
                const link = li.querySelector('a');
                if (link) {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(searchTerm)) {
                        li.style.display = '';
                    } else {
                        li.style.display = 'none';
                    }
                }
            });
        });
    }
});
