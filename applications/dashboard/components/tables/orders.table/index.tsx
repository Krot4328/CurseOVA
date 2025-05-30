'use client'

import { default as clsx } from 'clsx'

import { useGetCartsListQuery } from '@boilerplate/dashboard/store/queries/carts.query'

import { usePage } from '@boilerplate/dashboard/hooks/use-page.hook'

import { Pagination } from '@boilerplate/dashboard/components/pagination'
import { OrdersTableRow } from '@boilerplate/dashboard/components/tables/orders.table/row'

interface OrdersTableProps { }

export const OrdersTable: React.FC<OrdersTableProps> = () => {
  const [page] = usePage()
  const pageSize = 10

  const { data, isSuccess, isLoading } = useGetCartsListQuery({
    page: `${page}`,
    pageSize: `${pageSize}`,
  })

  const { result = [], total = 0 } = data || {}

  const updatedResult = result.map((order) => {
    const items =
      order.items?.map((item) => {
        if (!item || !item.product) {
          return {
            product: { name: 'Видалений товар' },
            quantity: 0,
            price: 0,
          }
        }

        return {
          product: {
            name: item.product.title ?? 'Без назви',
          },
          quantity: item.quantity ?? 1,
          price: item.product.price?.value ?? 0,
        }
      }) || []

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
      ...order,
      items,
      totalPrice,
    }
  })

  const totalPages = Math.ceil(total / pageSize)

  return (
    <>
      {/* <div className="flex w-full items-center justify-end px-2 pb-2 pr-0">
        <PaginationPageSize />
      </div> */}
      <div
        className={clsx(
          'rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
          {
            'flex items-center justify-center': isLoading,
          },
        )}
      >
        {!isLoading ? (
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>id</span>
                      <span>замовлення</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Ім'я</span>
                      <span>користувача</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Прізвище</span>
                      <span>користувача</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Номер телефону</span>
                      <span>користувача</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Електронна пошта</span>
                      <span>користувача</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Список</span>
                      <span>замовлення</span>
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white">
                    <span className="flex flex-col">
                      <span>Загальна</span>
                      <span>ціна</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isSuccess &&
                  updatedResult
                    .filter((order) => Array.isArray(order.items) && order.items.length > 0)
                    .map(
                      ({
                        id,
                        profileId,
                        firstName,
                        lastName,
                        phone,
                        email,
                        city,
                        department,
                        paymentStatus,
                        items,
                        totalPrice,
                      }) => (
                        <OrdersTableRow
                          key={id}
                          id={id}
                          profileId={profileId}
                          firstName={firstName}
                          lastName={lastName}
                          phone={phone}
                          email={email}
                          city={city}
                          department={department}
                          paymentStatus={paymentStatus}
                          items={items}
                          totalPrice={totalPrice}
                        />
                      ),
                    )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="m-auto">
            <svg
              aria-hidden="true"
              className="text-gray-200 dark:text-gray-600 h-8 w-8 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {totalPages > 1 ? (
        <div className="px-2 pt-4">
          <Pagination total={totalPages} />
        </div>
      ) : null}
    </>
  )
}
