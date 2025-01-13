import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from '../services/api';
import {jwtDecode} from 'jwt-decode';
import {useToast} from "@/context/ToastContext";
import {launchImageLibrary} from "react-native-image-picker";

const EventosScreen = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
    const { addToast } = useToast();
    const [novoEvento, setNovoEvento] = useState({
        nome: '',
        data: '',
        localizacao: '',
        imagem: '',
        adminId: '',
    });

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setNovoEvento((prevState) => ({...prevState, admin: {id: decoded.id},}));
                } catch (error) {
                    console.log("Erro ao processar o token.");
                }
            }
        };
        fetchToken();
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await api.get('/eventos');
            setEventos(response.data);
        } catch (error) {
            addToast('Erro ao carregar eventos.', 'danger');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleAddEvento = async () => {
        const formData = new FormData();
        formData.append('nome', novoEvento.nome);
        formData.append('data', novoEvento.data.split('-').reverse().join('/'));
        formData.append('localizacao', novoEvento.localizacao);
        formData.append('adminId', novoEvento.adminId);
        if (novoEvento.imagem) {
            formData.append('file', novoEvento.imagem);
        }
        try {
            await api.post('/eventos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Evento criado com sucesso!', 'success');
            setShowModal(false);
            setLoading(true);
            fetchEventos();
        } catch (error) {
            addToast('Erro ao criar evento.', 'error');
        }
    };

    const handleEditEvento = async () => {
        const formData = new FormData();
        formData.append('data', novoEvento.data.split('-').reverse().join('/'));
        formData.append('localizacao', novoEvento.localizacao);
        formData.append('adminId', novoEvento.adminId);
        try {
            await api.put(`/eventos/${eventoEmEdicao.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Evento editado com sucesso!', 'success');
            setShowModal(false);
            setEventoEmEdicao(null);
            setLoading(true);
            fetchEventos();
        } catch (error) {
            addToast('Erro ao editar evento.', 'error');
        }
    };

    const handleDeleteEvento = async (id) => {
        try {
            await api.delete(`/eventos/${id}`);
            addToast('Evento excluído com sucesso!', 'success');
            fetchEventos();
        } catch (error) {
            addToast(`Erro ao excluir evento. ${error.message}`, 'danger');
        }
    };

    const openEditModal = (evento) => {
        setEventoEmEdicao(evento);
        setNovoEvento({
            nome: evento.nome,
            data: evento.data.split('/').reverse().join('-'),
            localizacao: evento.localizacao,
            imagem: evento.imagem,
        });
        setShowModal(true);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setNovoEvento((prevState) => ({ ...prevState, data: formattedDate }));
        hideDatePicker();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando eventos...</Text>
            </View>
        );
    }

    const getImageSrc = (imagemBase64) => {
        const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'];
        for (const format of supportedFormats) {
            if (imagemBase64.includes(format.split('/')[1])) {
                return `data:${format};base64,${imagemBase64}`;
            }
        }
        return `data:image/png;base64,${imagemBase64}`;
    };

    const handleSelectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Seleção de imagem cancelada.');
            } else if (response.errorCode) {
                console.log('Erro ao selecionar imagem:', response.errorMessage);
                addToast(`Erro ao selecionar imagem: ${response.errorMessage}`, 'danger');
            } else {
                const selectedImage = response.assets[0];
                setNovoEvento((prevState) => ({
                    ...prevState,
                    imagem: selectedImage.uri,
                }));
                addToast('Imagem selecionada com sucesso!', 'success');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Eventos</Text>
            <TouchableOpacity
                style={styles.button} onPress={() => {
                setEventoEmEdicao(null);
                setNovoEvento({nome: '', data: '', localizacao: '', imagem: '', admin: {id: novoEvento.admin.id}});
                setShowModal(true);
            }}
            >
                <Text style={styles.buttonText}>Adicionar Evento</Text>
            </TouchableOpacity>
            <FlatList
                data={eventos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.evento}>
                        <Text style={styles.eventoNome}>{item.nome}</Text>
                        <Image
                            source={{ uri: getImageSrc(item.imagem) }}
                            style={styles.eventoImagem}
                        />
                        <Text>Data: {item.data}</Text>
                        <Text>Localização: {item.localizacao}</Text>
                        <Text>Criado por: {item.adminNome}</Text>
                        <View style={styles.eventoActions}>
                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]} onPress={() => openEditModal(item)}
                            >
                                <Text
                                    style={[styles.buttonText, styles.secondaryButtonText]}
                                >
                                    Editar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.dangerButton]}
                                onPress={() => handleDeleteEvento(item.id)}
                            >
                                <Text style={[styles.buttonText, styles.dangerButtonText]}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>{eventoEmEdicao ? 'Editar Evento' : 'Novo Evento'}</Text>
                    <Text style={styles.label}>Nome do Evento</Text>
                    <TextInput
                        placeholder="Nome do Evento"
                        value={novoEvento.nome}
                        onChangeText={(text) => setNovoEvento({ ...novoEvento, nome: text })}
                        style={styles.input}
                        editable={!eventoEmEdicao}
                    />
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.label}>Data</Text>
                        <TextInput
                            placeholder="Data"
                            value={novoEvento.data}
                            style={styles.input}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={styles.label}>Localização</Text>
                    <TextInput
                        placeholder="Localização"
                        value={novoEvento.localizacao}
                        onChangeText={(text) => setNovoEvento({ ...novoEvento, localizacao: text })}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Imagem do Evento</Text>
                    <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
                        <Text style={styles.buttonText}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                    {novoEvento.imagem ? (
                        <Image
                            source={{ uri: novoEvento.imagem }}
                            style={styles.eventoImagem}
                        />
                    ) : (
                        <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
                    )}

                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={eventoEmEdicao ? handleEditEvento : handleAddEvento}>
                            <Text style={styles.buttonText}>
                                {eventoEmEdicao ? "Salvar Alterações" : "Salvar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    placeholderText: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    evento: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    eventoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventoActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    eventoImagem: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        marginTop: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',

    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom: 16,
        marginTop: 5,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#1E90FF',
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
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1E90FF',
    },
    secondaryButtonText: {
        color: '#1E90FF',
    },
});

export default EventosScreen;
