'use client';


import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import ArticleTable from "@/components/articletabel";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Plus } from "lucide-react";

export default function AdminArticles() {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 bg-white flex flex-col">
                <AdminNavbar />
                <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
                    <div className="w-full h-fit border-slate-200 rounded-xl border-[1px]">
                        <header className="w-full border-b-[1px] p-[24px] border-slate-200 bg-gray-50">
                        <p className="text-base text-slate-800">Total Articles: 25</p>
                        </header>
                        <header className="w-full p-[24px] border-t-[1px] border-slate-200 bg-gray-50 flex justify-between">
                        <div className="flex gap-[8px]">
                            <Button variant="outline">
                            Category
                            <ChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                            <form className="flex w-[240px] rounded-md border-[1px] px-[12px] py-[8px] gap-[6px] border-slate-300">
                            <Search className="w-[20px] h-[20px]" />
                            <input
                                type="text"
                                placeholder="Search by title"
                                className="text-sm w-full outline-none bg-transparent"
                            />
                            </form>
                        </div>
                        <Button className="bg-blue-600 text-white w-fit">
                            <Plus className="w-[20px] h-[20px]" />
                            <p className="text-sm ml-2">Add Articles</p>
                        </Button>
                        </header>
                    </div>
                    <ArticleTable/>
                    <div className="w-full h-fit px-[16px] py-[12px]">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>

    )
  }