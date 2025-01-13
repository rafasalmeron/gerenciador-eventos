'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import api from "@/service/api";
import { jwtDecode } from "jwt-decode";
import {useAuth} from "@/context/AuthContext";
import EventosList from "@/components/listaEventos/ListaEventos";
import LoadingButton from "@/components/loadingButton/LoadingButton";

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { addToast } = useToast();
    const { userInfo } = useAuth();
    const [novoEvento, setNovoEvento] = useState({
        nome: '',
        data: '',
        localizacao: '',
        imagem: null,
        admin: { id: null }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setNovoEvento((prevState) => ({
                        ...prevState,
                        admin: { id: decoded.id },
                    }));
                } catch (error) {
                    console.error("Erro ao decodificar o token:", error);
                    addToast("Erro ao processar o token.", "error");
                }
            }
        }
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await api.get('/eventos');
            if (response && response.data) {
                setEventos(response.data);
            } else {
                setEventos([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Carregando API ou Erro ao buscar eventos:', error);
            setEventos([]);
            setLoading(false);
        }
    };

    const handleAddEvento = async () => {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append('nome', novoEvento.nome);
        formData.append('data', novoEvento.data.split('-').reverse().join('/'));
        formData.append('localizacao', novoEvento.localizacao);
        formData.append('admin.id', novoEvento.admin.id);
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
        } finally {
            setButtonLoading(false);
        }
    };

    const handleEditEvento = async () => {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append('data', novoEvento.data.split('-').reverse().join('/'));
        formData.append('localizacao', novoEvento.localizacao);
        formData.append('admin.id', novoEvento.admin.id);
        try {
            await api.put(`/eventos/${eventoEmEdicao.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Evento editado com sucesso!', 'success');
            setShowModal(false);
            setEventoEmEdicao(null);
            setLoading(true);
            fetchEventos();
        } catch (error) {
            addToast('Erro ao editar evento.', 'error');
        } finally {
            setButtonLoading(false);
        }
    };

    const handleDeleteEvento = async (id) => {
        setButtonLoading(true);
        try {
            await api.delete(`/eventos/${id}`);
            addToast('Evento excluído com sucesso!', 'success');
            setLoading(true);
            fetchEventos();
        } catch (error) {
            addToast('Erro ao excluir evento.', 'error');
        }
    };

    const openEditModal = (evento) => {
        setEventoEmEdicao(evento);
        setNovoEvento({
            nome: evento.nome,
            data: evento.data.split('/').reverse().join('-'),
            localizacao: evento.localizacao,
            imagem: null,
            admin: { id: novoEvento.admin.id }
        });
        setShowModal(true);
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const getImageSrc = (imagemBase64) => {
        const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'];
        for (const format of supportedFormats) {
            if (imagemBase64.includes(format.split('/')[1])) {
                return `data:${format};base64,${imagemBase64}`;
            }
        }
        return `data:image/png;base64,${imagemBase64}`;
    };

    return (
        <div className="p-6">
            <div
                className=" mb-5 w-full flex justify-center items-center text-center flex-col bg-gray-800 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-white">Eventos</h1>
                <div className="flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-white">Adicione um novo Evento</h2>
                </div>
                <p className="text-gray-400 mb-4">Preencha as informações do novo evento para adicioná-lo à lista.</p>
                <button
                    className="max-w-96 mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out m-2"
                    onClick={() => {
                        setEventoEmEdicao(null);
                        setNovoEvento({
                            nome: '',
                            data: '',
                            localizacao: '',
                            imagem: null,
                            admin: {
                                id: novoEvento.admin.id
                            }
                        });
                        setShowModal(true);
                    }}
                >
                    Adicionar Evento
                </button>
            </div>

            <EventosList
                eventos={eventos}
                loading={loading}
                userInfo={userInfo}
                openEditModal={openEditModal}
                handleDeleteEvento={handleDeleteEvento}
                getImageSrc={getImageSrc}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h2 className="text-lg font-bold mb-4">{eventoEmEdicao ? 'Editar Evento' : 'Novo Evento'}</h2>
                        <input
                            type="text"
                            placeholder="Nome do Evento"
                            className="w-full mb-2 p-2 border rounded"
                            value={novoEvento.nome}
                            onChange={(e) =>
                                setNovoEvento({...novoEvento, nome: e.target.value})
                            }
                            disabled={!!eventoEmEdicao}
                        />
                        <input
                            type="date"
                            placeholder="Data"
                            className="w-full mb-2 p-2 border rounded"
                            value={novoEvento.data}
                            onChange={(e) =>
                                setNovoEvento({...novoEvento, data: e.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Localização"
                            className="w-full mb-2 p-2 border rounded"
                            value={novoEvento.localizacao}
                            onChange={(e) =>
                                setNovoEvento({...novoEvento, localizacao: e.target.value})
                            }
                        />
                        <input
                            type="file"
                            className="w-full mb-2 p-2 border rounded"
                            onChange={(e) =>
                                setNovoEvento({...novoEvento, imagem: e.target.files[0]})
                            }
                            disabled={!!eventoEmEdicao}
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <div>
                                <LoadingButton
                                    loading={buttonLoading}
                                    load="Salvando..."
                                    away={eventoEmEdicao ? 'Salvar Alterações' : 'Salvar'}
                                    onClick={eventoEmEdicao ? handleEditEvento : handleAddEvento}
                                    color='bg-gradient-to-r from-blue-600 to-blue-800'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EventosPage;
