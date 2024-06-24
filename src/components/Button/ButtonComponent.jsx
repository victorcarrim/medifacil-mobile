import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function ButtonComponent({ text, onPress, color }) {
    // Mapeamento de cores
    const colors = {
        blue: '#74BDE8',
        lightBlue: '#83EACC',
        red: '#EF6C6C',
        yellow: '#F4F66E'
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: colors[color] || '#EF6C6C',
                borderRadius: 10,
                padding: 15,
                alignItems: 'center',
                marginTop: 10,
            }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{text}</Text>
        </TouchableOpacity>
    )
}
