import css from './ImageModal.module.css'
// import { useState } from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

interface Props {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string | null;
}

const ImageModal = ({ isOpen, onClose, imageSrc }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={css.modal}
            overlayClassName={css.overlay}
        >
            {imageSrc && <img src={imageSrc} alt="Selected" className={css.image} />}
        </Modal>
    );
}
export default ImageModal;