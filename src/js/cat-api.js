const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/seah?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
