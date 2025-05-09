"use client";

import { DeleteCategoryDialog } from "./deletecategorydialog";
import { EditCategoryDialog } from "./editcategorydialog";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export default function CategoryTable({
  data,
  onRefresh,
}: {
  data: Category[];
  onRefresh: () => void;
}) {
  return (
<div className="w-full">
  {/* Versi TABEL: Desktop */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full text-sm text-center text-slate-900">
      <thead className="bg-gray-100 border-b-[1px] border-slate-200">
        <tr>
          <th className="px-6 py-[12px]">Category</th>
          <th className="px-6 py-[12px]">Created at</th>
          <th className="px-6 py-[12px]">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((category) => (
          <tr key={category.id} className="border-b border-slate-200 bg-gray-50">
            <td className="px-[16px] py-[12px] text-slate-600 truncate">{category.name}</td>
            <td className="px-[16px] py-[12px] text-slate-600">
              {new Date(category.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </td>
            <td className="px-[16px] py-[12px] flex justify-center gap-[12px]">
              <EditCategoryDialog
                id={category.id}
                initialValue={category.name}
                onSuccess={onRefresh}
              />
              <DeleteCategoryDialog
                id={category.id}
                name={category.name}
                onSuccess={onRefresh}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Versi LIST: Mobile */}
  <div className="block md:hidden space-y-4">
    {data.map((category) => (
      <div
        key={category.id}
        className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-1 mb-2">
          <p className="font-semibold text-slate-800">{category.name}</p>
          <p className="text-xs text-slate-500">
            {new Date(category.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <EditCategoryDialog
            id={category.id}
            initialValue={category.name}
            onSuccess={onRefresh}
          />
          <DeleteCategoryDialog
            id={category.id}
            name={category.name}
            onSuccess={onRefresh}
          />
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
