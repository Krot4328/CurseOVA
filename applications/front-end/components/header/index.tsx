'use client'

import Image from 'next/image'
import Link from 'next/link'

import emptyCart from '@boilerplate/front-end/assets/icons/empty-cart1.svg'
import fullCart from '@boilerplate/front-end/assets/icons/full-cart1.svg'
import logo from '@boilerplate/front-end/assets/images/logo.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { useGetCartQuery } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { HeaderProfile } from '@boilerplate/front-end/components/header/header-profile'
import { Search } from '@boilerplate/front-end/components/header/search'
import classes from '@boilerplate/front-end/components/header/style.module.scss'

// eslint-disable-next-line prettier/prettier
interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data } = useGetCartQuery({ cartId, authorized: isAuthorized })
  const items = data?.items || []

  return (
    <div className={classes.header}>
      <div className={classes['top-header']}>
        <div className={classes.logo}>
          <Link className={classes.a} href="/tackle">
            <Image className={classes.img} src={logo} alt="logo" />
          </Link>
        </div>
        <Search />
        <div className={classes['cart-profile']}>
          <Link className={classes.a} href="/cart">
            <Image className={classes.img} src={items.length > 0 ? fullCart : emptyCart} alt="cart" />
          </Link>
          <HeaderProfile />
        </div>
      </div>
    </div>
  )
}
