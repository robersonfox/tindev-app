import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import logo from '../assets/logo.png'

export default function Login({navigation}) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user')
        .then(user => {
            if (user) {
                navigation.navigate('Main', {user});
            }
        })
    }, [])

    async function handlerLogin() {
        const retorno = await api.post(`/devs`, {
            username: user
        });

        const { _id } = retorno.data;
        
        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user: _id});
    }
    
    return (
        <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        >
            <Image source={logo} />

            <TextInput 
                value={user}
                onChangeText={setUser}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#999"
                placeholder="Informe o usuário do GitHub"
            />

            <TouchableOpacity style={styles.button} onPress={handlerLogin}>
                <Text style={styles.textButton}>
                    Entrar
            </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#f5f5f5'
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        padding: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 4,
        marginTop:10,
    },

    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold"
    }
})