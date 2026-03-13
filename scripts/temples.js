// Temple data
const temples = [
    { name: "Washington Temple", location: "Washington, D.C.", dedicated: 1974, sqft: 160000, src: "images/washington_temple.jpeg" },
    { name: "Historical Temple", location: "Historic Site", dedicated: 1846, sqft: 12000, src: "images/historical_temple.jpeg" },
    { name: "Salt Lake Tribune Temple", location: "Salt Lake City, UT", dedicated: 1893, sqft: 253015, src: "images/tribune_temple.jpeg" },
    { name: "Salt Lake City Utah Temple", location: "Salt Lake City, UT", dedicated: 1893, sqft: 253015, src: "images/utah_temple.jpeg" },
    { name: "Salt Lake Temple", location: "Salt Lake City, UT", dedicated: 1893, sqft: 253015, src: "images/salt_lake_temple.jpeg" },
    { name: "Saints Temple", location: "Nauvoo, IL", dedicated: 1846, sqft: 54000, src: "images/saints_temple.jpeg" },
    { name: "Red Cliffs Temple", location: "St. George, UT", dedicated: 2023, sqft: 40000, src: "images/red_cliffs_temple.jpeg" },
    { name: "Public Gets Temple", location: "Provo, UT", dedicated: 2020, sqft: 90000, src: "images/public_gets_temple.jpeg" },
    { name: "Provo Utah Temple", location: "Provo, UT", dedicated: 1972, sqft: 128325, src: "images/provo_utah_temple.jpeg" },
    { name: "Abidjan Ivory Coast Temple", location: "Abidjan, Ivory Coast", dedicated: 2011, sqft: 10700, src: "images/ivory_coast_temple.jpeg" },
    { name: "American Temple", location: "United States", dedicated: 2000, sqft: 50000, src: "images/american_temple.jpeg" },
    { name: "Beauty and Purpose Temple", location: "United States", dedicated: 2010, sqft: 45000, src: "images/beauty_purpose_temple.jpeg" },
    { name: "Grand Junction Temple", location: "Grand Junction, CO", dedicated: 2023, sqft: 10000, src: "images/grand_junction_temple.jpeg" },
    { name: "Kansas City Temple", location: "Kansas City, MO", dedicated: 2012, sqft: 33800, src: "images/kansas_city_temple.jpeg" },
    { name: "LDS Temple", location: "United States", dedicated: 1980, sqft: 80000, src: "images/lds_temple.jpeg" },
];

function buildGallery(filter) {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    let filtered;
    if (filter === 'old') {
        filtered = temples.filter(t => t.dedicated < 1900);
    } else if (filter === 'new') {
        filtered = temples.filter(t => t.dedicated >= 2000);
    } else if (filter === 'large') {
        filtered = temples.filter(t => t.sqft >= 90000);
    } else if (filter === 'small') {
        filtered = temples.filter(t => t.sqft < 90000);
    } else {
        filtered = temples;
    }

    gallery.innerHTML = filtered.map(t => `
        <figure>
            <img src="${t.src}" alt="${t.name}" loading="lazy" width="400" height="300">
            <figcaption>${t.name}</figcaption>
        </figure>
    `).join('');
}

// Set active filter button
function setActive(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(btn);
        buildGallery(btn.dataset.filter);
    });
});

// Home link clears filter
const homeLink = document.querySelector('nav a[href="temples.html"]');
if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(null);
        buildGallery('home');
    });
}

// Initial load
buildGallery('home');

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
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Set last modified date in footer
const lastModified = document.getElementById('lastModified');
if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
