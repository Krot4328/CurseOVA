/* eslint-disable import/no-default-export */

'use client'

import { useParams } from 'next/navigation'

import { TackleDescription } from '@boilerplate/front-end/components/tackle-description'

// eslint-disable-next-line prettier/prettier
export interface TackleDescriptionPageProps { }

const TackleDescriptionPage: React.FC<TackleDescriptionPageProps> = () => {
  const { tackleId } = useParams<{ tackleId: string }>()
  const validTackleId = String(tackleId)

  return <TackleDescription tackleId={validTackleId}></TackleDescription>
}

export default TackleDescriptionPage
