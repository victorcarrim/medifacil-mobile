import React, {useEffect, useState} from 'react';
import { Image, SafeAreaView, Text, View, Alert } from 'react-native';
import Input from "../components/InputText/Input";
import ButtonComponent from "../components/Button/ButtonComponent";
import axios from 'axios';
import {router} from "expo-router";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {storeData} from "../utils/asyncStorageUtils";

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            const response = await axios.post(`https://medifacil-backend.vercel.app/auth/login-cpf`, {
                cpf: cpf,
                password: password
            });


            if (response.data.token) {
                console.log(response.data.token)
                await storeData("token", response.data.token)
                router.replace("/(app)/recipe")
            } else {
                // Trate erros de login
                Alert.alert('Erro', 'CPF ou senha incorretos');
            }
        } catch (error) {
            // Trate erros de requisição
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
            console.error(error);
        }
    };



    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <View style={{ marginTop: 100 }}>
                    <Image
                        source={require("../assets/logo-completa.png")}
                    />
                </View>

                <View style={{
                    padding: 30,
                    gap: 20,
                    marginTop: 30
                }}>
                    <Input
                        text={"CPF"}
                        placeholder={"Digite seu CPF"}
                        onChange={setCpf}
                        value={cpf}
                    />
                    <Input
                        text={"Senha"}
                        placeholder={"Digite sua senha"}
                        onChange={setPassword}
                        value={password}
                    />
                    <ButtonComponent text={"Entrar"} onPress={handleLogin} />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
