import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/Colors";
import { getCidades } from "../services/VoluntarioService";
import Filtro from "../components/Filtro";
import {criarPost} from "../services/PostService"; // Supondo que você tenha um serviço para criar posts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RooteStackParamList, RooteTabParamList } from "../types/types";

const CriarPost: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RooteStackParamList>>();
  const tipos = ["Geral", "Alerta", "Abrigo", "Dica", "Emergência"];
  const [descricao, setDescricao] = useState("");
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [localizacao, setLocalizacao] = useState("");
  const [tipo, setTipo] = useState("Geral");
  const [cidades, setCidades] = useState<string[]>([]);

  useEffect(() => {
    async function carregarCidades() {
      try {
        const dados = await getCidades();
        setCidades(dados);
        setLocalizacao(dados[0]);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    }

    carregarCidades();
  }, []);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos da sua permissão para acessar as imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const handlePostar = async () => {
    if (!descricao || !imagemUri || !localizacao) {
      Alert.alert("Atenção", "Preencha todos os campos e selecione uma imagem.");
      return;
    }

    try {
      
      const novoPost = {
        tipo,
        descricao,
        imagem: imagemUri,
        localizacao: localizacao,
      };

      await criarPost(novoPost);

      Alert.alert("Sucesso", "Post criado com sucesso!");
      setDescricao("");
      setImagemUri(null);
      setLocalizacao(cidades[0]);

      navigation.navigate('Tabs', { screen: 'Home' });
    } catch (error) {
      console.error("Erro ao criar post:", error);
      Alert.alert("Erro", "Não foi possível criar o post.");
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar novo post</Text>

      <Filtro
        style={styles.filtro}
        options={tipos}
        selected={tipo}
        onSelect={setTipo}
      />

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      {imagemUri && (
        <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
      )}
      
      <TouchableOpacity style={styles.imageButton} onPress={escolherImagem}>
        <Text style={styles.imageButtonText}>
          {imagemUri ? "Alterar imagem" : "Selecionar imagem"}
        </Text>
      </TouchableOpacity>


      <Filtro
        options={cidades}
        selected={localizacao}
        onSelect={setLocalizacao}
        style={styles.filtro}
      />

      <TouchableOpacity style={styles.button} onPress={handlePostar}>
        <Text style={styles.buttonText}>Postar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  imageButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  filtro: {
    width: "100%",
    marginBottom: 20,
  },
});

export default CriarPost;
