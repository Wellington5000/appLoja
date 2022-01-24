import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios'

const GerarCobranca = ({navigation}) => {
  const [valor, onChangeValor] = useState("");
  const [descricao, onChangeDescricao] = useState("")
  const [cpf, onChangeCpf] = useState("")

  async function gerarCobranca(navigation){
    await axios.post('https://api-pix.herokuapp.com/criar_cobranca', {cpf_cnpj_loja: '61862470316', valor: valor, descricao: descricao, cpf_cliente: cpf}).then((res) => {
      navigation.navigate('GerarQRCode', res.data)
    })
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.imagens}>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <Image style={estilos.imagem} source={require('../../images/vectorpaint.png')}></Image>
        </TouchableOpacity>
        <Image style={estilos.imagemLogo} source={require('../../images/logo.png')}></Image>
      </View>
      <Text style={estilos.textoHistorico}>Cobrança</Text>
      <View style={estilos.painelBranco}>
        <View style={estilos.viewInputs}>
            <Text style={estilos.textInput}>Valor</Text>
            <TextInput placeholder="Ex: 20,50" keyboardType="numeric" style={estilos.input} onChangeText={onChangeValor} value={valor}/>
            <Text style={estilos.textInput}>Descrição</Text>
            <TextInput placeholder="Ex: 5kg Arroz" style={estilos.input} onChangeText={onChangeDescricao} value={descricao}/>
            <Text style={estilos.textInput}>CPF do Cliente</Text>
            <TextInput placeholder="Ex: 61862470316 (Apenas números)" keyboardType="numeric" style={estilos.input} onChangeText={onChangeCpf} value={cpf}/>
        </View> 

        <TouchableOpacity style={estilos.botaoResgatar} onPress={() => gerarCobranca(navigation)}>
            <Text style={estilos.textoResgatar}>Gerar QRCode</Text>
        </TouchableOpacity>
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
    imagemLogo: {
      width: 80,
      height: 80,
      marginLeft: 250,
      marginTop: 70
    },
    imagens: {
        flexDirection: 'row'
    },
    viewInputs: {
        marginTop: 80
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 50
    },
    textInput: {
        marginLeft: 20
    },
    botaoResgatar: {
       width: 200,
       height: 40,
       backgroundColor: '#31C7D0',
       borderRadius: 50,
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft: 100,
       marginTop: 30,
       marginBottom: 100
     },
    textoResgatar: {
       color: 'white',
       fontSize: 18
    },
  });

export default GerarCobranca;
