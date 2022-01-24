import React from 'react';
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
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Home() {
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
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item}) => <SliderItem />}
        />

        <Title>Populares</Title>
        <SliderMovies
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item}) => <SliderItem />}
        />

        <Title>Mais votados</Title>
        <SliderMovies
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item}) => <SliderItem />}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
