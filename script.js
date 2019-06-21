

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlImage = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault(); /* что бы страница не перезагружалась */

    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0){                        // в случае пустого запроса
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Введён пустой запрос</h2> ';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then(function(value){
            //console.log(value.status);
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output){
            //console.log(output);
            let inner = '<h2 class="col-12 text-center text-warning">Результаты поиска</h2>';
            if (output.results.length === 0) {                // если результат поиска == 0
                movie.innerHTML = '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
                return;
            }
            output.results.forEach(function (item) {
               // console.log(item);
                
                let nameItem = item.name || item.title;
                let dateItem = item.release_date;
                let img = item.poster_path ? urlImage + item.poster_path : 'img/image_alt.png';
                let dataInfo = '';
                if (item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 text-center item">
                    <img src="${img}" class="img_poster" alt="Изображение недоступно(" ${dataInfo}> <br>
                    <b>Название: ${nameItem}<br>
                    Дата выхода: ${dateItem}</b></div>
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();          
            
            

        })
        .catch(function(reason) {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.error('error: ' + reason.status );
        });
    }
searchForm.addEventListener('submit', apiSearch);   

function addEventMedia(){
    const media = movie.querySelectorAll('.item');
    media.forEach(function(elem){
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    })
    
}


function showFullInfo(){
   console.dir(this.dataset);         /* this - контекст вызова */
    // let url ='';
    // if (this.dataset.type === 'movie') {
    //     url = 'кино';
    // }else if (this.dataset.type === 'tv'){
    //     url = 'сериал';
    // }else {
    //     movie.innerHTML = 'ошибка';
    // }
}

document.addEventListener('DOMContentLoaded', function(){   // событие - загрузка DOM структуры
    //console.log('Ура, загрузилось!');
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU')
        .then(function(value){
            
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output){
            let inner = '<h4 class="col-12 text-center text-warning">Популярное за неделю</h4>';
            if (output.results.length === 0) {                // если результат поиска == 0
                movie.innerHTML = '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
                return;
            }
            output.results.forEach(function (item) {
                              
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
        .catch(function(reason) {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.error('error: ' + reason.status );
        });
});