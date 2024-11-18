'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import topArrow from '@boilerplate/front-end/assets/icons/facebook.svg'

import { useGetProductQuery } from '@boilerplate/front-end/store/queries/product.query'

import classes from '@boilerplate/front-end/components/tackle-description/style.module.scss'

interface TackleDescriptionProps {
  tackleId: string
}

export const TackleDescription: React.FC<TackleDescriptionProps> = ({ tackleId }) => {
  const [quantity, setQuantity] = useState(1)

  const { data: tackle, isLoading } = useGetProductQuery(tackleId)

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
    <div className={classes['product-desc']}>
      <div className={classes['about-figure']}>
        <div className={classes['column-1']}>
          <Image
            src={tackle?.images?.length > 0 ? tackle?.images[0].src : topArrow}
            alt="ArthasFigure"
            className={classes['figure-img']}
            width={500}
            height={500}
          />
        </div>
        <div className={classes['column-2']}>
          <h3 className={classes.h3}>{tackle?.title}</h3>
          <div className={classes['figure-desc']}>
            <p className={classes['common-text']}>{`${tackle?.description}`}</p>
          </div>
          {tackle?.tags && tackle.tags.length > 0 ? (
            <div className={classes['category-list']}>
              <div className={classes['category-container']}>
                {tackle.tags.map((tag, index) => (
                  <p key={index} className={classes.p}>
                    {tag.title}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
          <div className={classes['price-container']}>
            <h2 className={classes.price}>{tackle?.price.value}₴</h2>
            <div className={classes['change-quantity']}>
              <p className={classes.p}>Обрати кількість</p>
              <input
                className={classes['input-number']}
                type="number"
                id="quan"
                value={quantity}
                min="1"
                onChange={handleInputChange}
              />
              <div className={classes['quantity-arrows']}>
                <button onClick={increaseQuantity} className={classes.increaseButton}>
                  +
                </button>
                <button onClick={decreaseQuantity} className={classes.decreaseButton}>
                  -
                </button>
              </div>
            </div>
            <button className={classes['add-to-cart']}>
              <p className={classes.h}>Додати у кошик</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
