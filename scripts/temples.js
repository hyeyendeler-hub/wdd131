// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
}

// Set current year in footer
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date in footer
const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}
