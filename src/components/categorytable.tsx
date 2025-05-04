"use client";

import { useState } from "react";
import { DeleteCategoryDialog } from "./deletecategorydialog";
import { EditCategoryDialog } from "./editcategorydialog";

export default function CategoryTable() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
  ]);

  const handleEdit = (id: number, newName: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, name: newName } : cat
      )
    );
  };

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
          {categories.map((category) => (
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
                  initialValue={category.name}
                  onAdd={(newName) => handleEdit(category.id, newName)}
                />
                <DeleteCategoryDialog onDelete={() => console.log("Delete confirmed")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
