'use client'

import { useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import profileIcon from '@boilerplate/front-end/assets/icons/profile.svg'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import Button from 'react-bootstrap/Button'

import classes from '@boilerplate/front-end/components/header/style.module.scss'

interface HeaderProfileProps { }

export const HeaderProfile: React.FC<HeaderProfileProps> = () => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector(profileSlice.selectors.profile)

  const handleLogoutClick = useCallback(async () => {
    const { signOutStart } = await import('@boilerplate/front-end/store/sagas/sign-out.saga')

    dispatch(signOutStart({}))
  }, [])

  if (profile) {
    return (
      <div className={classes['cart-profile']}>
        <Link className={classes.a} href="profile">
          <Image className={classes.img} src={profileIcon} alt="profile" />
        </Link>
        <Button variant="primary" onClick={handleLogoutClick}>
          Вийти
        </Button>
      </div>
    )
  }

  return (
    <div className={classes['cart-profile']}>
      <Link className={classes.a} href="/sign-in">
        <span>Увійти</span>
      </Link>
      <Link className={classes.a} href="/sign-up">
        <span>Зареєструватися</span>
      </Link>
    </div>
  )
}
