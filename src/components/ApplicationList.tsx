import React, { useState} from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { Application } from '../types/insurance';
import { useStore } from '../store/useStore';
import { Settings2, ArrowUpDown} from 'lucide-react';

interface Props {
  applications: Application[];
}

export const ApplicationList: React.FC<Props> = ({ applications }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { columns, toggleColumn } = useStore();
  const columnHelper = createColumnHelper<Application>();

  // Create default columns if none are available
  const defaultColumns = [
    'id',
    'fullName',
    'age',
    'insuranceType',
    'city',
    'status',
  ].map((id) => ({
    id,
    label: id
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase()),
    visible: true,
  }));

  const activeColumns = columns.length > 0 ? columns : defaultColumns;

  const tableColumns = React.useMemo(
    () =>
      activeColumns
        .filter((col) => col.visible)
        .map((col) =>
          columnHelper.accessor(col.id as keyof Application, {
            header: () => (
              <div className="flex items-center space-x-2">
                <span>{col.label}</span>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            ),
            cell: (info) => info.getValue(),
          })
        ),
    [activeColumns, columnHelper]
  );

  const table = useReactTable({
    data: applications,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Applications</h2>
          <p className="text-gray-600">
            There are no insurance applications submitted yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Settings2 className="w-5 h-5" />
            <span>Customize Columns</span>
          </button>

          {isCustomizing && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Toggle Columns
                </h3>
                <div className="space-y-2">
                  {activeColumns.map((column) => (
                    <label
                      key={column.id}
                      htmlFor={column.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <span className="text-sm text-gray-700">{column.label}</span>
                      <input id={column.id} type="checkbox" checked={column.visible} onChange={() => toggleColumn(column.id)} />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};