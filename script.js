const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault(); /* что бы страница не перезагружалась */

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU&query=' + searchText;
    movie.innerHTML = 'загрузка';

    fetch(server)
        .then(function(value){
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output){
            let inner = '';
            output.results.forEach(function (item) {
                
                let nameItem = item.name || item.title;
                let dateItem = item.release_date;
                inner += `
                    <div class="col-3 item">
                    <b>Название: ${nameItem}<br>
                    Дата выхода: ${dateItem}</b></div>
                `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Упс, что-то пошло не так!';
            console.log('error: ' + reason.status );
        });
    }
searchForm.addEventListener('submit', apiSearch);   