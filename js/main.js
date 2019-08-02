const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.querySelector('#grid').classList.add('loaded-images');
    // Listener to filter by category 
    const links = document.querySelectorAll('#categories a');
    links.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach((link) => link.classList.remove('active'));
            e.target.classList.add('active');
           
            const category = e.target.dataset.category;
           
            category === 'todos' ? grid.filter('[data-category]') : grid.filter(`[data-category="${category}"]`);
        })
    })

    // Listener to filter by search bar

    const searchBar = document.querySelector('#search-bar').addEventListener('input', (e) => {
        const search = e.target.value;
        grid.filter((item) => item.getElement().dataset.tags.includes(search));
    })

    // Listener to show selected image

    const overlay = document.querySelector('#overlay');
    document.querySelectorAll('.grid .item img').forEach((el) => {
        
        el.addEventListener('click', (e) => {

            const src = el.getAttribute('src');
            const alt = el.getAttribute('alt');
            const description = el.parentNode.parentNode.dataset.description;
            
            overlay.classList.add('active');
            document.querySelector('#overlay img').src = src;
            document.querySelector('#overlay img').alt = alt;
            document.querySelector('#overlay .description').innerHTML = description;

        })
    })

    // Listener to close button

    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    })

    // Listener to close on click overlay

    overlay.addEventListener('click', (e) => {
        e.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    })
})