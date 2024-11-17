'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import profile from '@boilerplate/front-end/assets/icons/proFile.svg'

import classes from '@boilerplate/front-end/components/profile/style.module.scss'

interface ProfileProps { }

export const Profile: React.FC<ProfileProps> = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '123-456-7890',
    email: 'example@gmail.com',
    address: '123 Main St, City, Country',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newContactInfo, setNewContactInfo] = useState(contactInfo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setNewContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setContactInfo(newContactInfo)
    setIsEditing(false)
  }

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileInfo} >
        <Image className={classes.profileImage} src={profile} alt="Profile Picture" />
        <h2 className={classes.profileName}>Ім'я Прізвище</h2>
      </div>

      <div className={classes.contactInfo} >
        <h3 className={classes.contactHeader}>Контактна інформація</h3>
        {isEditing ? (
          <div className={classes.editForm}>
            <p className={classes.contactEdit}>Телефон</p>
            <input
              className={classes.contactInput}
              type="text"
              name="phone"
              value={newContactInfo.phone}
              onChange={handleChange}
              placeholder="Телефон"
            />
            <p className={classes.contactEdit}>Електронна пошта</p>
            <input
              className={classes.contactInput}
              type="email"
              name="email"
              value={newContactInfo.email}
              onChange={handleChange}
              placeholder="Електронна пошта"
            />
            <p className={classes.contactEdit}>Адреса</p>
            <input
              className={classes.contactInput}
              type="text"
              name="address"
              value={newContactInfo.address}
              onChange={handleChange}
              placeholder="Адреса"
            />
            <button className={classes.saveButton} onClick={handleSave}>
              Зберегти
            </button>
          </div>
        ) : (
          <div className={classes.contactDetails}>
            <p className={classes.contactDetail}>Телефон: {contactInfo.phone}</p>
            <p className={classes.contactDetail}>Електронна пошта: {contactInfo.email}</p>
            <p className={classes.contactDetail}>Адреса: {contactInfo.address}</p>
            <button className={classes.editButton} onClick={handleEdit}>
              Редагувати
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
