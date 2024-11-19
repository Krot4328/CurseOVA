'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import error from '@boilerplate/front-end/assets/images/error.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchCartMutation } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/tackle/right/card/style.module.scss'

interface CardProps {
  id: string
  title: string
  price: number
  imageSrc: string
}

export const Card: React.FC<CardProps> = ({ id, title, price, imageSrc }) => {
  // const router = useRouter()
  // const handleCardClick = (): void => {
  //   router.push(`/tackle-description/${id}`)
  // }

  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchCart] = usePatchCartMutation()

  const [quantity] = useState(1)

  const handleAddToCartClick = (): void => {
    patchCart({ cartId, authorized: isAuthorized, productId: id, quantity })
  }

  return (
    <div className={classes.card}>
      <Link href={`/tackle-description/${id}`} className={classes.link}>
        <Image className={classes.img} src={imageSrc ? imageSrc : error} width="200" height="200" alt="error" />
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
