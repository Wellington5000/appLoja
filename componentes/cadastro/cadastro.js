import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, ActivityIndicator, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import UseLocalizacao from '../../permissao-localizacao/permissão-localizacao';
import AsyncStorage from '@react-native-community/async-storage';

const Cadastro = ({navigation}) => {
  const storeKey = 'cpfCnpj';
  const [nomeLoja, onChangeNomeLoja] = useState('');
  const [cpfCnpj, onChangeCpfCnpj] = useState('');
  const [porcentagemDesconto, onChangePorcentagemDesconto] = useState('');
  const [chavePix, onChangeChavePix] = useState('');
  const [tipoChave, onChangeTipoChave] = useState('');
  const [cadastrado, onChangeCadastrado] = useState(false);
  const {coords, errorMsg} = UseLocalizacao()
  const [loading, setLoading] = useState(true)

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Erro ao cadastrar loja',
      'Por favor, revise os dados informados',
      [{text: 'Ok', onPress: () => console.log('OK Pressed')}],
    );
  
  async function cadastrar(navigation) {
    setLoading(true)
    try {
      await axios
      .post(BASEURL + '/cadastrar_loja', {
        nome_loja: nomeLoja,
        cpf_cnpj: cpfCnpj,
        chave_pix: chavePix,
        tipo_chave_pix: tipoChave,
        latitude: coords.latitude,
        longitude: coords.longitude,
        porcentagem_desconto: porcentagemDesconto,
      })
      .then(async result => {
        setLoading(false)
        await AsyncStorage.setItem(storeKey, cpfCnpj);
        navigation.navigate('Payment');
      });
    } catch (error) {
      createTwoButtonAlert()
    }
  }

  async function getCpfCnpj() {
    var value = await AsyncStorage.getItem(storeKey);
    value ? onChangeCadastrado(true) : onChangeCadastrado(false);
  }
  useEffect(() => {
    getCpfCnpj();
  }, []);

  
  return (
    <View style={estilos.container}>
      {cadastrado ? (
        <View>{navigation.navigate('Payment')}</View>
      ) : (
        <View style={estilos.container}>
          <Image
            style={estilos.imagem}
            source={require('../../images/logo.png')}></Image>
          <Text style={estilos.textoCadastro}>Cadastre-se</Text>

          <View style={estilos.itens}>
            <Text style={estilos.textInput}>Nome da Loja</Text>
            <TextInput
              placeholder="Ex: Minha Loja"
              placeholderTextColor="#909090"
              style={estilos.input}
              onChangeText={onChangeNomeLoja}
              value={nomeLoja}
            />
            <Text style={estilos.textInput}>CPF/CNPJ</Text>
            <TextInput
              placeholder="Ex: 12345678901 (Apenas números)"
              placeholderTextColor="#909090"
              keyboardType="numeric"
              style={estilos.input}
              onChangeText={onChangeCpfCnpj}
              value={cpfCnpj}
            />
            <Text style={estilos.textInput}>Porcentagem de Desconto</Text>
            <TextInput
              placeholder="Ex: 10"
              placeholderTextColor="#909090"
              keyboardType="numeric"
              style={estilos.input}
              onChangeText={onChangePorcentagemDesconto}
              value={porcentagemDesconto}
            />
            <Text style={estilos.textInput}>Chave Pix</Text>
            <TextInput
              placeholder="Ex: 123456789"
              placeholderTextColor="#909090"
              style={estilos.input}
              onChangeText={onChangeChavePix}
              value={chavePix}
            />
            <Text style={estilos.textInput}>Tipo de Chave</Text>
            <TextInput
              placeholder="Ex: Email"
              placeholderTextColor="#909090"
              style={estilos.input}
              onChangeText={onChangeTipoChave}
              value={tipoChave}
            />
          </View>

          <TouchableOpacity
            style={estilos.botaoResgatar}
            onPress={() => cadastrar(navigation)}>
            <Text style={estilos.textoResgatar}>Cadastrar</Text>
          </TouchableOpacity>
          <Text style={estilos.textoFooter}>Saiba mais</Text>
        </View>
      )}
      {(loading) ? console.log('') : <View style={estilos.loading}>
          <ActivityIndicator animating={true} size={70} color="#31C7D0"  />
        </View>}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31C7D0',
  },
  imagem: {
    width: 70,
    height: 70,
    marginTop: 0,
    marginBottom: 30,
  },
  input: {
    height: 40,
    margin: 10,
    width: 300,
    marginLeft: 40,
    marginBottom: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#303539',
  },
  itens: {
    width: 380,
    height: 480,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  textInput: {
    marginLeft: 40,
    marginBottom: -10,
    marginTop: 20,
    color: '#303539',
  },
  textoCadastro: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -50,
    marginBottom: 30,
  },
  textoFooter: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  botaoResgatar: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 15,
  },
  textoResgatar: {
    color: '#303539',
    fontSize: 15,
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center'
  }
});

export default Cadastro;
