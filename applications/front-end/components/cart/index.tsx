'use client';

import React, { useState } from 'react';
import classes from '@boilerplate/front-end/components/cart/style.module.scss';
import Image from 'next/image';

import rod from '@boilerplate/front-end/assets/images/fishing-rod.png';
import lure from '@boilerplate/front-end/assets/images/lure-set.jpg';
import deleteIcon from '@boilerplate/front-end/assets/icons/delete.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Fishing rod', price: 500, quantity: 1, image: rod },
    { id: 2, name: 'Lure set', price: 300, quantity: 1, image: lure },
  ]);

  const handleQuantityChange = (productId: number, type: 'increase' | 'decrease') => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
            ...product,
            quantity:
              type === 'increase' ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
          }
          : product
      )
    );
  };

  const handleDelete = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const grandTotal = products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <>
      <h2 className={classes.title}>Кошик</h2>
      <div className={classes.cart}>
        {products.map(product => (
          <div key={product.id} className={classes.product}>
            <Image className={classes.productImage} src={product.image} alt={product.name} />
            <h3 className={classes.productName}>{product.name}</h3>
            <p className={classes.productPrice}>Ціна: {product.price} грн</p>
            <div className={classes.quantityControl}>
              <button
                onClick={() => handleQuantityChange(product.id, 'decrease')}
                className={classes.decreaseButton}
              >
                -
              </button>
              <span className={classes.quantity}>{product.quantity}</span>
              <button
                onClick={() => handleQuantityChange(product.id, 'increase')}
                className={classes.increaseButton}
              >
                +
              </button>
            </div>
            <button onClick={() => handleDelete(product.id)} className={classes.deleteButton}>
              <Image src={deleteIcon} alt="Delete" />
            </button>
          </div>
        ))}

        <div className={classes.check}>
          <p>Загальна ціна: {grandTotal} грн</p>
        </div>

        <button className={classes.checkoutButton}>Оформити замовлення</button>
      </div>
    </>
  );
};
