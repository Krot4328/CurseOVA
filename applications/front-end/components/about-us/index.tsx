'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import wudkaImg from '@boilerplate/front-end/assets/images/group.jpeg'
import fishImg from '@boilerplate/front-end/assets/images/images.jpeg'
import wodkaImg from '@boilerplate/front-end/assets/images/Kunstkoeder.webp'

import classes from '@boilerplate/front-end/components/about-us/style.module.scss'

interface AboutUsProps { }

export const AboutUs: React.FC<AboutUsProps> = () => (
  <>
    <div className={classes['about-us']}>
      <div className={classes.info}>
        <h2 className={classes.h2}>Про нас</h2>
        <p className={classes.p}>
          Вітаємо у нашому інтернет-магазині рибальських снастей! Ми - команда ентузіастів, які захоплюються риболовлею
          і знають, як важливо мати надійні, якісні снасті. Наш асортимент включає в себе все необхідне для успішної
          риболовлі: вудки, котушки, приманки, ліски, аксесуари та багато іншого.
        </p>
        <p className={classes.p}>
          Ми співпрацюємо з провідними виробниками і гарантуємо високу якість продукції. Незалежно від вашого рівня
          досвіду, у нас знайдеться спорядження, яке допоможе вам досягти успіху. Обирайте кращі товари за доступними
          цінами та насолоджуйтеся незабутніми моментами на природі!
        </p>
        <p className={classes.p}>
          Якщо виникла проблема{' '}
          <Link className={classes.a} href="contact">
            повідомте нас!
          </Link>
        </p>
      </div>

      <div className={classes.image}>
        <div className={classes.fish}>
          <Image className={classes.imgOne} src={wudkaImg} alt="group" width={275} height={183} />
          <Image className={classes.imgOne} src={fishImg} alt="group" />
        </div>
        <Image className={classes.imgTwo} src={wodkaImg} alt="group" width={300} />
      </div>
    </div>
  </>
)
