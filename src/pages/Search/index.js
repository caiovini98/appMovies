import React, {useState, useEffect} from 'react';
import {Container, ListMovies} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
// useNavigation para navegar até uma tela
// useRoute pegar os parametros enviados
import api, {key} from '../../services/api';
import SearchItem from '../../components/SearchItem';

function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    let isActive = true;
    const ac = new AbortController();

    try {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      });

      if (isActive) {
        setMovie(response.data.results);
        setLoading(false);
      }
    } catch (erro) {
      console.log('Erro: ', erro);
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  };

  if (loading) {
    return <Container />;
  }

  const navigateDetailsPage = item => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <SearchItem
            data={item}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Search;
