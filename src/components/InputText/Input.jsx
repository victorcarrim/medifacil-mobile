import {Text, TextInput, View} from "react-native";

export default function Input({text, placeholder, onChange, type, editable = true, onPress, value}){
    return(
        <View
            style={{
                gap: 5
            }}
        >
            {text && (
                <Text
                    style={{
                        fontWeight: 600,
                        fontSize: 20
                    }}
                >{text}</Text>
            )}
            <TextInput
                keyboardType={"default"}
                placeholder={placeholder}
                style={{
                    borderWidth: 3,
                    borderColor: 'black',
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 18
                }}
                onChangeText={onChange}
                editable={editable}
                onPress={onPress}
                value={value}
            />
        </View>
    )
}