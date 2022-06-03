import React from 'react';
import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function FavoriteItem({data, deleteMovie, navigateDetail}) {
  return (
    <Container>
      <Title size={22}>{data?.title}</Title>

      <RateContainer>
        <Icon name="star" size={12} color="#E7A74E" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigateDetail(data)}>
          <Title size={14}>Ver detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => deleteMovie(data.id)}>
          <Icon name="delete-outline" size={24} color="#FFF" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default FavoriteItem;
