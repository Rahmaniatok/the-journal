import { notFound } from "next/navigation";
import DarkNavbar from "@/components/darknavbar";
import ArticleCard from "@/components/card-article";
import Footer from "@/components/footer";

type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  user?: {
    username: string;
  };
};

export default async function DetailArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const article = await res.json();

  const formattedDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedRes = await fetch(
    `https://test-fe.mysellerpintar.com/api/articles?category=${article.category.id}`,
    { next: { revalidate: 60 } }
  );
  
  const relatedArticles: { data: Article[] } = await relatedRes.json();
  
  // Filter: hilangkan artikel yang sedang dibaca
  const filteredRelatedArticles = relatedArticles.data.filter((a) => a.id !== article.id);
  

  return (
  <>
    <DarkNavbar />
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white w-full pt-[100px]">
        <article className="flex flex-col justify-center mx-[20px] md:mx-[160px]">
          {/* Metadata */}
          <div className="flex flex-col justify-center">
            <div className="w-full h-fit">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <p>{formattedDate}</p>
                <span>•</span>
                <p>Created by {article.user?.username ?? "Unknown"}</p>
              </div>
              <h1 className="text-3xl font-semibold text-center mt-4">
                {article.title}
              </h1>
            </div>

            {/* Featured image */}
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[480px] object-cover rounded-xl my-[40px]"
              />
            )}

            {/* Article body */}
            <div
              className="space-y-4 text-justify"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Related Articles */}
        <div className="w-full h-fit px-[20px] md:px-[180px] pt-[40px] md:pb-[100px]">
          <section className="w-full h-fit flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-6">Other articles</h2>
            <div className="w-full flex flex-col justify-around items-center gap-x-6 pb-[60px] md:flex-row flex-wrap">
              {filteredRelatedArticles.slice(0, 3).map((item) => (
                <ArticleCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.imageUrl}
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
      </main>
      <Footer />
    </div>
  </>
  );
}
