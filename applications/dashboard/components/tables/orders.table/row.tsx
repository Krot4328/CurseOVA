interface OrdersTableRowProps {
  id: string
  profileId: string
}

export const OrdersTableRow: React.FC<OrdersTableRowProps> = ({ id, profileId }) => (
  <tr>
    <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
      <p className="text-xs  text-black dark:text-white">{id}</p>
    </td>
    <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
      <p className="text-xs  text-black dark:text-white">{profileId ?? 'N/A'}</p>
    </td>
  </tr>
)
