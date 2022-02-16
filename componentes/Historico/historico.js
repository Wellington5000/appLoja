import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Image, Text, ActivityIndicator, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-community/async-storage';

const Historico = ({navigation}) => {
  const [data, setData] = useState([])
  const [valorTotal, setValorTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Erro ao buscar histórico',
      'Por favor, tente mais tarde',
      [{text: 'Ok', onPress: () => console.log('OK Pressed')}],
    );

  moment.locale('pt-BR')
  async function historico(){
    const value = await AsyncStorage.getItem('cpfCnpj');
    try {
      await axios.post(BASEURL + '/historico', {cpf_cnpj: value}).then((res) => {
        setData(res.data.cobrancas)
        var valor_total = res.data.cobrancas.reduce((a, b) => a + (b['value'] || 0), 0);
        
        setValorTotal(valor_total - (valor_total * (res.data.loja.porcentagem_desconto / 100)))
        setLoading(true)
      })
    } catch (error) {
      createTwoButtonAlert()
    }
  }

  useEffect(() => {
    historico()
  }, []);
  console.log(data)
  return (
    <View style={estilos.container}>
      <View style={estilos.imagens}>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <Image style={estilos.imagem} source={require('../../images/vectorpaint.png')}></Image>
        </TouchableOpacity>
        <Image style={estilos.imagemLogo} source={require('../../images/logo.png')}></Image>
      </View>
      <Text style={estilos.textoHistorico}>Histórico</Text>
      <View style={estilos.painelBranco}>
        <View style={estilos.painelTotalCashabck}>
        <NumberFormat 
            value={valorTotal / 100} 
            decimalScale={2}
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'R$ '} 
            renderText={(value, props) => 
            <Text style={estilos.textoTotalCashback}>
              Faturamento no mês                                                  {value}
            </Text>} 
          />
        </View>
        
        <View style={estilos.painelInterno}>
          <FlatList 
            data={data}
            keyExtractor={({identifier}) => identifier.toString()}
            renderItem={({item}) => <View  style={estilos.painelInternoHistorico}>
              <NumberFormat 
                value={item.value / 100} 
                decimalScale={2}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'R$ '} 
                renderText={(value, props) => 
                  <Text style={estilos.textoPainelHistorico}>
                   {value}                                                           {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                  </Text>} 
              />
          </View>}
          />
        </View>
      </View>
      {(loading) ? console.log('') : <View style={estilos.loading}>
          <ActivityIndicator animating={true} size={70} color="#31C7D0"  />
        </View>
      }
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
  imagem: {
    marginTop: 90,
    marginLeft: 30,
    width: 25,
    height: 25
  },    
  textoHistorico: {
    marginTop: 50,
    marginLeft: 270,
    color: 'white',
    fontSize: 25,
  },
  painelBranco: {
    marginTop: 10,
    height: 670,
    width: 400,
    backgroundColor: 'white',
  },
  painelTotalCashabck: {
    width: 400,
    height: 40,
    backgroundColor: '#303539',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoTotalCashback: {
    color: 'white',
  },
  painelInterno: {
    marginTop: 40,
    height: 500,
    width: 400,
    backgroundColor: '#E9E9E9',
  },
  painelInternoHistorico: {
    width: 400,
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoPainelHistorico: {
    color: 'black',
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

export default Historico;
