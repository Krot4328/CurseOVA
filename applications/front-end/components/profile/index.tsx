'use client'

import React, { Suspense, lazy, useState } from 'react'

import Image from 'next/image'

import profile from '@boilerplate/front-end/assets/icons/profile.svg'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'
import { useGetUserCartsListQuery } from '@boilerplate/front-end/store/queries/user-carts-list.query'

import classes from '@boilerplate/front-end/components/profile/style.module.scss'

// eslint-disable-next-line prettier/prettier
interface ProfileProps { }
const History = lazy(() => import('@boilerplate/front-end/components/profile/history'))

export const Profile: React.FC<ProfileProps> = () => {
  const { data } = useGetProfileQuery()
  const { firstName, lastName, phone, email } = data ?? {}

  const { data: carts, isLoading: isCartsLoading } = useGetUserCartsListQuery()

  const [showHistory, setShowHistory] = useState(false)

  const handleShowHistory = () => setShowHistory(true)
  const handleCloseHistory = () => setShowHistory(false)

  console.log({ carts })

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileInfo}>
        <Image className={classes.profileImage} src={profile} alt="Profile Picture" />
        <h2 className={classes.profileName}>
          {firstName} {lastName}
        </h2>
      </div>

      <div className={classes.contactInfo}>
        <h3 className={classes.contactHeader}>Контактна інформація</h3>
        <div className={classes.contactDetails}>
          <p className={classes.contactDetail}>Телефон: {phone}</p>
          <p className={classes.contactDetail}>Електронна пошта: {email}</p>
        </div>
        <button className={classes.ShowHistoryButton} onClick={handleShowHistory}>
          Показати історію покупок
        </button>
      </div>
      {showHistory && (
        <div className={classes.modalOverlay} onClick={handleCloseHistory}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={classes.closeButton} onClick={handleCloseHistory}>
              ✖
            </button>

            {isCartsLoading ? (
              <p>Завантаження історії...</p>
            ) : carts && carts.filter((cart) => cart.items.length > 0).length > 0 ? (
              <Suspense fallback={<p>Завантаження компоненту історії...</p>}>
                {carts
                  .filter((cart) => cart.items.length > 0)
                  .map((cart) => (
                    <History
                      key={cart.id}
                      cartId={cart.id ?? ''}
                      updatedAt={cart.updatedAt ?? ''}
                      city={cart.city ?? ''}
                      items={cart.items.map((item) => ({
                        product: {
                          id: item.product.id,
                          title: item.product.title,
                          price: item.product.price.value,
                        },
                        quantity: item.quantity,
                      }))}
                    />
                  ))}
              </Suspense>
            ) : (
              <p>Історія покупок порожня</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
