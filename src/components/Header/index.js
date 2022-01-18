import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, MenuButton, Title} from './styles';

function Header({title}) {
  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={36} color="#FFF" />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  );
}

export default Header;
