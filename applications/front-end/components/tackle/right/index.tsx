'use client'

import { useParams } from 'next/navigation'

import { useGetProductsListQuery } from '@boilerplate/front-end/store/queries/product.query'

import { usePageSize } from '@boilerplate/front-end/hooks/use-page-size.hook'
import { usePage } from '@boilerplate/front-end/hooks/use-page.hook'
import { useSearch } from '@boilerplate/front-end/hooks/use-search.hook'

import { Pagination } from '@boilerplate/front-end/components/pagination'
import { PaginationPageSize } from '@boilerplate/front-end/components/pagination/page-size'
import { Card } from '@boilerplate/front-end/components/tackle/right/card'
import { Corusel } from '@boilerplate/front-end/components/tackle/right/corusel'
import classes from '@boilerplate/front-end/components/tackle/right/style.module.scss'

interface RightTackleProps {}

export const RightTackle: React.FC<RightTackleProps> = () => {
  const [pageSize] = usePageSize()
  const [page] = usePage()
  const [search] = useSearch()
  const { tagId } = useParams<Partial<Record<'tagId', string>>>()

  const { data } = useGetProductsListQuery({
    tagsIds: tagId ? [tagId] : [],
    page: `${page}`,
    pageSize: `${pageSize}`,
    search: `${search}`,
  })
  const { result = [], total = 0 } = data || {}

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="my-10 px-8">
      {!tagId ? (
        <div className={classes.coruselWrapper}>
          <Corusel />
        </div>
      ) : null}
      <div className="flex w-full items-center justify-end px-2 pb-2 pr-0">
        <PaginationPageSize />
      </div>
      <div className={classes.cardContainer}>
        {result.map(({ id, title, price, images }) => (
          <Card key={id} id={id} title={title} price={price.value} imageSrc={images.length > 0 ? images[0].src : ''} />
        ))}
      </div>
      {totalPages > 1 ? (
        <div>
          <Pagination total={totalPages} />
        </div>
      ) : null}
    </div>
  )
}
