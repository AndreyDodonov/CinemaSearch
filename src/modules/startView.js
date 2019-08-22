import addEventMedia from './addEventMedia';

const startView = () => {  
    console.log('startView');
    const movie = document.querySelector('#movies');
    const urlImage = 'https://image.tmdb.org/t/p/w500';
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU')
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {            
            let inner = '<h4 class="col-12 text-center text-warning">Популярное за неделю</h4>';
            if (output.results.length === 0) { 
                movie.innerHTML = 
                '<h2 class="col-12 text-center text-warning">По вашему запросу ничего не найдено</h2>';
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
                    <b> ${nameItem}<br>
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
    
};

export default startView;