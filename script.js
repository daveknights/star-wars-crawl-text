const container = document.querySelector('.container');
const largeView = document.querySelector('.large-view');
let filmPos = null;

const ViewFilm = (film, copy) => {
    film.classList.add('selected');
    film.classList.remove('item');
    container.insertBefore(copy, document.querySelector(`[data-itempos="${filmPos + 1}"]`));
    largeView.appendChild(film);
};

const chooseFilm = e => {
    const target = e.target;
    const film = target.classList.contains('item') && target;
    const copy = film.cloneNode(true);

    if (largeView.querySelector('.selected') !== null) {
        largeView.innerHTML = '';
    }

    filmPos = parseInt(film.getAttribute('data-itempos'));
    film.setAttribute('data-itempos', 'main-view');
    copy.style.gridArea = `${filmPos}/2 / ${filmPos + 1}/2`;
    document.documentElement.style.setProperty('--offset', `${-275 + ((filmPos - 1) * 110)}px`);

    if (!document.startViewTransition) {
        ViewFilm(film, copy);
        return;
    }

    document.startViewTransition(() => ViewFilm(film, copy));
};

const init = () => container.addEventListener('click', chooseFilm);

window.addEventListener('load', init);