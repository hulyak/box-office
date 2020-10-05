// encapsulate fetch logic
const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(response =>
    response.json()
  );
  return response;
}
