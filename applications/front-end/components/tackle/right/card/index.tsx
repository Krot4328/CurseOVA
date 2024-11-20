'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import error from '@boilerplate/front-end/assets/images/error.png'

import { useAppDispatch } from '@boilerplate/front-end/store'

import classes from '@boilerplate/front-end/components/tackle/right/card/style.module.scss'

interface CardProps {
  id: string
  title: string
  price: number
  imageSrc: string
}

export const Card: React.FC<CardProps> = ({ id, title, price, imageSrc }) => {
  const dispatch = useAppDispatch()

  const [quantity] = useState(1)

  const handleAddToCartClick = async (): Promise<void> => {
    const { addToCartStart } = await import('@boilerplate/front-end/store/sagas/add-to-cart.saga')

    dispatch(addToCartStart({ productId: id, quantity }))
  }

  return (
    <div className={classes.card}>
      <Link href={`/tackle-description/${id}`} className={classes.link}>
        <Image className={classes.img} src={imageSrc ?? error} width="200" height="200" alt="error" />
        <div className={classes['card-body']}>
          <div className={classes['card-title']}>{title}</div>
          <p className={classes['cart-price']}>{price.toFixed(2)}₴</p>
        </div>
      </Link>
      <button className={classes['btn-primary']} onClick={handleAddToCartClick}>
        До кошика
      </button>
    </div>
  )
}
