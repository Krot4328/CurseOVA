'use client'

import deleteIcon from '@boilerplate/front-end/assets/icons/delete.svg'

import { useAppSelector } from '@boilerplate/front-end/store'

import { useGetCartQuery } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { CartItem } from '@boilerplate/front-end/components/cart/cart-item'
import classes from '@boilerplate/front-end/components/cart/style.module.scss'
import { SendCartData } from '@boilerplate/front-end/components/forms/create-cart.form'

// eslint-disable-next-line prettier/prettier
interface CartProps { }

export const Cart: React.FC<CartProps> = () => {
  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data } = useGetCartQuery({ cartId, authorized: isAuthorized })
  const cartItems = cartId ? data?.items || [] : []

  return (
    <div className={classes.order}>
      <SendCartData />
      <div className={classes.cart}>
        <ul className={classes['cart-list']}>
          {cartItems.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price.value}
              imageSrc={product.images?.length > 0 ? product.images[product.images.length - 1].src : deleteIcon}
              quantity={quantity}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
