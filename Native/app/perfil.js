import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TextInput, Alert, Button, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useAuth } from '@/context/AuthContext';
import { useRoute } from '@/context/RouteContext';
import { jwtDecode } from 'jwt-decode';
import {useToast} from "@/context/ToastContext";

const ProfileScreen = () => {
    const { addToast } = useToast();
    const [profile, setProfile] = useState({
        nome: '',
        email: '',
    });

    const { logout } = useAuth();
    const { navigate } = useRoute();

    const fetchProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Token decodificado:', decoded);

                const email = decoded.sub || decoded.email;
                if (!email) {
                    throw new Error('Email não encontrado no token');
                }

                const response = await api.get(`/admins/${email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                addToast('Erro ao carregar perfil.', 'danger');
            }
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        addToast('Logout realizado com sucesso!', 'success');
        logout();
        navigate('login');
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                value={profile.nome}
                editable={false}
                placeholder="Nome"
                style={styles.input}
            />
            <TextInput
                value={profile.email}
                editable={false}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
            />
            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleLogout}
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default ProfileScreen;