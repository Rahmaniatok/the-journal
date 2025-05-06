'use client';

import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import CreateArticleForm from "@/components/createarticleform";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditArticlePage() {
  const { id } = useParams(); // Ambil [id] dari URL
  const [articleData, setArticleData] = useState<{
    id?: string;
    title: string;
    content: string;
    categoryId: string;
    imageUrl?: string;
  } | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Article not found");
        }

        const data = await res.json();
        setArticleData(data);
      } catch (error) {
        console.error(error);
        notFound(); // redirect to 404 if needed
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 bg-white flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
          <div className="flex-1 bg-gray-50 p-[24px] rounded-xl border-[1px] border-slate-200">
            <div className="w-fit h-fit gap-[8px] flex flex-row items-center pb-[20px]">
              <ArrowLeft className="w-[20px] h-[20px]" />
              <p className="text-base text-slate-900">Edit Article</p>
            </div>
            {/* Kirim data default ke form */}
            <CreateArticleForm mode="edit" defaultValues={articleData} />
          </div>
        </div>
      </div>
    </div>
  );
}
