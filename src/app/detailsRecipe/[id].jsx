import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import RecipeComponent from "../../components/Recipe";
import api from "../../axiosConfig";
import {useEffect, useState} from "react";


export default function DetailsRecipe(){
    const {id} = useLocalSearchParams();
    const [recipe, setRecipe] = useState("")

    const getRecipe = async () => {
        try {
            const response = await api.get(`/api/recipe/get-recipe/${id}`)

            if(response.status === 200){
                setRecipe(response.data)
            }
        }catch (error){
            console.error(error)
        }
    }

    useEffect( () => {
        getRecipe()
    }, []);

    return(
        <SafeAreaView
            style={{
                backgroundColor: "#FFF",
                flex: 1,
            }}
        >
            <View style={{padding: 20, marginBottom: 50}}>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontSize: 40, fontWeight: "bold" }}> {recipe.name} </Text>
                </View>
                <ScrollView style={{marginTop: 20}}>
                { recipe && recipe.medicines.map((medicine) => (
                    <View
                        style={{
                            backgroundColor: "rgba(193, 218, 232, 0.4)",
                            padding: 15,
                            borderWidth: 3,
                            borderColor: "#C1DAE8",
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                        key={medicine.id}
                    >
                        <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 5}}>Nome do medicamento: {medicine.medicine.nome_produto}</Text>
                        <Text style={{fontSize: 18, fontWeight: "semibold", marginBottom: 5}}>Empresa: {medicine.medicine.empresa_detentora_registro}</Text>
                        <Text style={{fontSize: 18, fontWeight: "semibold", marginBottom: 5}}>Tempo de uso: {medicine.usage_duration}</Text>
                        <Text style={{fontSize: 18, fontWeight: "semibold", marginBottom: 5}}>Quantidade: {medicine.quantity}</Text>
                        <Text style={{fontSize: 18, fontWeight: "semibold", marginBottom: 5}}>Intervalo de tempo entre as doses: {medicine.usage_interval}</Text>
                    </View>
                ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}