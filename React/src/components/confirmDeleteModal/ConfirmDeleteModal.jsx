import Modal from 'react-modal';
import LoadingButton from "@/components/loadingButton/LoadingButton";

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm, loading }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="flex justify-center items-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
        >
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Confirmar Exclusão</h2>
                <p className="text-gray-400 mb-6">Você tem certeza de que deseja excluir este evento? Esta ação não pode ser desfeita.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onRequestClose}
                    >
                        Cancelar
                    </button>
                    <LoadingButton
                        loading={loading}
                        load="Excluindo..."
                        away="Excluir"
                        onClick={onConfirm}
                        color="bg-red-600"
                    />
                </div>
            </div>
        </Modal>
    );
};
export default ConfirmDeleteModal;
