const searchForm = document.querySelector('#search-form'),
      movie = document.querySelector('#movies'),
      urlImage = 'https://image.tmdb.org/t/p/w500';
/* jshint maxlen: 220 */

const apiSearch = (event) => {
    event.preventDefault(); /* что бы страница не перезагружалась */

    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) { // в случае пустого запроса
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Введён пустой запрос</h2> ';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then((value) => {
            //console.log(value.status);
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {
            //console.log(output);
            let inner = '<h2 class="col-12 text-center text-warning">Результаты поиска</h2>';
            if (output.results.length === 0) { // если результат поиска == 0
                movie.innerHTML = '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
                return;
            }
            output.results.forEach((item) => {
                // console.log(item);

                let nameItem = item.name || item.title;
                let dateItem = item.release_date;
                let img = item.poster_path ? urlImage + item.poster_path : 'img/image_alt.png';
                let dataInfo = '';
                if (item.media_type !== 'person') {dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 text-center item">
                    <img src="${img}" class="img_poster" alt="Изображение недоступно(" ${dataInfo}> <br>
                    <b>Название: ${nameItem}<br>
                    Дата выхода: ${dateItem}</b></div>
                `;
            }
            });
            movie.innerHTML = inner;

            addEventMedia();



        })
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.error('error: ' + reason.status);
        });
};

searchForm.addEventListener('submit', apiSearch);

const addEventMedia = () => {
    const media = movie.querySelectorAll('img[data-id]');
    media.forEach((elem) => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });

};

function showFullInfo () {
    console.dir(this.dataset.type); /* this - контекст вызова */
    let url = '';
    if (this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU';
    } else if (this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU';
    } else {
        movie.innerHTML = 'ошибка';
    }

    fetch(url)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.status));
            }
            return response.json();
        })
        .then((output) => {
                let genres = '';
                output.genres.forEach((item) => {
                    genres += item.name + ' ';
                });
                movie.innerHTML = `
            <h4 class="col-12 text-center text-info">${output.name||output.title}</h4>
            
            <div class="col-4">
                <img src='${urlImage+output.poster_path}' alt='${output.name||output.title}'>
                ${output.homepage ? `<p class='text-center'><a href="${output.homepage}" target="_blank">Официальная страница</a> </p>`:''}
                ${output.imdb_id ? `<p class='text-center'><a href="https://imdb.com/title/${output.imdb_id}" target="_blank">страница IMDB.com</a> </p>`:''} 
            </div>
            
            <div class="col-8">
                <p> Рейтинг: ${output.vote_average}</p>
                <p> Статус: ${output.status}</p>
                <p> Премьера: ${output.first_air_date || output.release_date}</p>
                ${(output.last_episode_to_air) ? `<p>${output.number_of_seasons} сезон ${output.last_episode_to_air.episode_number} серий вышло </p>`:''}
                <div>Жанры: ${genres}</div>
                
                <br>
                <div class='youtube'></div>
            </div> 
            `;
            
            getVideo(this.dataset.type, this.dataset.id);
        });    
}

document.addEventListener('DOMContentLoaded', startView);

function startView() { 
    //console.log('Ура, загрузилось!');
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU')
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {
            /* .then (function(output)) { */
            let inner = '<h4 class="col-12 text-center text-warning">Популярное за неделю</h4>';
            if (output.results.length === 0) { // если результат поиска == 0
                movie.innerHTML = '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
                return;
            }
            output.results.forEach((item) => {

                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                let dateItem = item.release_date;
                let img = item.poster_path ? urlImage + item.poster_path : 'img/image_alt.png';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                inner += `
                    <div class="col-12-col-md-4 col-x1-3 item">
                    <img src="${img}" class="img_poster" alt="Изображение недоступно(" ${dataInfo}> <br>
                    <b>Название: ${nameItem}<br>
                    Дата выхода: ${dateItem}</b></div>
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.error('error: ' + reason.status);
        });
}

const getVideo = (type, id) => {
    /* jshint maxlen: 250 */
    let youtube = movie.querySelector('.youtube');
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU`)
        .then((response) => {
            if (response.status !== 200) {
                Promise.reject(new Error(response.status));
                return;
            }
            return response.json();
            // console.log(response);
        })
        .then((output) => {
            let videoFrame = `<h5 class="text-info">Трейлеры</h5>`;
            if (output.results.length === 0) {
                videoFrame = `<p>К сожалению, видео отсутствует</p>`;
            }
            output.results.forEach((item) => {
                videoFrame += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + item.key + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
               // console.log(videoFrame);
            });
            youtube.innerHTML = videoFrame;
        })
        .catch((reason) => {
            youtube.innerHTML = 'Видео отсутствует';
            console.error(reason || reason.status);

        });
};