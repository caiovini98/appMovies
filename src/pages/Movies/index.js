import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';
import {Container, ListMovies} from './styles';
import {deleteMovie, getMoviesSaved} from '../../utils/storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';

function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSaved('primeReact');

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) getFavoriteMovies();

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  const handleDelete = async id => {
    const result = await deleteMovie(id);
    setMovies(result);
  };

  const navigateDetail = item => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <Container>
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigateDetail={() => navigateDetail(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movies;
