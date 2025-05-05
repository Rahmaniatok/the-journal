'use client';

import { useEffect, useState } from 'react';
import DarkNavbar from '@/components/darknavbar';
import Footer from '@/components/footer';

interface PreviewArticle {
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  username?: string;
  category?: string;
}

export default function PreviewArticlePage() {
  const [article, setArticle] = useState<PreviewArticle | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("previewArticle");
    if (saved) {
      const parsed = JSON.parse(saved);
      setArticle(parsed);
    }
  }, []);

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">No preview data available.</div>;
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <DarkNavbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-white w-full pt-[100px]">
          <article className="flex flex-col justify-center mx-[160px]">
            <div className="flex flex-col justify-center">
              <div className="w-full h-fit">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <p>{formattedDate}</p>
                  <span>•</span>
                  <p>Created by {article.username ?? 'Preview Author'}</p>
                </div>
                <h1 className="text-3xl font-semibold text-center mt-4">
                  {article.title}
                </h1>
              </div>

              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto max-h-[480px] object-cover rounded-xl my-[40px]"
                />
              )}

              <div
                className="space-y-4 text-justify"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
