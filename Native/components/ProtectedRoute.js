import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useAuth} from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigation();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.replace('auth');
        } else {
            setCheckingAuth(false);
        }
    }, [isAuthenticated, navigation]);

    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return children;
};
export default ProtectedRoute;