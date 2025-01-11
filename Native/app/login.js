import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { useRoute } from '@/context/RouteContext';
import api from '../services/api';
import { useToast } from "@/context/ToastContext";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [savePassword, setSavePassword] = useState(false);
    const { login } = useAuth();
    const { navigate } = useRoute();
    const { addToast } = useToast();

    useEffect(() => {
        const loadSavedCredentials = async () => {
            const savedEmail = await AsyncStorage.getItem('savedEmail');
            const savedSenha = await AsyncStorage.getItem('savedSenha');
            if (savedEmail && savedSenha) {
                setEmail(savedEmail);
                setSenha(savedSenha);
                setSavePassword(true);
            }
        };
        loadSavedCredentials();
    }, []);

    const handleLogin = async () => {
        if (!email || !senha) {
            addToast('Erro ao realizar login. Email e senha são obrigatórios.', 'danger');
            return;
        }

        setLoading(true);

        try {
            const requestData = { email, senha };
            const response = await api.post('/login', requestData);

            const token = response.data;

            if (!token) {
                addToast('Erro ao realizar login. Token não retornado pela API.', 'danger');
                setLoading(false);
                return;
            }

            if (savePassword) {
                await AsyncStorage.setItem('savedEmail', email);
                await AsyncStorage.setItem('savedSenha', senha);
            } else {
                await AsyncStorage.removeItem('savedEmail');
                await AsyncStorage.removeItem('savedSenha');
            }

            await AsyncStorage.setItem('token', token);
            console.log('Token salvo no AsyncStorage:', token);
            addToast('Login realizado com sucesso!', 'success');
            login(token);
            navigate('home');
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Ocorreu um erro ao tentar realizar o login. Tente novamente.';
            addToast(`Erro ao realizar login. ${errorMessage}`, 'danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloTexto}>Login</Text>
            </View>
            <Text style={styles.label}>Email do Administrador</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry
                autoCapitalize="none"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Salvar senha</Text>
                <Switch
                    value={savePassword}
                    onValueChange={setSavePassword}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigate('cadastro')}>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cadastrar-se</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 8,
        width: '100%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    switchLabel: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1E90FF',
    },
    secondaryButtonText: {
        color: '#1E90FF',
    },
    titulo: {
        alignItems: 'center',
        marginBottom: 50,
    },
    tituloTexto: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
export default LoginScreen;