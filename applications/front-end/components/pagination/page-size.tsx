'use client'

import { useCallback } from 'react'

import { ALLOWED_PAGE_SIZES, usePageSize } from '@boilerplate/front-end/hooks/use-page-size.hook'

interface PaginationPageSizeProps {}

export const PaginationPageSize: React.FC<PaginationPageSizeProps> = () => {
  const [pageSize, setPageSize] = usePageSize()
  const handlePageSizeChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    setPageSize(parseInt(event.target.value))
  }, [])

  return (
    <div className="flex items-center justify-end gap-2">
      <label htmlFor="page-size">Page size</label>
      <div className="w-fit">
        <div className="relative">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="ease w-full cursor-pointer appearance-none rounded border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
            id="page-size"
          >
            {ALLOWED_PAGE_SIZES.map((pS) => (
              <option key={`Page size ${pS}`}>{pS}</option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="pointer-events-none absolute right-2.5 top-2.5 ml-1 h-5 w-5 text-slate-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
    </div>
  )
}
