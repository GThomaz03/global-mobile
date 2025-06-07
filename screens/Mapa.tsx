import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {colors} from '../styles/Colors';
import MapView, {Marker, Circle} from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import Filtro from '../components/Filtro';
import { listarPontos } from '../services/PontosService';


export default function Mapa() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [todosPontos, setTodosPontos] = useState<any[]>([]);
  const [pontosInteresse, setPontosInteresse] = useState<any[]>([]);

  const filtroOptions = [
    'abrigos',
    'ponto de coleta',
    'voluntários',
    'eventos',
  ];

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissions(){
    const {granted} = await requestForegroundPermissionsAsync();
    
    if (granted) {
      const currentPostion = await getCurrentPositionAsync();
      setLocation(currentPostion); 
    } 
  }
  

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    async function carregarPONTOS() {
      try {
        const dadosPontos = await listarPontos();
        setTodosPontos(dadosPontos.data);
        setPontosInteresse(dadosPontos.data);
      } catch (error) {
        console.error("Erro ao buscar pontos de interesse:", error);
      }
    }
    carregarPONTOS();
  }, []);

  useEffect(() => {
    if (location) {
       watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        distanceInterval: 1,
        timeInterval: 1000,
      }, (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords,
        });
      });
    }
  }, [location]);


  const filterPontosInteresse = (tipo: string) => {
    if (tipo === 'Todos') {
      setPontosInteresse(todosPontos);
    } else {
      const filtered = todosPontos.filter(ponto => ponto.tipo === tipo);
      setPontosInteresse(filtered);
    }
  };
  
  useEffect(() => {
    filterPontosInteresse('Todos');
  }, []);

  return (
    <View style={styles.container}>
      {  location ? (
          <MapView 
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Circle 
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={10}
              fillColor="rgb(7, 133, 251)"
              strokeColor="rgb(7, 133, 251)"
              
            />

            {pontosInteresse.map((ponto, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(ponto.latitude),
                  longitude: parseFloat(ponto.longitude),
                }}
                title={ponto.titulo}
                description={ponto.descricao}
              />
            ))}

          </MapView>
      ) : (
        <Text>Localização não disponível</Text>
      )}
      <Filtro options={filtroOptions}
              style={styles.filtro}
              selected={filtroOptions[0]}
              onSelect={(option) => filterPontosInteresse(option)} />
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
  map:{
    flex: 1,
    width: '100%',
  },
  filtro:{
    position: 'absolute', 
    backgroundColor: colors.background,
    width: 100,
    top: 25, 
    right: 20, 
    zIndex: 1
  }
});