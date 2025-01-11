import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://gerenciador-eventos-7q10.onrender.com'
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token recuperado:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        console.error('Erro ao recuperar o token:', error);
        throw error;
    }
});
export default api;