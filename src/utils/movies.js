export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0; i < size; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}

export function gerarFilmeAleatorio(movies) {
  return Math.floor(Math.random() * movies.length);
}
