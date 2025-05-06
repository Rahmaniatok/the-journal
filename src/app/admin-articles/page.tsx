"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/auth";
import ArticleTable from "@/components/articletabel";
import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import Link from "next/link"; 
import { Article, Category } from "@/types";

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchArticles = async (searchTerm = "", category = "", page = 1, uid = "") => {
    try {
      const query = new URLSearchParams({
        userId: uid,
        title: searchTerm,
        category: category,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles?${query}`);
      const json = await res.json();

      setArticles(json.data as Article[]);
      setTotalPages(json.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`https://test-fe.mysellerpintar.com/api/categories?page=1&limit=100`);
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      setCurrentPage(1);
      fetchArticles(value, selectedCategory, 1, userId);
    }, 400);

    setDebounceTimeout(timeout);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setCurrentPage(1);
    fetchArticles(search, value, 1, userId);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const profile = await getProfile(token);
      if (!profile) return;

      setUserId(profile.id);
      fetchArticles(search, selectedCategory, currentPage, profile.id);
    };
    init();
  }, [currentPage]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 bg-white flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
          <div className="w-full h-fit border-slate-200 rounded-xl border-[1px]">
            <header className="w-full border-b-[1px] p-[24px] border-slate-200 bg-gray-50">
              <p className="text-base text-slate-800">Total Articles: {articles.length}</p>
            </header>
            <header className="w-full p-[24px] border-t-[1px] border-slate-200 bg-gray-50 flex justify-between">
              <div className="flex gap-[8px]">
                <select
                  className="border-slate-300 border-[1px] rounded-md px-3 py-2 text-sm"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <form className="flex w-[240px] rounded-md border-[1px] px-[12px] py-[8px] gap-[6px] border-slate-300">
                  <Search className="w-[20px] h-[20px]" />
                  <input
                    type="text"
                    placeholder="Search by title"
                    className="text-sm w-full outline-none bg-transparent"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </form>
              </div>
              <Link href="/create-article">
                <Button className="bg-blue-600 text-white w-fit">
                    <Plus className="w-[20px] h-[20px]" />
                    <p className="text-sm ml-2">Add Articles</p>
                </Button>
                </Link>
            </header>
          </div>

          <ArticleTable data={articles} />

          <div className="w-full h-fit px-[16px] py-[12px]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
