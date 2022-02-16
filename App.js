import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './componentes/MainScreen/homeScreen';
import StartScreen from './componentes/StartScreen/startScreen';
import Payment from './componentes/Payment/payment'
import Historico from './componentes/Historico/historico'
import Resgatar from './componentes/Resgatar/resgatar'
import GerarQRCode from './componentes/LojasProximas/lojasProximas';
import GerarCobranca from './componentes/GerarCobranca/gerarCobranca'
import Cadastro from './componentes/cadastro/cadastro';

const Stack = createStackNavigator();
global.BASEURL = 'http://192.168.18.8:3000'
global.Saldo = 0
//global.BASEURL = 'https://api-pix.herokuapp.com'
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro"         component={Cadastro} />
        <Stack.Screen name="StartScreen"      component={StartScreen} />
        <Stack.Screen name="HomeScreen"       component={HomeScreen} />
        <Stack.Screen name="Payment"          component={Payment} />
        <Stack.Screen name="Historico"        component={Resgatar} />
        <Stack.Screen name="Resgatar"         component={Historico} />
        <Stack.Screen name="GerarCobranca"    component={GerarCobranca} />
        <Stack.Screen name="GerarQRCode"      component={GerarQRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
