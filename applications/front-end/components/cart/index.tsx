'use client'

import deleteIcon from '@boilerplate/front-end/assets/icons/delete.svg'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { useAppSelector } from '@boilerplate/front-end/store'

import { useGetCartQuery } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { CartItem } from '@boilerplate/front-end/components/cart/cart-item'
import classes from '@boilerplate/front-end/components/cart/style.module.scss'

// eslint-disable-next-line prettier/prettier
interface CartProps { }

export const Cart: React.FC<CartProps> = () => {
  const cartId = useAppSelector(cartSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data } = useGetCartQuery({ cartId, authorized: isAuthorized })
  const cartItems = data?.items || []

  return (
    <>
      <div className={classes.order}>
        <div className={classes.orderForm}>
          <h2 className={classes.title}>Оформлення замовлення</h2>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control type="email" placeholder="" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Прізвище</Form.Label>
                <Form.Control type="password" placeholder="" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Номер</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Місто</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Відділення НП</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Спосіб оплати</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </div>
        <div className={classes.cart}>
          <ul className={classes['cart-list']}>
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price.value}
                imageSrc={product.images?.length > 0 ? product.images[0].src : deleteIcon}
                quantity={quantity}
              />
            ))}
          </ul>
          <button className={classes.checkoutButton}>Оформити замовлення</button>
        </div>
      </div>
    </>
  )
}
