import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import MedicineComponent from "../Medicine";
import {useState} from "react";
import api from "../../axiosConfig";
import showToast from "../../utils/showToast";
import {router} from "expo-router";

export default function RecipeComponent({recipe, fetchData}){

    const handleReturn = async (id, dateHour, isNewTreatment) => {
        let response;

        if(isNewTreatment){
            response = await api.put("/api/recipe/start-treatment", {
                recipe_id: recipe._id,
                medicine_id: id,
                treatment_start: dateHour

            })
        }else{
            response = await api.put("/api/recipe/update-treatment", {
                recipe_id: recipe._id,
                medicine_id: id,
                dose_date: dateHour
            })
        }

        if(response.status === 200){
            console.log("Entrou")
            showToast("success", response.data.message)
        }

        fetchData()
    };

    const handleNewImage = async (id, image) => {
        let response;
        console.log(id)
        try {
            response = await api.put("/api/recipe/update-image", {
                recipe_id: recipe._id,
                medicine_id: id,
                image: image
            })
            console.log(response)
        }catch (error){
            console.log(error)
        }

        fetchData()
    };

    const handleDetailsRecipe = () => {
        router.navigate(`/detailsRecipe/${recipe._id}`)
    }

    return(
        <View
            style={{
                backgroundColor: "rgba(193, 218, 232, 0.4)",
                padding: 15,
                borderWidth: 3,
                borderColor: "#C1DAE8",
                borderRadius: 10
            }}
        >
            <View style={{flexDirection: 'row', marginTop: 5,justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{fontSize: 28, fontWeight: "bold"}}>{recipe.name}</Text>
                <TouchableOpacity onPress={handleDetailsRecipe}>
                    <FontAwesome5 name="info-circle" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginTop: 20}}>
                {recipe.medicines
                    .filter((medicine) => medicine.remaining_doses > 0)
                    .map((medicine, key) => (
                        <View key={key} style={{ marginBottom: 10 }}>
                            <MedicineComponent key={key} medicine={medicine} onReturn={handleReturn} newImage={handleNewImage} />
                        </View>
                    ))}
            </ScrollView>
        </View>
    )
}