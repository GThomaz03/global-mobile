import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import {colors} from '../styles/Colors';
import Button from '../components/Button';
import Post from '../components/Post';
import Filtro from '../components/Filtro';
import { getCidades,  } from '../services/VoluntarioService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RooteStackParamList } from '../types/types';
import { listarPosts } from '../services/PostService';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();
  const [cidades, setCidades] = React.useState<string[]>([]);
  const [filtroCidade, setFiltroCidade] = React.useState<string>('');
  const [busca, setBusca] = React.useState<string>('');
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

    useFocusEffect(
      useCallback(() => {
        async function carregarPosts() {
          try {
            const dadosPosts = await listarPosts();
            setPosts(dadosPosts.data);
          } catch (error) {
            console.error("Erro ao buscar posts:", error);
          } finally{
            setLoading(false);
          }
        }
        carregarPosts();
      }, [])
    );

  useFocusEffect(
  useCallback(() => {
    async function carregarCidades() {
      try {
        const dadosCidades = await getCidades();
        setCidades(dadosCidades);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    }
    carregarCidades();
  }, [])
  );


  
  const postsFiltrados = posts.filter((post) =>
    (filtroCidade && filtroCidade !== 'Todas' ? post.localizacao === filtroCidade : true) &&
    (busca ? post.descricao.toLowerCase().includes(busca.toLowerCase()) : true)
  );


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar..." style={styles.searchInput} value={busca} onChangeText={setBusca} />
        <Filtro
            options={cidades}
            selected={filtroCidade}
            onSelect={setFiltroCidade}
            style={styles.filtro}
          />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList style={styles.postsContainer}
          data={postsFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Post
              localizacao={item.localizacao}
              imagem={item.imagem}
              descricao={item.descricao}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
      <Button title="+" style={styles.button} onPress={() => { navigation.navigate('Criar Post'); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    marginBottom: 20,
    paddingTop: 30,
  },
  searchInput: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: '60%',
  },
  filtro: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
}); 