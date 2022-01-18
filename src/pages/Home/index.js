import React from 'react';
import {View, Text} from 'react-native';
import {Container, SearchButton, SearchContainer, Input} from './styles';
import Header from '../../components/Header';
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
    </Container>
  );
}

export default Home;
