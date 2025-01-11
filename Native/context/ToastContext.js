import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <View style={styles.toastContainer}>
                {toasts.map((toast) => (
                    <Animated.View key={toast.id} style={styles.toast}>
                        <View
                            style={[
                                styles.iconContainer,
                                toast.type === 'success' && styles.successIcon,
                                toast.type === 'danger' && styles.dangerIcon,
                                toast.type === 'warning' && styles.warningIcon,
                            ]}
                        >
                            {toast.type === 'success' && <Text style={styles.iconText}>✔</Text>}
                            {toast.type === 'danger' && <Text style={styles.iconText}>✖</Text>}
                            {toast.type === 'warning' && <Text style={styles.iconText}>⚠</Text>}
                        </View>
                        <Text style={styles.toastMessage}>{toast.message}</Text>
                        <TouchableOpacity onPress={() => removeToast(toast.id)}>
                            <Text style={styles.closeButton}>✖</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </View>
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 40,
        right: 10,
        zIndex: 1000,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        minWidth: 200,
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    successIcon: {
        backgroundColor: '#4CAF50',
    },
    dangerIcon: {
        backgroundColor: '#F44336',
    },
    warningIcon: {
        backgroundColor: '#FFC107',
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    toastMessage: {
        flex: 1,
        color: '#333',
        fontSize: 14,
    },
    closeButton: {
        color: '#aaa',
        marginLeft: 10,
        fontSize: 14,
    },
});
export const useToast = () => useContext(ToastContext);