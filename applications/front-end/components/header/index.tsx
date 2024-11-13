import classes from '@boilerplate/front-end/components/header/style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@boilerplate/front-end/assets/images/logo.png';
import cart from '@boilerplate/front-end/assets/icons/cart.svg';

import { HeaderProfile } from '@boilerplate/front-end/components/header/header-profile'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {

    return (
        <div className={classes.header}>
            <div className={classes["top-header"]}>
                <div className={classes.logo}>
                    <Link className={classes.a} href="tackle"><Image className={classes.img} src={logo} alt='logo' /></Link>
                </div>

                <div className={classes["cart-profile"]}>
                    <Link className={classes.a} href="cart"><Image className={classes.img} src={cart} alt="cart" /></Link>
                    <HeaderProfile />
                </div>
            </div>

            <div className={classes["bottom-header"]}>
                <Link className={classes.a} href="tackle">Головна</Link>
                <Link className={classes.a} href="about-us">Про нас</Link>
            </div>
        </div>
    );
};
