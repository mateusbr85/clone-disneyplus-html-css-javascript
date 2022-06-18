const API_KEY = 'dbdeb803529457aa1a79d9fcb37a2db7'
const language = "pt-br"

const objMovie = ['tt5109280']

const LIST_MOVIES = ['tt5109280','tt2953050','tt2948356','tt2245084','tt1772341','tt3606756','tt1979376','tt3606752']

function getUrlMovie(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${language}`
}

function isIndexHtml (movieId) {
    fetch(getUrlMovie(movieId))
    .then(res => res.json())
    .then(data => {
    //console.log(data)
    const app = document.getElementById('app');
    const title = document.querySelector('.movie h1');
    const description = document.querySelector('.movie p');
    const info = document.querySelector('.movie span');
    const raiting = document.querySelector('.rating strong');

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title;
    description.innerHTML = data.overview;
    raiting.innerHTML = data.vote_average;
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie' 

    const backgroundImage = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
    app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 50%) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${backgroundImage}')`
});
}

const moviesList = document.getElementById('movies__list');


function setFeaturedMovie(movieId){
    console.log(movieId)
    isIndexHtml(movieId)
}

function createButtonMovie(movieId){
    const button = document.createElement('button');
    button.setAttribute('onclick', `setFeaturedMovie('${movieId}')`);
    button.innerHTML = '<img src="/assets/icon-play-button.png" alt="Icon-Play">';
    return button;
}

function createMovies(movieId){
    console.log(movieId);
    fetch(getUrlMovie(movieId)).then( res => res.json()).then( data => {
        const movie = document.createElement('li');
        const genre = `<span>${data.genres[0].name}</span>`;
        const title = `<strong>${data.title}</strong>`;
        const backgroundImage = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

        movie.innerHTML = genre + title 
        movie.appendChild(createButtonMovie(movieId));
        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${backgroundImage}')`;
        moviesList.appendChild(movie);
    })
};

function loadListMovies(){
    LIST_MOVIES.map((index, key) => createMovies(index));
};

loadListMovies()

// Script para inicialização //
isIndexHtml(objMovie[0])