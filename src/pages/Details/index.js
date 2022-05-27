import React, {useState, useEffect} from 'react';
import {ScrollView, Linking, Share} from 'react-native';
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  ShareButton,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import api, {key} from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres';
import {saveMovie} from '../../utils/storage';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState();
  const [openLink, setOpenLink] = useState(false);

  const handleClick = () => {
    if (openLink) {
      Linking.canOpenURL(movie?.homepage).then(supported => {
        if (supported) {
          Linking.openURL(movie?.homepage);
        } else {
          console.log("Don't know how to open URI: " + movie?.homepage);
        }
      });
      setOpenLink(false);
    }
  };

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: `O filme ${movie?.title} pode ser visualizado acessando ${movie?.homepage}`,
        title: `${movie?.title}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(
            'Compartilhado com o tipo de atividade de: ' + result.activityType,
          );
        } else {
          console.log('Compartilhado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Descartado');
      }
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  const getMovies = async () => {
    let isActive = true;
    const ac = new AbortController();
    const response = await api
      .get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR',
        },
      })
      .catch(error => {
        console.log(error);
      });

    if (isActive) {
      setMovie(response.data);
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  };

  const favoriteMovie = async movie => {
    await saveMovie('primeReact', movie);
    alert('Filme salvo na sua lista!');
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" size={28} color="white" />
        </HeaderButton>
        <HeaderButton onPress={() => favoriteMovie(movie)}>
          <Icon name="bookmark-outline" size={28} color="white" />
        </HeaderButton>
      </Header>
      <Banner
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
        }}
        resizeMethod="resize"
      />
      <ShareButton onPress={shareLink}>
        <Icon name="share-variant" size={24} color="black" />
      </ShareButton>
      <ButtonLink onPress={() => setOpenLink(true)}>
        <Icon name="link" size={24} color="white" />
      </ButtonLink>
      <Title numberOfLines={2}>{movie?.title}</Title>
      <ContentArea>
        <Stars
          default={movie?.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Icon name="star" size={24} color="#e7a74e" />}
          emptyStar={<Icon name="star-outline" size={24} color="#e7a74e" />}
          halfStar={<Icon name="star-half" size={24} color="#e7a74e" />}
          disable={true}
        />
        <Rate>{movie?.vote_average}/10</Rate>
      </ContentArea>
      <ListGenres
        data={movie?.genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Genres data={item} />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>
      {handleClick()}
    </Container>
  );
}
