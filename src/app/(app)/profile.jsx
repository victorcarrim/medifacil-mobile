import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {getData, removeData} from "../../utils/asyncStorageUtils";
import {userInformation} from "../../utils/userInformation";
import api from "../../axiosConfig";
import {useEffect, useState} from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import {router} from "expo-router";

export default function Profile(){
    const [user, setUser] = useState(null)

    const fetchData = async () => {
        const token = await getData('token');
        if (token) {
            const userDecod = userInformation(token)
            console.log(userDecod)
            const response = await api.get(`/api/user/${userDecod.userId}`)
            setUser(response.data)
            console.log(user.data)
        }
    };

    const handleLogout = async () => {
        await removeData('token')
        router.replace("/")
    }

    useEffect(() => {
        fetchData()
    }, []);
    return(
        <SafeAreaView
            style={{
                backgroundColor: "#FFF",
                flex: 1
            }}
        >
            <View style={{
                flex: 1,
                padding: 10,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 25}}>Usuário: {user?.name}</Text>
                {!user?.isRegistered && (
                    <ButtonComponent text={"Finalizar Cadastro"} color={"red"} onPress={() => router.push("/finalRegister")} />
                )}
                <ButtonComponent text={"Sair"} color={"blue"} onPress={handleLogout} />
            </View>
        </SafeAreaView>
    )
}