'use client'

import { useCallback } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

import { usePage } from '@boilerplate/front-end/hooks/use-page.hook'

import { default as classes } from '@boilerplate/front-end/components/pagination/styles.module.scss'

interface PaginationProps {
  total: number
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [page, setPage] = usePage()

  const handlePageChange = useCallback(({ selected: selectedPage }: { selected: number }) => {
    setPage(selectedPage)
  }, [])

  return (
    <div className="flex h-10 w-full items-center justify-center">
      <ReactPaginate
        forcePage={page}
        onPageChange={handlePageChange}
        pageRangeDisplayed={2}
        pageCount={total}
        breakClassName={classes.break}
        breakLinkClassName={classes['break-link']}
        containerClassName={classes.container}
        pageClassName={classes.page}
        pageLinkClassName={classes['page-link']}
        activeClassName={classes.active}
        activeLinkClassName={classes['active-link']}
        previousClassName={classes.previous}
        previousLinkClassName={classes['previous-link']}
        nextClassName={classes.next}
        nextLinkClassName={classes['next-link']}
        disabledClassName={classes.disabled}
        disabledLinkClassName={classes['disabled-link']}
        breakLabel="..."
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
