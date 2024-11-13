'use client'

import Image from 'next/image'

import card from '@boilerplate/front-end/assets/icons/card.svg'

import classes from '@boilerplate/front-end/components/tackle/right/card/style.module.scss'

interface CardProps {
  id: string
  title: string
  price: number
  description: string
  pathToImage: string
}

export const Card: React.FC<CardProps> = ({ title, price, description, pathToImage }) => (
  <div className={classes.card}>
    <Image className={classes.img} src={pathToImage ? pathToImage : card} width="200" height="200" alt="card" />
    <div className={classes['card-body']}>
      <h5 className={classes['card-title']}>{title}</h5>
      <p className={classes['card-text']}>{description}</p>
      <p className={classes['cart-price']}>{price.toFixed(2)}₴</p>
      <button className={classes['btn-primary']}>До кошика</button>
    </div>
  </div>
)
