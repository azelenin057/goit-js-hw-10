// import axios from 'axios';

// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] =
//   'live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF';

// const refs = {
//   select: document.querySelector('.breed-select'),
//   loader: document.querySelector('.loader'),
//   error: document.querySelector('.error'),
//   divCatInfo: document.querySelector('.cat-info'),
// };
// const { select, divCatInfo, loader, error } = refs;

// loader.hidden = true;
// error.hidden = true;
// divCatInfo.hidden = true;
import axios from 'axios';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Добавляем заголовок x-api-key к каждому запросу
axios.defaults.headers.common['x-api-key'] =
  'live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF';

// Функция для загрузки списка пород
async function fetchBreeds() {
  try {
    loader.style.display = 'block'; // Показываем загрузчик
    error.style.display = 'none'; // Скрываем ошибку

    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;
    console.log(response);

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Инициализация обработчика события выбора породы
    breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;
      fetchCatByBreed(selectedBreedId);
    });

    loader.style.display = 'none'; // Скрываем загрузчик после успешной загрузки
  } catch (error) {
    showError();
  }
}

// Функция для загрузки информации о коте по выбранной породе
async function fetchCatByBreed(breedId) {
  try {
    loader.style.display = 'block'; // Показываем загрузчик
    error.style.display = 'none'; // Скрываем ошибку
    catInfo.style.display = 'none'; // Скрываем информацию о коте

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    const catImage = document.createElement('img');
    catImage.src = catData.url;

    const catBreed = document.createElement('p');
    catBreed.textContent = `Порода: ${catData.breeds[0].name}`;

    const catDescription = document.createElement('p');
    catDescription.textContent = `Описание: ${catData.breeds[0].description}`;

    const catTemperament = document.createElement('p');
    catTemperament.textContent = `Темперамент: ${catData.breeds[0].temperament}`;

    // Очищаем содержимое блока с информацией о коте и добавляем новую информацию
    catInfo.innerHTML = '';
    catInfo.appendChild(catImage);
    catInfo.appendChild(catBreed);
    catInfo.appendChild(catDescription);
    catInfo.appendChild(catTemperament);

    catInfo.style.display = 'block'; // Показываем информацию о коте
    loader.style.display = 'none'; // Скрываем загрузчик после успешной загрузки
  } catch (error) {
    showError();
  }
}

// Функция для отображения ошибки
function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
}

// Вызываем функцию fetchBreeds при загрузке страницы
window.addEventListener('load', () => {
  fetchBreeds();
});
