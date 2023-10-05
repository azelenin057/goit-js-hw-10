import { fetchBreeds, fetchCatByBreed } from './cat-api';
import '../css/styles.css';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
  loader: document.querySelector('.loader'),
};

const { selector, divCatInfo, loader, error } = refs; //Деструктуризация рефсов

error.classList.add('is-hidden');

fetchBreeds()
  .then(res => {
    const breedOptions = res.map(el => ({ text: el.name, value: el.id }));
    breedOptions.forEach(optionData => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.text = optionData.text;
      selector.appendChild(option);
      loader.classList.add('is-hidden');
      selector.classList.remove('is-hidden');
    });
  })
  .catch(error => {
    selector.classList.add('is-hidden');
    loader.classList.add('is-hidden');
    onFetchError();
  });

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loader.classList.remove('is-hidden');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');
  error.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      selector.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
      onFetchError();
    });
}

function onFetchError() {
  error.classList.remove('is-hidden');
}
