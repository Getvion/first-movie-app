// Парсить данные в модальное окно
const API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SOON =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=';
const API_URL_FILM_INFO =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const API_URL_TRAILER =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/FILMID/videos';
const API_URL_SIMILAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/FILMID/similars';

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
const banner = document.querySelector('#banner');

function myHTML(movie) {
  return `
  <div class="film__item-container">
    <div class="film__item-img" style="background-image: url(${movie.posterUrlPreview})"></div>
    <div class="film__item-rating film__item-rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
    <p class="film__item-title">${movie.nameRu}</p>
    <p class="film__item-genre">${movie.genres.map((genre) => ` ${genre.genre}`)}</p>
  </div>`;
}
function myBannerHTML(movie) {
  if (movie.description === null) {
    movie.description = ' ';
  }
  if (movie.nameOriginal === null) {
    movie.nameOriginal = ' ';
  }
  return `
  <div class="container">
    <div class="banner-item">
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="banner-img">
  <div class="banner-content">
        <h1 class="banner-title">${movie.nameRu}</h1>
        <p class="banner-title--orig">${movie.nameOriginal}</p>
        <p class="banner-genre">${movie.genres.map((genre) => ` ${genre.genre}`)}</p>
        <p class="banner-descr">${movie.description}</p>
      </div >
    </div >
  </div >
  `;
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

  const mostPopular = document.createElement('div');
  mostPopular.classList.add('banner__inner');

  banner.appendChild(mostPopular);

  // Получение информации о фильме по его id
  let counter = 0;
  let filmId = data.films[counter].filmId;
  let filmLink = API_URL_FILM_INFO + filmId;

  getMovieById(filmLink);

  setInterval(() => {
    counter++;
    if (counter > 19) {
      counter = 0;
    }
    filmId = data.films[counter].filmId;
    filmLink = API_URL_FILM_INFO + filmId;
    getMovieById(filmLink);
  }, 10000);

  async function getMovieById(url) {
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    });
    const respData = await resp.json();
    showMovieById(respData);
  }

  function showMovieById(data) {
    mostPopular.innerHTML = myBannerHTML(data);
  }
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


// окно регистрации
const regBtn = document.querySelector('#regBtn');
const regModal = document.querySelector('.reg-modal');
const closeRegModalBtn = document.querySelector('.reg-modal__close');

function openRegModal() {
  document.body.style.overflow = 'hidden';
  regModal.style.transform = 'translateX(0)';
}

function closeRegModal() {
  document.body.style.overflow = '';
  regModal.style.transform = 'translateX(-100%)';
}

regBtn.addEventListener('click', openRegModal);
closeRegModalBtn.addEventListener('click', closeRegModal);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    closeRegModal();
  }
});


// модальное окно фильма (парсинг не работатет)
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');
const filmItem = document.querySelectorAll('.film__list');

async function getMoviesModal(url, url2, url3) {
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
  const resp3 = await fetch(url3, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData3 = await resp3.json();

  showMoviesModal(respData, respData2, respData3);
}

function myModalHTML(movie) {
  switch (movie.ratingAgeLimits) {
    case 'age18': movie.ratingAgeLimits = '18+';
      break;
    case 'age16': movie.ratingAgeLimits = '16+';
      break;
    case 'age12': movie.ratingAgeLimits = '12+';
      break;
    case 'age6': movie.ratingAgeLimits = '6+';
      break;
    case 'age0': movie.ratingAgeLimits = '0+';
      break;
  }
  return `
  <div class="modal__container">
    <div class="movie__frames">
      <img class="movie__img" src="${movie.posterUrl}">
    </div>
    <div class="movie__content">
    <div class="movie__rating">
      <div class="movie__rating--kp film__item-rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
      <div class="movie__rating--imdb film__item-rating--${getClassByRate(movie.rating)}">${movie.ratingImdb}</div>
    </div>
      <h2 class="movie__title">${movie.nameRu}</h2>
      <h4 class="movie__title--original">${movie.nameOriginal}</h4>
      <div class="movie__about">О фильме
      <p>Год выхода <span>${movie.year}</span></p>
      <p>Страна <span>${movie.countries.map((country) => ` ${country.country}`)}</span></p>
      <p>Режиссер <span>Энди Серкис</span></p>
      <p>Возраст <span>${movie.ratingAgeLimits}</span></p>
      <p>Время<span>${movie.filmLength}</span></p>
      </div>
      <p class="movie__desc">${movie.description}</p>
      <div>
      <p>Сиквелы и приквелы </p>
        <img src="" alt="">
        <p></p> название
      </div>
      <div class="movie__trailer">
      <p>Трейлер</p>
      </div>
      <div class="movie__similars">
        <p>Похожие фильмы</p>
        <div class="movie__similar">
          <div class="movie__similar-item">
            <img class="movie__similar-img" src="./img/film-poster.jpg" alt="Film name">
            <p class="movie__similar-title">Film Name</p>
          </div>
        </div>
      </div>
  </div>
  </div>`;
}


const movieModalDialog = document.createElement('div');
function showMoviesModal(data) {
  movieModalDialog.classList.add('modal__dialog');

  movieModalDialog.innerHTML = myModalHTML(data.films[1]);
  modal.appendChild(movieModalDialog);
}

function getIdFilm(event) {
  console.log(event);
  // узнаем id фильма, подаставляем его в переменные и вызываем функцию
  // getMoviesModal(API_URL_FILM_INFO, API_URL_TRAILER, API_URL_SIMILAR);
}

function openModal(event) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const target = event.target;
  getIdFilm(target);
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
  if (event.keyCode === 27) {
    closeModal();
  }
});