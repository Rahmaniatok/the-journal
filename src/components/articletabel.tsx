"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteArticleDialog } from "./deletearticledialog";
import { getProfile } from "@/lib/auth";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  category: {
    name: string;
  };
  createdAt: string;
}

export default function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const profile = await getProfile(token);
        if (!profile?.id) return;

        setUserId(profile.id);
        const query = new URLSearchParams({ userId: profile.id, limit: "10", page: "1" }).toString();
        const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles?${query}`);
        const json = await res.json();

        setArticles(json.data || []);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-white overflow-x-auto">
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
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-slate-200 bg-gray-50">
              <td className="px-[16px] py-[12px] flex justify-center items-center">
                <img
                  src={article.imageUrl || "/image.jpg"}
                  alt="Thumbnail"
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
              </td>
              <td className="px-[16px] py-[12px] text-slate-600 text-left truncate max-w-[300px]">
                {article.title}
              </td>
              <td className="px-[16px] py-[12px] text-slate-600 text-center">
                {article.category?.name || "-"}
              </td>
              <td className="px-[16px] py-[12px] text-slate-600 text-center">
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
              <td className="px-[16px] py-[12px] gap-[12px]">
                <Link href={`/articles/${article.id}`} className="text-sm underline text-blue-600 px-2">
                  Preview
                </Link>
                <Link href={`/edit-articles/${article.id}`} className="text-sm underline text-blue-600 px-2">
                  Edit
                </Link >
                  <DeleteArticleDialog
                    articleId={article.id}
                    onSuccess={() => {
                      // misalnya reload ulang data artikel
                      window.location.reload();
                    }}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
