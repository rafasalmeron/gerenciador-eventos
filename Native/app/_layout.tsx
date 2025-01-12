import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import { useRoute, RouteProvider } from '@/context/RouteContext';
import LoginScreen from '@/app/login';
import CadastroScreen from '@/app/cadastro';
import HomeScreen from '@/app/home';
import EventosScreen from '@/app/eventos';
import ProfileScreen from '@/app/perfil';
import {ToastProvider} from "@/context/ToastContext";

const RootLayout = () => {
    const { route, navigate } = useRoute();
    const { isAuthenticated } = useAuth();

    const renderScreen = () => {
        if (!isAuthenticated) {
            switch (route) {
                case 'login':
                    return <LoginScreen />;
                case 'cadastro':
                    return <CadastroScreen />;
                default:
                    return <LoginScreen />;
            }
        } else {
            switch (route) {
                case 'home':
                    return <HomeScreen />;
                case 'eventos':
                    return <EventosScreen />;
                case 'perfil':
                    return <ProfileScreen />;
                default:
                    return <HomeScreen />;
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {renderScreen()}
            {isAuthenticated && (
                <View style={styles.tabBar}>
                    <TouchableOpacity onPress={() => navigate('home')} style={styles.tabItem}>
                        <Icon name="home" size={24} color={route === 'home' ? '#1E90FF' : '#000'} />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('eventos')} style={styles.tabItem}>
                        <Icon name="calendar" size={24} color={route === 'eventos' ? '#1E90FF' : '#000'} />
                        <Text>Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('perfil')} style={styles.tabItem}>
                        <Icon name="user" size={24} color={route === 'perfil' ? '#1E90FF' : '#000'} />
                        <Text>Perfil</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    tabItem: {
        alignItems: 'center',
    },
});

export default function App() {
    return (
        <AuthProvider>
            <RouteProvider>
                <ToastProvider>
                    <RootLayout />
                </ToastProvider>
            </RouteProvider>
        </AuthProvider>
    );
}