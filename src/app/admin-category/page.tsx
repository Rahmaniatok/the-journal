'use client';

import { useEffect, useState } from "react";
import { AddCategoryDialog } from "@/components/addcategorydialog";
import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import CategoryTable from "@/components/categorytable";
import Pagination from "@/components/pagination";
import { Search } from "lucide-react";
import { Category } from "@/types";

export default function AdminCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchCategories = async (searchTerm = "", page = 1) => {
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        limit: "10",
        page: page.toString(),
      });

      const token = localStorage.getItem("token");

      const res = await fetch(`https://test-fe.mysellerpintar.com/api/categories?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setCategories(json.data as Category[] || []);
      setTotalPages(json.totalPages || 1);
      setTotalData(json.totalData || 0);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      setCurrentPage(1);
      fetchCategories(value, 1);
    }, 400);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    fetchCategories(search, currentPage);
  }, [currentPage]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-white flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
          <div className="w-full h-fit border-slate-200 rounded-xl border-[1px]">
            <header className="w-full border-b-[1px] p-[24px] border-slate-200 bg-gray-50">
              <p className="text-base text-slate-800">Total Category : {totalData}</p>
            </header>
            <header className="w-full p-4 md:p-[24px] border-t-[1px] border-slate-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
                {/* Search */}
                <form className="flex w-full md:w-[240px] rounded-md border-[1px] px-[12px] py-[8px] gap-[6px] border-slate-300">
                  <Search className="w-[20px] h-[20px]" />
                  <input
                    type="text"
                    placeholder="Search Category"
                    className="text-sm w-full outline-none bg-transparent"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </form>

                {/* Add Category Button */}
                <div className="w-full md:w-fit">
                  <AddCategoryDialog onAdd={() => fetchCategories(search, currentPage)} />
                </div>
              </div>
            </header>
          </div>
          <div className="w-full overflow-x-auto">
            <CategoryTable data={categories} onRefresh={() => fetchCategories(search, currentPage)} />
          </div>
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
