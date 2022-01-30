import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Cadastro = ({navigation}) => {
    const [nomeLoja, onChangeNomeLoja] = useState("");
    const [descricao, onChangeDescricao] = useState("")
    const [cpf, onChangeCpf] = useState("")
    return(
        <View style={estilos.container}>
            <Image style={estilos.imagem} source={require('../../images/logo.png')}></Image>
            <Text style={estilos.textoCadastro}>Cadastre-se</Text>

            <View style={estilos.itens}>
                <Text style={estilos.textInput}>Nome da Loja</Text>
                <TextInput placeholder="Ex: Minha Loja" placeholderTextColor="#EAEAEA" style={estilos.input} onChangeText={onChangeNomeLoja} value={nomeLoja}/>
                <Text style={estilos.textInput}>CPF/CNPJ</Text>
                <TextInput placeholder="Ex: 12345678901 (Apenas números)" placeholderTextColor="#EAEAEA" keyboardType="numeric" style={estilos.input} onChangeText={onChangeDescricao} value={descricao}/>
                <Text style={estilos.textInput}>Porcentagem de Desconto</Text>
                <TextInput placeholder="Ex: 10" placeholderTextColor="#EAEAEA" keyboardType="numeric" style={estilos.input} onChangeText={onChangeCpf} value={cpf}/>
           </View>

           <TouchableOpacity style={estilos.botaoResgatar} >
                <Text style={estilos.textoResgatar}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={estilos.textoFooter}>Saiba mais</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#31C7D0'
    },
    imagem: {
        width: 70,
        height: 70,
        marginTop: -20,
        marginBottom: 30,
      },  
    input: {
        color: 'white',
        height: 40,
        margin: 12,
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 50,
        borderBottomColor: 'white',
        
    },
    itens: {
        width: 380,
    },
    textInput: {
        marginLeft: 20,
        color: 'white',
    },
    textoCadastro: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -50,
        marginBottom: 50
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
        marginTop: 90,
        marginBottom: 15
      },
     textoResgatar: {
        color: '#303539',
        fontSize: 15
     },
})

export default Cadastro