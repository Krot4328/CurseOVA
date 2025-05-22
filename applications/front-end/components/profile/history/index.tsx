import classes from '@boilerplate/front-end/components/profile/style.module.scss'

interface HistoryProps {
  cartId: string
  items: {
    product: {
      id: string
      title: string
      price: number
    }
    quantity: number
  }[]
  updatedAt: string
}

const History: React.FC<HistoryProps> = ({ cartId, updatedAt, items }) => {
  const calculateTotalPrice = (cartItems: typeof items): number =>
    cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  const totalPrice = calculateTotalPrice(items)

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)

    return `${date.toLocaleDateString('uk-UA')} ${date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  }

  return (
    <div className={classes.cartCard}>
      <div className={classes.cartHeader}>
        <div className={classes.head}>
          <h3 className={classes.cartTitle}>
            Код замовлення: <span className={classes.cartId}>{cartId}</span>
          </h3>
          <p className={classes.cartDate}>{formatDate(updatedAt)}</p>
        </div>
      </div>

      <div className={classes.cartItems}>
        {items.map((item, index) => (
          <div key={index} className={classes.cartItem}>
            <div className={classes.cartItemInfo}>
              <h4 className={classes.itemTitle}>{item.product.title}</h4>
              <p className={classes.itemDetail}>Ціна: {item.product.price}₴</p>
              <p className={classes.itemDetail}>Кількість: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.cartTotal}>
        Загальна сума: <span className={classes.price}>{totalPrice}₴</span>
      </div>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default History
