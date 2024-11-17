'use client'

import React from 'react'

import { Accordion } from '@boilerplate/front-end/components/help/accordion'

import classes from '@boilerplate/front-end/components/help/style.module.scss'

interface HelpProps { }

export const Help: React.FC<HelpProps> = () => (
  <>
    <div className={classes.title}>Допомога</div>
    <Accordion />
  </>
)
