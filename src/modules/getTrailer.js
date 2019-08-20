const getTrailer = (type,id) => {  
    const movie = document.querySelector('#movies');  
    let youtube = movie.querySelector('.youtube');
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=4e61d32c7f8095da04f6550d8cc3dd94&language=ru`)
        .then((response)=>{
            if (response.status!==200){
                Promise.reject(new Error(response.status));
                return;
            }
            return response.json();            
        })
        .then((output)=> {
            let videoFrame=`<h5 class="text-info">Трейлеры</h5>`;
            if (output.results.length===0){
                videoFrame=`<p>К сожалению, видео отсутствует</p>`;
            }
            output.results.forEach((item)=>{
                /*jshint maxlen: 200 */
               
                videoFrame+=
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+item.key+
                '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                //console.log(videoFrame);
            });
            youtube.innerHTML = videoFrame;
        })
        .catch((reason)=>{
            youtube.innerHTML='Видео отсутствует';
            console.error(reason||reason.status);

        });
};

export default getTrailer;