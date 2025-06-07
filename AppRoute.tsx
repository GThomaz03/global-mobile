import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import Home from './screens/Home';
import Mapa from './screens/Mapa';
import Emergencia from './screens/Emergencia';
import RedeSolidaria from './screens/RedeSolidaria';
import Perfil from './screens/Perfil';
import Login from './screens/Login';
import CriarConta from './screens/CriarConta';
import Cadastro from './screens/Cadastro';
import CriarPost from './screens/CriarPost';
import { RooteStackParamList } from './types/types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RooteStackParamList>();

function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Mapa" component={Mapa} options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="map" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Emergência" component={Emergencia} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="exclamationcircleo" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Rede Solidaria" component={RedeSolidaria} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="hearto" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Criar Conta" component={CriarConta} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Criar Post" component={CriarPost} />
      <Stack.Screen name="Tabs" component={TabRoutes} />
    </Stack.Navigator>
  );
}
