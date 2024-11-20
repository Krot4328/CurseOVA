'use client'

import { useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

export const getPage = (searchParams?: URLSearchParams): number => {
  searchParams = searchParams ?? new URL(window.location.href).searchParams

  const rawPage = searchParams.get('page') ?? '1'
  const page = parseInt(rawPage, 10)

  return page - 1
}

export const usePage = (): [page: number, setPage: (page: number) => void] => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setPage = useCallback(
    (page: number) => {
      const url = new URL(window.location.href)

      url.searchParams.delete('page')

      if (page) {
        url.searchParams.set('page', `${page + 1}`)
      }

      router.push(`${url}`)
    },
    [searchParams],
  )

  return [getPage(searchParams), setPage]
}
