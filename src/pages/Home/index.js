import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
import {getListMovies} from '../../utils/movies';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const getMovies = async () => {
    let isActive = true;
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

    const nowList = getListMovies(5, nowData.data.results);
    const popularList = getListMovies(10, nowData.data.results);
    const topList = getListMovies(5, nowData.data.results);

    setNowMovies(nowList);
    setPopularMovies(popularList);
    setTopMovies(topList);
  };

  useEffect(() => {
    getMovies();
  }, []);

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
        <BannerButton activeOpacity={0.9} onPress={() => alert('TESTE')}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: 'https://i.pinimg.com/564x/ec/be/58/ecbe58f45eee2de4471b23233a792af1.jpg',
            }}
          />
        </BannerButton>

        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({item}) => <SliderItem data={item} />}
        />

        <Title>Populares</Title>
        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item}) => <SliderItem data={item} />}
        />

        <Title>Mais votados</Title>
        <SliderMovies
          keyExtrator={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item}) => <SliderItem data={item} />}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
