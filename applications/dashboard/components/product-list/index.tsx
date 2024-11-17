'use client'

import { useState } from 'react'

import { useGetProductsQuery } from '@boilerplate/dashboard/store/queries/products-dash.query'

import { DashItem } from '@boilerplate/dashboard/components/product-list/product-item'
import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface TacklePageProps {}

export const TacklePage: React.FC<TacklePageProps> = () => {
  const { data = [] } = useGetProductsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <div className={classes.cardContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes['table-header']}>Картинка</th>
            <th className={classes['table-header']}>Назва</th>
            <th className={classes['table-header']}>Тип</th>
            <th className={classes['table-header']}>Ціна</th>
            <th className={classes['table-header']}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(({ id, title, price, images, tags }) => (
            <DashItem
              key={id}
              id={id}
              title={title}
              price={price.value}
              imageSrc={images.length > 0 ? images[0].src : undefined}
              tag={tags.length > 0 ? tags[0] : undefined}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className={classes.paginationContainer}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={classes.paginationButtonText}
        >
          Попередня
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={
              currentPage === index + 1
                ? `${classes.paginationButtonNumber} ${classes.active}`
                : classes.paginationButtonNumber
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={classes.paginationButtonText}
        >
          Наступна
        </button>
      </div>
    </div>
  )
}
