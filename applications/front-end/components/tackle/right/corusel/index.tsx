'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import s1 from '@boilerplate/front-end/assets/images/Слайд_1.webp'
import s2 from '@boilerplate/front-end/assets/images/Слайд_2.webp'

import classes from '@boilerplate/front-end/components/tackle/right/corusel/style.module.scss'

interface CoruselProps { }

export const Corusel: React.FC<CoruselProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [s1, s2]
  const slideInterval = 10000

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, slideInterval)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classes.carousel}>
      <button className={classes.prevButton} onClick={prevSlide}>
        ❮
      </button>
      <div className={classes.carouselInner} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className={`${classes.carouselItem} ${index === currentSlide ? classes.active : ''}`}>
            <Image src={slide} className={classes.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className={classes.nextButton} onClick={nextSlide}>
        ❯
      </button>
      <div className={classes.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${classes.indicator} ${index === currentSlide ? classes.active : ''}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
