import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios'

function navegar(navigation){
    navigation.navigate("Historico")
}

const Payment = ({navigation}) => {
    const [saldoDisponivel, setSaldoDisponivel] = useState(0)
    //const params = props.navigation.state.params; 
    async function verificaSaldo(){
        await axios.post('http://192.168.18.8:3000/recebimentos', {cpf_cnpj: '61862470316'}).then((res) => {
            console.log(res.data.saldo_disponivel)
            setSaldoDisponivel(res.data.saldo_disponivel)
        })
    }
    verificaSaldo()   
    return(
        <View style={estilos.container}>
            <Text style={estilos.textoSaldoDisponivel}>Saldo Disponível</Text>
            <View style={estilos.painelValorDisponivel}>
                <Text style={estilos.textoValorDisponivel}>{saldoDisponivel} R$</Text>
            </View>

            <View style={estilos.painel}>
                <TouchableOpacity style={estilos.botaoResgatar} onPress={ () => navigation.navigate('GerarCobranca')}>
                    <Text style={estilos.texto}>Gerar Cobrança</Text>
                    <Image style={estilos.imagem} source={require('../../images/money-flow.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.botaoResgatar} onPress={() => navigation.navigate('Resgatar')}>
                    <Text style={estilos.texto}>Histórico de Vendas</Text>
                    <Image style={estilos.imagem} source={require('../../images/elegant-antique-building-shape-with-columns.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.botaoResgatar} onPress={() => navigation.navigate('Historico')}>
                    <Text style={estilos.texto}>Resgate de Saldo</Text>
                    <Image style={estilos.imagem} source={require('../../images/forma-de-pagamento.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#31C7D0'
    },
    textoSaldoDisponivel: {
        color: 'white',
        marginTop: 10
    },  
    painelValorDisponivel: {
        width: 200,
        height: 40,
        backgroundColor: '#303539',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    textoValorDisponivel: {
        color: '#FFFFFF',
        fontSize: 20
    },
    painel: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
        height: 550,
        width: 400,
        backgroundColor: '#E9E9E9'
    },
    texto: {
        color: '#303539',
        marginLeft: 15,
        marginTop: 10,
        fontSize: 12
    },
    botaoResgatar: {
        borderRadius: 30,
        marginBottom: 80,
        marginTop: -50,
        height: 150,
        width: 300,
        backgroundColor: 'white'
    },
    imagem: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        marginLeft: 110,
        marginTop: 20
    }
})

export default Payment