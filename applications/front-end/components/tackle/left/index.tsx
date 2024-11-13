import classes from '@boilerplate/front-end/components/tackle/left/style.module.scss';

import { Search } from '@boilerplate/front-end/components/tackle/left/search';
import { FishingGear } from '@boilerplate/front-end/components/tackle/left/fishing-gear';

interface LeftTackleProps { }

export const LeftTackle: React.FC<LeftTackleProps> = () => {
  return (
    <div className={classes["left-main-container"]}>
      <div className={classes.searchContainer}>
        <Search />
      </div>

      <div className={classes.gearContainer}>
        <FishingGear />
      </div>
    </div>
  );
};
