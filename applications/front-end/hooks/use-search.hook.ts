import { useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

export const useSearch = (): [search: string | null, setSearch: (search: string | null) => void] => {
  const searchParams = useSearchParams()

  const router = useRouter()

  const handleSearchChange = useCallback((search: string | null) => {
    const url = new URL(window.location.href)

    if (typeof search === 'string') {
      url.searchParams.set('search', search)
    } else {
      url.searchParams.delete('search')
    }

    router.push(url.toString())
  }, [])

  return [searchParams.get('search'), handleSearchChange]
}
