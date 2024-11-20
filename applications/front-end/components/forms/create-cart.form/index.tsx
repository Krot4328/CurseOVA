'use client'

import { Suspense, lazy, useCallback, useEffect } from 'react'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'

interface SendCartDataProps {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  city?: string
  department?: string
  // paymentType?: string
}

const BaseSendCartFormProps = lazy(() => import('@boilerplate/front-end/components/forms/create-cart.form/form'))

export const SendCartData: React.FC<SendCartDataProps> = ({ firstName, lastName, phone, email, city, department }) => {
  // const cartId = useAppSelector(cartSlice.selectors.id) as string
  // const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(cartSlice.actions.setFirstName(firstName || ''))
    dispatch(cartSlice.actions.setLastName(lastName || ''))
    dispatch(cartSlice.actions.setEmail(email || ''))
    dispatch(cartSlice.actions.setPhone(phone || ''))
    dispatch(cartSlice.actions.setEmail(city || ''))
    dispatch(cartSlice.actions.setPhone(department || ''))
  }, [firstName, lastName, email, phone, city, department, dispatch])
  const handleChangeFirstName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setFirstName(event.target.value))
  }, [])

  const handleChangeLastName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setLastName(event.target.value))
  }, [])

  const handleChangeEmail = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setEmail(event.target.value))
  }, [])

  const handleChangePhone = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setPhone(event.target.value))
  }, [])

  const handleChangeCity = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setCity(event.target.value))
  }, [])

  const handleChangeDepartment = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setDepartment(event.target.value))
  }, [])

  const content = (
    <div className={classes.cartForm}>
      <h2 className={classes.title}>Оформлення замовлення</h2>
      <div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Ім'я</Form.Label>
            <Form.Control type="firstname" placeholder="" onChange={handleChangeFirstName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Прізвище</Form.Label>
            <Form.Control type="lastname" placeholder="" onChange={handleChangeLastName} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="" onChange={handleChangeEmail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Номер</Form.Label>
          <Form.Control type="phone" placeholder="" onChange={handleChangePhone} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Місто</Form.Label>
            <Form.Control type="city" onChange={handleChangeCity} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Відділення НП</Form.Label>
            <Form.Control type="text" onChange={handleChangeDepartment} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Спосіб оплати</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>Готівка</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </div>
      <button className={classes.checkoutButton} type="submit">
        Оформити замовлення
      </button>
    </div>
  )

  return (
    <Suspense fallback={<form>{content}</form>}>
      <BaseSendCartFormProps>{content}</BaseSendCartFormProps>
    </Suspense>
  )
}
