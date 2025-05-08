'use client';

import { useEffect, useState } from 'react';
import DarkNavbar from '@/components/darknavbar';
import Footer from '@/components/footer';
import { getProfile } from '@/lib/auth';
import ArticleCard from '@/components/card-article';

interface PreviewArticle {
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  };
}

interface RelatedArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}

export default function PreviewArticlePage() {
  const [article, setArticle] = useState<PreviewArticle | null>(null);
  const [username, setUsername] = useState("Preview Author");
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("previewArticle");
    if (saved) {
      const parsed = JSON.parse(saved);
      setArticle(parsed);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const profile = await getProfile(token);
      if (profile?.username) {
        setUsername(profile.username);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!article?.category) return;

      try {
        const res = await fetch(
          `https://test-fe.mysellerpintar.com/api/articles?category=${encodeURIComponent(article.category.id)}`
        );
        const data = await res.json();
        if (data?.data) {
          setRelatedArticles(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch related articles:", error);
      }
    };

    fetchRelated();
  }, [article?.category]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No preview data available.
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const filteredRelatedArticles = relatedArticles.filter((a) => a.title !== article.title);

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
                  <p>Created by {username}</p>
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

        <div className="w-full h-fit px-[20px] md:px-[180px] pt-[40px] md:pb-[100px]">
          <section className="w-full h-fit flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-6">Other articles</h2>
            <div className="w-full flex flex-col justify-around items-center gap-x-6 pb-[60px] md:flex-row flex-wrap">
              {filteredRelatedArticles.slice(0, 3).map((item) => (
                <ArticleCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  content={item.content}
                  createdAt={new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  category={item.category?.name ?? "Uncategorized"}
                />
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
