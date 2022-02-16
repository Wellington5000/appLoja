import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GerarQRCode = ({route, navigation}) => {
  const [loading, setLoading] = useState(false)
  setTimeout(() => setLoading(true), 3000)
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
            <Image style={estilos.imagemMapa} source={{uri: route.params.qrCodeImage}}></Image>
        </View>
      </View>
      {(loading) ? console.log('') : <View style={estilos.loading}>
          <ActivityIndicator animating={true} size={70} color="#31C7D0"  />
        </View>}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center'
  }
});

export default GerarQRCode;
