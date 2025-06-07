import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, Alert, TextInput, Text, View, Image, ScrollView } from 'react-native';
import { colors } from '../styles/Colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RooteStackParamList, Usuario } from '../types/types';
import { deletarUsuario, buscarUsuarioPorId, editarUsuario } from '../services/UsuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEdit, setNomeEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [cidadeEdit, setCidadeEdit] = useState('');


  useEffect(() => {
    const carregarUsuario = async () => {
    const dados = await AsyncStorage.getItem('usuario');
    if (dados) {
      const usuarioSalvo: Usuario = JSON.parse(dados);

      if (usuarioSalvo.id !== undefined) {
        try {
          const response = await buscarUsuarioPorId(usuarioSalvo.id);
          if (response.status === 200) {
            setUsuario(response.data);
            setNomeEdit(response.data.nome);
            setEmailEdit(response.data.email);
            setCidadeEdit(response.data.cidade);
          } else {
            setUsuario(usuarioSalvo); 
          }
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          setUsuario(usuarioSalvo);
        }
      } else {
        console.warn('ID do usuário não encontrado');
        setUsuario(usuarioSalvo);
      }
    }
  };


    carregarUsuario();
  }, []);

  const handleSair = async () => {
    await AsyncStorage.removeItem('usuario');
    const response = await deletarUsuario(usuario?.id || 0);
    if (response.status === 200) {
      navigation.navigate('Login');
    }
  };

  const handleSalvarEdicao = async () => {
    if (!nomeEdit || !emailEdit || !cidadeEdit) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const usuarioAtualizado = {
      ...usuario,
      nome: nomeEdit,
      email: emailEdit,
      cidade: cidadeEdit,
    };

    try {
      if (usuario?.id) {
        const response = await editarUsuario(usuario.id, usuarioAtualizado);
        if (response.status === 200) {
          await AsyncStorage.setItem('usuario', JSON.stringify(response.data));
          setUsuario(response.data);
          setModalVisible(false);
          Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        } else {
          Alert.alert('Erro', 'Não foi possível atualizar os dados na API');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar dados editados:', error);
      Alert.alert('Erro', 'Erro ao salvar dados na API');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.dadosPerfil}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/20.jpg' }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.nome}>{usuario?.nome || 'Nome não encontrado'}</Text>
          <Text style={styles.email}>E-mail: {usuario?.email || 'Email não encontrado'}</Text>
          <Text style={styles.badge}>Badge: {usuario?.badge || 'Bronze'}</Text>
        </View>
      </View>
      <View style={styles.atividadeContainer}>
        <ScrollView>
          <Text style={styles.nome}>Atividades Recentes</Text>
        </ScrollView>
      </View>
      <Button title="Excluir conta" style={styles.buttonSair} onPress={handleSair} />
      <Button title="E" style={styles.buttonEditar} onPress={() => {setModalVisible(true)}} />
      <View style={{ height: '10%' }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.nome}>Editar Perfil</Text>
            <TextInput
              placeholder="Nome"
              value={nomeEdit}
              onChangeText={setNomeEdit}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={emailEdit}
              onChangeText={setEmailEdit}
              style={styles.input}
            />
            <TextInput
              placeholder="Cidade"
              value={cidadeEdit}
              onChangeText={setCidadeEdit}
              style={styles.input}
            />
            <Button title="Salvar" style={styles.ButtonModalSalvar} onPress={handleSalvarEdicao} />
            <Button title='Cancelar' style={styles.ButtonModalCancelar} onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  dadosPerfil: {
    flexDirection: 'row',
    height: '20%',
    width: '90%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  image: {
    backgroundColor: colors.secondary,
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: colors.secondary,
  },
  badge: {
    fontSize: 14,
    color: colors.secondary,
    borderRadius: 10,
  },  
  atividadeContainer: {
    height: '60%',
    width: '90%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  atividade: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
  },
  buttonSair: {
    position: 'absolute',
    bottom: 20,
    height: 50,
    width: '40%',
    marginTop: 20,
    backgroundColor: colors.secondary,
    borderRadius: 25,
    elevation: 5,
  },
  buttonEditar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    marginTop: 10,
    backgroundColor: colors.secondary,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
  input: {
      height: 40,
      borderColor: colors.primary,
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 15,
      width: '100%',
  },
  ButtonModalSalvar: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  ButtonModalCancelar: {
    marginTop: 20,
    backgroundColor: colors.danger,
    borderRadius: 15,
  },
});