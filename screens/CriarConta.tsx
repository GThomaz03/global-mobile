import React from 'react';
import {Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import {colors} from '../styles/Colors';
import Button from '../components/Button';
import { criarUsuario } from '../services/UsuarioService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RooteStackParamList, RooteTabParamList, Usuario } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CriarConta() {
    const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();

    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');

    const handleCriarConta = async () => {
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem!');
        return;
      }

      if (!nome || !email || !senha || !cidade) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos!');
        return;
      }

      try {
        const novoUsuario: Usuario = {
          nome,
          email,
          senha,
          cidade,
        };

        const response = await criarUsuario(novoUsuario);

        if (response.status === 200 && response.data) {
          const usuarioSalvo: Usuario = response.data;

          await AsyncStorage.setItem('usuario', JSON.stringify(usuarioSalvo));

          Alert.alert("Sucesso", "Conta criada com sucesso!");
          navigation.navigate('Tabs', { screen: 'Home' as keyof RooteTabParamList });
        } else {
          Alert.alert("Erro", "Erro ao criar conta. Tente novamente.");
        }
      } catch (error: any) {
        console.error('Erro ao criar conta:', error);
        Alert.alert("Erro", error.response?.data?.message || "Não foi possível criar a conta.");
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rota Segura</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Cidade" style={styles.input} value={cidade} onChangeText={setCidade} />
          <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} />
          <TextInput placeholder="Confirme a Senha" style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} />
        <Button title="Criar Conta" onPress={handleCriarConta} style={styles.button} />
      </View>
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Já tem uma conta? Faça login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-around',

    },
    inputContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        width: '100%',
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    link: {
        color: colors.primary,
        marginTop: 10,
    },
    button: {
        marginTop: 20,
    },
});