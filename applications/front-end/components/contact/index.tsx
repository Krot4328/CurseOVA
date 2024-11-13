'use client';

import React, { useState } from 'react';
import classes from '@boilerplate/front-end/components/contact/style.module.scss';

interface ContactProps { }

export const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Дані форми:", formData);
  };

  return (
    <>
      <h2 className={classes.h2}>Зв'язатися з нами</h2>
      <div className={classes.container}>
        <div className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label htmlFor="name" className={classes.label}>Ім'я та Прізвище</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={classes.input}
              placeholder="Ваше ім'я та прізвище"
              required
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="contact" className={classes.label}>Пошта або Телефон</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={classes.input}
              placeholder="Ваш контактний номер або email"
              required
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="message" className={classes.label}>Повідомлення</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={classes.textarea}
              placeholder="Ваше повідомлення"
              rows={4}
              required
            />
          </div>

          <button type="submit" className={classes.button}>Відправити</button>
        </div>
      </div>
    </>
  );
};
