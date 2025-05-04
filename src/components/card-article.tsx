'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function ArticleCard({ id, title, image, content, createdAt, category }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/articles/${id}`)}
      className="w-full min-w-[380px] max-w-[400px] h-fit border-white cursor-pointer hover:shadow-lg transition"
    >
      <CardContent className="p-0">
        <img
          src={image}
          alt={title}
          className="h-[240px] w-full object-cover rounded-t-xl"
        />
      </CardContent>

      <CardHeader>
        <p className="text-sm text-muted-foreground">{createdAt}</p>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {content}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </CardFooter>
    </Card>
  )
}
