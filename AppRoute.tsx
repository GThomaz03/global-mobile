import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import  Home  from './screens/Home';
import  Mapa  from './screens/Mapa';
import  Emergencia  from './screens/Emergencia';
import  Abrigo  from './screens/Abrigo';
import  RedeSolidaria  from './screens/RedeSolidaria';
import  Perfil  from './screens/Perfil';
import { NavigationContainer } from '@react-navigation/native';


const {Navigator, Screen} = createBottomTabNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
        <Navigator>
            <Screen name="Home" component={Home} />
            <Screen name="Mapa" component={Mapa} />
            <Screen name="Emergência" component={Emergencia} />
            <Screen name="Abrigo+" component={Abrigo} />
            <Screen name="Rede Solidária" component={RedeSolidaria} />
            <Screen name="Perfil" component={Perfil} />
        </Navigator>
    </NavigationContainer>
  );
};

export default Routes;

