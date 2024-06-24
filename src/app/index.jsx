import { Image, SafeAreaView, View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { router } from "expo-router";
import { getData, storeData } from "../utils/asyncStorageUtils";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/Button/ButtonComponent";
import Toast from "react-native-toast-message";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function Page() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = await getData('token');
            if (token) {
                router.push("/(app)/recipe")
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setData(data);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        setShowScanner(false);
        await fetchLoginToken(data); // Chamar a função para obter o token de login
        setScanned(false); // Resetar o estado para permitir novas leituras
    };

    const fetchLoginToken = async (token) => {
        try {
            const response = await axios.post(`https://medifacil-backend.vercel.app/auth/login-token`, {
                token: token,
            });

            if (response.data.token) {
                await storeData("token", response.data.token)
                router.replace("/(app)/recipe")
            } else {
                Alert.alert('Erro', 'Não foi possivel realizar o login via QRCode. Tente novamente mais tarde ou pelo login via CPF');
            }
        } catch (error) {
            // Trate erros de requisição
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
            console.error(error);
        }
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView>
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
                <ButtonComponent text={"Entrar com QRCode"} color={"blue"} onPress={() => setShowScanner(true)} />
                <ButtonComponent text={"Entrar com CPF"} color={"red"} onPress={() => router.push("/login")} />
                <ButtonComponent text={"Cadastrar-se"} color={"yellow"} onPress={() => router.push("/register")} />
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
            <Modal
                visible={showScanner}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowScanner(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        width: '80%',
                        height: '50%',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1
                        }} onPress={() => setShowScanner(false)}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
