import classes from '@boilerplate/front-end/components/header/search/style.module.scss'

import { FaSearch } from "react-icons/fa";

interface SearchProps { }

export const Search: React.FC<SearchProps> = () => (
  <div className={classes.container}>
    <input className={classes.search} type="text" placeholder="Search" />
    <button className={classes.but}><FaSearch className={classes.icon} /></button>
  </div>

)
