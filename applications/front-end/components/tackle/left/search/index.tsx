import classes from '@boilerplate/front-end/components/tackle/left/search/style.module.scss'

interface SearchProps { }

export const Search: React.FC<SearchProps> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <div className={classes.row}>
          <div className={classes["col-md-6"]}>
            <div>
              <div className={classes["search-1"]}>
                <i className={classes['bx bxs-map']} />
                <input type="text" placeholder="Search" />
                <button>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
