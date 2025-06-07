import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { colors } from '../styles/Colors';
import Button from '../components/Button';
import Filtro from '../components/Filtro'; 

export default function Emergencia() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoAjuda, setTipoAjuda] = useState('');
  const tipos = [
    'Apoio psicológico',
    'Reparos domésticos',
    'Doação de alimentos',
    'Transporte',
    'Cuidados médicos',
  ];

  const enviarPedido = () => {
    if (!tipoAjuda) {
      Alert.alert('Selecione um tipo de ajuda antes de enviar.');
      return;
    }
    Alert.alert('Pedido enviado', `Ajuda urgente solicitada para: ${tipoAjuda}`);
    setModalVisible(false);
    setTipoAjuda('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajuda Urgente</Text>

      <View style={styles.content}>
        <Text style={styles.text}>
          Se você está enfrentando uma emergência, por favor, entre em contato com os serviços de emergência locais imediatamente.
        </Text>
        <Text style={styles.text}>
          Lembre-se de que sua segurança é a prioridade máxima.
        </Text>

        <Button
          title="PRECISO DE AJUDA"
          onPress={() => setModalVisible(true)}
          style={styles.button}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o tipo de ajuda</Text>

            <Filtro options={tipos} selected={tipoAjuda} onSelect={setTipoAjuda} />

            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={enviarPedido}>
                <Text style={styles.modalButtonText}>Enviar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.danger }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Voltar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ height: '10%' }}></View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  content: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "50%",
    backgroundColor: colors.secondary,
    elevation: 15,
  },  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});