'use client'

import { Suspense, lazy } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

import clasess from '@boilerplate/front-end/components/forms/sing-up.form/styles.module.scss'

const SignUpBaseForm = lazy(() => import('@boilerplate/front-end/components/forms/sing-up.form/base.form'))

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const firstName = useAppSelector(authSlice.selectors.firstName)
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setFirstName(event.target.value))
  }

  const lastName = useAppSelector(authSlice.selectors.lastName)
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setLastName(event.target.value))
  }

  const email = useAppSelector(authSlice.selectors.email)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setEmail(event.target.value))
  }

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }

  const repeatPassword = useAppSelector(authSlice.selectors.repeatPassword)
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setRepeatPassword(event.target.value))
  }

  const phone = useAppSelector(authSlice.selectors.phone)
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPhone(event.target.value))
  }

  return (
    <Card className={clasess.card}>
      <Card.Body>
        <Suspense>
          <SignUpBaseForm>
            <div>
              <div className={clasess.title}>Регістрація</div>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput1">
                <Form.Label className={clasess.text} value={firstName} onChange={handleFirstNameChange}>
                  Ім'я
                </Form.Label>
                <Form.Control className={clasess.placeholder} type="first-name" placeholder="Введіть своє ім'я" />
              </Form.Group>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput2">
                <Form.Label className={clasess.text} value={lastName} onChange={handleLastNameChange}>
                  Прізвище
                </Form.Label>
                <Form.Control className={clasess.placeholder} type="last-name" placeholder="Введіть своє прізвище" />
              </Form.Group>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput3">
                <Form.Label className={clasess.text}>Електронна пошта</Form.Label>
                <Form.Control
                  className={clasess.placeholder}
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Електронна пошта"
                />
              </Form.Group>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput4">
                <Form.Label className={clasess.text}>Пароль</Form.Label>
                <Form.Control
                  className={clasess.placeholder}
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Group>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput5">
                <Form.Label className={clasess.text}>Повторіть пароль</Form.Label>
                <Form.Control
                  className={clasess.placeholder}
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  type="password-repeat"
                  placeholder="Повторіть пароль"
                />
              </Form.Group>
              <Form.Group className={clasess.form} controlId="exampleFormControlInput7">
                <Form.Label className={clasess.text}>Телефон</Form.Label>
                <Form.Control
                  className={clasess.placeholder}
                  value={phone}
                  onChange={handlePhoneChange}
                  type="phone"
                  placeholder="Введіть свій номер"
                />
              </Form.Group>
              <Button className={clasess.but} type="submit" variant="primary">
                Зареєструватися
              </Button>
            </div>
          </SignUpBaseForm>
        </Suspense>
      </Card.Body>
    </Card>
  )
}
