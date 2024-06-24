import AsyncStorage from '@react-native-async-storage/async-storage';
// Função para salvar dados no local storage
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Failed to save the data to the storage', e);
    }
};

// Função para recuperar dados do local storage
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Failed to fetch the data from storage', e);
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Failed to delete the data from storage', e);
    }
};