// Парсить данные в модальное окно
// Поставить в banner данные о самом ожидаемом фильме, может сделать карусель

const API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SOON =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=';

// Получение популярных и ожидаемых фильмов
getMovies(API_URL_POPULAR, API_URL_SOON);

async function getMovies(url, url2) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();

  const resp2 = await fetch(url2, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData2 = await resp2.json();
  showMovies(respData, respData2);
}

const popularMovies = document.querySelector('#popular');
const soonMovies = document.querySelector('#soon');

function myHTML(movie) {
  return `<img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="film__item-img">
    <div class="film__item-rating film__item-rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
    <p class="film__item-title">${movie.nameRu}</p>
    <p class="film__item-genre">${movie.genres.map((genre) => ` ${genre.genre}`)}</p>`;
}

function showMovies(data, data2) {
  data.films.forEach((movie) => {
    const popularMovie = document.createElement('div');
    popularMovie.classList.add('film__item');

    popularMovie.innerHTML = myHTML(movie);
    popularMovies.appendChild(popularMovie);
  });
  data2.films.forEach((movie) => {
    const soonMovie = document.createElement('div');
    soonMovie.classList.add('film__item');

    soonMovie.innerHTML = myHTML(movie);
    soonMovies.appendChild(soonMovie);
  });
}

// Изменение цвета по рейтингу
function getClassByRate(vote) {
  if (vote >= 7 || vote >= '90') {
    return 'green';
  } else if (vote >= 5 || vote >= '80') {
    return 'orange';
  } else {
    return 'red';
  }
}

//Поиск 
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const form = document.querySelector('#form');
const input = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search__svg');

async function getMoviesForSeach(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  searchMovies(respData);
}

function searchMovies(data) {
  data.films.forEach((movie) => {
    const popularMovie = document.createElement('div');
    popularMovie.classList.add('film__item');

    popularMovie.innerHTML = myHTML(movie);
    popularMovies.appendChild(popularMovie);
  });
}

function search(event) {
  event.preventDefault();
  if (input.value) {
    document.querySelector('#popular').innerHTML = '';
    document.querySelector('#soon').innerHTML = '';
    document.querySelector('.title__popular').style.display = 'none';
    document.querySelector('.title__soon').style.display = 'none';
    document.querySelector('.banner').style.display = 'none';
    getMoviesForSeach(API_URL_SEARCH + input.value);
    input.value = '';
  }
}
form.addEventListener('submit', search);
searchBtn.addEventListener('click', search);

// модальное окно
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');
const filmItem = document.querySelectorAll('.film__list');

function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

filmItem.forEach(film => {
  film.addEventListener('click', openModal);
});

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27 && modal.classList.contains('show')) {
    closeModal();
  }
});

// function getClassByRateModal(vote) {
//   if (vote >= 7) {
//     document.querySelector('.movie__rating').classList.add('movie__rating--good');
//   } else if (vote >= 5) {
//     document.querySelector('.movie__rating').classList.add('movie__rating--middle');
//   } else if (vote < 5) {
//     document.querySelector('.movie__rating').classList.add('movie__rating--bad');
//   }
// }