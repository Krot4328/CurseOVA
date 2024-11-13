'use client'

import React from 'react';

import { Accordion } from '@boilerplate/front-end/components/help/accordion'

interface HelpProps { }

export const Help: React.FC<HelpProps> = () => {
  return (
    <>
      <Accordion />
    </>
  );
};
