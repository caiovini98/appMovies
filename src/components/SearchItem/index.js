import React from 'react';
import {Container, Banner, Title, Rate, RateContainer} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchItem({data, navigatePage}) {
  const detailMovie = () => {
    if (data?.release_date === '') {
      alert('Filme ainda sem data.');
      return;
    }
    navigatePage(data);
  };

  return (
    <Container activityOpacity={0.7} onPress={detailMovie}>
      {data?.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
        />
      ) : (
        <Title>Veio sem foto</Title>
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Icon name="star" size={12} color="#E7A74E" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}
