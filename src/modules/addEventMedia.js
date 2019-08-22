import showFullInfo from './showFullInfo';

const addEventMedia = () => {
    console.log('addEventMedia');
    const movie = document.querySelector('#movies');
    const media = movie.querySelectorAll('img[data-id]');
    media.forEach((elem) => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });

};

export default addEventMedia;