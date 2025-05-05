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
    <div className="bg-white overflow-x-auto">
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
              <td className="px-[16px] py-[12px] text-slate-600">{category.name}</td>
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
                  onSuccess={onRefresh} // ✅ refresh table
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
  );
}
