'use client'

import { Suspense, lazy, useCallback, useEffect, useState } from 'react'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { useGetCartQuery } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'
import { OrderConfirmationModal } from '@boilerplate/front-end/components/forms/create-cart.form/OrderConfirmationModal'

interface SendCartDataProps {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  city?: string
  // paymentType?: string
}

const BaseSendCartFormProps = lazy(() => import('@boilerplate/front-end/components/forms/create-cart.form/form'))

export const SendCartData: React.FC<SendCartDataProps> = ({ firstName, lastName, phone, email, city }) => {
  // const cartId = useAppSelector(cartSlice.selectors.id) as string
  // const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data, isLoading } = useGetCartQuery({ cartId, authorized: isAuthorized })

  const dispatch = useAppDispatch()

  const [showModal, setShowModal] = useState(false)

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  const items =
    data?.items?.map((item) => {
      if (!item || !item.product) {
        return {
          product: { name: 'Видалений товар' },
          quantity: 0,
          price: 0,
        }
      }

      return {
        product: {
          name: item.product.title ?? 'Без назви',
        },
        quantity: item.quantity ?? 1,
        price: item.product.price?.value ?? 0,
      }
    }) || []

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    dispatch(cartSlice.actions.setFirstName(firstName || ''))
    dispatch(cartSlice.actions.setLastName(lastName || ''))
    dispatch(cartSlice.actions.setEmail(email || ''))
    dispatch(cartSlice.actions.setPhone(phone || ''))
    dispatch(cartSlice.actions.setEmail(city || ''))
  }, [firstName, lastName, email, phone, city, dispatch])

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleChangeFirstName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setFirstName(event.target.value))
  }, [])

  const handleChangeLastName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setLastName(event.target.value))
  }, [])

  const handleChangeEmail = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const value = event.target.value

    if (!value.includes('@')) {
      return
    }

    dispatch(cartSlice.actions.setEmail(event.target.value))
  }, [])

  const handleChangePhone = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const value = event.target.value

    if (!/^[+0-9]*$/.test(value)) {
      return
    }

    dispatch(cartSlice.actions.setPhone(event.target.value))
  }, [])

  const handleChangeCity = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(cartSlice.actions.setCity(event.target.value))
  }, [])

  // const handleChangeDepartment = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
  //   dispatch(cartSlice.actions.setDepartment(event.target.value))
  // }, [])

  const content = (
    <div className={classes.cartForm}>
      <h2 className={classes.title}>Оформлення замовлення</h2>
      <div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Ім'я</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Введіть своє ім'я"
              onChange={handleChangeFirstName}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Прізвище</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Введіть своє прізвище"
              onChange={handleChangeLastName}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Введіть свою електронну пошту"
            onChange={handleChangeEmail}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Номер</Form.Label>
          <Form.Control
            type="tel"
            name="tel"
            placeholder="Введіть свій номер телефону"
            onChange={handleChangePhone}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Місто</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Введіть своє місто"
              onChange={handleChangeCity}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Спосіб оплати</Form.Label>
            <Form.Select defaultValue="Choose..." required>
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
    <>
      <Suspense fallback={<form>{content}</form>}>
        <BaseSendCartFormProps onSuccess={handleShowModal}>{content}</BaseSendCartFormProps>
      </Suspense>

      <OrderConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        totalPrice={totalPrice}
        city={city || ''}
      />
    </>
  )
}
