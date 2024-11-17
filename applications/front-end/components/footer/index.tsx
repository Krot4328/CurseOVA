import Image from 'next/image'

import facebook from '@boilerplate/front-end/assets/icons/facebook.svg'
import google from '@boilerplate/front-end/assets/icons/google.svg'
import instagram from '@boilerplate/front-end/assets/icons/instagram.svg'
import x from '@boilerplate/front-end/assets/icons/x.svg'

import classes from '@boilerplate/front-end/components/footer/style.module.scss'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => (
  <div className={classes.footer}>
    <div className={classes['top-footer']}>
      <a className={classes.a} href="/">
        На головну
      </a>
      <a className={classes.a} href="about-us">
        Про нас
      </a>
      <a className={classes.a} href="help">
        Допомога
      </a>
      <a className={classes.a} href="contact">
        Повідомити про проблему
      </a>
    </div>

    <div className={classes['middle-footer']}>
      <div className={classes.text}>
        <p className={classes.p}>
          Інтернет-магазин рибальських снастей пропонує широкий вибір вудок, котушок, приманок та аксесуарів для
          риболовлі. У нас ви знайдете все необхідне для успішної рибалки – від початківців до професіоналів.
        </p>
      </div>

      <div className={classes['line-icons']}>
        <a className={classes.a} href="">
          <Image className={classes.img} src={facebook} alt="facebook" />
        </a>
        <a className={classes.a} href="">
          <Image className={classes.img} src={x} alt="x" />
        </a>
        <a className={classes.a} href="">
          <Image className={classes.img} src={instagram} alt="instagram" />
        </a>
        <a className={classes.a} href="">
          <Image className={classes.img} src={google} alt="google" />
        </a>
      </div>
    </div>

    <div className={classes['bottom-footer']}>
      <p className={classes.p}>Ⓒ 2024 FishTackleStore.</p>
    </div>
  </div>
)
