'use client';


import { AddCategoryDialog } from "@/components/addcategorydialog";
import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import CategoryTable from "@/components/categorytable";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Plus } from "lucide-react";

export default function AdminCategory() {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 bg-white flex flex-col">
                <AdminNavbar />
                <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
                    <div className="w-full h-fit border-slate-200 rounded-xl border-[1px]">
                        <header className="w-full border-b-[1px] p-[24px] border-slate-200 bg-gray-50">
                        <p className="text-base text-slate-800">Total Category : 25</p>
                        </header>
                        <header className="w-full p-[24px] border-t-[1px] border-slate-200 bg-gray-50 flex justify-between">
                        <div className="flex gap-[8px]">
                            <form className="flex w-[240px] rounded-md border-[1px] px-[12px] py-[8px] gap-[6px] border-slate-300">
                                <Search className="w-[20px] h-[20px]" />
                                <input
                                    type="text"
                                    placeholder="Search Category"
                                    className="text-sm w-full outline-none bg-transparent"
                                />
                            </form>
                        </div>
                        <AddCategoryDialog onAdd={(name) => console.log("Add category:", name)}/>
                        </header>
                    </div>
                    <CategoryTable/>
                    <div className="w-full h-fit px-[16px] py-[12px]">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>

    )
  }