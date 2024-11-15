'use client'

import { useGetProductsQuery } from '@boilerplate/front-end/store/queries/product.query'

import { Card } from '@boilerplate/front-end/components/tackle/right/card'
import { Corusel } from '@boilerplate/front-end/components/tackle/right/corusel'
import classes from '@boilerplate/front-end/components/tackle/right/style.module.scss'

interface RightTackleProps {
  products?: { id: string; title: string; price: number; description: string; pathToImage: string }[]
}

export const RightTackle: React.FC<RightTackleProps> = ({ products }) => {
  const { data = [] } = useGetProductsQuery()

  return (
    <>
      <div className={classes.coruselWrapper}>
        <Corusel />
      </div>
      <div className={classes.cardContainer}>
        {data.map(({ id, title, price, description, pathToImage }) => (
          <Card key={id} id={id} title={title} price={price} description={description} pathToImage={pathToImage} />
        ))}
      </div>
    </>
  )
}
