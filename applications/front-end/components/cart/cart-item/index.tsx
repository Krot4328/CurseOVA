'use client'

import { useCallback } from 'react'

import Image from 'next/image'

import { ImCross } from 'react-icons/im'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchCartMutation } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'

interface CartItemProps {
  id: string
  title: string
  price: number
  imageSrc?: string
  quantity: number
}

export const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity, imageSrc }) => {
  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchCart] = usePatchCartMutation()

  const increaseQuantity = useCallback<React.MouseEventHandler<HTMLButtonElement>>((): void => {
    patchCart({ cartId, productId: id, authorized: isAuthorized, quantity: quantity + 1 })
  }, [quantity])

  const decreaseQuantity = useCallback<React.MouseEventHandler<HTMLButtonElement>>((): void => {
    if (quantity > 1) {
      patchCart({ cartId, productId: id, authorized: isAuthorized, quantity: quantity - 1 })
    }
  }, [quantity])

  const handleRemoveFromCartClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    patchCart({ cartId, productId: id, authorized: isAuthorized, quantity: 0 })
  }, [])

  return (
    <div className={classes.cart}>
      <div className={classes.product}>
        <Image
          className={classes.productImage}
          src={imageSrc ? imageSrc : 'undefined'}
          alt={title}
          width={50}
          height={50}
        />
        <h3 className={classes.productName}>{title}</h3>
        <p className={classes.productPrice}>Ціна: {price} грн</p>
        <div className={classes.quantityControl}>
          <button onClick={decreaseQuantity} className={classes.decreaseButton}>
            -
          </button>
          <span className={classes.quantity}>{quantity}</span>
          <button onClick={increaseQuantity} className={classes.increaseButton}>
            +
          </button>
        </div>
        <div className={classes.check}>
          <p>Ціна: {price * quantity} грн</p>
        </div>
        <button onClick={handleRemoveFromCartClick} className={classes.deleteButton}>
          <ImCross className={classes.img} />
        </button>
      </div>
    </div>
  )
}
