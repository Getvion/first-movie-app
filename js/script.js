// Парсить данные в модальное окно
// Поставить в banner данные о самом ожидаемом фильме, может сделать карусель

const API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SOON =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=';

// Получение популярных фильмов
getPopularMovies(API_URL_POPULAR);

async function getPopularMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();

  showPopularMovies(respData);
}

function showPopularMovies(data) {
  const popularMovies = document.querySelector('#popular');

  data.films.forEach((movie) => {
    const popularMovie = document.createElement('div');

    popularMovie.classList.add('films__item');

    popularMovie.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="films__item-img">
        <div class="films__item-rating films__item-rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
        <p class="films__item-title">${movie.nameRu}</p>
        <p class="films__item-genre">${movie.genres.map(
      (genre) => ` ${genre.genre}`)}</p>
    `;

    popularMovies.appendChild(popularMovie);
  });
}

// получение ожидаемых фильмов
getSoonMovies(API_URL_SOON);

async function getSoonMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();

  showSoonMovies(respData);
}
function showSoonMovies(data) {
  const soonMovies = document.querySelector('#soon');

  data.films.forEach((movie) => {
    const soonMovie = document.createElement('div');
    soonMovie.classList.add('films__item');

    soonMovie.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="films__item-img">
        <div class="films__item-rating films__item-rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
        <p class="films__item-title">${movie.nameRu}</p>
        <p class="films__item-genre">${movie.genres.map(
      (genre) => ` ${genre.genre}`)}</p>
    `;

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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value) {
    document.querySelector('#popular').innerHTML = '';
    document.querySelector('#soon').innerHTML = '';
    document.querySelector('.title__popular').style.display = 'none';
    document.querySelector('.title__soon').style.display = 'none';
    document.querySelector('.banner').style.display = 'none';
    getPopularMovies(API_URL_SEARCH + input.value);
    input.value = '';
  }
});

// модальное окно
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');
const filmsItem = document.querySelectorAll('.films__list');

function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

filmsItem.forEach(film => {
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