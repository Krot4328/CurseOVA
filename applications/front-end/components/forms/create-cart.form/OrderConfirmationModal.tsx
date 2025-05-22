'use client'

import React, { useEffect, useState } from 'react'

import { Button, Modal } from 'react-bootstrap'

interface OrderConfirmationModalProps {
  show: boolean
  onClose: () => void
  totalPrice: number
  city: string
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ show, onClose, totalPrice, city }) => {
  const [counter, setCounter] = useState(20)

  useEffect(() => {
    if (!show) {
      return
    }

    setCounter(20) // щоразу при відкритті — скидаємо

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval)

          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [show])

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Деталі замовлення</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <strong>Час до завершення оформлення:</strong> {counter} сек
        </p>
        <p>
          <strong>Загальна сума:</strong> {totalPrice} грн
        </p>
        <p>
          <strong>Місто:</strong> {city}
        </p>
        <p>Дякуємо за покупку!</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Продовжити
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
