/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================*/
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    this.classList.toggle('bx-toggle-right');

});


document.addEventListener('DOMContentLoaded', function() {
    
    const cards = document.querySelectorAll('.card');
    const filtersContainer = document.getElementById('filters');
    const searchInput = document.querySelector('.search-input');
    const searchResetButton = document.querySelector('.search-reset-btn');
    const allTags = new Set();
    let filterTags = [];

    // Collect all unique tags from cards
    cards.forEach(card => {
        const tags = card.dataset.tags.split(' ');
        const tagContainer = card.querySelector('.tags');
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('tag');
            span.textContent = tag;
            tagContainer.appendChild(span);
            allTags.add(tag);
        });
    });

    // Create filter tags
    function createFilterTags() {
        filtersContainer.innerHTML = '';
        filterTags = [];
        
        Array.from(allTags).sort().forEach(tag => {
            const filterTagContainer = document.createElement('div');
            filterTagContainer.classList.add('filter-tag-container');
            filterTagContainer.dataset.active = "false";
            filterTagContainer.dataset.tag = tag;

            const statusBox = document.createElement('div');
            statusBox.classList.add('status-box');

            const tagLabel = document.createElement('span');
            tagLabel.textContent = tag;

            filterTagContainer.append(tagLabel, statusBox);
            filterTagContainer.addEventListener('click', () => {
                const isActive = filterTagContainer.dataset.active === "true";
                filterTagContainer.dataset.active = (!isActive).toString();
                filterCards();
            });

            filtersContainer.appendChild(filterTagContainer);
            filterTags.push(filterTagContainer);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterTags.forEach(tag => {
            const tagText = tag.dataset.tag.toLowerCase();
            tag.style.display = tagText.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // Initial creation of filter tags
    createFilterTags();

    // Filter function
    function filterCards() {
        const selectedTags = Array.from(
            document.querySelectorAll('.filter-tag-container[data-active="true"]')
        ).map(container => container.dataset.tag);

        cards.forEach(card => {
            const cardTags = card.dataset.tags.split(' ');
            const hasAllTags = selectedTags.every(tag => cardTags.includes(tag));
            card.style.display = hasAllTags || selectedTags.length === 0 ? 'block' : 'none';
        });
    }

    // Reset button click handler
    searchResetButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
        document.querySelectorAll('.filter-tag-container[data-active="true"]')
        .forEach(element => {
            element.dataset.active = "false";
        })
        filterCards()
    });

    const typed = new Typed('.typed-text', {
        strings: [ 'Mechatronics Engineer','Tech Enthusiast'],
        typeSpeed: 200,
        backDelay: 500,
        loop: true
    });
});

