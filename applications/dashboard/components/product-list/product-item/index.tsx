'use client'

import { useCallback } from 'react'

import Image from 'next/image'

import card from '@boilerplate/dashboard/assets/icons/card.svg'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface DashItemProps {
  id: string
  title: string
  price: number
  description: string
  tackle: string
  pathToImage: string
  onDelete: (id: string) => void
}

export const DashItem: React.FC<DashItemProps> = ({ id, title, price, description, tackle, pathToImage }) => {
  const dispatch = useAppDispatch()

  const handleDelete = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const { deleteProductStart } = await import('@boilerplate/dashboard/store/sagas/delete-product.saga')

    dispatch(deleteProductStart({ productId: id }))
  }, [id])

  return (
    <tr className={classes.row}>
      <td className={classes['table-cell']}>
        <Image
          className={classes.img}
          src={pathToImage ? `/.${pathToImage}` : card}
          width="268"
          height="180"
          alt="card"
        />
      </td>
      <td className={classes['table-cell']}>{title}</td>
      <td className={classes['table-cell']}>{tackle}</td>
      <td className={classes['table-cell']}>{description}</td>
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
