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
});