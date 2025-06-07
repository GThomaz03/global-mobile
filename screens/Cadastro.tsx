import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { colors } from "../styles/Colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RooteStackParamList, RooteTabParamList,  Voluntario } from "../types/types";
import { cadastraVoluntario } from "../services/VoluntarioService";

export default function Cadastro() {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();

  const [areaAtuacao, setAreaAtuacao] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cidade, setCidade] = React.useState("");

  const handleCadastro = async (voluntario: Voluntario) => {

    try {
      if (!voluntario.nome || !voluntario.email || !voluntario.telefone || !voluntario.cidade) {
        throw new Error("Todos os campos são obrigatórios.");
      }
      const response = await cadastraVoluntario(voluntario);
      if (response.status === 200) {
        navigation.navigate('Tabs', { screen: 'Rede Solidaria' });
      }
    } catch (error) {
      console.error("Erro ao cadastrar voluntário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Área de Atuação"
          onChangeText={setAreaAtuacao}
          placeholderTextColor={colors.secondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={setNome}
          placeholderTextColor={colors.secondary}
        /> 
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          placeholderTextColor={colors.secondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          onChangeText={setTelefone}
          placeholderTextColor={colors.secondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          onChangeText={setCidade}
          placeholderTextColor={colors.secondary}
        />
      </View>
      <Button title="Cadastrar" style={styles.button} onPress={() => {
        handleCadastro({
          nome,
          email,
          telefone,
          cidade,
          areaAtuacao,
          imagem: "https://randomuser.me/api/portraits/men/1.jpg"
        });
      }} />
      <Button title="Voltar" style={styles.buttonVoltar} onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 5,
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: colors.primary,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonVoltar: {
    marginTop: 10,
    backgroundColor: colors.danger,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

});
