

// map-leaflet
document.addEventListener('DOMContentLoaded', function () {
    var mymap = L.map('map-container').setView([7.0644, 125.6070], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
    
    scrollToSection('home');

    // Function to scroll to a specific section
    function scrollToSection(sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Set the size of the map container explicitly and handle window resize
    function setMapContainerHeight() {
        var headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;
        var mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.style.height = window.innerHeight - headerHeight + 'px';
            mymap.invalidateSize();
        }
    }

    setMapContainerHeight(); // Initial setup

    window.addEventListener('resize', setMapContainerHeight);
});

//header
// JavaScript for dynamically adjusting header padding
function setHeaderPadding() {
    var header = document.querySelector('header');
    var initialWindowWidth = window.innerWidth;

    // Set the initial padding based on the window width
    header.style.padding = '20px ' + (initialWindowWidth > 600 ? '120px' : '20px');

    // Update the padding when the window is resized
    window.addEventListener('resize', function () {
        header.style.padding = '20px ' + (window.innerWidth > 600 ? '120px' : '20px');
    });
}

// Call the function on initial load
setHeaderPadding();


var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('header nav a');

window.onscroll = function () {
    sections.forEach(function (sec) {
        var top = window.scrollY;
        var offset = sec.offsetTop - 150;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(function (links) {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

//database-panel

function toggleDatabasePanel() {
    var databasePanel = document.getElementById('database-panel');
    databasePanel.classList.toggle('collapsed');
}

function setDatabasePanelHeight() {
    var mapSection = document.getElementById('map');
    var databasePanel = document.getElementById('database-panel');
    databasePanel.style.height = mapSection.clientHeight + 'px';
}

// Call the function on initial load
setDatabasePanelHeight();

// Update the height of the database panel when the window is resized
window.addEventListener('resize', function () {
    setDatabasePanelHeight();
});


function updateDatabasePanelVisibility() {
    var mapSection = document.getElementById('map');
    var databasePanel = document.getElementById('database-panel');

    // Check if the map section is active
    if (isSectionActive(mapSection)) {
        databasePanel.style.display = 'block';
        setDatabasePanelHeight();
    } else {
        databasePanel.style.display = 'none';
    }
}

function isSectionActive(section) {
    var top = window.scrollY;
    var offset = section.offsetTop - 150;
    var height = section.offsetHeight;

    return top >= offset && top < offset + height;
}

// Initial setup
updateDatabasePanelVisibility();

// Update the visibility and height of the database panel on scroll
window.addEventListener('scroll', function () {
    updateDatabasePanelVisibility();
});

// Update the height of the database panel when the window is resized
window.addEventListener('resize', function () {
    setDatabasePanelHeight();
});

var lastScrollTop = 0;
var ticking = false;

function onScroll() {
    var scrollSpeed = getScrollSpeed();

    // Adjust the animation duration based on the scroll speed
    var animationDuration = Math.min(0.5 / scrollSpeed, 1);

    // Apply the animation to the right property
    var databasePanel = document.getElementById('database-panel');
    databasePanel.style.transition = 'right ' + animationDuration + 's ease';

    if (scrollSpeed > 0) {
        databasePanel.classList.remove('collapsed');
    } else {
        databasePanel.classList.add('collapsed');
    }
}

// ...

// Listen to the scroll event and update the animation
window.addEventListener('scroll', function () {
    requestTick();
});

// Listen to the window resize event and reapply the animation
window.addEventListener('resize', function () {
    onScroll();
});


function getScrollSpeed() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var scrollSpeed = Math.abs(st - lastScrollTop);
    lastScrollTop = st;
    return scrollSpeed;
}



