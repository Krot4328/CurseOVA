import React, { useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";

import classes from '@boilerplate/front-end/components/help/accordion/style.module.scss'

interface AccordionProps { }

export const Accordion: React.FC<AccordionProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: 'Як оформити замовлення?',
      answer:
        'Щоб оформити замовлення, додайте товар у кошик і перейдіть до оформлення замовлення. Далі дотримуйтеся інструкцій.',
    },
    {
      question: 'Які варіанти оплати доступні?',
      answer:
        'Ми приймаємо оплату кредитними картками, через банківський переказ та через платіжні системи, такі як PayPal.',
    },
    {
      question: 'Скільки часу займає доставка?',
      answer:
        'Час доставки залежить від вашого місцезнаходження та обраного способу доставки. Зазвичай це займає від 3 до 7 робочих днів.',
    },
    {
      question: 'Чи можна повернути товар?',
      answer:
        'Так, ви можете повернути товар протягом 14 днів з моменту отримання, якщо він не був використаний і збережено оригінальну упаковку.',
    },
    {
      question: 'Як можна відстежити моє замовлення?',
      answer: 'Після відправлення замовлення ми надішлемо вам трекінговий номер для відстеження посилки на ваш email.',
    },
  ]

  return (
    <div className={classes.accordion}>
      {faqs.map((faq, index) => (
        <div className={classes.card} key={index}>
          <div className={classes['card-header']} id={`heading${index}`}>
            <h5 className={classes['mb-0']}>
              <button
                className={`${classes.btn} ${classes['btn-link']} ${activeIndex === index ? '' : classes.collapsed}`}
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`collapse${index}`}
              >
                {faq.question}
                <IoIosArrowDown className={classes.img} />
              </button>
            </h5>
          </div>

          <div
            id={`collapse${index}`}
            className={`${classes.collapse} ${activeIndex === index ? classes.show : ''}`}
            aria-labelledby={`heading${index}`}
          >
            <div className={classes['card-body']}>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
