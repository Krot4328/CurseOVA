'use client'

import { useCallback } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

import clasess from '@boilerplate/front-end/components/forms/sign-in.form/styles.module.scss'
import { PutTokenUrl } from '@boilerplate/types/auth/dto/requests/token'
import { Method } from '@boilerplate/core/interfaces/http'

interface SignInFormProps { }

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

  const handleSignInSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (event): Promise<void> => {
    event.preventDefault()

    const { signInStart } = await import('@boilerplate/front-end/store/sagas/sign-in.saga')

    dispatch(signInStart({}))
  }, [])

  return (
    <Card className={clasess.card}>
      <Card.Body>
        <Form action={PutTokenUrl} method={Method.Put} onSubmit={handleSignInSubmit}>
          <Form.Group className={clasess.form} controlId="exampleFormControlInput1">
            <Form.Label className={clasess.text}>Електронна пошта</Form.Label>
            <Form.Control
              className={clasess.placeholder}
              value={email}
              onChange={handleEmailChange}
              type="text"
              placeholder="Введіть адресу електронної пошти"
            />
          </Form.Group>
          <Form.Group className={clasess.form} controlId="exampleFormControlInput2">
            <Form.Label className={clasess.text}>Пароль</Form.Label>
            <Form.Control
              className={clasess.placeholder}
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Введіть пароль"
            />
          </Form.Group>
          <Button className={clasess.but} type="submit" variant="primary">
            Увійти
          </Button>
        </Form>
      </Card.Body>
    </Card >
  )
}
