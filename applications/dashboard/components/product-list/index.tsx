'use client';

import { useState } from 'react';
import classes from '@boilerplate/dashboard/components/product-list/style.module.scss';
import { DashItem } from '@boilerplate/dashboard/components/product-list/product-item';
import { useGetProductsQuery } from '@boilerplate/dashboard/store/queries/products-dash.query';

interface TacklePageProps {
  products?: { id: string; title: string; price: number; description: string; pathToImage: string; tackle: string }[];
}

export const TacklePage: React.FC<TacklePageProps> = ({ products }) => {
  const { data = [] } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={classes.cardContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes["table-header"]}>Картинка</th>
            <th className={classes["table-header"]}>Назва</th>
            <th className={classes["table-header"]}>Тип</th>
            <th className={classes["table-header"]}>Опис</th>
            <th className={classes["table-header"]}>Ціна</th>
            <th className={classes["table-header"]}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(({ id, title, price, description, pathToImage, tackle }) => (
            <DashItem
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              pathToImage={pathToImage}
              tackle={tackle}
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
  );
};
