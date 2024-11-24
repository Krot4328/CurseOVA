'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import error from '@boilerplate/front-end/assets/images/error.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchCartMutation } from '@boilerplate/front-end/store/queries/cart.query'
import { useGetProductQuery } from '@boilerplate/front-end/store/queries/product.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import styles from '@boilerplate/front-end/components/tackle-description/style.module.scss'

interface TackleDescriptionProps {
  tackleId: string
}

export const TackleDescription: React.FC<TackleDescriptionProps> = ({ tackleId }) => {
  const [quantity, setQuantity] = useState(1)

  const { data: tackle } = useGetProductQuery(tackleId)

  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchCart] = usePatchCartMutation()

  const handleAddToCartClick = (): void => {
    patchCart({ cartId, authorized: isAuthorized, productId: tackleId, quantity })
  }

  const increaseQuantity = (): void => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const decreaseQuantity = (): void => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuantity = Math.max(1, Number(event.target.value))

    setQuantity(newQuantity)
  }

  return (
    <div className={styles.productDescription}>
      <div className={styles.productDetails}>
        <div className={styles.imageColumn}>
          <Image
            src={tackle?.images?.length > 0 ? tackle.images[tackle.images.length - 1].src : error}
            alt="Product"
            className={styles.productImage}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.detailsColumn}>
          <h3 className={styles.productTitle}>{tackle?.title}</h3>
          <div className={styles.productDescriptionText}>
            <p>{tackle?.description}</p>
          </div>
          {tackle?.tags && tackle.tags.length > 0 && (
            <div className={styles.tagList}>
              <div className={styles.tagContainer}>
                <p>{tackle.tags[tackle.tags.length - 1].title}</p>
              </div>
            </div>
          )}
          <div className={styles.priceSection}>
            <h2 className={styles.productPrice}>{tackle?.price.value}₴</h2>
            <div className={styles.quantityControls}>
              <p className={styles.p}>Обрати кількість</p>
              <input
                className={styles.quantityInput}
                type="number"
                value={quantity}
                min="1"
                onChange={handleInputChange}
              />
              <div className={styles.quantityArrows}>
                <button onClick={increaseQuantity} className={styles.adjustButton}>
                  +
                </button>
                <button onClick={decreaseQuantity} className={styles.adjustButton}>
                  -
                </button>
              </div>
            </div>
            <button className={styles.addToCartButton} onClick={handleAddToCartClick}>
              Додати у кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
