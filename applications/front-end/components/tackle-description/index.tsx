'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import error from '@boilerplate/front-end/assets/images/error.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchCartMutation } from '@boilerplate/front-end/store/queries/cart.query'
import { useGetProductQuery } from '@boilerplate/front-end/store/queries/product.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/tackle-description/style.module.scss'

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
    <div className={classes['product-desc']}>
      <div className={classes['about-tackle']}>
        <div className={classes['column-1']}>
          <Image
            src={tackle?.images?.length > 0 ? tackle.images[tackle?.images?.length - 1].src : error}
            alt="ArthasFigure"
            className={classes['tackle-img']}
            width={500}
            height={500}
          />
        </div>
        <div className={classes['column-2']}>
          <h3 className={classes.h3}>{tackle?.title}</h3>
          <div className={classes['tackle-desc']}>
            <p className={classes['common-text']}>{`${tackle?.description}`}</p>
          </div>
          {tackle?.tags && tackle.tags.length > 0 ? (
            <div className={classes['category-list']}>
              <div className={classes['category-container']}>
                <p className={classes.p}>{tackle.tags[tackle.tags.length - 1].title}</p>
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
              <p className={classes.h} onClick={handleAddToCartClick}>
                Додати у кошик
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
