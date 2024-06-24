import React, { useState } from 'react';
import {Alert, Image, SafeAreaView, ScrollView, View} from 'react-native';
import Input from "../components/InputText/Input";
import ButtonComponent from "../components/Button/ButtonComponent";
import DateTimerPicker from "../components/DateTimerPicker/DateTimerPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "../axiosConfig";
import {router} from "expo-router";

export default function Register() {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [repPassword, setRepPassword] = useState(null);
    const [name, setName] = useState(null)

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        if (!date) return '';
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do 0
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const register = async () => {
        if (!cpf || !email || !password || !repPassword || !date || !name) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos");
            return;
        }

        if (password !== repPassword) {
            Alert.alert("Erro", "As senhas não são iguais");
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                name,
                cpf,
                email,
                password,
                birthDate: date,
            });

            if (response.status === 201) {
                Alert.alert("Sucesso", "Usuário registrado com sucesso");
                router.replace("/");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao registrar o usuário");
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
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
                                text={"CPF"}
                                placeholder={"Digite seu CPF"}
                                onChange={setCpf}
                            />
                            <Input
                                text={"Nome"}
                                placeholder={"Digite seu Nome"}
                                onChange={setName}
                            />
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
                            <Input
                                text={"Data de nascimento"}
                                placeholder={"DD/MM/AAAA"}
                                editable={false}
                                onPress={() => setShowDatePicker(true)}
                                value={formatDate(date)}
                            />
                            <DateTimerPicker
                                showDatePicker={showDatePicker}
                                onConfirm={handleDateConfirm}
                                onCancel={() => setShowDatePicker(false)}
                                type={"date"}
                            />
                        <ButtonComponent text={"Cadastrar"} onPress={register} />
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>

        </SafeAreaView>
    );
}
