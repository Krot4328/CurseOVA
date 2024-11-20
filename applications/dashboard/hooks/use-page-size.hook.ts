'use client'

import { useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

const DEFAULT_PAGE_SIZE = 15

export const ALLOWED_PAGE_SIZES = [10, 15, 20, 25, 50, 100]

export const getPageSize = (searchParams?: URLSearchParams): number => {
  searchParams = searchParams ?? new URL(window.location.href).searchParams

  const pageSize = parseInt(searchParams.get('page-size') ?? `${DEFAULT_PAGE_SIZE}`, 10)

  return ALLOWED_PAGE_SIZES.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE
}

export const usePageSize = (): [pageSize: number, setPageSize: (pageSize: number) => void] => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setPageSize = useCallback(
    (pageSize: number) => {
      const url = new URL(window.location.href)

      url.searchParams.delete('page-size')

      if (pageSize !== DEFAULT_PAGE_SIZE) {
        url.searchParams.set('page-size', `${pageSize}`)
      }

      router.push(`${url}`)
    },
    [searchParams],
  )

  return [getPageSize(searchParams), setPageSize]
}
