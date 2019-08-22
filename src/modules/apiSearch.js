import addEventMedia from './addEventMedia';

const apiSearch = (event) => {
    console.log('apiSearch');
    const movie = document.querySelector('#movies');
    const urlImage = 'https://image.tmdb.org/t/p/w500';
    
    event.preventDefault(); 

    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) { 
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Введён пустой запрос</h2> ';
        return;
    }
    const server = 
    'https://api.themoviedb.org/3/search/multi?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU&query=' + 
    searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {
            let inner = '<h2 class="col-12 text-center text-warning">Результаты поиска</h2>';
            if (output.results.length === 0) { // если результат поиска == 0
                movie.innerHTML = 
                '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
                return;
            }
            output.results.forEach((item) => {
                let nameItem = item.name || item.title;
                let dateItem = item.release_date;
                let img = item.poster_path ? urlImage + item.poster_path : 'img/image_alt.png';
                let dataInfo = '';
                if (item.media_type !== 'person') {dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                    <div class="col-12-col-md-4 col-x1-3 item">
                    <img src="${img}" class="img_poster" alt="Изображение недоступно(" ${dataInfo}> <br>
                    <b> ${nameItem}<br>
                    Дата выхода: ${dateItem}</b></div>
                `;}
            });
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.error('error: ' + reason.status);
        });
};

export default apiSearch;