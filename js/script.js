// Добавить разделы "В кинотеатре", "Новые фильмы", "Ожидаемые"
// Парсить данные в модальное окно
// Поставить в banner данные о самом ожидаемом фильме, может сделать карусель

// работа с api
const API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function showMovies(data) {
  const popularMovies = document.querySelector('#popular');

  data.films.forEach((movie) => {
    const popularMovie = document.createElement('div');
    popularMovie.classList.add('films__item');
    popularMovie.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="films__item-img">
        <p class="films__item-title">${movie.nameRu}</p>
        <p class="films__item-genre">${movie.genres.map(
      (genre) => ` ${genre.genre}`)}</p>
    `;
    popularMovies.appendChild(popularMovie);
  });
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
    document.querySelector('.title__popular').style.display = 'none';
    document.querySelector('.banner').style.display = 'none';
    getMovies(API_URL_SEARCH + input.value);
    input.value = '';
  }
});


// модальное окно
const modalTrigger = document.querySelector('.show-modal');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');
const filmsItem = document.querySelectorAll('.films__list');

function openModal(event) {
  modal.classList.toggle('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.toggle('show');
  document.body.style.overflow = '';
}
modalTrigger.addEventListener('click', openModal);

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


// function getClassByRate(vote) {
//   if (vote >= 7) {
//     document.querySelector('.movie__rating').classList.add('movie__rating--good');
//   } else if (vote >= 5) {
//     document.querySelector('.movie__rating').classList.add('movie__rating--middle');
//   } else {
//     document.querySelector('.movie__rating').classList.add('movie__rating--bad');
//   }
// }