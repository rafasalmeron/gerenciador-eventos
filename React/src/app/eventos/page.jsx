'use client';
import { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import api from "@/service/api";
import { jwtDecode } from "jwt-decode";
import {useAuth} from "@/context/AuthContext";

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
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
            setEventos(response.data);
        } catch (error) {
            addToast('Erro ao carregar eventos.', 'error');
        }
    };

    const handleAddEvento = async () => {
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
            fetchEventos();
        } catch (error) {
            addToast('Erro ao criar evento.', 'error');
        }
    };

    const handleEditEvento = async () => {
        const formData = new FormData();
        formData.append('nome', novoEvento.nome);
        formData.append('data', novoEvento.data.split('-').reverse().join('/'));
        formData.append('localizacao', novoEvento.localizacao);
        formData.append('admin.id', novoEvento.admin.id);
        if (novoEvento.imagem) {
            formData.append('file', novoEvento.imagem);
        }
        try {
            await api.put(`/eventos/${eventoEmEdicao.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Evento editado com sucesso!', 'success');
            setShowModal(false);
            setEventoEmEdicao(null);
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
            admin: evento.admin.nome,
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
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Eventos</h1>

            <div className="w-full flex justify-center items-center text-center flex-col">
                <h2>Adicione um novo Evento</h2>
                <button className="max-w-96 mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 m-2" onClick={() => {
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

            <div className="m grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventos.map((evento) => (
                    <div
                        key={evento.id}
                        className="border rounded-md p-4 shadow hover:shadow-lg"
                    >
                        <img
                            src={getImageSrc(evento.imagem)}
                            alt={evento.nome}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-bold mt-2">{evento.nome}</h2>
                        <p>Data: {evento.data}</p>
                        <p>Localização: {evento.localizacao}</p>
                        <span>Criado por: <strong>{userInfo.nome}</strong></span>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => openEditModal(evento)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDeleteEvento(evento.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
                                setNovoEvento({ ...novoEvento, nome: e.target.value })
                            }
                            disabled={!!eventoEmEdicao}
                        />
                        <input
                            type="date"
                            placeholder="Data"
                            className="w-full mb-2 p-2 border rounded"
                            value={novoEvento.data}
                            onChange={(e) =>
                                setNovoEvento({ ...novoEvento, data: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Localização"
                            className="w-full mb-2 p-2 border rounded"
                            value={novoEvento.localizacao}
                            onChange={(e) =>
                                setNovoEvento({ ...novoEvento, localizacao: e.target.value })
                            }
                        />
                        <input
                            type="file"
                            placeholder="Imagem"
                            className="w-full mb-2 p-2 border rounded"
                            onChange={(e) =>
                                setNovoEvento({ ...novoEvento, imagem: e.target.files[0] })
                            }
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={eventoEmEdicao ? handleEditEvento : handleAddEvento}>
                                {eventoEmEdicao ? 'Salvar Alterações' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EventosPage;