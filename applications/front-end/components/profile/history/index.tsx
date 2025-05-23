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
  city: string
}

const History: React.FC<HistoryProps> = ({ cartId, updatedAt, items, city }) => {
  if (!city?.trim()) {
    return null
  }

  const orderDate = new Date(updatedAt)
  const now = new Date()
  const thirtyDaysAgo = new Date()

  thirtyDaysAgo.setDate(now.getDate() - 30)

  if (orderDate < thirtyDaysAgo) {
    return null
  }

  const cityAddresses: Record<string, string> = {
    Вінниця: 'вул. Коцюбинського 1',
    Дніпро: 'вул. Грушевського 24',
    Житомир: 'вул. Перемоги 7',
    Запоріжжя: 'вул. Водограйна 12б',
    'Івано-Франківськ': 'вул. Незалежності 19',
    Київ: 'вул. Хрещатик 10',
    Кропивницький: 'вул. Богдана Хмельницького 3',
    Луцьк: 'вул. Винниченка 16',
    Львів: 'вул. Шевченка 21',
    Миколаїв: 'вул. Адмірала Макарова 4',
    Одеса: 'вул. Дерибасівська 9',
    Полтава: 'вул. Європейська 5',
    Рівне: 'вул. Соборна 40',
    Суми: 'вул. Харківська 22',
    Тернопіль: 'просп. Злуки 15',
    Ужгород: 'вул. Корзо 2',
    Харків: 'вул. Пушкінська 30',
    Херсон: 'вул. Ушакова 14',
    Хмельницький: 'вул. Подільська 8',
    Черкаси: 'бул. Смілянська 11',
    Чернівці: 'вул. Головна 1',
    Чернігів: 'просп. Миру 27',
  }

  const calculateTotalPrice = (cartItems: typeof items): number =>
    cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  const totalPrice = calculateTotalPrice(items)

  const getPickupMessage = (isoDate: string): string => {
    const date = new Date(isoDate)

    date.setDate(date.getDate() + 1)
    const formattedDate = date.toLocaleDateString('uk-UA')
    const displayAddress = cityAddresses[city?.trim() || ''] || city?.trim() || 'Невідоме місто'

    return `Ви можете забрати свій товар з ${formattedDate} протягом 7 днів на адресі ${displayAddress} з 9:00 до 21:00. Оплата при отриманні`
  }

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

      <div>
        <p className={classes.pickupInfo}>{getPickupMessage(updatedAt)}</p>
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
