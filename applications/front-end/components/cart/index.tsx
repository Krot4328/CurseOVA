'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ImCross } from "react-icons/im";

import deleteIcon from '@boilerplate/front-end/assets/icons/delete.svg'
import rod from '@boilerplate/front-end/assets/images/fishing-rod.png'
import lure from '@boilerplate/front-end/assets/images/lure-set.jpg'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Fishing rod', price: 500, quantity: 1, image: rod },
    { id: 2, name: 'Lure set', price: 300, quantity: 1, image: lure },
  ])

  const handleQuantityChange = (productId: number, type: 'increase' | 'decrease') => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
            ...product,
            quantity: type === 'increase' ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
          }
          : product,
      ),
    )
  }

  const handleDelete = (productId: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
  }

  const grandTotal = products.reduce((total, product) => total + product.price * product.quantity, 0)

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
          {products.map((product) => (
            <div key={product.id} className={classes.product}>
              <Image className={classes.productImage} src={product.image} alt={product.name} />
              <h3 className={classes.productName}>{product.name}</h3>
              <p className={classes.productPrice}>Ціна: {product.price} грн</p>
              <div className={classes.quantityControl}>
                <button onClick={() => handleQuantityChange(product.id, 'decrease')} className={classes.decreaseButton}>
                  -
                </button>
                <span className={classes.quantity}>{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product.id, 'increase')} className={classes.increaseButton}>
                  +
                </button>
              </div>
              <button onClick={() => handleDelete(product.id)} className={classes.deleteButton}>
                <ImCross className={classes.img} />
              </button>
            </div>
          ))}
          <div className={classes.check}>
            <p>Загальна ціна: {grandTotal} грн</p>
          </div>
          <button className={classes.checkoutButton}>Оформити замовлення</button>
        </div>
      </div>
    </>
  )
}
