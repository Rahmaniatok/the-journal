'use client';

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Article } from "@/types"; 

type ArticleCardProps = Pick<Article, "id" | "title" | "content" | "imageUrl" | "createdAt"> & {
  category: string;
};

export default function ArticleCard({
  id,
  title,
  content,
  imageUrl,
  createdAt,
  category,
}: ArticleCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/articles/${id}`)}
      className="w-full md:min-w-[380px] max-w-[400px] h-[500px] border-white cursor-pointer hover:shadow-lg transition flex flex-col"
    >
      {/* Gambar */}
      <CardContent className="p-0">
        <img
          src={imageUrl}
          alt={title}
          className="h-[240px] w-full object-cover rounded-xl"
        />
      </CardContent>

      {/* Konten */}
      <div className="flex-1 flex flex-col px-[24px] pt-[12px] pb-0 overflow-hidden">
        <p className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>
        <CardTitle className="text-lg mt-1">{title}</CardTitle>
        <CardDescription className="mt-1 text-sm max-h-[4.5rem] overflow-hidden text-ellipsis">
          {content}
        </CardDescription>
      </div>

      {/* Footer */}
      <CardFooter className="mt-auto px-[24px] pb-[16px]">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </CardFooter>
    </Card>
  );
}
