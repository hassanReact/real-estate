const TableRowSkeleton = () => (
    <tr className="border-b animate-pulse">
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/4"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/6"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/6"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-800 rounded w-1/4"></div>
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="h-4 w-4 bg-gray-900 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-900 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-900 rounded-full"></div>
        </div>
      </td>
    </tr>
  )
  
  export default function PropertyTableSkeleton() {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">PRICE</th>
                <th className="px-4 py-2 text-left">TYPE</th>
                <th className="px-4 py-2 text-left">STATUS</th>
                <th className="px-4 py-2 text-left">BEDROOMS</th>
                <th className="px-4 py-2 text-left">BATHROOM</th>
                <th className="px-4 py-2 text-left">AREA</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  