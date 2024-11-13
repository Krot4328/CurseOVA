'use client'

import { Suspense, lazy } from 'react'

import clasess from '@boilerplate/front-end/components/forms/sign-in.form/styles.module.scss'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

interface SignInFormProps { }

const SignInBaseForm = lazy(() => import('@boilerplate/front-end/components/forms/sign-in.form/base.form'))

export const SignInForm: React.FC<SignInFormProps> = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(authSlice.selectors.email)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setEmail(event.target.value))
  }

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }

  return (
    <Card className={clasess.card}>
      <Card.Body>
        <Suspense>
          <SignInBaseForm>
            <Form.Group className={clasess.form} controlId="exampleFormControlInput1">
              <Form.Label>Електронна пошта</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmailChange}
                type="text"
                placeholder="Введіть адресу електронної пошти"
              />
            </Form.Group>
            <Form.Group className={clasess.form} controlId="exampleFormControlInput2">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Введіть пароль"
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Увійти
            </Button>
          </SignInBaseForm>
        </Suspense>
      </Card.Body>
    </Card>
  )
}
