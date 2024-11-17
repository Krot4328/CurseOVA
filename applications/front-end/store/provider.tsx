'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { Provider } from 'react-redux'

import { type MyProfile } from '@boilerplate/types/auth/interfaces/profile'

import { type AppStore, createStore } from '@boilerplate/front-end/store'

import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

interface ReduxProviderProps {
  children: React.ReactNode
  profile: MyProfile | null
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children, profile }) => {
  const router = useRouter()

  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = createStore({ router })
    storeRef.current.dispatch(profileSlice.actions.init(profile))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
