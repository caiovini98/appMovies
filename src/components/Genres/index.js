import React from 'react';
import {Container, Title} from './styles';

export default function Genres({data}) {
  return (
    <Container>
      <Title>{data?.name}</Title>
    </Container>
  );
}
