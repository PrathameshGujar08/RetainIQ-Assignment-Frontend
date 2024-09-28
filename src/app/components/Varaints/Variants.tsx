import React from 'react'
import styles from './Variants.module.css'
import Image from 'next/image'
import { IoAddOutline } from 'react-icons/io5'
import { Product } from '../../../Types/types';
import { ScrollSyncPane } from 'react-scroll-sync';

interface VariantProps {
    variant: {
        image: string,
        caption: string
    }
    item: Product;
    index: number;
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
    openModal: (index: number) => void
}


const Variants = ({ variant, index, openModal, }: VariantProps) => {

    return (
        <ScrollSyncPane>
            <div className={styles.imageContainer}>
                <div className={styles.itemImageDiv}>
                    {variant.image.length === 0 ? (
                        <div className={styles.insertIconDiv}>
                            <div className={styles.insertDisplay} onClick={() => openModal(index)}>
                                <IoAddOutline size={20} />
                                <p>Add design</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Image
                                src={variant.image}
                                className={styles.img}
                                alt="suit"
                                width={110}
                                height={110}
                            />
                            <p className={styles.caption}>{variant.caption}</p>
                        </>
                    )}
                </div>
            </div>
        </ScrollSyncPane>
    )
}

export default Variants;