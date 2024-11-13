'use client'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'
import Image from 'next/image'

import card from '@boilerplate/dashboard/assets/icons/card.svg'
import { useState } from 'react'
import { useDeleteMutation } from '@/store/queries/products.query'

interface DashItemProps {
  id: string
  title: string
  price: number
  description: string
  tackle: string
  pathToImage: string
  onDelete: (id: string) => void
}

export const DashItem: React.FC<DashItemProps> = ({ id, title, price, description, tackle, pathToImage, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const [deleteProduct] = useDeleteMutation()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteProduct({ productId: id }).unwrap()

      onDelete(id)
    } catch (error) {
      console.log('Error deleting product:', error)
      alert('Помилка при видаленні')
    } finally {
      setIsDeleting(false)
    }
  }

  console.log({ pathToImage })
  return (
    <tr className={classes.row}>
      <td className={classes["table-cell"]}><Image className={classes.img} src={pathToImage ? `/.${pathToImage}` : card} width="268" height="180" alt='card' /></td>
      <td className={classes["table-cell"]}>{title}</td>
      <td className={classes["table-cell"]}>{tackle}</td>
      <td className={classes["table-cell"]}>{description}</td>
      <td className={classes["table-cell"]}>{price.toFixed(2)}₴</td>
      <td className={classes["table-cell"]}>
        <button className={classes["btn-update"]}>Редагувати</button>
        <button className={classes["btn-delete"]} onClick={handleDelete} disabled={isDeleting}>Видалити</button>
      </td>
    </tr>
  );
};
