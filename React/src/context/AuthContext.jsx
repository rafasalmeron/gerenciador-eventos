'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useToast } from "@/context/ToastContext";
import api from "@/service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const { addToast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            //const decodedToken = jwtDecode(token);
            //fetchUserInfo(decodedToken.sub);
        }
    }, []);

    // const fetchUserInfo = async (email) => {
    //     try {
    //         const response = await api.get(`/admins/${email}`);
    //
    //         if (response.status === 200) {
    //             const data = response.data;
    //             localStorage.setItem('userInfo', JSON.stringify(data));
    //             setUserInfo(data);
    //         } else {
    //             throw new Error('Erro ao buscar informações do usuário');
    //         }
    //     } catch (error) {
    //         console.error('Erro ao buscar informações do usuário:', error);
    //         addToast(error.message, 'error');
    //     }
    // };

    const login = (token) => {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/;`;
        setIsAuthenticated(true);

        const decodedToken = jwtDecode(token);
        //fetchUserInfo(decodedToken.sub);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);