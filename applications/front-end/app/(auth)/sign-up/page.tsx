/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

import { SignUpForm } from '@boilerplate/front-end/components/forms/sing-up.form'

export interface AuthSignUpPageProps {}

const AuthSignUpPage: React.FC<AuthSignUpPageProps> = () => (
  <>
    <SignUpForm />
    <div className={classes['under-card']}>
      <div>
        <p>
          Вже маєте акаунт?&nbsp;
          <Link href="/sign-in" className={classes.sign}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </>
)

export default AuthSignUpPage
