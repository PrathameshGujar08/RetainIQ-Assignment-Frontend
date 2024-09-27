'use client';
import React, { useEffect, useState } from 'react';
import styles from "./listItem.module.css";
import { TbGridDots } from "react-icons/tb";
import { Product } from '../../../Types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoAddOutline } from 'react-icons/io5';
import Variants from '../Varaints/Variants';
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';
import Modal from '../Modal/Modal'

interface ListItemProps {
    item: Product;
    index: number;
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

const ListItem = ({ item, index, setProductList }: ListItemProps) => {
    const { attributes, setNodeRef, transform, transition, listeners } = useSortable({ id: item.id });
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
    const [hoveredProductId, setHoveredProductId] = React.useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleRowDelete = (id: number) => {
        setProductList((prevProducts) => prevProducts.filter(product => product.id !== id));
        setMessage("Row Successfully Deleted!")
    };

    const handleColumnAdd = () => {
        const newVariant = {
            image: "",
            caption: ""
        };

        setProductList((prevProducts) =>
            prevProducts.map(product => ({
                ...product,
                product_variants: [...product.product_variants, newVariant]
            }))
        );
        setMessage("Column Successfully Added!")

    };

    useEffect(() => {
        setIsNotification(true);
    }, [message])

    const openModal = (index: number) => {
        setSelectedVariantIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVariantIndex(null);
    };
    const handleImageSelection = (image: string, caption: string) => {
        if (selectedVariantIndex !== null) {
            setProductList((prevProducts) =>
                prevProducts.map(product => {
                    if (product.id === item.id) {
                        return {
                            ...product,
                            product_variants: product.product_variants.map((variant, idx) =>
                                idx === selectedVariantIndex ? { image, caption } : variant
                            )
                        };
                    }
                    return product;
                })
            );
        }
        closeModal();
    };

    return (
        <div className={styles.listItem} ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <div className={styles.itemIndexDiv}
                onMouseEnter={() => setHoveredProductId(item.id)}
                onMouseLeave={() => setHoveredProductId(null)}
            >
                {hoveredProductId === item.id &&
                    <div className={styles.deleteIcon} onClick={() => handleRowDelete(item.id)}>
                        <RiDeleteBinLine size={25} color="red" />
                    </div>
                 }
                <div className={styles.itemIndex}>
                    <h1>{index + 1}</h1>
                    <TbGridDots size={26} color="black" />
                </div>
            </div>

            <div className={styles.filterContainer}>
                <div className={styles.filterDiv}>
                    {item.product_filter.map((filter, idx) => (
                        <>
                            {filter.condition === "" ? (
                                <div className={styles.insertIconDiv}>
                                    <div className={styles.insertDisplay} >
                                        <IoAddOutline size={20} />
                                        <p>Add Product Filters</p>
                                    </div>
                                </div>
                            ) :
                                (
                                    <div className={styles.filter} key={`filter-${idx}`}>
                                        <div className={styles.filterName}>{filter.source}</div>
                                        <div className={styles.filterCondition}>{filter.condition}</div>
                                        <div className={styles.filterName}>{filter.value}</div>

                                        <div className={styles.zoomBox}>
                                            <div className={styles.zoomContainer}>
                                                <div className={styles.zoomedFilter}>
                                                    <div className={styles.filterName}>{filter.source}</div>
                                                    <div className={styles.filterCondition}>{filter.condition}</div>
                                                    <div className={styles.filterName}>{filter.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ))}
                </div>
            </div>

            <div className={styles.variants}>
                {item.product_variants.map((variant, i) => (
                    <ScrollSyncPane key={i}>
                        <Variants variant={variant} item={item} index={i} setProductList={setProductList} openModal={openModal} />
                    </ScrollSyncPane>
                ))}
                <div style={{ margin: "4.5rem" }}>
                    <div className={styles.addIcon} onClick={() => handleColumnAdd()}>
                        <IoAddOutline size={30} />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSelectImage={handleImageSelection}
                index={selectedVariantIndex}
            />
            <NotificationPopUp open={isNotification} setOpen={setIsNotification} message={message} />
        </div>
    );
};

export default ListItem;
