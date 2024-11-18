'use client'

import { useState } from 'react'

import classes from '@boilerplate/front-end/components/tackle/left/fishing-gear/style.module.scss'

interface FishingGearProps { }

export const FishingGear: React.FC<FishingGearProps> = () => {
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({})

  const toggleCategory = (category: string) => {
    setActiveCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.gear}>
        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('rod')}>Вудки</h3>
              {activeCategories.rod && (
                <ul>
                  <li>Спінінги</li>
                  <li>Фідери</li>
                  <li>Махові вудки</li>
                  <li>Телескопічні вудки</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('reel')}>Котушки</h3>
              {activeCategories.reel && (
                <ul>
                  <li>Передньо-фрикційні котушки</li>
                  <li>Задньо-фрикційні котушки</li>
                  <li>Байткастингові котушки</li>
                  <li>Безінерційні котушки</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('line')}>Ліски</h3>
              {activeCategories.line && (
                <ul>
                  <li>Монофільна лісочка</li>
                  <li>Плетена лісочка</li>
                  <li>Шнури для риболовлі</li>
                  <li>Джерсі лісочка</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('hook')}>Гачки</h3>
              {activeCategories.hook && (
                <ul>
                  <li>Риболовні гачки</li>
                  <li>Гачки для морської риболовлі</li>
                  <li>Мікрогачки</li>
                  <li>Гачки з подвійним жалом</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('weights')}>Грузила</h3>
              {activeCategories.weights && (
                <ul>
                  <li>Плоскі грузила</li>
                  <li>Кулясті грузила</li>
                  <li>Грузила для фідера</li>
                  <li>Рівноважні грузила</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('floats')}>Поплавці</h3>
              {activeCategories.floats && (
                <ul>
                  <li>Махові поплавці</li>
                  <li>Підводні поплавці</li>
                  <li>Поплавці для фідера</li>
                  <li>Поплавці для риболовлі на коропа</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('lures')}>Приманки</h3>
              {activeCategories.lures && (
                <ul>
                  <li>Твістери</li>
                  <li>Воблери</li>
                  <li>Мормишки</li>
                  <li>Наживки</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('bait')}>Наживка</h3>
              {activeCategories.bait && (
                <ul>
                  <li>Черви</li>
                  <li>Рибки на наживку</li>
                  <li>М'ясо та інші наживки</li>
                  <li>Бойли</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('swivels')}>Вертілюги</h3>
              {activeCategories.swivels && (
                <ul>
                  <li>Вертлюги для риболовлі</li>
                  <li>Вертілюги з подвійними кільцями</li>
                  <li>Турбінні вертілюги</li>
                  <li>Класичні вертілюги</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('leaders')}>Повідці</h3>
              {activeCategories.leaders && (
                <ul>
                  <li>Необроблені повідці</li>
                  <li>Куплені повідці</li>
                  <li>Повідці для тролінгу</li>
                  <li>Повідці для дрібної риби</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('nets')}>Сітки</h3>
              {activeCategories.nets && (
                <ul>
                  <li>Рибальські сітки</li>
                  <li>Сітки для ловлі раків</li>
                  <li>Мережі для лову риби</li>
                  <li>Мікросітки</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes['col-md-4']}>
          <div>
            <div className={classes['gear-category']}>
              <h3 onClick={() => toggleCategory('traps')}>Ловушки</h3>
              {activeCategories.traps && (
                <ul>
                  <li>Ловушки для раків</li>
                  <li>Капкани для риби</li>
                  <li>Ловушки для дрібної риби</li>
                  <li>Ловушки для птахів</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
