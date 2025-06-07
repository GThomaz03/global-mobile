import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, ActivityIndicator, View } from 'react-native';
import {colors} from '../styles/Colors';
import CardPessoa from '../components/CardPessoa';
import Filtro from '../components/Filtro';
import Button from '../components/Button';
import {getCidades, getPessoas, getTiposAjuda} from '../services/VoluntarioService';
import { Voluntario } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RooteStackParamList } from '../types/types';

export default function RedeSolidaria() {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();

  const [pessoas, setPessoas] = useState<Voluntario[]>([]);
  const [tiposAjuda, setTiposAjuda] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [filtroAjuda, setFiltroAjuda] = useState<string>('');
  const [filtroCidade, setFiltroCidade] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  setPessoas([
  {
    id: 10,
    nome: "Ana Silva",
    cidade: "São Paulo",
    areaAtuacao: "Transporte",
    imagem: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 20,
    nome: "Carlos Souza",
    cidade: "Rio de Janeiro",
    areaAtuacao: "Transporte",
    imagem: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 30,
    nome: "Maria Oliveira",
    cidade: "Belo Horizonte",
    areaAtuacao: "Pintura",
    imagem: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 40,
    nome: "Pedro Santos",
    cidade: "Curitiba",
    areaAtuacao: "Apoio psicológico",
    imagem: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 50,
    nome: "Fernanda Lima",
    cidade: "Fortaleza",
    areaAtuacao: "Pintura",
    imagem: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    id: 60,
    nome: "Lucas Pereira",
    cidade: "Salvador",
    areaAtuacao: "Aulas de informática",
    imagem: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    id: 70,
    nome: "Juliana Costa",
    cidade: "Porto Alegre",
    areaAtuacao: "Reparos domésticos",
    imagem: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    id: 80,
    nome: "Rafael Almeida",
    cidade: "Recife",
    areaAtuacao: "Doação de livros",
    imagem: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    id: 90,
    nome: "Patrícia Martins",
    cidade: "Brasília",
    areaAtuacao: "Cuidados infantis",
    imagem: "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    id: 100,
    nome: "Thiago Fernandes",
    cidade: "Manaus",
    areaAtuacao: "Distribuição de máscaras",
    imagem: "https://randomuser.me/api/portraits/men/10.jpg"
  }
]);
  }, []);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [dadosPessoas, dadosCidades, dadosTipos] = await Promise.all([
          getPessoas(),
          getCidades(),
          getTiposAjuda(),
        ]);

        setPessoas((prevPessoas) => [...prevPessoas, ...dadosPessoas]);
        setCidades(dadosCidades);
        setTiposAjuda(dadosTipos);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const pessoasFiltradas = pessoas.filter((pessoa) =>
    (filtroAjuda ? pessoa.areaAtuacao === filtroAjuda : true) &&
    (filtroCidade ? pessoa.cidade === filtroCidade : true)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rede solidária</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.text}>Tipo de ajuda:</Text>
        <Filtro
          options={tiposAjuda}
          selected={filtroAjuda}
          onSelect={setFiltroAjuda}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.text}>Cidade:</Text>
        <Filtro
          options={cidades}
          selected={filtroCidade}
          onSelect={setFiltroCidade}
        />
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList style={styles.cardsContainerScroll}
          keyExtractor={(item) => item.id?.toString() || ''}
          data={pessoasFiltradas || []}
            renderItem={({ item }) => (
              <CardPessoa
                nome={item.nome}
                cidade={item.cidade}
                imagem={item.imagem ? item.imagem : 'https://randomuser.me/api/portraits/men/1.jpg'}
                areaAtuacao={item.areaAtuacao}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
      <View style={{ height: "20%" }}></View>

      <Button title="Quero Ajudar" style={styles.button} onPress={() => {navigation.navigate('Cadastro') }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  text: {
    fontSize: 16,
    color: colors.secondary,
  },
  filter:{
    width: '40%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.secondary,
    elevation: 5,
  },
  cardsContainer:{
    marginTop: 20,
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  cardsContainerScroll: {
    width: '100%',
    paddingLeft: 35,
  },
});