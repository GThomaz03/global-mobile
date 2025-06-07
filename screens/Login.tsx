import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {colors} from '../styles/Colors';
import Button from '../components/Button';
import { loginUsuario } from '../services/UsuarioService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RooteStackParamList, Usuario} from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha o email e a senha');
      return;
    }

    try {
      const response = await loginUsuario(email, senha);
      if (response.status === 200 && response.data) {
        const usuarioLogado: Usuario = response.data;
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        navigation.navigate('Tabs', { screen: 'Home' });
      } else {
        alert('Email ou senha incorretos!');
      }
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rota Segura</Text>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
        <Text style={styles.link}>Esqueceu a senha?</Text>
        <Button title="Entrar" onPress={handleLogin} style={styles.button} />
      </View>
      <Text style={styles.link} onPress={() => navigation.navigate('Criar Conta')} >Não tem uma conta? Cadastre-se</Text>
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