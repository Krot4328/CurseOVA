import { useCallback } from 'react'

import { useSearch } from '@boilerplate/front-end/hooks/use-search.hook'
import { FaSearch } from 'react-icons/fa'

import classes from '@boilerplate/front-end/components/header/search/style.module.scss'

// eslint-disable-next-line prettier/prettier
interface SearchProps { }

export const Search: React.FC<SearchProps> = () => {
  const [title, setSearch] = useSearch()

  const handleSearchChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setSearch(e.currentTarget.value)
  }, [])

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        type="text"
        placeholder="Search"
        value={title ?? ''}
        onChange={handleSearchChange}
      />
      <button className={classes.but}>
        <FaSearch className={classes.icon} />
      </button>
    </div>
  )
}
