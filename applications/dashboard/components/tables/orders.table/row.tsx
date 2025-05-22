import React, { useState } from 'react'

interface OrdersTableRowProps {
  id: string
  profileId: string
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  department: string
  paymentStatus: string
  totalPrice: number
  items: { product: { name: string }; quantity: number }[]
}

export const OrdersTableRow: React.FC<OrdersTableRowProps> = ({
  id,
  firstName,
  lastName,
  phone,
  email,
  items,
  totalPrice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxVisibleItems = 3
  const visibleItems = isExpanded ? items : items.slice(0, maxVisibleItems)
  const hiddenItemsCount = items.length - maxVisibleItems

  return (
    <tr>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-xs text-black dark:text-white">{id}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-xs text-black dark:text-white">{firstName ?? 'N/A'}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-xs text-black dark:text-white">{lastName ?? 'N/A'}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-xs text-black dark:text-white">{phone ?? 'N/A'}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-xs text-black dark:text-white">{email ?? 'N/A'}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        {visibleItems.map((item, index) => (
          <div key={index} className="text-[14px] text-black dark:text-white">
            {item.product?.name || 'Видалено'} × {item.quantity}
          </div>
        ))}

        {!isExpanded && hiddenItemsCount > 0 && (
          <button className="text-[14px] text-black underline hover:no-underline" onClick={() => setIsExpanded(true)}>
            ...(+{hiddenItemsCount})
          </button>
        )}

        {isExpanded && items.length > maxVisibleItems && (
          <button
            className="mt-1 block text-[14px] text-black underline hover:no-underline"
            onClick={() => setIsExpanded(false)}
          >
            Згорнути
          </button>
        )}
      </td>
      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
        <p className="text-[14px] text-black dark:text-white">
          {typeof totalPrice === 'number' ? `${totalPrice.toFixed(2)} ₴` : 'N/A'}
        </p>
      </td>
    </tr>
  )
}
