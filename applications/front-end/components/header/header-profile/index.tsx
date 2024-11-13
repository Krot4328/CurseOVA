import classes from '@boilerplate/front-end/components/header/style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import profile from '@boilerplate/front-end/assets/icons/profile.svg';

import { WithProfile } from '@boilerplate/front-end/store/with-profile'
import { WithoutProfile } from '@boilerplate/front-end/store/without-profile'

interface HeaderProfileProps { }

export const HeaderProfile: React.FC<HeaderProfileProps> = () => {
  return (
    <>
      <WithProfile>
        <div className={classes["cart-profile"]}>
          <Link className={classes.a} href="profile"><Image className={classes.img} src={profile} alt="profile" /></Link>
        </div>
      </WithProfile>
      <WithoutProfile>
        <div className={classes["cart-profile"]}>
          <Link className={classes.a} href="/sign-in"><span>Увійти</span></Link>
          <Link className={classes.a} href="/sign-up"><span>Зареєструватися</span></Link>
        </div>
      </WithoutProfile>
    </>
  );
};
