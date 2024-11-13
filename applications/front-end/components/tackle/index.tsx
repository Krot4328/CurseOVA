import classes from '@boilerplate/front-end/components/tackle/style.module.scss';

import { LeftTackle } from '@boilerplate/front-end/components/tackle/left';
import { RightTackle } from '@boilerplate/front-end/components/tackle/right';

interface TackleProps { }

export const Tackle: React.FC<TackleProps> = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftSection}>
        <LeftTackle />
      </div>
      <div className={classes.rightSection}>
        <RightTackle />
      </div>
    </div>
  );
};
