import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const api = axios.create({
    baseURL: "https://medifacil-backend.vercel.app",
});

api.interceptors.request.use(
    async (config) => {
        let token = await AsyncStorage.getItem('token');

        if (token) {
            token = token.replace(/"/g, '');
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.removeItem('token');
            const router = useRouter();
            router.push('/');
        }
        return Promise.reject(error);
    }
);

export default api;
