'use client';

import { useState } from "react";
import LoadingButton from "@/components/loadingButton/LoadingButton";
import ImageModal from "@/components/ImageModal/ImageModal";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/ConfirmDeleteModal";

const EventosList = ({ eventos, loading, openEditModal, handleDeleteEvento, getImageSrc }) => {
    const [deleteLoading, setDeleteLoading] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const confirmAndDelete = async (id) => {
        setDeleteLoading((prev) => ({ ...prev, [id]: true }));
        await handleDeleteEvento(id);
        setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        setIsConfirmOpen(false);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedEventId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEventId !== null) {
            setDeleteLoading((prev) => ({ ...prev, [selectedEventId]: true }));
            confirmAndDelete(selectedEventId);
        }
    };

    const sortedEventos = [...eventos].sort((a, b) => new Date(a.data) - new Date(b.data));

    return (
        <div className="m grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-full mx-auto animate-pulse"
                    >
                        <div className="rounded-t-lg bg-slate-700 h-48 w-full"></div>
                        <div className="p-5">
                            <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
                            <div className="h-6 bg-slate-700 rounded w-1/2 mb-2"></div>
                            <div className="h-6 bg-slate-700 rounded w-1/4 mb-2"></div>
                            <div className="flex justify-between mt-4">
                                <div className="h-10 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-10 bg-slate-700 rounded w-1/3"></div>
                            </div>
                        </div>
                    </div>
                ))
                : sortedEventos.map((evento, index) => (
                    <div
                        key={evento.id}
                        className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                        <a href="#" onClick={(e) => { e.preventDefault(); handleImageClick(getImageSrc(evento.imagem)); }}>
                            <img
                                className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
                                src={getImageSrc(evento.imagem)}
                                alt={evento.nome}
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                                    {evento.nome}
                                </h5>
                            </a>
                            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                                Data: {evento.data}
                            </p>
                            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                                Localização: {evento.localizacao}
                            </p>
                            <span className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                                Criado por: <strong>{evento.adminNome}</strong>
                            </span>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => openEditModal(evento)}
                                >
                                    Editar
                                </button>
                                <div>
                                    <button
                                        className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteClick(evento.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            {isOpen && selectedImage && (
                <ImageModal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    imageUrl={selectedImage}
                    imageAlt="Imagem do Evento"
                />
            )}
            {isConfirmOpen && (
                <ConfirmDeleteModal
                    isOpen={isConfirmOpen}
                    onRequestClose={() => setIsConfirmOpen(false)}
                    onConfirm={handleConfirmDelete}
                    loading={deleteLoading[selectedEventId] || false}
                />
            )}
        </div>
    );
};

export default EventosList;
