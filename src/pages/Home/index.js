import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  Container,
  SearchButton,
  SearchContainer,
  Input,
  Title,
  Banner,
  BannerButton,
  SliderMovies,
} from './styles';
import api, {key} from '../../services/api';
import {getListMovies, gerarFilmeAleatorio} from '../../utils/movies';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [movieBanner, setMovieBanner] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getMovies = async () => {
    let isActive = true;
    const ac = new AbortController();

    const [nowData, popularData, topData] = await Promise.all([
      api.get('/movie/now_playing', {
        params: {
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      }),
      api.get('/movie/popular', {
        params: {
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      }),
      api.get('/movie/top_rated', {
        params: {
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      }),
    ]);

    if (isActive) {
      const nowList = getListMovies(5, nowData.data.results);
      const popularList = getListMovies(10, popularData.data.results);
      const topList = getListMovies(5, topData.data.results);
      setMovieBanner(
        nowData.data.results[gerarFilmeAleatorio(nowData.data.results)],
      );

      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);
      setLoading(false);
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  };

  useEffect(() => {
    getMovies();
  }, []);

  const navigateDetailsPage = item => {
    navigation.navigate('Details', {id: item.id});
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />
      <SearchContainer>
        <Input placeholder="Ex.: Vingadores" placeholderTextColor="#DDD" />
        <SearchButton>
          <Icon name="magnify" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton
          activeOpacity={0.9}
          onPress={() => navigateDetailsPage(movieBanner)}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movieBanner.poster_path}`,
            }}
          />
        </BannerButton>

        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigateDetailsPage={() => navigateDetailsPage(item)}
            />
          )}
        />

        <Title>Populares</Title>
        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigateDetailsPage={() => navigateDetailsPage(item)}
            />
          )}
        />

        <Title>Mais votados</Title>
        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigateDetailsPage={() => navigateDetailsPage(item)}
            />
          )}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
