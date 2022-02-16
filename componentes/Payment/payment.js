import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Payment = ({navigation}) => {
  const [dadosBancarios, setDadosBancarios] = useState({});
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const createTwoButtonAlert = () =>
    Alert.alert('Erro ao buscar seus dados', 'Por favor, tente mais tarde', [
      {text: 'Ok', onPress: () => console.log('OK Pressed')},
    ]);

  async function verificaSaldo() {
    const value = await AsyncStorage.getItem('cpfCnpj');
    try {
      await axios.post(BASEURL + '/', {cpf_cnpj: value}).then(res => {
        setLoading(true);
        setDadosBancarios(res.data);
        Saldo = dadosBancarios.saldo_disponivel;
      });
    } catch (error) {
      createTwoButtonAlert();
    }
  }

  useEffect(() => {
    if (isFocused) {
      verificaSaldo();
    }
  }, [isFocused]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.textoSaldoDisponivel}>Saldo Disponível</Text>
      <View style={estilos.painelValorDisponivel}>
        <NumberFormat
          value={dadosBancarios.saldo_disponivel}
          decimalScale={2}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'R$ '}
          renderText={(value, props) => (
            <Text style={estilos.textoValorDisponivel}>{value}</Text>
          )}
        />
      </View>

      <View style={estilos.painel}>
        <TouchableOpacity
          style={estilos.botaoResgatar}
          onPress={() => navigation.navigate('GerarCobranca')}>
          <Text style={estilos.texto}>Gerar Cobrança</Text>
          <Image
            style={estilos.imagem}
            source={require('../../images/money-flow.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botaoResgatar}
          onPress={() => navigation.navigate('Resgatar')}>
          <Text style={estilos.texto}>Histórico de Vendas</Text>
          <Image
            style={estilos.imagem}
            source={require('../../images/elegant-antique-building-shape-with-columns.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botaoResgatar}
          onPress={() =>
            navigation.navigate('Historico', {dadosBancarios: dadosBancarios})
          }>
          <Text style={estilos.texto}>Resgate de Saldo</Text>
          <Image
            style={estilos.imagem}
            source={require('../../images/forma-de-pagamento.png')}></Image>
        </TouchableOpacity>
      </View>
      {loading ? (
        console.log('')
      ) : (
        <View style={estilos.loading}>
          <ActivityIndicator animating={true} size={70} color="#31C7D0" />
        </View>
      )}
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
  textoSaldoDisponivel: {
    color: 'white',
    marginTop: 10,
  },
  painelValorDisponivel: {
    width: 200,
    height: 40,
    backgroundColor: '#303539',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoValorDisponivel: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  painel: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: 550,
    width: 400,
    backgroundColor: '#E9E9E9',
  },
  texto: {
    color: '#303539',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 12,
  },
  botaoResgatar: {
    borderRadius: 30,
    marginBottom: 80,
    marginTop: -50,
    height: 150,
    width: 300,
    backgroundColor: 'white',
  },
  imagem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginLeft: 110,
    marginTop: 20,
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default Payment;
