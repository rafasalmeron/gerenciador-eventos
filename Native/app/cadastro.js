import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@/context/RouteContext';
import api from '../services/api';
import {useToast} from "@/context/ToastContext";

const CadastroScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(false);
    const { navigate } = useRoute();
    const { addToast } = useToast();

    const handleCadastro = async () => {
        setLoading(true);

        try {
            const requestData = { email, senha, nome };
            const response = await api.post('/cadastro', requestData);
            addToast('Cadastro realizado com sucesso!', 'success');
            navigate('login');
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message;
            addToast(`Erro ao realizar cadastro. ${errorMessage}`, 'danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
            />
            <Text style={styles.label}>Email</Text>
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
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigate('login')}>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Voltar para Login</Text>
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
});
export default CadastroScreen;