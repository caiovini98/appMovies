import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Container, BannerItem, RateContainer, Rate, Title} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SliderItem() {
  return (
    <Container activeOpacity={0.71}>
      <BannerItem
        source={{
          uri: 'https://i.pinimg.com/564x/ec/be/58/ecbe58f45eee2de4471b23233a792af1.jpg',
        }}
      />

      <Title numberOfLines={1}>Vingadores</Title>
      <RateContainer>
        <Icon name="star" size={12} color="#E7A74E" />
        <Rate>9/10</Rate>
      </RateContainer>
    </Container>
  );
}
