'use client'

import { useParams, useSearchParams } from 'next/navigation'

import { useSearch } from '@boilerplate/front-end/hooks/use-search.hook'

import { useGetProductsListQuery } from '@boilerplate/front-end/store/queries/product.query'

import { Card } from '@boilerplate/front-end/components/tackle/right/card'
import { Corusel } from '@boilerplate/front-end/components/tackle/right/corusel'
import classes from '@boilerplate/front-end/components/tackle/right/style.module.scss'

interface RightTackleProps {
  search: string
  page: string
  pageSize: string
  tagsIds: string[]
}

export const RightTackle: React.FC<RightTackleProps> = () => {
  const [search] = useSearch()
  const { tagsIds } = useParams<Partial<Record<'tagsIds', string>>>()
  const searchParams = useSearchParams()

  const pageSize = searchParams.get('pageSize') || '20'
  const page = searchParams.get('page') || '1'

  const { data = [] } = useGetProductsListQuery({
    search: search ?? '',
    page,
    pageSize,
    tagsIds: tagsIds ? [tagsIds] : [],
  })

  return (
    <>
      <div className={classes.coruselWrapper}>
        <Corusel />
      </div>
      <div className={classes.cardContainer}>
        {data.map(({ id, title, price, images }) => (
          <Card key={id} id={id} title={title} price={price.value} imageSrc={images.length > 0 ? images[0].src : ''} />
        ))}
      </div>
    </>
  )
}
