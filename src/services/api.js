import axios from 'axios';

//URL FILMES EM CARTAZ
// api_key=5da95c65b81f9baed8b42b85e0f3efe2

export const key = '5da95c65b81f9baed8b42b85e0f3efe2';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export default api;
