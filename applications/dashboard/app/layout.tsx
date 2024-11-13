/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'

import clsx from 'clsx'
import logger from 'loglevel'

import { createAxiosBaseQuery } from '@boilerplate/core/builders/axios-base-query.builder'
import { type HttpClientResponse, Method } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import { GetProfileMyUrl } from '@boilerplate/types/auth/dto/requests/profile'
import { type MyProfile } from '@boilerplate/types/auth/interfaces/profile'

import { ReduxProvider } from '@boilerplate/dashboard/store/provider'

import { Progress } from '@boilerplate/dashboard/components/progress'
import { Snackbar } from '@boilerplate/dashboard/components/snackbar'

import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'
import '@boilerplate/dashboard/assets/css/satoshi.css'
import '@boilerplate/dashboard/assets/css/style.css'

export interface RootLayoutProps {
  readonly children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const ConfirmDeletion = dynamic(() => import('@boilerplate/dashboard/components/confirms/delete'))
const ConfirmChanges = dynamic(() => import('@boilerplate/dashboard/components/confirms/changes'))

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const cookieStore = cookies()

  const { value: token } = cookieStore.get('jwt') || {}

  let profile: MyProfile | null = null

  if (token) {
    try {
      const request = createAxiosBaseQuery()

      const response = (await request({
        method: Method.Get,
        url: GetProfileMyUrl,
        params: {
          role: Role.User,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as HttpClientResponse<MyProfile>

      if (response.error) {
        throw new Error(response.error)
      }

      profile = response.data
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <html lang="en" style={{ backgroundColor: '#1a222c' }}>
      <body className="light">
        <div className={clsx('h-screen', 'dark:bg-boxdark-2', 'dark:text-bodydark')}>
          <ReduxProvider profile={profile}>
            <Progress />
            {children}
            <Snackbar />
            <ConfirmDeletion />
            <ConfirmChanges />
          </ReduxProvider>
        </div>
      </body>
    </html>
  )
}

logger.setLevel('debug')

export default RootLayout