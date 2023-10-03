import axios from 'axios';

const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF';

// Функция для загрузки списка пород
export async function fetchBreeds() {
  try {
    const response = await axios.get(`${url}/breeds`, {
      headers: {
        'x-api-key': api_key,
      },
    });
    const breeds = response.data;
    return breeds;
  } catch (error) {
    throw error;
  }
}

// Функция для загрузки информации о коте по идентификатору породы
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `${url}/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': api_key,
        },
      }
    );
    const catData = response.data[0];
    return catData;
  } catch (error) {
    throw error;
  }
}
