const showFullInfo = () => {
    const movie = document.querySelector('#movies');
    const urlImage = 'https://image.tmdb.org/t/p/w500';
    console.dir(this.dataset.type); 
    let url = '';
    if (this.dataset.type === 'movie') {
        url = 
        'https://api.themoviedb.org/3/movie/' + this.dataset.id + 
        '?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU';
    } else if (this.dataset.type === 'tv') {
        url =
         'https://api.themoviedb.org/3/tv/' + this.dataset.id + 
         '?api_key=537a6d92902c73e213db4ccffd38483b&language=ru-RU';
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
                ${output.homepage ? `<p class='text-center'>
                <a href="${output.homepage}" target="_blank">Официальная страница</a> </p>`:''}
                ${output.imdb_id ? `<p class='text-center'>
                <a href="https://imdb.com/title/${output.imdb_id}" target="_blank">страница IMDB.com</a> </p>`:''} 
            </div>
            <div class="col-8">
                <p> Рейтинг: ${output.vote_average}</p>
                <p> Статус: ${output.status}</p>
                <p> Премьера: ${output.first_air_date || output.release_date}</p>
                ${(output.last_episode_to_air) ?
                     `<p>${output.number_of_seasons} сезон 
                     ${output.last_episode_to_air.episode_number} серий вышло </p>`:''}
                <div>Жанры: ${genres}</div>
                <br>
                <div class='youtube'></div>
            </div> 
            `;
            });
};

export default showFullInfo;