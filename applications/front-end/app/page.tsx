/* eslint-disable import/no-default-export */

import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'

import { Tackle } from '@boilerplate/front-end/components/tackle'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => <Tackle />

export default HomePage
