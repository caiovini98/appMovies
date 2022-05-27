import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMoviesSaved(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSaved = JSON.parse(myMovies) || [];

  return moviesSaved;
}

export async function saveMovie(key, movie) {
  let moviesStored = await getMoviesSaved(key);

  const hasMovie = moviesStored.some(item => item.id === movie.id);
  if (hasMovie) {
    console.log('Esse filme já existe.');
    return;
  }

  moviesStored.push(movie);
  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

export async function deleteMovie(id) {
  let moviesStored = await getMoviesSaved('primeReact');
  let myMovies = moviesStored.filter(item => item.id !== id); //Retorna todos os filmes, menos o que eu quero deletar
  await AsyncStorage.setItem('primeReact', JSON.stringify(myMovies));

  alert('Filme deletado com sucesso.');
  return myMovies;
}

export async function hasMovie(movie) {
  let moviesStored = await getMoviesSaved('primeReact');
  const hasMovie = moviesStored.find(item => item.id === movie.id);

  if (hasMovie) return true;

  return false;
}
