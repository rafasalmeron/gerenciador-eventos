'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                    return;
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token inválido:', error);
                logout();
            }
        } else {
            setIsAuthenticated(false);
            router.push('/auth');
        }
    }, [router]);

    const login = (token) => {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/;`;
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);