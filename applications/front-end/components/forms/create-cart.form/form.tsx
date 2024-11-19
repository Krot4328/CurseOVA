/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { updateCartUserDataStart } from '@boilerplate/front-end/store/sagas/create-cart.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

// eslint-disable-next-line prettier/prettier
interface BaseSendCartFormProps extends Omit<HTMLFormProps, 'onSubmit'> { }

const BaseSendCartDataForm: React.FC<BaseSendCartFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()
    dispatch(
      updateCartUserDataStart({
        redirect: () => router.push('/'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default BaseSendCartDataForm
