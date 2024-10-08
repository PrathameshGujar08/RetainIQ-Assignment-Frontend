'use client';
import React, { useState } from 'react';
import styles from './contentarea.module.css';

import { MdOutlineArrowBack } from "react-icons/md";
import ItemsList from '../ItemsList/ItemsList';
import ProductList from '../../../Data/product';
import { arrayMove } from '@dnd-kit/sortable';
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { Product } from '../../../Types/types';
import { ScrollSync } from 'react-scroll-sync';

const ContentArea = () => {
    const [productListing, setProductListing] = useState<Product[]>(ProductList);

    const getProductPos = (id: number) => productListing.findIndex((product) => product.id === id);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setProductListing((products) => {
            const originalPos = getProductPos(Number(active.id));
            const newPos = getProductPos(Number(over.id));

            return arrayMove(products, originalPos, newPos);
        });
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    return (
        <div className={styles.contentarea}>
            <div className={styles.header}>
                <div className={styles.headingDiv}>
                    <div className={styles.icon}>
                        <MdOutlineArrowBack size={30} />
                    </div>
                    <div className={styles.heading}>
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <button className={styles.btn}>
                    Publish Feed
                </button>
            </div>
            <ScrollSync>
                <div className={styles.mainContent}>
                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
                        <ItemsList productList={productListing} setProductList={setProductListing} />
                    </DndContext>
                </div>
            </ScrollSync>

        </div>
    );
};

export default ContentArea;
