'use client';
import React , {useState, } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import styles from './modal.module.css'; 
import { IoImageOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import ImageArray from '@/Data/imageCollection'; 

interface ImageObject {
    image: string;
    caption: string;
}

interface ImageSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (image: string, caption: string) => void; 
    index: number | null; 
}

const Modal: React.FC<ImageSelectionModalProps> = ({ isOpen, onClose, onSelectImage }) => {

    const [images, setImages] = useState<ImageObject[]>(ImageArray);

    return (
        <Dialog open={isOpen} onClose={onClose} className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleImage}>
                    <IoImageOutline size={25} color="#2AB375" />
                </div>
                <div className={styles.modalDescription}>
                    Select a design to link
                </div>

                <div className={styles.modalGrid}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectImage(img.image, img.caption)}
                            className={styles.modalImageContainer}
                        >
                            <Image src={img.image} className={styles.img} alt={`image${index + 1}`} width={120} height={115} />
                            <p className={styles.modalImageCaption}>{img.caption}</p>
                        </div>
                    ))}
                </div>

                <button onClick={onClose} className={styles.closeButton}>
                    <IoCloseSharp size={20}/>
                </button>
            </div>
        </Dialog>
    );
};

export default Modal;
