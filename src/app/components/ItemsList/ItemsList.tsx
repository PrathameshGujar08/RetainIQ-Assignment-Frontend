'use client';
import React, { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import styles from './itemsList.module.css';
import ListItem from '../ListItem/ListItem';
import { Product } from '../../../Types/types';
import { IoAddOutline } from 'react-icons/io5'
import { RiDeleteBinLine } from "react-icons/ri";
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';


interface ItemsListProps {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

const ItemsList = ({ productList, setProductList }: ItemsListProps) => {

  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleColumnDelete = (index: number) => {
    setProductList((prevProducts) =>
      prevProducts.map(product => ({
        ...product,
        product_variants: product.product_variants.filter((variant, i) => i !== index)
      })));
    setMessage("Column Successfully Deleted!")
  }

  const handleRowAdd = () => {
    const productVariantsCount = productList.length > 0 ? productList[0].product_variants.length : 1;
    const newVariants: { image: string; caption: string; }[] = Array.from({ length: productVariantsCount }, () => ({
      image: "",
      caption: ""
    }));

    const newProduct: Product = {
      id: productList.length + 1,
      product_filter: [
        {
          source: "",
          condition: "",
          value: ""
        }
      ],
      product_variants: newVariants
    };

    setProductList((prevProductList) => [...prevProductList, newProduct]);
    setMessage("Row Successfully Added!");
  };

  useEffect(() => {
    if(message !== ""){
      setIsNotification(true);
    }
  }, [message])

  return (
    <div className={styles.itemsList}>
      <div className={styles.rowHeading}>
        <div className={styles.itemsIndexDiv}>
        </div>
        <div className={styles.filterHeading}>
          <h3>Product Filter</h3>
        </div>
        <div className={styles.variantHeadingDiv}>
          {productList[0].product_variants.map((item, index) => (
            <div key={index} className={styles.variantHeading}>
              {index === 0 ? <h3>Primary Variant</h3> : <h3>Variant {index + 1}</h3>}
              <div style={{ cursor: "pointer" }} onClick={() => handleColumnDelete(index)}>
                <RiDeleteBinLine size={25} />
              </div>
            </div>
          ))}
          <div className={styles.placeholderDiv}>
          </div>
        </div>
      </div>

      <SortableContext items={productList.map(product => product.id)} strategy={verticalListSortingStrategy}>
        {productList.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem index={index} item={item} setProductList={setProductList} />
          </React.Fragment>
        ))}
      </SortableContext>

      <div style={{ margin: "1.5rem" }}>
        <div className={styles.addIcon} onClick={() => handleRowAdd()}>
          <IoAddOutline size={30} />
        </div>
      </div>
      <NotificationPopUp open={isNotification} setOpen={setIsNotification} message={message} />
    </div>
  );
};

export default ItemsList;
