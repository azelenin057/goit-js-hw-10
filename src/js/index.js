import { fetchBreeds, fetchCatByBreed } from './cat-api.js'; // Импорт функций из cat-api.js

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Обработчик события загрузки страницы
error.style.display = 'none';
breedSelect.style.display = 'none';

window.addEventListener('load', () => {
  fetchBreeds()
    .then(breeds => {
      // Обработка успешной загрузки списка пород
      // Здесь можно наполнить select опциями
      breedSelect.style.display = 'block';
      loader.style.display = 'none';

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      // Обработка ошибки загрузки списка пород
      showError();
      loader.hidden = true;
      error.hidden = false;
    });
});

// Обработчик события выбора породы
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = 'block'; // Показываем индикатор загрузки

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Обработка успешной загрузки данных о коте
      // Здесь можно отобразить информацию о коте
      catInfo.innerHTML = `
                <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
                <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
                <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
                <img src="${catData.url}" alt="${catData.breeds[0].name}" width="400" />
            `;
    })
    .catch(error => {
      // Обработка ошибки загрузки данных о коте
      showError();
    })
    .finally(() => {
      loader.style.display = 'none'; // Скрываем индикатор загрузки после завершения запроса
    });
});

// Функция для отображения сообщения об ошибке
function showError() {
  error.style.display = 'block';
}
