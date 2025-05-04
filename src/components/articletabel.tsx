
import { Button } from "@/components/ui/button";
import Link from "node_modules/next/link";
import { DeleteArticleDialog } from "./deletearticledialog";

export default function ArticleTable() {
  const articles = [
    {
      id: 1,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know AAAAAAAAAAAA AAAAAAA AAAAAA AAAAAAAAAA AAAAAAAAAA Aaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaa",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 2,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 3,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 4,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 5,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 6,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 7,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 8,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 9,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 10,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
    {
      id: 11,
      thumbnail: "/image.jpg",
      title: "Cybersecurity Essentials Every Developer Should Know",
      category: "Technology",
      createdAt: "2025-04-13T10:55:12",
    },
  ];

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
              <td className="px-[16px] py-[12px] gap-[8px]">
                <img src={article.thumbnail} alt="Thumbnail" className="w-[60px] h-[60px] object-cover rounded-md" />
              </td>
              <td className="px-[16px] py-[12px] text-slate-600 text-left">{article.title}</td>
              <td className="px-[16px] py-[12px] text-slate-600 text-center">{article.category}</td>
              <td className="px-[16px] py-[12px] text-slate-600 text-center">
                {new Date(article.createdAt).toLocaleString("en-US", {
                  month: "long",   // "April"
                  day: "2-digit",  // "13"
                  year: "numeric", // "2025"
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false    // Gunakan `true` untuk format 12 jam dengan AM/PM
                })}
              </td>
              <td className="px-[16px] py-[12px] flex gap-[12px]">
                <Link href="/" className="text-sm underline text-blue-600">
                  Preview
                </Link>
                <Link href="/" className="text-sm underline text-blue-600">
                  Edit
                </Link>
                <DeleteArticleDialog  onDelete={() => console.log("Delete confirmed")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
