import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, View} from 'react-native';
import Input from "../components/InputText/Input";
import ButtonComponent from "../components/Button/ButtonComponent";
import DateTimerPicker from "../components/DateTimerPicker/DateTimerPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "../axiosConfig";
import {router} from "expo-router";
import {getData, removeData} from "../utils/asyncStorageUtils";
import {userInformation} from "../utils/userInformation";

export default function finalRegister() {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [repPassword, setRepPassword] = useState(null);


    const register = async () => {
        if (!email || !password || !repPassword) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos");
            return;
        }

        if (password !== repPassword) {
            Alert.alert("Erro", "As senhas não são iguais");
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                cpf: user.cpf,
                email,
                password,
            });

            if (response.status === 201) {
                Alert.alert("Sucesso", "Usuário registrado com sucesso");
                router.replace("/(app)/profile");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao registrar o usuário");
        }
    }

        const fetchData = async () => {
            const token = await getData('token');
            if (token) {
                const userDecod = userInformation(token)
                const response = await api.get(`/api/user/${userDecod.userId}`)
                setUser(response.data)
            }
        };

        useEffect(() => {
            fetchData()
        }, []);

    return (
        <SafeAreaView>
            <View style={{ marginTop: 10 }}>
                <Image
                    source={require("../assets/logo-completa.png")}
                />
            </View>
            <KeyboardAwareScrollView>
                <View style={{
                    padding: 30,
                    gap: 5,
                }}>
                    <Input
                        text={"Email"}
                        placeholder={"Digite seu email"}
                        onChange={setEmail}
                    />
                    <Input
                        text={"Senha"}
                        placeholder={"Digite sua senha"}
                        onChange={setPassword}
                    />
                    <Input
                        text={"Repita sua senha"}
                        placeholder={"Repita sua senha"}
                        onChange={setRepPassword}
                    />
                    <ButtonComponent text={"Finalizar Cadastro"} onPress={register} />
                </View>
            </KeyboardAwareScrollView>


        </SafeAreaView>
    );
}
