import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, imageUrl, imageAlt }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <img src={imageUrl} alt={imageAlt} className="max-w-screen-lg max-h-500 w-full h-full object-cover" />
                <button onClick={onRequestClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Fechar
                </button>
            </div>
        </Modal>
    );
};
export default ImageModal;