import axios from 'axios';

const api = axios.create({
     baseURL: 'https://gerenciador-eventos-7q10.onrender.com'
     //baseURL: 'http://localhost:9010'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;