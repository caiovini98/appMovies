import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Container, BannerItem, RateContainer, Rate, Title} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SliderItem({data, navigateDetailsPage}) {
  return (
    <Container activeOpacity={0.71} onPress={() => navigateDetailsPage(data)}>
      <BannerItem
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        }}
      />

      <Title numberOfLines={1}>{data.title}</Title>
      <RateContainer>
        <Icon name="star" size={12} color="#E7A74E" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}
