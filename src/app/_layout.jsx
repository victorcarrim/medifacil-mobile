import {Stack, Tabs} from "expo-router";

export default function Layout(){
    return(
        <Stack
            screenOptions={{ headerShown: false}}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register"/>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="detailsRecipe/[id] " />
            <Stack.Screen name="finalRegister"/>
        </Stack>
    )
}