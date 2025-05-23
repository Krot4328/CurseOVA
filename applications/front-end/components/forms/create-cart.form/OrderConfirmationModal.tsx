'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Modal } from 'react-bootstrap'

import classes from '@boilerplate/front-end/components/forms/create-cart.form/styles.module.scss'

interface OrderConfirmationModalProps {
  show: boolean
  totalPrice: number
  city: string
  items: {
    product: { name: string }
    quantity: number
    price: number
  }[]
}

const TIME_LIMIT = 180

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ show, totalPrice, city, items }) => {
  const cityAddresses: Record<string, string> = {
    Вінниця: 'вул. Коцюбинського 1',
    Дніпро: 'вул. Грушевського 24',
    Житомир: 'вул. Перемоги 7',
    Запоріжжя: 'вул. Водограйна 12б',
    'Івано-Франківськ': 'вул. Незалежності 19',
    Київ: 'вул. Хрещатик 10',
    Кропивницький: 'вул. Богдана Хмельницького 3',
    Луцьк: 'вул. Винниченка 16',
    Львів: 'вул. Шевченка 21',
    Миколаїв: 'вул. Адмірала Макарова 4',
    Одеса: 'вул. Дерибасівська 9',
    Полтава: 'вул. Європейська 5',
    Рівне: 'вул. Соборна 40',
    Суми: 'вул. Харківська 22',
    Тернопіль: 'просп. Злуки 15',
    Ужгород: 'вул. Корзо 2',
    Харків: 'вул. Пушкінська 30',
    Херсон: 'вул. Ушакова 14',
    Хмельницький: 'вул. Подільська 8',
    Черкаси: 'бул. Смілянська 11',
    Чернівці: 'вул. Головна 1',
    Чернігів: 'просп. Миру 27',
  }
  const [counter, setCounter] = useState(TIME_LIMIT)
  const startTimeRef = useRef<number | null>(null)
  const [tomPickupDate, setTomPickupDate] = useState<string>('')
  const [weekPickupDate, setWeekPickupDate] = useState<string>('')

  const displayAddress = cityAddresses[city?.trim() || ''] || city?.trim() || 'Невідоме місто'

  useEffect(() => {
    if (show) {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now()
      }

      const tomorrow = new Date()
      const week = new Date()

      tomorrow.setDate(tomorrow.getDate() + 1)
      week.setDate(week.getDate() + 7)

      const formattedTomorrow = tomorrow.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

      const formattedWeek = week.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

      setTomPickupDate(formattedTomorrow)
      setWeekPickupDate(formattedWeek)

      // Лічильник
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000)
        const remaining = Math.max(TIME_LIMIT - elapsed, 0)

        setCounter(remaining)
        if (remaining === 0) {
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [show])

  return (
    <Modal show={show} centered dialogClassName={classes.customModalDialog}>
      <Modal.Header>
        <Modal.Title className="w-100 text-center">Деталі замовлення</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className={classes.infoSection}>
          <strong>Час до завершення оформлення:</strong> {counter} сек
        </p>

        <p className={classes.infoSection}>
          <strong>Адреса:</strong> {displayAddress}
        </p>

        <p className={classes.infoSection}>
          <strong>Коли забрати:</strong> з {tomPickupDate} до {weekPickupDate}. З 9:00 до 21:00
        </p>

        <hr className={classes.fullWidthHr} />

        <p className={classes.infoSection}>
          <strong>Товари:</strong>
        </p>

        <ul className={classes.list}>
          {items.map((item, index) => (
            <li key={index}>
              {item.product.name} — {item.quantity} шт × {item.price} грн = {item.quantity * item.price} грн
            </li>
          ))}
        </ul>

        <hr className={classes.fullWidthHr} />

        <p className={classes.total}>
          <strong>Загальна сума:</strong> {totalPrice} грн
        </p>

        <hr className={classes.fullWidthHr} />

        <p className={classes.infoSectionTy}>Дякуємо за покупку!</p>

        <hr className={classes.fullWidthHr} />

        <p className={classes.alert}>Увага!</p>

        <p className={classes.note}>Розрахунок відбувається під час отримання товару.</p>
        <p className={classes.note}>
          Це вікно зникне через зазнчений час, і Ви його більше не побачите, тому краще збережіть його.
        </p>
      </Modal.Body>
    </Modal>
  )
}
