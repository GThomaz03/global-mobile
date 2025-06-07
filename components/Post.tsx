import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/Colors"; 



interface PostProps {
  localizacao: string;
  imagem: string;
  descricao: string;
}

const Post: React.FC<PostProps> = ({ localizacao, imagem, descricao }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {localizacao}
      </Text>
      <Image source={{ uri: imagem }} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#dfdfdf',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginBottom: 20,
  },
  title: {
    backgroundColor: colors.backgroundTitlePost,
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    paddingHorizontal: 10,
  },
  content: {
    fontSize: 14,
    color: colors.primary,
  },
    image: {
        width: "100%",
        height: 400,
    },
    descriptionContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: colors.light,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.primary,
    },
});



export default Post;