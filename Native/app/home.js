import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute } from '@/context/RouteContext';

const HomeScreen = () => {
    const { navigate } = useRoute();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Gerenciador de Eventos!</Text>
            <Text style={styles.subtitle}>Organize e acompanhe seus eventos com facilidade e praticidade.</Text>
            <Button
                title="Acessar Eventos"
                onPress={() => navigate('eventos')}
                color="#1E90FF"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
});
export default HomeScreen;