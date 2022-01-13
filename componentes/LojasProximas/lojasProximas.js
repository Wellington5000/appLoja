import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GerarQRCode = ({navigation}) => {
  return (
    <View style={estilos.container}>
      <View style={estilos.imagens}>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <Image style={estilos.imagem} source={require('../../images/vectorpaint.png')}></Image>
        </TouchableOpacity>
        <Image style={estilos.imagemLogo} source={require('../../images/logo.png')}></Image>
      </View>
      <Text style={estilos.textoHistorico}>Código QR</Text>
      <View style={estilos.painelBranco}>
        <View>
            <Image style={estilos.imagemMapa} source={{uri: 'data:image/jpeg;base64,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'}}></Image>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#31C7D0',
  },
  painelBranco: {
    alignItems: 'center',
    marginTop: 10,
    height: 670,
    width: 400,
    backgroundColor: 'white',
  },
  imagem: {
    marginTop: 90,
    marginLeft: 30,
    width: 25,
    height: 25
  }, 
  imagemMapa: {
    marginTop: 50,
    width: 350,
    height: 350
  }, 
  textoHistorico: {
    marginTop: 50,
    marginLeft: 250,
    color: 'white',
    fontSize: 25,
  },
  botaoResgatar: {
    width: 200,
    height: 40,
    backgroundColor: '#31C7D0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 100
  },
  textoResgatar: {
      color: 'white',
      fontSize: 18
  },
  imagemLogo: {
      width: 80,
      height: 80,
      marginLeft: 250,
      marginTop: 70
  },
  imagens: {
      flexDirection: 'row'
  }
});

export default GerarQRCode;
