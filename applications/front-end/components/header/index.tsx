import Image from 'next/image'
import Link from 'next/link'

import cart from '@boilerplate/front-end/assets/icons/cart.svg'
import logo from '@boilerplate/front-end/assets/images/logo.png'

import { Search } from '@boilerplate/front-end/components/header/search'
import { HeaderProfile } from '@boilerplate/front-end/components/header/header-profile'
import classes from '@boilerplate/front-end/components/header/style.module.scss'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => (
  <div className={classes.header}>
    <div className={classes['top-header']}>
      <div className={classes.logo}>
        <Link className={classes.a} href="tackle">
          <Image className={classes.img} src={logo} alt="logo" />
        </Link>
      </div>
      <Search />
      <div className={classes['cart-profile']}>
        <Link className={classes.a} href="cart">
          <Image className={classes.img} src={cart} alt="cart" />
        </Link>
        <HeaderProfile />
      </div>
    </div>
  </div>
)
