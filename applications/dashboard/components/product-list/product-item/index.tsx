'use client'

import { useCallback } from 'react'

import Image from 'next/image'

import { type Tag } from '@boilerplate/types/reference/interfaces/tags'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface DashItemProps {
  id: string
  title: string
  price: number
  tag?: Tag
  imageSrc?: string
}

export const DashItem: React.FC<DashItemProps> = ({ id, title, price, tag, imageSrc }) => {
  const dispatch = useAppDispatch()

  const handleDelete = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const { deleteProductStart } = await import('@boilerplate/dashboard/store/sagas/delete-product.saga')

    dispatch(deleteProductStart({ productId: id }))
  }, [id])

  return (
    <tr className={classes.row}>
      <td className={classes['table-cell']}>
        {imageSrc ? <Image className={classes.img} src={imageSrc} width="268" height="180" alt="card" /> : 'N/A'}
      </td>
      <td className={classes['table-cell']}>{title}</td>
      <td className={classes['table-cell']}>{tag ? tag.title : 'N/A'}</td>
      <td className={classes['table-cell']}>{price.toFixed(2)}₴</td>
      <td className={classes['table-cell']}>
        <button className={classes['btn-update']}>Редагувати</button>
        <button className={classes['btn-delete']} onClick={handleDelete}>
          Видалити
        </button>
      </td>
    </tr>
  )
}
