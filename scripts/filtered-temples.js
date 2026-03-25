// Temple data array with local temple images
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/ivory_coast_temple.jpeg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/utah_temple.jpeg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/red_cliffs_temple.jpeg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/american_temple.jpeg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "images/washington_temple.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/lds_temple.jpeg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/saints_temple.jpeg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "images/salt_lake_temple.jpeg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1979, October, 29",
        area: 52869,
        imageUrl: "images/tokyo-japan.jpg"
    },
    {
        templeName: "Sydney Australia",
        location: "Sydney, Australia",
        dedicated: "1986, September, 14",
        area: 35000,
        imageUrl: "images/sydney-australia.jpeg"
    }
];

// Function to extract the year from the dedication date string
function getDedicationYear(dedicated) {
    const parts = dedicated.split(',');
    return parseInt(parts[0].trim());
}

// Function to build temple cards and display them
function buildGallery(filter) {
    const gallery = document.getElementById('gallery');
    const pageTitle = document.getElementById('page-title');
    if (!gallery) return;

    let filtered;
    
    // Apply filter based on the filter type
    switch (filter) {
        case 'old':
            // Old – temples built before 1900
            filtered = temples.filter(t => getDedicationYear(t.dedicated) < 1900);
            if (pageTitle) pageTitle.textContent = 'Old Temples (Before 1900)';
            break;
        case 'new':
            // New – temples built after 2000
            filtered = temples.filter(t => getDedicationYear(t.dedicated) > 2000);
            if (pageTitle) pageTitle.textContent = 'New Temples (After 2000)';
            break;
        case 'large':
            // Large – temples larger than 90,000 square feet
            filtered = temples.filter(t => t.area > 90000);
            if (pageTitle) pageTitle.textContent = 'Large Temples (>90,000 sq ft)';
            break;
        case 'small':
            // Small – temples smaller than 10,000 square feet
            filtered = temples.filter(t => t.area < 10000);
            if (pageTitle) pageTitle.textContent = 'Small Temples (<10,000 sq ft)';
            break;
        case 'home':
        default:
            // Home – displays all temples
            filtered = temples;
            if (pageTitle) pageTitle.textContent = 'All Temples';
            break;
    }

    // Generate temple cards with native lazy loading
    gallery.innerHTML = filtered.map((temple, index) => `
        <figure class="temple-card">
            <img 
                src="${temple.imageUrl}" 
                alt="${temple.templeName}" 
                ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                width="400" 
                height="250"
            >
            <figcaption>
                <h2>${temple.templeName}</h2>
                <p class="location">${temple.location}</p>
                <p class="dedicated">Dedicated: ${temple.dedicated}</p>
                <p class="area">Area: ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        </figure>
    `).join('');
}

// Function to set active filter button
function setActive(btn) {
    document.querySelectorAll('.filter-btn, .home-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn, .home-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(btn);
        buildGallery(btn.dataset.filter);
    });
});

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
if (lastModified) {
    const lastModDate = new Date(document.lastModified);
    lastModified.textContent = `Last Modified: ${lastModDate.toLocaleDateString()}`;
}

// Initial load - display all temples
buildGallery('home');
