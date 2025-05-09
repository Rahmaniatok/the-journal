'use client';

import Link from "next/link";
import { DeleteArticleDialog } from "./deletearticledialog";
import { Article } from "@/types";

type ArticleTableItem = Pick<Article, "id" | "title" | "imageUrl" | "createdAt"> & {
  category: { name: string };
};

type Props = {
  data: ArticleTableItem[];
};

export default function ArticleTable({ data }: Props) {
  return (
    <div className="w-full">
      {/* Versi TABEL: Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-center text-slate-900">
          <thead className="bg-gray-100 border-b-[1px] border-slate-200">
            <tr>
              <th className="px-6 py-[12px]">Thumbnails</th>
              <th className="px-6 py-[12px]">Title</th>
              <th className="px-6 py-[12px]">Category</th>
              <th className="px-6 py-[12px]">Created at</th>
              <th className="px-6 py-[12px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((article) => (
              <tr key={article.id} className="border-b border-slate-200 bg-gray-50">
                <td className="px-[16px] py-[12px] flex justify-center items-center">
                  <img
                    src={article.imageUrl || "/image.jpg"}
                    alt="Thumbnail"
                    className="w-[60px] h-[60px] object-cover rounded-md"
                  />
                </td>
                <td className="px-[16px] py-[12px] text-left text-slate-600 truncate max-w-[300px]">
                  {article.title}
                </td>
                <td className="px-[16px] py-[12px] text-slate-600">
                  {article.category?.name || "-"}
                </td>
                <td className="px-[16px] py-[12px] text-slate-600">
                  {new Date(article.createdAt).toLocaleString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </td>
                <td className="px-[16px] py-[12px] flex gap-[8px] justify-center">
                  <Link href={`/articles/${article.id}`} className="text-sm underline text-blue-600">
                    Preview
                  </Link>
                  <Link href={`/edit-articles/${article.id}`} className="text-sm underline text-blue-600">
                    Edit
                  </Link>
                  <DeleteArticleDialog
                    articleId={article.id}
                    onSuccess={() => window.location.reload()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versi LIST: Mobile */}
      <div className="block md:hidden space-y-4">
        {data.map((article) => (
          <div
            key={article.id}
            className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={article.imageUrl || "/image.jpg"}
                alt="Thumbnail"
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{article.title}</p>
                <p className="text-sm text-slate-500">{article.category?.name || "-"}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/articles/${article.id}`}
                className="text-sm underline text-blue-600"
              >
                Preview
              </Link>
              <Link
                href={`/edit-articles/${article.id}`}
                className="text-sm underline text-blue-600"
              >
                Edit
              </Link>
              <DeleteArticleDialog
                articleId={article.id}
                onSuccess={() => window.location.reload()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
