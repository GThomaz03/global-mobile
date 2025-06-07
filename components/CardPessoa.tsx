import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../styles/Colors";

interface CardPessoaProps {
  nome: string;
  cidade: string;
  imagem: string;
  areaAtuacao: string;
}

const CardPessoa = ({ nome, cidade, imagem, areaAtuacao }: CardPessoaProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{nome}</Text>
        <Text style={styles.city}>{cidade}</Text>
      </View>
      <View style={styles.infoContainerTipoAjuda}>
        <Text style={styles.name}>{areaAtuacao}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  infoContainerTipoAjuda: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  city: {
    fontSize: 14,
    color: colors.secondary,
  },
});

export default CardPessoa;
