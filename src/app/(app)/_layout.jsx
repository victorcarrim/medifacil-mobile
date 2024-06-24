import {Stack, Tabs} from "expo-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native";

export default function Layout(){
    return(
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
                <Tabs
                    screenOptions={{
                        tabBarStyle: {
                            backgroundColor: "#B1EEF1",
                            paddingBottom: 10, // Ajusta a margem inferior da barra de abas
                        },
                        tabBarLabelStyle: {
                            fontSize: 20,
                            marginBottom: 5, // Ajusta a margem inferior do rótulo
                        },
                        tabBarIconStyle: {
                            marginTop: 10, // Ajusta a margem superior do ícone
                        },
                        tabBarInactiveTintColor: 'black',
                        tabBarActiveTintColor: 'red'
                    }}
                >
                    <Tabs.Screen name="recipe" options={{
                        headerShown: false,
                        title: "Receitas",
                        tabBarIcon: ({focused, color, size = 40}) => {
                            if(focused){
                                return <FontAwesome5 name="pills" size={size} color={color} />
                            }
                            return <MaterialCommunityIcons name="pill" size={size} color={color} />
                        }
                    }} />
                    <Tabs.Screen name="profile" options={{
                        headerShown: false,
                        title: "Perfil",
                        tabBarIcon: ({focused, color, size}) => {
                            if(focused){
                                return <FontAwesome name="user" size={size} color={color} />
                            }
                            return <FontAwesome name="user-o" size={size} color={color} />
                        }
                    }} />
                </Tabs>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}