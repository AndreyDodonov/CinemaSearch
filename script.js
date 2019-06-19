const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event){
    event.preventDefault(); /* что бы страница не перезагружалась */
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU&query=' + searchText ;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    /*console.log(request); */
    request.open(method, url);   
    request.send();
    request.addEventListener('readystatechange', () => {      /* стрелочная функция */
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
            console.log('error: '+ request.status);
            
            return;
        }
        const output = JSON.parse(request.responseText);  

        let inner = '';

        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let dateItem = item.release_date;
            inner += `<div class="col-12">${nameItem}<br><b>Дата выхода: ${dateItem}</b></div>`;   /* '<div class="col-12">'+ nameItem + '</div>' */
        });

        movie.innerHTML = inner;  /* отправляем на страницу */
        /*console.log(output); */
        /* console.log(request); */
        /* console.log(request.responseText); */ 
        /* console.log(request.readyState); */

    });
}