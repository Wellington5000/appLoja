import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Image, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import moment from 'moment'

const Historico = ({navigation}) => {
  const [data, setData] = useState([])
  const [valorTotal, setValorTotal] = useState(0)
  moment.locale('pt-BR')
  async function historico(){
    await axios.post('https://api-pix.herokuapp.com/historico', {cpf_cnpj: '61862470316'}).then((res) => {
      setData(res.data)
      var valor_total = res.data.reduce((a, b) => a + (b['value'] || 0), 0);
      console.log(valor_total)
      setValorTotal(valor_total)

    })
  }

  useEffect(() => {
    historico()
  }, []);
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
          <Text style={estilos.textoTotalCashback}>
            Faturamento no mês                                                  R$ {valorTotal}
          </Text>
        </View>
        <View style={estilos.painelInterno}>
          <FlatList 
            data={data}
            keyExtractor={({identifier}) => identifier.toString()}
            renderItem={({item}) => <View  style={estilos.painelInternoHistorico}>
            <Text style={estilos.textoPainelHistorico}>
               R$ {item.value}                                                           {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>}
          />
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
  }
});

export default Historico;
