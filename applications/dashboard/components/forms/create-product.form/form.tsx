/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import { createProductStart } from '@boilerplate/dashboard/store/sagas/create-product.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface BaseCreateProductFormProps extends Omit<HTMLFormProps, 'onSubmit'> { }

const BaseCreateProductForm: React.FC<BaseCreateProductFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    dispatch(
      createProductStart({
        redirect: () => router.push('/products'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default BaseCreateProductForm
