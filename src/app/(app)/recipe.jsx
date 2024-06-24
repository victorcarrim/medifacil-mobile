import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from "react-native";
import RecipeComponent from "../../components/Recipe";
import {getData} from "../../utils/asyncStorageUtils";
import {userInformation} from "../../utils/userInformation";
import api from "../../axiosConfig";

export default function Recipe() {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([])
    const fetchData = async () => {
        const token = await getData('token');
        if (token) {
            const userDecod = userInformation(token)
            setUser(userDecod)
            await fetchRecipes()
        }
    };

    const fetchRecipes = async () => {
        const response = await api.get("/api/recipe/get-recipes")
        setRecipes(response.data)
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#FFF",
                flex: 1,
            }}
        >
            <View style={{padding: 20, marginBottom: 50}}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
                    <Text style={{ fontSize: 40, flexShrink: 1 }}>Olá,</Text>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', flexShrink: 1 }}> {user ? user.name : 'Pessoa'} </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                    {recipes.filter(recipe => !recipe.isComplete).map((recipe) => (
                        <View key={recipe.id} style={{ marginBottom: 20 }}>
                            <RecipeComponent key={recipe.id} recipe={recipe} fetchData={() => fetchRecipes()} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
