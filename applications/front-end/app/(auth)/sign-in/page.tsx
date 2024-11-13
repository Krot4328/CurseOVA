/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

import { SignInForm } from '@boilerplate/front-end/components/forms/sign-in.form'

export interface AuthSignInPageProps { }

const AuthSignInPage: React.FC<AuthSignInPageProps> = () => (
  <>
    <SignInForm />
    <div className={classes['under-card']}>
      <p>
        Немає облікового запису?&nbsp;
        <Link href="/sign-up" className={classes.sign}>
          Зареєструватися
        </Link>
      </p>
    </div>
  </>
)

export default AuthSignInPage
