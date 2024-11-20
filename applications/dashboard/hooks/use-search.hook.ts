'use client'

import { useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

export const getSearch = (searchParams?: URLSearchParams): string => {
  searchParams = searchParams ?? new URL(window.location.href).searchParams

  return searchParams.get('search') ?? ''
}

export const useSearch = (): [search: string, setSearch: (search: string) => void] => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setSearch = useCallback(
    (search: string) => {
      const url = new URL(window.location.href)

      url.searchParams.delete('search')

      if (typeof search === 'string' && search.length) {
        url.searchParams.set('search', search)
        url.searchParams.set('page', '1')
      }

      router.push(`${url}`)
    },
    [searchParams],
  )

  return [getSearch(searchParams), setSearch]
}
