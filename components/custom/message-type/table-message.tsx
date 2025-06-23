import React, { useMemo } from "react";

export default function TableMessage({
  data,
}: {
  data: { Tahun: string; Bulan: string; Total_Penjualan: string }[];
}) {
  const columns = useMemo(() => Object.keys(data[0]), [data]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700 text-sm text-left">
        <thead className="bg-zinc-100 dark:bg-zinc-800 text-xs uppercase text-zinc-600 dark:text-zinc-300">
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} className="px-4 py-3">
                {column.replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-700">
              <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">
                {item.Bulan}
              </td>
              <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">
                {item.Tahun}
              </td>
              <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">
                {item.Total_Penjualan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
