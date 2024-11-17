import { FishingGear } from '@boilerplate/front-end/components/tackle/left/fishing-gear'
import classes from '@boilerplate/front-end/components/tackle/left/style.module.scss'

interface LeftTackleProps { }

export const LeftTackle: React.FC<LeftTackleProps> = () => (
  <div className={classes['left-main-container']}>


    <div className={classes.gearContainer}>
      <FishingGear />
    </div>
  </div>
)
